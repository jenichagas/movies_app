"use client";

import styles from "./CategorieList.module.scss";
import Image from "next/image";
import Dropdown from "../Dropdown";

const FEATURED_CATEGORIES = [
  {
    name: "Ação",
    image: "/acao-category.png", 
    color: "#FF5252",
  },
  {
    name: "Romance",
    image: "/romance-category.png",
    color: "#E040FB",
  },
  {
    name: "Terror",
    image: "/terror-category.png", 
    color: "#424242",
  },
  {
    name: "Ficção",
    image: "/ficcao-category.png", 
    color: "#448AFF",
  },
  {
    name: "Infantil",
    image: "/infantil-category.png",
    color: "#FFC107",
  },
];

const EXTRA_CATEGORIES = [
  "Comédia",
  "Drama",
  "Horror",
  "Suspense",
  "Animação",
  "Documentário",
];

export default function CategorieList() {
  return (
    <section className={styles.categorieSection}>
      <ul className={styles.listContainer}>
        {FEATURED_CATEGORIES.map((category) => (
          <li key={category.name} className={styles.categoryItem}>
            <div
              className={styles.circle}
              style={{ backgroundColor: category.color }}
            />
            <div className={styles.imageContainer}>
              <Image
                src={category.image}
                alt={category.name}
                width={120}
                height={120}
                className={styles.categoryImage}
              />
            </div>
            <span className={styles.categoryName}>{category.name}</span>
          </li>
        ))}
        <li className={styles.moreItem}>
          <Dropdown
            trigger={(isOpen) => (
              <div className={styles.moreButton}>
                <span>Mais</span>
                <span
                  className={`${styles.arrowIcon} ${
                    isOpen ? styles.arrowOpen : ""
                  }`}
                >
                  &#8249;
                </span>
              </div>
            )}
          >
            <ul className={styles.dropdownMenu}>
              {EXTRA_CATEGORIES.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </Dropdown>
        </li>
      </ul>
    </section>
  );
}