import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  if (!movie || Object.keys(movie).length === 0) {
    return <div>Error: Movie data is not available</div>;
  }

  return (
    <div className='card card-side bg-base-100 shadow-xl h-full'>
      <figure className='w-1/3'>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'}
          alt={movie.Title}
          className='h-full w-full object-cover'
        />
      </figure>
      <div className='card-body w-2/3'>
        <h2 className='card-title'>{movie.Title}</h2>
        <p>Year: {movie.Year}</p>
        <p>Type: {movie.Type}</p>
        <div className='card-actions justify-end mt-auto'>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target='_blank'
            rel='noopener noreferrer'
            className='btn btn-primary'
          >
            View on IMDB
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
