# Tic Tac Toe Game - Step-by-Step Lesson

## Overview
In this lesson, you'll build a complete **Tic Tac Toe** game using HTML, CSS, and JavaScript. We'll break it down into manageable pieces, building from the ground up.

**Learning Objectives:**
- Create a structured HTML layout for a game
- Style the game with CSS
- Connect JavaScript to HTML elements
- Implement game logic with event listeners
- Handle user input and game state
- Detect winners and reset the game

---

## Part 1: HTML Structure

### Step 1.1: Basic HTML Setup

**Think about it:**
- What HTML elements do you need for a complete HTML document?
- What meta tags are important for modern web development?

**Your task:**
Create your `index.html` file with the basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Tic Tac Toe</title>
</head>
<body>
    <!-- We'll add content here -->
    <script type="module" src="app.js"></script>
</body>
</html>
```

**Key Points:**
- `lang="en"` helps screen readers
- `charset="UTF-8"` ensures proper character encoding
- `viewport` meta tag makes it mobile-friendly
- `type="module"` allows ES6 imports/exports

---

### Step 1.2: Player Name Input Form

**Think about it:**
- What HTML element creates a form?
- What elements go inside a form for user input?
- How do you label inputs for accessibility?

**Your task:**
Add a form for players to enter their names:

```html
<div class="nameInput">
    <form id="playerSubmit" class="playerSubmit">
        <label for="playernameone">P1 Name</label>
        <input type="text" id="p1" name="playernameone" placeholder="p1 name">
        
        <label for="playernametwo">P2 Name</label>
        <input type="text" id="p2" name="playernametwo" placeholder="p2 name">
        
        <div>
            <input class="submit" id="button" type="submit" value="Submit">
        </div>
    </form>
</div>
```

**Key Points:**
- `id` attributes allow JavaScript to select elements
- `for` attribute on labels connects to input `id` (accessibility)
- `placeholder` gives users hints
- `type="submit"` creates a submit button

**Question:** Why use a `<form>` instead of just inputs and a button? What benefits does it provide?

---

### Step 1.3: Player Name Display Area

**Think about it:**
- Where should we show the players' names after they submit?
- What HTML element is best for displaying text?

**Your task:**
Add a section to display player names:

```html
<div class="nameInput">
    <h3 id="displayp1"></h3><br>
    <h3 id="displayp2"></h3>
</div>
```

**Key Points:**
- Empty `<h3>` elements will be filled by JavaScript
- `id` attributes allow JavaScript to update them
- `<br>` adds spacing between the names

---

### Step 1.4: Winner Display Area

**Think about it:**
- Where should the winner announcement appear?
- Should it be visible initially or only when someone wins?

**Your task:**
Add a winner display area:

```html
<div id="nameDisplay">
    <h1 id="winner"></h1>
</div>
```

**Key Points:**
- Starts empty, will be filled when a winner is detected
- Uses `<h1>` for prominent display
- Positioned with CSS (we'll style it later)

---

### Step 1.5: Game Board Table

**Think about it:**
- What HTML element creates a table?
- How many rows and columns does Tic Tac Toe need?
- How can you uniquely identify each cell?

**Your task:**
Create the 3×3 game board using a table:

```html
<div class="gameboardContainer">
    <table class="gameboard">
        <tr>
            <td id="00"></td>
            <td id="01"></td>
            <td id="02"></td>
        </tr>
        <tr>
            <td id="10"></td>
            <td id="11"></td>
            <td id="12"></td>
        </tr>
        <tr>
            <td id="20"></td>
            <td id="21"></td>
            <td id="22"></td>
        </tr>
    </table>
</div>
```

**Key Points:**
- Each `<td>` has a unique `id` using row-column notation (00, 01, 02, etc.)
- This makes it easy to track positions in JavaScript
- Empty cells will be filled with X or O when clicked

**Question:** Why use "00", "01", "02" instead of "1", "2", "3"? How will this help us later?

---

### Step 1.6: Reset Button

**Think about it:**
- What HTML element creates a button?
- Where should the reset button be positioned?

**Your task:**
Add a reset button:

```html
<div class="buttonContainer">
    <button class="reset" id="button">Reset</button>
</div>
```

**Key Points:**
- Uses `<button>` element (better than `<input type="button">`)
- Has both `class` and `id` for styling and selection
- Will clear the board when clicked

---

## Part 2: CSS Styling

### Step 2.1: Basic Body and Typography Styles

**Think about it:**
- What makes text readable and visually appealing?
- How can you add visual interest with text effects?

**Your task:**
Add basic styling to `style.css`:

```css
body {
    color: whitesmoke;
    text-shadow: 2px 2px 2px rgb(2, 0, 0);
    font-size: larger;
}
```

**Key Points:**
- `text-shadow` adds depth to text
- `color` sets the text color
- `font-size: larger` makes text more readable

---

### Step 2.2: Table Cell Styling

**Think about it:**
- What size should each cell be?
- What color should empty cells have?
- Should cells have transitions for smooth interactions?

**Your task:**
Style the table cells:

```css
td {
    width: 100px;
    height: 100px;
    background-color: rgb(0, 255, 115);
    transition-duration: 0.5s;
}
```

**Key Points:**
- Fixed size (100px × 100px) creates a square grid
- Bright green background makes cells visible
- `transition-duration` makes hover effects smooth

---

### Step 2.3: Cell Hover Effects

**Think about it:**
- How can you give visual feedback when users hover over cells?
- What CSS properties create engaging hover effects?

**Your task:**
Add hover effects to cells:

```css
td:hover {
    background-color: #f2dd6e;
    background-image: linear-gradient(319deg, #f2dd6e 0%, #cff27e 37%, #ef959d 100%);
    box-shadow: 20px 5px 6px 7px rgba(245, 245, 245, 0.3), 4px 5px 6px 12px rgba(245, 24, 24, 0.3);
    transform: scale(0.9) translate(-10%, -10%);
}
```

**Key Points:**
- `:hover` pseudo-class triggers on mouse over
- `linear-gradient` creates a colorful gradient effect
- `box-shadow` adds depth with multiple shadows
- `transform` scales and moves the cell slightly

**Question:** Why use `transform` instead of changing `width` and `height`? What's the performance benefit?

---

### Step 2.4: Game Board Container and Board Styling

**Think about it:**
- How do you center a table on the page?
- What background color makes the board stand out?

**Your task:**
Style the game board container and board:

```css
.gameboardContainer {
    display: flex;
    justify-content: center;
}

.gameboard {
    margin-top: 10px;
    height: fit-content;
    width: fit-content;
    background-color: black;
    text-align: center;
}
```

**Key Points:**
- Flexbox centers the board horizontally
- `fit-content` makes the board only as large as needed
- Black background creates contrast with green cells

---

### Step 2.5: Name Input Form Styling

**Think about it:**
- How should form inputs be arranged?
- What styling makes forms look modern?

**Your task:**
Style the name input form:

```css
.nameInput {
    border: 2px solid black;
    border-radius: 3px 3px 3px 3px;
    background-color: rgba(138, 43, 226, 0.6);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 60px;
}

.playerSubmit div {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
}
```

**Key Points:**
- `rgba()` allows transparency (0.6 = 60% opacity)
- Flexbox arranges inputs horizontally
- `space-evenly` distributes space evenly
- `border-radius` rounds corners

---

### Step 2.6: Button Styling

**Think about it:**
- What makes a button look clickable?
- How can hover effects improve user experience?

**Your task:**
Style the buttons:

```css
#button {
    background-color: rgb(0, 255, 115);
    border: none;
    border-radius: 2px;
    padding: 15px 32px;
    text-align: center;
    color: whitesmoke;
    text-shadow: 2px 2px 2px black;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    transition-duration: 0.5s;
}

#button:hover {
    background-color: rgba(138, 43, 226);
    box-shadow: 4px 6px 8px 5px rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
```

**Key Points:**
- `padding` creates space inside the button
- `border: none` removes default border
- `transition-duration` makes color change smooth
- Hover changes color to purple and adds shadow

---

### Step 2.7: Winner Display Styling

**Think about it:**
- Where should the winner message appear?
- How can you make it stand out?

**Your task:**
Style the winner display:

```css
#nameDisplay {
    border-radius: 10px 10px 10px 10px;
    position: fixed;
    left: 30%;
    bottom: 50%;
    color: #d718d0;
    background-color: rgba(211, 124, 124, 0.5);
    box-shadow: 10px 5px 5px rgba(60, 56, 56, 0.5);
}
```

**Key Points:**
- `position: fixed` positions it relative to viewport
- `left: 30%` and `bottom: 50%` center it
- Semi-transparent background with shadow creates depth
- Bright pink color makes it noticeable

---

### Step 2.8: Button Container Styling

**Your task:**
Add styling for the button container:

```css
.buttonContainer {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
```

**Key Points:**
- Centers the reset button below the board
- Adds spacing with `margin-top`

---

## Part 3: Connecting JavaScript to HTML

### Step 3.1: Setting Up Module Structure

**Think about it:**
- Why use ES6 modules (`import`/`export`)?
- How do modules help organize code?

**Your task:**
Create `app.js` and `utils.js` files. We'll use modules to organize helper functions.

**Key Points:**
- Modules allow code splitting and reusability
- `type="module"` in HTML script tag enables ES6 imports
- Helper functions go in `utils.js`, main game logic in `app.js`

---

### Step 3.2: Creating the Game State Array

**Think about it:**
- How do you represent a 3×3 grid in code?
- What data structure works best?

**Your task:**
At the top of `app.js`, create a 2D array to track the game state:

```javascript
let my_arr = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
```

**Key Points:**
- 2D array represents rows and columns
- `null` means empty cell
- Will store "X" or "O" when cells are clicked

**Question:** Why use a 2D array instead of a 1D array? How does it match the table structure?

---

### Step 3.3: Creating a Turn Counter

**Think about it:**
- How do you track whose turn it is?
- What's the simplest way to alternate between players?

**Your task:**
Add a counter variable:

```javascript
let count = 0;
```

**Key Points:**
- `count === 0` means Player 1 (X) turn
- `count === 1` means Player 2 (O) turn
- We'll toggle between 0 and 1

---

### Step 3.4: Selecting DOM Elements

**Think about it:**
- How do you get references to HTML elements?
- When should you select elements?

**Your task:**
Select the game board and reset button:

```javascript
let toe_board = document.querySelector(".gameboard");
let resetButton = document.querySelector(".reset");
let sbutton = document.querySelector("#playerSubmit");
```

**Key Points:**
- `querySelector` uses CSS selectors
- Store references in variables for reuse
- Select elements you'll interact with

---

## Part 4: Implementing Game Logic

### Step 4.1: Handling Cell Clicks

**Think about it:**
- What event fires when a user clicks a cell?
- How do you know which cell was clicked?
- How do you prevent clicking an already-filled cell?

**Your task:**
Add a click event listener to the game board:

```javascript
toe_board.addEventListener("click", (e) => {
  let selection = e.target.innerHTML;
  let position = e.target.id.split("");

  if (count === 0 && selection === "") {
    e.target.innerHTML = "X";
    my_arr[position[0]][position[1]] = "X";
    count++;
  } else if (count === 1 && selection === "") {
    e.target.innerHTML = "O";
    my_arr[position[0]][position[1]] = "O";
    count--;
  }

  findwinner();
});
```

**Breaking it down:**

1. **`e.target`** - The element that was clicked (the `<td>`)
2. **`selection`** - Current content of the cell (empty string if blank)
3. **`position`** - Split the id ("00" becomes ["0", "0"])
4. **`position[0]`** - Row index (0, 1, or 2)
5. **`position[1]`** - Column index (0, 1, or 2)
6. **`selection === ""`** - Check if cell is empty
7. **Update array** - Store "X" or "O" in the correct position
8. **Toggle count** - Switch turns (0→1 or 1→0)

**Key Points:**
- Event delegation: listener on table, not individual cells
- `split("")` converts "00" to ["0", "0"]
- Array indices are strings, but JavaScript converts them to numbers
- Check for empty cell before allowing move

**Question:** Why use event delegation instead of adding listeners to each cell? What's the benefit?

---

### Step 4.2: Creating Helper Functions in utils.js

**Think about it:**
- What operations do we need to check for a winner?
- How can we organize code for reusability?

**Your task:**
Create `utils.js` with helper functions:

```javascript
// Remove form after submission
export const Remove = (form_id) => {
    let myform = document.getElementById(form_id);
    myform.parentNode.removeChild(myform);
}

// Transpose matrix (swap rows and columns)
export const Transpose = (m) => {
    let newMatrix = [[],[],[]]
    
    for(let i = 0 ; i < m.length ; i++){
        m[i].forEach((item,index) => newMatrix[index].push(item) )
    }
    return newMatrix
}

// Get diagonal values
export const Dia = (m) => {
    return [
        [m[0][0], m[1][1], m[2][2]],  // Top-left to bottom-right
        [m[0][2], m[1][1], m[2][0]]   // Top-right to bottom-left
    ]
}

// Check rows/columns/diagonals for matches
export const Checker = (matrix) => {
    return matrix.map((item) => item.join(""))
        .filter((item) => (item === "XXX" ? "XXX" : item === "OOO" ? "OOO" : null))
}

// Display winner message
export const Winner = (type) => {
    document.getElementById('winner').innerHTML = `Congratulations ${type} Got the W`
}
```

**Understanding each function:**

1. **`Remove`** - Removes the form from DOM after names are submitted
2. **`Transpose`** - Converts rows to columns (helps check columns)
3. **`Dia`** - Gets both diagonal lines
4. **`Checker`** - Converts arrays to strings and finds "XXX" or "OOO"
5. **`Winner`** - Updates the winner display

**Key Points:**
- `export` makes functions available to other files
- Helper functions keep code organized and testable
- Each function has a single responsibility

---

### Step 4.3: Implementing Winner Detection

**Think about it:**
- How do you win Tic Tac Toe?
- What patterns need to be checked?
- How can you check efficiently?

**Your task:**
Create the `findwinner` function in `app.js`:

```javascript
function findwinner() {
  let row = Checker(my_arr)
  let columnArr = Checker(Transpose(my_arr))
  let diagnols = Checker(Dia(my_arr))

  if (row[0] === "XXX" || columnArr[0] === "XXX" || diagnols[0] === "XXX") {
    console.log("X is the Winner");
    Winner('X')
  }
  if (row[0] === "OOO" || columnArr[0] === "OOO" || diagnols[0] === "OOO") {
    console.log("O is the winner");
    Winner('O')
  }
}
```

**How it works:**

1. **Check rows** - `Checker(my_arr)` finds "XXX" or "OOO" in rows
2. **Check columns** - Transpose first, then check (columns become rows)
3. **Check diagonals** - Get diagonal arrays, then check them
4. **Display winner** - Call `Winner()` function if match found

**Key Points:**
- Checks all three win conditions (rows, columns, diagonals)
- Uses helper functions for clean code
- Calls `Winner()` to update display

**Question:** Why check all three conditions? Could you optimize this?

---

### Step 4.4: Handling Form Submission

**Think about it:**
- What event fires when a form is submitted?
- How do you prevent the default form behavior?
- How do you get values from input fields?

**Your task:**
Add form submission handler:

```javascript
sbutton.addEventListener("submit", (e) => {
  e.preventDefault();
  let p1 = document.getElementById("p1").value;
  let p2 = document.getElementById("p2").value;
  document.getElementById("displayp1").innerHTML = `X = ${p1}`;
  document.getElementById("displayp2").innerHTML = `O = ${p2}`;
  Remove("playerSubmit");
});
```

**Breaking it down:**

1. **`e.preventDefault()`** - Stops form from submitting (prevents page reload)
2. **Get values** - `.value` gets text from input fields
3. **Update display** - Set innerHTML of display elements
4. **Remove form** - Call helper function to hide form

**Key Points:**
- `preventDefault()` is crucial - without it, page reloads
- Template literals (backticks) allow variable interpolation
- Form is removed after submission (cleaner UI)

---

### Step 4.5: Implementing Reset Functionality

**Think about it:**
- What needs to be reset when the game restarts?
- How do you clear all cells?
- How do you reset the game state?

**Your task:**
Add reset button handler:

```javascript
resetButton.addEventListener("click", (e) => {
  // Clear all cell content
  [...document.querySelectorAll("td")].forEach(
    (tdDomElement) => (tdDomElement.innerHTML = "")
  );
 
  // Clear winner message
  document.getElementById('winner').innerHTML = '';
  
  // Reset game state array
  my_arr = [[null,null,null],[null,null,null],[null,null,null]];
  
  // Reset turn counter
  count = 0;
});
```

**Breaking it down:**

1. **`document.querySelectorAll("td")`** - Gets all table cells
2. **`[...]`** - Spread operator converts NodeList to array
3. **`forEach`** - Loops through each cell
4. **Clear innerHTML** - Removes X and O from cells
5. **Reset array** - Sets all values back to `null`
6. **Reset count** - Sets turn back to Player 1

**Key Points:**
- Spread operator needed because `querySelectorAll` returns NodeList
- Reset both visual (DOM) and logical (array) state
- Game ready to play again

---

## Part 5: Importing Helper Functions

### Step 5.1: Importing from utils.js

**Think about it:**
- How do you use functions from another file?
- What syntax is needed for ES6 imports?

**Your task:**
At the top of `app.js`, import the helper functions:

```javascript
import {Transpose, Remove, Checker, Dia, Winner} from './utils.js'
```

**Key Points:**
- `import` statement goes at the top of the file
- Named imports in curly braces
- `from './utils.js'` specifies the file path
- Must use `type="module"` in HTML script tag

**Question:** What happens if you forget to import a function? What error would you see?

---

## Part 6: Testing and Debugging

### Step 6.1: Testing Checklist

Test each feature:

- [ ] **Form submission** - Enter names, click submit, names display
- [ ] **Cell clicking** - Click empty cell, X appears
- [ ] **Turn alternation** - Next click shows O
- [ ] **Prevent double-click** - Can't overwrite filled cells
- [ ] **Row win** - Three X's in a row shows winner
- [ ] **Column win** - Three O's in a column shows winner
- [ ] **Diagonal win** - Three in a diagonal shows winner
- [ ] **Reset button** - Clears board and resets game

### Step 6.2: Common Issues

**Issue: Functions not found**
- **Solution:** Check import statement and file path

**Issue: Cells not responding**
- **Solution:** Verify event listener is attached and selector is correct

**Issue: Winner not detected**
- **Solution:** Check array indices match cell IDs, verify Checker function logic

**Issue: Form causes page reload**
- **Solution:** Make sure `e.preventDefault()` is called

---

## Part 7: Understanding the Code Flow

### Game Flow Diagram

```
1. Page loads
   ↓
2. User enters names → Submits form
   ↓
3. Form removed, names displayed
   ↓
4. User clicks cell
   ↓
5. Check if cell is empty
   ↓
6. Add X or O based on turn
   ↓
7. Update game array
   ↓
8. Check for winner
   ↓
9. If winner found → Display message
   ↓
10. User clicks Reset → Clear everything → Back to step 4
```

---

## Part 8: Key Concepts Review

### Event Delegation
- Attach listener to parent (table) instead of children (cells)
- Works for dynamically added elements
- `e.target` identifies which child was clicked

### Array Manipulation
- 2D arrays represent grid structure
- Indices match table cell positions
- Transpose converts columns to rows for checking

### DOM Manipulation
- `innerHTML` changes element content
- `querySelector` selects elements
- `addEventListener` responds to user actions

### State Management
- `my_arr` tracks game state
- `count` tracks whose turn it is
- Both must be reset for new game

---

## Part 9: Extension Challenges

If you finish early, try these enhancements:

1. **Score Tracking** - Keep track of wins for each player
2. **Draw Detection** - Detect when board is full with no winner
3. **Player Name in Winner** - Show actual player name instead of X/O
4. **Animation** - Add CSS animations when X or O appears
5. **Sound Effects** - Add audio feedback for moves and wins
6. **AI Opponent** - Create a simple AI for single-player mode
7. **Game History** - Show previous moves
8. **Custom Colors** - Let players choose their colors

---

## Complete File Structure

Your project should have:

```
tic-tac-toe/
├── index.html
├── style.css
├── app.js
└── utils.js
```

---

## Solution Checklist

Before checking your code, verify:

- [ ] HTML structure complete (form, board, buttons)
- [ ] CSS styles applied (cells, buttons, layout)
- [ ] JavaScript connects to HTML elements
- [ ] Click handler works for cells
- [ ] Turn alternation works (X then O)
- [ ] Winner detection works (rows, columns, diagonals)
- [ ] Reset button clears everything
- [ ] Form submission displays names
- [ ] Helper functions imported correctly

---

## Reflection Questions

1. **Event Delegation:** Why is it better to attach the click listener to the table instead of each cell?

2. **Data Structure:** Why use a 2D array? Could you use a different structure?

3. **Code Organization:** How do modules (utils.js) help organize code? What are the benefits?

4. **User Experience:** What improvements would make the game more enjoyable?

5. **Error Handling:** What happens if a user tries to click a cell that's already filled? How is this handled?

---

Good luck building your Tic Tac Toe game! 🎮

