import { getSupabaseAdmin } from '../utils/supabase.js'
import { enrichWithPokemon } from './enrichUserPokemon.js'

const MAX_TEAM = 6

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
