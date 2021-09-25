import { Request, Response, NextFunction } from 'express'
import { IAppConfig } from '../../Interfaces/AppConfig'
import { IUser } from '../../Models/User'
import { newUserSchema, updateUserSchema } from '../../Schemas/userSchemas'
import { UserServices } from '../../Services/users'
import logger from '../../Utils/logger'


export class UserController {

    private userServices: UserServices

    constructor(config: IAppConfig) {
        this.userServices = new UserServices(config)
    }

    userResponse(user:IUser){
        return { ...user, password: undefined }
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser = req.body
            logger.info(`data received: ${JSON.stringify(user)}`)
            const { error } = newUserSchema.validate(user)
            if (error) {
                logger.error(`Invalid user data: ${JSON.stringify(error)}`)
                res.status(400).json({ message: error.message })
                return
            }
            
            logger.info('Creating user...')
            const userCreated = await this.userServices.createUser(user)
            const response = this.userResponse(userCreated)
            logger.info(`User created successfully: ${JSON.stringify(response)}`)
            res.json(response)
        } catch (error) {
            next(error)
        }
    }

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('Getting users...')
            const users = await this.userServices.getUsers()
            res.json(users.map(this.userResponse))
        } catch (error) {
            next(error)
        }
    }

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params
            if (!userId) {
                logger.info('User id not received')
                res.status(400).json({ message: 'User id is required' })
                return
            }
            logger.info(`Getting user by id: ${userId}`)
            const user = await this.userServices.getUserById(userId) as IUser
            if (!user) {
                logger.info('User not found')
                res.status(404).json({ message: 'User not found' })
                return
            }
            res.json(this.userResponse(user))
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = req.body
            const { userId } = req.params
            const { error } = updateUserSchema.validate({ id: userId, ...userData })
            if (error) {
                logger.error(`Invalid user data: ${JSON.stringify(error)}`)
                res.status(400).json({ message: error.message })
                return
            }

            logger.info('Updating user...')
            const user = await this.userServices.updateUser(userId, userData)
            if (user) {
                res.json(this.userResponse(user))
                return
            }
            logger.info('User not found')
            res.status(404).json({ message: 'User not found'})
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params
            if (!userId) {
                logger.info('User id not received')
                res.status(400).json({ message: 'User id is required' })
                return
            }

            logger.info(`Deleting user: ${userId}`)
            const response = await this.userServices.deleteUser(userId)

            if (response) {
                logger.info('User deleted successfully')
                res.json({ message: 'user deleted successfully'})
                return
            }

            logger.info('User not found')
            res.status(404).json({ message: 'User not found' })
        } catch (error) {
            next(error)
        }
    }
}
