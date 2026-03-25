/**
 * PokéAPI uses hyphenated English names (e.g. "mr-mime"). This turns them into
 * Title Case words for display ("Mr Mime").
 */
export function formatPokemonName(name) {
  if (!name) return ''
  return String(name)
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
