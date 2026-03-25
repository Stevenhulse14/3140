/**
 * Route guard: renders children only when the user has a valid token.
 *
 * If unauthenticated, redirects to /login and passes the current location in
 * state so LoginPage can send the user back after a successful sign-in.
 *
 * `loading` is kept for API compatibility; AuthContext currently hydrates sync
 * from localStorage so loading stays false.
 */
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const loc = useLocation()

  if (loading) {
    return (
      <div className="page-loading">
        <div className="pokeball-loader" aria-hidden />
        <p>Loading your adventure…</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: loc }} />
  }

  return children
}
