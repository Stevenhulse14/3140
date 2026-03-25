/**
 * Registration via POST /api/auth/signup.
 * If Supabase returns no session (e.g. email confirm required), user stays logged out
 * until they complete the flow — we surface that with an info toast.
 */
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext.jsx'

export function SignupPage() {
  const { signup, isAuthenticated, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  if (!loading && isAuthenticated) {
    return <Navigate to="/pokemon" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    try {
      const data = await signup(email, password)
      if (data.session) {
        toast.success('Trainer registered! Your adventure begins.')
      } else {
        toast.info(
          'Check your email to confirm your account (if confirmation is enabled in Supabase).',
        )
      }
    } catch (err) {
      toast.error(err.message || 'Signup failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Sign up</h1>
        <p className="auth-card__sub">Get a Trainer ID and start catching.</p>
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
              minLength={6}
              autoComplete="new-password"
            />
          </label>
          <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
            {busy ? 'Creating…' : 'Claim my Trainer ID'}
          </button>
        </form>
        <p className="auth-card__footer">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}
