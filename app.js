import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, ref, set, get, update, onValue } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {
     apiKey: "AIzaSyBFHgyqk16_cxG1o7EF2OQ8ksxsjA1ENKk",
     authDomain: "pq-hub-906ed.firebaseapp.com",
     databaseURL: "https://pq-hub-906ed-default-rtdb.firebaseio.com",
     projectId: "pq-hub-906ed",
     storageBucket: "pq-hub-906ed.appspot.com",
     messagingSenderId: "226267686237",
     appId: "1:226267686237:web:6f0583e680ee61cb8534b4",
     measurementId: "G-NX9Z51PMEJ"
 };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const createRoomBtn = document.getElementById('create-room-btn');
const joinRoomBtn = document.getElementById('join-room-btn');
const roomCodeInput = document.getElementById('room-code-input');
const gameSection = document.getElementById('game-section');
const roomInfo = document.getElementById('room-info');
const turnInfo = document.getElementById('turn-info');
const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');

const turnModal = new bootstrap.Modal(document.getElementById('turnModal'), {
    keyboard: false
});

let roomCode = '';
let playerSymbol = '';
let currentTurn = 'X';
let isGameOver = false;

createRoomBtn.addEventListener('click', createRoom);
joinRoomBtn.addEventListener('click', joinRoom);
restartBtn.addEventListener('click', restartGame);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function createRoom() {
    roomCode = generateRoomCode();
    playerSymbol = 'X';
    setupRoom(roomCode, playerSymbol);
}

function joinRoom() {
    roomCode = roomCodeInput.value.trim();
    if (roomCode) {
        playerSymbol = 'O';
        setupRoom(roomCode, playerSymbol);
    } else {
        alert('Please enter a valid room code.');
    }
}

function setupRoom(roomCode, symbol) {
    roomInfo.textContent = `Room Code: ${roomCode}`;
    gameSection.classList.remove('hidden');

    const roomRef = ref(database, `rooms/${roomCode}`);

    get(roomRef).then(snapshot => {
        if (!snapshot.exists()) {
            set(roomRef, {
                board: Array(9).fill(''),
                turn: 'X',
                winner: ''
            });
        }
    });

    onValue(roomRef, snapshot => {
        const data = snapshot.val();
        if (data) {
            updateGameBoard(data.board);
            currentTurn = data.turn;
            updateTurnInfo(data.turn);
            if (data.winner) {
                alert(`${data.winner} wins!`);
                isGameOver = true;
                restartBtn.classList.remove('hidden');
            }
        }
    });
}

function handleCellClick(event) {
    if (isGameOver) return;

    const cellIndex = event.target.getAttribute('data-index');
    const roomRef = ref(database, `rooms/${roomCode}`);

    get(roomRef).then(snapshot => {
        const data = snapshot.val();
        if (data.board[cellIndex] === '' && currentTurn === playerSymbol) {
            const updatedBoard = [...data.board];
            updatedBoard[cellIndex] = playerSymbol;

            let winner = checkWinner(updatedBoard);
            update(roomRef, {
                board: updatedBoard,
                turn: playerSymbol === 'X' ? 'O' : 'X',
                winner: winner
            });
        } else {
            showTurnAlert(`It's your opponent's turn.`);
        }
    });
}

function showTurnAlert(message) {
    document.getElementById('modal-body-text').textContent = message;
    turnModal.show();
}

function updateTurnInfo(turn) {
    turnInfo.textContent = `Current Turn: ${turn}`;
 
}

function updateGameBoard(board) {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWinner(board) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return '';
}

function restartGame() {
    const roomRef = ref(database, `rooms/${roomCode}`);
    set(roomRef, {
        board: Array(9).fill(''),
        turn: 'X',
        winner: ''
    });
    isGameOver = false;
    restartBtn.classList.add('hidden');
}

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}
