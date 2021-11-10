import "./components/button/index";
import "./components/hands/index";
import { initRouter } from "./router";
import { state } from "./state";
(function () {
  state.init();
  const style = document.createElement("style");
  document.body.appendChild(style);
  // @ts-ignore
  const imgUrl = require("url:./img/thisone.png");
  style.innerHTML = `
  body{ 
    background: url(${imgUrl})
    center fixed;
    background-size: cover;
  }
  .go-home-container{
    margin-top: 10px;
    font-family: "sunset-club";
    font-size: 25px;
    width: 150px;
    height: 47px;
    background: transparent;
    color: #fff;
    animation: flick 8s infinite alternate;
    border: 0.2rem solid #fff;
    border-radius: 2rem;
    box-shadow: 0 0 .2rem #fff,
    0 0 .1rem #fff,
    0 0 .05rem #fff,
    0 0 0.8rem #C724B1,
    0 0 2.8rem #C724B1,
    inset 0 0 1.3rem #C724B1;
}
@keyframes flick {

  0%, 18%, 22%, 25%, 53%, 57%, 100% {

      text-shadow:
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px #C724B1,
      0 0 80px #C724B1,
      0 0 90px #C724B1,
      0 0 100px #C724B1,
      0 0 150px #C724B1;
  
  }
  
  20%, 24%, 55% {        
      text-shadow: none;
  }    
}
  `;

  initRouter();

  document.querySelector(".root").innerHTML = `
    <button class="go-home-container">Restart</button>
  `;

  const customButton = document.querySelector(".go-home-container");
  customButton.addEventListener("click", () => {
    console.log("funciona");

    localStorage.removeItem("localState");
    window.location.reload();
  });
})();
