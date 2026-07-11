export type SortDirection = "ASC" | "DESC";

export type QueryOptions = {
    limit?: number;
    offset?: number;
    order?: [string, SortDirection][];
};