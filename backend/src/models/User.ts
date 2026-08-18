import { Model, DataTypes } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import sequelize from "../config/db.js";
import { Role } from "../enums/roles.js";
import type { Sex } from "../enums/sexes.js";


class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare username: string;
    declare passwordHash: string;
    declare role: Role;
    declare firstName: string | null;
    declare lastName: string | null;
    declare dateOfBirth: string | null;
    declare sex: Sex | null;
    declare height: number | null;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    toPublic() {
        const { passwordHash, ...rest } = this.toJSON();
        return rest;
    }
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
        height: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "height_cm",
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
        tableName: "users",
        underscored: true
    }
)

export default User;