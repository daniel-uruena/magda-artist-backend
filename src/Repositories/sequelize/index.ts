import { Sequelize } from 'sequelize'
import { IAppConfig } from '../../Interfaces/AppConfig'
import { IUserUpdate } from '../../Interfaces/userOperations'
import { IUser } from '../../Models/User'
import { User, initUserModel } from './models/userModel'

export class UserRepository {

    private sequelize: Sequelize

    constructor(config: IAppConfig) {
        this.sequelize = new Sequelize(config.database)
        this.initModels()
    }

    initModels() {
        initUserModel(this.sequelize)
    }

    async createUser(user: IUser): Promise<IUser> {
        return User.create(user)
            .then((result:any) => result.dataValues)
            .catch(error => {
                throw new Error(error.original.message)
            })
    }

    async getUsers(): Promise<IUser[]> {
        return User.findAll()
            .then((results:any) => results?.map((result: any) => result.dataValues))
            .catch(error => {
                throw new Error(error.original.message)
            })
    }

    async getUserById(userId: string) {
        return User.findByPk(userId).then((result:any) => result && result.dataValues)
        .catch(error => {
            throw new Error(error.original.message)
        })
    }

    async updateUser(userId: string, userData: IUserUpdate) {
        const user = await User.findByPk(userId)

        if (user) {
            user.name = userData.name || user.name
            user.lastName = userData.lastName || user.lastName
            user.phoneNumber = userData.phoneNumber || user.phoneNumber
            user.email = userData.email || user.email
            user.userName = userData.userName || user.userName

            return user.save().then((result:any) => result && result.dataValues)
            .catch(error => {
                throw new Error(error.original.message)
            })
        }
    }

    async deleteUser(userId: string) {
        const user = await User.findByPk(userId)

        if (user) {
            user.destroy()
            return true
        }
    }

    async getUserByUserName(userName: string) {
        return await User.findOne({ where: { userName } })
            .then((result:any) => result && result.dataValues)
            .catch(error => {
                throw new Error(error.original.message)
            })
    }
}