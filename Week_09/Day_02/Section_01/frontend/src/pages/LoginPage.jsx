/**
 * Email/password login via POST /api/auth/login.
 * On success AuthContext stores JWT; Navigate sends user to `state.from` or /pokemon.
 */
import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext.jsx'

export function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth()
  const location = useLocation()
  /** Deep link return after auth (set by ProtectedRoute). */
  const from = location.state?.from?.pathname || '/pokemon'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  if (!loading && isAuthenticated) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    try {
      await login(email, password)
      toast.success('Welcome back, Trainer!')
    } catch (err) {
      toast.error(err.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Log in</h1>
        <p className="auth-card__sub">Access your team, box, and catch history.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
            {busy ? 'Signing in…' : 'Enter the world'}
          </button>
        </form>
        <p className="auth-card__footer">
          New trainer? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}
