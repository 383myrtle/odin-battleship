import { Player } from "./Player.js";
import { renderBoard } from "./DisplayController.js";
import { handleAttack } from "./EventHandlers.js";

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

  async start() {
    const opponentGrid = document.querySelector(".opponent-board .board");

    let result = this.checkWin();
    while (result === null) {
      await this.playerAttack(opponentGrid, this.opponent);
      result = this.checkWin();
      if (result !== null) {
        break;
      }
      this.randomOpponentAttack();
      result = this.checkWin();
    }
  }

  playerAttack(opponentGrid, opponent) {
    return new Promise((resolve) => {
      opponentGrid.addEventListener("click", function handler(e) {
        handleAttack(e, opponent);
        opponentGrid.removeEventListener("click", handler);
        resolve();
      });
    });
  }

  randomOpponentAttack() {
    let x = Math.round(9 * Math.random());
    let y = Math.round(9 * Math.random());

    while (this.player.gameboard.receivedAttacks[x][y]) {
      x = Math.round(9 * Math.random());
      y = Math.round(9 * Math.random());
    }

    this.player.gameboard.receiveAttack(x, y);
    renderBoard(this.player);
  }

  checkWin() {
    if (this.player.gameboard.allShipsSunk()) {
      return this.player;
    }
    if (this.opponent.gameboard.allShipsSunk()) {
      return this.opponent;
    }
    return null;
  }
}
