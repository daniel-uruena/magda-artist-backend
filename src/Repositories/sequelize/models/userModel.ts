import { Optional, Model, DataTypes, Sequelize } from 'sequelize'
import { IUser } from '../../../Models/User'
import { v4 as uuid } from 'uuid';

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
    return User.init(
        {
            id: {
                type: DataTypes.STRING(),
                primaryKey: true,
                defaultValue: uuid()
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
                allowNull: false,
                unique: true
            },
            userName: {
                type: new DataTypes.STRING(),
                allowNull: false,
                unique: true
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