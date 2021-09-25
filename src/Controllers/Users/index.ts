import { UserController } from './controller'
import express, { Router } from 'express'
import { Config } from '../../config'

const userController = new UserController(Config)
const router: Router = express.Router()

router.post('/user', userController.createUser)
router.get('/users', userController.getUsers)
router.get('/user/:userId', userController.getUserById)
router.put('/user/:userId', userController.updateUser)
router.delete('/user/:userId', userController.deleteUser)

export default router
