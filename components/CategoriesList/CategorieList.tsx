"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./CategorieList.module.scss";
import Image from "next/image";
import Dropdown from "../Dropdown/Dropdown";
import { Genre } from "@/app/types";
import { PiListHeart } from "react-icons/pi";
import { FaListUl } from "react-icons/fa";
import { LiaGripLinesSolid } from "react-icons/lia";

const FEATURED_CATEGORIES_META = {
  28: { image: "/acao-category.png", color: "#b71616f3" },
  10749: { image: "/romance-category.png", color: "#960aafff" },
  27: { image: "/terror-category.png", color: "#424242" },
  878: { image: "/ficcao-category.png", color: "#033fa8ff" },
  99: { image: "/film-category.png", color: "#189e04ff" },
  10751: { image: "/infantil-category.png", color: "#FFC107" },
};

interface CategorieListProps {
  genres: Genre[];
}

interface DropdownListProps {
  genres: Genre[];
  activeCategoryId: string | null;
  handleCategoryClick: (categoryId: number) => void;
  closeDropdown?: () => void;
}

const DropdownList = ({
  genres,
  activeCategoryId,
  handleCategoryClick,
  closeDropdown,
}: DropdownListProps) => (
  <ul className={styles.dropdownMenu}>
    {genres.map((category) => (
      <li
        key={category.id}
        onClick={() => {
          handleCategoryClick(category.id);
          if (closeDropdown) {
            closeDropdown();
          }
        }}
        className={
          activeCategoryId === category.id.toString()
            ? styles.activeDropdown
            : ""
        }
      >
        <LiaGripLinesSolid className={styles.iconList} />
        {category.name}
      </li>
    ))}
  </ul>
);

export default function CategorieList({ genres }: CategorieListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get("category");

  const handleCategoryClick = (categoryId: number) => {
    const params = new URLSearchParams(searchParams);
    if (activeCategoryId === categoryId.toString()) {
      params.delete("category");
    } else {
      params.set("category", categoryId.toString());
    }
    router.push(`?${params.toString()}`);
  };

  const featuredIds = new Set(
    Object.keys(FEATURED_CATEGORIES_META).map(Number)
  );

  const featuredGenres = genres
    .filter((genre) => featuredIds.has(genre.id))
    .map((genre) => ({
      ...genre,
      ...FEATURED_CATEGORIES_META[
        genre.id as keyof typeof FEATURED_CATEGORIES_META
      ],
    }));

  const extraGenres = genres.filter((genre) => !featuredIds.has(genre.id));

  return (
    <section className={styles.categorieSection}>
      <ul className={styles.listContainer}>
        {featuredGenres.map((category) => {
          const isActive = activeCategoryId === category.id.toString();

          return (
            <li
              key={category.id}
              className={styles.categoryItem}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div
                className={`${styles.circle} ${isActive ? styles.active : ""}`}
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
              <div className={styles.nameContainer}>
                <span
                  className={`${styles.categoryName} ${
                    isActive ? styles.activeName : ""
                  }`}
                >
                  {category.name}
                </span>
                {isActive && <div className={styles.indicator} />}
              </div>
            </li>
          );
        })}
        <li className={styles.moreItem}>
          <Dropdown
            trigger={(isOpen) => (
              <div className={styles.moreButton}>
                <span>
                  {" "}
                  <FaListUl /> Mais
                </span>
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
            <DropdownList
              genres={extraGenres}
              activeCategoryId={activeCategoryId}
              handleCategoryClick={handleCategoryClick}
            />
          </Dropdown>
        </li>
      </ul>
    </section>
  );
}
