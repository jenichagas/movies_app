import type { MovieProps } from "@/app/types";
import MovieCard from "../MovieCard";
import styles from "./MovieGrid.module.scss";

interface MovieGridProps {
  movies: MovieProps[];
}
export default function CardGrid({ movies }: MovieGridProps) {
  return (
    <div className={styles.movieGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
