# 🎮 TP2: Tic-Tac-Toe in Node.js

## 📋 Project Overview

Welcome to **TP2**! This project will help you build a **Tic-Tac-Toe game** that runs in **Node.js** (command line). You'll practice:

- ✅ **JavaScript fundamentals** (variables, functions, loops, conditionals)
- ✅ **Node.js basics** (reading user input, console output)
- ✅ **Game logic** (win conditions, turn management)
- ✅ **Problem-solving** (breaking down complex problems)

---

## 🎯 Learning Objectives

By completing this project, you will:

1. **Write** JavaScript code that runs in Node.js
2. **Handle** user input from the command line
3. **Implement** game logic and win conditions
4. **Structure** code with functions
5. **Debug** and test your game

---

## ⚙️ Project Requirements

### Core Requirements:

- ✅ Game runs in **Node.js** (command line)
- ✅ **Two players** take turns (X and O)
- ✅ **3×3 grid** displayed in console
- ✅ **Input validation** (prevent invalid moves)
- ✅ **Win detection** (rows, columns, diagonals)
- ✅ **Draw detection** (board full, no winner)
- ✅ **Clear instructions** for players

### Bonus Features (Optional):

- ⭐ **Single player mode** (play against computer)
- ⭐ **Score tracking** (keep track of wins)
- ⭐ **Play again** option
- ⭐ **Better UI** (colors, formatting)

---

## 📁 File Structure

```
TP2_YourName/
├── tictactoe.js       (Main game file)
├── README.md          (Project documentation)
└── package.json       (Optional: Node.js config)
```

---

## 🚀 Getting Started

### Step 1: Set Up Node.js

1. **Check if Node.js is installed:**
   ```bash
   node --version
   ```

2. **If not installed**, download from: https://nodejs.org/

### Step 2: Create Project Files

1. Create a folder: `TP2_YourName`
2. Create file: `tictactoe.js`
3. Create file: `README.md`

### Step 3: Run Your Game

```bash
node tictactoe.js
```

---

## 📝 Implementation Guide

### Part 1: Display the Board

**Challenge**: Create a function that displays the current game board.

```javascript
// Example board representation
// You can use an array or object
const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

function displayBoard() {
  // TODO: Print the board to console
  // Format it nicely so players can see it
}
```

**Expected Output:**
```
   0   1   2
0  - | - | -
  -----------
1  - | - | -
  -----------
2  - | - | -
```

**Hints:**
- Use `console.log()` to print
- Use loops to iterate through rows
- Format with spaces and separators (`|` and `-`)

---

### Part 2: Get Player Input

**Challenge**: Ask the player for their move (row and column).

```javascript
// You'll need to use readline module for input
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getPlayerMove(player, callback) {
  // TODO: Ask player for row and column
  // Validate input (0-2, not already taken)
  // Call callback with valid move
}
```

**Expected Interaction:**
```
Player X, enter row (0-2): 1
Player X, enter column (0-2): 1
```

**Hints:**
- Use `rl.question()` to ask for input
- Validate that input is 0, 1, or 2
- Check if the spot is already taken
- Use recursion or loops to re-ask if invalid

---

### Part 3: Make a Move

**Challenge**: Update the board with the player's move.

```javascript
function makeMove(board, row, col, player) {
  // TODO: Place X or O on the board
  // Return true if move was successful
  // Return false if spot is already taken
}
```

**Hints:**
- Check if `board[row][col]` is empty (`' '`)
- Set `board[row][col] = player` ('X' or 'O')
- Return boolean to indicate success

---

### Part 4: Check for Winner

**Challenge**: Determine if a player has won.

```javascript
function checkWinner(board) {
  // TODO: Check all win conditions
  // Return 'X' if X wins, 'O' if O wins, null if no winner
}
```

**Win Conditions:**
- ✅ **Rows**: All 3 cells in a row are the same
- ✅ **Columns**: All 3 cells in a column are the same
- ✅ **Diagonals**: All 3 cells in a diagonal are the same

**Example:**
```javascript
// Row win
['X', 'X', 'X']  // Row 0

// Column win
['X', 'O', 'X']  // Column 0
['X', 'O', 'X']
['X', ' ', ' ']

// Diagonal win
['X', 'O', 'O']  // Top-left to bottom-right
['O', 'X', ' ']
[' ', ' ', 'X']
```

**Hints:**
- Check each row: `board[0][0] === board[0][1] === board[0][2]`
- Check each column: `board[0][0] === board[1][0] === board[2][0]`
- Check diagonals: `board[0][0] === board[1][1] === board[2][2]`
- Don't count empty spaces (`' '`) as wins

---

### Part 5: Check for Draw

**Challenge**: Determine if the game is a draw (board full, no winner).

```javascript
function checkDraw(board) {
  // TODO: Check if board is full and no winner
  // Return true if draw, false otherwise
}
```

**Hints:**
- Loop through all cells
- If any cell is empty (`' '`), not a draw
- If all cells filled AND no winner, it's a draw

---

### Part 6: Game Loop

**Challenge**: Put it all together in a main game loop.

```javascript
function playGame() {
  // TODO: Main game loop
  // 1. Display board
  // 2. Get player move
  // 3. Make move
  // 4. Check for winner/draw
  // 5. Switch players
  // 6. Repeat until game over
}
```

**Game Flow:**
```
1. Initialize board (all empty)
2. Set current player to 'X'
3. Loop:
   a. Display board
   b. Get move from current player
   c. Make move
   d. Check for winner → if yes, end game
   e. Check for draw → if yes, end game
   f. Switch player (X ↔ O)
4. Display final result
```

**Hints:**
- Use a `while` loop (game continues until win/draw)
- Track current player with a variable
- Switch players: `currentPlayer = currentPlayer === 'X' ? 'O' : 'X'`
- Break out of loop when game ends

---

## 💻 Starter Code Template

Here's a basic structure to get you started:

```javascript
// ============================================
// TIC-TAC-TOE GAME - Node.js
// ============================================

const readline = require('readline');

// Create readline interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ============================================
// GAME STATE
// ============================================

// Board representation (3x3 grid)
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let currentPlayer = 'X'; // X goes first

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function displayBoard() {
  // TODO: Implement board display
  console.log('Display board here');
}

// ============================================
// GAME LOGIC FUNCTIONS
// ============================================

function makeMove(row, col) {
  // TODO: Implement move logic
  return false;
}

function checkWinner() {
  // TODO: Implement winner check
  return null;
}

function checkDraw() {
  // TODO: Implement draw check
  return false;
}

// ============================================
// INPUT HANDLING
// ============================================

function getPlayerMove(callback) {
  // TODO: Get row and column from player
  // Validate input
  // Call callback with valid move
}

// ============================================
// MAIN GAME LOOP
// ============================================

function playGame() {
  // TODO: Implement main game loop
  console.log('Welcome to Tic-Tac-Toe!');
  console.log('Game not implemented yet!');
  
  // Close readline when done
  rl.close();
}

// Start the game
playGame();
```

---

## 🎮 Example Gameplay

```
Welcome to Tic-Tac-Toe!
Player X goes first.

   0   1   2
0  - | - | -
  -----------
1  - | - | -
  -----------
2  - | - | -

Player X, enter row (0-2): 1
Player X, enter column (0-2): 1

   0   1   2
0  - | - | -
  -----------
1  - | X | -
  -----------
2  - | - | -

Player O, enter row (0-2): 0
Player O, enter column (0-2): 0

   0   1   2
0  O | - | -
  -----------
1  - | X | -
  -----------
2  - | - | -

... (game continues)

   0   1   2
0  O | O | O
  -----------
1  - | X | X
  -----------
2  X | - | -

Player O wins! 🎉
```

---

## 🐛 Common Challenges & Solutions

### Challenge 1: Reading Input

**Problem**: How do I get input from the user?

**Solution**: Use Node.js `readline` module:
```javascript
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter something: ', (answer) => {
  console.log(`You entered: ${answer}`);
  rl.close();
});
```

### Challenge 2: Async Input in Loop

**Problem**: Input is asynchronous, how do I loop?

**Solution**: Use recursion or promises:
```javascript
function getMove(callback) {
  rl.question('Enter row: ', (row) => {
    rl.question('Enter col: ', (col) => {
      callback(parseInt(row), parseInt(col));
    });
  });
}

function gameLoop() {
  getMove((row, col) => {
    // Process move
    if (!gameOver) {
      gameLoop(); // Recursive call
    } else {
      rl.close();
    }
  });
}
```

### Challenge 3: Checking Win Conditions

**Problem**: How do I check all win conditions efficiently?

**Solution**: Create helper functions:
```javascript
function checkRow(board, row) {
  return board[row][0] !== ' ' && 
         board[row][0] === board[row][1] && 
         board[row][1] === board[row][2];
}

function checkColumn(board, col) {
  return board[0][col] !== ' ' && 
         board[0][col] === board[1][col] && 
         board[1][col] === board[2][col];
}

function checkDiagonals(board) {
  // Check top-left to bottom-right
  const diag1 = board[0][0] !== ' ' && 
                board[0][0] === board[1][1] && 
                board[1][1] === board[2][2];
  
  // Check top-right to bottom-left
  const diag2 = board[0][2] !== ' ' && 
                board[0][2] === board[1][1] && 
                board[1][1] === board[2][0];
  
  return diag1 || diag2;
}
```

---

## ✅ Project Checklist

### Core Features:
- [ ] Board displays correctly
- [ ] Players can input moves
- [ ] Input validation works
- [ ] Moves update the board
- [ ] Win detection works (rows, columns, diagonals)
- [ ] Draw detection works
- [ ] Game ends when someone wins or draws
- [ ] Clear instructions for players

### Code Quality:
- [ ] Code is organized with functions
- [ ] Comments explain complex logic
- [ ] Variable names are descriptive
- [ ] No console errors

### Testing:
- [ ] Test X wins (row)
- [ ] Test O wins (column)
- [ ] Test diagonal win
- [ ] Test draw scenario
- [ ] Test invalid input handling

---

## 🎓 Grading Criteria

### Functionality (50 points):
- ✅ Game runs without errors
- ✅ Players can take turns
- ✅ Win detection works correctly
- ✅ Draw detection works correctly
- ✅ Input validation works

### Code Quality (30 points):
- ✅ Well-organized code structure
- ✅ Functions used appropriately
- ✅ Comments explain logic
- ✅ Clean, readable code

### Features (20 points):
- ✅ Clear user interface
- ✅ Helpful error messages
- ✅ Bonus features (if implemented)

---

## 💡 Bonus Challenges

If you finish early, try these:

### 1. Single Player Mode
- Add option to play against computer
- Computer makes random valid moves
- Or make computer smarter (try to win/block)

### 2. Score Tracking
- Keep track of wins for each player
- Display score at end of each game
- Persist score across games

### 3. Play Again
- Ask if players want to play again
- Reset board for new game
- Keep score if implemented

### 4. Better UI
- Use colors (install `chalk` package)
- Better board formatting
- Clearer instructions

### 5. Input Improvements
- Allow input like "1,1" or "a1"
- Better error messages
- Show available moves

---

## 📚 Resources

### Node.js Basics:
- [Node.js Documentation](https://nodejs.org/docs/)
- [Readline Module](https://nodejs.org/api/readline.html)

### JavaScript:
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### Problem Solving:
- Break the problem into smaller parts
- Test each function individually
- Use `console.log()` to debug
- Start simple, add complexity gradually

---

## 🚀 Getting Started Tips

1. **Start Small**: Get the board displaying first
2. **Test Incrementally**: Test each function as you write it
3. **Use Console.log**: Print values to see what's happening
4. **Read Errors**: Error messages tell you what's wrong
5. **Ask for Help**: If stuck for >30 minutes, ask!

---

## 📞 Need Help?

If you're stuck:

1. **Read the error message** - It usually tells you what's wrong
2. **Check your syntax** - Missing brackets, quotes, etc.
3. **Test functions individually** - Isolate the problem
4. **Use console.log** - See what values variables have
5. **Ask questions** - Your instructor is here to help!

---

## 🎉 Good Luck!

Remember:
- ✅ **Break it down** - Solve one problem at a time
- ✅ **Test often** - Don't write everything then test
- ✅ **Read errors** - They're trying to help you
- ✅ **Have fun** - You're building a game!

**You've got this!** 🚀

