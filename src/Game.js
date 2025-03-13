import { Player } from "./Player.js";
import { renderBoard } from "./DisplayController.js";
import { handleAttack } from "./EventHandlers.js";
import { opponentGrid } from "./DOMelements.js";

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
    let result = this.checkWin();
    while (!result.gameOver) {
      await this.playerAttack();
      if (this.checkWin().gameOver) {
        break;
      }
      this.randomOpponentAttack();
      result = this.checkWin();
    }
  }

  playerAttack() {
    const opp = this.opponent;

    return new Promise((resolve) => {
      opponentGrid.addEventListener("click", function handler(e) {
        handleAttack(e, opp);
        opponentGrid.removeEventListener("click", handler);
        resolve();
      });
    });
  }

  randomOpponentAttack() {
    setTimeout(() => {
      let x = Math.round(9 * Math.random());
      let y = Math.round(9 * Math.random());

      while (this.player.gameboard.receivedAttacks[x][y]) {
        x = Math.round(9 * Math.random());
        y = Math.round(9 * Math.random());
      }

      this.player.gameboard.receiveAttack(x, y);
      renderBoard(this.player);
    }, 350);
  }

  checkWin() {
    if (this.player.gameboard.allShipsSunk()) {
      return {
        winner: this.opponent,
        gameOver: true,
      };
    }
    if (this.opponent.gameboard.allShipsSunk()) {
      return {
        winner: this.player,
        gameOver: true,
      };
    }
    return {
      gameOver: false,
    };
  }
}
