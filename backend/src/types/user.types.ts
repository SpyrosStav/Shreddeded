import type { UserQuery } from "../dtos/user/user.validation.js";
import { Role } from "../enums/roles.js";
import { Sex } from "../enums/sexes.js";

export type CreateUserData = {
    email: string;
    username: string;
    passwordHash: string;
    role: Role;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    sex?: Sex;
    height?: number;
};

export type UpdateUserData = {
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    sex?: Sex;
    height?: number;
};

export type UserCriteria = Pick<UserQuery, "userId" | "email" | "username">;