/* 
  DEMO 03: Linking Files - JavaScript File
  Theme: Comic Hero Power Tracker
  
  FILE LINKING CHECKLIST:
  ✅ CSS linked in <head> with <link rel="stylesheet" href="...">
  ✅ JS linked at bottom of <body> with <script src="..."></script>
  ✅ All files in same folder (or adjust paths accordingly)
  
  WHY THIS ORDER?
  - CSS in <head>: Styles load before content renders (no flash of unstyled content)
  - JS at bottom: HTML exists before JS tries to select elements (no null errors)
*/

// ============================================
// STEP 1: SELECT ELEMENTS FROM HTML
// ============================================
// Use document.getElementById() to find elements by their ID attribute
const powerLevelEl = document.getElementById('power-level');
const powerUpBtn = document.getElementById('power-up-btn');
const resetBtn = document.getElementById('reset-btn');
const statusMessageEl = document.getElementById('status-message');
const heroNameEl = document.getElementById('hero-name');

// ============================================
// STEP 2: SET UP STATE (DATA)
// ============================================
let powerLevel = 100; // Starting power level

// ============================================
// STEP 3: CREATE FUNCTIONS TO UPDATE DISPLAY
// ============================================
function updateDisplay() {
  // Update the power level text
  powerLevelEl.textContent = powerLevel;
  
  // Update status message based on power level
  if (powerLevel >= 200) {
    statusMessageEl.textContent = '🔥 MAXIMUM POWER! 🔥';
    statusMessageEl.style.color = 'red';
  } else if (powerLevel >= 150) {
    statusMessageEl.textContent = '⚡ Super Charged! ⚡';
    statusMessageEl.style.color = 'orange';
  } else {
    statusMessageEl.textContent = 'Ready for action!';
    statusMessageEl.style.color = '#333';
  }
}

// ============================================
// STEP 4: ADD EVENT LISTENERS (CLICK HANDLERS)
// ============================================
// When power-up button is clicked, increase power
powerUpBtn.addEventListener('click', () => {
  powerLevel += 10; // Add 10 to power level
  updateDisplay(); // Refresh the display
});

// When reset button is clicked, reset power
resetBtn.addEventListener('click', () => {
  powerLevel = 100; // Reset to starting value
  updateDisplay(); // Refresh the display
});

// ============================================
// STEP 5: INITIALIZE (RUN ON PAGE LOAD)
// ============================================
// Call updateDisplay once when page loads
updateDisplay();

// ============================================
// BONUS: Change hero name on click
// ============================================
heroNameEl.addEventListener('click', () => {
  const names = ['Super Hero', 'Mega Warrior', 'Ultra Champion', 'Power Master'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  heroNameEl.textContent = randomName;
});

