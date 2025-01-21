import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieCard from '../components/MovieCard';

const mockMovie = {
  Title: 'The Shawshank Redemption',
  Year: '1994',
  imdbID: 'tt0111161',
  Type: 'movie',
  Poster: 'https://example.com/poster.jpg',
};

describe('MovieCard component', () => {
  it('renders movie details correctly', () => {
    render(React.createElement(MovieCard, { movie: mockMovie }));

    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
    expect(screen.getByText('Year: 1994')).toBeInTheDocument();
    expect(screen.getByText('Type: movie')).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'The Shawshank Redemption');
    expect(image).toHaveAttribute('src', 'https://example.com/poster.jpg');
  });

  it('renders a placeholder image when the poster is not available', () => {
    const mockMovieWithoutPoster = {
      Title: 'The Shawshank Redemption',
      Year: '1994',
      imdbID: 'tt0111161',
      Type: 'movie',
      Poster: 'N/A',
    };

    render(React.createElement(MovieCard, { movie: mockMovieWithoutPoster }));

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'The Shawshank Redemption');
    expect(image).toHaveAttribute('src', '/placeholder-movie.jpg');
  });

  it('renders an error message when the movie prop is empty', () => {
    render(React.createElement(MovieCard, { movie: {} }));

    expect(
      screen.getByText('Error: Movie data is not available')
    ).toBeInTheDocument();
  });

  it('renders an error message when the movie prop is null', () => {
    render(React.createElement(MovieCard, { movie: null }));

    expect(
      screen.getByText('Error: Movie data is not available')
    ).toBeInTheDocument();
  });
});
