# Document Object Model (DOM)

## What is the DOM?

The **Document Object Model (DOM)** is a programming interface for HTML and XML documents. It represents the page structure as a tree of objects that can be manipulated with JavaScript.

Think of the DOM as a **live representation** of your HTML page that JavaScript can interact with.

---

## The DOM Tree Structure

The DOM represents your HTML document as a tree structure:

```
Document (root)
└── html
    ├── head
    │   ├── title
    │   └── link
    └── body
        ├── h1
        ├── div
        │   ├── button
        │   └── select
        └── table
            └── tr
                └── td
```

Each HTML element becomes a **node** in this tree. Nodes can be:
- **Element nodes** - HTML tags (`<div>`, `<p>`, `<button>`, etc.)
- **Text nodes** - Text content inside elements
- **Attribute nodes** - HTML attributes (`id`, `class`, `src`, etc.)

---

## Why is the DOM Important?

The DOM allows JavaScript to:
1. **Read** - Get information about elements on the page
2. **Modify** - Change content, styles, and structure
3. **React** - Respond to user interactions (clicks, typing, etc.)
4. **Create** - Add new elements dynamically

Without the DOM, JavaScript couldn't interact with web pages!

---

## Common DOM Methods

### Selecting Elements

```javascript
// By ID (returns single element)
const button = document.getElementById('add-row');

// By tag name (returns HTMLCollection)
const tables = document.getElementsByTagName('table');
const firstTable = tables[0]; // Get first table

// By class name (returns HTMLCollection)
const cards = document.getElementsByClassName('card');

// Modern query methods (returns NodeList)
const element = document.querySelector('#add-row'); // Single element
const elements = document.querySelectorAll('.card'); // All matching elements
```

**Question:** What's the difference between `getElementsByTagName` and `querySelector`? When would you use each?

### Creating Elements

```javascript
// Create a new element
const newRow = document.createElement('tr');
const newCell = document.createElement('td');

// Add text content
newCell.textContent = 'Hello World';

// Add to the DOM
newRow.appendChild(newCell);
table.appendChild(newRow);
```

### Modifying Elements

```javascript
// Change text content
element.textContent = 'New text';
element.innerHTML = '<strong>Bold text</strong>'; // Can include HTML

// Change attributes
element.setAttribute('id', 'my-id');
element.id = 'my-id'; // Shorthand

// Change classes
element.className = 'red'; // Replace all classes
element.classList.add('red'); // Add a class
element.classList.remove('red'); // Remove a class
element.classList.toggle('red'); // Toggle a class

// Change styles
element.style.backgroundColor = 'red';
element.style.color = 'white';
```

---

## Event Listeners

Event listeners allow your JavaScript to react to user interactions:

```javascript
// Add an event listener
button.addEventListener('click', function() {
    console.log('Button was clicked!');
});

// Using arrow functions
button.addEventListener('click', () => {
    console.log('Button clicked!');
});

// Named functions
function handleClick() {
    console.log('Clicked!');
}
button.addEventListener('click', handleClick);
```

### Common Events

- `'click'` - Mouse click
- `'mousedown'` - Mouse button pressed
- `'mouseup'` - Mouse button released
- `'mouseover'` - Mouse enters element
- `'mouseout'` - Mouse leaves element
- `'change'` - Value changed (for inputs, selects)
- `'input'` - User typing (for text inputs)
- `'keydown'` - Key pressed
- `'keyup'` - Key released

### Event Object

When an event fires, the browser passes an **event object** to your handler:

```javascript
element.addEventListener('click', function(event) {
    console.log(event.target); // Element that was clicked
    console.log(event.type); // Event type ('click')
    console.log(event.clientX); // Mouse X position
    console.log(event.clientY); // Mouse Y position
});
```

**Question:** What's the difference between `event.target` and `this` in an event handler?

---

## Event Delegation

**Event delegation** is a powerful technique where you attach an event listener to a parent element instead of individual child elements.

### Why Use Event Delegation?

**Without delegation:**
```javascript
// Have to attach listener to each cell individually
const cells = document.querySelectorAll('td');
cells.forEach(cell => {
    cell.addEventListener('click', colorize);
});

// Problem: New cells added dynamically won't have listeners!
```

**With delegation:**
```javascript
// Attach listener to parent table
table.addEventListener('click', function(event) {
    if (event.target.tagName === 'TD') {
        colorize(event);
    }
});

// Benefit: Works for existing AND future cells!
```

**Benefits:**
- Works with dynamically added elements
- Better performance (fewer listeners)
- Easier to manage

---

## DOM Manipulation Best Practices

### 1. Wait for DOM to Load

Always ensure the DOM is fully loaded before accessing elements:

```javascript
// Method 1: DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Your code here
});

// Method 2: Put script at end of body (simpler)
// <script src="script.js"></script> at bottom of HTML
```

### 2. Cache DOM References

Store frequently accessed elements in variables:

```javascript
// Good: Cache the reference
const table = document.getElementsByTagName('table')[0];
table.addEventListener('click', handleClick);
table.addEventListener('mouseover', handleHover);

// Bad: Query DOM multiple times
document.getElementsByTagName('table')[0].addEventListener('click', handleClick);
document.getElementsByTagName('table')[0].addEventListener('mouseover', handleHover);
```

### 3. Use Event Delegation for Dynamic Content

When elements are added dynamically, use event delegation:

```javascript
// Good: Delegation works for all cells
table.addEventListener('click', function(event) {
    if (event.target.tagName === 'TD') {
        colorize(event.target);
    }
});
```

### 4. Batch DOM Updates

Minimize the number of times you modify the DOM:

```javascript
// Good: Create fragment, then append once
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const cell = document.createElement('td');
    fragment.appendChild(cell);
}
table.appendChild(fragment);

// Bad: Append 100 times (slower)
for (let i = 0; i < 100; i++) {
    const cell = document.createElement('td');
    table.appendChild(cell); // DOM update each iteration
}
```

---

## Common DOM Patterns

### Pattern 1: Toggle Class

```javascript
function toggleColor(element) {
    if (element.classList.contains('red')) {
        element.classList.remove('red');
    } else {
        element.classList.add('red');
    }
    
    // Or use toggle:
    element.classList.toggle('red');
}
```

### Pattern 2: Conditional Styling

```javascript
function colorize(event) {
    const target = event.target;
    if (target.tagName !== 'TD') return; // Early return
    
    if (target.className === chosenColor) {
        target.className = ''; // Remove color
    } else {
        target.className = chosenColor; // Apply color
    }
}
```

### Pattern 3: Dynamic List Creation

```javascript
function createRow(cellCount) {
    const row = document.createElement('tr');
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('td');
        row.appendChild(cell);
    }
    return row;
}
```

---

## Debugging the DOM

### Browser DevTools

1. **Inspect Element** - Right-click → Inspect
2. **Console** - Test JavaScript and see errors
3. **Elements Panel** - View and modify DOM structure
4. **Event Listeners** - See attached listeners on elements

### Useful Console Commands

```javascript
// Check if element exists
console.log(document.getElementById('my-id'));

// See all elements with a class
console.log(document.querySelectorAll('.my-class'));

// Test event listeners
document.getElementById('my-button').click(); // Programmatically click
```

---

## Key Takeaways

1. **The DOM is a tree representation** of your HTML document
2. **JavaScript uses the DOM** to interact with web pages
3. **Select elements** using `getElementById`, `getElementsByTagName`, `querySelector`, etc.
4. **Modify elements** by changing properties, attributes, classes, or styles
5. **Event listeners** allow JavaScript to react to user interactions
6. **Event delegation** is powerful for dynamic content
7. **Always wait** for DOM to load before accessing elements

---

## Practice Exercises

1. Select an element by ID and change its text content
2. Create a new `<div>` element and add it to the page
3. Add a click event listener to a button
4. Use event delegation to handle clicks on dynamically added elements
5. Toggle a CSS class on an element when clicked

---

## Further Reading

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [JavaScript.info: DOM Manipulation](https://javascript.info/dom-nodes)

