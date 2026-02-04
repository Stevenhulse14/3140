# 🎮 Whack-a-Mole Lab 🎮

## 📋 Lab Overview

Welcome to your first interactive web game lab! In this lab, you'll build a **Whack-a-Mole** game using **HTML**, **CSS**, and **JavaScript**. This lab will help you practice:

- ✅ **HTML Structure**: Creating the game board layout
- ✅ **CSS Styling**: Making the game look visually appealing
- ✅ **JavaScript Logic**: Adding interactivity and game mechanics
- ✅ **DOM Manipulation**: Selecting elements and responding to user clicks
- ✅ **Event Handling**: Making the game respond to user interactions

---

## 🎯 Learning Objectives

By the end of this lab, you will be able to:

1. **Understand** how HTML, CSS, and JavaScript work together
2. **Create** interactive elements that respond to user clicks
3. **Manipulate** the DOM to update the game state
4. **Implement** game logic including scoring and timing
5. **Debug** common issues with file linking and event listeners

---

## 📁 File Structure

```
Lab.Whack-a-mole/
├── index.html          ← HTML structure (the skeleton)
├── style.css          ← CSS styling (the appearance)
├── index.js           ← JavaScript logic (the behavior)
└── images/
    ├── hole.png       ← Image of a hole
    └── mole.png       ← Image of a mole
```

### 🔍 File Roles Explained

- **`index.html`**: Defines the structure of your page (what elements exist)
- **`style.css`**: Controls how everything looks (colors, sizes, layout)
- **`index.js`**: Contains the game logic (what happens when you click, scoring, etc.)
- **`images/`**: Contains the visual assets (hole and mole images)

---

## 🚀 Getting Started

### Step 1: Open the Files

1. Open `index.html` in your code editor (VS Code, Sublime, etc.)
2. Open `style.css` in a separate tab
3. Open `index.js` in another tab
4. Open `index.html` in your web browser (Chrome, Firefox, etc.)

### Step 2: Understand the Current State

Right now, the game has:
- ✅ A score display at the top
- ✅ A game board with 9 holes
- ✅ Basic styling
- ❌ **NO game logic yet** (that's what you'll add!)

---

## 📝 Lab Instructions

### Part 1: Understanding the HTML Structure 📄

#### What's Already There?

The HTML file (`index.html`) contains:

```html
<h1 id="score">0</h1>
```
- This displays the score (currently always shows 0)
- The `id="score"` lets JavaScript find and update this element

```html
<div id="whack-a-mole">
  <div class="hole"></div>
  <!-- ... 8 more holes ... -->
</div>
```
- The container `div` holds all the holes
- Each `<div class="hole">` represents one hole on the game board
- Currently, there are 9 holes (3x3 grid)

#### 🎓 Key HTML Concepts:

- **`<div>`**: A container element (like a box)
- **`id`**: Unique identifier (only ONE element can have `id="score"`)
- **`class`**: Reusable identifier (multiple elements can share `class="hole"`)
- **`<h1>`**: Heading element (big, bold text)

---

### Part 2: Understanding the CSS Styling 🎨

#### What's Already There?

The CSS file (`style.css`) contains:

```css
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```
- **`display: flex`**: Makes the body a flex container
- **`flex-direction: column`**: Stacks children vertically
- **`justify-content: center`**: Centers content vertically
- **`align-items: center`**: Centers content horizontally

```css
#whack-a-mole {
  background-color: darkolivegreen;
  display: flex;
  flex-wrap: wrap;
  width: 360px;
}
```
- **`background-color`**: Sets the game board color (green grass)
- **`display: flex`** + **`flex-wrap: wrap`**: Creates a grid layout
- **`width: 360px`**: Sets the board width (3 holes × 120px each)

```css
.hole {
  background-image: url("images/hole.png");
  width: 110px;
  height: 123px;
  margin: 5px;
}
```
- **`background-image`**: Shows the hole image
- **`width`** and **`height`**: Sets hole size
- **`margin`**: Adds space between holes

```css
.mole {
  background-image: url("images/mole.png");
}
```
- **`.mole`**: This class will be ADDED to holes when a mole appears
- When a hole has both `.hole` AND `.mole` classes, it shows the mole image

#### 🎓 Key CSS Concepts:

- **Selectors**: 
  - `body` = selects `<body>` element
  - `#whack-a-mole` = selects element with `id="whack-a-mole"`
  - `.hole` = selects elements with `class="hole"`
- **Flexbox**: Modern layout system for arranging elements
- **Background images**: Using images instead of colors

---

### Part 3: Building the JavaScript Logic 💻

#### Current State

The JavaScript file (`index.js`) currently only has:
```javascript
let score = 0;
```
- This creates a variable to store the score
- But nothing updates it or displays it yet!

#### 🎯 Your Tasks:

You need to implement the following features:

##### Task 1: Select All Holes ✅

```javascript
// Get all hole elements
const holes = document.querySelectorAll('.hole');
```
- **`document.querySelectorAll('.hole')`**: Finds ALL elements with class "hole"
- Returns a list (array) of elements
- Store it in a variable called `holes`

##### Task 2: Select the Score Element ✅

```javascript
// Get the score display element
const scoreElement = document.getElementById('score');
```
- **`document.getElementById('score')`**: Finds the ONE element with `id="score"`
- Store it in a variable called `scoreElement`

##### Task 3: Create a Function to Show a Random Mole 🎲

```javascript
function showRandomMole() {
  // Remove mole class from all holes first
  holes.forEach(hole => {
    hole.classList.remove('mole');
  });
  
  // Pick a random hole
  const randomIndex = Math.floor(Math.random() * holes.length);
  const randomHole = holes[randomIndex];
  
  // Add mole class to the random hole
  randomHole.classList.add('mole');
}
```

**How it works:**
1. **`holes.forEach(...)`**: Loops through all holes
2. **`hole.classList.remove('mole')`**: Removes the mole from all holes
3. **`Math.random()`**: Generates a random number between 0 and 1
4. **`Math.floor(...)`**: Rounds down to nearest integer
5. **`holes[randomIndex]`**: Gets the hole at that position
6. **`randomHole.classList.add('mole')`**: Adds the mole class to show the mole

##### Task 4: Add Click Listeners to All Holes 🖱️

```javascript
holes.forEach((hole, index) => {
  hole.addEventListener('click', () => {
    // Check if this hole has the mole class
    if (hole.classList.contains('mole')) {
      // Player hit the mole!
      score++;
      scoreElement.textContent = score;
      
      // Remove mole immediately
      hole.classList.remove('mole');
    }
  });
});
```

**How it works:**
1. **`hole.addEventListener('click', ...)`**: Listens for clicks on each hole
2. **`hole.classList.contains('mole')`**: Checks if mole is in this hole
3. **`score++`**: Increases score by 1
4. **`scoreElement.textContent = score`**: Updates the display
5. **`hole.classList.remove('mole')`**: Hides the mole

##### Task 5: Make Moles Appear Automatically ⏰

```javascript
// Show a mole every 1 second
setInterval(() => {
  showRandomMole();
}, 1000);
```

**How it works:**
- **`setInterval(function, milliseconds)`**: Runs a function repeatedly
- **`1000`**: 1000 milliseconds = 1 second
- Every second, a new mole appears in a random hole

##### Task 6: Optional - Add a Timer ⏱️

```javascript
let timeLeft = 30; // 30 seconds

const timerElement = document.createElement('h2');
timerElement.textContent = `Time: ${timeLeft}`;
document.body.insertBefore(timerElement, document.body.firstChild);

const timer = setInterval(() => {
  timeLeft--;
  timerElement.textContent = `Time: ${timeLeft}`;
  
  if (timeLeft <= 0) {
    clearInterval(timer);
    alert(`Game Over! Your score: ${score}`);
  }
}, 1000);
```

---

## 🎮 Complete Solution Guide

### Full `index.js` File:

```javascript
// ============================================
// VARIABLES (State)
// ============================================
let score = 0;

// ============================================
// SELECT ELEMENTS FROM HTML
// ============================================
const holes = document.querySelectorAll('.hole');
const scoreElement = document.getElementById('score');

// ============================================
// FUNCTIONS
// ============================================

// Show a mole in a random hole
function showRandomMole() {
  // Remove mole from all holes
  holes.forEach(hole => {
    hole.classList.remove('mole');
  });
  
  // Pick random hole
  const randomIndex = Math.floor(Math.random() * holes.length);
  const randomHole = holes[randomIndex];
  
  // Add mole to random hole
  randomHole.classList.add('mole');
}

// ============================================
// EVENT LISTENERS
// ============================================

// Add click listener to each hole
holes.forEach(hole => {
  hole.addEventListener('click', () => {
    // Check if this hole has a mole
    if (hole.classList.contains('mole')) {
      // Increase score
      score++;
      
      // Update score display
      scoreElement.textContent = score;
      
      // Remove mole immediately
      hole.classList.remove('mole');
    }
  });
});

// ============================================
// GAME LOOP
// ============================================

// Show a new mole every 1 second (1000 milliseconds)
setInterval(() => {
  showRandomMole();
}, 1000);
```

---

## 🐛 Common Errors & Solutions

### ❌ Error: "Cannot read property 'textContent' of null"

**Problem**: JavaScript is trying to update an element that doesn't exist.

**Solution**: 
- Make sure your `<script>` tag is at the **bottom** of `<body>`
- Or use `defer` attribute: `<script src="index.js" defer></script>`
- Check that `id="score"` exists in your HTML

### ❌ Error: "holes is not defined"

**Problem**: You're using `holes` before it's defined.

**Solution**: Make sure `const holes = document.querySelectorAll('.hole');` comes BEFORE you use it.

### ❌ Error: CSS not loading / Images not showing

**Problem**: File paths are incorrect.

**Solution**: 
- Check that `style.css` is in the same folder as `index.html`
- Check that `images/` folder exists and contains `hole.png` and `mole.png`
- Use relative paths: `"images/hole.png"` (not `"/images/hole.png"`)

### ❌ Error: Nothing happens when I click

**Problem**: Event listeners aren't attached.

**Solution**:
- Make sure you're using `addEventListener('click', ...)`
- Check that your code runs AFTER the HTML loads (script at bottom of body)
- Open browser DevTools Console (F12) to see error messages

---

## 🎨 Customization Ideas

Want to make the game your own? Try these enhancements:

### 🎯 Easy Enhancements:
- ✅ Change the game duration (make it longer/shorter)
- ✅ Change how often moles appear (faster = harder)
- ✅ Add sound effects when you hit a mole
- ✅ Change colors in CSS

### 🎯 Medium Enhancements:
- ✅ Add a "Start Game" button
- ✅ Show "Game Over" message with final score
- ✅ Add difficulty levels (Easy/Medium/Hard)
- ✅ Make moles disappear after a few seconds if not clicked

### 🎯 Advanced Enhancements:
- ✅ Add a high score tracker (using localStorage)
- ✅ Add multiple mole types with different point values
- ✅ Add animations when moles appear/disappear
- ✅ Add a countdown timer before game starts

---

## 📚 Key Concepts Review

### HTML (Structure)
- **Elements**: `<div>`, `<h1>`, etc.
- **Attributes**: `id`, `class`, `src`, `href`
- **Semantic meaning**: Use appropriate tags

### CSS (Styling)
- **Selectors**: Target elements to style
- **Properties**: `color`, `background-color`, `width`, `height`
- **Flexbox**: Modern layout system
- **Classes**: Reusable styles

### JavaScript (Behavior)
- **Variables**: Store data (`let score = 0`)
- **Functions**: Reusable code blocks
- **DOM Selection**: `getElementById()`, `querySelectorAll()`
- **Event Listeners**: Respond to user actions
- **Classes**: `classList.add()`, `classList.remove()`, `classList.contains()`
- **Timing**: `setInterval()` for repeated actions

---

## ✅ Checklist

Before submitting, make sure:

- [ ] Game displays 9 holes
- [ ] Score starts at 0
- [ ] Moles appear randomly in holes
- [ ] Clicking a mole increases score
- [ ] Score updates in real-time
- [ ] Moles disappear when clicked
- [ ] No console errors (check DevTools)
- [ ] Code is commented and organized
- [ ] Files are properly linked (CSS and JS)

---

## 🎓 Reflection Questions

After completing the lab, think about:

1. **How does HTML, CSS, and JavaScript work together?**
   - HTML provides structure
   - CSS provides styling
   - JavaScript provides interactivity

2. **What is the DOM?**
   - The Document Object Model = browser's representation of HTML
   - JavaScript can read and modify it

3. **Why do we put CSS in `<head>` and JS at bottom of `<body>`?**
   - CSS loads early to prevent unstyled content flash
   - JS loads late so HTML exists before scripts run

4. **What's the difference between `id` and `class`?**
   - `id`: Unique identifier (one per page)
   - `class`: Reusable identifier (many per page)

---

## 🚀 Next Steps

Once you've completed this lab:

1. **Experiment**: Try the customization ideas above
2. **Debug**: Break something on purpose and fix it
3. **Share**: Show your game to classmates
4. **Extend**: Add features that interest you

---

## 📞 Need Help?

If you're stuck:

1. **Check the console**: Open DevTools (F12) → Console tab
2. **Read error messages**: They usually tell you what's wrong
3. **Check file paths**: Make sure all files are in the right place
4. **Ask questions**: Your instructor is here to help!

---

## 🎉 Congratulations!

You've built your first interactive web game! You now understand:
- ✅ How to structure HTML
- ✅ How to style with CSS
- ✅ How to add interactivity with JavaScript
- ✅ How to manipulate the DOM
- ✅ How to handle user events

**Keep coding and have fun!** 🚀

