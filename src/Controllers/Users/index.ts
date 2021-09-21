import { UserController } from './controller'
import express, { Router } from 'express'
import { Config } from '../../config'

const userController = new UserController(Config)
const router: Router = express.Router()

router.post('/user', userController.createUser.bind(userController))

export default router
