import {
  getDiscoverMovies,
  getGenres,
  getTopRatedMovies,
  getAiringTodaySeries,
  getUpcomingMovies,
  searchMovies,
  getFavoriteMovies,
} from "@/lib/movies";
import PageClient from "./PageClient";
import { MovieProps } from "@/app/types";
import { getSession } from "@/lib/session";
import { successResponse } from "@/lib/action-response";

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const categoryId = params?.category as string | undefined;
  const type = (params?.type as string) || "discover";
  const query = params?.q as string | undefined;

  const session = await getSession();
  const accountId = session.account_id;
  const sessionId = session.session_id;

  const [moviesResponse, favoriteMoviesResponse, genresResponse] =
    await Promise.all([
      (() => {
        if (query) return searchMovies(query);
        switch (type) {
          case "popular":
            return getTopRatedMovies();
          case "series":
            return getAiringTodaySeries();
          case "upcoming":
            return getUpcomingMovies();
          default:
            return getDiscoverMovies(categoryId);
        }
      })(),
      accountId && sessionId
        ? getFavoriteMovies(accountId, sessionId)
        : Promise.resolve(successResponse([])),
      getGenres(),
    ]);

  if (!moviesResponse.success) {
    console.error("Falha ao buscar filmes:", moviesResponse.error);
    return <div>Não foi possível carregar os filmes.</div>;
  }
  const moviesData = moviesResponse.data;
  const genres = genresResponse.success ? genresResponse.data : [];
  const favoriteMovies = favoriteMoviesResponse.success
    ? favoriteMoviesResponse.data
    : [];

  const favoriteMovieIds = new Set(favoriteMovies.map((fav) => Number(fav.id)));
  const movies: MovieProps[] = moviesData.map((movie) => ({
    ...movie,
    is_favorite: favoriteMovieIds.has(Number(movie.id)),
  }));

  return (
    <div>
      <PageClient
        movies={movies}
        genres={genres}
        initialActiveMenu={type}
        searchQuery={query}
      />
    </div>
  );
}
