import { Player } from "./Player.js";
import { renderBoard, setTurn, setWinner } from "./DisplayController.js";
import { handleAttack } from "./EventHandlers.js";
import { opponentGrid } from "./DOMelements.js";

export class Game {
  initialize(playerName) {
    this.player = new Player(playerName);
    this.opponent = new Player();
    this.player.initializeRandomBoard();
    this.opponent.initializeRandomBoard();
    renderBoard(this.player);
    renderBoard(this.opponent);
  }

  async start() {
    let result = this.checkWin();
    outerloop: while (!result.gameOver) {
      let data;
      setTurn(this.player);
      do {
        data = await this.playerAttack();
        result = this.checkWin();
        if (result.gameOver) {
          break outerloop;
        }
      } while (data);
      setTurn(this.opponent);
      await this.randomOpponentAttack();
      result = this.checkWin();
    }
    console.log(result);
    setWinner(result.winner);
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
      await this.delay(500);
      let x, y;
      do {
        x = Math.round(9 * Math.random());
        y = Math.round(9 * Math.random());
      } while (this.player.gameboard.receivedAttacks[x][y]);

      hit = this.player.gameboard.receiveAttack(x, y);
      renderBoard(this.player);
      return true;
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

  reset() {
    this.player.initializeRandomBoard();
    this.opponent.initializeRandomBoard();
    renderBoard(this.player);
    renderBoard(this.opponent);
  }

  reshufflePlayer() {
    this.player.initializeRandomBoard();
    renderBoard(this.player);
  }
}
