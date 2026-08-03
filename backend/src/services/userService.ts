import bcrypt from "bcrypt";
import { EntityAlreadyExistsError } from "../errors/EntityAlreadyExistsError.js";
import { Role } from "../enums/roles.js";
import type { UserCreate } from "../dtos/auth/user.validation.js";
import * as userRepository from "../repositories/userRepository.js";

export const register = async (user: UserCreate) => {

    if (await userRepository.findByEmail(user.email)) {
        throw new EntityAlreadyExistsError("User");
    }

    if (await userRepository.findByUsername(user.username)) {
        throw new EntityAlreadyExistsError("User");
    }

    const { password, ...userData } = user;

    const passwordHash = await bcrypt.hash(password, 12);

    return userRepository.add({
        ...userData,
        passwordHash,
        role: Role.USER,
    });
}





