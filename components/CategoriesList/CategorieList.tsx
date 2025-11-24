"use client";

import { useState, useEffect } from "react";
import styles from "./CategorieList.module.scss";

const ALL_CATEGORIES = [
  "Ação",
  "Comédia",
  "Drama",
  "Horror",
  "Suspense",
  "Terror",
  "Romance",
  "Ficção Científica",
  "Animação",
  "Documentário",
];

const DESKTOP_VISIBLE_COUNT = 5;
const TABLET_VISIBLE_COUNT = 3;
const MOBILE_BREAKPOINT = 768;

export default function CategorieList() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(ALL_CATEGORIES);
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);

      if (width < MOBILE_BREAKPOINT) {
        setVisibleCategories([]);
        setHiddenCategories(ALL_CATEGORIES);
      } else if (width < 1024) {
        setVisibleCategories(ALL_CATEGORIES.slice(0, TABLET_VISIBLE_COUNT));
        setHiddenCategories(ALL_CATEGORIES.slice(TABLET_VISIBLE_COUNT));
      } else {
        setVisibleCategories(ALL_CATEGORIES.slice(0, DESKTOP_VISIBLE_COUNT));
        setHiddenCategories(ALL_CATEGORIES.slice(DESKTOP_VISIBLE_COUNT));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.categorieSection}>
      <ul>
        {!isMobile &&
          visibleCategories.map((category) => (
            <li key={category}>{category}</li>
          ))}

        {(isMobile || hiddenCategories.length > 0) && (
          <li
            className={styles.dropdownContainer}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{isMobile ? "Categorias" : "Mais"}</span>
            <span
              className={`${styles.arrowIcon} ${isOpen ? styles.arrowOpen : ""}`}
            >
              &#8249;
            </span>
            <ul
              className={`${styles.dropdownMenu} ${
                isOpen ? styles.dropdownOpen : ""
              }`}
            >
              {hiddenCategories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </section>
  );
}
