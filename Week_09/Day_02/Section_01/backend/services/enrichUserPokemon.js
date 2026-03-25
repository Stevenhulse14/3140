/**
 * Joins `user_pokemon` rows with base `pokemon` rows by pokeapi_id.
 *
 * PostgREST embeds (`select('*, pokemon(*)')`) depend on FK naming; this helper
 * keeps responses predictable: each user row gets a `pokemon` object with
 * sprite, types, base stats, etc.
 */
import { getSupabaseAdmin } from '../utils/supabase.js'

export async function enrichWithPokemon(rows) {
  if (!rows?.length) return []
  const ids = [...new Set(rows.map((r) => r.pokeapi_id))]
  const supabase = getSupabaseAdmin()
  const { data: mons, error } = await supabase
    .from('pokemon')
    .select('*')
    .in('pokeapi_id', ids)
  if (error) throw Object.assign(new Error(error.message), { status: 500 })
  const byId = Object.fromEntries((mons || []).map((p) => [p.pokeapi_id, p]))
  return rows.map((r) => ({
    ...r,
    pokemon: byId[r.pokeapi_id] || null,
  }))
}
