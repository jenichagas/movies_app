"use client";
import styles from "./Search.module.scss";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

  



export default function Search() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.searchContainer}>
      {isMounted && <IoSearchCircleSharp />}
      <input type="text" placeholder="Pesquise por um filme ou uma série..." />
      <button>Pesquisar</button>
    </div>
  );
}
