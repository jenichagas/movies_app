"use client";
import Lottie from "lottie-react";
import notFoundAnimation from "@/public/cat-playing-animation.json";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <Lottie animationData={notFoundAnimation} loop={true} />
      <p>Ops! Nenhum resultado encontrado.</p>
    </div>
  );
}
