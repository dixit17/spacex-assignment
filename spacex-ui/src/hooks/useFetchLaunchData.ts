import { useState, useCallback, useEffect, useRef } from "react";
import { fetchLaunchData } from "../api/launchApi";
import { LaunchData } from "../types/launchData";
import { QueryOptions } from "../types/apiParams";

interface FetchLaunchDataProps {
  limit: number;
  offset: number;
  query: QueryOptions;
}

interface FetchLaunchDataResult {
  launchesData: LaunchData[];
  combinedLaunchData: LaunchData[];
  loading: boolean;
  hasMoreData: boolean;
  fetchMoreData: () => void;
  setLoading: (loading: boolean) => void;
  resetData: () => void;
}

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
        setLaunchesData((prev) => (reset ? data : [...prev, ...data]));
        setCombinedLaunchData((prev) => (reset ? data : [...prev, ...data]));
        currentOffset.current += limit;
        setHasMoreData(data.length === limit);
      } catch (error) {
        console.error(error);
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
    setLoading,
    fetchMoreData,
    resetData,
  };
};

export default useFetchLaunchData;
