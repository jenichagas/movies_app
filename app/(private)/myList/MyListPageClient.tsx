"use client";

import { useState, useMemo } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { MovieProps, Genre } from "@/app/types";
import styles from "./MyList.module.scss";
import { FaList, FaTh } from "react-icons/fa";
import MovieListItem from "@/components/MovieListItem/MovieListItem";
import MovieCarousel from "@/components/MovieCarousel";
import EmptyState from "@/components/EmptyState";

interface MyListPageClientProps {
  movies: MovieProps[];
  genres: Genre[];
}

export default function MyListPageClient({ movies: favoriteMovies, genres }: MyListPageClientProps) {
  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const genreMap = useMemo(() => {
    return genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {} as Record<number, string>);
  }, [genres]);

  const getGenresFromIds = (genreIds: number[] | undefined): string[] => {
    if (!genreIds || Object.keys(genreMap).length === 0) return [];
    return genreIds.map((id) => genreMap[id]).filter(Boolean);
  };

  const categories = useMemo(() => {
    const allGenres = favoriteMovies.flatMap((movie) =>
      getGenresFromIds(movie.genre_ids)
    );
    return ["all", ...Array.from(new Set(allGenres))];
  }, [favoriteMovies, genreMap]);

  const filteredMovies = useMemo(() => {
    if (selectedCategory === "all") {
      return favoriteMovies;
    }
    return favoriteMovies.filter((movie) =>
      getGenresFromIds(movie.genre_ids).includes(selectedCategory)
    );
  }, [favoriteMovies, selectedCategory, genreMap]);

  const moviesByCategory = useMemo(() => {
    if (selectedCategory !== "all") {
      if (filteredMovies.length > 0) {
        return { [selectedCategory]: filteredMovies };
      }
      return {};
    }

    const initialValue: Record<string, MovieProps[]> = {};
    return favoriteMovies.reduce((acc, movie) => {
      const movieGenres = getGenresFromIds(movie.genre_ids);
      movieGenres.forEach((genreName) => {
        if (!acc[genreName]) {
          acc[genreName] = [];
        }
        acc[genreName].push(movie);
      });
      return acc;
    }, initialValue);
  }, [favoriteMovies, filteredMovies, selectedCategory, genreMap]);

  if (favoriteMovies.length === 0) {
    return (
      <EmptyState
        message="Sua lista ainda está vazia..."
        description="Parece que você não tem nenhum filme ou série aqui. Comece a explorar e
        salve seus favoritos! &#x2605;"
      />
    );
  }

  return (
    <div className={styles.myListPage}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <h1>Minha Lista</h1>
          <p>Filmes e séries que você salvou para assistir mais tarde.</p>
        </div>
        <div className={styles.controls}>
          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${
                  selectedCategory === category ? styles.activeFilter : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <ToggleGroup.Root
            type="single"
            value={view}
            onValueChange={(value) => {
              if (value) setView(value);
            }}
            className={styles.toggleGroup}
            aria-label="Visualização"
          >
            <ToggleGroup.Item
              value="grid"
              className={styles.toggleItem}
              aria-label="Grid"
            >
              <FaTh />
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="list"
              className={styles.toggleItem}
              aria-label="Lista"
            >
              <FaList />
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      </header>

      <main className={styles.content}>
        {view === "grid" ? (
          <div className={styles.gridContainer}>
            {Object.entries(moviesByCategory).map(([category, movies]) => (
              <div key={category} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>{category}</h2>
                <MovieCarousel movies={movies} cardWidth={200} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.listContainer}>
            {filteredMovies.map((movie) => (
              <MovieListItem key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
