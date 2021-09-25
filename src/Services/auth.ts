import bcrypt from 'bcrypt'
import { IAppConfig } from '../Interfaces/AppConfig'
import { ICredentials } from '../Interfaces/userOperations'
import { IUser } from '../Models/User'
import { UserRepository } from '../Repositories/sequelize'
import jwt from 'jsonwebtoken'
import { userResponse } from '../Utils'
import logger from '../Utils/logger'

export class AuthServices {
    private secretToken: string
    private userRepository: UserRepository

    constructor(config: IAppConfig) {
        this.userRepository = new UserRepository(config)
        this.secretToken = config.secretToken
    }

    async authenticate(credentials: ICredentials) {
        const user = await this.userRepository.getUserByUserName(credentials.userName)
        if (!user) {
            return false
        }

        if (await bcrypt.compare(credentials.password, user.password)) {
            return this.createToken(user)
        }
    }

    createToken(user: IUser) {
        return jwt.sign(userResponse(user), this.secretToken)
    }

    async authorize(token: string) {
        try {
            const userData: IUser = this.validateToken(token) as IUser
            const user = await this.userRepository.getUserById(userData.id as string)
            if (user) {
                return true
            }
        } catch (error) {
            logger.error('Invalid Token')
            return
        }
        // TODO: verificar permisos del usuario para realizar la acción
    }

    validateToken(token: string) {
        return jwt.verify(token, this.secretToken)
    }
}