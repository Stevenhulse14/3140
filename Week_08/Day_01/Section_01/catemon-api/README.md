# Catèmon API 🐱⚡

A fun Express API that allows users to interact with fictional creatures called **Catèmon**, inspired by Pokémon but based on real cats.

Each Catèmon is inspired by one of the creator's real cats.

---

## Learning Objectives

By building this project, you will learn:

- **What Express is** — A Node.js framework that makes building web servers and APIs easier
- **What an API is** — An Application Programming Interface; a way for programs to talk to each other over the internet
- **What REST endpoints are** — URLs that represent resources and support different actions (GET, POST, PUT, DELETE)
- **How HTTP methods work** — GET (read), POST (create), PUT (update), DELETE (remove)
- **How to organize an Express project** — Separating routes, data, and configuration into logical folders
- **How to use routers and index.js** — Reducing import clutter and scaling your app as it grows
- **How to simulate a database** — Using an in-memory JavaScript array instead of a real database

---

## What is Express?

**Express** is a lightweight, flexible Node.js web application framework. It provides:

- Simple APIs for defining **routes** (URL paths and how to respond to them)
- **Middleware** support (functions that run between receiving a request and sending a response)
- Minimal overhead — you write the logic, Express handles the HTTP plumbing

Without Express, you would need to manually parse HTTP requests, handle headers, and format responses. Express does this for you so you can focus on your application logic.

### A Simple Express Server

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**What each line does:**

- `require("express")` — Imports the Express library
- `const app = express()` — Creates an Express application instance
- `app.listen(PORT, callback)` — Starts the server on the given port; the callback runs when the server is ready
- The callback logs a message so you know the server is running

---

## Project Setup

Follow these steps to create and run the project from scratch.

### 1. Create the project folder

```bash
mkdir catemon-api
cd catemon-api
```

### 2. Initialize a Node.js project

```bash
npm init -y
```

- `npm init` creates a `package.json` file that tracks your project's dependencies and scripts
- The `-y` flag accepts all default values so you don't have to answer prompts

### 3. Install Express

```bash
npm install express
```

- This downloads Express and adds it to your `node_modules` folder
- It also updates `package.json` to list Express as a dependency

### 4. Run the server

```bash
node index.js
```

Or, if you add a start script to `package.json`:

```bash
npm start
```

---

## Project Structure

```
catemon-api
│
├── index.js              # Main entry point; starts the server and mounts routes
├── package.json          # Project metadata and dependencies
├── routes
│   ├── index.js          # Central router; mounts all route modules
│   └── catemonRoutes.js  # All /catemons endpoints (GET, POST, PUT, DELETE)
├── data
│   └── catemons.js       # In-memory database (array of Catèmon)
├── public
│   └── images            # Card images (card-1.png through card-9.png)
└── README.md
```

**Purpose of each file/folder:**

| File/Folder | Purpose |
|-------------|---------|
| `index.js` | Entry point. Creates the Express app, configures middleware, mounts routes, and starts the server. |
| `routes/index.js` | Central router. Imports all route modules and mounts them at their paths. Reduces clutter in the main file. |
| `routes/catemonRoutes.js` | Defines all endpoints for the `/catemons` resource. |
| `data/catemons.js` | Holds the Catèmon data as a JavaScript array. Acts as our "database." |
| `public/images/` | Static files. Card images go here and are served at `/images/card-1.png`, etc. |

---

## Creating the In-Memory Database

Instead of using a real database (like MongoDB or PostgreSQL), we store Catèmon in a **JavaScript array**. This is perfect for learning because:

- No setup required
- Data resets when the server restarts (good for experimentation)
- You can focus on API concepts without database complexity

### Data Structure

Each Catèmon has these properties:

| Property | Type | Description |
|----------|------|-------------|
| `id` | number | Unique identifier |
| `name` | string | The Catèmon's name |
| `type` | string | Elemental/personality type (like Pokémon types) |
| `personality` | string | Key personality trait |
| `description` | string | Full description of the cat |
| `imageUrl` | string | Path to the card image (e.g., `/images/card-1.png`) |

### The 9 Catèmon

| ID | Name | Type | Personality | Description |
|----|------|------|-------------|-------------|
| 1 | Shadow | Dark | bully | Big glowing emerald eyes, black as the night. A bully who loves to eat. |
| 2 | Graybaby | Electric | rambunctious | Gray, full of energy, tongue always sticking out. |
| 3 | Leelee | Fairy | sweet and flirty | Black and white like a cow, sweet and flirty like a princess. |
| 4 | Orange | Fire | spoiled | Very cute but annoying and spoiled, an uppity scaredy cat. |
| 5 | Chucky | Normal | troublemaker | Small orange troublemaker, sneezy boy, loves cuddles, short stubby legs. |
| 6 | Grace | Psychic | diva | Tiny gray diva, spoiled, always talking back, has a signature head twist. |
| 7 | Big Boy | Ground | lazy | Huge tabby with massive paws, loves laying in bed and bathing in sunlight. |
| 8 | Happy | Ice | majestic | Ancient majestic white cat with beautiful blue eyes. |
| 9 | Ginger | Grass | mesmerizing | Multicolored patterns with mesmerizing green eyes, similar build to Chucky. |

### Image Setup

Place your card images in the `public/images/` folder with these names:

- `card-1.png` → Shadow
- `card-2.png` → Graybaby
- `card-3.png` → Leelee
- `card-4.png` → Orange
- `card-5.png` → Chucky
- `card-6.png` → Grace
- `card-7.png` → Big Boy
- `card-8.png` → Happy
- `card-9.png` → Ginger

Once the server is running, images are available at:

- `http://localhost:3000/images/card-1.png`
- `http://localhost:3000/images/card-2.png`
- ... and so on.

---

## REST API Routes

**REST** (Representational State Transfer) is a style of designing APIs. The idea is that URLs represent **resources**, and HTTP methods represent **actions** on those resources.

### HTTP Methods

| Method | Action | Example |
|--------|--------|---------|
| **GET** | Retrieve data | Get all Catèmon or one by ID |
| **POST** | Create new data | Add a new Catèmon |
| **PUT** | Update existing data | Change a Catèmon's info |
| **DELETE** | Remove data | Delete a Catèmon |

### Our Catèmon Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/catemons` | Get all Catèmon |
| GET | `/catemons/:id` | Get one Catèmon by ID |
| POST | `/catemons` | Create a new Catèmon |
| PUT | `/catemons/:id` | Update a Catèmon |
| DELETE | `/catemons/:id` | Delete a Catèmon |

---

## GET All Catèmon

**Route:** `GET /catemons`

Returns the entire array of Catèmon as JSON.

```javascript
router.get("/", (req, res) => {
  res.json(catemons);
});
```

- `router.get("/", ...)` — Handles GET requests to the base path (which is `/catemons` when mounted)
- `req` — The request object (contains URL, headers, etc.)
- `res` — The response object
- `res.json(catemons)` — Sends the array as JSON with the correct `Content-Type` header

---

## GET One Catèmon

**Route:** `GET /catemons/:id`

Retrieves a single Catèmon by its ID. The `:id` in the path is a **route parameter** — it captures whatever value is in that position.

```javascript
router.get("/:id", (req, res) => {
  const catemon = catemons.find((c) => c.id === parseInt(req.params.id));
  if (!catemon) {
    return res.status(404).json({ error: "Catèmon not found" });
  }
  res.json(catemon);
});
```

- `req.params.id` — The value from the URL (e.g., `3` from `/catemons/3`)
- `parseInt()` — Converts the string to a number (route params are always strings)
- `Array.find()` — Returns the first element that matches, or `undefined` if none
- `res.status(404)` — Sends a 404 Not Found status when the Catèmon doesn't exist

---

## POST Create Catèmon

**Route:** `POST /catemons`

Creates a new Catèmon. The data is sent in the **request body** as JSON.

```javascript
router.post("/", (req, res) => {
  const newCatemon = req.body;
  catemons.push(newCatemon);
  res.status(201).json(newCatemon);
});
```

- `req.body` — The parsed JSON from the request body
- `catemons.push()` — Adds the new object to the array
- `res.status(201)` — 201 Created is the standard status for successful creation

### Why `express.json()` is Needed

By default, Express does not parse the request body. You must add this middleware:

```javascript
app.use(express.json());
```

This middleware reads the body, parses it as JSON, and attaches the result to `req.body`. Without it, `req.body` would be `undefined`.

---

## PUT Update Catèmon

**Route:** `PUT /catemons/:id`

Updates an existing Catèmon. The client sends the full updated object in the body.

```javascript
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = catemons.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Catèmon not found" });
  }
  catemons[index] = req.body;
  res.json(catemons[index]);
});
```

- `findIndex()` — Returns the array index of the matching element, or `-1` if not found
- `catemons[index] = req.body` — Replaces the old object with the new one
- We return the updated object so the client can confirm the change

---

## DELETE Catèmon

**Route:** `DELETE /catemons/:id`

Removes a Catèmon from the array.

```javascript
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = catemons.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Catèmon not found" });
  }
  const deleted = catemons.splice(index, 1);
  res.json(deleted);
});
```

- `splice(index, 1)` — Removes 1 element at `index` and returns an array of the removed elements
- We return the deleted Catèmon so the client knows what was removed

---

## Using index.js to Reduce Import Clutter

As your API grows, you might add routes for trainers, battles, items, etc. Importing each one in `index.js` gets messy. A **central router** solves this.

### routes/index.js

```javascript
const express = require("express");
const router = express.Router();

const catemonRoutes = require("./catemonRoutes");

router.use("/catemons", catemonRoutes);

module.exports = router;
```

- `express.Router()` — Creates a mini-app that can be mounted
- `router.use("/catemons", catemonRoutes)` — All routes in `catemonRoutes` are prefixed with `/catemons`
- In the main `index.js`, you only need: `app.use(routes)` to mount everything

### Adding More Resources Later

```javascript
const trainerRoutes = require("./trainerRoutes");
router.use("/trainers", trainerRoutes);
```

This keeps the main file clean and makes it easy to add new resources.

---

## Example API Requests

### Using curl

**GET all Catèmon:**
```bash
curl http://localhost:3000/catemons
```

**GET one Catèmon:**
```bash
curl http://localhost:3000/catemons/1
```

**POST create a Catèmon:**
```bash
curl -X POST http://localhost:3000/catemons \
  -H "Content-Type: application/json" \
  -d '{"id": 10, "name": "Whiskers", "type": "Normal", "personality": "curious", "description": "A curious tabby.", "imageUrl": "/images/card-10.png"}'
```

**PUT update a Catèmon:**
```bash
curl -X PUT http://localhost:3000/catemons/1 \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "name": "Shadow", "type": "Dark", "personality": "bully", "description": "Updated description.", "imageUrl": "/images/card-1.png"}'
```

**DELETE a Catèmon:**
```bash
curl -X DELETE http://localhost:3000/catemons/1
```

### Using Postman

1. Create a new request
2. Set the method (GET, POST, PUT, DELETE)
3. Enter the URL (e.g., `http://localhost:3000/catemons`)
4. For POST and PUT: go to Body → raw → JSON, and enter your JSON
5. Click Send

---

## Quick Reference

| Method | URL | Action |
|--------|-----|--------|
| GET | `/catemons` | Get all Catèmon |
| GET | `/catemons/1` | Get Catèmon with ID 1 |
| POST | `/catemons` | Create new Catèmon |
| PUT | `/catemons/1` | Update Catèmon with ID 1 |
| DELETE | `/catemons/1` | Delete Catèmon with ID 1 |

---

Happy coding! 🐱⚡
