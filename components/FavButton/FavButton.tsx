"use client";

import styles from "./FavButton.module.scss";
import clsx from "clsx";

interface FavButtonProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
  fontSize?: string;
  showText?: boolean;
  className?: string;
}

export default function FavButton({
  isFavorite,
  onClick,
  fontSize,
  showText = true,
  className,
}: FavButtonProps) {
  const containerClasses = clsx(styles.container, className, {
    [styles.noText]: !showText,
  });

  return (
    <button
      className={containerClasses}
      onClick={onClick}
      data-favorite={isFavorite}
      aria-label={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
    >
      <svg
        className="feather feather-heart"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      {showText && (
        <div className={styles.action} style={{ fontSize: fontSize }}>
          <span className={styles.option1}>Adicionar à minha lista</span>
          <span className={styles.option2}>Remover da minha lista</span>
        </div>
      )}
    </button>
  );
}
