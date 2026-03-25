import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { apiFetch } from '../services/api.js'
import { useAuth } from './AuthContext.jsx'

const EncounterContext = createContext(null)

export function EncounterProvider({ children }) {
  const { token } = useAuth()
  const [selectedZone, setSelectedZone] = useState(null)
  const [encounter, setEncounter] = useState(null)
  const [finding, setFinding] = useState(false)
  const [error, setError] = useState(null)

  const clearEncounter = useCallback(() => {
    setEncounter(null)
    setError(null)
  }, [])

  const findPokemon = useCallback(
    async (zoneKey) => {
      if (!token) throw new Error('Not signed in')
      setFinding(true)
      setError(null)
      try {
        const q = new URLSearchParams({ zone: zoneKey }).toString()
        const data = await apiFetch(`/pokemon/find?${q}`, { token })
        setEncounter(data)
        return data
      } catch (e) {
        setError(e.message)
        throw e
      } finally {
        setFinding(false)
      }
    },
    [token],
  )

  const value = useMemo(
    () => ({
      selectedZone,
      setSelectedZone,
      encounter,
      setEncounter,
      finding,
      error,
      findPokemon,
      clearEncounter,
    }),
    [
      selectedZone,
      encounter,
      finding,
      error,
      findPokemon,
      clearEncounter,
    ],
  )

  return (
    <EncounterContext.Provider value={value}>
      {children}
    </EncounterContext.Provider>
  )
}

export function useEncounter() {
  const ctx = useContext(EncounterContext)
  if (!ctx) throw new Error('useEncounter must be used within EncounterProvider')
  return ctx
}
