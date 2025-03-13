import { Player } from "./Player.js";
import { renderBoard } from "./DisplayController.js";
import { handleAttack } from "./EventHandlers.js";

export class Game {
  constructor(playerName) {
    this.player = new Player(playerName);
    this.opponent = new Player();
    this.initialize();
    this.opponentGrid = document.querySelector(".opponent-board");
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
      if (this.checkWin().gameOver){
        break
      };
      this.randomOpponentAttack();
      result = this.checkWin();
    }
  }

  playerAttack() {
    const grid = this.opponentGrid;
    const opp = this.opponent;
    
    return new Promise((resolve) => {
      grid.addEventListener("click", function handler(e) {
        handleAttack(e, opp);
        grid.removeEventListener("click", handler);
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
