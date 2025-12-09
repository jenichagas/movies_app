import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./MovieCard.module.scss";
import { MovieProps } from "@/app/types";
import FavButton from "../FavButton";

const StarRating = dynamic(() => import("../StarRating"), {
  ssr: false,
  loading: () => <div style={{ height: "24px" }} />,
});

interface MovieCardProps {
  movie: MovieProps;
  titleFontSize?: string;
  overviewFontSize?: string;
}

export default function MovieCard({
  movie,
  titleFontSize,
  overviewFontSize,
}: MovieCardProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const hasOverview = movie.overview && movie.overview.length > 0;

  return (
    <Link href={`/${movie.id}`}>
      <div className={styles.movieCard}>
        {movie.vote_average === 0 && (
          <div className={styles.badge}>
            <small>Adicionado recente</small>
          </div>
        )}
        <div className={styles.favButton}>
          <FavButton
            movieId={movie.id}
            movieTitle={movie.title}
            showText={false}
          />
        </div>
        <div className={styles.poster}>
          <Image
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt="Imagem do filme"
            className={styles.posterImage}
            width={200}
            height={300}
          />
        </div>
        <div className={styles.movieInfo}>
          <div className={styles.infoContainer}>
            <div className={styles.infoContent}>
              <p className={styles.title} style={{ fontSize: titleFontSize }}>
                {movie.title}
              </p>
              {movie.vote_average > 0 && (
                <StarRating rating={movie.vote_average} />
              )}
            </div>
          </div>

          <div className={styles.overviewHidden}>
            <p
              className={hasOverview ? styles.overview : ""}
              style={{ fontSize: overviewFontSize }}
            >
              {hasOverview
                ? movie.overview.length > 100
                  ? movie.overview.slice(0, 100) + "..."
                  : movie.overview
                : "Sinopse não disponível."}
            </p>
            <button className="primary-btn">Ver mais</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
