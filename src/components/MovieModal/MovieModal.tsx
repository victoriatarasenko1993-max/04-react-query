import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { MouseEvent } from 'react';
import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://placehold.co/500x750?text=No+Image';

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeButton} type="button" onClick={onClose}>
          ×
        </button>

        <img className={css.image} src={imageUrl} alt={movie.title} />

        <div className={css.info}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.text}>
            Release date: {movie.release_date || 'Unknown'}
          </p>
          <p className={css.text}>Rating: {movie.vote_average.toFixed(1)}</p>
          <p className={css.overview}>
            {movie.overview || 'No overview available.'}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}