"use client";

import dynamic from "next/dynamic";
import styles from "./MovieCard.module.scss";
import { MovieProps } from "@/app/types";
import { useState } from "react";
import Link from "next/link";

const StarRating = dynamic(() => import("../StarRating"), {
  ssr: false,
  loading: () => <div style={{ height: "24px" }} />,
});

interface MovieCardProps {
  movie: MovieProps;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const hasOverview = movie.overview && movie.overview.length > 0;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className={styles.movieCard}>
      {movie.vote_average === 0 && (
        <div className={styles.badge}>
          <small>Adicionado recente</small>
        </div>
      )}
      <div className={styles.poster}>
        {!isImageLoaded && <div className={styles.imagePlaceholder} />}

        <img
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt="Imagem do filme"
          className={`${styles.posterImage} ${
            isImageLoaded ? styles.posterImageLoaded : ""
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className={styles.movieInfo}>
        <div className={styles.infoContainer}>
          <div
            className={`${styles.infoPlaceholder} ${
              isImageLoaded ? styles.hidden : ""
            }`}
          >
            <div className={styles.textPlaceholder} />
            <div className={styles.starsPlaceholder} />
          </div>

          <div
            className={`${styles.infoContent} ${
              isImageLoaded ? "" : styles.hidden
            }`}
          >
            <p className={styles.title}>{movie.title}</p>
            {movie.vote_average > 0 && (
              <StarRating rating={movie.vote_average} />
            )}
          </div>
        </div>

        <div className={styles.overviewHidden}>
          <p className={hasOverview ? styles.overview : ""}>
            {hasOverview
              ? movie.overview.length > 100
                ? movie.overview.slice(0, 100) + "..."
                : movie.overview
              : "Sinopse não disponível."}
          </p>
          <Link href={`/${movie.id}`}>
            <button className="primary-btn">Ver mais</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
