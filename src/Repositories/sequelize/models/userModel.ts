import { Optional, Model, DataTypes, Sequelize } from 'sequelize'
import { IUser } from '../../../Models/User'

interface UserCreationAttributes extends Optional<IUser, 'id'> {}

export class User extends Model<IUser, UserCreationAttributes> implements IUser {
    public id!: string
    public name!: string | null
    public lastName!: string | null
    public phoneNumber!: string | null
    public email!: string
    public userName!: string
    public password!: string
    public active!: boolean
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

export const initUserModel = (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                type: new DataTypes.STRING(),
                primaryKey: true
            },
            name: {
                type: new DataTypes.STRING(),
                allowNull: true
            },
            lastName: {
                type: new DataTypes.STRING(),
                allowNull: true
            },
            phoneNumber: {
                type: new DataTypes.STRING(),
                allowNull: true
            },
            email: {
                type: new DataTypes.STRING(),
                allowNull: false
            },
            userName: {
                type: new DataTypes.STRING(),
                allowNull: false
            },
            password: {
                type: new DataTypes.STRING(),
                allowNull: false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        },
        {
            sequelize,
            tableName: 'user'
        }
    )
}