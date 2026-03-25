/**
 * Zone configuration for encounter filtering.
 *
 * - `key` must match:
 *   - API query `GET /pokemon/find?zone=<key>`
 *   - Frontend zone tiles (constants/zones.js uses the same keys)
 * - `types` are PokéAPI type slugs (lowercase), matched against each row’s
 *   `types` array in the `pokemon` table after seeding.
 *
 * If no species match a zone, encounterService falls back to the full table
 * so the app still returns *something* after seeding.
 */
export const ZONES = {
  forest: {
    key: 'forest',
    label: 'Forest',
    types: ['grass', 'bug', 'flying', 'normal'],
  },
  cave: {
    key: 'cave',
    label: 'Cave',
    types: ['rock', 'ground', 'poison', 'dark'],
  },
  ocean: {
    key: 'ocean',
    label: 'Ocean',
    types: ['water', 'ice'],
  },
  mountain: {
    key: 'mountain',
    label: 'Mountain',
    types: ['rock', 'fighting', 'flying', 'ground'],
  },
  volcano: {
    key: 'volcano',
    label: 'Volcano',
    types: ['fire', 'rock', 'ground'],
  },
  plains: {
    key: 'plains',
    label: 'Plains',
    types: ['normal', 'electric', 'grass'],
  },
  swamp: {
    key: 'swamp',
    label: 'Swamp',
    types: ['poison', 'water', 'grass', 'dark'],
  },
  snow: {
    key: 'snow',
    label: 'Snow / Ice',
    types: ['ice', 'water'],
  },
  city: {
    key: 'city',
    label: 'City / Ruins',
    types: ['psychic', 'steel', 'ghost', 'electric'],
  },
}

export function getZone(zoneKey) {
  if (!zoneKey) return null
  const key = String(zoneKey).toLowerCase()
  return ZONES[key] ?? null
}

export function listZones() {
  return Object.values(ZONES)
}
