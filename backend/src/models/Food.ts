import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Food = sequelize.define(
    "Food",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        calories: {
            type: DataTypes.DECIMAL(4, 0),
            allowNull: true,
        },
        protein: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
        },
        carbs: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
        },
        fat: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
        },
        fiber: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: "user_id",
        },
    },
    {
        tableName: "food",
        timestamps: false,
    }
);

export default Food;