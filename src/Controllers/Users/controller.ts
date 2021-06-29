import { Request, Response, NextFunction } from 'express'
import { IAppConfig } from '../../Interfaces/AppConfig'
import { IUser } from '../../Models/User'
import { UserServices } from '../../Services/users'


export class UserController {

    private userServices: UserServices

    constructor(config: IAppConfig) {
        this.userServices = new UserServices(config)
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user: IUser = req.body
            const userCreated = await this.userServices.createUser(user)
            res.json(userCreated)
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}