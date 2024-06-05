
import axios, {AxiosResponse } from 'axios';
import { ApiParams } from "../types/apiParams";
import { LaunchData } from "../types/launchData";

const { REACT_APP_API_URL } = process.env;
const baseURL = REACT_APP_API_URL;


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
  