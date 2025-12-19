"use client"
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { MovieProps } from "../app/types";

interface FavoriteContextType {
  favorites: MovieProps[];
  addFavorite: (movie: MovieProps) => void;
  removeFavorite: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
}

const FavoritesContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<MovieProps[]>([]);
  useEffect(() => {
    const storedFavorites = localStorage.getItem("cinebox-favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cinebox-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: MovieProps) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const removeFavorite = (movieId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  const isFavorite = (movieId: string) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
