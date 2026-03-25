/**
 * Root API router: mounts sub-routers under /api.
 *
 * Final paths (with app.js mounting this at `/api`):
 *   POST /api/auth/signup, /login, /logout
 *   GET  /api/zones
 *   GET  /api/pokemon, /api/pokemon/find, … (see pokemonRoutes.js)
 */
import { Router } from 'express'
import authRoutes from './authRoutes.js'
import pokemonRoutes from './pokemonRoutes.js'
import { getZones } from '../controllers/zoneController.js'

const router = Router()

router.use('/auth', authRoutes)
router.get('/zones', getZones)
router.use('/pokemon', pokemonRoutes)

export default router
