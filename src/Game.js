import { Player } from "./Player.js";
import { renderBoard } from "./DisplayController.js";
import { handleAttacks } from "./EventHandlers.js";

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
      handleAttacks(e, this.opponent);
    });
  }
}
