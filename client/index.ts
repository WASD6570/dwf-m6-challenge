import "./components/button/index";
import "./components/hands/index";
import { initRouter } from "./router";
import { state } from "./state";
(function () {
  const root = document.querySelector(".root");
  const style = document.createElement("style");
  // @ts-ignore
  const imgUrl = require("url:./img/thisone.png");
  style.innerHTML = `
  body{ 
    background: url(${imgUrl})
    center fixed;
    background-size: cover;
  }
  `;
  initRouter(root);
  root.appendChild(style);
})();
