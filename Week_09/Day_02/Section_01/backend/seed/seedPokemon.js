/**
 * One-shot seed: pulls public Pokémon data from PokéAPI and upserts into Supabase.
 *
 * Run from `backend/`: `npm run seed`
 * Requires: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env
 *
 * Why service role? Inserts bypass RLS; safe here because the script runs on your
 * machine only, not in the browser.
 *
 * Range START_ID..END_ID: Gen 1 (151) keeps the demo fast; extend END_ID to grow
 * the Pokédex (watch PokéAPI rate limits in production).
 */
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const POKEAPI = 'https://pokeapi.co/api/v2/pokemon'
const START_ID = 1
const END_ID = 151

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

async function fetchJson(u) {
  const res = await fetch(u)
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${u}`)
  return res.json()
}

/** PokéAPI stats array → { hp: 45, attack: 49, ... } keyed by stat slug. */
function mapStats(statsArr) {
  const o = {}
  for (const s of statsArr || []) {
    const name = s.stat?.name
    if (name) o[name] = s.base_stat
  }
  return o
}

/** Take first N move names from the nested moves list (level-up order in API). */
function mapMoves(movesArr) {
  return (movesArr || [])
    .slice(0, 8)
    .map((m) => m.move?.name)
    .filter(Boolean)
}

/** Upsert on pokeapi_id so re-running seed updates rows instead of duplicating. */
async function upsertPokemon(row) {
  const { error } = await supabase.from('pokemon').upsert(row, {
    onConflict: 'pokeapi_id',
  })
  if (error) throw error
}

async function main() {
  console.log(`Seeding Pokémon ${START_ID}–${END_ID} from PokéAPI…`)
  for (let id = START_ID; id <= END_ID; id++) {
    const data = await fetchJson(`${POKEAPI}/${id}`)
    // Sort by slot so primary type is first (matches games / Bulbapedia order).
    const types = (data.types || [])
      .sort((a, b) => a.slot - b.slot)
      .map((t) => t.type.name)
    const row = {
      pokeapi_id: data.id,
      name: data.name,
      sprite_url:
        data.sprites?.other?.['official-artwork']?.front_default ||
        data.sprites?.front_default ||
        null,
      types,
      stats: mapStats(data.stats),
      moves: mapMoves(data.moves),
    }
    await upsertPokemon(row)
    process.stdout.write(`\r  …${id}/${END_ID}`)
  }
  console.log('\nDone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
