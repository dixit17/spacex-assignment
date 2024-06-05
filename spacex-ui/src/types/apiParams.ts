
/**
 * Represents the parameters for an API request.
 * 
 * @typedef {Object} ApiParams
 * @property {number} limit - The number of results to return.
 * @property {number} offset - The number of results to skip.
 * @property {QueryOptions} query - Additional query options for filtering results.
 */
export interface ApiParams {
    limit: number;
    offset: number;

    query:QueryOptions;
}

/**
 * Represents additional query options for an API request.
 * 
 * @typedef {Object} QueryOptions
 * @property {string|boolean} [key] - Query options as key-value pairs.
 */
export interface QueryOptions {
    [key: string]: string | boolean;
}
