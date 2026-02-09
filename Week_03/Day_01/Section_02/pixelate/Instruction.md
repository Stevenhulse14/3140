# Pixelate: 8-Bit Art Editor

## Overview
You're going to build **Pixelate**, an interactive 8-bit pixel art editor! This application will allow users to:
- Add rows of pixels to create a canvas
- Select colors from a dropdown
- Click on pixels to color them
- Drag to paint multiple pixels at once

---

## Part 1: Setting Up the HTML Structure

### Step 1.1: Basic HTML Setup
Start by creating your `index.html` file with the basic structure.

**Think about it:**
- What HTML elements do you need for a title?
- How do you link an external CSS file?
- How do you link an external JavaScript file?

**Your task:**
Create the basic HTML structure with:
- A `<title>` tag that says "Pixelate"
- A link to Google Fonts for the "Press Start 2P" font
- A link to your `style.css` file
- A script tag that loads your `script.js` file at the bottom of the body

---

### Step 1.2: Adding the UI Elements

**Think about it:**
- What HTML element creates a clickable button?
- What HTML element creates a dropdown menu?
- What HTML element creates a table structure?

**Your task:**
Add to your HTML body:
1. An `<h1>` with the text "Pixelate"
2. A `<div>` container that holds:
   - A `<button>` with `id="add-row"` and text "Add a row"
   - A `<select>` element (we'll add options in the next step)
3. An empty `<table>` element

**Question:** Why do you think we're using a table for the pixel grid? What other HTML elements could work?

---

### Step 1.3: Adding Color Options

**Think about it:**
- What HTML element goes inside a `<select>` to create options?
- What attribute should each option have to store the color value?

**Your task:**
Inside your `<select>` element, add `<option>` elements for these colors:
- Red, Orange, Yellow, Green, Blue, Indigo, Violet, Black, White, Brown

Each option should have a `value` attribute matching the color name (lowercase).

**Question:** Why is it important to use lowercase for the value attribute? What happens if you use different casing?

---

## Part 2: Styling with CSS

### Step 2.1: Basic CSS Reset and Typography

**Think about it:**
- What CSS property ensures padding and borders are included in element width calculations?
- How do you apply a font to all elements?

**Your task:**
Create your `style.css` file and add:
1. A universal selector (`*`) that sets `box-sizing: border-box` and applies the "Press Start 2P" font
2. Style the `html` element with a dark background (`#222`) and white text color
3. Style the `body` to use flexbox, column direction, and center alignment

**Question:** Why use `box-sizing: border-box`? What problems does it solve?

---

### Step 2.2: Styling the Table Cells

**Think about it:**
- What size should each pixel cell be? (Hint: 50px × 50px)
- What background color should unpainted cells have?
- Should cells have any transitions for smooth color changes?

**Your task:**
Style the `td` elements to:
- Be 50px × 50px
- Have a light gray background color
- Include a transition for `background-color` that takes 0.5 seconds with an ease timing function

**Question:** Why add a transition? What user experience benefit does it provide?

---

### Step 2.3: Creating Color Classes

**Think about it:**
- How can CSS classes be used to apply different background colors?
- What naming convention should you use for these classes?

**Your task:**
Create CSS classes for each color (`.red`, `.orange`, `.yellow`, `.green`, `.blue`, `.indigo`, `.violet`, `.black`, `.white`, `.brown`) that set the appropriate `background-color`.

**Question:** Why use classes instead of inline styles? What are the benefits?

---

## Part 3: JavaScript Functionality

### Step 3.1: Getting References to DOM Elements

**Think about it:**
- How do you get a reference to an element by its tag name?
- How do you get a reference to an element by its ID?
- When should you get these references? (Hint: when the DOM is loaded)

**Your task:**
At the top of your `script.js`, create variables that store references to:
- The `<table>` element (using `getElementsByTagName`)
- The `<select>` element (using `getElementsByTagName`)
- The button with `id="add-row"` (using `getElementById`)

Also create a variable `chosenColor` initialized to `'red'`.

**Question:** Why store these references in variables? What's the benefit over querying the DOM every time?

---

### Step 3.2: Adding Rows Functionality

**Think about it:**
- How do you create a new HTML element in JavaScript?
- How do you add a child element to a parent?
- How many cells should each row have? (Hint: look at the solution - it's 20)

**Your task:**
Create a function called `makeRow` that:
1. Creates a new `<tr>` element
2. Loops 20 times to create `<td>` elements
3. Appends each `<td>` to the `<tr>`
4. Appends the `<tr>` to the table

Then add an event listener to the button that calls `makeRow` when clicked.

**Question:** Why use a loop here? What would happen if you hardcoded 20 separate `createElement` calls?

---

### Step 3.3: Color Selection

**Think about it:**
- What event fires when a user changes a dropdown selection?
- How do you get the selected value from a `<select>` element?

**Your task:**
Create a function called `pickColor` that:
- Takes an event parameter
- Updates the `chosenColor` variable to `event.target.value`

Add an event listener to the select element that listens for `'change'` events and calls `pickColor`.

**Question:** Why use `event.target.value` instead of `select.value`? Are they the same in this case?

---

### Step 3.4: Coloring Individual Pixels

**Think about it:**
- What event fires when a user clicks on an element?
- How do you know which element was clicked?
- How do you add/remove a CSS class from an element?
- What should happen if you click a pixel that already has the selected color? (Hint: toggle it off)

**Your task:**
Create a function called `colorize` that:
1. Takes an event parameter
2. Gets the target element from the event
3. Checks if the target is a `<td>` element (if not, return early)
4. If the cell already has the chosen color class, remove the class (toggle off)
5. Otherwise, set the cell's className to the chosenColor

Add an event listener to the table that listens for `'click'` events and calls `colorize`.

**Question:** Why check `target.tagName !== 'TD'`? What could happen if you don't check this?

---

### Step 3.5: Drag-to-Paint Functionality

**Think about it:**
- What events fire when you press down, move, and release the mouse?
- How can you enable painting while dragging?
- Why might you want to add/remove event listeners dynamically?

**Your task:**
Create two functions:
1. `addMouseOver` - adds a `'mouseover'` event listener to the table that calls `colorize`
2. `removeMouseOver` - removes the `'mouseover'` event listener from the table

Add event listeners to the table:
- `'mousedown'` should call `addMouseOver`
- `'mouseup'` should call `removeMouseOver`

**Question:** Why add the mouseover listener only when the mouse is down? What would happen if it was always active?

---

## Part 4: Testing and Debugging

### Step 4.1: Test Your Application

**Your task:**
Test each feature:
1. Click "Add a row" - does it add 20 cells?
2. Select a color from the dropdown - does `chosenColor` update?
3. Click a cell - does it change to the selected color?
4. Click the same cell again - does it toggle off?
5. Click and drag across cells - do they all get colored?

**Common issues to check:**
- Are your file paths correct? (`/style.css` vs `style.css`)
- Are your event listeners attached after the DOM loads?
- Are you checking the correct tag names (case-sensitive)?

---

## Part 5: Reflection Questions

1. **Event Delegation:** Why did we attach the click listener to the table instead of each individual cell? What's the benefit?

2. **Dynamic Content:** How does event delegation help when we add new rows dynamically?

3. **User Experience:** What improvements could you make to this application? (e.g., clear button, save functionality, different canvas sizes)

4. **Code Organization:** How could you refactor this code to be more modular? What functions could be extracted?

---

## Bonus Challenges

If you finish early, try these enhancements:

1. **Clear Button:** Add a button that removes all color classes from all cells
2. **Initial Grid:** Start with 5 rows already created when the page loads
3. **Eraser Tool:** Add an "Eraser" option that sets cells back to their default state
4. **Save Functionality:** Allow users to export their pixel art (hint: use canvas API or data URLs)
5. **Grid Size Options:** Let users choose how many cells per row (10, 20, or 30)

---

## Solution Checklist

Before checking the solution, make sure you've attempted:
- [ ] HTML structure with button, select, and table
- [ ] CSS styling with color classes
- [ ] JavaScript to add rows dynamically
- [ ] Color selection functionality
- [ ] Click-to-color functionality
- [ ] Drag-to-paint functionality

Good luck! 🎨

