"use client";
import styles from "./Search.module.scss";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

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
        ref={inputRef}
      />
      <div className={styles.searchIcon} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose onClick={clearSearch} /> : <IoSearch />}
      </div>
    </div>
  );
}
