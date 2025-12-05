export interface MovieProps {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  original_language: string;
  genre_ids?: number[];
  adult?: boolean;
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ApiMovieResponse {
  page: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}
export interface ApiSeriesResponse {
  page: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}
