"use client";
import styles from "./Search.module.scss";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      {isMounted && <IoSearchCircleSharp />}
      <input
        type="text"
        placeholder="Pesquise por um filme ou uma série..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
}
