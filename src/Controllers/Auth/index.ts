import { AuthController } from './controller'
import express, { Router } from 'express'
import { Config } from '../../config'

const authController = new AuthController(Config)
const router: Router = express.Router()

router.post('/login', authController.login)
router.post('/authorize', authController.authorize)

export default router
