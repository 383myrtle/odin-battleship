import { Ship } from "./Ship.js";
import { Gameboard } from "./Gameboard.js";

describe("Ship methods", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(5);
  });
  test("Length is 5", () => {
    expect(ship.length).toBe(5);
  });
  test("Hit method increases numHits", () => {
    ship.hit();
    expect(ship.numHits).toBe(1);
  });
  test("isSunk method works", () => {
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard methods", () => {
  let gameboard;
  let ship;
  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(4);
  });

  test("places ship horizontally at given coordinates", () => {
    gameboard.place(ship, 0, 0, "horizontal");
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
    expect(gameboard.board[0][3]).toBe(ship);

    expect(gameboard.board[1][0]).toBe(null);
    expect(gameboard.board[2][0]).toBe(null);
    expect(gameboard.board[3][0]).toBe(null);
  });

  test("places ship vertically at given coordinates", () => {
    gameboard.place(ship, 0, 0, "vertical");
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
    expect(gameboard.board[3][0]).toBe(ship);

    expect(gameboard.board[0][1]).toBe(null);
    expect(gameboard.board[0][2]).toBe(null);
    expect(gameboard.board[0][3]).toBe(null);
  });

  test("throws error if ship goes out of board bounds", () => {
    expect(() => gameboard.place(ship, 0, 8, "horizontal")).toThrow(
      "Error. Ship out of bounds of board",
    );
  });

  test("throws error if there are negative coordinates", () => {
    expect(() => gameboard.place(ship, 0, -1, "horizontal")).toThrow(
      "Error. Ship out of bounds of board",
    );
    expect(() => gameboard.place(ship, -1, 0, "horizontal")).toThrow(
      "Error. Ship out of bounds of board",
    );
  });

  test("throws error if orientation not defined", () => {
    expect(() => gameboard.place(ship, 0, 8)).toThrow(/orientation/);
    expect(() => gameboard.place(ship, 0, 8, "diagonal")).toThrow(
      /orientation/,
    );
  });
});
