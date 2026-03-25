/**
 * Express application setup (middleware + route mounting).
 *
 * Request flow:
 * 1. CORS — allows browser clients (e.g. Vite on :5173) to call this API.
 * 2. express.json() — parses JSON bodies into req.body.
 * 3. /health — simple uptime check for deploy scripts / load balancers.
 * 4. /api/* — all feature routes (auth, zones, pokemon).
 * 5. errorHandler — last middleware; catches errors passed via next(err).
 */
import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

// Reflect request Origin and allow cookies/credentials if you add them later.
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
)
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

// API namespace keeps public paths (/) separate from JSON API in production.
app.use('/api', routes)

app.use(errorHandler)

export default app
