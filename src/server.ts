import express, { Express } from 'express'
import cors from 'cors'
import { IAppConfig } from './Interfaces/AppConfig'
import UserRouter from './Controllers/Users'

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
        this.app.listen(this.config.port, () => {
            console.info(`Server is running in http://localhost:${this.config.port}`)
        })
    }
}