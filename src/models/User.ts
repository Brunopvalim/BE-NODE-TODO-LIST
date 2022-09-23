import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface UserInstance extends Model {
    user_id: number;
    username: string;
    password: string;
}

export const User = sequelize.define<UserInstance>('User', {
    user_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'users',
    timestamps: false
});