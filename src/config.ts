import { IAppConfig } from './Interfaces/AppConfig'

export const Config: IAppConfig = {
    server: {
        port: 3000
    },
    database: {
        host: 'localhost',
        port: 3306,
        database: 'store',
        username: 'root',
        password: 'asdf1234',
        dialect: 'mysql'
    },
    secret: 10
}