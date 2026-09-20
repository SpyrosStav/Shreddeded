export type SortDirection = "ASC" | "DESC";

export type QueryOptions = {
    limit?: number;
    offset?: number;
    order?: [string, SortDirection][];
};

export type PaginatedResult<T> = {
    rows: T[];
    count: number;
};

export type PaginatedResponse<T> = {
    data: T[];
    meta: {
        total: number;
        limit?: number;
        offset?: number;
    };
};