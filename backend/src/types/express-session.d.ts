import "express-session";
import { Role } from "../enums/roles";

declare module "express-session" {
    interface SessionData {
        user?: {
            id: string;
            role: Role;
        };
    }
}