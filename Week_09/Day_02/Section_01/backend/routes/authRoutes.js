/**
 * Authentication routes — thin mapping to authController.
 *
 * Actual sign-up/sign-in is delegated to Supabase Auth (see authController).
 * The client stores the returned JWT and sends `Authorization: Bearer …` on
 * protected pokemon routes.
 */
import { Router } from 'express'
import * as authController from '../controllers/authController.js'

const router = Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

export default router
