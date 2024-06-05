export interface ApiParams {
    limit: number;
    offset: number;

    query:QueryOptions;
}

export interface QueryOptions {
    [key: string]: string | boolean;
}
