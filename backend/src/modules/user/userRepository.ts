import { Op } from "sequelize";
import { NotFoundError } from "../../errors/NotFoundError.js";
import User from "./User.js";
import type { PaginatedResult, QueryOptions } from "../../types/shared.types.js";
import type { CreateUserData, UpdateUserData, UserCriteria } from "./user.types.js";

export const findById = async (id: string): Promise<User> => {

    const user = await User.findByPk(id);

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return user;
};

export const findByCriteria = async (criteria: UserCriteria, options: QueryOptions): Promise<PaginatedResult<User>> => {
    const { rows, count } = await User.findAndCountAll({
        where: criteria,
        order: options.order || [["username", "ASC"]],
        limit: options.limit,
        offset: options.offset,
    });

    return { rows, count };
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