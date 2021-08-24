import { Sequelize } from 'sequelize'
import { IAppConfig } from '../../Interfaces/AppConfig'
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

    async createUser(user: IUser) {
        return User.create(user).then((result:any) => result.dataValues)
    }

    async getUsers() {
        return User.findAll()
    }

    async getUserById(userId: string) {
        return User.findByPk(userId)
    }
}