import { getZone } from '../config/zones.js'
import {
  getAllPokemonRows,
  pokemonMatchesZoneTypes,
  pickRandom,
} from './pokemonCatalogService.js'

export async function findEncounterForZone(zoneKey) {
  const zone = getZone(zoneKey)
  if (!zone) {
    const err = new Error('Unknown zone')
    err.status = 400
    throw err
  }
  const rows = await getAllPokemonRows()
  const allowed = rows.filter((r) =>
    pokemonMatchesZoneTypes(r, zone.types),
  )
  const pool = allowed.length ? allowed : rows
  const chosen = pickRandom(pool)
  if (!chosen) {
    const err = new Error('No Pokémon in database. Run npm run seed.')
    err.status = 503
    throw err
  }
  return {
    zone: { key: zone.key, label: zone.label },
    pokemon: formatEncounterPayload(chosen, zone.key),
  }
}

function formatEncounterPayload(row, zoneKey) {
  const moves = (row.moves || []).slice(0, 4)
  return {
    pokeapi_id: row.pokeapi_id,
    name: row.name,
    sprite_url: row.sprite_url,
    types: row.types || [],
    stats: row.stats || {},
    moves,
    encounter_zone: zoneKey,
  }
}
