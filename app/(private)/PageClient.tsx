"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { MovieProps, Genre } from "@/app/types";
import HeroSection from "@/components/HeroSection";
import NotFound from "@/components/NotFound";
import {
  getPopulateMovies,
  searchMovies,
  getPopularMovies,
  getTvSeries,
  getUpcomingMovies,
} from "./page";
import MenuList from "@/components/MenuList";
import styles from "./PageClient.module.scss";
import CategorieList from "@/components/CategoriesList";
import MovieGrid from "@/components/MovieGrid";

interface PageClientProps {
  initialMovies: MovieProps[];
  genres: Genre[];
  initialActiveMenu: string;
}

export default function PageClient({
  initialMovies,
  genres,
  initialActiveMenu,
}: PageClientProps) {
  const [movies, setMovies] = useState<MovieProps[]>(initialMovies);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeMenu, setActiveMenu] = useState(initialActiveMenu);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      if (categoryId) {
        const moviesData = await getPopulateMovies(categoryId);
        setMovies(moviesData);
        setHasSearched(false);
        setActiveMenu("");
      }
    };

    fetchMoviesByCategory();
  }, [categoryId]);

  const handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    setHasSearched(trimmedQuery !== "");
    setActiveMenu(trimmedQuery ? "" : "filmes");

    let moviesData: MovieProps[] = [];
    if (trimmedQuery !== "") {
      moviesData = await searchMovies(trimmedQuery);
    } else {
      moviesData = await getPopulateMovies();
    }
    setMovies(moviesData);
  };

  const handleFilmesClick = async () => {
    const moviesData = await getPopulateMovies();
    setMovies(moviesData);
    setHasSearched(false);
    setActiveMenu("filmes");
  };

  const handlePopularClick = async () => {
    const moviesData = await getPopularMovies();
    setMovies(moviesData);
    setHasSearched(false);
    setActiveMenu("popular");
  };
  const handleSeriesClick = async () => {
    const moviesData = await getTvSeries();
    setMovies(moviesData);
    setHasSearched(false);
    setActiveMenu("series");
  };
  const handleUpcomingClick = async () => {
    const moviesData = await getUpcomingMovies();
    setMovies(moviesData);
    setHasSearched(false);
    setActiveMenu("em breve");
  };

  return (
    <div className="">
      <div className={styles.menuList}>
        <MenuList
          onSearch={handleSearch}
          onFilmesClick={handleFilmesClick}
          onPopularClick={handlePopularClick}
          onSeriesClick={handleSeriesClick}
          onUpcomingClick={handleUpcomingClick}
          activeItem={activeMenu}
        />
      </div>
      <div>
        <HeroSection />
      </div>
      <div>
        <CategorieList genres={genres} />
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
