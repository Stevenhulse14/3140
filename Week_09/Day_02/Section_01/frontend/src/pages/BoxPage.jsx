import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { apiFetch } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useTrainer } from '../context/TrainerContext.jsx'
import { TypeBadge } from '../components/TypeBadge.jsx'
import { formatPokemonName } from '../utils/format.js'
import { getZoneTheme } from '../constants/zones.js'

export function BoxPage() {
  const { token } = useAuth()
  const { refresh, teamCount } = useTrainer()
  const [boxList, setBoxList] = useState([])
  const [boxLoading, setBoxLoading] = useState(true)
  const [detailId, setDetailId] = useState(null)
  const [busyId, setBusyId] = useState(null)

  const loadBox = useCallback(async () => {
    if (!token) return
    setBoxLoading(true)
    try {
      const data = await apiFetch('/pokemon/box', { token })
      setBoxList(data.box || [])
    } catch (e) {
      toast.error(e.message || 'Could not load box')
    } finally {
      setBoxLoading(false)
    }
  }, [token])

  useEffect(() => {
    loadBox()
  }, [loadBox])

  async function addToTeam(userPokemonId) {
    if (!token) return
    if (teamCount >= 6) {
      toast.warn('Your party is full. Send someone to the Box first.')
      return
    }
    setBusyId(userPokemonId)
    try {
      await apiFetch('/pokemon/box', {
        method: 'PATCH',
        token,
        body: { promote_user_pokemon_id: userPokemonId },
      })
      toast.success('Pokémon added to your party!')
      await refresh()
      await loadBox()
    } catch (e) {
      toast.error(e.message || 'Could not move to team')
    } finally {
      setBusyId(null)
    }
  }

  if (boxLoading) {
    return (
      <div className="page-loading">
        <div className="pokeball-loader" aria-hidden />
        <p>Opening storage…</p>
      </div>
    )
  }

  return (
    <div className="box-page">
      <header className="page-header">
        <h1>Professor&apos;s Pokémon Box</h1>
        <p>Extra catches stay here until you make room on your team.</p>
      </header>
      {boxList.length === 0 ? (
        <div className="empty-panel">
          <p>No Pokémon in storage. Catch more on the Find page!</p>
        </div>
      ) : (
        <ul className="box-grid">
          {boxList.map((row) => {
            const p = row.pokemon
            const z = getZoneTheme(row.encounter_zone)
            const open = detailId === row.id
            return (
              <li key={row.id} className={`box-card ${open ? 'box-card--open' : ''}`}>
                <button
                  type="button"
                  className="box-card__main"
                  onClick={() => setDetailId(open ? null : row.id)}
                >
                  {p?.sprite_url && (
                    <img src={p.sprite_url} alt="" width={72} height={72} />
                  )}
                  <div>
                    <strong>{formatPokemonName(p?.name)}</strong>
                    <span className="box-card__zone">{z?.label ?? row.encounter_zone}</span>
                  </div>
                </button>
                {open && (
                  <div className="box-card__detail">
                    <div className="box-card__types">
                      {(p?.types || []).map((t) => (
                        <TypeBadge key={t} type={t} />
                      ))}
                    </div>
                    <p className="dash-muted">
                      Caught {new Date(row.caught_at).toLocaleString()}
                    </p>
                    <p>
                      <strong>Moves:</strong>{' '}
                      {(row.learned_moves || []).join(', ').replace(/-/g, ' ') || '—'}
                    </p>
                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      disabled={busyId === row.id || teamCount >= 6}
                      onClick={() => addToTeam(row.id)}
                    >
                      Move to team
                    </button>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
