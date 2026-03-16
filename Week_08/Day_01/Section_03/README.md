# REST API Assignment: Plant Care Tracker 🌱

Build a **REST API** that manages a **Plant Care Tracker**—a collection of houseplants with watering schedules, light requirements, and care notes. You'll implement **full CRUD operations** and **interesting queries** across three different database options.

---

## Table of Contents

1. [Learning Objectives](#learning-objectives)
2. [REST API Fundamentals](#rest-api-fundamentals)
3. [The Domain: Plant Care Tracker](#the-domain-plant-care-tracker)
4. [Data Generation](#data-generation)
5. [Required Endpoints](#required-endpoints)
6. [Project Structure & Setup](#project-structure--setup)
7. [Option 1: In-Memory Storage (Complete Guide)](#option-1-in-memory-storage-complete-guide)
8. [Option 2: PostgreSQL (Complete Guide)](#option-2-postgresql-complete-guide)
9. [Option 3: Supabase (Complete Guide)](#option-3-supabase-complete-guide)
10. [Step-by-Step Assignment Walkthrough](#step-by-step-assignment-walkthrough)
11. [Testing Your API](#testing-your-api)
12. [Troubleshooting](#troubleshooting)
13. [Submission Checklist](#submission-checklist)

---

## Learning Objectives

By the end of this assignment, you will be able to:

- **Design** a RESTful API with proper HTTP methods and status codes
- **Implement** full CRUD operations (Create, Read, Update, Delete)
- **Connect** an API to different data storage backends (in-memory, PostgreSQL, Supabase)
- **Write** meaningful queries to filter, search, and aggregate data
- **Handle** errors and edge cases appropriately
- **Test** your API using industry-standard tools

---

## REST API Fundamentals

Before diving in, understand these core concepts.

### What is REST?

**REST** (Representational State Transfer) is an architectural style for designing networked applications. Your API exposes **resources** (in this case, plants) as URLs. Clients interact with those resources using **HTTP methods**:

| Method   | Purpose                    | Idempotent? | Example                    |
|----------|----------------------------|-------------|----------------------------|
| `GET`    | Retrieve data              | Yes         | Get all plants             |
| `POST`   | Create new resource        | No          | Add a new plant            |
| `PUT`    | Replace entire resource    | Yes         | Replace a plant completely |
| `PATCH`  | Partially update resource  | Yes         | Update only the notes      |
| `DELETE` | Remove resource            | Yes         | Delete a plant             |

### HTTP Status Codes You'll Use

| Code | Meaning              | When to Use                                      |
|------|----------------------|--------------------------------------------------|
| 200  | OK                   | Successful GET, PUT, PATCH, DELETE               |
| 201  | Created              | Successful POST (resource was created)           |
| 400  | Bad Request          | Invalid JSON, missing required fields           |
| 404  | Not Found            | Plant with given ID doesn't exist                |
| 500  | Internal Server Error| Database error, unexpected crash                 |

### Request & Response Format

- **Request body:** Always send JSON with `Content-Type: application/json`
- **Response body:** Always return JSON
- **IDs:** Use in the URL path (e.g., `/plants/123`), not in the query string

---

## The Domain: Plant Care Tracker

Your API will manage **plants** with the following properties:

| Field              | Type   | Required | Description                                      |
|--------------------|--------|----------|--------------------------------------------------|
| `id`               | string/number | Auto-generated | Unique identifier (don't send on POST)   |
| `name`             | string | Yes      | Plant name (e.g., "Monstera Deliciosa")         |
| `species`          | string | No       | Botanical species                                |
| `wateringFrequency`| string | Yes      | "daily", "weekly", "bi-weekly", "monthly"        |
| `lightRequirement` | string | Yes      | "low", "medium", "bright", "direct"              |
| `lastWatered`      | string | Yes      | ISO date (YYYY-MM-DD, e.g., "2025-03-10")       |
| `notes`            | string | No       | Optional care notes                              |

### API Response Format (camelCase)

Your API should return data in **camelCase** to match JavaScript conventions:

```json
{
  "id": 1,
  "name": "Monstera Deliciosa",
  "species": "Monstera deliciosa",
  "wateringFrequency": "weekly",
  "lightRequirement": "medium",
  "lastWatered": "2025-03-10",
  "notes": "Loves humidity, mist occasionally"
}
```

### Database Column Names (snake_case)

PostgreSQL and Supabase use **snake_case** by convention. You'll need to **transform** between camelCase (API) and snake_case (database) when using Options 2 or 3.

---

## Data Generation

**Generate your data however you can.** The goal is to have 10–20 plants in your system for testing queries. Here are several approaches:

### Method A: JSON Seed File

Create `data/plants.json`:

```json
[
  {
    "name": "Monstera Deliciosa",
    "species": "Monstera deliciosa",
    "wateringFrequency": "weekly",
    "lightRequirement": "medium",
    "lastWatered": "2025-03-01",
    "notes": "Loves humidity, mist occasionally"
  },
  {
    "name": "Pothos",
    "species": "Epipremnum aureum",
    "wateringFrequency": "weekly",
    "lightRequirement": "low",
    "lastWatered": "2025-03-15",
    "notes": "Easy beginner plant, very forgiving"
  },
  {
    "name": "Snake Plant",
    "species": "Dracaena trifasciata",
    "wateringFrequency": "monthly",
    "lightRequirement": "low",
    "lastWatered": "2025-03-01",
    "notes": "Thrives on neglect"
  }
]
```

Load it in your app: `const plants = require('./data/plants.json');`

### Method B: Seed Script

Create `scripts/seed.js` that POSTs plants to your running API, or directly inserts into your in-memory array / database.

### Method C: AI-Generated Data

Prompt for ChatGPT: *"Give me 15 houseplants with name, species, watering frequency (weekly/monthly/etc), light requirement (low/medium/bright), and a lastWatered date. Format as JSON array."*

### Method D: Manual Entry via API

Use Postman or curl to POST plants one at a time. Good for understanding the flow, but slower.

### Full Seed Data (Copy-Paste Ready)

Here's a complete array you can use for in-memory or adapt for seeding:

```json
[
  {"name":"Monstera Deliciosa","species":"Monstera deliciosa","wateringFrequency":"weekly","lightRequirement":"medium","lastWatered":"2025-03-01","notes":"Loves humidity"},
  {"name":"Pothos","species":"Epipremnum aureum","wateringFrequency":"weekly","lightRequirement":"low","lastWatered":"2025-03-15","notes":"Easy beginner plant"},
  {"name":"Snake Plant","species":"Dracaena trifasciata","wateringFrequency":"monthly","lightRequirement":"low","lastWatered":"2025-03-01","notes":"Thrives on neglect"},
  {"name":"Fiddle Leaf Fig","species":"Ficus lyrata","wateringFrequency":"weekly","lightRequirement":"bright","lastWatered":"2025-03-10","notes":"Dramatic, needs consistency"},
  {"name":"ZZ Plant","species":"Zamioculcas zamiifolia","wateringFrequency":"bi-weekly","lightRequirement":"low","lastWatered":"2025-03-05","notes":"Nearly indestructible"},
  {"name":"Peace Lily","species":"Spathiphyllum","wateringFrequency":"weekly","lightRequirement":"low","lastWatered":"2025-03-12","notes":"Droops when thirsty"},
  {"name":"Spider Plant","species":"Chlorophytum comosum","wateringFrequency":"weekly","lightRequirement":"medium","lastWatered":"2025-03-14","notes":"Produces baby plantlets"},
  {"name":"Rubber Plant","species":"Ficus elastica","wateringFrequency":"weekly","lightRequirement":"medium","lastWatered":"2025-03-08","notes":"Wipe leaves for shine"},
  {"name":"Aloe Vera","species":"Aloe vera","wateringFrequency":"bi-weekly","lightRequirement":"bright","lastWatered":"2025-03-01","notes":"Succulent, good for burns"},
  {"name":"Philodendron Brasil","species":"Philodendron hederaceum","wateringFrequency":"weekly","lightRequirement":"medium","lastWatered":"2025-03-11","notes":"Variegated, trailing"}
]
```

---

## Required Endpoints

### Full CRUD

| Method  | Endpoint       | Description                          | Success Code |
|---------|----------------|--------------------------------------|--------------|
| `GET`   | `/plants`      | Get all plants (supports query params) | 200        |
| `GET`   | `/plants/:id`  | Get a single plant by ID             | 200 or 404   |
| `POST`  | `/plants`      | Create a new plant                   | 201          |
| `PUT`   | `/plants/:id`  | Replace entire plant                 | 200 or 404   |
| `PATCH` | `/plants/:id`  | Partially update a plant             | 200 or 404   |
| `DELETE`| `/plants/:id`  | Delete a plant                       | 200 or 404   |

### Query Endpoints

| Method | Endpoint                    | Description                                                    |
|--------|-----------------------------|----------------------------------------------------------------|
| `GET`  | `/plants?watering=weekly`   | Filter plants by watering frequency                            |
| `GET`  | `/plants?light=low`         | Filter plants by light requirement                             |
| `GET`  | `/plants/needs-watering`    | Plants not watered in 7+ days (based on `lastWatered`)         |
| `GET`  | `/plants/stats`             | Aggregate: count by species, by light, by watering frequency   |

### ⚠️ Route Ordering (Critical)

Express matches routes in order. **Define `/plants/needs-watering` and `/plants/stats` BEFORE `/plants/:id`**, or Express will treat `"needs-watering"` as an ID and return 404.

```javascript
// ✅ Correct order
app.get('/plants', ...);
app.get('/plants/needs-watering', ...);  // Before :id
app.get('/plants/stats', ...);           // Before :id
app.get('/plants/:id', ...);
```

---

## Project Structure & Setup

### Recommended Folder Structure

```
plant-api/
├── app.js              # or server.js - main Express app
├── package.json
├── .env                 # For Supabase/PostgreSQL credentials (never commit!)
├── .gitignore           # Include node_modules, .env
├── data/
│   └── plants.json      # Optional: seed data
├── scripts/
│   └── seed.js          # Optional: seed script
└── README.md
```

### Initial Setup (All Options)

```bash
# Create project folder
mkdir plant-api
cd plant-api

# Initialize Node project
npm init -y

# Install Express (required for all options)
npm install express

# Install database driver (choose one)
npm install pg                    # For PostgreSQL
# OR
npm install @supabase/supabase-js # For Supabase

# Optional: dotenv for environment variables
npm install dotenv
```

### Add to `.gitignore`

```
node_modules/
.env
*.log
```

---

## Option 1: In-Memory Storage (Complete Guide)

**Best for:** Quick prototyping, no setup, learning the API structure first.

**Time estimate:** 2–3 hours for full implementation

### Step 1.1: Create the Base Server

Create `app.js`:

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: parse JSON request bodies
app.use(express.json());

// In-memory storage
let plants = [];
let nextId = 1;

// TODO: Add routes here

app.listen(PORT, () => {
  console.log(`Plant API running at http://localhost:${PORT}`);
});
```

### Step 1.2: Load Seed Data (Optional)

Either load from a file:

```javascript
const fs = require('fs');
const seedData = JSON.parse(fs.readFileSync('./data/plants.json', 'utf8'));
plants = seedData.map((p, i) => ({ ...p, id: i + 1 }));
nextId = plants.length + 1;
```

Or hardcode a few plants to start:

```javascript
plants = [
  { id: 1, name: "Pothos", species: "Epipremnum aureum", wateringFrequency: "weekly", lightRequirement: "low", lastWatered: "2025-03-10", notes: "Easy plant" }
];
nextId = 2;
```

### Step 1.3: Implement GET /plants (with filtering)

```javascript
app.get('/plants', (req, res) => {
  let result = [...plants];

  // Filter by watering frequency: ?watering=weekly
  const watering = req.query.watering;
  if (watering) {
    result = result.filter(p => p.wateringFrequency === watering);
  }

  // Filter by light: ?light=low
  const light = req.query.light;
  if (light) {
    result = result.filter(p => p.lightRequirement === light);
  }

  res.json(result);
});
```

### Step 1.4: Implement GET /plants/needs-watering (BEFORE /plants/:id)

```javascript
app.get('/plants/needs-watering', (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const needsWatering = plants.filter(p => {
    const lastWatered = new Date(p.lastWatered);
    lastWatered.setHours(0, 0, 0, 0);
    const daysSince = Math.floor((today - lastWatered) / (1000 * 60 * 60 * 24));
    return daysSince >= 7;
  });

  res.json(needsWatering);
});
```

### Step 1.5: Implement GET /plants/stats

```javascript
app.get('/plants/stats', (req, res) => {
  const byWatering = {};
  const byLight = {};
  const bySpecies = {};

  plants.forEach(p => {
    byWatering[p.wateringFrequency] = (byWatering[p.wateringFrequency] || 0) + 1;
    byLight[p.lightRequirement] = (byLight[p.lightRequirement] || 0) + 1;
    bySpecies[p.species || 'Unknown'] = (bySpecies[p.species || 'Unknown'] || 0) + 1;
  });

  res.json({
    total: plants.length,
    byWateringFrequency: byWatering,
    byLightRequirement: byLight,
    bySpecies: bySpecies
  });
});
```

### Step 1.6: Implement GET /plants/:id

```javascript
app.get('/plants/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const plant = plants.find(p => p.id === id);

  if (!plant) {
    return res.status(404).json({ error: 'Plant not found' });
  }

  res.json(plant);
});
```

### Step 1.7: Implement POST /plants

```javascript
app.post('/plants', (req, res) => {
  const { name, species, wateringFrequency, lightRequirement, lastWatered, notes } = req.body;

  // Basic validation
  if (!name || !wateringFrequency || !lightRequirement || !lastWatered) {
    return res.status(400).json({
      error: 'Missing required fields: name, wateringFrequency, lightRequirement, lastWatered'
    });
  }

  const newPlant = {
    id: nextId++,
    name,
    species: species || null,
    wateringFrequency,
    lightRequirement,
    lastWatered,
    notes: notes || null
  };

  plants.push(newPlant);
  res.status(201).json(newPlant);
});
```

### Step 1.8: Implement PUT /plants/:id

```javascript
app.put('/plants/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = plants.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Plant not found' });
  }

  const { name, species, wateringFrequency, lightRequirement, lastWatered, notes } = req.body;
  if (!name || !wateringFrequency || !lightRequirement || !lastWatered) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  plants[index] = { id, name, species: species || null, wateringFrequency, lightRequirement, lastWatered, notes: notes || null };
  res.json(plants[index]);
});
```

### Step 1.9: Implement PATCH /plants/:id

```javascript
app.patch('/plants/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const plant = plants.find(p => p.id === id);

  if (!plant) {
    return res.status(404).json({ error: 'Plant not found' });
  }

  const updates = req.body;
  const allowed = ['name', 'species', 'wateringFrequency', 'lightRequirement', 'lastWatered', 'notes'];
  allowed.forEach(key => {
    if (updates[key] !== undefined) {
      plant[key] = updates[key];
    }
  });

  res.json(plant);
});
```

### Step 1.10: Implement DELETE /plants/:id

```javascript
app.delete('/plants/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = plants.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Plant not found' });
  }

  plants.splice(index, 1);
  res.status(200).json({ message: 'Plant deleted' });
});
```

### In-Memory Pros & Cons

- ✅ No setup, works immediately
- ✅ Easy to debug (inspect `plants` array)
- ❌ Data lost on server restart
- ❌ Not suitable for production

---

## Option 2: PostgreSQL (Complete Guide)

**Best for:** Learning SQL, real databases, production-style setup.

**Time estimate:** 4–5 hours including PostgreSQL setup

### Step 2.1: Install PostgreSQL

- **macOS:** `brew install postgresql@15` then `brew services start postgresql@15`
- **Windows:** Download installer from [postgresql.org](https://www.postgresql.org/download/windows/)
- **Linux (Ubuntu/Debian):** `sudo apt update && sudo apt install postgresql postgresql-contrib`

Verify: `psql --version`

### Step 2.2: Create Database and Table

Open a terminal and run:

```bash
# Connect to PostgreSQL (default user is often 'postgres' or your system username)
psql -U postgres

# Or on macOS with Homebrew:
psql postgres
```

In the `psql` prompt:

```sql
-- Create database
CREATE DATABASE plant_tracker;

-- Connect to it
\c plant_tracker

-- Create table (snake_case for columns)
CREATE TABLE plants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  species VARCHAR(255),
  watering_frequency VARCHAR(50) NOT NULL,
  light_requirement VARCHAR(50) NOT NULL,
  last_watered DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Verify
\dt
```

### Step 2.3: Helper to Convert snake_case ↔ camelCase

Add this to your `app.js`:

```javascript
function toCamelCase(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    species: row.species,
    wateringFrequency: row.watering_frequency,
    lightRequirement: row.light_requirement,
    lastWatered: row.last_watered ? row.last_watered.toISOString().split('T')[0] : null,
    notes: row.notes
  };
}

function toSnakeCase(obj) {
  return {
    name: obj.name,
    species: obj.species || null,
    watering_frequency: obj.wateringFrequency,
    light_requirement: obj.lightRequirement,
    last_watered: obj.lastWatered,
    notes: obj.notes || null
  };
}
```

### Step 2.4: Set Up Connection Pool

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'plant_tracker',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',  // Change for your setup
  port: process.env.PGPORT || 5432
});

// Test connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Database connected:', res.rows[0].now);
});
```

### Step 2.5: Implement Endpoints with SQL

**GET /plants (with filters):**

```javascript
app.get('/plants', async (req, res) => {
  try {
    let query = 'SELECT * FROM plants WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (req.query.watering) {
      query += ` AND watering_frequency = $${paramIndex++}`;
      params.push(req.query.watering);
    }
    if (req.query.light) {
      query += ` AND light_requirement = $${paramIndex++}`;
      params.push(req.query.light);
    }
    query += ' ORDER BY id';

    const result = await pool.query(query, params);
    res.json(result.rows.map(toCamelCase));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});
```

**GET /plants/needs-watering:**

```javascript
app.get('/plants/needs-watering', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM plants WHERE last_watered <= CURRENT_DATE - INTERVAL '7 days' ORDER BY last_watered`
    );
    res.json(result.rows.map(toCamelCase));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});
```

**GET /plants/stats:**

```javascript
app.get('/plants/stats', async (req, res) => {
  try {
    const [total, byWatering, byLight, bySpecies] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM plants'),
      pool.query('SELECT watering_frequency, COUNT(*) as count FROM plants GROUP BY watering_frequency'),
      pool.query('SELECT light_requirement, COUNT(*) as count FROM plants GROUP BY light_requirement'),
      pool.query('SELECT COALESCE(species, \'Unknown\') as species, COUNT(*) as count FROM plants GROUP BY species')
    ]);

    res.json({
      total: parseInt(total.rows[0].count, 10),
      byWateringFrequency: Object.fromEntries(byWatering.rows.map(r => [r.watering_frequency, parseInt(r.count, 10)])),
      byLightRequirement: Object.fromEntries(byLight.rows.map(r => [r.light_requirement, parseInt(r.count, 10)])),
      bySpecies: Object.fromEntries(bySpecies.rows.map(r => [r.species, parseInt(r.count, 10)]))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});
```

**GET /plants/:id:**

```javascript
app.get('/plants/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM plants WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(toCamelCase(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});
```

**POST /plants:**

```javascript
app.post('/plants', async (req, res) => {
  const { name, wateringFrequency, lightRequirement, lastWatered } = req.body;
  if (!name || !wateringFrequency || !lightRequirement || !lastWatered) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const snake = toSnakeCase(req.body);
    const result = await pool.query(
      `INSERT INTO plants (name, species, watering_frequency, light_requirement, last_watered, notes)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [snake.name, snake.species, snake.watering_frequency, snake.light_requirement, snake.last_watered, snake.notes]
    );
    res.status(201).json(toCamelCase(result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});
```

**PUT /plants/:id** and **PATCH /plants/:id** and **DELETE /plants/:id** follow similar patterns—use `UPDATE` and `DELETE` SQL with `WHERE id = $1`.

### Step 2.6: Seed PostgreSQL

Create `scripts/seed-psql.js`:

```javascript
const { Pool } = require('pg');
const plants = require('../data/plants.json');  // or inline the array

const pool = new Pool({ database: 'plant_tracker', user: 'postgres', password: 'postgres' });

async function seed() {
  for (const p of plants) {
    await pool.query(
      `INSERT INTO plants (name, species, watering_frequency, light_requirement, last_watered, notes)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [p.name, p.species, p.wateringFrequency, p.lightRequirement, p.lastWatered, p.notes || null]
    );
  }
  console.log(`Seeded ${plants.length} plants`);
  process.exit(0);
}
seed().catch(err => { console.error(err); process.exit(1); });
```

Run: `node scripts/seed-psql.js`

### PostgreSQL Pros & Cons

- ✅ Real database, persistent data
- ✅ SQL practice, powerful queries
- ❌ Requires PostgreSQL installed
- ❌ More setup and configuration

---

## Option 3: Supabase (Complete Guide)

**Best for:** Cloud-hosted, no local DB, free tier.

**Time estimate:** 3–4 hours

### Step 3.1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free).
2. Click **New Project**.
3. Choose organization, name the project (e.g., `plant-tracker`), set a database password, select region.
4. Wait for the project to be created.

### Step 3.2: Create the Table

1. In the Supabase dashboard, go to **SQL Editor**.
2. Run:

```sql
CREATE TABLE plants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT,
  watering_frequency TEXT NOT NULL,
  light_requirement TEXT NOT NULL,
  last_watered DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional, for production)
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;

-- Allow all operations for anon key (simplified for learning)
CREATE POLICY "Allow all for anon" ON plants FOR ALL USING (true) WITH CHECK (true);
```

### Step 3.3: Get API Credentials

1. Go to **Project Settings** (gear icon) → **API**.
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (long string)

### Step 3.4: Set Up Environment Variables

Create `.env`:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

In `app.js`:

```javascript
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
```

### Step 3.5: Helper Functions (same as PostgreSQL)

Use the same `toCamelCase` and `toSnakeCase` helpers from Option 2.

### Step 3.6: Implement Endpoints with Supabase Client

**GET /plants:**

```javascript
app.get('/plants', async (req, res) => {
  try {
    let query = supabase.from('plants').select('*');

    if (req.query.watering) {
      query = query.eq('watering_frequency', req.query.watering);
    }
    if (req.query.light) {
      query = query.eq('light_requirement', req.query.light);
    }

    const { data, error } = await query.order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data.map(toCamelCase));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
```

**GET /plants/needs-watering:**

```javascript
app.get('/plants/needs-watering', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const dateStr = sevenDaysAgo.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .lte('last_watered', dateStr)
      .order('last_watered', { ascending: true });

    if (error) throw error;
    res.json(data.map(toCamelCase));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
```

**GET /plants/stats:** (Supabase doesn't have built-in GROUP BY in the client; you can use a raw SQL RPC or compute in JavaScript from a full select. For simplicity, fetch all and aggregate in Node—or create a Supabase database function.)

```javascript
app.get('/plants/stats', async (req, res) => {
  try {
    const { data: plants, error } = await supabase.from('plants').select('*');
    if (error) throw error;

    const byWatering = {}, byLight = {}, bySpecies = {};
    plants.forEach(p => {
      byWatering[p.watering_frequency] = (byWatering[p.watering_frequency] || 0) + 1;
      byLight[p.light_requirement] = (byLight[p.light_requirement] || 0) + 1;
      bySpecies[p.species || 'Unknown'] = (bySpecies[p.species || 'Unknown'] || 0) + 1;
    });

    res.json({
      total: plants.length,
      byWateringFrequency: byWatering,
      byLightRequirement: byLight,
      bySpecies: bySpecies
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
```

**GET /plants/:id:**

```javascript
app.get('/plants/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('plants').select('*').eq('id', req.params.id).single();
    if (error || !data) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(toCamelCase(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
```

**POST /plants:**

```javascript
app.post('/plants', async (req, res) => {
  const { name, wateringFrequency, lightRequirement, lastWatered } = req.body;
  if (!name || !wateringFrequency || !lightRequirement || !lastWatered) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await supabase.from('plants').insert(toSnakeCase(req.body)).select().single();
    if (error) throw error;
    res.status(201).json(toCamelCase(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
```

**PUT, PATCH, DELETE** use `.update()` and `.delete()` with `.eq('id', req.params.id)`.

### Supabase Pros & Cons

- ✅ No local database
- ✅ Free tier, cloud-hosted
- ✅ Built-in REST API (you can call it directly for extra credit)
- ❌ Requires internet; slight latency

---

## Step-by-Step Assignment Walkthrough

### Phase 1: Setup (15–20 min)

1. Create project folder and run `npm init -y`.
2. Install Express and your chosen database driver.
3. Create `app.js` with basic Express server and `express.json()` middleware.
4. Add `.gitignore` with `node_modules` and `.env`.

### Phase 2: Data Layer (20–30 min)

1. **In-Memory:** Create `plants` array and optionally load from JSON.
2. **PostgreSQL:** Create database, table, connection pool, and helper functions.
3. **Supabase:** Create project, table, client, and helper functions.

### Phase 3: CRUD Endpoints (60–90 min)

Implement in this order:

1. `GET /plants` — verify you can retrieve data.
2. `GET /plants/:id` — test with a known ID.
3. `POST /plants` — create one plant, then check with GET.
4. `PUT /plants/:id` — replace a plant.
5. `PATCH /plants/:id` — update only one field.
6. `DELETE /plants/:id` — delete and verify with GET.

### Phase 4: Query Endpoints (30–45 min)

1. Add `?watering` and `?light` filters to `GET /plants`.
2. Implement `GET /plants/needs-watering` (ensure route order is correct).
3. Implement `GET /plants/stats`.

### Phase 5: Data & Testing (30–45 min)

1. Seed 10–20 plants using your chosen method.
2. Test every endpoint with Postman or curl.
3. Fix any bugs and add basic error handling.

---

## Testing Your API

### Using curl

```bash
# GET all plants
curl http://localhost:3000/plants

# GET with filter
curl "http://localhost:3000/plants?watering=weekly"

# GET needs watering
curl http://localhost:3000/plants/needs-watering

# GET stats
curl http://localhost:3000/plants/stats

# POST create
curl -X POST http://localhost:3000/plants \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Plant","species":"Test","wateringFrequency":"weekly","lightRequirement":"low","lastWatered":"2025-03-15","notes":"Test"}'

# GET by ID (use actual ID from POST response)
curl http://localhost:3000/plants/1

# PATCH update
curl -X PATCH http://localhost:3000/plants/1 \
  -H "Content-Type: application/json" \
  -d '{"notes":"Updated notes"}'

# DELETE
curl -X DELETE http://localhost:3000/plants/1
```

### Using Postman or Thunder Client

1. Create a new request for each endpoint.
2. Set method (GET, POST, etc.) and URL.
3. For POST/PUT/PATCH: Body → raw → JSON, then add your JSON.
4. Save requests to a collection for reuse.

---

## Troubleshooting

### "Cannot GET /plants" or 404

- Ensure your server is running (`node app.js`).
- Check the URL (include `http://localhost:3000`).
- Verify the route is defined and spelled correctly.

### "Plant not found" for valid ID

- **Route order:** `/plants/needs-watering` must be defined before `/plants/:id`.
- **ID type:** In-memory uses numbers; PostgreSQL uses integers; Supabase uses UUIDs. Ensure you're passing the correct type.

### PostgreSQL: "connection refused"

- PostgreSQL may not be running: `brew services start postgresql` (macOS) or `sudo systemctl start postgresql` (Linux).
- Check port 5432: `lsof -i :5432`.
- Verify username/password in your Pool config.

### Supabase: "Invalid API key" or 401

- Ensure `.env` has correct `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
- Run `require('dotenv').config()` before creating the client.
- Never commit `.env` to git.

### CORS errors (when calling from a browser)

Add CORS middleware:

```bash
npm install cors
```

```javascript
const cors = require('cors');
app.use(cors());
```

### Request body is undefined

- Ensure `app.use(express.json())` is before your routes.
- Check that `Content-Type: application/json` is set in the request.

---

## Submission Checklist

- [ ] All 6 CRUD endpoints implemented and working
- [ ] At least 2 query endpoints (filters + needs-watering or stats)
- [ ] Data generated and loaded (10+ plants); describe your method in README
- [ ] API runs without errors
- [ ] README explains which option you used and how to run the project
- [ ] `.gitignore` includes `node_modules` and `.env`

---

## Bonus Ideas

- **Pagination:** `GET /plants?page=1&limit=10`
- **Validation:** Use a library like `joi` or `zod` to validate request bodies
- **Authentication:** API key or JWT for protected routes
- **Supabase REST:** Compare your custom API with Supabase's auto-generated REST API

---

Good luck! 🌿
