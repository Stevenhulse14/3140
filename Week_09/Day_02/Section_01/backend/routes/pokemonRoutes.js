import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import * as pokemonController from '../controllers/pokemonController.js'

const router = Router()

// Public catalog (optional: could protect — kept public for browsing species)
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
