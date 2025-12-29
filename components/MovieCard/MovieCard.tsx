"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./MovieCard.module.scss";
import { MovieProps } from "@/app/types";
import FavButton from "../FavButton";
import { getRating } from "@/utils/getRating";
import StarRating from "@/components/StarRating";

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
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const rating = getRating(movie.genres);
  const hasOverview = movie.overview && movie.overview.length > 0;

  const isFav = movie.is_favorite || false;

  return (
    <div className={styles.movieCard}>
      {" "}
      {movie.vote_average === 0 && (
        <div className={styles.badge}>
          <small>Adicionado recente</small>
        </div>
      )}
      <FavButton
        mediaId={movie.id}
        mediaType="movie" 
        isFavorite={isFav}
        showText={false}
        className={styles.favButton}
      />
      <div className={styles.poster}>
        <Image
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt="{movie.title}"
          className={styles.posterImage}
          width={200}
          height={300}
        />
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
            <Link href={`/${movie.id}`}>
              <button className="primary-btn">Ver mais</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
