import "./styles.css";
import "./normalize.css";
import { Game } from "./Game.js";
import { setUpEventListeners } from "./DisplayController.js";

const game = new Game();
setUpEventListeners();

export { game };
