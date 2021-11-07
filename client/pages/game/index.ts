import { goTo } from "../../router";
import { state } from "../../state";
export async function initGamePage(containerEl: Element) {
  const div = document.createElement("div");
  div.setAttribute("class", "container");
  const style = document.createElement("style");
  style.setAttribute("class", "style");
  style.innerHTML = `
    .container{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
    }
    .counter-off{
      color: rgba(255, 255, 255, 0.541);
      margin: 0px;
      padding-left: 0px;
      font-family: 'sunset-club';
      font-size: 4.5rem;
    }
  
    .counter {
      margin: 0px;
      padding-left: 40px;
      color: #fff;
      font-family: 'sunset-club';
      font-size: 4.5rem;
      text-shadow:
        0 0 2px  #CC00FF,
        0 0 5px  #CC00FF,
        0 0 10px #CC00FF,
        0 0 10px #FF0000,
        0 0 80px #FF0000,
        0 0 20px #FF0000,
        0 0 20px #FF0000,
        0 0 40px #FF0000;
    }
    `;
  // appendeo numeros
  const three = document.createElement("h2");
  three.setAttribute("class", "counter-off");
  three.innerText = "3";
  const two = document.createElement("h2");
  two.setAttribute("class", "counter-off");
  two.innerText = "2";
  const one = document.createElement("h2");
  one.setAttribute("class", "counter-off");
  one.innerText = "1";
  div.appendChild(three);
  div.appendChild(two);
  div.appendChild(one);
  // appendeo todo al div root
  const custombttn = document.createElement("custom-hands");
  containerEl.appendChild(div);
  div.appendChild(custombttn);
  containerEl.appendChild(style);
  const { gameState } = await state.getState();

  // escucho el evento click
  custombttn.addEventListener("clicked", async (e: any) => {
    const playerPlay = e.detail.play;

    await state.setGame(playerPlay);
    await state.getMovesFromRtdb();
  });

  //checkeo si el jugador selecciono
  setTimeout(async () => {
    if (gameState.play != null) return;
    if (gameState.play == null) {
      // Genera una jugada random si el jugador no pickea nada
      const randomResult = Math.floor(Math.random() * 3);
      const posibleMoves = ["piedra", "papel", "tijera"];
      const randomplay = posibleMoves[randomResult];
      await state.setGame(randomplay);
      await state.getMovesFromRtdb();
    }
  }, 4000);

  setTimeout(() => {
    if (location.pathname != "/game") return;
    if (location.pathname == "/game") {
      goTo("/show-moves");
    }
  }, 5000);

  // esto hace la animacion del 3, 2, 1
  const counters = document.querySelectorAll(".counter-off");
  function counter(counterEls: any) {
    for (const el of counterEls) {
      setTimeout(() => {
        if (el.innerText == "3") {
          el.setAttribute("class", "counter");
        }
      }, 1000);
      setTimeout(() => {
        if (el.innerText == "3") {
          el.setAttribute("class", "counter-off");
        }
        if (el.innerText == "2") {
          el.setAttribute("class", "counter");
        }
      }, 2000);
      setTimeout(() => {
        if (el.innerText == "2") {
          el.setAttribute("class", "counter-off");
        }
        if (el.innerText == "1") {
          el.setAttribute("class", "counter");
        }
      }, 3000);
      setTimeout(() => {
        if (el.innerText == "1") {
          el.setAttribute("class", "counter-off");
        }
      }, 4000);
    }
  }
  counter(counters);
}
