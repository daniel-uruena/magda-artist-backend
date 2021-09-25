import express, { Express } from 'express'
import cors from 'cors'
import { IAppConfig } from './Interfaces/AppConfig'
import UserRouter from './Controllers/Users'
import AuthController from './Controllers/Auth';
import { errorHandler } from './Utils'
import logger from './Utils/logger'

export class AppServer {

    private app: Express
    private config
    private basePath: string

    constructor(config: IAppConfig) {
        this.app = express()
        this.app.use(cors({ origin: '*' }))
        this.app.use(express.json())
        this.config = config.server
        this.basePath = '/api/v1'
    }

    start() {
        this.app.use(this.basePath, UserRouter)
        this.app.use(this.basePath, AuthController)
        this.app.use(errorHandler)
        this.app.listen(this.config.port, () => {
            logger.info(`Server is running in http://localhost:${this.config.port}`)
        })
    }
}