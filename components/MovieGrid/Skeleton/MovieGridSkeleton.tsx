import CardSkeleton from "../../MovieCard/Skeleton/CardSkeleton";
import gridStyles from "../MovieGrid.module.scss";

export default function MovieGridSkeleton() {
  const skeletonCount = 8;

  return (
    <div className={gridStyles.movieGrid}>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
