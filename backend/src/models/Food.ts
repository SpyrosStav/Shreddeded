import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/db.js";

class Food extends Model<
    InferAttributes<Food>,
    InferCreationAttributes<Food>
> {
    declare id: CreationOptional<string>;
    declare name: string;

    declare calories: number | null;
    declare protein: number | null;
    declare carbs: number | null;
    declare fat: number | null;
    declare fiber: number | null;

    declare userId: string | null;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Food.init(
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: "food",
        underscored: true
    }
);

export default Food;