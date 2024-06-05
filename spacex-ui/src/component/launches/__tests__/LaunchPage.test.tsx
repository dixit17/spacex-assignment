import React from "react";
import * as matchers from "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import LaunchPage from "../LaunchPage";
import { LaunchData } from "../../../types/launchData";
import { SearchFilter } from "../../../types/search";

jest.mock("fuse.js");
jest.mock("../../../hooks/useDebounce");
jest.mock("../../../hooks/useInfiniteScrolling");

const mockLaunchData: LaunchData[] = [
  {
    id: "1",
    name: "FalconSat",
    date: "2006-03-24T22:30:00.000Z",
    success: false,
    upcoming: false,
    details: "Engine failure at 33 seconds and loss of vehicle",
    rocket: "Falcon 1",
    image: "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
    article:
      "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
    wikipedia: "https://en.wikipedia.org/wiki/DemoSat",
    webcast: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
    failures: [{ time: 33, altitude: null, reason: "merlin engine failure" }],
    searchText: "failure",
  },
  {
    id: "5eb87cdbffd86e000604b32d",
    name: "RatSat",
    date: "2008-09-28T23:15:00.000Z",
    success: true,
    upcoming: false,
    details:
      "Ratsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1",
    rocket: "5e9d0d95eda69955f709d1eb",
    image: "https://images2.imgbox.com/95/39/sRqN7rsv_o.png",
    article: "https://en.wikipedia.org/wiki/Ratsat",
    wikipedia: "https://en.wikipedia.org/wiki/Ratsat",
    webcast: "https://www.youtube.com/watch?v=dLQ2tZEH6G0",
    failures: [],
    searchText: "success",
  },
];

const filterOptions: SearchFilter[] = [
  { name: "Success", value: "Success" },
  { name: "Failure", value: "Failure" },
  { name: "Upcoming", value: "Upcoming" },
];

const mockApplyFilter = jest.fn();
const mockOnLoadMore = jest.fn();
const mockSetLoading = jest.fn();

function setup(props = {}) {
    return render(
        <LaunchPage
        data={mockLaunchData}
        combinedData={mockLaunchData}
        filterOptions={filterOptions}
        applyFilter={mockApplyFilter}
        loading={false}
        onLoadMore={mockOnLoadMore}
        hasMoreData={true}
        setLoading={mockSetLoading}
        {...props}
      />
    );
  }

describe("LaunchPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders LaunchPage and displays initial data", () => {
    setup()
    expect(screen.getByText("RatSat")).toBeInTheDocument();
    expect(screen.getByText("FalconSat")).toBeInTheDocument();
  });

  test("handles search input and updates the displayed data", async () => {
    setup()
    fireEvent.change(screen.getByPlaceholderText("search..."), { target: { value: 'FalconSat' }});

    await waitFor(() => {
      expect(screen.getByText("FalconSat")).toBeInTheDocument();
    },{ timeout: 2000 });
  });

  test('loads more data on scroll', async () => {
    const mockOnLoadMore = jest.fn();
    setup({ onLoadMore: mockOnLoadMore , hasMoreData:true, loading:false});
    fireEvent.scroll(screen.getByTestId('infinite-scroll-observer'));
  await waitFor(() => expect(mockOnLoadMore).toHaveBeenCalledTimes(1));
  });

  test("displays loading indicator when loading is true", () => {
    render(
      <LaunchPage
        data={mockLaunchData}
        combinedData={mockLaunchData}
        filterOptions={filterOptions}
        applyFilter={mockApplyFilter}
        loading={true}
        onLoadMore={mockOnLoadMore}
        hasMoreData={true}
        setLoading={mockSetLoading}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test('displays "No more data" message when hasMoreData is false', () => {
    render(
      <LaunchPage
        data={mockLaunchData}
        combinedData={mockLaunchData}
        filterOptions={filterOptions}
        applyFilter={mockApplyFilter}
        loading={false}
        onLoadMore={mockOnLoadMore}
        hasMoreData={false}
        setLoading={mockSetLoading}
      />
    );
    expect(screen.getByText("No more data")).toBeInTheDocument();
  });
});
