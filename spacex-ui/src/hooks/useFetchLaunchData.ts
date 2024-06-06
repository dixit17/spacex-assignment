import { useState, useCallback, useRef } from "react";
import { fetchLaunchData } from "../api/launchApi";
import { LaunchData } from "../types/launchData";
import { QueryOptions } from "../types/apiParams";

/**
* Props for the useFetchLaunchData hook.
* 
* @typedef {Object} FetchLaunchDataProps
* @property {number} limit - The number of items to fetch per request.
* @property {number} offset - The initial offset for fetching data.
* @property {QueryOptions} query - Query options for fetching data.
*/
interface FetchLaunchDataProps {
  limit: number;
  offset: number;
  query: QueryOptions;
}

/**
 * Result returned by the useFetchLaunchData hook.
 * 
 * @typedef {Object} FetchLaunchDataResult
 * @property {LaunchData[]} launchesData - The current page of launch data.
 * @property {LaunchData[]} combinedLaunchData - All fetched launch data combined.
 * @property {boolean} loading - Indicates if data is being loaded.
 * @property {boolean} hasMoreData - Indicates if there is more data to load.
 * @property {string|null} error - Error message if an error occurs, otherwise null.
 * @property {() => void} fetchMoreData - Function to load more data.
 * @property {(loading: boolean) => void} setLoading - Function to set the loading state.
 * @property {() => void} resetData - Function to reset the data.
 */
interface FetchLaunchDataResult {
  launchesData: LaunchData[];
  combinedLaunchData: LaunchData[];
  loading: boolean;
  hasMoreData: boolean;
  error:string | null;
  fetchMoreData: () => void;
  setLoading: (loading: boolean) => void;
  resetData: () => void;
}

/**
 * Custom hook to fetch launch data from the SpaceX API.
 * 
 * @param {FetchLaunchDataProps} props - The props for the hook.
 * @returns {FetchLaunchDataResult} - The result of the fetch operation.
 */
const useFetchLaunchData = ({
  limit,
  offset,
  query,
}: FetchLaunchDataProps): FetchLaunchDataResult => {
  const [launchesData, setLaunchesData] = useState<LaunchData[]>([]);
  const [combinedLaunchData, setCombinedLaunchData] = useState<LaunchData[]>(
    []
  );
  const [loading, setLoading] =useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentOffset = useRef<number>(offset);

  const fetchData = useCallback(
    async (reset: boolean = false) => {
      setLoading(true);
      if (reset) {
        currentOffset.current = 0;
      }
      try {
        const data = await fetchLaunchData({
          limit,
          offset: currentOffset.current,
          query,
        });
        setError("");
        setLaunchesData((prev) => (reset ? data : [...prev, ...data]));
        setCombinedLaunchData((prev) => (reset ? data : [...prev, ...data]));
        currentOffset.current += limit;
        setHasMoreData(data.length === limit);
      } catch (error) {
        setError('Unable to retrieve launch data');
      } finally {
        setLoading(false);
      }
    },
    [query, limit]
  );

  const fetchMoreData = () => {
    if (!loading && hasMoreData) {
      fetchData();
    }
  };

  const resetData = () => {
    fetchData(true);
   
  };

  return {
    launchesData,
    combinedLaunchData,
    loading,
    hasMoreData,
    error,
    setLoading,
    fetchMoreData,
    resetData,
  };
};

export default useFetchLaunchData;
