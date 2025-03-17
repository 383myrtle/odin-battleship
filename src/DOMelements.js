const playerGrid = document.querySelector(".player-board");
const opponentGrid = document.querySelector(".opponent-board");
const reshuffleButton = document.getElementById("reshuffle");
const nameSubmitButton = document.getElementById("continue");
const nameInput = document.getElementById("name");
const gameInfo = document.querySelector(".game-info");
const mainContent = document.querySelector(".main");
const playerShipCount = document.querySelector(
  ".player-container .ships-remaining",
);
const opponentShipCount = document.querySelector(
  ".opponent-container .ships-remaining",
);
const turn = document.querySelector(".turn");
const gameMessage = document.querySelector(".message");

export {
  playerGrid,
  opponentGrid,
  reshuffleButton,
  nameSubmitButton,
  nameInput,
  gameInfo,
  mainContent,
  playerShipCount,
  opponentShipCount,
  turn,
  gameMessage,
};
