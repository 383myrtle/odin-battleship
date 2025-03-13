import { renderBoard } from "./DisplayController.js";

const handleAttack = (e, opponent) => {
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
