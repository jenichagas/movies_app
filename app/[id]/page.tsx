import { MovieProps } from "../types";
import styles from "./Film.module.scss";

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
    throw new Error(
      `Erro ao buscar detalhes do filme. Status: ${response.status}. Mensagem: ${
        errorBody?.status_message || response.statusText
      }`
    );
  }

  return response.json();
}

export default async function Film(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const movie = await getMovieDetails(params.id);
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className={styles.filmContainer}>
      <div className={styles.poster}>
        <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className={styles.details}>
        <h1>{movie.title}</h1>
        <p className={styles.overview}>{movie.overview}</p>
        <div className={styles.info}>
          <span>Nota: {movie.vote_average.toFixed(1)}</span>
          <span>
            Lançamento:{" "}
            {new Date(movie.release_date).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>
    </div>
  );
}