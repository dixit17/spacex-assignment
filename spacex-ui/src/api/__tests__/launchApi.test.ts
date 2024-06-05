import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchLaunchData } from "../launchApi";
import { ApiParams } from "../../types/apiParams";
import { LaunchData } from "../../types/launchData";

describe("fetchLaunchData", () => {
  const mock = new MockAdapter(axios);
  const baseURL = process.env.REACT_APP_API_URL;

  afterEach(() => {
    mock.reset();
  });

  it("should fetch launch data successfully", async () => {
    const mockLaunchData: LaunchData[] = [
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
    ];

    const options: ApiParams = {
      limit: 10,
      offset: 0,
      query:{}
    };

    mock
      .onGet(`${baseURL}/launches`, {
        params: {
          limit: options.limit,
          offset: options.offset,
          ...options.query,
        },
      })
      .reply(200, mockLaunchData);
    const result = await fetchLaunchData(options);
    expect(result).toEqual(mockLaunchData);
  });
  it("should fetch launch data successfully with query", async () => {
    const mockLaunchData: LaunchData[] = [
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

    const options: ApiParams = {
      limit: 10,
      offset: 0,
      query: {
        upcoming: true,
      },
    };

    mock
      .onGet(`${baseURL}/launches`, {
        params: {
          limit: options.limit,
          offset: options.offset,
          ...options.query,
        },
      })
      .reply(200, mockLaunchData);
    const result = await fetchLaunchData(options);
    expect(result).toEqual(mockLaunchData);
  });

  it("should handle errors correctly", async () => {
    const options: ApiParams = {
      limit: 10,
      offset: 0,
      query: {},
    };

    mock
      .onGet(`${baseURL}/launches`, {
        params: {
          limit: options.limit,
          offset: options.offset,
          ...options.query,
        },
      })
      .reply(500);
    await expect(fetchLaunchData(options)).rejects.toThrow(
      "Request failed with status code 500"
    );
  });
});
