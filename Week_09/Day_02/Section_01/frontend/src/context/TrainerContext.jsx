/**
 * Trainer / dashboard data: team summary, recents, history counts.
 *
 * Fetches GET /pokemon/dashboard when the user has a token (see useEffect).
 * Child pages call `refresh()` after mutations (catch, box ↔ team) so widgets
 * stay in sync without full page reload.
 *
 * Derived fields (team, boxCount, …) default to empty/zero when dashboard is null.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { apiFetch } from '../services/api.js'
import { useAuth } from './AuthContext.jsx'

const TrainerContext = createContext(null)

export function TrainerProvider({ children }) {
  const { token, isAuthenticated } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    if (!token || !isAuthenticated) {
      setDashboard(null)
      return null
    }
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch('/pokemon/dashboard', { token })
      setDashboard(data)
      return data
    } catch (e) {
      setError(e.message)
      throw e
    } finally {
      setLoading(false)
    }
  }, [token, isAuthenticated])

  useEffect(() => {
    if (token && isAuthenticated) {
      refresh()
    } else {
      setDashboard(null)
    }
  }, [token, isAuthenticated, refresh])

  const value = useMemo(
    () => ({
      dashboard,
      loading,
      error,
      refresh,
      team: dashboard?.team ?? [],
      boxCount: dashboard?.box_count ?? 0,
      teamCount: dashboard?.team_count ?? 0,
      recentCatches: dashboard?.recent_catches ?? [],
      catchHistory: dashboard?.catch_history ?? [],
      totalCaught: dashboard?.total_caught ?? 0,
    }),
    [dashboard, loading, error, refresh],
  )

  return (
    <TrainerContext.Provider value={value}>{children}</TrainerContext.Provider>
  )
}

export function useTrainer() {
  const ctx = useContext(TrainerContext)
  if (!ctx) throw new Error('useTrainer must be used within TrainerProvider')
  return ctx
}
