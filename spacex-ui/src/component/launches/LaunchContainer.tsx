import React, { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { SearchFilter } from "../../types/search";
import LaunchPage from "./LaunchPage";
import useFetchLaunchData from "../../hooks/useFetchLaunchData";
import { QueryOptions } from "../../types/apiParams";

const LaunchContainer: React.FC = () => {
  const [query, setQuery] = useState<QueryOptions>({});
  const initialLoad = useRef(true);
  const {
    launchesData,
    loading,
    hasMoreData,
    combinedLaunchData,
    fetchMoreData,
    resetData,
    setLoading,
  } = useFetchLaunchData({
    limit: 50,
    offset: 0,
    query,
  });

  const filterOptions: SearchFilter[] = [
    { name: "Success", value: "Success" },
    { name: "Failure", value: "Failure" },
    { name: "Upcoming", value: "Upcoming" },
  ];

  useEffect(() => {
    if (initialLoad.current) {
      resetData();
    }
  }, [resetData]);

  useEffect(() => {
    if (!initialLoad.current) {
      console.log("intial loading");
      resetData();
    }
    initialLoad.current = false;
  }, [query]);

  const applyFilter = (filter: SearchFilter) => {
    let tempQuery = Object.keys(query).reduce((acc, curr) => {
      if (
        !filterOptions.some(
          (s) => s.name.toLowerCase() === curr.toLocaleLowerCase()
        )
      ) {
        acc[curr] = query[curr];
      }
      return acc;
    }, {} as QueryOptions);
    if (!!filter.value) {
      setQuery({ ...tempQuery, [filter.name.toLowerCase()]: !!filter.value });
    } else {
      setQuery({ ...tempQuery });
    }
  };

  const onLoadMore = () => {
    fetchMoreData();
  };

  return (
    <div data-testid="launch-container" className="h-100 w-100 d-flex flex-column align-items-center">
      <LaunchPage
        data={launchesData}
        combinedData={combinedLaunchData}
        filterOptions={filterOptions}
        applyFilter={applyFilter}
        loading={loading}
        onLoadMore={onLoadMore}
        hasMoreData={hasMoreData}
        setLoading={setLoading}
      />
    </div>
  );
};

export default LaunchContainer;
