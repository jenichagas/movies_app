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
  is_favorite?: boolean;
  account_states?: {
    favorite: boolean;
    rated: boolean | { value: number };
    watchlist: boolean;
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface Person {
  id: number;
  name: string;
  profile_path: string;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface ApiMovieResponse {
  page: number;
  results: MovieProps[] ;
  total_pages: number;
  total_results: number;
}

export interface ApiVideoResponse {
  id: number;
  results: Video[];
}

export interface ApiSeriesResponse {
  page: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}

export interface SessionData {
  request_token?: string;
  session_id?: string;
  account_id?: string;
  isLoggedIn?: boolean;
}
