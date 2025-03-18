import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";

export class Player {
  constructor(name = "Computer") {
    this.gameboard = new Gameboard();
    this.name = name;
    this.type = this.name === "Computer" ? "opponent" : "player";
  }

  shipSizes = [2, 3, 3, 4, 5];

  initializeRandomBoard() {
    this.gameboard.initialize();
    this.shipSizes.forEach((size) => {
      const ship = new Ship(size);
      let coords = this.getRandomCoords();
      let placed = false;
      while (!placed) {
        try {
          this.gameboard.place(ship, coords.x, coords.y, coords.orientation);
          placed = true;
        } catch {
          coords = this.getRandomCoords();
        }
      }
    });
  }

  getRandomCoords() {
    const orientations = ["horizontal", "vertical"];
    let x = Math.round(9 * Math.random());
    let y = Math.round(9 * Math.random());
    const orientation = orientations[Math.round(Math.random())];
    return { x, y, orientation };
  }
}
