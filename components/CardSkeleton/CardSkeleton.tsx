import styles from './CardSkeleton.module.scss';

export default function CardSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonInfo}>
        <div className={styles.skeletonText} />
        <div className={styles.skeletonStars} />
      </div>
    </div>
  );
}