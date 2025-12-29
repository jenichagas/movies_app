"use client";
import Lottie from "lottie-react";
import notFoundAnimation from "@/public/cat-playing-animation.json";
import styles from "./NotFound.module.scss";

interface NotFoundProps {
  height?: string;
}

export default function NotFound(height: NotFoundProps) {
  return (
    <div className={styles.notFoundContainer} style={{ height: height.height }}>
      <Lottie animationData={notFoundAnimation} loop={true} />
      <p>Ops! Nenhum resultado encontrado.</p>
    </div>
  );
}
