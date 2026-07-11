declare namespace Express {
    export interface Request {
        context: {
            requestId: string;
            user: string;
        };
        validated?: {
            body?: unknown;
            params?: unknown;
            query?: unknown;
        };
        user?: {
            id?: string;
        }
    }
}