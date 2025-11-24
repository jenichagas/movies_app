"use client";
import styles from "./Search.module.scss";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`${styles.searchContainer} ${isOpen ? styles.searchOpen : ""}`}
    >
      <input
        type="text"
        placeholder="Pesquise por um filme ou uma série..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.searchIcon} onClick={() => setIsOpen(!isOpen)}>
        <IoSearch />
      </div>
    </div>
  );
}
