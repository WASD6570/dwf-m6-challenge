import { goTo } from "../../router";
import { state } from "../../state";
export async function initWFOPage(containerEl: Element) {
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
    font-size: 2.5rem;
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

  const { gameState } = await state.getState();

  div.innerHTML = `
  <h2 class="main-title">Invita a tu oponente con este codigo</h2>
  <h1 class="main-title">${await gameState.publicId}</h1>
  <h2 class="main-title">Good luck, have fun!</h2>
  `;
  await state.checkForOpponent();

  containerEl.appendChild(div);
  containerEl.appendChild(style);

  const contenedor = containerEl.querySelectorAll(".container");
  const estilos = containerEl.querySelectorAll(".style");
  window.addEventListener("load", () => {
    if (contenedor.length > 0) {
      contenedor[0].remove();
      estilos[0].remove();
    }
  });
}
