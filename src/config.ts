import { IAppConfig } from './Interfaces/AppConfig'

export const Config: IAppConfig = {
    server: {
        port: 3000
    },
    database: {
        host: 'localhost',
        port: 9000,
        database: 'store',
        username: 'admin',
        password: 'asdf1234',
        dialect: 'mysql'
    },
    secret: 10
}