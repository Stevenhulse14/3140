# Blackjack Demo — Step-by-Step (Console Version)

## Goal
We're building a simple Blackjack game in **Node.js**, starting with:
- deck creation
- shuffle
- auto dealing
- hit logic
- hand value logic (including Ace rules)
- basic win/lose evaluation
- dealer rules (hit until 17)

This is the "starter engine" before any UI.

---

## Recommended File Structure

```
blackjack/
├── index.js
└── helperFunctions.js
```

---

## Step 0 — Starter Game State (What we already have)
- `gameState` stores **everything**: player name, hands, deck
- `startGame()` sets up the deck and deals

**Key idea:**
> **State object = your single source of truth**

---

## Step 1 — Implement Hand Value

You have cards like:
```js
{ "Ace ♣": 11 }
{ "King ♦": 10 }
{ "7 ♥": 7 }
```

### Add this helper

```js
function handValue(hand) {
  // sum first
  let total = 0;
  let aceCount = 0;

  for (const card of hand) {
    const val = Object.values(card)[0];
    total += val;
    if (val === 11) aceCount++;
  }

  // if we bust and we have aces, convert 11 → 1 (subtract 10) until safe
  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }

  return total;
}
```

✅ **Why the -10 trick works:**
- Ace is 11, but can become 1
- 11 → 1 is a difference of 10

---

## Step 2 — Add `hit(state, who)`

Hit means: draw 1 card from deck and add it to the correct hand.

```js
function hit(state, who) {
  const card = state.deck.pop();
  if (!card) throw new Error("Deck is empty");

  if (who === "player") state.player.push(card);
  else if (who === "house") state.house.push(card);
  else throw new Error('who must be "player" or "house"');

  return state;
}
```

---

## Step 3 — Add a "showHands" Debug Print

```js
function showHands(state) {
  console.log("\n=== HANDS ===");
  console.log("Player:", state.player);
  console.log("House :", state.house);

  console.log("Player total:", handValue(state.player));
  console.log("House total :", handValue(state.house));
}
```

---

## Step 4 — Basic Win/Lose Check (Player)

```js
function checkPlayer(state) {
  const p = handValue(state.player);
  if (p > 21) return "PLAYER_BUST";
  if (p === 21) return "PLAYER_BLACKJACK";
  return "CONTINUE";
}
```

---

## Step 5 — Dealer Rules (House hits until 17+)

```js
function dealerTurn(state) {
  while (handValue(state.house) < 17) {
    hit(state, "house");
  }
  return state;
}
```

---

## Step 6 — Final Compare

```js
function finalResult(state) {
  const p = handValue(state.player);
  const h = handValue(state.house);

  if (h > 21) return "HOUSE_BUST_PLAYER_WINS";
  if (p > h) return "PLAYER_WINS";
  if (p < h) return "HOUSE_WINS";
  return "PUSH_TIE";
}
```

---

## Step 7 — Suggested "Game Loop" Flow (Console)

This is the full logic flow we're building toward:

1. `startGame()` creates/shuffles deck + autoDeals
2. show hands
3. player chooses: hit or stand (we'll simulate for now)
4. if player busts → game ends
5. if player stands → `dealerTurn()`
6. compare totals → declare winner

### Simulation (no prompt yet)

```js
function simulateRound(state) {
  showHands(state);

  // simulate 1 hit for player
  console.log("\nPlayer chooses HIT");
  hit(state, "player");
  showHands(state);

  const status = checkPlayer(state);
  if (status !== "CONTINUE") {
    console.log("\nResult:", status);
    return;
  }

  console.log("\nPlayer chooses STAND");
  dealerTurn(state);
  showHands(state);

  console.log("\nResult:", finalResult(state));
}
```

---

## Practice (Students)

1. **Implement `handValue(hand)`** and prove it works with:
   - `[Ace, King]` = 21
   - `[Ace, 9, 9]` = 19 (Ace becomes 1)
   - `[Ace, Ace, 9]` = 21 (one Ace is 11, the other becomes 1)

2. **Implement `dealerTurn(state)`** and test:
   - Dealer has `[10, 6]` should hit
   - Dealer has `[10, 7]` should stop

3. **Add a function `isGameOver(state)`** that returns `true` if:
   - player busts OR
   - dealer busts OR
   - player hits 21 OR
   - dealer hits 21

---

## Next Expansion (Coming Up)

- Real player input (readline)
- Multiple rounds
- Betting
- Split / double down (optional)
- UI version (DOM events later)

