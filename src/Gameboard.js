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
    this.validateCoords(start_x, start_y);
    this.validateShipPlacement(ship, start_x, start_y, orientation);
    this.addShip(ship);

    switch (orientation) {
      case "vertical":
        for (let i = 0; i < ship.length; i++) {
          this.board[start_x][start_y + i] = ship;
        }
        break;
      case "horizontal":
        for (let i = 0; i < ship.length; i++) {
          this.board[start_x + i][start_y] = ship;
        }
        break;
      default:
        throw new Error(`Error. Ship orientation ${orientation} not defined`);
    }
  }

  addShip(ship) {
    if (!this.ships.includes(ship)) {
      this.ships.push(ship);
    }
  }

  validateShipPlacement(ship, start_x, start_y, orientation) {
    switch (orientation) {
      case "vertical":
        if (start_y + ship.length > 9) {
          throw this.outOfBoundsError;
        }
        if (
          this.board[start_x]
            .slice(start_y, start_y + ship.length)
            .some((point) => point !== null)
        ) {
          throw new Error(
            "Error. Ship cannot overlap with already placed ship.",
          );
        }
        break;
      case "horizontal":
        if (start_x + ship.length > 9) {
          throw this.outOfBoundsError;
        }
        if (
          this.board
            .slice(start_x, start_x + ship.length)
            .some((x) => x[start_y] !== null)
        ) {
          throw new Error(
            "Error. Ship cannot overlap with already placed ship.",
          );
        }
        break;
      default:
        throw new Error(`Error. Ship orientation ${orientation} not defined`);
    }
  }

  receiveAttack(x, y) {
    this.validateCoords(x, y);
    if (this.board[x][y] !== null) {
      this.board[x][y].hit();
    }
    this.hits[x][y] = 1;
  }

  allShipsSunk() {
    return !this.ships.some((ship) => !ship.isSunk());
  }

  validateCoords(row, col) {
    if (row < 0 || col < 0 || row > 9 || col > 9) {
      throw this.outOfBoundsError;
    }
  }

  outOfBoundsError = new Error("Error. Ship out of bounds of board");
}
