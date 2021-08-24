import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import { IAppConfig } from '../Interfaces/AppConfig'
import { IUser } from '../Models/User'
import { UserRepository } from '../Repositories/sequelize'


export class UserServices {

    private userRepository: UserRepository
    private secret: number

    constructor(config: IAppConfig) {
        this.userRepository = new UserRepository(config)
        this.secret = config.secret
    }

    async createUser(user: IUser) {
        user.active = true
        user.password = await bcrypt.hash(user.password, this.secret)
        return this.userRepository.createUser(user)
    }
}