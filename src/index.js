import "./styles.css";
import "./normalize.css";

import { renderPlayerBoard, renderOpponentBoard } from "./DisplayController.js";
import { Player } from "./Player.js";

const player = new Player();
const opponent = new Player();
player.initializeRandomBoard();
renderPlayerBoard(player.gameboard);
renderOpponentBoard(opponent.gameboard);
