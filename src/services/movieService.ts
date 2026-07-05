import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

const API_URL = 'https://api.themoviedb.org/3/search/movie';

export async function fetchMovies(
  query: string,
  page: number
): Promise<MoviesResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const response = await axios.get<MoviesResponse>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });

  return response.data;
}