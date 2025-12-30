"use client";
import { createContext, useContext, ReactNode } from "react";

// Interface vazia por enquanto. No futuro, pode ser usada para
// atualizações otimistas ou para passar o session_id do usuário.
interface FavoriteContextType {
  // Exemplo: optimisticToggleFavorite: (movieId: string) => void;
}

const FavoritesContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Toda a lógica de useState e useEffect foi removida.
  // O estado agora é gerenciado no servidor.

  const value = {
    // A implementação de funções (como atualizações otimistas) entraria aqui.
  };

  return (
    <FavoritesContext.Provider value={value}>
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
