"use client";

import { useRouter, usePathname } from "next/navigation";
import type { MovieProps, Genre } from "@/app/types";
import HeroSection from "@/components/HeroSection";
import NotFound from "@/components/NotFound";
import MenuList from "@/components/MenuList";
import styles from "./PageClient.module.scss";
import CategorieList from "@/components/CategoriesList";
import MovieGrid from "@/components/MovieGrid";

interface PageClientProps {
  movies: MovieProps[];
  genres: Genre[];
  initialActiveMenu: string;
  searchQuery?: string;
}

export default function PageClient({
  movies,
  genres,
  initialActiveMenu,
  searchQuery,
}: PageClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (params: Record<string, string>) => {
    const url = new URL(pathname, window.location.origin);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
    router.push(url.toString());
  };

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      handleNavigation({ q: trimmedQuery });
    } else {
      handleNavigation({ type: "discover" });
    }
  };

  return (
    <div className="">
      <div className={styles.menuList}>
        <MenuList
          onSearch={handleSearch}
          onFilmesClick={() => handleNavigation({ type: "discover" })}
          onPopularClick={() => handleNavigation({ type: "popular" })}
          onSeriesClick={() => handleNavigation({ type: "series" })}
          onUpcomingClick={() => handleNavigation({ type: "upcoming" })}
          activeItem={initialActiveMenu}
        />
      </div>
      <div>
        <HeroSection />
      </div>
      <div>
        <CategorieList genres={genres} />
      </div>
      <div>
        {searchQuery && movies.length === 0 ? (
          <NotFound height="30vh" />
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </div>
  );
}
