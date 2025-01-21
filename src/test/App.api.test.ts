import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from '../App';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

test('fetches and displays movie data from API', async () => {
  const mockResponse = {
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

  axios.get.mockImplementation(() => Promise.resolve(mockResponse));

  render(React.createElement(App, {}));

  fireEvent.change(screen.getByPlaceholderText('Search for movies...'), {
    target: { value: 'The Shawshank Redemption' },
  });
  fireEvent.click(screen.getByText('Search'));

  await waitFor(() => {
    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
    expect(screen.getByText('Year: 1994')).toBeInTheDocument();
    expect(screen.getAllByText('Type: movie')[0]).toBeInTheDocument();
  });
});
