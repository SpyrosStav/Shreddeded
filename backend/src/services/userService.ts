import bcrypt from "bcrypt";
import { EntityAlreadyExistsError } from "../errors/EntityAlreadyExistsError.js";
import { Role } from "../enums/roles.js";
import type { UserCreate, UserUpdate } from "../dtos/user/user.validation.js";
import * as userRepository from "../repositories/userRepository.js";
import type { UserCriteria } from "../types/user.types.js";
import type { QueryOptions } from "../types/shared.types.js";
import type { SessionUser } from "../types/auth.types.js";
import { ForbiddenError } from "../errors/ForbiddenError.js";

export const findById = async (id: string) => {
    return await userRepository.findById(id);
}

export const findByCriteria = async (criteria: UserCriteria, options: QueryOptions) => {
    return userRepository.findByCriteria(criteria, options);
};

export const add = async (data: UserCreate) => {

    if (await userRepository.findByEmail(data.email)) {
        throw new EntityAlreadyExistsError("User");
    }

    if (await userRepository.findByUsername(data.username)) {
        throw new EntityAlreadyExistsError("User");
    }

    const { password, ...userData } = data;

    const passwordHash = await bcrypt.hash(password, 12);

    return userRepository.add({
        ...userData,
        passwordHash,
        role: Role.USER,
    });
}

export const update = async (id: string, data: UserUpdate, user: SessionUser) => {
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

    return userRepository.update(existingUserById, data);
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