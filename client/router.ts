import { initHomePage } from "./pages/home/index";
import { initInstructionsPage } from "./pages/instructions/index";
import { initGamePage } from "./pages/game/index";
import { initShowMovesPage } from "./pages/show-moves/index";
import { initResultPage } from "./pages/result/index";
import { initNewGamePage } from "./pages/new-game/index";
import { initJoinGamePage } from "./pages/join-game/index";
import { initWFOPage } from "./pages/waiting-for-opponent/index";
import { initWFOReadyPage } from "./pages/waiting-ready-opponent/index";

function routeHandler(path, container) {
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
  if (container.firstChild) {
    container.removeChild(document.querySelector(".container"));
    container.removeChild(document.querySelector(".style"));
  }
  for (const r of routes) {
    if (r.path.test(path)) {
      r.handler(container);
    }
  }
}

export function goTo(path: string) {
  const root = document.querySelector(".root");
  history.pushState({}, "", path);
  routeHandler(path, root);
}

export function initRouter(container: Element) {
  goTo("/home");
}
