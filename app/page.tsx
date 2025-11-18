import type { ApiMovieResponse, MovieProps } from "@/app/types";
import PageClient from "./PageClient";

export async function getPopulateMovies(): Promise<MovieProps[]> {
  const baseUrl = "https://api.themoviedb.org/3/discover/movie";
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("API_KEY não encontrada");
  }
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "pt-BR",
  });
  const response = await fetch(`${baseUrl}?${params.toString()}`);
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
  const response = await fetch(`${baseUrl}?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar filmes");
  }
  const data = (await response.json()) as ApiMovieResponse;
  return data.results;
}

export default async function Home() {
  const initialMovies = await getPopulateMovies();

  return <PageClient initialMovies={initialMovies} />;
}
