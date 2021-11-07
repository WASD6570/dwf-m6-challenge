class Hands extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
    const style = document.createElement("style");
    const container = document.querySelector(".custom-container");
    style.innerHTML = `
        .custom-container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            margin-top: 15vh;
            min-width: 370px;
        }
        .custom-button{
            margin: auto 8vw;
            width: 115px;
            height: 170px;
            background: transparent;
            color: #fff;
            border: 0.3rem solid #fff;
            border-radius: 2rem;
            box-shadow: 0 0 1rem #fff,
            0 0 .1rem #fff,
            0 0 .05rem #fff,
            0 0 0.8rem #C724B1,
            0 0 2.8rem #C724B1,
            inset 0 0 1.3rem #C724B1;
        }
        @media(max-width: 421px ){
          .custom-button{
            margin: 0 5px;
          }
        }
      `;
    this.shadow.appendChild(style);
  }
  render() {
    //@ts-ignore
    const piedraImg = require("url:../../img/piedrar.png");
    //@ts-ignore
    const papelImg = require("url:../../img/papelr.png");
    //@ts-ignore
    const tijerasImg = require("url:../../img/tijerasr.png");

    const div = document.createElement("div");
    div.setAttribute("class", "custom-container");

    const stone = document.createElement("button");
    stone.setAttribute("id", "piedra");
    stone.setAttribute("class", "custom-button");
    const piedra = document.createElement("img");
    piedra.setAttribute("src", piedraImg);
    stone.appendChild(piedra);

    const papper = document.createElement("button");
    papper.setAttribute("class", "custom-button");
    papper.setAttribute("id", "papel");
    const papel = document.createElement("img");
    papel.setAttribute("src", papelImg);
    papper.appendChild(papel);

    const sissors = document.createElement("button");
    sissors.setAttribute("class", "custom-button");
    sissors.setAttribute("id", "tijera");
    const tijeras = document.createElement("img");
    tijeras.setAttribute("src", tijerasImg);
    sissors.appendChild(tijeras);

    div.appendChild(stone);
    div.appendChild(papper);
    div.appendChild(sissors);

    this.shadow.appendChild(div);

    stone.addEventListener("click", (e: any) => {
      let id: string;
      if (e.path[1].id == "") {
        id = e.path[0].id;
      } else id = e.path[1].id;

      const event = new CustomEvent("clicked", {
        detail: {
          play: id,
        },
      });
      this.dispatchEvent(event);
      this.shadow.querySelector("#tijera").remove();
      this.shadow.querySelector("#papel").remove();
    });
    papper.addEventListener("click", (e: any) => {
      let id: string;
      if (e.path[1].id == "") {
        id = e.path[0].id;
      } else id = e.path[1].id;

      const event = new CustomEvent("clicked", {
        detail: {
          play: id,
        },
      });
      this.dispatchEvent(event);
      this.shadow.querySelector("#piedra").remove();
      this.shadow.querySelector("#tijera").remove();
    });
    sissors.addEventListener("click", (e: any) => {
      let id: string;
      if (e.path[1].id == "") {
        id = e.path[0].id;
      } else id = e.path[1].id;

      const event = new CustomEvent("clicked", {
        detail: {
          play: id,
        },
      });
      this.dispatchEvent(event);
      this.shadow.querySelector("#piedra").remove();
      this.shadow.querySelector("#papel").remove();
    });
  }
}
customElements.define("custom-hands", Hands);
