import styles from "./FavButtonSkeleton.module.scss";

export default function FavButtonSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.heartSkeleton} />
      <div className={styles.textSkeleton} />
    </div>
  );
}
