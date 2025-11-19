"use client";

import { useState } from "react";
import type { MovieProps } from "@/app/types";
import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/MovieGrid";
import NotFound from "@/components/NotFound";
import { getPopulateMovies, searchMovies } from "./page";

interface PageClientProps {
  initialMovies: MovieProps[];
}

export default function PageClient({ initialMovies }: PageClientProps) {
  const [movies, setMovies] = useState<MovieProps[]>(initialMovies);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    setHasSearched(trimmedQuery !== "");

    let moviesData: MovieProps[] = [];
    if (trimmedQuery !== "") {
      moviesData = await searchMovies(trimmedQuery);
    } else {
      moviesData = await getPopulateMovies();
    }
    setMovies(moviesData);
  };

  return (
    <div className="">
      <div>
        <HeroSection onSearch={handleSearch} />
      </div>
      <div>
        {hasSearched && movies.length === 0 ? (
          <NotFound />
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </div>
  );
}
