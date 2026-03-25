/**
 * Pokémon feature routes under /api/pokemon.
 *
 * Order matters in Express:
 * - GET `/` (catalog) is registered BEFORE `requireAuth` so anyone can list
 *   seeded species (useful for demos / future Pokédex views).
 * - All routes after `router.use(requireAuth)` need a valid Supabase JWT.
 */
import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import * as pokemonController from '../controllers/pokemonController.js'

const router = Router()

router.get('/', pokemonController.getCatalog)

router.use(requireAuth)
router.get('/dashboard', pokemonController.getDashboard)
router.get('/find', pokemonController.findEncounter)
router.post('/catch', pokemonController.postCatch)
router.get('/team', pokemonController.getTeam)
router.patch('/team', pokemonController.patchTeam)
router.get('/box', pokemonController.getBox)
router.patch('/box', pokemonController.patchBox)
router.get('/history', pokemonController.getHistory)

export default router
