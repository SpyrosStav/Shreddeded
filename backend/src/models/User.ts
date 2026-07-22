import { Model, DataTypes } from "sequelize";
import type { DecimalDataType, InferAttributes, InferCreationAttributes } from "sequelize";
import sequelize from "../config/db.js";
import { Role } from "../enums/roles.js";


class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: string;
    declare email: string;
    declare username: string;
    declare passwordHash: string;
    declare role: Role;

    declare firstName: string | null;
    declare lastName: string | null;
    declare dateOfBirth: Date | null;
    declare sex: string | null;
    declare heightCM: DecimalDataType | null;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "password_hash",
        },
        role: {
            type: DataTypes.ENUM(...Object.values(Role)),
            allowNull: false,
            defaultValue: Role.USER
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: "first_name",
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: "date_of_birth"
        },
        sex: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        heightCM: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: true,
            field: "height_cm",
        }
    },
    {
        sequelize,
        tableName: "users",
        underscored: true
    }
)

export default User;