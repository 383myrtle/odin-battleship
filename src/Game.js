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
    outerloop: while (!result.gameOver) {
      let data;
      do {
        data = await this.playerAttack();
        result = this.checkWin();
        if (result.gameOver) {
          break outerloop;
        }
      } while (data);
      
      this.randomOpponentAttack();
      result = this.checkWin();
    }
    console.log(result);
  }

  playerAttack() {
    const opp = this.opponent;

    return new Promise((resolve) => {
      opponentGrid.addEventListener("click", function handler(e) {
        const hit = handleAttack(e, opp);
        opponentGrid.removeEventListener("click", handler);
        resolve(hit);
      });
    });
  }

  async randomOpponentAttack() {
    let hit;
    do {
      await this.delay(350);
      let x, y;
      do {
        x = Math.round(9 * Math.random());
        y = Math.round(9 * Math.random());
      } while (this.player.gameboard.receivedAttacks[x][y]);

      hit = this.player.gameboard.receiveAttack(x, y);
      renderBoard(this.player);
    } while (hit);
  }

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
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

  reshufflePlayer(){
    this.player.initializeRandomBoard();
    renderBoard(this.player);
  }
}
