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
    this.ships = [];
  }

  place(ship, start_x, start_y, orientation) {
    if (!this.isValidCoords(start_x, start_y)) {
      throw this.outOfBoundsError;
    }
    switch (orientation) {
      case "vertical":
        if (start_y + ship.length > 9) {
          throw this.outOfBoundsError;
        }
        for (let i = 0; i < ship.length; i++) {
          this.board[start_x][start_y + i] = ship;
          if (!this.ships.includes(ship)) {
            this.ships.push(ship);
          }
        }
        break;
      case "horizontal":
        if (start_x + ship.length > 9) {
          throw this.outOfBoundsError;
        }
        for (let i = 0; i < ship.length; i++) {
          this.board[start_x + i][start_y] = ship;
          if (!this.ships.includes(ship)) {
            this.ships.push(ship);
          }
        }
        break;
      default:
        throw new Error(`Error. Ship orientation ${orientation} not defined`);
    }
  }

  receiveAttack(x, y) {
    if (!this.isValidCoords(x, y)) {
      throw this.outOfBoundsError;
    }
    if (this.board[x][y] !== null) {
      this.board[x][y].hit();
    }
    this.hits[x][y] = 1;
  }

  allShipsSunk() {
    return !this.ships.some((ship) => !ship.isSunk());
  }

  isValidCoords(row, col) {
    if (row < 0 || col < 0 || row > 9 || col > 9) {
      return false;
    }
    return true;
  }

  outOfBoundsError = new Error("Error. Ship out of bounds of board");
}
