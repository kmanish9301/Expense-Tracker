import { DataTypes } from "sequelize";
import { sequelize } from "../Config/Database.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: "user"
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    timestamps: true,
    freezeTableName: true,
})

export default User;