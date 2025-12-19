import CardSkeleton from "../../MovieCard/Skeleton/CardSkeleton";
import styles from "./MovieCarouselSkeleton.module.scss";

interface MovieCarouselSkeletonProps {
  count?: number;
  cardWidth?: number;
}

export default function MovieCarouselSkeleton({
  count = 5,
  cardWidth = 200,
}: MovieCarouselSkeletonProps) {
  return (
    <div className={styles.carouselRoot}>
      <div className={styles.skeletonContainer}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} style={{ flex: `0 0 ${cardWidth}px` }}>
            <CardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
