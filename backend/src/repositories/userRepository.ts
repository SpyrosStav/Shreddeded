import User from "../models/User.js";
import { Op } from "sequelize";

export const findByEmailOrUsername = async (emailOrUsername: string) => {
    return User.findOne({
        where: {
            [Op.or]: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        },
        attributes: [
            "id",
            "username",
            "role",
            "passwordHash"
        ]
    });
};


