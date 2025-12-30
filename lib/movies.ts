import type { ApiMovieResponse, MovieProps, Genre, Person, Video, ApiVideoResponse } from "@/app/types";
import { ActionResponse, successResponse, errorResponse } from "./action-response";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  throw new Error("TMDB_API_KEY não encontrada nas variáveis de ambiente. A aplicação não pode iniciar.");
}

async function fetchFromTMDB(path: string, params: Record<string, string> = {}, options: RequestInit = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.append("api_key", API_KEY!);
  url.searchParams.append("language", "pt-BR");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  const defaultOptions: RequestInit = {
    next: { revalidate: 3600 },
  };

  const response = await fetch(url.toString(), { ...defaultOptions, ...options });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ status_message: response.statusText }));
    console.error(`Erro ao buscar dados de: ${url.toString()}`, errorBody);
    throw new Error(errorBody.status_message || `Erro na API: ${response.status}`);
  }
  return response.json();
}

export async function getDiscoverMovies(genreId?: string): Promise<ActionResponse<MovieProps[]>> {
  try {
    const params: Record<string, string> = { limit: "28" };
    if (genreId) params.with_genres = genreId;
    const data = await fetchFromTMDB("/discover/movie", params) as ApiMovieResponse;
    return successResponse(data.results);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function searchMovies(query: string): Promise<ActionResponse<MovieProps[]>> {
  try {
    const data = await fetchFromTMDB("/search/movie", { query }, { next: { revalidate: 0 } }) as ApiMovieResponse;
    return successResponse(data.results);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function getTopRatedMovies(): Promise<ActionResponse<MovieProps[]>> {
  try {
    const data = await fetchFromTMDB("/movie/top_rated") as ApiMovieResponse;
    return successResponse(data.results);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function getAiringTodaySeries(): Promise<ActionResponse<MovieProps[]>> {
  try {
    const data = await fetchFromTMDB("/tv/airing_today");
    return successResponse(data.results);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function getUpcomingMovies(): Promise<ActionResponse<MovieProps[]>> {
  try {
    const data = await fetchFromTMDB("/movie/upcoming") as ApiMovieResponse;
    return successResponse(data.results);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function getGenres(): Promise<ActionResponse<Genre[]>> {
  try {
    const data = await fetchFromTMDB("/genre/movie/list");
    return successResponse(data.genres);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function getMovieDetails(id: string, sessionId?: string): Promise<ActionResponse<MovieProps>> {
  try {
    const params: Record<string, string> = {};
    if (sessionId) {
      params.session_id = sessionId;
      params.append_to_response = "account_states";
    }
    const movieDetails = await fetchFromTMDB(`/movie/${id}`, params, { next: { revalidate: 0 } });
    return successResponse(movieDetails);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function getSimilarMovies(id: string): Promise<ActionResponse<MovieProps[]>> {
  try {
    const data = await fetchFromTMDB(`/movie/${id}/similar`) as ApiMovieResponse;
    return successResponse(data.results);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function getTrendingPeople(): Promise<ActionResponse<Person[]>> {
  try {
    const data = await fetchFromTMDB("/trending/person/week");
    return successResponse(data.results);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

export async function getMovieVideos(id: string): Promise<ActionResponse<Video[]>> {
  try {
    const data = await fetchFromTMDB(`/movie/${id}/videos`) as ApiVideoResponse;
    return successResponse(data.results);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}

// --- Funções Autenticadas ---

export async function getFavoriteMovies(accountId: string, sessionId: string): Promise<ActionResponse<MovieProps[]>> {
  try {
    if (!accountId || !sessionId) return successResponse([]);
    const params = { session_id: sessionId };
    const data = await fetchFromTMDB(`/account/${accountId}/favorite/movies`, params, { next: { revalidate: 0 } }) as ApiMovieResponse;
    return successResponse(data.results);
  } catch (error: any) {
    return errorResponse(error.message);
  }
}
