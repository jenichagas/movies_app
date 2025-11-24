"use client";

import styles from "./MenuList.module.scss";
import Search from "../Search";

interface MenuListProps {
  onSearch: (query: string) => void;
}

export default function MenuList({ onSearch }: MenuListProps) {
  return (
    <div className={styles.menuList}>
      <div className={styles.menuItem}>Filmes</div>
      <div className={styles.menuItem}>Séries</div>
      <Search onSearch={onSearch} />
    </div>
  );
}
