import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface UserInstance extends Model {
    user_id: number;
    user_name: string;
}

export const Todo = sequelize.define<UserInstance>('Todo', {
    user_id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    user_name: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'users',
    timestamps: false
});