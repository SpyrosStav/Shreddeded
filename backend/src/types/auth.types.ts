import { Role } from "../enums/roles.js";

export type SessionUser = {
    id: string;
    role: Role;
};