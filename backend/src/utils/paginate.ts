import type { PaginatedResult, PaginatedResponse, QueryOptions } from "../types/shared.types.js";

export function toPaginatedResponse<T>(
    result: PaginatedResult<T>,
    options: QueryOptions
): PaginatedResponse<T> {
    return {
        data: result.rows,
        meta: {
            total: result.count,
            limit: options.limit,
            offset: options.offset,
        },
    };
}