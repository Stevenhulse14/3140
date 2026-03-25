import { getSupabaseAdmin } from '../utils/supabase.js'

let cache = null
let cacheAt = 0
const TTL_MS = 60_000

export async function getAllPokemonRows() {
  const now = Date.now()
  if (cache && now - cacheAt < TTL_MS) return cache
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase.from('pokemon').select('*')
  if (error) throw Object.assign(new Error(error.message), { status: 500 })
  cache = data || []
  cacheAt = now
  return cache
}

export function invalidatePokemonCache() {
  cache = null
  cacheAt = 0
}

export function pokemonMatchesZoneTypes(row, zoneTypes) {
  const types = (row.types || []).map((t) => String(t).toLowerCase())
  return types.some((t) => zoneTypes.includes(t))
}

export function pickRandom(arr) {
  if (!arr.length) return null
  return arr[Math.floor(Math.random() * arr.length)]
}
