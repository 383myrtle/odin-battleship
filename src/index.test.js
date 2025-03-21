import { Ship } from "./Ship.js";
import { Gameboard } from "./Gameboard.js";
import { Player } from "./Player.js";

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

describe("Ship placement tests", () => {
  let gameboard;
  let ship;
  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(4);
  });

  test("places ship horizontally at given coordinates", () => {
    gameboard.place(ship, 0, 0, "horizontal");
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[1][0]).toBe(ship);
    expect(gameboard.board[2][0]).toBe(ship);
    expect(gameboard.board[3][0]).toBe(ship);

    expect(gameboard.board[0][1]).toBeFalsy();
    expect(gameboard.board[0][2]).toBeFalsy();
    expect(gameboard.board[0][3]).toBeFalsy();
  });

  test("places ship vertically at given coordinates", () => {
    gameboard.place(ship, 0, 0, "vertical");
    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
    expect(gameboard.board[0][2]).toBe(ship);
    expect(gameboard.board[0][3]).toBe(ship);

    expect(gameboard.board[1][0]).toBeFalsy();
    expect(gameboard.board[2][0]).toBeFalsy();
    expect(gameboard.board[3][0]).toBeFalsy();
  });

  test("throws error if ship goes out of board bounds", () => {
    expect(() => gameboard.place(ship, 8, 0, "horizontal")).toThrow(
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

  test("throws error if ship overlaps with existing ship", () => {
    gameboard.place(ship, 3, 1, "vertical");
    const ship2 = new Ship(3);
    expect(() => gameboard.place(ship2, 2, 2, "horizontal")).toThrow(Error);
    const ship3 = new Ship(2);
    expect(() => gameboard.place(ship3, 3, 0, "vertical")).toThrow(Error);
    expect(gameboard.ships.length).toBe(1);
  });

  test("throws error if ship directly adjacent to another ship", () => {
    gameboard.place(ship, 3, 1, "vertical");
    const ship2 = new Ship(2);
    expect(() => gameboard.place(ship2, 1, 2, "horizontal")).toThrow(Error);

    gameboard.place(ship2, 5, 3, "horizontal");
    const ship3 = new Ship(3);
    expect(() => gameboard.place(ship3, 7, 2, "vertical")).toThrow(Error);

  });
});

describe("Receive attack tests", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);
  gameboard.place(ship, 0, 0, "horizontal");

  test("Receives attack on ship", () => {
    expect(ship.numHits).toBe(0);
    gameboard.receiveAttack(3, 0);
    expect(ship.numHits).toBe(1);
    expect(gameboard.receivedAttacks[3][0]).toBe(1);
  });

  test("Receives missed attack", () => {
    gameboard.receiveAttack(4, 6);
    expect(gameboard.receivedAttacks[4][6]).toBe(1);
  });

  test("Throws error for invalid coordinates", () => {
    expect(() => gameboard.receiveAttack(10, 5)).toThrow(
      "Error. Ship out of bounds of board",
    );
  });
});

describe("All ships sunk test", () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(1);
  const ship2 = new Ship(2);
  gameboard.place(ship1, 3, 1, "horizontal");
  gameboard.place(ship2, 0, 0, "horizontal");

  test("tracks ships on board", () => {
    expect(gameboard.ships.includes(ship1)).toBe(true);
    expect(gameboard.ships.includes(ship2)).toBe(true);
  });

  test("checks if all ships have sunk", () => {
    expect(gameboard.allShipsSunk()).toBe(false);
    ship1.hit();
    ship2.hit();
    ship2.hit();
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});

describe("Player initialization tests", () => {
  const player = new Player();

  test("adds five ships to board", () => {
    player.initializeRandomBoard();
    expect(player.gameboard.ships.length).toBe(5);
  });
});
