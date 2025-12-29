import { getFavoriteMovies, getGenres } from "@/lib/movies";
import MyListPageClient from "./MyListPageClient";
import { MovieProps } from "@/app/types";

export default async function MyListPage() {
  // Simulação de dados de autenticação
  const accountId = "YOUR_ACCOUNT_ID";
  const sessionId = "YOUR_SESSION_ID";

  // Busca os filmes favoritos e os gêneros em paralelo
  const [favoriteMoviesData, genresData] = await Promise.all([
    getFavoriteMovies(accountId, sessionId),
    getGenres(),
  ]);

  // Adiciona a propriedade is_favorite a todos os filmes, pois todos são favoritos nesta página
  const favoriteMovies: MovieProps[] = favoriteMoviesData.map(movie => ({
    ...movie,
    is_favorite: true,
  }));

  return <MyListPageClient movies={favoriteMovies} genres={genresData} />;
}
