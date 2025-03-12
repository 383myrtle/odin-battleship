import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";

export class Player {
  constructor(name = "Computer") {
    this.gameboard = new Gameboard();
    this.name = name;
    this.type = this.name === "Computer" ? "opponent" : "player";
  }

  initializeRandomBoard() {
    for (let i = 1; i < 6; i++) {
      const ship = new Ship(i);
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
    }
  }

  getRandomCoords() {
    const orientations = ["horizontal", "vertical"];
    let x = Math.round(9 * Math.random());
    let y = Math.round(9 * Math.random());
    const orientation = orientations[Math.round(Math.random())];
    return { x, y, orientation };
  }
}
