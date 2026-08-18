import { Role } from "../enums/roles";
import type { SessionUser } from "./auth.types.ts";

declare global {
    namespace Express {
        interface Request {
            context: {
                requestId: string;
                user?: SessionUser
            };
            validated?: {
                body?: unknown;
                params?: unknown;
                query?: unknown;
            };
        }
    }
}

export { };