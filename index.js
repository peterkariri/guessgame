// Game variables
const boardSize = 12; // Number of unique pairs (1 to 12)
let cardsArray = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };
let matchedPairs = 0;

// DOM elements
const score1Display = document.getElementById("score1");
const score2Display = document.getElementById("score2");
const player1Display = document.getElementById("player1");
const player2Display = document.getElementById("player2");
const modal = document.getElementById("endGameModal");
const modalContent = document.getElementById("modalContent");

// Create and shuffle the cards
function initializeGame() {
  cardsArray = [...Array(boardSize).keys()].concat([
    ...Array(boardSize).keys(),
  ]); // Create pairs
  cardsArray.sort(() => Math.random() - 0.5); // Shuffle cards

  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = ""; // Clear the board

  cardsArray.forEach((number, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    card.dataset.number = number;
    card.dataset.index = index;

    card.innerHTML = `
            <div class="card-content front">X</div>
            <div class="card-content back">${number + 1}</div>
        `;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });

  matchedPairs = 0;
  scores = { 1: 0, 2: 0 }; // Reset scores
  score1Display.textContent = 0;
  score2Display.textContent = 0;
  updatePlayerUI(); // Highlight the current player
  hideModal(); // Hide the modal at the start
}

// Flip a card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    // First card clicked
    firstCard = this;
  } else {
    // Second card clicked
    secondCard = this;

    checkForMatch();
  }
}

// Check if the two cards match
function checkForMatch() {
  if (firstCard.dataset.number === secondCard.dataset.number) {
    updateScore();
    disableCards();
    matchedPairs++;

    if (matchedPairs === boardSize) {
      endGame();
    }
  } else {
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.classList.remove("hidden");
  secondCard.classList.remove("hidden");
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
    switchPlayer(); // Switch turns after an unsuccessful match
  }, 1000);
}

// Reset card variables
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Update player score when they match a pair
function updateScore() {
  scores[currentPlayer]++;
  if (currentPlayer === 1) {
    score1Display.textContent = scores[1];
  } else {
    score2Display.textContent = scores[2];
  }
}

// Switch turns between players
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updatePlayerUI();
}

// Highlight the current player in the UI
function updatePlayerUI() {
  if (currentPlayer === 1) {
    player1Display.classList.add("active");
    player2Display.classList.remove("active");
  } else {
    player1Display.classList.remove("active");
    player2Display.classList.add("active");
  }
}

// End the game, check the winner, and display result
function endGame() {
  let message;
  if (scores[1] > scores[2]) {
    message = "Player 1 Wins!";
  } else if (scores[2] > scores[1]) {
    message = "Player 2 Wins!";
  } else {
    message = "It's a Tie!";
    reshuffleGame(); // Reshuffle and start again if it's a tie
  }

  displayModal(message);
}

// Display the modal with the result message
function displayModal(message) {
  modalContent.textContent = message;
  modal.style.display = "flex"; // Show the modal with the result
}

// Hide the modal
function hideModal() {
  modal.style.display = "none"; // Hide the modal at the start of the game
}

// Reshuffle the game in case of a tie
function reshuffleGame() {
  setTimeout(() => {
    initializeGame(); // Restart the game after a delay
  }, 2000); // 2-second delay before reshuffling
}

// Start the game
initializeGame();
