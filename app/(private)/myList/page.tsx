import { getFavoriteMovies, getGenres } from "@/lib/movies";
import MyListPageClient from "./MyListPageClient";
import { MovieProps } from "@/app/types";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function MyListPage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  const accountId = session.account_id;
  const sessionId = session.session_id;

  const [favoriteMoviesResponse, genresResponse] = await Promise.all([
    getFavoriteMovies(accountId!, sessionId!),
    getGenres(),
  ]);

  const favoriteMoviesData = favoriteMoviesResponse.success
    ? favoriteMoviesResponse.data
    : [];
  const genresData = genresResponse.success ? genresResponse.data : [];

  const favoriteMovies: MovieProps[] = favoriteMoviesData.map(movie => ({
    ...movie,
    is_favorite: true,
  }));

  return <MyListPageClient movies={favoriteMovies} genres={genresData} />;
}
