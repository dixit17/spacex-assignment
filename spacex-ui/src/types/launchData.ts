/**
 * Represents the data for a SpaceX launch.
 * 
 * @typedef {Object} LaunchData
 * @property {string} id - The unique identifier for the launch.
 * @property {string} name - The name of the launch.
 * @property {string} date - The date of the launch.
 * @property {boolean} success - Whether the launch was successful.
 * @property {string} details - Additional details about the launch.
 * @property {string} rocket - The rocket  used for the launch.
 * @property {string} image - URL to an image related to the launch.
 * @property {string} article - URL to an article about the launch.
 * @property {string} wikipedia - URL to the Wikipedia page for the launch.
 * @property {string} webcast - URL to the webcast of the launch.
 * @property {boolean} upcoming - Whether the launch is upcoming.
 * @property {LaunchFailure[]} failures - An array of failures associated with the launch.
 * @property {string} searchText - Keywords for searching the launch.
 */
export interface LaunchData {
    id: string;
    name: string;
    date: string;
    success: boolean;
    details: string;
    rocket: string;
    image: string;
    article: string;
    wikipedia: string;
    webcast: string;
    upcoming: boolean;
    failures: LaunchFailure[];
    searchText: string;
}

/**
 * Represents a failure that occurred during a SpaceX launch.
 * 
 * @typedef {Object} LaunchFailure
 * @property {number} time - The time (in seconds) after launch when the failure occurred.
 * @property {number|null} altitude - The altitude (in meters) at which the failure occurred, or null if unknown.
 * @property {string} reason - The reason for the failure.
 */
export interface LaunchFailure {
    time: number;
    altitude: number | null;
    reason: string;
}