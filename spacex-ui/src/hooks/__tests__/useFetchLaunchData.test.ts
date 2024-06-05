import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useFetchLaunchData from "../useFetchLaunchData";
import { fetchLaunchData } from "../../api/launchApi";
import { LaunchData } from "../../types/launchData";
import { QueryOptions } from "../../types/apiParams";

const mock = new MockAdapter(axios);
const baseURL = process.env.REACT_APP_API_URL;

const mockLaunchData: LaunchData[] = [
  {
    id: "5eb87cd9ffd86e000604b32a",
    name: "FalconSat",
    date: "2006-03-24T22:30:00.000Z",
    success: false,
    upcoming: false,
    details: "Engine failure at 33 seconds and loss of vehicle",
    rocket: "5e9d0d95eda69955f709d1eb",
    image: "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png",
    article:
      "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
    wikipedia: "https://en.wikipedia.org/wiki/DemoSat",
    webcast: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
    failures: [
      {
        time: 33,
        altitude: null,
        reason: "merlin engine failure",
      },
    ],
    searchText: "failure",
  },
  {
    id: "5eb87cdaffd86e000604b32b",
    name: "DemoSat",
    date: "2007-03-21T01:10:00.000Z",
    success: true,
    upcoming: false,
    details:
      "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
    rocket: "5e9d0d95eda69955f709d1eb",
    image: "https://images2.imgbox.com/f9/4a/ZboXReNb_o.png",
    article:
      "https://www.space.com/3590-spacex-falcon-1-rocket-fails-reach-orbit.html",
    wikipedia: "https://en.wikipedia.org/wiki/DemoSat",
    webcast: "https://www.youtube.com/watch?v=Lk4zQ2wP-Nc",
    failures: [],
    searchText: "success",
  },
  {
    id: "5eb87cdbffd86e000604b32d",
    name: "RatSat",
    date: "2008-09-28T23:15:00.000Z",
    success: false,
    upcoming: true,
    details:
      "Ratsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1",
    rocket: "5e9d0d95eda69955f709d1eb",
    image: "https://images2.imgbox.com/95/39/sRqN7rsv_o.png",
    article: "https://en.wikipedia.org/wiki/Ratsat",
    wikipedia: "https://en.wikipedia.org/wiki/Ratsat",
    webcast: "https://www.youtube.com/watch?v=dLQ2tZEH6G0",
    failures: [],
    searchText: "upcoming",
  },
];

describe("useFetchLaunchData", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch data successfully and update states correctly", async () => {
    const limit = 2;
    const offset = 0;
    const query: QueryOptions = {};
    mock
      .onGet(`${baseURL}/launches`, { params: { limit, offset, ...query } })
      .reply(200, mockLaunchData);
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchLaunchData({ limit, offset, query })
    );
    act(() => {
      result.current.fetchMoreData();
    });
    await waitForNextUpdate();
    expect(result.current.launchesData).toEqual(mockLaunchData);
    expect(result.current.combinedLaunchData).toEqual(mockLaunchData);
    expect(result.current.loading).toBe(false);
  });

  it("should handle errors during data fetching", async () => {
    const limit = 2;
    const offset = 0;
    const query: QueryOptions = {};

    mock
      .onGet(`${baseURL}/launches`, { params: { limit, offset, ...query } })
      .reply(500);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchLaunchData({ limit, offset, query })
    );

    act(() => {
      result.current.fetchMoreData();
    });

    await waitForNextUpdate({ timeout: 2000 });

    expect(result.current.loading).toBe(false);
  });

  it("should reset data and fetch from the beginning", async () => {
    const limit = 2;
    const offset = 0;
    const query: QueryOptions = {};

    mock
      .onGet(`${baseURL}/launches`, { params: { limit, offset, ...query } })
      .reply(200, mockLaunchData);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchLaunchData({ limit, offset, query })
    );

    act(() => {
      result.current.fetchMoreData();
    });

    await waitForNextUpdate({ timeout: 2000 });

    expect(result.current.launchesData).toEqual(mockLaunchData);

    mock
      .onGet(`${baseURL}/launches`, { params: { limit, offset, ...query } })
      .reply(200, mockLaunchData);

    act(() => {
      result.current.resetData();
    });

    await waitForNextUpdate();

    expect(result.current.launchesData).toEqual(mockLaunchData);
    expect(result.current.combinedLaunchData).toEqual(mockLaunchData);
    expect(result.current.loading).toBe(false);
  });

  it("should set loading state correctly while fetching data", async () => {
    const limit = 2;
    const offset = 0;
    const query: QueryOptions = {};

    mock
      .onGet(`${baseURL}/launches`, { params: { limit, offset, ...query } })
      .reply(200, mockLaunchData);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchLaunchData({ limit, offset, query })
    );

    act(() => {
      result.current.fetchMoreData();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
  });
});
