/**
 * Shell around all main routes: fixed navbar + scrollable `<main>` with nested routes.
 *
 * Child routes render inside <Outlet /> (see App.jsx Route nesting).
 */
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar.jsx'

export function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
