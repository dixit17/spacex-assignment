
import axios, {AxiosResponse } from 'axios';
import { ApiParams } from "../types/apiParams";
import { LaunchData } from "../types/launchData";

const { REACT_APP_API_URL } = process.env;
const baseURL = REACT_APP_API_URL;


/**
 * Fetches launch data from the SpaceX API.
 * 
 * @param {ApiParams} options - The parameters for the API request, including limit, offset, and query filters.
 * @returns {Promise<LaunchData[]>} - A promise that resolves to an array of launch data.
 * @throws Will throw an error if the request fails.
 */
export const fetchLaunchData = async (options:ApiParams):Promise<LaunchData[]> => {
    try {
        const response: AxiosResponse<LaunchData[]> = await axios<LaunchData[]>({
            method: "get",
            url: `${baseURL}/launches`,
            params: { 
              limit: options.limit,
              offset: options.offset,
              ...options.query
            }
          });
        return response.data;
      } catch (error) {
        throw error;
      }
  };
  