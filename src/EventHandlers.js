import { renderBoard, displayRules, show, hide } from "./DisplayController.js";
import { game } from "./index.js";
import {
  opponentGrid,
  reshuffleButton,
  nameInput,
  mainContent,
  turn,
  gameMessage,
  replayButton,
} from "./DOMelements.js";

const handleGameStart = (e) => {
  game.start();
  reshuffleButton.classList.add("disabled");
  hide(e.target);
};

const handleNameCapture = (e) => {
  e.preventDefault();
  const name = nameInput.value;
  nameInput.value = "";
  game.initialize(name);
  show(mainContent);
  displayRules(game);
};

const handleReshuffle = () => {
  if (!reshuffleButton.classList.contains("disabled")) {
    game.reshufflePlayer();
  }
};

const handleReplay = () => {
  turn.textContent = "";
  gameMessage.textContent = "";
  game.reset();
  reshuffleButton.classList.remove("disabled");
  hide(replayButton);
  const startButton = document.getElementById("start-button");
  show(startButton);
};

function handleAttack(opp) {
  return new Promise((resolve) => {
    opponentGrid.addEventListener("click", function handler(e) {
      console.log("Event listener added to opponent grid");
      const hit = attack(e, opp);
      opponentGrid.removeEventListener("click", handler);
      resolve(hit);
    });
  });
}

function attack(e, opponent) {
  try {
    const cell = e.target.closest(".cell");
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    const hit = opponent.gameboard.receiveAttack(x, y);
    renderBoard(opponent);
    return hit;
  } catch (e) {
    console.log(e);
  }
}

export {
  handleAttack,
  handleGameStart,
  handleNameCapture,
  handleReshuffle,
  handleReplay,
};
