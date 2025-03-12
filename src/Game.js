import { Player } from "./Player.js";
import { renderBoard } from "./DisplayController.js";

export class Game {
  constructor(playerName) {
    this.player = new Player(playerName);
    this.opponent = new Player();
    this.initialize();
  }

  initialize() {
    this.player.initializeRandomBoard();
    this.opponent.initializeRandomBoard();
    renderBoard(this.player);
    renderBoard(this.opponent);
  }

  start() {
    const opponentGrid = document.querySelector(".opponent-board .board");
    opponentGrid.addEventListener("click", (e) => {
      const cell = e.target.closest(".cell");
      const x = parseInt(cell.dataset.x);
      const y = parseInt(cell.dataset.y);
      this.opponent.gameboard.receiveAttack(x, y);
      renderBoard(this.opponent);
    });
  }
}
