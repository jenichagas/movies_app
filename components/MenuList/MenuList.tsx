"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./MenuList.module.scss";
import Search from "../Search";

interface MenuListProps {
  onSearch: (query: string) => void;
  onFilmesClick: () => void;
  onPopularClick: () => void;
  onSeriesClick: () => void;
  onUpcomingClick: () => void;
  activeItem: string;
}

export default function MenuList({
  onSearch,
  onFilmesClick,
  onPopularClick,
  onSeriesClick,
  onUpcomingClick,
  activeItem,
}: MenuListProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const filmesRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = {
      discover: filmesRef, 
      series: seriesRef,
      popular: popularRef,
      upcoming: upcomingRef, 
    };

    const activeKey = activeItem as keyof typeof refs;
    const targetRef = refs[activeKey];

    requestAnimationFrame(() => {
      if (targetRef?.current) {
        const { offsetLeft, offsetWidth } = targetRef.current;
        setIndicatorStyle({
          transform: `translateX(${offsetLeft}px)`,
          width: `${offsetWidth}px`,
          opacity: 1,
        });
      } else {
        setIndicatorStyle({
          opacity: 0,
        });
      }
    });
  }, [activeItem]);

  return (
    <div className={styles.menuList}>
      <div className={styles.menuItemsContainer}>
        <div
          ref={filmesRef}
          className={`${styles.menuItem} ${
            activeItem === "discover" ? styles.active : "" 
          }`}
          onClick={onFilmesClick}
        >
          Filmes
        </div>
        <div
          ref={seriesRef}
          className={`${styles.menuItem} ${
            activeItem === "series" ? styles.active : ""
          }`}
          onClick={onSeriesClick}
        >
          Séries
        </div>
        <div
          ref={popularRef}
          className={`${styles.menuItem} ${
            activeItem === "popular" ? styles.active : ""
          }`}
          onClick={onPopularClick}
        >
          Popular
        </div>
        <div
          ref={upcomingRef}
          className={`${styles.menuItem} ${
            activeItem === "upcoming" ? styles.active : "" 
          }`}
          onClick={onUpcomingClick}
        >
          Em breve
        </div>
        <div className={styles.indicator} style={indicatorStyle} />
      </div>
      <Search onSearch={onSearch} />
    </div>
  );
}
