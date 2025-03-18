import { renderBoard } from "./DisplayController.js";
import { opponentGrid } from "./DOMelements.js";

function handleAttack(opp) {
  return new Promise((resolve) => {
    opponentGrid.addEventListener("click", function handler(e) {
      console.log("Event listener added to opponent grid")
      const hit = attack(e, opp);
      opponentGrid.removeEventListener("click", handler);
      resolve(hit);
    });
  });
}

function attack(e, opponent){
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
};

export { handleAttack };
