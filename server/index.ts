import { fireStore, rtdb } from "./db";
import * as express from "express";
import { nanoid } from "nanoid";
const path = require("path");

const port = process.env.PORT || 3005;
const app = express();

app.use(express.static(path.join(__dirname, "../dist")));

app.use(express.json());

const usersCollection = fireStore.collection("users");
const roomsCollection = fireStore.collection("rooms");

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.get("/env", async (req, res) => {
  res.json({
    enviroment: process.env.NODE_ENV,
  });
});

app.get("/history/:id", async (req, res) => {
  const roomSnapshot = await roomsCollection.doc(req.params["id"]).get();
  roomSnapshot.data();
  //checkeo si existe el usuario && la sala
  if (roomSnapshot.exists === false)
    return res.status(201).json({ history: "createDashboard" });

  if (roomSnapshot.exists === true)
    return res.status(200).json({ history: roomSnapshot.data() });
});

app.post("/history/save/:id", async (req, res) => {
  const scoreboard = await req.body;

  const snapshot = await roomsCollection.doc(req.params["id"]).get();
  const roomRef = roomsCollection.doc(req.params["id"]);

  //checkeo si existe el usuario
  if (snapshot.exists) {
    await roomRef.update({ scoreboard });

    res.status(202).json({ message: "updated" });
    //si el usurio no existe lo mando a que se loguee o cree cuenta
  } else return res.status(404).json({ message: "room not found" });
});

//obtengo el nombre de la persona
app.post("/auth", async (req, res) => {
  const data = req.body;

  const obj = {
    name: data.gameState.name,
    scoreboard: data.scoreboard,
  };

  //obetengo el usuario
  const chekingIfUserExists = await usersCollection
    .where("name", "==", obj.name)
    .get();

  //checkeo si existe el usuario
  if (chekingIfUserExists.empty === false) {
    chekingIfUserExists.forEach((doc) => {
      return res.status(200).json({ usrId: doc.id });
    });
  }

  if (chekingIfUserExists.empty === true) {
    const newUserIdRef = await usersCollection.add(obj);

    res.json({ success: true, usrId: newUserIdRef.id });
  }
});

// endpoint para ingresar a un nuevo room
app.post("/rooms", async (req, res) => {
  const { gameState } = await req.body;

  const snapshot = await usersCollection.doc(await gameState.usrId).get();

  //checkeo si existe el usuario
  if (snapshot.exists) {
    const roomRef = rtdb.ref("rooms/" + nanoid());
    //creo el room en la rtdb
    await roomRef.set({
      owner: gameState,
    });
    //creo el room con Id publico en FireStore
    const publicRoomId = 1000 + Math.floor(Math.random() * 999);
    await roomsCollection
      .doc(publicRoomId.toString())
      .set({ rtdbId: roomRef.key, owner: gameState.usrId });
    // Respondo que salio todo ok + el roomId publico
    res.json({
      success: true,
      roomId: publicRoomId.toString(),
      privateRoomId: roomRef.key,
    });
    //si el usurio no existe lo mando a que se loguee o cree cuenta
  } else return res.status(401).json({ message: "unauthorized" });
});

//endpoint para obtener el id de una sala existente
app.post("/room/:id", async (req, res) => {
  const { gameState } = req.body;

  const userSnapshot = await usersCollection.doc(gameState.usrId).get();
  const roomSnapshot = await roomsCollection.doc(gameState.publicId).get();

  //checkeo si existe el usuario && la sala
  if (userSnapshot.exists === false)
    return res.status(401).json({ message: "Access denied, log in required" });

  if (userSnapshot.exists && roomSnapshot.exists === false)
    return res.status(404).json({ message: "Room not found" });

  if (userSnapshot.exists && roomSnapshot.exists) {
    const realTimeDbId = roomSnapshot.data();
    return res.json({ success: true, privateId: realTimeDbId.rtdbId });
  }
});

app.post("/room/:id/join", async (req, res) => {
  const { gameState } = req.body;

  const userSnapshot = await usersCollection.doc(gameState.usrId).get();
  const roomSnapshot = await roomsCollection.doc(gameState.publicId).get();

  //checkeo si existe el usuario && la sala
  if (userSnapshot.exists === false)
    return res.status(401).json({ message: "Access denied, log in required" });

  if (userSnapshot.exists && roomSnapshot.exists === false)
    return res.status(404).json({ message: "Room not found" });

  if (userSnapshot.exists && roomSnapshot.exists) {
    const roomRef = rtdb.ref(`rooms/${gameState.privateId}`);

    //guardo la data del player 2
    await roomRef.update({
      guest: gameState,
    });
    return res.json({ success: true });
  }
});

app.post("/room/:id/play", async (req, res) => {
  const { gameState } = req.body;

  const userSnapshot = await usersCollection.doc(gameState.usrId).get();
  const roomSnapshot = await roomsCollection.doc(gameState.publicId).get();

  //checkeo si existe el usuario && la sala
  if (userSnapshot.exists === false)
    return res.status(401).json({ message: "Access denied, log in required" });

  if (userSnapshot.exists && roomSnapshot.exists === false)
    return res.status(404).json({ message: "Room not found" });

  if (userSnapshot.exists && roomSnapshot.exists) {
    const roomRef = rtdb.ref(`rooms/${gameState.privateId}`);

    //updateo la data en la rtdb
    if (gameState.owner) {
      await roomRef.update({
        owner: gameState,
      });
      return res.json({ success: true });
    } else if (gameState.owner == false) {
      await roomRef.update({
        guest: gameState,
      });
      return res.json({ success: true });
    }
  }
});

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
