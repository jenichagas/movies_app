import styles from "./CategoriesListSkeleton.module.scss";

export default function CategoriesListSkeleton() {
  return (
    <section className={styles.skeletonSection}>
      <ul>
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index} />
        ))}
      </ul>
    </section>
  );
}
