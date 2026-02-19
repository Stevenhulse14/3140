# CISC 3140 — Higher Order Functions (HOFs)

## What is a Higher Order Function?
A **Higher Order Function** is a function that does at least one of these:
1. **Takes a function as an argument**
2. **Returns a function**

This matters because JavaScript treats functions like values:
- You can pass them around
- Store them in variables
- Return them from other functions

---

## The 3 Most Common HOFs You Already Use

### 1) `forEach` (do something for each item)

```js
const nums = [1, 2, 3];

nums.forEach((n) => {
  console.log("num:", n);
});
```

### 2) `map` (transform → returns a NEW array)

```js
const nums = [1, 2, 3];
const doubled = nums.map((n) => n * 2);

console.log(doubled); // [2, 4, 6]
```

### 3) `filter` (keep only what passes → returns a NEW array)

```js
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter((n) => n % 2 === 0);

console.log(evens); // [2, 4]
```

---

## Returning a Function (Another HOF)

```js
function makeMultiplier(x) {
  return function (n) {
    return n * x;
  };
}

const times3 = makeMultiplier(3);
console.log(times3(10)); // 30
```

---

## Quick "Mental Model"

- **map**: "change every item"
- **filter**: "keep some items"
- **forEach**: "do something, no return array"
- **returning functions**: "build a custom tool"

---

## Practice (Do This)

### Part A (map)
Given:
```js
const names = ["Nick", "Ava", "Jordan"];
```

Create a new array that turns them into:
```
"Nick!", "Ava!", "Jordan!"
```

### Part B (filter)
Given:
```js
const scores = [55, 72, 89, 40, 100, 67];
```

Create a new array that keeps only scores >= 70.

### Part C (write your own HOF)
Write a function called `repeatAction(times, action)` that:
- runs `action()` exactly `times` times

**Example:**
```js
repeatAction(3, () => console.log("GO"));
// GO
// GO
// GO
```

**Bonus:** Make it pass the current loop number into the callback:
```js
repeatAction(3, (i) => console.log("Round", i));
```

