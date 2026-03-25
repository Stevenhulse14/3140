/**
 * Trainer hub: reads aggregated GET /pokemon/dashboard via TrainerContext.
 * Shows party preview, box/total stats, recent catches, and journal excerpt.
 */
import { Link } from 'react-router-dom'
import { useTrainer } from '../context/TrainerContext.jsx'
import { DashboardCard } from '../components/DashboardCard.jsx'
import { TypeBadge } from '../components/TypeBadge.jsx'
import { formatPokemonName } from '../utils/format.js'
import { getZoneTheme } from '../constants/zones.js'

export function PokemonDashboardPage() {
  const {
    loading,
    error,
    refresh,
    team,
    boxCount,
    teamCount,
    recentCatches,
    catchHistory,
    totalCaught,
  } = useTrainer()

  if (loading && !team.length && totalCaught === 0) {
    return (
      <div className="page-loading">
        <div className="pokeball-loader" aria-hidden />
        <p>Syncing your Pokédex…</p>
      </div>
    )
  }

  return (
    <div className="dash-page">
      <header className="dash-header">
        <div>
          <h1>Trainer Dashboard</h1>
          <p className="dash-header__sub">
            Party status, Professor storage, and your latest adventures.
          </p>
        </div>
        <button type="button" className="btn btn--secondary" onClick={() => refresh()}>
          Refresh
        </button>
      </header>
      {error && <p className="banner banner--error">{error}</p>}

      <section className="dash-grid">
        <DashboardCard title="Active team" className="dash-card--wide">
          {team.length === 0 ? (
            <p className="empty-hint">
              No Pokémon in your party yet.{' '}
              <Link to="/pokemon/find">Go find some!</Link>
            </p>
          ) : (
            <ul className="mini-party">
              {team.map((row) => (
                <li key={row.id} className="mini-party__slot">
                  {row.pokemon?.sprite_url ? (
                    <img src={row.pokemon.sprite_url} alt="" width={56} height={56} />
                  ) : (
                    <span className="mini-party__placeholder">?</span>
                  )}
                  <span className="mini-party__name">
                    {formatPokemonName(row.pokemon?.name)}
                  </span>
                  <span className="mini-party__types">
                    {(row.pokemon?.types || []).map((t) => (
                      <TypeBadge key={t} type={t} />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="dash-stat">
            Slots used: <strong>{teamCount}</strong> / 6
          </p>
        </DashboardCard>

        <DashboardCard title="Professor's Box">
          <p className="dash-big-num">{boxCount}</p>
          <p className="dash-muted">Extra Pokémon safely stored.</p>
          <Link to="/pokemon/box" className="btn btn--ghost btn--sm">
            Manage box
          </Link>
        </DashboardCard>

        <DashboardCard title="Total caught">
          <p className="dash-big-num">{totalCaught}</p>
          <p className="dash-muted">Across all zones.</p>
        </DashboardCard>

        <DashboardCard title="Team summary" className="dash-card--wide">
          <ul className="summary-list">
            <li>
              Average party size: <strong>{teamCount}</strong> (max 6)
            </li>
            <li>
              Box overflow: <strong>{boxCount}</strong> waiting for rotation
            </li>
            <li>
              <Link to="/pokemon/team">Open party screen →</Link>
            </li>
          </ul>
        </DashboardCard>

        <DashboardCard title="Recent catches">
          {recentCatches.length === 0 ? (
            <p className="empty-hint">Nothing yet—time for an encounter!</p>
          ) : (
            <ul className="recent-list">
              {recentCatches.map((row) => {
                const z = getZoneTheme(row.encounter_zone)
                return (
                  <li key={row.id}>
                    <img
                      src={row.pokemon?.sprite_url}
                      alt=""
                      width={40}
                      height={40}
                      className="recent-list__img"
                    />
                    <div>
                      <strong>{formatPokemonName(row.pokemon?.name)}</strong>
                      <span className="dash-muted">
                        {' '}
                        · {z?.label ?? row.encounter_zone ?? 'Unknown zone'}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </DashboardCard>

        <DashboardCard title="Catch history" className="dash-card--wide">
          {catchHistory.length === 0 ? (
            <p className="empty-hint">Your journal is empty.</p>
          ) : (
            <ul className="history-list">
              {catchHistory.slice(0, 12).map((h) => (
                <li key={h.id}>
                  <span className="history-list__action">{h.action}</span>
                  <span className="history-list__zone">{h.zone ?? '—'}</span>
                  <time dateTime={h.caught_at}>
                    {new Date(h.caught_at).toLocaleString()}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </DashboardCard>
      </section>
    </div>
  )
}
