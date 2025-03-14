import {
  playerGrid,
  opponentGrid,
  nameSubmitButton,
  nameInput,
  reshuffleButton,
} from "./DOMelements.js";

const gridMap = {
  player: playerGrid,
  opponent: opponentGrid,
};

const renderBoard = (player) => {
  const grid = gridMap[player.type];
  grid.textContent = "";
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const cell = createCell(player, x, y);
      grid.appendChild(cell);
    }
  }
};

function createCell(player, x, y) {
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
  return cell;
}

const setUpEventListeners = (game) => {
  nameSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = nameInput.value;
    nameInput.value = "";
    game.initialize(name);
    reshuffleButton.classList.remove("hidden");
    game.start();
  });
};

export { renderBoard, setUpEventListeners };
