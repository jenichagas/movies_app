import styles from "./MenuSkeleton.module.scss";

export default function MenuSkeleton() {
  return (
    <div className={styles.menuSkeleton}>
      <div className={styles.menuSkeletonContainer}>
        <div className={styles.menuItems}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.menuItemSkeleton} />
          ))}
        </div>
      </div>
      <div className={styles.searchSkeleton} />
    </div>
  );
}
