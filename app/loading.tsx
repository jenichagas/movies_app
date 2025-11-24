import CategoriesListSkeleton from "@/components/CategoriesList/Skeleton";
import HeroSectionSkeleton from "@/components/HeroSection/Skeleton";
import MovieGridSkeleton from "@/components/MovieGrid/Skeleton/MovieGridSkeleton";

export default function Loading() {
  return (
    <>
      <HeroSectionSkeleton />
      <CategoriesListSkeleton />
      <MovieGridSkeleton />
    </>
  );
}