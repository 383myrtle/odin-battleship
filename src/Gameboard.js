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

  outOfBoundsError = new Error("Error. Ship out of bounds of board");
}
