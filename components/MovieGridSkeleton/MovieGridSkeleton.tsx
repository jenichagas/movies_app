import CardSkeleton from '../CardSkeleton';
import gridStyles from '../MovieGrid/MovieGrid.module.scss';

export default function MovieGridSkeleton() {
  const skeletonCount = 12;

  return (
    <div className={gridStyles.movieGrid} >
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
