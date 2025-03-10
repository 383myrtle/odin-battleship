export class Gameboard {
  constructor() {
    this.board = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
    this.hits = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  place(ship, rowStart, colStart, orientation) {
    if (!(rowStart >= 0 && colStart >= 0)) {
      throw this.outOfBoundsError;
    }
    switch (orientation) {
      case "horizontal":
        if (colStart + ship.length > 9) {
          throw this.outOfBoundsError;
        }
        for (let i = 0; i < ship.length; i++) {
          this.board[rowStart][colStart + i] = ship;
        }
        break;
      case "vertical":
        if (rowStart + ship.length > 9) {
          throw this.outOfBoundsError;
        }
        for (let i = 0; i < ship.length; i++) {
          this.board[rowStart + i][colStart] = ship;
        }
        break;
      default:
        throw new Error(`Error. Ship orientation ${orientation} not defined`);
    }
  }

  receiveAttack(row, col) {
    if (this.board[row][col] !== null) {
      this.board[row][col].hit();
    }
    this.hits[row][col] = 1;
  }
  outOfBoundsError = new Error("Error. Ship out of bounds of board");
}
