import { goTo } from "../../router";
import { state } from "../../state";
export async function initResultPage(containerEl: Element) {
  const div = document.createElement("div");
  div.setAttribute("class", "container");
  const style = document.createElement("style");
  style.setAttribute("class", "style");
  style.innerHTML = `
  .container {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .empate, .ganaste, .perdiste{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 4rem;
    margin-bottom: 40px;
  }
  @media (max-width: 767px) {
    .empate, .ganaste, .perdiste{
        font-size: 2rem;
      }
  }
  .empate > h1 {
    transform: rotate(-25deg);
    margin-top: 10px;
    font-family: "sunset-club";
    color: #fff;
    animation: flicker 8s infinite alternate;
    text-shadow: 0 0 2px #E6FB04, 0 0 5px #E6FB04, 0 0 5px #E6FB04,
    0 0 5px #FFFF00, 0 0 80px #FFFF00, 0 0 20px #FFFF00, 0 0 20px #FFFF00,
    0 0 40px #FFFF00;
  }
  
  .ganaste > h1 {
    transform: rotate(-25deg);
    margin-top: 10px;
    font-family: "sunset-club";
    color: #fff;
    animation: flicker 8s infinite alternate;
    text-shadow: 0 0 2px #33FF00, 0 0 5px #33FF00, 0 0 5px #33FF00,
        0 0 5px #0fa, 0 0 80px #0fa, 0 0 20px #0fa, 0 0 20px #0fa,
        0 0 40px #0fa;
  }
  
  .perdiste > h1 {
    transform: rotate(-25deg);
    margin-top: 10px;
    font-family: "sunset-club";
    color: #fff;
    animation: flicker 8s infinite alternate;
    text-shadow: 0 0 2px #FF00FF, 0 0 5px #FF00FF, 0 0 5px #FF00FF,
    0 0 5px #ff0000, 0 0 80px #ff0000, 0 0 20px #ff0000, 0 0 20px #ff0000,
    0 0 40px #ff0000;
}

  .score-container {
      width: 50vw;
      width: 450px;
      height: 280px;
      background-color: transparent;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      border: 0.2rem solid #fff;
      border-radius: 2rem;
      box-shadow: 0 0 .2rem #fff,
      0 0 .1rem #fff,
      0 0 .05rem #fff,
      0 0 0.8rem #00FFFF,
      0 0 2.8rem #00FFFF,
      inset 0 0 1.3rem #00FFFF;
  }
  @media(max-width: 450px){
    .score-container{
      max-width: 350px;
    }
  }
  .score-container > h3{
    align-self: center;
  }
  .score-container > h3, h4{
    font-family: 'sunset-club';
    margin: 20px;
    color: #fff;
    font-size: 2rem;
    animation: flicker 8s infinite alternate;
    text-shadow:
    0 0 2px  #00FFFF,
    0 0 5px  #00FFFF,
    0 0 5px  #00FFFF,
    0 0 5px  #CC00FF,
    0 0 80px #CC00FF,
    0 0 20px #CC00FF,
    0 0 20px #CC00FF,
    0 0 40px #CC00FF;
  }
  .score-container > h4{
      margin-right: 5%;
  }

  @keyframes flicker {
    0%, 18%, 22%, 25%, 53%, 57%, 100% 
    20%, 24%, 55% {        
      text-shadow: none;
    }    
  }
  custom-button {
    margin-top: 15%;
  }
  `;
  await state.setPlayerReadyStatus(false);
  const data = await state.getState();

  const resultContainer = document.createElement("div");

  if (data.gameState.owner === true) {
    const result = state.whoWins(
      data.gameState.play,
      data.gameState.opponentPlay
    );

    const scoreboard = await state.getState();

    resultContainer.innerHTML = `
  <h1>${result.ownerResult}!</h1>
  <div class="score-container">
  <h3>Score</h3>
  <h4>${data.gameState.name}   ${scoreboard.winner.owner}</h4>
  <h4>${data.gameState.opponentName}   ${scoreboard.winner.guest}</h4>
  </div>
  `;
    function showResult(result) {
      if (result == "ganaste")
        return resultContainer.setAttribute("class", "ganaste");
      if (result == "perdiste")
        return resultContainer.setAttribute("class", "perdiste");
      if (result == "empate")
        return resultContainer.setAttribute("class", "empate");
    }

    showResult(result.ownerResult);
  }
  if (data.gameState.owner === false) {
    const result = state.whoWins(
      data.gameState.opponentPlay,
      data.gameState.play
    );

    const scoreboard = await state.getState();

    resultContainer.innerHTML = `
    <h1>${result.guestResult}</h1>!</h1>
    <div class="score-container">
    <h3>Score</h3>
    <h4>${data.gameState.name}   ${scoreboard.winner.guest}</h4>
    <h4>${data.gameState.opponentName}   ${scoreboard.winner.owner}</h4>
    </div>
    `;
    function showResult(result) {
      if (result == "ganaste")
        return resultContainer.setAttribute("class", "ganaste");
      if (result == "perdiste")
        return resultContainer.setAttribute("class", "perdiste");
      if (result == "empate")
        return resultContainer.setAttribute("class", "empate");
    }

    showResult(result.guestResult);
  }

  const custombttn = document.createElement("custom-button");
  resultContainer.appendChild(custombttn);

  custombttn.addEventListener("click", async () => {
    await state.setPlayerReadyStatus(true);
    goTo("/wfro");
  });

  containerEl.appendChild(style);
  div.appendChild(resultContainer);
  containerEl.appendChild(div);
}
