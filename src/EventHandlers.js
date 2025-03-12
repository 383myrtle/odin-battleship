import { renderBoard } from "./DisplayController.js";

const handleAttacks = (e, opponent) => {
  try {
    const cell = e.target.closest(".cell");
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    opponent.gameboard.receiveAttack(x, y);
    renderBoard(opponent);
  } catch (e) {
    console.log(e);
  }
};

export { handleAttacks };
