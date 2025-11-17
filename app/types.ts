export interface MovieProps {
  id: string;
  title: string;
  overview:string
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: number,
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  original_language: string,

}

export interface ApiMovieResponse {
  page: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}
