import axios from "axios";
import { LaunchData } from "../types/launchData";
import {ApiParams} from "../types/apiParams";

export const getLaunches = async (options: ApiParams): Promise<LaunchData[]> => {
  const { limit = 50, offset = 0, query } = options;
  let launchQuery: any = {};
  if (query.success) {
    launchQuery.success = true;
  }
  if(query.failure) {
    launchQuery['failures.0'] = { $exists: true };
  }
  if(query.upcoming) {
    launchQuery.upcoming = true;
  }

  try {
  const response = await axios({
    method: "post",
    url: "https://api.spacexdata.com/v5/launches/query",
    data: {
      query: launchQuery,
      options: {
        limit: limit ,
        offset: offset,
      },
    },
  })
  let launches = response.data.docs;
    const transformedData: LaunchData[] = launches.map((launch: any) => ({
        id: launch.id,
        name: launch.name,
        date: launch.date_utc,
        success: launch.success,
        upcoming: launch.upcoming,
        details: launch.details,
        rocket: launch.rocket,
        image: launch.links?.patch?.small,
        article: launch.links?.article,
        wikipedia: launch.links?.wikipedia,
        webcast: launch.links?.webcast,
        failures: launch.failures || [],
        searchText: createSearchString(launch)
      }));
    
      return transformedData;
    } catch (error) {
      console.error('Error fetching launches:', error);
      throw error;
    }
    
};

const createSearchString = (launch: LaunchData) => {
  const keywords = [];
  if (launch.success) keywords.push("success");
  if (launch.upcoming) keywords.push("upcoming");
  if (launch.failures.length>0)  keywords.push("failure");
  keywords.push(launch.rocket);
  keywords.push(launch.name);
  return keywords.join(" ");
};
