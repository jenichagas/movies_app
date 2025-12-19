"use client";
import Lottie from "lottie-react";
import EmptyAnimation from "@/public/empty.json";
import styles from "./Empty.module.scss";

interface EmptyStateProps {
  message: string;
  description: string;
}

export default function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className={styles.emptyContainer}>
      <Lottie animationData={EmptyAnimation} loop={true} />
      <h2>{message}</h2>
      <p>{description}</p>
    </div>
  );
}
