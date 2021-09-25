export interface IAppConfig {
    server: {
        port: number
    }
    database: {
        host: string
        port: number
        database: string
        username: string
        password: string
        dialect?: 'mysql' | 'mariadb' | 'postgres' | 'mssql'
    }
    secret: number
    secretToken: string
}