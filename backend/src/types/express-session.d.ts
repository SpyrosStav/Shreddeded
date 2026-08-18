import "express-session";
import { Role } from "../enums/roles";
import type { SessionUser } from "./auth.types.ts";

declare module "express-session" {
    interface SessionData {
        user?: SessionUser;
    }
}