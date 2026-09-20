import type { UserQuery } from "./user.validation.js";
import { Role } from "../../enums/roles.js";
import { Sex } from "../../enums/sexes.js";

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

export type UserCriteria = Pick<UserQuery, "id" | "email" | "username">;

export type UserAttributes = {
    id: string;
    email: string;
    username: string;
    role: Role;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
    sex: Sex | null;
    height: number | null;
    createdAt: Date;
    updatedAt: Date;
}