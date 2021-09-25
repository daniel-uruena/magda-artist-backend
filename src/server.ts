import express, { Express } from 'express'
import cors from 'cors'
import { IAppConfig } from './Interfaces/AppConfig'
import UserRouter from './Controllers/Users'
import { errorHandler } from './Utils'
import logger from './Utils/logger'

export class AppServer {

    private app: Express
    private config

    constructor(config: IAppConfig) {
        this.app = express()
        this.app.use(cors({ origin: '*' }))
        this.app.use(express.json())
        this.config = config.server
    }

    start() {
        this.app.use('/api/v1', UserRouter)
        this.app.use(errorHandler)
        this.app.listen(this.config.port, () => {
            logger.info(`Server is running in http://localhost:${this.config.port}`)
        })
    }
}