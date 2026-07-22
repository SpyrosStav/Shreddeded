import { Role } from "../enums/roles";

declare global {
    namespace Express {
        interface Request {
            context: {
                requestId: string;
                user?: {
                    id: string;
                    role: Role;
                }
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