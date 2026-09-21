import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../../config/db.js";

class Meal extends Model<
    InferAttributes<Meal>,
    InferCreationAttributes<Meal>
> {
    declare id: CreationOptional<string>;
    declare mealDate: Date | null;
    declare mealType: string | null;
    declare userId: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Meal.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        mealDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        mealType: {
            type: DataTypes.STRING,
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
        tableName: "meal",
        underscored: true
    }
);

export default Meal;