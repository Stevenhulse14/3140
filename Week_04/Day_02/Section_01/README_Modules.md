# CISC 3140 — Modules (CommonJS + Clean File Structure)

## What are "modules"?
A **module** is just a file that *exports* code so other files can *import* and use it.

Why we care:
- Keeps code **organized** (separation of concerns)
- Makes code **reusable**
- Makes debugging easier (smaller files = smaller problems)

---

## CommonJS (Node.js) Quick Rules

### Export
In a module file, export values/functions with:
- `module.exports = ...` (export one thing)
- `module.exports = { a, b }` (export multiple things)

### Import
In another file, import with:
- `const thing = require("./path");`

> ✅ **Important**: `./` means "same folder".

---

## Example File Structure

```
week4-day2/
├── index.js
└── helperFunctions.js
```

---

## Example: Export Multiple Helpers

### `helperFunctions.js`

```js
function isTen(value) {
  return value === 10 || value === "Ten" || value === "King" || value === "Queen" || value === "Jack";
}

function aceValue(currentTotal) {
  // if total is 11 or more, Ace should be 1; otherwise 11
  return currentTotal >= 11 ? 1 : 11;
}

function hit(state, who) {
  const card = state.deck.pop();
  if (!card) throw new Error("Deck is empty");

  if (who === "player") state.player.push(card);
  else if (who === "house") state.house.push(card);
  else throw new Error('who must be "player" or "house"');

  return state;
}

module.exports = { isTen, aceValue, hit };
```

### `index.js`

```js
const { isTen, aceValue, hit } = require("./helperFunctions");

console.log(isTen("King")); // true
```

---

## Common Mistakes

✅ **Correct:**
```js
const { hit } = require("./helperFunctions");
```

❌ **Wrong path:**
```js
require("helperFunctions"); // missing ./ so Node looks in node_modules
```

❌ **Forgetting to export:**
```js
// If you forget module.exports, require(...) returns {}
```

---

## Practice (Do This)

**Task:** Make a new module file called `mathHelpers.js` with:
- `add(a, b)`
- `subtract(a, b)`
- `multiply(a, b)`

Then import them into `index.js` and print:
- `add(10, 5)` → 15
- `multiply(3, 4)` → 12

**Bonus:** Export them as an object like:
```js
module.exports = { add, subtract, multiply };
```

