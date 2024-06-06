import React, { useState, useEffect, useRef } from "react";
import { SearchFilter } from "../../types/search";
import LaunchPage from "./LaunchPage";
import useFetchLaunchData from "../../hooks/useFetchLaunchData";
import { QueryOptions } from "../../types/apiParams";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Button } from "@mui/material";
import ErrorPage from "../error/ErrorPage";
/**
 * LaunchContainer component - handles fetching and displaying SpaceX launch data.
 *
 * @component
 * @example
 * return (
 *   <LaunchContainer />
 * )
 */
const LaunchContainer: React.FC = () => {
  const [query, setQuery] = useState<QueryOptions>({});
  const initialLoad = useRef(true);
  /**
   * Custom hook to fetch data.
   */

  const {
    launchesData,
    loading,
    hasMoreData,
    combinedLaunchData,
    error,
    fetchMoreData,
    resetData,
    setLoading,
  } = useFetchLaunchData({
    limit: 50,
    offset: 0,
    query,
  });

  /**
   * Filter options for the launch data filtering.
   */
  const filterOptions: SearchFilter[] = [
    { name: "Success", value: "Success" },
    { name: "Failure", value: "Failure" },
    { name: "Upcoming", value: "Upcoming" },
  ];

  useEffect(() => {
    if (initialLoad.current && !error) {
      resetData();
    }
  }, [resetData]);

  useEffect(() => {
    if (!initialLoad.current && !error) {
      resetData();
    }
    initialLoad.current = false;
  }, [query]);

  /**
   * Applies the selected filter to the query state.
   * Creates a new object by removing previous keys from the query
   * @param {SearchFilter} filter - The filter to apply.
   */

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

  /**
   * Handles loading more data when requested.
   */
  const onLoadMore = () => {
    if (!error) {
    fetchMoreData();
    }
  };

  return (
    <>
      <div
        data-testid="launch-container"
        className="h-100 w-100 d-flex flex-column align-items-center"
      >
        {!error ? 
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
        :<ErrorPage errorMessage={error}/>}
      </div>
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert severity="error" className="w-100" 
        action={
            <Button color="inherit" size="small" onClick={(e) => resetData()}>
              Retry
            </Button>
          }>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LaunchContainer;
