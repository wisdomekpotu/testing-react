import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import { Movie } from './types';
import { Bugfender } from '@bugfender/sdk';

const API_KEY = 'YOUR OMDB API kEY'; // Replace with your OMDB API key
const API_URL = 'https://www.omdbapi.com';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = async (searchTerm: string) => {
    if (!searchTerm) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}/?apikey=${API_KEY}&s=${searchTerm}`
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      console.log('Error:', err);
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    Bugfender.log('App Created');
  }, []);
  return (
    <div className='min-h-screen bg-base-200 p-4'>
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8'>Movie Search</h1>
        <SearchBar onSearch={searchMovies} />

        {loading && (
          <div className='flex justify-center mt-8'>
            <span
              className='loading loading-spinner loading-lg'
              data-testid='loading-spinner'
            ></span>
          </div>
        )}

        {error && (
          <div className='alert alert-error mt-4'>
            <span>{error}</span>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
