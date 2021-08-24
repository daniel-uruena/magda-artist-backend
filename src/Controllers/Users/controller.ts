import { Request, Response, NextFunction } from 'express'
import { userInfo } from 'os'
import { IAppConfig } from '../../Interfaces/AppConfig'
import { IUser } from '../../Models/User'
import { UserServices } from '../../Services/users'


export class UserController {

    private userServices: UserServices

    constructor(config: IAppConfig) {
        this.userServices = new UserServices(config)
    }

    userResponse(user:IUser){
        return { ...user, password: undefined }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user: IUser = req.body
            const userCreated = await this.userServices.createUser(user)
            res.json(this.userResponse(userCreated))
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}