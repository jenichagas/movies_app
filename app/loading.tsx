import CategoriesListSkeleton from "@/components/CategoriesListSkeleton";
import HeroSectionSkeleton from "@/components/HeroSectionSkeleton";
import MovieGridSkeleton from "@/components/MovieGridSkeleton";

export default function Loading() {
  return (
    <>
      <HeroSectionSkeleton />
      <CategoriesListSkeleton />
      <MovieGridSkeleton />
    </>
  );
}