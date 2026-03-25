import { Router } from 'express'
import authRoutes from './authRoutes.js'
import pokemonRoutes from './pokemonRoutes.js'
import { getZones } from '../controllers/zoneController.js'

const router = Router()

router.use('/auth', authRoutes)
router.get('/zones', getZones)
router.use('/pokemon', pokemonRoutes)

export default router
