"use client";
import Slider from "react-slick";
import { MovieProps } from "@/app/types";
import MovieCard from "../MovieCard";
import styles from "./SimilarMovies.module.scss";

interface SimilarMoviesProps {
  movies: MovieProps[];
}

export default function SimilarMovies({ movies }: SimilarMoviesProps) {
  const settings = {
    dots: false,
    infinite: true,
    vertical: false,
    verticalSwiping: false,
    slidesToShow: 7,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (!movies || movies.length === 0) {
    return (
      <div className={styles.similarMoviesContainer}>
        <h2>VOCÊ TAMBÉM PODE GOSTAR</h2>
        <p>Nenhum filme similar encontrado.</p>
      </div>
    );
  }

  return (
    <div className={styles.similarMoviesContainer}>
      <h2>VOCÊ TAMBÉM PODE GOSTAR</h2>
      <Slider {...settings}>
        {movies.slice(0, 10).map((movie) => (
          <div key={movie.id} className={styles.slide}>
            <MovieCard
              movie={movie}
              titleFontSize="0.875rem"
              overviewFontSize="0.7rem"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
