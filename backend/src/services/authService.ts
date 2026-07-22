import bcrypt from "bcrypt";
import * as userRepository from "../repositories/userRepository.js";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError.js";

export const login = async (emailOrUsername: string, password: string) => {
    const user = await userRepository.findByEmailOrUsername(emailOrUsername);

    if (!user) {
        throw new InvalidCredentialsError();
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatches) {
        throw new InvalidCredentialsError();
    }

    return {
        id: user.id,
        username: user.username,
        role: user.role
    };
};