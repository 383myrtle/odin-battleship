# Battleship Game

## Overview

This is a browser-based implementation of the game of Battleship built for the [Battleship project of the Odin Project course](https://www.theodinproject.com/lessons/node-path-javascript-battleship). The game allows a player to place ships on a grid and compete against a computer opponent that makes random attacks. The game logic and UI are modularized to ensure separation of concerns and maintainability.

## Features

- Randomized ship placement for both the player and the computer opponent.
- Turn-based gameplay, where the player attacks first, followed by the computer opponent.
- The computer opponent selects random unhit positions for attacks.
- A simple, interactive UI that updates dynamically.
- Ability to reshuffle the player's board before starting the game.
- Modular code structure separating game logic, UI, and event handling.
- Replay functionality to restart the game after it ends.
- Rules display to guide players before starting the game.

## Technologies Used

- JavaScript (ES6+)
- HTML/CSS
- Webpack (for bundling assets)
- Jest (for unit testing)

## Installation

Clone this repository:

```bash
git clone https://github.com/383myrtle/odin-battleship.git
```

Navigate into the project folder:

```bash
cd odin-battleship
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the browser and go to:

```
http://localhost:8080
```

To build the project for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## How to Play

1. **Ship Placement**: Ships are randomly placed on the board. Press the reshuffle button to get a different layout.
2. **Start Game**: Press the start button to begin the game.
3. **Turn-Based Play**: Each time you attack, the computer opponent responds with an attack. If your attack lands, you get to go again.
4. **Winning Condition**: The game continues until either the player or the opponent loses all their ships.

## Code Structure

The project is divided into multiple modules:

- **Game.js**: Manages the game logic, including ship placement, turn handling, and win conditions.
- **DisplayController.js**: Handles the visual updates, rendering the boards, and managing UI interactions.
- **EventHandlers.js**: Manages user input events like clicks and button presses.
- **Ship.js**: Defines the Ship class, including hit detection and sinking behavior.
- **Gameboard.js**: Represents the game grid, tracking ship placement and received attacks.
- **Player.js**: Manages player and computer opponent actions.
- **DOMelements.js**: Provides references to DOM elements used throughout the application.

## License

This project is open-source under the MIT License.
