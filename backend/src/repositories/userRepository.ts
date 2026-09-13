import { Op } from "sequelize";
import User from "../models/User.js";
import type { CreateUserData, UpdateUserData, UserCriteria } from "../types/user.types.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import type { QueryOptions } from "../types/shared.types.js";

export const findById = async (id: string) => {

    const user = await User.findByPk(id);

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return user;
};

export const findByCriteria = async (criteria: UserCriteria, options: QueryOptions) => {
    return await User.findAll({
        where: criteria,
        order: options.order || [["username", "ASC"]],
        limit: options.limit,
        offset: options.offset,
    });
};

export const findByEmailOrUsername = async (emailOrUsername: string): Promise<User | null> => {
    return User.findOne({
        where: {
            [Op.or]: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        },
        attributes: [
            "id", "username", "role", "passwordHash"
        ]
    });
};

export const findByEmail = async (email: string): Promise<User | null> => {
    return User.findOne({
        where: {
            email,
        }
    })
};

export const findByUsername = async (username: string): Promise<User | null> => {
    return User.findOne({
        where: {
            username,
        }
    })
};

export const add = async (user: CreateUserData) => {
    return User.create(user)
};

export const update = async (user: User, data: UpdateUserData) => {
    return user.update(data)
};

export const remove = async (user: User) => {
    return user.destroy();
};