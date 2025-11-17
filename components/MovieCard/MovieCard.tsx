import StarRating from "../StarRating";
import styles from "./MovieCard.module.scss";
import { MovieProps } from "@/app/types";

interface MovieCardProps {
  movie: MovieProps;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const hasOverview = movie.overview && movie.overview.length > 0;

  return (
    <div className={styles.movieCard}>
      <div className={styles.poster}>
        <img
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt="Imagem do filme"
        />
      </div>
      <div className={styles.movieInfo}>
        <p className={styles.title}>{movie.title}</p>
        <StarRating rating={movie.vote_average} />
        <div className={styles.overviewHidden}>
          <p className={hasOverview ? styles.overview : ""}>
            {hasOverview
              ? movie.overview.length > 100
                ? movie.overview.slice(0, 100) + "..."
                : movie.overview
              : "Sinopse não disponível."}
          </p>
          <button>Ver mais</button>
        </div>
      </div>
    </div>
  );
}
