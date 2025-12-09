"use client";

import { MovieProps } from "../types";
import styles from "./Film.module.scss";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { PiFilmSlateFill } from "react-icons/pi";
import ButtonDownload from "@/components/ButtonDownload/ButtonDownload";
import Image from "next/image";
import { formatRuntime } from "@/utils/formatRuntime";
import { getRating } from "@/utils/getRating";
import FavButton from "@/components/FavButton";
import ButtonPlay from "@/components/ButtonPlay/ButtonPlay";

interface FilmDetailsProps {
  movie: MovieProps;
}

export default function FilmDetails({ movie }: FilmDetailsProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const formattedRuntime = formatRuntime(movie.runtime);
  const rating = getRating(movie.genres);

  return (
    <div className={styles.topContent}>
      <div className={styles.poster}>
        <Image
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
        />
        <div className={styles.download}>
          <ButtonDownload />
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.titleRow}>
          <div>
            <h3>
              {movie.title}{" "}
              {movie.adult && <span className={styles.adultBadge}>+18</span>}
            </h3>
          </div>
          <div>
            <FavButton movieId={movie.id} movieTitle={movie.title} />
          </div>
        </div>

        {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}
        <p className={styles.overview}>{movie.overview}</p>
        <div className={styles.companies}>
          {movie.production_companies?.map(
            (company) =>
              company.logo_path && (
                <Image
                  key={company.id}
                  src={`${imageBaseUrl}${company.logo_path}`}
                  alt={company.name}
                  width={100}
                  height={50}
                />
              )
          )}
        </div>
        <div className={styles.info}>
          {rating && (
            <span
              className={`${styles.ratingBadge} ${styles[`rating${rating}`]}`}
            >
              {rating}
            </span>
          )}
          <span>
            <FaRegStar className={styles.rating} /> Nota:{" "}
            {movie.vote_average.toFixed(1)}
          </span>
          <span>
            <IoCalendarOutline className={styles.rating} />
            Lançamento:{" "}
            {new Date(movie.release_date).toLocaleDateString("pt-BR", {
              timeZone: "UTC",
            })}
          </span>
          {formattedRuntime && (
            <span>
              <MdOutlineTimer className={styles.rating} /> {formattedRuntime}
            </span>
          )}
        </div>
        {movie.genres && (
          <div className={styles.genres}>
            {movie.genres.map((genre) => (
              <span key={genre.id} className={styles.genre}>
                {genre.name}
              </span>
            ))}
          </div>
        )}
        <div className={styles.actions}>
          <button className={styles.trailerButton}>
            {" "}
            <PiFilmSlateFill /> Ver trailer
          </button>
          <div>
            <ButtonPlay />
          </div>
        </div>
      </div>
    </div>
  );
}
