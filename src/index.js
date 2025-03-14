import "./styles.css";
import "./normalize.css";
import { Game } from "./Game.js";
import { reshuffleButton } from "./DOMelements.js";

const game = new Game();
reshuffleButton.addEventListener("click", () => {
  game.reshufflePlayer();
});

game.start();
