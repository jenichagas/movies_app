import MovieGrid from "@/components/MovieGrid";
import type { ApiMovieResponse, MovieProps } from "@/app/types";


async function getMovies(): Promise<MovieProps[]> {
  const baseUrl = "https://api.themoviedb.org/3/discover/movie";
  if (!process.env.API_KEY) {
    throw new Error("API_KEY não encontrada");
  }
  const params = new URLSearchParams({
    api_key: process.env.API_KEY,
    language: "pt-BR",
  });
  const response = await fetch(`${baseUrl}?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar filmes");
  }
  const data = (await response.json()) as ApiMovieResponse;
  return data.results;
}

export default async function Home() {
  const movies = await getMovies();
  console.log('Filmes recebidos na página antes de passar para o Grid:', movies);

  return (
    <div className="">
      <MovieGrid movies={movies} />
    </div>
  );
}
