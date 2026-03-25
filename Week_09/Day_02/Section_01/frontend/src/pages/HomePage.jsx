import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="home-page">
      <section className="hero hero--poke">
        <div className="hero__glow" aria-hidden />
        <div className="hero__inner">
          <p className="hero__tag">Limited-time Trainer Promos</p>
          <h1 className="hero__title">
            Double Stardust Weekend!
            <br />
            <span className="hero__accent">+50% encounter sparkle</span>
          </h1>
          <p className="hero__lead">
            Professor&apos;s Lab is sponsoring extra Box space for new trainers.
            Sign in, pick a zone, and chase rare encounters across biomes—from
            misty forests to neon ruins.
          </p>
          <div className="hero__cta">
            {isAuthenticated ? (
              <>
                <Link to="/pokemon/find" className="btn btn--primary btn--lg">
                  Catch Pokémon
                </Link>
                <Link to="/pokemon/team" className="btn btn--secondary btn--lg">
                  View Your Team
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn--primary btn--lg">
                  Start your journey
                </Link>
                <Link to="/login" className="btn btn--secondary btn--lg">
                  I have a Trainer ID
                </Link>
              </>
            )}
          </div>
          <ul className="hero__promos">
            <li>
              <strong>Mystery Gift</strong> — Daily zone bonus rotation
            </li>
            <li>
              <strong>Professor Deal</strong> — Unlimited Box storage (it&apos;s science!)
            </li>
            <li>
              <strong>Battle Pass</strong> — Track catches &amp; history on your dashboard
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
