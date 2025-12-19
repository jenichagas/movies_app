"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./MovieCard.module.scss";
import { MovieProps } from "@/app/types";
import FavButton from "../FavButton";
import { useFavorites } from "@/contexts/FavoriteContext";
import clsx from "clsx";

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

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFav = isFavorite(movie.id);

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  const favButtonClasses = clsx(styles.favButton, {
    [styles.isFavorite]: isFav,
  });

  return (
    <Link href={`/${movie.id}`}>
      <div className={styles.movieCard}>
        {movie.vote_average === 0 && (
          <div className={styles.badge}>
            <small>Adicionado recente</small>
          </div>
        )}
        <FavButton
          className={favButtonClasses}
          onClick={handleFavClick}
          isFavorite={isFav}
          showText={false}
        />
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
