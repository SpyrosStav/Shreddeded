import bcrypt from "bcrypt";
import { Role } from "../../enums/roles.js";
import { EntityAlreadyExistsError } from "../../errors/EntityAlreadyExistsError.js";
import { ForbiddenError } from "../../errors/ForbiddenError.js";
import type { PaginatedResult, QueryOptions } from "../../types/shared.types.js";
import type { SessionUser } from "../auth/auth.types.js";
import type { UserAttributes, UserCriteria } from "./user.types.js";
import type { UserCreate, UserUpdate } from "./user.validation.js";
import * as userRepository from "./userRepository.js";
import type User from "./User.js";

export const findById = async (id: string): Promise<UserAttributes> => {
    const user = await userRepository.findById(id);
    return toPublicUser(user);
}

export const findByCriteria = async (criteria: UserCriteria, options: QueryOptions): Promise<PaginatedResult<UserAttributes>> => {
    const { rows, count } = await userRepository.findByCriteria(criteria, options);
    return { rows: rows.map(toPublicUser), count };
};

export const add = async (data: UserCreate): Promise<UserAttributes> => {

    if (await userRepository.findByEmail(data.email)) {
        throw new EntityAlreadyExistsError("User");
    }

    if (await userRepository.findByUsername(data.username)) {
        throw new EntityAlreadyExistsError("User");
    }

    const { password, ...userData } = data;

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await userRepository.add({
        ...userData,
        passwordHash,
        role: Role.USER,
    });

    return toPublicUser(user);
}

export const update = async (id: string, data: UserUpdate, user: SessionUser): Promise<UserAttributes> => {
    const existingUserById = await userRepository.findById(id);

    if (existingUserById.id !== user.id && user.role !== Role.ADMIN) {
        throw new ForbiddenError();
    }

    if (data.email && data.email !== existingUserById.email) {
        const existingUser = await userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new EntityAlreadyExistsError("Email");
        }
    }

    if (data.username && data.username !== existingUserById.username) {
        const existingUser = await userRepository.findByUsername(data.username);

        if (existingUser) {
            throw new EntityAlreadyExistsError("Username");
        }
    }

    const updatedUser = await userRepository.update(existingUserById, data);

    return toPublicUser(updatedUser);
}

export const remove = async (id: string, user: SessionUser) => {
    const existingUser = await userRepository.findById(id);

    if (
        existingUser.id !== user.id &&
        user.role !== Role.ADMIN
    ) {
        throw new ForbiddenError();
    }
    return userRepository.remove(existingUser);
}

const toPublicUser = (user: User): UserAttributes => {
    const { passwordHash, ...publicUser } = user.toJSON();
    return publicUser;
};