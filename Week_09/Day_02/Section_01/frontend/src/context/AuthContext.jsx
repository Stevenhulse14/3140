/**
 * Authentication state: login/signup/logout via API; session persisted locally.
 *
 * Flow:
 * - Login/signup POST returns Supabase session { access_token, refresh_token, user }.
 * - We store a small JSON blob in localStorage so refresh keeps the user signed in.
 * - `token` (access_token) is sent on every protected apiFetch call.
 *
 * readInitialAuth runs once via useState(initializer) — avoids useEffect for
 * hydration and satisfies React’s “no sync setState in effect” lint guidance.
 *
 * The browser never holds the Supabase service key; only the backend talks to DB.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { apiFetch } from '../services/api.js'

const AuthContext = createContext(null)

const STORAGE_KEY = 'trainer_session_v1'

function loadStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.access_token) return parsed
    return null
  } catch {
    return null
  }
}

function saveSession(session, user) {
  if (!session?.access_token) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at,
      user: user ?? session.user ?? null,
    }),
  )
}

function readInitialAuth() {
  const stored = loadStoredSession()
  if (!stored?.access_token) {
    return { session: null, user: null }
  }
  return { session: stored, user: stored.user ?? null }
}

export function AuthProvider({ children }) {
  const [{ session, user }, setAuth] = useState(readInitialAuth)

  const applySession = useCallback((nextSession, nextUser) => {
    const u = nextUser ?? nextSession?.user ?? null
    setAuth({ session: nextSession, user: u })
    saveSession(nextSession, u)
  }, [])

  const token = session?.access_token ?? null

  const login = useCallback(
    async (email, password) => {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      applySession(data.session, data.user)
      return data
    },
    [applySession],
  )

  const signup = useCallback(
    async (email, password) => {
      const data = await apiFetch('/auth/signup', {
        method: 'POST',
        body: { email, password },
      })
      if (data.session) {
        applySession(data.session, data.user)
      }
      return data
    },
    [applySession],
  )

  const logout = useCallback(async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST', token })
    } catch {
      /* ignore */
    }
    setAuth({ session: null, user: null })
    localStorage.removeItem(STORAGE_KEY)
  }, [token])

  const value = useMemo(
    () => ({
      user,
      session,
      token,
      loading: false,
      login,
      signup,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [user, session, token, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
