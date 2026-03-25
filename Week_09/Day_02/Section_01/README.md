# Week 9 · Day 2 · Section 1 — Trainer Quest (full stack)

Pokémon-inspired trainer app: **Vite + React** frontend, **Express** API, **Supabase** (Auth + Postgres), **React Context** state, **React Toastify** notifications, and a **PokéAPI seed** script.

## Prerequisites

- Node.js 18+ (global `fetch`)
- A [Supabase](https://supabase.com/) project (URL, anon key, service role key)

## 1. Supabase setup

1. Create a project and open **SQL Editor**.
2. Run the script in `backend/db/schema.sql` to create `pokemon`, `user_pokemon`, and `catch_history`.
3. Under **Authentication → Providers**, enable **Email** (for local learning, you can disable “Confirm email” so sign-in works immediately).

## 2. Backend

```bash
cd backend
cp .env.example .env
# Fill SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, PORT=4000
npm install
npm run seed    # Fetches generations 1 Pokémon (IDs 1–151) from PokéAPI into Supabase
npm run dev     # http://localhost:4000
```

Health check: `GET http://localhost:4000/health`

### API base path

All JSON routes are under **`/api`**:

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/auth/signup` | No |
| POST | `/api/auth/login` | No |
| POST | `/api/auth/logout` | No |
| GET | `/api/zones` | No |
| GET | `/api/pokemon` | No (species catalog) |
| GET | `/api/pokemon/dashboard` | Yes |
| GET | `/api/pokemon/find?zone=forest` | Yes |
| POST | `/api/pokemon/catch` | Yes |
| GET | `/api/pokemon/team` | Yes |
| PATCH | `/api/pokemon/team` | Yes |
| GET | `/api/pokemon/box` | Yes |
| PATCH | `/api/pokemon/box` | Yes |
| GET | `/api/pokemon/history` | Yes |

Send `Authorization: Bearer <access_token>` for protected routes (token comes from login/signup).

**PATCH `/api/pokemon/team` body (one of):**

- `{ "promote_user_pokemon_id": "<uuid>" }` — box → team (if space)
- `{ "demote_user_pokemon_id": "<uuid>" }` — team → box

**PATCH `/api/pokemon/box` body:**

- `{ "promote_user_pokemon_id": "<uuid>" }` — same as promoting from box

**POST `/api/pokemon/catch` body:**

```json
{
  "pokeapi_id": 25,
  "zone": "forest",
  "learned_moves": ["quick-attack"],
  "stats_snapshot": { "hp": 35 },
  "force_box": false
}
```

## 3. Frontend

The browser talks **only to your Express API** (JSON + `Authorization` header). Supabase stays on the **backend**; the frontend does not need Supabase env vars.

```bash
cd frontend
cp .env.example .env
# VITE_API_URL=/api  (default; Vite proxies /api → localhost:4000 in dev)
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## 4. Project layout

- `backend/` — Express app (`routes/`, `controllers/`, `services/`, `middleware/`, `utils/`, `db/`, `seed/`)
- `frontend/src/` — `pages/`, `components/`, `context/`, `hooks/`, `services/`, `constants/`, `utils/`, `layouts/`

## 5. Game rules (implemented)

- Up to **6** Pokémon on the **team**; extras go to the **Professor’s Box**.
- **Find** page: choose a **zone**; encounters prefer types that match that biome (see `backend/config/zones.js`).
- If the party is full, **Catch** opens a **Toastify** prompt to confirm sending the new catch to the box.

Enjoy extending zones, rarity weights, or new pages on top of this baseline.
