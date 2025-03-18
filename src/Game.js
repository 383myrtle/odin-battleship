import { Player } from "./Player.js";
import { renderBoard, setTurn, setWinner } from "./DisplayController.js";
import { handleAttack } from "./EventHandlers.js";

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
    while (!result.gameOver) {
      // Wait for player to attack and check if game over
      setTurn(this.player);
      await this.playerAttack();
      result = this.checkWin();
      if (result.gameOver){
        break;
      }

      // Wait for opponent to attack and check if game over
      setTurn(this.opponent);
      await this.randomOpponentAttack();
      result = this.checkWin();
    }
    console.log(result);
    setWinner(result.winner);
  }

  async playerAttack() {
    // If player lands attack, let them attack again
    let attackLanded;
    do {
      attackLanded = await handleAttack(this.opponent);
      const result = this.checkWin();
      if (result.gameOver) {
        return;
      }
    } while (attackLanded);
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
    } while (hit);
    return;
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
