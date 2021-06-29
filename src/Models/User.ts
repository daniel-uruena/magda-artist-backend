export interface IUser {
    id?: string
    name?: string | null
    lastName?: string | null
    phoneNumber?: string | null
    email: string
    userName: string
    password: string
    active?: boolean
    createdAt?: Date
    updatedAt?: Date
}
