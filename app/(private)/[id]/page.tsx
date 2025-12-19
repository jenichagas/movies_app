import { MovieProps } from "../../types";
import styles from "./Film.module.scss";
import TrendingPeople from "@/components/TrendingPeople";
import FilmDetails from "./FilmDetails";
import SimilarMovies from "@/components/SimilarMovies";

async function getMovieDetails(id: string): Promise<MovieProps> {
  const baseUrl = `https://api.themoviedb.org/3/movie/${id}`;
  if (!process.env.NEXT_PUBLIC_API_KEY) {
    throw new Error("API_KEY não encontrada");
  }
  const params = new URLSearchParams({
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "pt-BR",
  });

  const response = await fetch(`${baseUrl}?${params.toString()}`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    console.error("API Error Response:", errorBody);
    let errorMessage = `Erro ao buscar detalhes do filme. Status: ${response.status}.`;
    if (errorBody && errorBody.status_message) {
      errorMessage += ` Mensagem: ${errorBody.status_message}`;
    } else {
      errorMessage += ` Mensagem: ${response.statusText}. Verifique se a chave da API (NEXT_PUBLIC_API_KEY) está configurada corretamente.`;
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
}

export default async function Film(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const movie = await getMovieDetails(params.id);

  return (
    <div className={styles.filmContainer}>
      <div className={styles.mainContent}>
        <FilmDetails movie={movie} />
        <div className={styles.similarSection}>
          <SimilarMovies movieId={params.id} />
        </div>
      </div>
      <aside className={styles.sidebar}>
        <TrendingPeople />
      </aside>
    </div>
  );
}
