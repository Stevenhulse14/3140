/* 
  WHACK-A-MOLE GAME - JAVASCRIPT FILE
  ====================================
  
  This file defines the BEHAVIOR of the game.
  JavaScript = The brain/muscles of your webpage (makes it interactive).
  
  LEARNING GOALS:
  - Understand DOM manipulation (selecting and modifying elements)
  - Learn event listeners (responding to user clicks)
  - Practice JavaScript functions and loops
  - Understand game state management
  
  CURRENT STATE:
  - This file only has a score variable
  - You need to add the game logic!
  - See README.md for complete implementation guide
*/

// ============================================
// VARIABLES (Game State)
// ============================================

/* 
  VARIABLE DECLARATION:
  =====================
  let score = 0;
  
  - let = Declares a variable (can be changed later)
  - score = Variable name (what we call it)
  - 0 = Initial value (starting score)
  
  This variable stores the player's current score.
  We'll update it when the player clicks a mole.
*/
let score = 0;

/* 
  TODO: ADD MORE VARIABLES HERE
  ==============================
  
  You'll need:
  - const holes = document.querySelectorAll('.hole');
  - const scoreElement = document.getElementById('score');
  - And more! See README.md for full implementation.
*/

// ============================================
// DOM SELECTION (Finding HTML Elements)
// ============================================

/* 
  TODO: SELECT ELEMENTS FROM HTML
  ===============================
  
  Example:
  const holes = document.querySelectorAll('.hole');
  - document = The entire HTML page
  - querySelectorAll = Finds ALL elements matching selector
  - '.hole' = CSS selector (finds elements with class="hole")
  - Returns: Array of all hole elements
  
  const scoreElement = document.getElementById('score');
  - getElementById = Finds ONE element with matching ID
  - 'score' = The ID we're looking for
  - Returns: The <h1 id="score"> element
*/

// ============================================
// FUNCTIONS (Reusable Code Blocks)
// ============================================

/* 
  TODO: CREATE FUNCTIONS
  ======================
  
  You'll need a function to show a random mole:
  
  function showRandomMole() {
    // 1. Remove mole from all holes
    // 2. Pick a random hole
    // 3. Add mole class to that hole
  }
  
  See README.md for complete function code.
*/

// ============================================
// EVENT LISTENERS (Responding to Clicks)
// ============================================

/* 
  TODO: ADD CLICK LISTENERS
  =========================
  
  You'll need to add click listeners to each hole:
  
  holes.forEach(hole => {
    hole.addEventListener('click', () => {
      // Check if hole has mole
      // If yes: increase score, update display, remove mole
      // If no: do nothing (missed!)
    });
  });
  
  See README.md for complete event listener code.
*/

// ============================================
// GAME LOOP (Making Moles Appear)
// ============================================

/* 
  TODO: CREATE GAME LOOP
  ======================
  
  Use setInterval to show a new mole periodically:
  
  setInterval(() => {
    showRandomMole();
  }, 1000);
  
  - setInterval = Runs code repeatedly
  - () => { ... } = Arrow function (code to run)
  - 1000 = Milliseconds (1000ms = 1 second)
  - This shows a new mole every second
  
  See README.md for complete game loop code.
*/

// ============================================
// JAVASCRIPT CONCEPTS USED:
// ============================================

/* 
  1. VARIABLES:
     - let = Can be changed (mutable)
     - const = Cannot be changed (immutable)
     - var = Old way (avoid using)
  
  2. DOM SELECTION:
     - document.getElementById('id') = Find one element by ID
     - document.querySelector('.class') = Find first matching element
     - document.querySelectorAll('.class') = Find ALL matching elements
  
  3. DOM MANIPULATION:
     - element.textContent = 'text' = Change text content
     - element.classList.add('class') = Add CSS class
     - element.classList.remove('class') = Remove CSS class
     - element.classList.contains('class') = Check if class exists
  
  4. EVENT LISTENERS:
     - element.addEventListener('click', function) = Listen for clicks
     - 'click' = Event type (user clicks element)
     - function = What to do when event happens
  
  5. FUNCTIONS:
     - function name() { ... } = Function declaration
     - () => { ... } = Arrow function (modern syntax)
     - Functions are reusable blocks of code
  
  6. LOOPS:
     - forEach = Loop through array
     - for...of = Loop through array (alternative)
     - for...in = Loop through object properties
  
  7. TIMING:
     - setInterval(function, ms) = Run code repeatedly
     - setTimeout(function, ms) = Run code once after delay
     - clearInterval(id) = Stop repeating code
  
  8. RANDOM NUMBERS:
     - Math.random() = Random number 0-1
     - Math.floor(num) = Round down to integer
     - Math.floor(Math.random() * max) = Random integer 0 to max-1
*/

// ============================================
// COMPLETE IMPLEMENTATION GUIDE:
// ============================================

/* 
  See README.md for:
  - Step-by-step instructions
  - Complete code solutions
  - Common errors and fixes
  - Customization ideas
  - Reflection questions
*/
