import { Role } from "../enums/roles.js";

export type SessionUser = {
    id: string;
    role: Role;
};

export interface LoginResult {
    id: string;
    username: string;
    role: Role;
};