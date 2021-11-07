import { API_BASE_URL, getDatabase, ref, onValue, app } from "./db";
import { goTo } from "./router";

type Play = "stone" | "papper" | "sissors" | string;

const state = {
  data: {
    gameState: {
      name: "mock",
      play: null,
      usrId: "",
      online: false,
      ready: false,
      owner: true,
      publicId: "",
      privateId: "",
      opponentName: "",
      opponentPlay: null,
    },
    gameReady: false,
    playersReady: false,
    winner: {
      owner: 0,
      guest: 0,
    },
  },

  // inicializo el scoreboard y checkeo si ya hay data previa
  async init() {
    const data = await this.getState();

    const rawHistoryData = await fetch(
      `${API_BASE_URL}/history/${data.gameState.publicId}`
    );

    const historyData = await rawHistoryData.json();

    if (historyData.history == "createDashboard") {
      data.winner = { owner: 0, guest: 0 };
    } else {
      data.winner = historyData.history;
    }
  },
  async getState() {
    return await this.data;
  },

  // da la señal de login cuando se conecta un usuario

  async setSessionStatus(online: boolean) {
    const { gameState } = await this.getState();
    if (online === true) return (gameState.online = online);
    if (online === false) return (gameState.online = online);
  },

  async setName(name: string) {
    const { gameState } = await this.getState();
    gameState.name = name;
  },

  // crea un usuario en fireStore
  async signIn() {
    const data = await this.getState();
    await this.setSessionStatus(true);

    const rawUser = await fetch(`${API_BASE_URL}/auth`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const userId = await rawUser.json();
    const usrId = await userId.usrId;
    await this.setUserId(usrId);
  },

  async setUserId(usrId: string) {
    const { gameState } = await this.getState();
    gameState.usrId = usrId;
  },

  //crea un room en la rtdb para el owner de la sala

  async askNewRoom() {
    const { gameState } = await this.getState();

    const rawPublicRoomId = await fetch(`${API_BASE_URL}/rooms`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ gameState }),
    });

    const pId = await rawPublicRoomId.json();
    const { roomId, privateRoomId } = await pId;

    await this.setPublicId(roomId);
    await this.setPrivateId(privateRoomId);
  },

  async setPublicId(publicId: string) {
    const { gameState } = await this.getState();
    gameState.publicId = publicId;
  },

  async setPrivateId(privateId: string) {
    const { gameState } = await this.getState();
    gameState.privateId = privateId;
  },

  // obtiene el id de la rtdb y lo guarda en el state

  async getExistingRoomId(roomId: string) {
    const { gameState } = await this.getState();
    await this.setPublicId(roomId);
    const rawPrivateRoomId = await fetch(`${API_BASE_URL}/room/${roomId}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ gameState }),
    });
    const privateRoomIdParse = await rawPrivateRoomId.json();
    const privateId = await privateRoomIdParse.privateId;
    await this.setPrivateId(privateId);
  },

  //crea la data del guest en la rtdb

  async joinRoom() {
    const data = await this.getState();
    //parche temporal
    const gameState = data.gameState;
    //parche temporal
    data.gameState.owner = false;
    data.gameReady = true;
    fetch(`${API_BASE_URL}/room/${data.gameState.publicId}/join`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ gameState }),
    });
    await this.checkForOpponent();
  },

  // chechea que los 2 usuarios esten online y listos para pasar
  // a las instrucciones && obtengo el nombre del oponente
  // desde el cliente del OWNER

  async checkForOpponent() {
    const { gameState } = await this.getState();

    const db = getDatabase(app);
    const roomRef = ref(db, `rooms/${await gameState.privateId}`);

    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (Object.keys(data).length === 2) {
        this.setGameReadyStatus(true);

        if (gameState.name === data.owner.name) {
          gameState.opponentName = data.guest.name;
        }
        if (gameState.name === data.guest.name) {
          gameState.opponentName = data.owner.name;
        }
      }
    });
  },

  async setGameReadyStatus(online: boolean) {
    let data = await this.getState();

    if (online === true) {
      data.gameReady = online;
      if (location.pathname !== "/waiting-for-opponent") return;
      if (location.pathname === "/waiting-for-opponent") {
        goTo("/instructions");
      }
    }
    if (online === false) return (data.gameReady = online);
  },

  // setea el estado de "ready" cuando los users presionan play

  async setPlayerReadyStatus(status: boolean) {
    const { gameState } = await this.getState();
    gameState.ready = status;
    fetch(`${API_BASE_URL}/room/${gameState.publicId}/play`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ gameState }),
    });
  },

  // checkea que los 2 usuarios tengan el estado de "ready" para pasar a
  // la pantalla de seleccion && setea el nombre del oponente desde el
  // cliente del GUEST

  async checkIfBothAreReady() {
    const { gameState } = await this.getState();

    const db = getDatabase(app);
    const roomRef = ref(db, `rooms/${await gameState.privateId}`);

    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      //temporal
      if (data.owner.ready == false && data.guest.ready == false) {
        return;
      }

      if (data.owner.ready == false && data.guest.ready == true) {
        return this.waitingForOpponent(data.owner.name, false);
      }
      if (data.owner.ready == true && data.guest.ready == false) {
        return this.waitingForOpponent(data.guest.name, false);
      }
      if (data.owner.ready == true && data.guest.ready == true) {
        return this.waitingForOpponent("ready", true);
      }
      if (Object.keys(data).length === 2) {
        if (gameState.name === data.owner.name) {
          gameState.opponentName = data.guest.name;
        }
        if (gameState.name === data.guest.name) {
          gameState.opponentName = data.owner.name;
        }
      }
      //temporal
    });
  },

  async waitingForOpponent(name: string, bothReady: boolean) {
    let startGame = await this.getState();
    if (bothReady === true) {
      startGame.playersReady = bothReady;
      if (location.pathname !== "/wfro") return;
      if (location.pathname === "/wfro") {
        goTo("/game");
      }
    } else if (bothReady === false) {
      startGame.gameState.opponentName = name;
    }
  },

  // Guardo la jugada del jugador y la manda a la rtdb
  async setGame(playerPlay: Play) {
    const { gameState } = await this.getState();
    gameState.play = playerPlay;
    fetch(`${API_BASE_URL}/room/${gameState.publicId}/play`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ gameState }),
    });
  },

  // obtiene los movimientos de la rtdb

  async getMovesFromRtdb() {
    const { gameState } = await this.getState();

    const db = getDatabase(app);
    const roomRef = ref(db, `rooms/${await gameState.privateId}`);

    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data.owner.play != null && data.guest.play != null) {
        return this.setMoves(data.owner.play, data.guest.play);
      }
    });
  },

  // setea los moves del OWNER y GUEST en los respectivos states de los clientes

  async setMoves(ownerPlay: string, guestPlay: string) {
    const { gameState } = await this.getState();
    if (gameState.owner) {
      return (gameState.opponentPlay = guestPlay);
    }
    if (gameState.owner == false) {
      return (gameState.opponentPlay = ownerPlay);
    }
  },

  // declara la logica para determinar quien gano desde la
  // perspectiva del OWNER y retorna ese resultado asi puede ser
  // mostrado en el component
  whoWins(ownerPlay: string, guestPlay: string) {
    const ownerWinningOutcomes = [
      { ownerPlay: "piedra", guestPlay: "tijera" },
      { ownerPlay: "tijera", guestPlay: "papel" },
      { ownerPlay: "papel", guestPlay: "piedra" },
    ];

    let ownerResult = "perdiste";
    for (const o of ownerWinningOutcomes) {
      if (o.ownerPlay == ownerPlay && o.guestPlay == guestPlay) {
        ownerResult = "ganaste";
      } else if (ownerPlay == guestPlay) {
        ownerResult = "empate";
      }
    }

    let guestResult = "";
    if (ownerResult == "perdiste") {
      guestResult = "ganaste";
    } else if (ownerResult == "ganaste") {
      guestResult = "perdiste";
    } else if (ownerResult == "empate") {
      guestResult = "empate";
    }

    const datos = (resultOfOwner: string): string => {
      if (resultOfOwner == "empate") return;
      if (resultOfOwner == "ganaste") return resultOfOwner;
      if (resultOfOwner == "perdiste") return resultOfOwner;
    };
    this.setWinner(datos(ownerResult));
    return { ownerResult, guestResult };
  },

  // setea en el state quien gano desde la perspectiva del OWNER

  async setWinner(resultOfOwner: string) {
    const data = await this.getState();
    if (resultOfOwner == undefined) return;
    if (resultOfOwner == "ganaste") {
      data.winner.owner++;

      return await this.saveHistory(data.winner);
    }
    if (resultOfOwner == "perdiste") {
      data.winner.guest++;

      return await this.saveHistory(data.winner);
    }
  },

  // setea los resultados en el state, localStorage y FireStore

  async saveHistory(history) {
    const data = await this.getState();

    data.winner = history;

    localStorage.setItem("history", JSON.stringify(data.winner));

    fetch(`${API_BASE_URL}/history/save/${data.gameState.publicId}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data.winner),
    });
  },
};

// re largo el state :c

export { state };
