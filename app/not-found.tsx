"use client";
import Lottie from "lottie-react";
import catLamp from "@/public/cat-lamp.json";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <Lottie animationData={catLamp} loop={true} />
      <p>Ops! Algo deu errado.</p>
    </div>
  );
}
