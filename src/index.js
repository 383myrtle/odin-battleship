import "./styles.css";
import "./normalize.css";

import { renderBoard } from "./DisplayController.js";
import { Player } from "./Player.js";

const player = new Player("Player 1");
const opponent = new Player();
player.initializeRandomBoard();
opponent.initializeRandomBoard();
renderBoard(player);
renderBoard(opponent);
