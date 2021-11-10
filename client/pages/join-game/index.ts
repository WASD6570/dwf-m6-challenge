import { goTo } from "../../router";
import { state } from "../../state";

export function initJoinGamePage(containerEl: Element) {
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
  .form{
  display: flex;
  flex-direction: column;
  align-items: center;
  }
  .bttn{
    background: transparent;
    border: none;
  }
  .input, .name-input{
    text-align: center;
    margin-top: 10px;
    margin-bottom: 15px;
    font-family: "sunset-club";
    font-size: 40px;
    width: 311px;
    height: 87px;
    background: transparent;
    color: #fff;
    animation: flicker 8s infinite alternate;
    border: 0.2rem solid #fff;
    border-radius: 2rem;
    box-shadow: 0 0 .2rem #fff,
    0 0 .1rem #fff,
    0 0 .05rem #fff,
    0 0 0.8rem #C724B1,
    0 0 2.8rem #C724B1,
    inset 0 0 1.3rem #C724B1;
  }
`;

  div.innerHTML = `
    <h1 class="main-title">Piedra ,<br> Papel o <br> Tijera</h1>
    <form class="form" for="formulario">
      <input type="text" class="input" id="formulario" placeholder="ingresa tu nombre">
      <input type="number" class="name-input" id="formulario" placeholder="room id">
      <button class="bttn">
      <custom-button class="join-game"></custom-button>
      </button>
    </form>
  `;

  containerEl.appendChild(div);
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name: HTMLInputElement = document.querySelector(".input");
    const roomId: HTMLInputElement = document.querySelector(".name-input");

    if (name.value == "") {
      return window.alert("Please enter your name");
    }
    if (roomId.value == "") {
      return window.alert("Please enter the room ID");
    }

    form.removeChild(document.querySelector(".bttn"));
    containerEl.appendChild(document.createElement("custom-button"));

    state.setName(name.value.toString());
    await state.signIn();
    await state.getExistingRoomId(roomId.value.toString());
    await state.joinRoom();

    containerEl.querySelector("custom-button").remove();
    goTo("/instructions");
  });
  containerEl.appendChild(style);
}
