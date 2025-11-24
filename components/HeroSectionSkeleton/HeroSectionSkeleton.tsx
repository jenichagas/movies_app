import styles from './HeroSectionSkeleton.module.scss';

export default function HeroSectionSkeleton() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent} />
    </div>
  );
}
