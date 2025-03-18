import {
  playerGrid,
  opponentGrid,
  nameSubmitButton,
  reshuffleButton,
  gameInfo,
  playerShipCount,
  opponentShipCount,
  turn,
  gameMessage,
  replayButton,
} from "./DOMelements.js";
import { handleGameStart, handleNameCapture, handleReplay, handleReshuffle } from "./EventHandlers.js";

const elementMap = {
  player: {
    grid: playerGrid,
    shipCount: playerShipCount,
  },
  opponent: {
    grid: opponentGrid,
    shipCount: opponentShipCount,
  },
};

const renderBoard = (player) => {
  // Create grid from player gameboard
  const grid = elementMap[player.type].grid;
  grid.textContent = "";
  for (let y = 9; y >= 0; y--) {
    for (let x = 0; x < 10; x++) {
      const cell = createCell(player, x, y);
      grid.appendChild(cell);
    }
  }

  // Display remaining ship count
  const shipCount = elementMap[player.type].shipCount;
  shipCount.textContent = player.gameboard.ships.reduce(
    (acc, ship) => acc + (ship.isSunk() ? 0 : 1),
    0,
  );
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
  }
  return cell;
}

const setUpEventListeners = () => {
  nameSubmitButton.addEventListener("click", handleNameCapture);
  reshuffleButton.addEventListener("click", handleReshuffle);
  replayButton.addEventListener("click", handleReplay);
};

function addStartButton() {
  const startButton = document.createElement("button");
  startButton.id = "start-button";
  startButton.textContent = "Start Game";
  startButton.addEventListener("click", handleGameStart);
  gameInfo.appendChild(startButton);
}

function displayRules(game) {
  gameInfo.textContent = "";
  addStartButton();
  const rulesInfo = document.createElement("div");
  rulesInfo.classList.add("rules");
  rulesInfo.innerHTML = `          
          <h2>Rules</h2>
          <ol>
            <li>Each player has a 10x10 board.</li>
            <li>Each player has 5 ships: Carrier (5), Battleship (4), Cruiser (3), Submarine (3), Destroyer (2).</li>
            <li>Ships cannot overlap or be directly adjacent.</li>
            <li>Ships cannot be placed diagonally.</li>
            <li>Players take turns guessing the location of the opponent's ships.</li>
            <li>When a player hits a ship, they get another turn.</li>
            <li>The game ends when all of a player's ships are sunk.</li>
          </ol>
`;
  gameInfo.appendChild(rulesInfo);
}

const setTurn = (player) => {
  turn.textContent = `${player.name}'s turn`;
  if (player.type === "player") {
    gameMessage.textContent =
      "Click a square on the opponent's board to attack!";
  } else {
    gameMessage.textContent = "";
  }
};

const setWinner = (player) => {
  turn.textContent = `${player.name} won the game!`;
  gameMessage.textContent = "Play again by pressing the button below";
  replayButton.classList.remove("hidden");
};

export { renderBoard, displayRules, setUpEventListeners, setTurn, setWinner };
