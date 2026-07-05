import css from './MovieCard.module.css';
import type { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export default function MovieCard({ movie, onSelect }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Image';

  return (
    <div className={css.card} onClick={() => onSelect(movie)}>
      <img className={css.image} src={imageUrl} alt={movie.title} />
      <div className={css.info}>
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.text}>
          Release date: {movie.release_date || 'Unknown'}
        </p>
        <p className={css.text}>Rating: {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}