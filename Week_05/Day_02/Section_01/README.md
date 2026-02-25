# Pokemon Express Server - Step by Step Guide

This guide will walk you through creating a simple Express.js server that serves Pokemon data both from a local array and from the PokeAPI.

## Prerequisites

- Node.js installed on your computer
- Basic understanding of JavaScript
- A code editor (VS Code recommended)

## Step 1: Initialize Your Project

Create a new directory and initialize npm:

```bash
mkdir Section_01
cd Section_01
npm init -y
```

This creates a `package.json` file with default settings.

## Step 2: Install Dependencies

Install Express and Nodemon:

```bash
npm install express
npm install nodemon --save-dev
```

- **Express**: Web framework for creating the server
- **Nodemon**: Automatically restarts server when files change

## Step 3: Update package.json Scripts

Open `package.json` and add a start script:

```json
"scripts": {
  "start": "nodemon server.js"
}
```

## Step 4: Create server.js

Create a file called `server.js` with the following code:

```javascript
const express = require("express");
const server = express();

const PORT = 3093;

// Array of Pokemon
const pokemon = [
  {
    id: 1,
    name: "Pikachu",
    type: "Electric",
    hp: 35,
    location: "./images/pikachu.png",
  },
  {
    id: 2,
    name: "Charizard",
    type: "Fire/Flying",
    hp: 78,
    location: "./images/charizard.png",
  },
  {
    id: 3,
    name: "Blastoise",
    type: "Water",
    hp: 79,
    location: "./images/blastoise.png",
  },
];

// Home route
server.get("/", (req, res) => {
  res.status(200).send(`
    <h1 style="color:red;">POKEMON IS THE GREATEST</h1>
    <p>Try visiting /1, /2, or /3 to see different Pokemon!</p>
  `);
});

// Dynamic route - must be last
server.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundPokemon = pokemon.find((p) => p.id === id);

  if (foundPokemon) {
    res.status(200).json(foundPokemon);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
});

server.listen(PORT, () => {
  console.log(`Your Port is running on ${PORT}`);
});
```

### What This Does:

- **Line 1-2**: Import Express and create a server instance
- **Line 4**: Define the port number (3093)
- **Lines 7-11**: Create an array of 3 Pokemon objects
- **Lines 14-19**: Home route that displays HTML
- **Lines 22-32**: Dynamic route that accepts any ID and returns matching Pokemon

## Step 5: Test Your Server

Start the server:

```bash
npm start
```

You should see: `Your Port is running on 3093`

Visit in your browser:

- `http://localhost:3093/` - Home page
- `http://localhost:3093/1` - Returns Pikachu
- `http://localhost:3093/2` - Returns Charizard
- `http://localhost:3093/3` - Returns Blastoise

## Step 6: Add PokeAPI Integration

Create a file called `getPokemon.js` (or reference from Section_02):

```javascript
async function getPokemonWithAsyncAwait() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();
  return data.results;
}

module.exports = { getPokemonWithAsyncAwait };
```

## Step 7: Update server.js with API Route

Add this to the top of `server.js`:

```javascript
const { getPokemonWithAsyncAwait } = require("./getPokemon");
```

Add this route BEFORE the `/:id` route:

```javascript
server.get("/original", async (req, res) => {
  try {
    const response = await getPokemonWithAsyncAwait();
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send("No Data");
  }
});
```

### Why Route Order Matters:

⚠️ **IMPORTANT**: Specific routes like `/original` MUST come before dynamic routes like `/:id`

- ✅ Correct order: `/original` then `/:id`
- ❌ Wrong order: `/:id` then `/original` (will treat "original" as an ID)

## Step 8: Test API Route

Visit `http://localhost:3093/original` to see all 151 Pokemon from the PokeAPI.

## Available Routes

| Route           | Description                 | Example Response                      |
| --------------- | --------------------------- | ------------------------------------- |
| `GET /`         | Home page with instructions | HTML page                             |
| `GET /original` | All 151 Pokemon from API    | JSON array of 151 Pokemon             |
| `GET /1`        | Get Pokemon by ID (local)   | `{"id": 1, "name": "Pikachu", ...}`   |
| `GET /2`        | Get Pokemon by ID (local)   | `{"id": 2, "name": "Charizard", ...}` |
| `GET /3`        | Get Pokemon by ID (local)   | `{"id": 3, "name": "Blastoise", ...}` |

## Optional: Share Your Server with ngrok

1. Install ngrok:

   ```bash
   brew install ngrok
   ```

2. Sign up at [ngrok.com](https://ngrok.com) and get your auth token

3. Authenticate:

   ```bash
   ngrok config add-authtoken YOUR_TOKEN
   ```

4. Start your server:

   ```bash
   npm start
   ```

5. In a new terminal, start ngrok:

   ```bash
   ngrok http 3093
   ```

6. Share the public URL (e.g., `https://abc123.ngrok-free.app`)

## Troubleshooting

### "nodemon: command not found"

Run with npm script instead:

```bash
npm start
```

Or use npx:

```bash
npx nodemon server.js
```

### Getting "Pokemon not found" for /original

Make sure `/original` route is defined BEFORE the `/:id` route in your server.js file.

### Port already in use

Change the PORT variable to a different number (e.g., 3094, 3095) in server.js

## Key Concepts Learned

- ✅ Setting up an Express server
- ✅ Creating GET routes
- ✅ Using route parameters (`:id`)
- ✅ Fetching data from external APIs
- ✅ Async/await for handling promises
- ✅ Route ordering importance
- ✅ Sending JSON responses
- ✅ Error handling with try/catch

## Next Steps

- Add more Pokemon to the local array
- Create POST routes to add new Pokemon
- Add filtering by Pokemon type
- Create a simple HTML frontend
- Add more routes from the PokeAPI (types, abilities, etc.)

---

**Happy Coding!** 🚀

 <!DOCTYPE html>

      <html>
        <head>
          <title>${foundPokemon.name}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 50px auto;
              text-align: center;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 20px;
            }
            .card {
              background: white;
              padding: 30px;
              border-radius: 15px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            h1 {
              color: #333;
              text-transform: capitalize;
            }
            img {
              width: 200px;
              height: 200px;
              image-rendering: pixelated;
            }
            .info { margin: 20px 0; font-size: 18px; }
            .label { font-weight: bold; color: #667eea; }
            a {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${foundPokemon.name}</h1>
            <img src="${foundPokemon.image}" alt="${foundPokemon.name}">
            <div class="info"><span class="label">ID:</span> ${foundPokemon.id}</div>
            <div class="info"><span class="label">Type:</span> ${foundPokemon.type}</div>
            <div class="info"><span class="label">HP:</span> ${foundPokemon.hp}</div>
            <a href="/">← Back to Home</a>
          </div>
        </body>
      </html>
