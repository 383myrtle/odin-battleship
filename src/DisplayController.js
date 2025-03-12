const renderBoard = (player) => {
  const grid = document.querySelector(`.${player.type}-board .board`);
  grid.textContent = "";
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;
      if (player.gameboard.board[x][y] && player.type === "player") {
        cell.classList.add("has-ship");
      }
      if (player.gameboard.receivedAttacks[x][y] === 1) {
        if (player.gameboard.board[x][y]) {
          cell.classList.add("hit");
        } else {
          cell.classList.add("miss");
        }
        cell.textContent = "X";
      }
      if (player.type === "opponent") {
        cell.addEventListener("click", () => {
          const x = parseInt(cell.dataset.x);
          const y = parseInt(cell.dataset.y);
          player.gameboard.receiveAttack(x, y);
          renderBoard(player);
        });
      }
      grid.appendChild(cell);
    }
  }
};

export { renderBoard };
