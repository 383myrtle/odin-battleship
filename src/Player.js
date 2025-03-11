import { Gameboard } from "./Gameboard.js";
import { Ship } from "./Ship.js";

export class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  orientations = ["horizontal", "vertical"];

  initializeRandomBoard() {
    for (let i = 1; i < 6; i++) {
      const ship = new Ship(i);
      let x = Math.round(9 * Math.random());
      let y = Math.round(9 * Math.random());
      const orientation = this.orientations[Math.round(Math.random())];

      let placed = false;
      while (!placed) {
        try {
          this.gameboard.place(ship, x, y, orientation);
          placed = true;
        } catch {
          x = Math.round(9 * Math.random());
          y = Math.round(9 * Math.random());
        }
      }
    }
  }
}
