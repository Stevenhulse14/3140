import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { ZoneSelector } from '../components/ZoneSelector.jsx'
import { TypeBadge } from '../components/TypeBadge.jsx'
import { useEncounter } from '../context/EncounterContext.jsx'
import { useTrainer } from '../context/TrainerContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getZoneTheme } from '../constants/zones.js'
import { formatPokemonName } from '../utils/format.js'
import { apiFetch } from '../services/api.js'

const STAT_LABELS = [
  ['hp', 'HP'],
  ['attack', 'Atk'],
  ['defense', 'Def'],
  ['special-attack', 'SpA'],
  ['special-defense', 'SpD'],
  ['speed', 'Spe'],
]

export function FindPage() {
  const { token } = useAuth()
  const { teamCount, refresh } = useTrainer()
  const {
    selectedZone,
    setSelectedZone,
    encounter,
    finding,
    findPokemon,
    clearEncounter,
  } = useEncounter()

  const theme = getZoneTheme(selectedZone)

  const runEncounter = useCallback(async () => {
    if (!selectedZone) {
      toast.warn('Choose a zone first, Trainer!')
      return
    }
    try {
      await findPokemon(selectedZone)
    } catch {
      toast.error('Could not load an encounter. Is the API running?')
    }
  }, [selectedZone, findPokemon])

  const performCatch = useCallback(
    async (forceBox) => {
      if (!encounter?.pokemon || !token) return
      const p = encounter.pokemon
      const zoneKey = encounter.zone?.key
      try {
        const result = await apiFetch('/pokemon/catch', {
          method: 'POST',
          token,
          body: {
            pokeapi_id: p.pokeapi_id,
            zone: zoneKey,
            learned_moves: p.moves,
            stats_snapshot: p.stats,
            force_box: forceBox,
          },
        })
        if (result.addedTo === 'team') {
          toast.success(
            `${formatPokemonName(p.name)} joined your party! Slot ${result.userPokemon?.team_slot ?? ''}`,
          )
        } else {
          toast.success(
            `${formatPokemonName(p.name)} was sent to the Professor's Box!`,
          )
        }
        await refresh()
        clearEncounter()
      } catch (e) {
        toast.error(e.message || 'Catch failed')
      }
    },
    [encounter, token, refresh, clearEncounter],
  )

  const onCatchClick = useCallback(() => {
    if (!encounter?.pokemon) return
    if (teamCount >= 6) {
      toast(
        ({ closeToast }) => (
          <div className="toast-catch">
            <p>
              <strong>Party full!</strong> Send this Pokémon to the Professor&apos;s
              Box?
            </p>
            <div className="toast-catch__actions">
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => {
                  performCatch(true)
                  closeToast()
                }}
              >
                Yes, store it!
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={closeToast}>
                Never mind
              </button>
            </div>
          </div>
        ),
        { autoClose: false, closeOnClick: false },
      )
      return
    }
    performCatch(false)
  }, [encounter, teamCount, performCatch])

  const p = encounter?.pokemon
  const encounterTheme = getZoneTheme(encounter?.zone?.key || selectedZone)

  return (
    <div
      className="find-page"
      style={
        theme
          ? {
              background: theme.gradient,
            }
          : undefined
      }
    >
      <div className="find-page__inner">
        <header className="find-header">
          <h1>Wild encounters</h1>
          <p>Pick a biome, then reveal what&apos;s hiding there.</p>
        </header>

        <ZoneSelector
          value={selectedZone}
          onChange={(z) => {
            setSelectedZone(z)
            clearEncounter()
          }}
          disabled={finding}
        />

        <div className="find-actions">
          <button
            type="button"
            className="btn btn--primary btn--lg"
            disabled={finding || !selectedZone}
            onClick={runEncounter}
          >
            {finding ? 'Searching…' : 'Reveal encounter'}
          </button>
          {p && (
            <button
              type="button"
              className="btn btn--secondary"
              disabled={finding}
              onClick={runEncounter}
            >
              Find another
            </button>
          )}
        </div>

        {selectedZone && !p && !finding && (
          <p className="find-flavor">
            A rustling sound in the {theme?.label}… press <strong>Reveal encounter</strong>{' '}
            when you&apos;re ready!
          </p>
        )}

        {p && encounterTheme && (
          <div
            className={`encounter-card encounter-card--appear ${selectedZone ? `zone-${selectedZone}` : ''}`}
            style={{
              '--enc-accent': encounterTheme.accent,
              '--enc-card': encounterTheme.cardBg,
              '--enc-text': encounterTheme.text,
              '--enc-banner': encounterTheme.encounterBanner,
            }}
          >
            <div className="encounter-card__banner">
              <span className="encounter-card__icon" aria-hidden>
                {encounterTheme.icon}
              </span>
              <p>
                A wild <strong>{formatPokemonName(p.name)}</strong> appeared in the{' '}
                {encounterTheme.label} zone!
              </p>
            </div>
            <div className="encounter-card__body">
              {p.sprite_url && (
                <img
                  src={p.sprite_url}
                  alt={formatPokemonName(p.name)}
                  className="encounter-card__sprite"
                  width={180}
                  height={180}
                />
              )}
              <div className="encounter-card__info">
                <h2>{formatPokemonName(p.name)}</h2>
                <div className="encounter-card__types">
                  {(p.types || []).map((t) => (
                    <TypeBadge key={t} type={t} />
                  ))}
                </div>
                <div className="stat-grid">
                  {STAT_LABELS.map(([key, label]) => (
                    <div key={key} className="stat-pill">
                      <span>{label}</span>
                      <strong>{p.stats?.[key] ?? '—'}</strong>
                    </div>
                  ))}
                </div>
                <div className="moves-block">
                  <h3>Moves when caught</h3>
                  <ul>
                    {(p.moves || []).map((m) => (
                      <li key={m}>{m.replace(/-/g, ' ')}</li>
                    ))}
                  </ul>
                </div>
                <div className="encounter-card__actions">
                  <button type="button" className="btn btn--primary" onClick={onCatchClick}>
                    Catch!
                  </button>
                  <button type="button" className="btn btn--secondary" onClick={runEncounter}>
                    Find another
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
