const playerGrid = document.querySelector(".player-board .board");
const opponentGrid = document.querySelector(".opponent-board .board");


const renderPlayerBoard = (gameboard) => {
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (gameboard.board[x][y]) {
        cell.classList.add("has-ship");
      }
      if (gameboard.receivedAttacks[x][y] === 1) {
        cell.classList.add("hit");
        cell.textContent = "X";
      }
      playerGrid.appendChild(cell);
    }
  }
};

const renderOpponentBoard = (gameboard) => {
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (gameboard.receivedAttacks[x][y] === 1) {
        if (gameboard.board[x][y]) {
          cell.classList.add("hit");
        } else {
          cell.classList.add("miss");
        }
        cell.textContent = "X";
      }
      opponentGrid.appendChild(cell);
    }
  }
};

export { renderPlayerBoard, renderOpponentBoard };
