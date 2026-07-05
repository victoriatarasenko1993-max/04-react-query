import css from './MovieGrid.module.css';
import MovieCard from '../MovieCard/MovieCard';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map(movie => (
        <li className={css.item} key={movie.id}>
          <MovieCard movie={movie} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}