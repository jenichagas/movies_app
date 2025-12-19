import type { ApiMovieResponse, MovieProps } from "@/app/types";
import PageClient from "./PageClient";

export async function getPopulateMovies(
  genreId?: string
): Promise<MovieProps[]> {
  const baseUrl = "https://api.themoviedb.org/3/discover/movie";
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("API_KEY não encontrada");
  }
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "pt-BR",
    limit: "28",
  });

  if (genreId) {
    params.append("with_genres", genreId);
  }

  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar filmes");
  }
  const data = (await response.json()) as ApiMovieResponse;
  return data.results;
}

export async function searchMovies(query: string): Promise<MovieProps[]> {
  const baseUrl = "https://api.themoviedb.org/3/search/movie";
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("API_KEY não encontrada");
  }
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "pt-BR",
    query: query,
  });
  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar filmes");
  }
  const data = (await response.json()) as ApiMovieResponse;
  return data.results;
}

export async function getPopularMovies(): Promise<MovieProps[]> {
  const baseUrl = "https://api.themoviedb.org/3/movie/top_rated";
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("API_KEY não encontrada");
  }
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "pt-BR",
  });
  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar filmes populares");
  }
  const data = (await response.json()) as ApiMovieResponse;
  return data.results;
}

export async function getTvSeries(): Promise<MovieProps[]> {
  const baseUrl = "https://api.themoviedb.org/3/tv/airing_today";
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("API_KEY não encontrada");
  }
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "pt-BR",
  });
  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar séries");
  }
  const data = await response.json();

  interface ApiTvSeries {
    id: string;
    name: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    genre_ids: number[];
    original_language: string;
  }

  const adaptedResults: MovieProps[] = data.results.map(
    (series: ApiTvSeries) => ({
      id: series.id,
      title: series.name,
      overview: series.overview,
      poster_path: series.poster_path,
      vote_average: series.vote_average,
      vote_count: series.vote_count,
      release_date: series.first_air_date,
      genre_ids: series.genre_ids,
      original_language: series.original_language,
    })
  );

  return adaptedResults;
}

export async function getUpcomingMovies() {
  const baseUrl = "https://api.themoviedb.org/3/movie/upcoming";
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("API_KEY não encontrada");
  }
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "pt-BR",
  });
  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar filmes em breve");
  }
  const data = (await response.json()) as ApiMovieResponse;
  return data.results;
}
export async function getCinemaMovies() {
  const baseUrl = "https://api.themoviedb.org/3/movie/now_playing";
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("API_KEY não encontrada");
  }
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "pt-BR",
  });
  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar filmes em breve");
  }
  const data = (await response.json()) as ApiMovieResponse;
  return data.results;
}

export async function getGenres() {
  const baseUrl = "https://api.themoviedb.org/3/genre/movie/list";
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("API_KEY não encontrada");
  }
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "pt-BR",
  });
  const response = await fetch(`${baseUrl}?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar gêneros");
  }
  const data = await response.json();
  return data.genres;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categoryId = (await searchParams)?.category as string | undefined;
  const initialMovies = await getPopulateMovies(categoryId);
  const genres = await getGenres();
  const initialActiveMenu = categoryId ? "" : "filmes";

  return (
    <div>
      <PageClient
        initialMovies={initialMovies}
        genres={genres}
        initialActiveMenu={initialActiveMenu}
      />
    </div>
  );
}
