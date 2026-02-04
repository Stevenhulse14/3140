// ============================================
// TIC-TAC-TOE GAME - Node.js Starter Template
// ============================================
// 
// This is a starter template to help you get started.
// Your challenge: Implement all the TODO sections!
//
// LEARNING GOALS:
// - Practice JavaScript fundamentals
// - Work with arrays and loops
// - Handle user input
// - Implement game logic
// ============================================

const readline = require('readline');

// Create readline interface for getting user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ============================================
// GAME STATE VARIABLES
// ============================================

// Board representation: 3x3 grid
// ' ' = empty, 'X' = player X, 'O' = player O
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let currentPlayer = 'X'; // X always goes first
let gameOver = false;

// ============================================
// DISPLAY FUNCTIONS
// ============================================

/**
 * Displays the current game board to the console
 * 
 * CHALLENGE: Format it nicely so players can see:
 * - Row and column numbers
 * - Current state of each cell
 * - Visual separators (| and -)
 * 
 * Example output:
 *    0   1   2
 * 0  - | - | -
 *   -----------
 * 1  - | X | -
 *   -----------
 * 2  - | - | O
 */
function displayBoard() {
  // TODO: Implement board display
  // Hint: Use console.log() to print
  // Hint: Loop through board array
  // Hint: Format with spaces and separators
  
  console.log('\nCurrent Board:');
  console.log('Board display not implemented yet!');
  console.log('TODO: Show the board here\n');
}

/**
 * Displays game instructions to players
 */
function displayInstructions() {
  console.log('\n========================================');
  console.log('Welcome to Tic-Tac-Toe!');
  console.log('========================================');
  console.log('Players take turns placing X and O');
  console.log('Enter row (0-2) and column (0-2)');
  console.log('First to get 3 in a row wins!');
  console.log('========================================\n');
}

/**
 * Displays the winner or draw message
 */
function displayGameOver(winner) {
  displayBoard();
  if (winner) {
    console.log(`\n🎉 Player ${winner} wins! 🎉\n`);
  } else {
    console.log('\n🤝 It\'s a draw! 🤝\n');
  }
}

// ============================================
// GAME LOGIC FUNCTIONS
// ============================================

/**
 * Makes a move on the board
 * 
 * @param {number} row - Row index (0-2)
 * @param {number} col - Column index (0-2)
 * @param {string} player - 'X' or 'O'
 * @returns {boolean} - True if move was successful, false if invalid
 * 
 * CHALLENGE: Implement move validation and placement
 * - Check if row/col are valid (0-2)
 * - Check if spot is empty
 * - Place the player's mark
 * - Return true if successful, false if invalid
 */
function makeMove(row, col, player) {
  // TODO: Validate row and col are between 0-2
  // TODO: Check if board[row][col] is empty (' ')
  // TODO: If valid, set board[row][col] = player
  // TODO: Return true if move successful, false if invalid
  
  console.log(`TODO: Make move at row ${row}, col ${col} for player ${player}`);
  return false; // Change this!
}

/**
 * Checks if there's a winner
 * 
 * @returns {string|null} - 'X' if X wins, 'O' if O wins, null if no winner
 * 
 * CHALLENGE: Check all win conditions
 * - Rows: All 3 cells in a row are the same (and not empty)
 * - Columns: All 3 cells in a column are the same (and not empty)
 * - Diagonals: All 3 cells in a diagonal are the same (and not empty)
 * 
 * Hint: Check each row, column, and both diagonals
 * Hint: Don't count empty spaces (' ') as wins
 */
function checkWinner() {
  // TODO: Check rows
  // Example: board[0][0] === board[0][1] === board[0][2] !== ' '
  
  // TODO: Check columns
  // Example: board[0][0] === board[1][0] === board[2][0] !== ' '
  
  // TODO: Check diagonals
  // Top-left to bottom-right: board[0][0] === board[1][1] === board[2][2]
  // Top-right to bottom-left: board[0][2] === board[1][1] === board[2][0]
  
  // TODO: Return 'X' if X wins, 'O' if O wins, null if no winner
  
  return null; // Change this!
}

/**
 * Checks if the game is a draw
 * 
 * @returns {boolean} - True if board is full and no winner, false otherwise
 * 
 * CHALLENGE: Check if board is full
 * - Loop through all cells
 * - If any cell is empty (' '), return false
 * - If all cells filled AND no winner, return true
 */
function checkDraw() {
  // TODO: Check if all cells are filled (no ' ' spaces)
  // TODO: Also check that there's no winner
  // TODO: Return true if draw, false otherwise
  
  return false; // Change this!
}

/**
 * Resets the game board for a new game
 */
function resetBoard() {
  board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  currentPlayer = 'X';
  gameOver = false;
}

// ============================================
// INPUT HANDLING
// ============================================

/**
 * Gets a number input from the player
 * 
 * @param {string} prompt - Question to ask player
 * @param {Function} callback - Function to call with the number
 * 
 * CHALLENGE: Validate input
 * - Ask for input using rl.question()
 * - Parse input to integer
 * - Validate it's between 0-2
 * - Re-ask if invalid
 * - Call callback with valid number
 */
function getNumberInput(prompt, callback) {
  // TODO: Use rl.question() to ask for input
  // TODO: Parse input to integer (parseInt)
  // TODO: Validate it's 0, 1, or 2
  // TODO: If invalid, ask again (recursion)
  // TODO: Call callback with valid number
  
  rl.question(prompt, (answer) => {
    const num = parseInt(answer);
    // TODO: Add validation here
    callback(num);
  });
}

/**
 * Gets a move from the current player
 * 
 * @param {Function} callback - Function to call with (row, col)
 * 
 * CHALLENGE: Get row and column from player
 * - Ask for row (0-2)
 * - Ask for column (0-2)
 * - Validate the move is valid (spot is empty)
 * - Re-ask if invalid
 * - Call callback with valid (row, col)
 */
function getPlayerMove(callback) {
  console.log(`\nPlayer ${currentPlayer}'s turn:`);
  
  // TODO: Get row input
  // TODO: Get column input
  // TODO: Check if move is valid (makeMove returns true)
  // TODO: If invalid, show error and ask again
  // TODO: Call callback with (row, col)
  
  getNumberInput(`Enter row (0-2): `, (row) => {
    getNumberInput(`Enter column (0-2): `, (col) => {
      // TODO: Validate move here
      callback(row, col);
    });
  });
}

// ============================================
// MAIN GAME LOOP
// ============================================

/**
 * Main game loop
 * 
 * CHALLENGE: Implement the game flow
 * 1. Display board
 * 2. Get player move
 * 3. Make move
 * 4. Check for winner → if yes, end game
 * 5. Check for draw → if yes, end game
 * 6. Switch players
 * 7. Repeat until game over
 */
function playGame() {
  displayInstructions();
  
  // TODO: Implement main game loop
  // Hint: Use recursion or while loop
  // Hint: Call getPlayerMove() with a callback
  // Hint: In callback, make move, check win/draw, switch players
  
  function gameLoop() {
    if (gameOver) {
      rl.close();
      return;
    }
    
    displayBoard();
    
    // TODO: Get move from current player
    // TODO: Make the move
    // TODO: Check for winner
    // TODO: Check for draw
    // TODO: Switch players
    // TODO: Continue loop or end game
    
    getPlayerMove((row, col) => {
      // TODO: Implement game logic here
      console.log('TODO: Process move and continue game');
      
      // Example structure:
      // if (makeMove(row, col, currentPlayer)) {
      //   const winner = checkWinner();
      //   if (winner) {
      //     gameOver = true;
      //     displayGameOver(winner);
      //     rl.close();
      //   } else if (checkDraw()) {
      //     gameOver = true;
      //     displayGameOver(null);
      //     rl.close();
      //   } else {
      //     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      //     gameLoop();
      //   }
      // } else {
      //   console.log('Invalid move! Try again.');
      //   gameLoop();
      // }
    });
  }
  
  gameLoop();
}

// ============================================
// START THE GAME
// ============================================

// Uncomment when ready to test:
// playGame();

// For now, just show that the file loads:
console.log('Tic-Tac-Toe starter template loaded!');
console.log('TODO: Implement all the functions above');
console.log('Then uncomment playGame() at the bottom to run!');

