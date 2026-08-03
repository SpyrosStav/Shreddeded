import { Op } from "sequelize";
import User from "../models/User.js";
import type { CreateUserData } from "../types/user.types.js";

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

export const findByEmail = async (email: string) => {
    return User.findOne({
        where: {
            email,
        }
    })
}

export const findByUsername = async (username: string) => {
    return User.findOne({
        where: {
            username,
        }
    })
}

export const add = async (user: CreateUserData) => {
    return User.create(user)
}