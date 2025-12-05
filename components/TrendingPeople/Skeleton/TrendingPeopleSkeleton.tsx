import styles from "./TrendingPeopleSkeleton.module.scss";

export default function TrendingPeopleSkeleton() {
  return (
    <div className={styles.peopleContainer}>
      <h3>Principais Artistas</h3>
      <div className={styles.skeletonList}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={styles.personSkeleton}>
            <div className={styles.personImageSkeleton} />
            <div className={styles.personInfoSkeleton}>
              <div className={styles.personNameSkeleton} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
