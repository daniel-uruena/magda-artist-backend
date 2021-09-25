import bcrypt from 'bcrypt'
import { IAppConfig } from '../Interfaces/AppConfig'
import { IUserUpdate } from '../Interfaces/userOperations'
import { IUser } from '../Models/User'
import { UserRepository } from '../Repositories/sequelize'


export class UserServices {

    private userRepository: UserRepository
    private secret: number

    constructor(config: IAppConfig) {
        this.userRepository = new UserRepository(config)
        this.secret = config.secret
    }

    async createUser(user: IUser): Promise<IUser> {
        user.active = true
        user.password = await bcrypt.hash(user.password, this.secret)
        return this.userRepository.createUser(user)
    }

    async getUsers(): Promise<IUser[]> {
        return this.userRepository.getUsers().catch(error => {
            throw new Error(error.original.message)
        })
    }

    async getUserById(userId: string): Promise<IUser | null> {
        return this.userRepository.getUserById(userId)
            
    }

    async updateUser(userId: string, userData: IUserUpdate): Promise<IUser | undefined> {
        return this.userRepository.updateUser(userId, userData)
    }

    async deleteUser(userId: string) {
        return this.userRepository.deleteUser(userId)
    }
}
