# Tic-Tac-Toe Multiplayer Game

This is a simple, real-time multiplayer Tic-Tac-Toe game built with HTML, CSS, JavaScript, and Firebase. It allows two players to create and join game rooms using unique room codes and play Tic-Tac-Toe online.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [How to Play](#how-to-play)
- [File Structure](#file-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features
- **Real-time Multiplayer**: Play against friends by creating or joining rooms.
- **Firebase Backend**: Real-time updates for game state, including board status and player turns.
- **Responsive Design**: Compatible with desktop and mobile screens.
- **Game Restart**: Easily restart the game after a match without needing to recreate the room.

## Technologies Used
- **HTML & CSS**: Structure and styling.
- **JavaScript**: Game logic and Firebase interactions.
- **Firebase Realtime Database**: For storing and syncing game state in real time.

## Setup Instructions

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/mnn2003/Tic-Tac-Toe-Multiplayer.git
    cd tic-tac-toe-multiplayer
    ```

2. **Firebase Configuration**:
    - Go to [Firebase Console](https://console.firebase.google.com/).
    - Create a new project and enable the Realtime Database.
    - Copy the Firebase configuration keys and replace them in the `firebaseConfig` object in `app.js`.

3. **Launch the Game**:
    - Open `index.html` in your browser to start the game locally.

## How to Play

1. **Create a Room**:
    - Click "Create Room" to generate a unique room code.
    - Share this room code with a friend for them to join.

2. **Join a Room**:
    - Enter a valid room code and click "Join Room" to join an existing game.

3. **Gameplay**:
    - The first player to click "Create Room" plays as "X," and the second player as "O."
    - Take turns clicking on cells to make a move. The game updates in real-time to display the current state.

4. **Winning and Restarting**:
    - If a player wins, an alert displays the winner, and the game can be restarted by clicking the "Restart Game" button.

## File Structure

```plaintext
├── index.html           # Main HTML file
├── style.css            # Styling for the game board
├── app.js               # JavaScript with game logic and Firebase functionality
└── README.md            # Documentation
