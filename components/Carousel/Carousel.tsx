"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieProps } from "@/app/types";
import MovieCard from "../MovieCard";
import styles from "./Carousel.module.scss";

interface CarouselProps {
  movies: MovieProps[];
}

export default function Carousel({ movies }: CarouselProps) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.slide}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
