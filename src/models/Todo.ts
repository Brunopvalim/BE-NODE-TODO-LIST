import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface TodoInstance extends Model {
    id: number;
    title: string;
    done: boolean;
    owner: string;
}

export const Todo = sequelize.define<TodoInstance>('Todo', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    owner: {
        type: DataTypes.STRING,
        defaultValue: false
    },
}, {
    tableName: 'todos',
    timestamps: false
});