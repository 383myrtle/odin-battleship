import { Ship } from "./Ship.js";

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
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true);
  });
});