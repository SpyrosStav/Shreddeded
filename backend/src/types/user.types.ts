import { Role } from "../enums/roles.js";
import { Sex } from "../enums/sexes.js";

export type CreateUserData = {
    email: string;
    username: string;
    passwordHash: string;
    role: Role;

    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    sex?: Sex;
    height?: number;
};