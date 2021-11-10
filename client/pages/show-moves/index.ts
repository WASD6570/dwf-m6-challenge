import { goTo } from "../../router";
import { state } from "../../state";
export function initShowMovesPage(containerEl: Element) {
  const div = document.createElement("div");
  div.setAttribute("class", "container");
  const style = document.createElement("style");
  style.setAttribute("class", "style");
  style.innerHTML = `
    .container{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    div.machine-container{
        width: 200px;
        height: 200px;
        transform: rotate(180deg);
    }
    div.player-container{
        width: 200px;
        height: 300px;
    }
    .main-title {
      font-family: 'sunset-club';
      color: #fff;
      padding-left: 10px;

      font-size: 2.1rem;
      animation: flicker 8s infinite alternate;
      text-align: center;
  }
  
  @keyframes flicker {
      
    0%, 18%, 22%, 25%, 53%, 57%, 100% {
  
        text-shadow:
        0 0 2px  #CC00FF,
        0 0 5px  #CC00FF,
        0 0 5px  #CC00FF,
        0 0 5px  #FF0000,
        0 0 80px #FF0000,
        0 0 20px #FF0000,
        0 0 20px #FF0000,
        0 0 40px #FF0000;
    }
    
    24%, 55% {        
        text-shadow: none;
    }    
  }
  `;
  //@ts-ignore
  const piedraImg = require("url:../../img/piedrar.png");
  //@ts-ignore
  const papelImg = require("url:../../img/papelr.png");
  //@ts-ignore
  const tijerasImg = require("url:../../img/tijerasr.png");

  //obtengo la jugada
  const { gameState } = state.getState();

  //selecciono la jugada y la muestro
  const ownerImgSelector = (guestPlay: string) => {
    if (guestPlay == "piedra") return piedraImg;
    if (guestPlay == "papel") return papelImg;
    if (guestPlay == "tijera") return tijerasImg;
  };
  const guestImgSelector = (ownerPlay: string) => {
    if (ownerPlay == "piedra") return piedraImg;
    if (ownerPlay == "papel") return papelImg;
    if (ownerPlay == "tijera") return tijerasImg;
  };

  if (gameState.owner == true) {
    state.whoWins(gameState.play, gameState.opponentPlay);
    div.innerHTML = `
    <div class="machine-container">
    <img width="200px" height="250px" src=${guestImgSelector(
      gameState.opponentPlay
    )}>
    </div>
    <div class="player-container">
    <img width="200px" height="250px" src="${ownerImgSelector(gameState.play)}">
    <h1 class="main-title">Tu jugada</h1>
    </div>
    `;
  }
  if (gameState.owner == false) {
    state.whoWins(gameState.opponentPlay, gameState.play);
    div.innerHTML = `
    <div class="machine-container">
    <img width="200px" height="250px" src=${ownerImgSelector(
      gameState.opponentPlay
    )}>
    </div>
    <div class="player-container">
    <img width="200px" height="250px" src="${guestImgSelector(gameState.play)}">
    <h1 class="main-title">Tu jugada</h1>
    </div>
    `;
  }

  containerEl.appendChild(style);
  containerEl.appendChild(div);

  setTimeout(() => {
    goTo("/result");
  }, 2800);
}
