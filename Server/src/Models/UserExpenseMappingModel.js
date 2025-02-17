import { DataTypes } from "sequelize";
import { sequelize } from "../Config/Database.js";

const UserExpenseMapping = sequelize.define('UserExpenseMapping', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'User',
            key: 'id',
        },
        allowNull: false,
    },
    expense_id: {
        type: DataTypes.UUID,
        references: {
            model: 'Expense',
            key: 'id',
        },
        allowNull: false,
    }
}, {
    timestamps: true,
    freezeTableName: true,
});

export default UserExpenseMapping;