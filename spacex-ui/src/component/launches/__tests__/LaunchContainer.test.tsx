import React from 'react';
import * as matchers from "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LaunchContainer from '../LaunchContainer';
import useFetchLaunchData from '../../../hooks/useFetchLaunchData';
import { LaunchData } from '../../../types/launchData';
jest.mock('../../../hooks/useFetchLaunchData');

const mockUseFetchLaunchData = useFetchLaunchData as jest.Mock;

const mockLaunchData: LaunchData[] = [
  {
    id: '1',
    name: 'FalconSat',
    date: '2006-03-24T22:30:00.000Z',
    success: false,
    upcoming: false,
    details: 'Engine failure at 33 seconds and loss of vehicle',
    rocket: 'Falcon 1',
    image: 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png',
    article: 'https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html',
    wikipedia: 'https://en.wikipedia.org/wiki/DemoSat',
    webcast: 'https://www.youtube.com/watch?v=0a_00nJ_Y88',
    failures: [{ time: 33, altitude: null, reason: 'merlin engine failure' }],
    searchText: 'failure',
  },
  {
    id: '2',
    name: 'DemoSat',
    date: '2007-03-21T01:10:00.000Z',
    success: true,
    upcoming: false,
    details:
      'Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage',
    rocket: 'Falcon 1',
    image: 'https://images2.imgbox.com/f9/4a/ZboXReNb_o.png',
    article: 'https://www.space.com/3590-spacex-falcon-1-rocket-fails-reach-orbit.html',
    wikipedia: 'https://en.wikipedia.org/wiki/DemoSat',
    webcast: 'https://www.youtube.com/watch?v=Lk4zQ2wP-Nc',
    failures: [],
    searchText: 'success',
  },
];

describe('LaunchContainer Component', () => {
  beforeEach(() => {
    mockUseFetchLaunchData.mockReturnValue({
      launchesData: mockLaunchData,
      loading: false,
      hasMoreData: true,
      combinedLaunchData: mockLaunchData,
      fetchMoreData: jest.fn(),
      resetData: jest.fn(),
      setLoading: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders LaunchContainer and checks initial state', () => {
    render(<LaunchContainer />);
    expect(screen.getByTestId('launch-container')).toBeInTheDocument();
  });

  test('calls resetData on initial load', () => {
    render(<LaunchContainer />);
    expect(mockUseFetchLaunchData().resetData).toHaveBeenCalled();
  });
});
