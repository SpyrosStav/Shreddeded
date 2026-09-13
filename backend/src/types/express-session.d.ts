import "express-session";
import type { SessionUser } from "./auth.types.js";

declare module "express-session" {
    interface SessionData {
        user?: SessionUser;
    }
}