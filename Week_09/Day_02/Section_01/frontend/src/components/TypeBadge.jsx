/**
 * Small pill showing a Pokémon type slug (e.g. "fire", "water").
 *
 * Colors follow common fandom/game-inspired hex values for quick recognition.
 * The API stores lowercase type names from PokéAPI — we normalize with toLowerCase().
 */
const TYPE_COLORS = {
  normal: '#a8a878',
  fire: '#f08030',
  water: '#6890f0',
  electric: '#f8d030',
  grass: '#78c850',
  ice: '#98d8d8',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#e0c068',
  flying: '#a890f0',
  psychic: '#f85888',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
  dragon: '#7038f8',
  dark: '#705848',
  steel: '#b8b8d0',
  fairy: '#ee99ac',
}

export function TypeBadge({ type }) {
  const t = String(type).toLowerCase()
  const bg = TYPE_COLORS[t] || '#8899aa'
  return (
    <span className="type-badge" style={{ background: bg }}>
      {t}
    </span>
  )
}
