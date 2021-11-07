import { goTo } from "../../router";
export function initHomePage(containerEl: Element) {
  const div = document.createElement("div");
  div.setAttribute("class", "container");
  const style = document.createElement("style");
  style.setAttribute("class", "style");
  style.innerHTML = `
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .main-title {
    padding-left: 40px;
    color: #fff;
  }  

  .main-title {
    font-family: 'sunset-club';
    font-size: 4rem;
    animation: flicker 8s infinite alternate;
}

@keyframes flicker {
    
  0%, 18%, 22%, 25%, 53%, 57%, 100% {

      text-shadow:
      0 0 2px  #CC00FF,
      0 0 5px  #CC00FF,
      0 0 10px  #CC00FF,
      0 0 10px  #FF0000,
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

  div.innerHTML = `
  <h1 class="main-title">Piedra ,<br> Papel o <br> Tijera</h1>
  `;

  containerEl.appendChild(div);
  const newGameBttn = document.createElement("custom-button");
  const joinGameBttn = document.createElement("custom-button");
  joinGameBttn.setAttribute("class", "join-game");

  div.appendChild(newGameBttn);
  div.appendChild(joinGameBttn);

  newGameBttn.addEventListener("click", () => {
    goTo("/new-game");
  });
  joinGameBttn.addEventListener("click", () => {
    goTo("/join-game");
  });
  containerEl.appendChild(style);
}
