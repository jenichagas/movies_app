import Image from "next/image";
import { MovieProps } from "@/app/types";
import styles from "./MovieListItem.module.scss";
import Link from "next/link";
import StarRating from "../StarRating";
import FavButton from "../FavButton";
import { useFavorites } from "@/contexts/FavoriteContext";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { formatRuntime } from "@/utils/formatRuntime";

interface MovieListItemProps {
  movie: MovieProps;
}

export default function MovieListItem({ movie }: MovieListItemProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFav = isFavorite(movie.id);
  const formattedRuntime = formatRuntime(movie.runtime);

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

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
            Lançamento:{" "}
            {new Date(movie.release_date).toLocaleDateString("pt-BR", {
              timeZone: "UTC",
            })}
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
            onClick={handleFavClick}
            isFavorite={isFav}
            showText={true}
          />
        </div>
      </div>
    </div>
  );
}
