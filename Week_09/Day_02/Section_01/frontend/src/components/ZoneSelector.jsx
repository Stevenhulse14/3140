/**
 * Grid of biome tiles for the Find page.
 *
 * Each tile’s `key` must match backend zone keys (forest, cave, …).
 * CSS variables (--zone-gradient) hook into index.css for per-tile backgrounds.
 */
import { ZONE_LIST } from '../constants/zones.js'

export function ZoneSelector({ value, onChange, disabled }) {
  return (
    <div className="zone-grid" role="list">
      {ZONE_LIST.map((z) => {
        const active = value === z.key
        return (
          <button
            key={z.key}
            type="button"
            role="listitem"
            disabled={disabled}
            className={`zone-tile ${active ? 'zone-tile--active' : ''}`}
            style={{ '--zone-gradient': z.gradient }}
            onClick={() => onChange(z.key)}
          >
            <span className="zone-tile__icon" aria-hidden>
              {z.icon}
            </span>
            <span className="zone-tile__label">{z.label}</span>
            <span className="zone-tile__blurb">{z.blurb}</span>
          </button>
        )
      })}
    </div>
  )
}
