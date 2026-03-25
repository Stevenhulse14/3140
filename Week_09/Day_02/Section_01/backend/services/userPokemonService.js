/**
 * Per-user Pokémon ownership: team (max 6), box, catch history, and moves.
 *
 * Data model (see db/schema.sql):
 * - `user_pokemon` — one row per caught instance; links auth user → species via
 *   pokeapi_id; `current_location` is `team` or `box`; `team_slot` is 1–6 or null.
 * - `catch_history` — append-only log for dashboard / analytics.
 *
 * All queries scope by user_id from the verified JWT (never trust client id).
 */
import { getSupabaseAdmin } from '../utils/supabase.js'
import { enrichWithPokemon } from './enrichUserPokemon.js'

const MAX_TEAM = 6

/** Count rows on active team (used before catch and before promote). */
export async function countTeam(userId) {
  const supabase = getSupabaseAdmin()
  const { count, error } = await supabase
    .from('user_pokemon')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('current_location', 'team')
  if (error) throw Object.assign(new Error(error.message), { status: 500 })
  return count ?? 0
}

/**
 * Finds the lowest free slot 1..6 for a new team member.
 * Uses existing team rows to avoid duplicate team_slot (DB unique index helps too).
 */
async function nextTeamSlot(userId) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('user_pokemon')
    .select('team_slot')
    .eq('user_id', userId)
    .eq('current_location', 'team')
  if (error) throw Object.assign(new Error(error.message), { status: 500 })
  const used = new Set((data || []).map((r) => r.team_slot).filter(Boolean))
  for (let s = 1; s <= MAX_TEAM; s++) {
    if (!used.has(s)) return s
  }
  return null
}

/**
 * Inserts a new caught Pokémon and a history row.
 *
 * Rules:
 * - If party already has 6, or `forceBox` is true → box (no team_slot).
 * - Else assign next free team_slot and set location `team`.
 *
 * Returns where it landed so the UI can toast appropriately.
 */
export async function catchPokemon({
  userId,
  pokeapiId,
  zoneKey,
  learnedMoves,
  statsSnapshot,
  forceBox = false,
}) {
  const supabase = getSupabaseAdmin()
  const teamCount = await countTeam(userId)
  let location = 'team'
  let teamSlot = null

  if (forceBox || teamCount >= MAX_TEAM) {
    location = 'box'
  } else {
    teamSlot = await nextTeamSlot(userId)
    if (!teamSlot) {
      location = 'box'
    }
  }

  const insertRow = {
    user_id: userId,
    pokeapi_id: pokeapiId,
    nickname: null,
    current_location: location,
    team_slot: teamSlot,
    learned_moves: learnedMoves || [],
    encounter_zone: zoneKey || null,
    stats_snapshot: statsSnapshot || {},
  }

  const { data: inserted, error: insErr } = await supabase
    .from('user_pokemon')
    .insert(insertRow)
    .select()
    .single()
  if (insErr) throw Object.assign(new Error(insErr.message), { status: 500 })

  const { error: histErr } = await supabase.from('catch_history').insert({
    user_id: userId,
    pokeapi_id: pokeapiId,
    zone: zoneKey || null,
    action: 'caught',
  })
  if (histErr) throw Object.assign(new Error(histErr.message), { status: 500 })

  return {
    userPokemon: inserted,
    addedTo: location,
    teamWasFull: teamCount >= MAX_TEAM && location === 'box',
  }
}

export async function listTeam(userId) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('user_pokemon')
    .select('*')
    .eq('user_id', userId)
    .eq('current_location', 'team')
    .order('team_slot', { ascending: true })
  if (error) throw Object.assign(new Error(error.message), { status: 500 })
  return enrichWithPokemon(data || [])
}

export async function listBox(userId) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('user_pokemon')
    .select('*')
    .eq('user_id', userId)
    .eq('current_location', 'box')
    .order('caught_at', { ascending: false })
  if (error) throw Object.assign(new Error(error.message), { status: 500 })
  return enrichWithPokemon(data || [])
}

export async function listHistory(userId, limit = 50) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('catch_history')
    .select('*')
    .eq('user_id', userId)
    .order('caught_at', { ascending: false })
    .limit(limit)
  if (error) throw Object.assign(new Error(error.message), { status: 500 })
  return data || []
}

/** Latest user_pokemon rows (any location) for “recent catches” widgets. */
export async function listRecentCatches(userId, limit = 5) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('user_pokemon')
    .select('*')
    .eq('user_id', userId)
    .order('caught_at', { ascending: false })
    .limit(limit)
  if (error) throw Object.assign(new Error(error.message), { status: 500 })
  return enrichWithPokemon(data || [])
}

export async function totalCaught(userId) {
  const supabase = getSupabaseAdmin()
  const { count, error } = await supabase
    .from('user_pokemon')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
  if (error) throw Object.assign(new Error(error.message), { status: 500 })
  return count ?? 0
}

/**
 * Box → team: requires an empty team slot and verifies ownership + location.
 */
export async function promoteFromBox(userId, userPokemonId) {
  const supabase = getSupabaseAdmin()
  const teamCount = await countTeam(userId)
  if (teamCount >= MAX_TEAM) {
    const err = new Error('Team is full (max 6). Send a Pokémon to the box first.')
    err.status = 400
    throw err
  }
  const { data: row, error: fetchErr } = await supabase
    .from('user_pokemon')
    .select('*')
    .eq('id', userPokemonId)
    .eq('user_id', userId)
    .single()
  if (fetchErr || !row) {
    const err = new Error('Pokémon not found')
    err.status = 404
    throw err
  }
  if (row.current_location !== 'box') {
    const err = new Error('Pokémon is not in the box')
    err.status = 400
    throw err
  }
  const slot = await nextTeamSlot(userId)
  if (!slot) {
    const err = new Error('No team slot available')
    err.status = 400
    throw err
  }
  const { data: updated, error: upErr } = await supabase
    .from('user_pokemon')
    .update({ current_location: 'team', team_slot: slot })
    .eq('id', userPokemonId)
    .eq('user_id', userId)
    .select()
    .single()
  if (upErr) throw Object.assign(new Error(upErr.message), { status: 500 })
  return updated
}

/** Team → box: clears team_slot so the slot can be reused. */
export async function demoteToBox(userId, userPokemonId) {
  const supabase = getSupabaseAdmin()
  const { data: row, error: fetchErr } = await supabase
    .from('user_pokemon')
    .select('*')
    .eq('id', userPokemonId)
    .eq('user_id', userId)
    .single()
  if (fetchErr || !row) {
    const err = new Error('Pokémon not found')
    err.status = 404
    throw err
  }
  if (row.current_location !== 'team') {
    const err = new Error('Pokémon is not on your team')
    err.status = 400
    throw err
  }
  const { data: updated, error: upErr } = await supabase
    .from('user_pokemon')
    .update({ current_location: 'box', team_slot: null })
    .eq('id', userPokemonId)
    .eq('user_id', userId)
    .select()
    .single()
  if (upErr) throw Object.assign(new Error(upErr.message), { status: 500 })
  return updated
}
