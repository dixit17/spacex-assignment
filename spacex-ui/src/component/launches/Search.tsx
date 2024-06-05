import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Chip,
  Typography,
  InputBase,
  InputAdornment,
  AppBar,
  Toolbar,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchFilter } from "../../types/search";
import { useDebouncedCallback } from "use-debounce";
import CancelIcon from "@mui/icons-material/Cancel";

interface SearchProps {
  filterOptions: SearchFilter[];
  onFilterSelect: (filterValue: SearchFilter) => void;
  onInputSearch: (search: string) => void;
}

const Search: React.FC<SearchProps> = ({
  filterOptions,
  onFilterSelect,
  onInputSearch,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<SearchFilter>();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedHandleOnChange = useDebouncedCallback((value: string) => {
    onInputSearch(value);
  }, 500);

  return (
    <AppBar className="w-100 launch-appbar">
      <Toolbar className="d-flex align-items-center w-100  p-1 launch-toolbar justify-content-between">
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{display: { xs: 'none', md: 'flex' }}}
        >
          SpaceX
        </Typography>
        <div className="d-flex h-100 justify-content-end flex-grow-1">
        <InputBase
          data-testid={"launch-input-search"}
          className="launch-search-input m-1 rounded-1 p-1 w-75"
          placeholder={"search..."}
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value);
            debouncedHandleOnChange(value.toLowerCase());
          }}
          endAdornment={
            searchQuery ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  onClick={() => {
                    setSearchQuery("");
                    debouncedHandleOnChange("");
                  }}
                  edge="end"
                >
                  <CancelIcon
                    style={{ fontSize: 20, margin: 4, color: "#ffffff" }}
                  />
                </IconButton>
              </InputAdornment>
            ) : (
              <InputAdornment position="end">
                <SearchIcon style={{ margin: 4, color: "#ffffff" }} />
              </InputAdornment>
            )
          }
        />
        <Autocomplete
      id="filter-menu"
      data-testid="autocomplete-filter"
      size="small"
      value={selectedFilter}
      onChange={(event, newValue) => {
        if(!!newValue){
          setSelectedFilter(newValue);
          onFilterSelect(newValue);
        }else{
          setSelectedFilter({
            name:"",
            value:"",
          });
          onFilterSelect({
            name:"",
            value:"",
          });
        }
      }}
      options={filterOptions}
      getOptionLabel={(option:any) => option?.name}
      className="rounded-1 m-1 launch-filter-button"
      renderInput={(params) => (
        <TextField {...params}  size="small" placeholder="Filters"  className="launch-filter-input"/>
      )}
    />
    </div>
      </Toolbar>
    </AppBar>
  );
};

export default Search;
