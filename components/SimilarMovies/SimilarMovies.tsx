"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { MovieProps } from "@/app/types";
import MovieCard from "../MovieCard";
import styles from "./SimilarMovies.module.scss";
import MovieGridSkeleton from "../MovieGrid/Skeleton";

interface SimilarMoviesProps {
  movieId: string;
}

export default function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const [similarMovies, setSimilarMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchSimilarMovies() {
      setLoading(true);
      try {
        const response = await fetch(`/api/similar-movies?movieId=${movieId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch similar movies");
        }
        const data = await response.json();
        setSimilarMovies(data.results);

        console.log("Similar Movies Data:", data.results.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (movieId) {
      fetchSimilarMovies();
    }
  }, [movieId]);

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

  if (loading) {
    return (
      <div>
        <MovieGridSkeleton />
      </div>
    );
  }

  if (similarMovies.length === 0) {
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
          {similarMovies.slice(0, 10).map((movie) => (
            <div key={movie.id} className={styles.slide}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </Slider>
      </div>
  );
}
