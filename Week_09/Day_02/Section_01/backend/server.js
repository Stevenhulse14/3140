/**
 * Entry point: starts the HTTP server.
 *
 * Loads environment variables via `import 'dotenv/config'` in a dependency chain
 * (app.js does not load dotenv; we load it here first).
 *
 * PORT comes from backend/.env or defaults to 4000. The Express app itself is
 * defined in app.js so tests or scripts could import the app without listening.
 */
import 'dotenv/config'
import app from './app.js'

const port = Number(process.env.PORT) || 4000

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Pokémon Trainer API listening on http://localhost:${port}`)
})
