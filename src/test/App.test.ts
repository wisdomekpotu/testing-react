import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

test('App component fetches and renders correct movies when search term is submitted', async () => {
  const mockMovieData = {
    data: {
      Search: [
        {
          Title: 'The Shawshank Redemption',
          Year: '1994',
          imdbID: 'tt0111161',
          Type: 'movie',
          Poster: 'https://example.com/poster.jpg',
        },
      ],
    },
  };

  axios.get.mockImplementation(() => Promise.resolve(mockMovieData));

  render(React.createElement(App, {}));

  const searchInput = screen.getByPlaceholderText('Search for movies...');
  const searchButton = screen.getByText('Search');

  fireEvent.change(searchInput, {
    target: { value: 'The Shawshank Redemption' },
  });
  fireEvent.click(searchButton);

  // Wait for the movie title to appear
  const movieTitle = await screen.findByText('The Shawshank Redemption');
  expect(movieTitle).toBeInTheDocument();
  expect(screen.getByText('Year: 1994')).toBeInTheDocument();
});

test('App component displays loading state when search term is submitted', async () => {
  axios.get.mockImplementation(() => new Promise(() => {}));

  render(React.createElement(App, {}));

  const searchInput = screen.getByPlaceholderText('Search for movies...');
  const searchButton = screen.getByText('Search');

  fireEvent.change(searchInput, {
    target: { value: 'The Shawshank Redemption' },
  });
  fireEvent.click(searchButton);

  // Check if the loading spinner is displayed
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});

test('App component hides loading state when movies are fetched', async () => {
  const mockMovieData = {
    data: {
      Search: [
        {
          Title: 'The Shawshank Redemption',
          Year: '1994',
          imdbID: 'tt0111161',
          Type: 'movie',
          Poster: 'https://example.com/poster.jpg',
        },
      ],
    },
  };

  // Mock the API call to resolve with mock data
  axios.get.mockImplementation(() => Promise.resolve(mockMovieData));

  render(React.createElement(App, {}));

  const searchInput = screen.getByPlaceholderText('Search for movies...');
  const searchButton = screen.getByText('Search');

  // Simulate user input and form submission
  fireEvent.change(searchInput, {
    target: { value: 'The Shawshank Redemption' },
  });
  fireEvent.click(searchButton);

  // Wait for the loading spinner to disappear
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  // Verify that the movie details are rendered
  expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
  expect(screen.getByText('Year: 1994')).toBeInTheDocument();
});

// test('App component displays error message when movie data fetching fails', async () => {
//   // Mock the API call to reject with an error
//   axios.get.mockImplementation(() =>
//     Promise.reject(new Error('Failed to fetch movies. Please try again.'))
//   );

//   render(React.createElement(App, {}));

//   const searchInput = screen.getByPlaceholderText('Search for movies...');
//   const searchButton = screen.getByText('Search');

//   // Simulate user input and form submission
//   fireEvent.change(searchInput, {
//     target: { value: 'The Shawshank Redemption' },
//   });
//   fireEvent.click(searchButton);

//   // Wait for the error message to appear
//   const errorMessage = await screen.findByText(
//     /Failed to fetch movies\. Please try again\./i
//   );
//   expect(errorMessage).toBeInTheDocument();
// });

test('App component hides error message when movies are fetched successfully', async () => {
  const mockMovieData = {
    data: {
      Search: [
        {
          Title: 'The Shawshank Redemption',
          Year: '1994',
          imdbID: 'tt0111161',
          Type: 'movie',
          Poster: 'https://example.com/poster.jpg',
        },
      ],
    },
  };

  axios.get.mockImplementation(() => Promise.resolve(mockMovieData));

  render(React.createElement(App, {}));

  const searchInput = screen.getByPlaceholderText('Search for movies...');
  const searchButton = screen.getByText('Search');

  fireEvent.change(searchInput, {
    target: { value: 'The Shawshank Redemption' },
  });
  fireEvent.click(searchButton);

  // Wait for the movie title to appear
  const movieTitle = await screen.findByText('The Shawshank Redemption');
  expect(movieTitle).toBeInTheDocument();
  expect(screen.getByText('Year: 1994')).toBeInTheDocument();

  // Ensure the error message is not present
  expect(
    screen.queryByText('Failed to fetch movie data')
  ).not.toBeInTheDocument();
});

vi.restoreAllMocks();
