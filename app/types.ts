export interface MovieProps {
  id: string;
  title: string;
  overview:string
  poster_path: string;
  vote_average: number;
}

export interface ApiMovieResponse {
  page: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}
