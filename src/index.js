import "./styles.css";
import "./normalize.css";
import { Game } from "./Game.js";
import { reshuffleButton } from "./DOMelements.js";
import { setUpEventListeners } from "./DisplayController.js";

const game = new Game();
setUpEventListeners(game);
reshuffleButton.addEventListener("click", () => {
  game.reshufflePlayer();
});