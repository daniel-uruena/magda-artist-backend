import { Request, Response, NextFunction } from 'express'
import { IAppConfig } from '../../Interfaces/AppConfig'
import { authorizationSchema, loginSchema } from '../../Schemas/authSchemas'
import { AuthServices } from '../../Services/auth'
import logger from '../../Utils/logger'

export class AuthController {

    authServices: AuthServices

    constructor(config: IAppConfig) {
        this.authServices = new AuthServices(config)
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const credentials = req.body
            const { error } = loginSchema.validate(credentials)
            if (error) {
                logger.error(`Invalid user data: ${JSON.stringify(error)}`)
                res.status(400).json({ message: error.message })
                return
            }

            const token = await this.authServices.authenticate(credentials)

            if (!token) {
                logger.error('username or password invalid')
                res.status(401).json({ message: 'username or password invalid' })
                return
            }

            logger.info('user authenticated successfully')
            res.json({ token })
        } catch (error) {
            next(error)
        }
    }

    authorize = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorization = req.body
            const { error } = authorizationSchema.validate(authorization)
            if (error) {
                logger.error(`token not provided`)
                res.status(401).json({ message: error.message })
                return
            }

            const response = await this.authServices.authorize(authorization.token)
            if (response) {
                res.json({ message: 'valid token' })
                return
            }

            res.status(401).json({ message: 'invalid token' })
        } catch (error) {
            next(error)
        }
    }
}