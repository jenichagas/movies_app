"use client";
import Lottie from "lottie-react";
import globalErrorAnimation from "@/public/error-global.json";
import styles from "./error.module.scss";
import Link from "next/link";

export default function GlobalError() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.animationContainer}>
        <Lottie
          animationData={globalErrorAnimation}
          className={styles.lottie}
          loop={true}
        />
      </div>
      <h3>Oops! Algo deu errado.</h3>
      <p>Não conseguimos carregar a página que você está procurando.</p>
      <Link href="/" className={styles.homeButton}>
        Voltar para a Home
      </Link>
    </div>
  );
}
