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
    if (!this.isValidCoords(rowStart, colStart)) {
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
    if (!this.isValidCoords(row, col)) {
      throw this.outOfBoundsError;
    }
    if (this.board[row][col] !== null) {
      this.board[row][col].hit();
    }
    this.hits[row][col] = 1;
  }

  isValidCoords(row, col) {
    if (row < 0 || col < 0 || row > 9 || col > 9) {
      return false;
    }
    return true;
  }

  outOfBoundsError = new Error("Error. Ship out of bounds of board");
}
