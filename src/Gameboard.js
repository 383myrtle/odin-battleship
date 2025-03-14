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
    this.receivedAttacks = [
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
        if (start_y - 1 >= 0) {
          this.board[start_x][start_y - 1] = 0;
        }
        if (start_y + ship.length < 10) {
          this.board[start_x][start_y + ship.length] = 0;
        }

        for (let i = 0; i < ship.length; i++) {
          this.board[start_x][start_y + i] = ship;
          if (start_x - 1 > 0) {
            this.board[start_x - 1][start_y + i] = 0;
          }
          if (start_x + 1 < 10) {
            this.board[start_x + 1][start_y + i] = 0;
          }
        }
        break;
      case "horizontal":
        if (start_x - 1 >= 0) {
          this.board[start_x - 1][start_y] = 0;
        }
        if (start_x + ship.length < 10) {
          this.board[start_x + ship.length][start_y] = 0;
        }

        for (let i = 0; i < ship.length; i++) {
          this.board[start_x + i][start_y] = ship;

          if (start_y - 1 > 0) {
            this.board[start_x + i][start_y + -1] = 0;
          }
          if (start_y + 1 < 10) {
            this.board[start_x + i][start_y + 1] = 0;
          }
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
    if (this.board[x][y]) {
      this.board[x][y].hit();
      this.receivedAttacks[x][y] = 1;
      return true;
    }
    this.receivedAttacks[x][y] = 1;
    return false;
  }

  allShipsSunk() {
    return !this.ships.some((ship) => !ship.isSunk());
  }

  validateCoords(row, col) {
    if (row < 0 || col < 0 || row > 9 || col > 9) {
      throw this.outOfBoundsError;
    }
  }

  clear(){
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
    this.receivedAttacks = [
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
  
  outOfBoundsError = new Error("Error. Ship out of bounds of board");
}
