import styles from "./CategoriesListSkeleton.module.scss";

export default function CategoriesListSkeleton() {
  return (
    <div className={styles.categorieSection}>
      <div className={styles.listContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.categoryItemSkeleton}>
            <div className={styles.circleSkeleton} />
            <div className={styles.nameSkeleton} />
          </div>
        ))}
      </div>
    </div>
  );
}