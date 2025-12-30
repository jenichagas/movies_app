"use client";

import Image from "next/image";
import { MovieProps } from "@/app/types";
import styles from "./MovieListItem.module.scss";
import Link from "next/link";
import StarRating from "../StarRating";
import FavButton from "../FavButton";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { formatRuntime } from "@/utils/formatRuntime";
import { formatDate } from "@/utils/formatDate";

interface MovieListItemProps {
  movie: MovieProps;
}

export default function MovieListItem({ movie }: MovieListItemProps) {
  const isFav = movie.is_favorite || false;
  const formattedRuntime = formatRuntime(movie.runtime);

  return (
    <div className={styles.movieListItem}>
      <Link href={`/${movie.id}`} className={styles.imageContainer}>
        <Image
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title}
          fill
          className={styles.image}
        />
      </Link>
      <div className={styles.details}>
        <div className={styles.header}>
          <Link href={`/${movie.id}`}>
            <h3 className={styles.title}>{movie.title}</h3>
          </Link>
          <div className={styles.rating}>
            <StarRating rating={movie.vote_average} />

            <span className={styles.voteAverage}>
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
        <div className={styles.info}>
          <span>
            <IoCalendarOutline />
            Lançamento: {formatDate(movie.release_date)}
          </span>
          {formattedRuntime && (
            <span>
              <MdOutlineTimer /> {formattedRuntime}
            </span>
          )}
        </div>
        <p className={styles.overview}>{movie.overview || "Sem sinopse"}</p>
        <div className={styles.actions}>
          <FavButton
            mediaId={movie.id}
            mediaType="movie"
            isFavorite={isFav}
            showText={true}
          />
        </div>
      </div>
    </div>
  );
}
