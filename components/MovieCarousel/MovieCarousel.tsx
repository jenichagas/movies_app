"use client";

import { useRef, useState, useEffect } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { MovieProps } from "@/app/types";
import MovieCard from "../MovieCard";
import styles from "./MovieCarousel.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface MovieCarouselProps {
  movies: MovieProps[];
  cardWidth?: number;
}

export default function MovieCarousel({
  movies,
  cardWidth = 200,
}: MovieCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollAmount = 500;

  const handleScroll = () => {
    const viewport = viewportRef.current;
    if (viewport) {
      const { scrollLeft, scrollWidth, clientWidth } = viewport;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      handleScroll();
      viewport.addEventListener("scroll", handleScroll);

      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(viewport);

      return () => {
        viewport.removeEventListener("scroll", handleScroll);
        resizeObserver.unobserve(viewport);
      };
    }
  }, [movies]);

  const scroll = (direction: "left" | "right") => {
    if (viewportRef.current) {
      const currentScroll = viewportRef.current.scrollLeft;
      const amount = direction === "left" ? -scrollAmount : scrollAmount;
      viewportRef.current.scrollTo({
        left: currentScroll + amount,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className={styles.carouselRoot}>
      {canScrollLeft && (
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </button>
      )}
      <ScrollArea.Root className={styles.scrollAreaRoot} type="auto">
        <ScrollArea.Viewport
          ref={viewportRef}
          className={styles.scrollAreaViewport}
        >
          <div className={styles.contentContainer}>
            {movies.map((movie) => (
              <div
                key={movie.id}
                className={styles.slide}
                style={{ width: `${cardWidth}px` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Corner />
      </ScrollArea.Root>
      {canScrollRight && (
        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
}
