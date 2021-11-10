import { initHomePage } from "./pages/home/index";
import { initInstructionsPage } from "./pages/instructions/index";
import { initGamePage } from "./pages/game/index";
import { initShowMovesPage } from "./pages/show-moves/index";
import { initResultPage } from "./pages/result/index";
import { initNewGamePage } from "./pages/new-game/index";
import { initJoinGamePage } from "./pages/join-game/index";
import { initWFOPage } from "./pages/waiting-for-opponent/index";
import { initWFOReadyPage } from "./pages/waiting-ready-opponent/index";
import { state } from "./state";

function routeHandler(path: string, container: Element) {
  const routes = [
    {
      path: /\/home/,
      handler: (container) => {
        initHomePage(container);
      },
    },
    {
      path: /\/new-game/,
      handler: (container) => {
        initNewGamePage(container);
      },
    },
    {
      path: /\/join-game/,
      handler: (container) => {
        initJoinGamePage(container);
      },
    },
    {
      path: /\/waiting-for-opponent/,
      handler: (container) => {
        initWFOPage(container);
      },
    },
    {
      path: /\/instructions/,
      handler: (container) => {
        initInstructionsPage(container);
      },
    },
    {
      path: /\/wfro/,
      handler: (container) => {
        initWFOReadyPage(container);
      },
    },
    {
      path: /\/game/,
      handler: (container) => {
        initGamePage(container);
      },
    },
    {
      path: /\/show-moves/,
      handler: (container) => {
        initShowMovesPage(container);
      },
    },
    {
      path: /\/result/,
      handler: (container) => {
        initResultPage(container);
      },
    },
  ];
  const contenedor = container.querySelectorAll(".container");
  const estilos = container.querySelectorAll(".style");
  if (contenedor.length > 0) {
    contenedor[0].remove();
    estilos[0].remove();
  }

  for (const r of routes) {
    if (r.path.test(path)) {
      r.handler(container);
    }
  }
}

export async function goTo(path: string) {
  const root = document.querySelector(".root");
  history.pushState({}, "", path);
  routeHandler(path, root);
  const data = state.getState();
  data.gameState.currentPage = path;

  localStorage.setItem("localState", JSON.stringify(data));
}

export async function initRouter() {
  const { gameState } = await state.getState();
  if (gameState.currentPage == null) {
    goTo("/home");
  } else {
    goTo(gameState.currentPage);
  }
}
