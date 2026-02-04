/* 
  DEMO 04: JavaScript Deeper
  Theme: Pokemon Team Manager
  
  TOPICS COVERED:
  1. Arrays: creation, methods (map, filter, reduce, forEach)
  2. Objects: creation, access, destructuring
  3. Functions: declarations, arrows, callbacks
  4. Common mistakes and how to avoid them
*/

// ============================================
// PART 1: ARRAYS
// ============================================

// Array: Ordered list of values
const pokemonNames = ['Pikachu', 'Charizard', 'Bulbasaur', 'Squirtle', 'Eevee'];

// Array methods are POWERFUL - learn these well!

function demonstrateArrays() {
  const output = document.getElementById('array-output');
  let result = '';

  // 1. MAP: Transform each element, returns NEW array
  result += '📝 MAP (transform each element):\n';
  const upperCaseNames = pokemonNames.map(name => name.toUpperCase());
  result += `Original: [${pokemonNames.join(', ')}]\n`;
  result += `Uppercase: [${upperCaseNames.join(', ')}]\n\n`;

  // 2. FILTER: Keep only elements that pass test, returns NEW array
  result += '🔍 FILTER (keep matching elements):\n';
  const longNames = pokemonNames.filter(name => name.length > 7);
  result += `Names longer than 7 chars: [${longNames.join(', ')}]\n\n`;

  // 3. REDUCE: Combine all elements into one value
  result += '➕ REDUCE (combine into one value):\n';
  const totalLength = pokemonNames.reduce((sum, name) => sum + name.length, 0);
  result += `Total characters in all names: ${totalLength}\n\n`;

  // 4. FOREACH: Do something for each element (no return value)
  result += '🔄 FOREACH (do something for each):\n';
  pokemonNames.forEach((name, index) => {
    result += `${index + 1}. ${name}\n`;
  });

  output.textContent = result;
}

// ============================================
// PART 2: OBJECTS
// ============================================

// Object: Key-value pairs (like a dictionary)
const pikachu = {
  name: 'Pikachu',
  type: 'Electric',
  level: 25,
  hp: 100,
  moves: ['Thunderbolt', 'Quick Attack', 'Thunder']
};

const charizard = {
  name: 'Charizard',
  type: 'Fire/Flying',
  level: 50,
  hp: 200,
  moves: ['Flamethrower', 'Fly', 'Dragon Claw']
};

function demonstrateObjects() {
  const output = document.getElementById('object-output');
  let result = '';

  // 1. Accessing properties (two ways)
  result += '🔑 ACCESSING PROPERTIES:\n';
  result += `Dot notation: ${pikachu.name}\n`;
  result += `Bracket notation: ${pikachu['type']}\n\n`;

  // 2. Adding/updating properties
  result += '✏️ ADDING PROPERTIES:\n';
  pikachu.trainer = 'Ash';
  result += `Trainer: ${pikachu.trainer}\n\n`;

  // 3. Destructuring (extract values)
  result += '📦 DESTRUCTURING:\n';
  const { name, type, level } = charizard;
  result += `Name: ${name}, Type: ${type}, Level: ${level}\n\n`;

  // 4. Looping through object
  result += '🔄 LOOPING THROUGH OBJECT:\n';
  for (const key in pikachu) {
    result += `${key}: ${pikachu[key]}\n`;
  }
  result += '\n';

  // 5. Object methods
  result += '⚙️ OBJECT METHODS:\n';
  const pokemon = {
    name: 'Eevee',
    level: 10,
    // Method = function inside object
    levelUp: function() {
      this.level += 1; // 'this' refers to the object
      return `${this.name} leveled up to ${this.level}!`;
    }
  };
  result += pokemon.levelUp() + '\n';

  output.textContent = result;
}

// ============================================
// PART 3: FUNCTIONS
// ============================================

// Function Declaration (hoisted - can call before definition)
function countEvens(numbers) {
  let count = 0;
  for (const num of numbers) {
    if (num % 2 === 0) count++;
  }
  return count;
}

// Arrow Function (modern, concise)
const findMax = (numbers) => {
  let max = numbers[0];
  for (const num of numbers) {
    if (num > max) max = num;
  }
  return max;
};

// Arrow Function (one-liner, implicit return)
const double = (x) => x * 2;

// Function that takes another function (callback)
function processArray(arr, callback) {
  return arr.map(callback);
}

function demonstrateFunctions() {
  const output = document.getElementById('function-output');
  let result = '';

  // 1. Function declarations
  result += '📝 FUNCTION DECLARATION:\n';
  const numbers = [1, 2, 3, 4, 5, 6];
  result += `Numbers: [${numbers.join(', ')}]\n`;
  result += `Even count: ${countEvens(numbers)}\n\n`;

  // 2. Arrow functions
  result += '➡️ ARROW FUNCTION:\n';
  result += `Max value: ${findMax(numbers)}\n`;
  result += `Double 5: ${double(5)}\n\n`;

  // 3. Functions as arguments (callbacks)
  result += '🔄 CALLBACK FUNCTIONS:\n';
  const doubled = processArray(numbers, double);
  result += `Doubled: [${doubled.join(', ')}]\n\n`;

  // 4. Common mistake: forgetting return
  result += '⚠️ COMMON MISTAKES:\n';
  result += '❌ Bad: const add = (a, b) => { a + b; } // No return!\n';
  result += '✅ Good: const add = (a, b) => { return a + b; }\n';
  result += '✅ Better: const add = (a, b) => a + b; // Implicit return\n';

  output.textContent = result;
}

// ============================================
// EVENT LISTENERS
// ============================================

document.getElementById('array-demo-btn').addEventListener('click', demonstrateArrays);
document.getElementById('object-demo-btn').addEventListener('click', demonstrateObjects);
document.getElementById('function-demo-btn').addEventListener('click', demonstrateFunctions);

// Run demos on page load
demonstrateArrays();
demonstrateObjects();
demonstrateFunctions();

