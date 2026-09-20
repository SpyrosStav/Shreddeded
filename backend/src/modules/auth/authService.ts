import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "../../errors/InvalidCredentialsError.js";
import * as userRepository from "../user/userRepository.js";
import type { LoginResult } from "./auth.types.js";

export const login = async (emailOrUsername: string, password: string): Promise<LoginResult> => {
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