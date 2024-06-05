import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../Search';
import { SearchFilter } from '../../../types/search';
import * as matchers from "@testing-library/jest-dom";

const filterOptions: SearchFilter[] = [
  { name: 'Success', value: 'Success' },
  { name: 'Failure', value: 'Failure' },
  { name: 'Upcoming', value: 'Upcoming' },
];

const mockOnFilterSelect = jest.fn();
const mockOnInputSearch = jest.fn();

describe('Search Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Search component', () => {
    render(
      <Search
        filterOptions={filterOptions}
        onFilterSelect={mockOnFilterSelect}
        onInputSearch={mockOnInputSearch}
      />
    );

    expect(screen.getByPlaceholderText('search...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Filters')).toBeInTheDocument();
  });

  test('handles search input changes', async () => {
    render(
      <Search
        filterOptions={filterOptions}
        onFilterSelect={mockOnFilterSelect}
        onInputSearch={mockOnInputSearch}
      />
    );

    const searchInput = screen.getByPlaceholderText('search...');
    userEvent.type(searchInput, 'Falcon');

    await waitFor(() => {
      expect(mockOnInputSearch).toHaveBeenCalledWith('falcon');
    }, { timeout: 2000 });
  });

  test('handles filter selection from autocomplete dropdown', async () => {
    render(
      <Search
        filterOptions={filterOptions}
        onFilterSelect={mockOnFilterSelect}
        onInputSearch={mockOnInputSearch}
      />
    );

    // Open the autocomplete dropdown
    fireEvent.mouseDown(screen.getByPlaceholderText('Filters'));

    // Select the 'Success' option
    const successOption = await screen.findByText('Success');
    fireEvent.click(successOption);

    await waitFor(() => {
      expect(mockOnFilterSelect).toHaveBeenCalledWith(filterOptions[0]);
    }, { timeout: 2000 });
  });

  test('clears the search input', async () => {
    render(
      <Search
        filterOptions={filterOptions}
        onFilterSelect={mockOnFilterSelect}
        onInputSearch={mockOnInputSearch}
      />
    );

    const searchInput = screen.getByPlaceholderText('search...');
    userEvent.type(searchInput, 'Falcon');
    fireEvent.click(screen.getByLabelText('clear search'));
    expect(searchInput).toHaveValue('');
    await waitFor(() => {
      expect(mockOnInputSearch).toHaveBeenCalledWith("");
    }, { timeout: 2000 });
  });
});
