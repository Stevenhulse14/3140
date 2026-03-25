import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const linkClass = ({ isActive }) =>
  `nav-link ${isActive ? 'nav-link--active' : ''}`

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="site-nav">
      <Link to="/" className="site-logo">
        <span className="site-logo__ball" aria-hidden />
        <span>Trainer Quest</span>
      </Link>
      <nav className="site-nav__links" aria-label="Main">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        {isAuthenticated && (
          <>
            <NavLink to="/pokemon" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/pokemon/find" className={linkClass}>
              Find
            </NavLink>
            <NavLink to="/pokemon/team" className={linkClass}>
              Team
            </NavLink>
            <NavLink to="/pokemon/box" className={linkClass}>
              Box
            </NavLink>
          </>
        )}
      </nav>
      <div className="site-nav__auth">
        {isAuthenticated ? (
          <>
            <span className="site-nav__user" title={user?.email}>
              {user?.email?.split('@')[0] ?? 'Trainer'}
            </span>
            <button type="button" className="btn btn--ghost" onClick={() => logout()}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn--ghost">
              Log in
            </Link>
            <Link to="/signup" className="btn btn--primary">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
