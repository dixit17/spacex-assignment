import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  LinearProgress,
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Chip,
  Button,
  Tooltip,
} from "@mui/material";
import { LaunchData } from "../../types/launchData";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PlayDisabledIcon from "@mui/icons-material/PlayDisabled";
import Search from "./Search";
import { SearchFilter } from "../../types/search";
import Fuse from "fuse.js";
import useDebounce from "../../hooks/useDebounce";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";

/**
 * Props for the LaunchPage component.
 * 
 * @typedef {Object} LaunchPageProps
 * @property {LaunchData[]} data - The current data of launch.
 * @property {LaunchData[]} combinedData - All fetched launch data combined.
 * @property {SearchFilter[]} filterOptions - Options for filtering the launch data.
 * @property {(filterValue: SearchFilter) => void} applyFilter - Function to apply a selected filter.
 * @property {boolean} loading - Indicates if data is being loaded.
 * @property {() => void} onLoadMore - Function to load more data.
 * @property {boolean} hasMoreData - Indicates if there is more data to load.
 * @property {(loading: boolean) => void} setLoading - Function to set the loading state.
 */
interface LaunchPageProps {
  data: LaunchData[];
  combinedData: LaunchData[];
  filterOptions: SearchFilter[];
  applyFilter: (filterValue: SearchFilter) => void;
  loading: boolean;
  onLoadMore: () => void;
  setLoading: (loading: boolean) => void;
  hasMoreData: boolean;
}

/**
 * Determines the class for a list item border based on launch status.
 * 
 * @param {LaunchData} launch - The launch data.
 * @returns {string} - The status class.
 */
const getStatusClass = (launch: LaunchData) => {
  if (launch.success) {
    return "success";
  } else if (launch.failures.length > 0) {
    return "failure";
  } else {
    return "upcoming";
  }
};

/**
 * LaunchPage component - displays a list of SpaceX launches with search and filter options.
 * @Component
 * @param {LaunchPageProps} props - The props for the component.
 * @returns {JSX.Element} - The LaunchPage component.
 */

const LaunchPage: React.FC<LaunchPageProps> = ({
  data,
  combinedData,
  filterOptions,
  applyFilter,
  loading,
  onLoadMore,
  hasMoreData,
  setLoading,
}) => {
  const [filteredLaunches, setFilteredLaunches] = useState<LaunchData[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const fuse = new Fuse(combinedData, {
    keys: ["searchText", "name", "details", "rocket"],
    includeScore: true,
    minMatchCharLength: 5,
  });
  const debouncedLoading = useDebounce(loading, 200);
  const observerRef = useInfiniteScrolling({
    loading: debouncedLoading,
    hasMoreData,
    onLoadMore: onLoadMore,
  });
  useEffect(() => {
    if (!!searchText) {
      onInputSearch(searchText);
    } else {
      setFilteredLaunches(data);
    }
    setLoading(false);
  }, [data, setLoading, searchText]);

  const getDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }, []);

  const openLinkInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onInputSearch = (search: string) => {
    if (search) {
      const searchResult = fuse
        .search(search)
        .filter((result) => result.score && result.score <= 0.5)
        .map((result) => result.item);
      setFilteredLaunches(
        searchResult.length > 0 ? searchResult : combinedData
      );
    }
  };

  const getLaunchStatus = (launch: LaunchData) => {
    if (launch.success) {
      return (
        <Chip
          className="rounded-2 launch-success mt-1 w-100"
          label={
            <Typography
              variant="caption"
              className="fw-bold"
              style={{ color: "#ffffff" }}
            >
              Success
            </Typography>
          }
        />
      );
    } else if (launch.failures.length > 0) {
      return (
        <Chip
          className="rounded-2 launch-failure mt-1 w-100"
          label={
            <Typography
              variant="caption"
              className="fw-bold"
              style={{ color: "#ffffff" }}
            >
              Failure
            </Typography>
          }
        />
      );
    } else if (launch.upcoming) {
      return (
        <Chip
          className="rounded-2 launch-upcoming mt-1 w-100"
          label={
            <Typography
              variant="caption"
              className="fw-bold"
              style={{ color: "#ffffff" }}
            >
              Upcoming
            </Typography>
          }
        />
      );
    } else {
      return <></>;
    }
  };

    /**
   * Trims the launch details if they exceed the maximum allowed characters.
   * 
   * @param {string} details - The launch details.
   * @returns {string} - The trimmed details.
   */
  
  const maxCharsAllowed = (details: string) => {
    const maxChars = 350;
    if (details.length < maxChars) {
      return details;
    } else {
      let trimmed = details.substring(0, maxChars);
      return `${trimmed}...`;
    }
  };
  return (
    <>
      <div
        style={{ height: 50 }}
        className="w-100 launch-search d-flex align-items-center mt-1 rounded-1"
      >
        <Search
          filterOptions={filterOptions}
          onFilterSelect={applyFilter}
          onInputSearch={(search) => {
            setSearchText(search);
          }}
        />
      </div>
      <List
        className="m-1 p-1 d-flex flex-wrap w-100 overflow-x-hidden overflow-y-auto"
        style={{ height: "calc(100% - 60px)" }}
      >
        {filteredLaunches.map((launch: LaunchData, index: number) => (
          <ListItem
            className={`rounded-3 launch-list-item p-1 m-1  flex-column flex-grow-1 justify-content-center launch-list-item-${getStatusClass(
              launch
            )}`}
            key={`${launch.id}_${launch.date}_${index}`}
            style={{ cursor: "pointer" }}
          >
            <Card className="p-2 rounded-1 m-1 d-flex flex-column launch-card">
              <div className="d-flex align-items-center w-100 justify-content-center">
                <div className="launch-image-container m-1 rounded-3 p-1">
                  <img
                    src={!!launch.image ? launch.image : "/rocket.jpg"}
                    alt={launch.name}
                  />
                </div>
              </div>
              <CardContent className="w-100 p-1 launch-card-content">
                <div className="d-flex align-items-center w-100 justify-content-between">
                  <div className="w-50">
                    <Typography variant="h6">{launch.name}</Typography>
                    <Typography variant="subtitle2">
                      {getDate(launch.date)}
                    </Typography>
                  </div>
                  <div>{getLaunchStatus(launch)}</div>
                </div>
                {!!launch.details ? (
                  <Typography variant="body2" color="text.secondary">
                    {maxCharsAllowed(launch.details)}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No Details Available
                  </Typography>
                )}
              </CardContent>
              <CardActions className="p-1 mt-auto w-100 launch-card-action justify-content-between">
                {!!launch.webcast ? (
                  <Tooltip title="Watch Webcast" arrow>
                    <IconButton
                      className="p-1 h-100"
                      aria-label="youtube web cast"
                      onClick={(e) => openLinkInNewTab(launch.webcast)}
                    >
                      <YouTubeIcon
                        style={{ width: 30, height: 30, color: "red" }}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="No Webcast Available" arrow>
                    <IconButton
                      className="p-1  h-100"
                      aria-label="no video available"
                      disabled
                    >
                      <PlayDisabledIcon style={{ width: 30, height: 30 }} />
                    </IconButton>
                  </Tooltip>
                )}

                {!!launch.article && (
                  <Tooltip title="Read Article" arrow>
                    <Button
                      size="small"
                      onClick={(e) => openLinkInNewTab(launch.article)}
                    >
                      <Typography variant="subtitle2">Learn More</Typography>
                    </Button>
                  </Tooltip>
                )}
              </CardActions>
            </Card>
          </ListItem>
        ))}
        <div ref={observerRef} data-testid ="infinite-scroll-observer" />
      </List>
      {loading && (
        <Box className="w-100 m-1">
          <LinearProgress style={{ height: 5 }} />
        </Box>
      )}
      {!hasMoreData && <Typography>No more data</Typography>}
    </>
  );
};

export default LaunchPage;
