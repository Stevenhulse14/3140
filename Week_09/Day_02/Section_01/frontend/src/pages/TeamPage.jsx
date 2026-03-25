import { useState } from 'react'
import { toast } from 'react-toastify'
import { apiFetch } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useTrainer } from '../context/TrainerContext.jsx'
import { TypeBadge } from '../components/TypeBadge.jsx'
import { formatPokemonName } from '../utils/format.js'
import { getZoneTheme } from '../constants/zones.js'

const STAT_LABELS = [
  ['hp', 'HP'],
  ['attack', 'Atk'],
  ['defense', 'Def'],
  ['special-attack', 'SpA'],
  ['special-defense', 'SpD'],
  ['speed', 'Spe'],
]

export function TeamPage() {
  const { token } = useAuth()
  const { team, loading, refresh } = useTrainer()
  const [busyId, setBusyId] = useState(null)

  async function sendToBox(userPokemonId) {
    if (!token) return
    setBusyId(userPokemonId)
    try {
      await apiFetch('/pokemon/team', {
        method: 'PATCH',
        token,
        body: { demote_user_pokemon_id: userPokemonId },
      })
      toast.info('Pokémon transferred to the Professor’s Box.')
      await refresh()
    } catch (e) {
      toast.error(e.message || 'Could not move Pokémon')
    } finally {
      setBusyId(null)
    }
  }

  if (loading && !team.length) {
    return (
      <div className="page-loading">
        <div className="pokeball-loader" aria-hidden />
        <p>Loading party…</p>
      </div>
    )
  }

  return (
    <div className="team-page">
      <header className="page-header">
        <h1>Your party</h1>
        <p>Up to six Pokémon follow you into battle. Moves shown are from capture.</p>
      </header>
      {team.length === 0 ? (
        <div className="empty-panel">
          <p>Your party is empty.</p>
        </div>
      ) : (
        <ul className="party-grid">
          {team.map((row, i) => {
            const p = row.pokemon
            const z = getZoneTheme(row.encounter_zone)
            const moves = row.learned_moves?.length ? row.learned_moves : p?.moves || []
            return (
              <li key={row.id} className="party-card">
                <div className="party-card__slot">Slot {row.team_slot ?? i + 1}</div>
                {p?.sprite_url && (
                  <img src={p.sprite_url} alt="" className="party-card__sprite" />
                )}
                <h2>{formatPokemonName(p?.name)}</h2>
                <div className="party-card__types">
                  {(p?.types || []).map((t) => (
                    <TypeBadge key={t} type={t} />
                  ))}
                </div>
                <p className="party-card__meta">
                  Caught in <strong>{z?.label ?? row.encounter_zone ?? '?'}</strong>
                </p>
                <div className="stat-grid stat-grid--compact">
                  {STAT_LABELS.map(([key, label]) => (
                    <div key={key} className="stat-pill">
                      <span>{label}</span>
                      <strong>
                        {row.stats_snapshot?.[key] ?? p?.stats?.[key] ?? '—'}
                      </strong>
                    </div>
                  ))}
                </div>
                <div className="moves-block moves-block--compact">
                  <h3>Attacks (at catch)</h3>
                  <ul>
                    {moves.slice(0, 4).map((m) => (
                      <li key={m}>{String(m).replace(/-/g, ' ')}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  disabled={busyId === row.id}
                  onClick={() => sendToBox(row.id)}
                >
                  Send to Box
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
