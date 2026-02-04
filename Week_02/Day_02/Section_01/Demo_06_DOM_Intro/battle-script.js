/* 
  DEMO 06: DOM Intro
  Theme: Interactive Pokemon Battle
  
  DOM = Document Object Model
  The browser's in-memory representation of your HTML.
  
  KEY CONCEPTS:
  1. SELECT elements (getElementById, querySelector)
  2. READ properties (textContent, style, classList)
  3. MODIFY properties (change text, styles, classes)
  4. EVENTS (click, input, etc.) trigger code
*/

// ============================================
// STEP 1: SELECT ELEMENTS FROM HTML
// ============================================

// Method 1: getElementById (most common for IDs)
const pokemon1Name = document.getElementById('pokemon1-name');
const pokemon1Hp = document.getElementById('pokemon1-hp');
const pokemon1HpText = document.getElementById('pokemon1-hp-text');
const attack1Btn = document.getElementById('attack1');

const pokemon2Name = document.getElementById('pokemon2-name');
const pokemon2Hp = document.getElementById('pokemon2-hp');
const pokemon2HpText = document.getElementById('pokemon2-hp-text');
const attack2Btn = document.getElementById('attack2');

const resetBtn = document.getElementById('reset-btn');
const toggleThemeBtn = document.getElementById('toggle-theme');
const logMessages = document.getElementById('log-messages');

// ============================================
// STEP 2: SET UP STATE (DATA)
// ============================================
let pokemon1HpValue = 100;
let pokemon2HpValue = 100;

// ============================================
// STEP 3: HELPER FUNCTIONS
// ============================================

// Function to add a message to the battle log
function addLogMessage(message) {
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';
  logEntry.textContent = message;
  logMessages.appendChild(logEntry);
  // Auto-scroll to bottom
  logMessages.scrollTop = logMessages.scrollHeight;
}

// Function to update HP display for Pokemon 1
function updatePokemon1HP() {
  pokemon1HpText.textContent = pokemon1HpValue;
  pokemon1Hp.style.width = `${pokemon1HpValue}%`;
  
  // Change color if HP is low
  if (pokemon1HpValue < 30) {
    pokemon1Hp.classList.add('low');
  } else {
    pokemon1Hp.classList.remove('low');
  }
}

// Function to update HP display for Pokemon 2
function updatePokemon2HP() {
  pokemon2HpText.textContent = pokemon2HpValue;
  pokemon2Hp.style.width = `${pokemon2HpValue}%`;
  
  // Change color if HP is low
  if (pokemon2HpValue < 30) {
    pokemon2Hp.classList.add('low');
  } else {
    pokemon2Hp.classList.remove('low');
  }
}

// Function to reset the battle
function resetBattle() {
  pokemon1HpValue = 100;
  pokemon2HpValue = 100;
  updatePokemon1HP();
  updatePokemon2HP();
  logMessages.innerHTML = ''; // Clear log
  addLogMessage('Battle reset! Both Pokemon are ready!');
}

// ============================================
// STEP 4: EVENT LISTENERS (CLICK HANDLERS)
// ============================================

// When Pokemon 1 attacks Pokemon 2
attack1Btn.addEventListener('click', () => {
  const damage = Math.floor(Math.random() * 20) + 10; // Random damage 10-30
  pokemon2HpValue = Math.max(0, pokemon2HpValue - damage); // Don't go below 0
  updatePokemon2HP();
  
  addLogMessage(`${pokemon1Name.textContent} used Thunderbolt! ${pokemon2Name.textContent} took ${damage} damage!`);
  
  if (pokemon2HpValue === 0) {
    addLogMessage(`🎉 ${pokemon1Name.textContent} wins!`);
    attack1Btn.disabled = true;
    attack2Btn.disabled = true;
  }
});

// When Pokemon 2 attacks Pokemon 1
attack2Btn.addEventListener('click', () => {
  const damage = Math.floor(Math.random() * 20) + 10;
  pokemon1HpValue = Math.max(0, pokemon1HpValue - damage);
  updatePokemon1HP();
  
  addLogMessage(`${pokemon2Name.textContent} used Flamethrower! ${pokemon1Name.textContent} took ${damage} damage!`);
  
  if (pokemon1HpValue === 0) {
    addLogMessage(`🎉 ${pokemon2Name.textContent} wins!`);
    attack1Btn.disabled = true;
    attack2Btn.disabled = true;
  }
});

// Reset button
resetBtn.addEventListener('click', () => {
  resetBattle();
  attack1Btn.disabled = false;
  attack2Btn.disabled = false;
});

// Toggle theme (light/dark)
toggleThemeBtn.addEventListener('click', () => {
  // Toggle class on body element
  document.body.classList.toggle('light-theme');
  
  if (document.body.classList.contains('light-theme')) {
    addLogMessage('Theme changed to Light Mode!');
  } else {
    addLogMessage('Theme changed to Dark Mode!');
  }
});

// ============================================
// STEP 5: INITIALIZE
// ============================================
addLogMessage('Battle started! Click attack buttons to fight!');

// ============================================
// DOM METHODS SUMMARY:
// ============================================
// SELECTING:
// - document.getElementById('id') → single element
// - document.querySelector('.class') → first matching element
// - document.querySelectorAll('.class') → all matching elements
//
// READING:
// - element.textContent → text inside element
// - element.style.property → CSS style value
// - element.classList → list of CSS classes
//
// MODIFYING:
// - element.textContent = 'new text' → change text
// - element.style.color = 'red' → change style
// - element.classList.add('class') → add class
// - element.classList.remove('class') → remove class
// - element.classList.toggle('class') → toggle class
//
// EVENTS:
// - element.addEventListener('click', function) → listen for clicks
// - element.addEventListener('input', function) → listen for input changes

