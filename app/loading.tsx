import CategoriesListSkeleton from "@/components/CategoriesList/Skeleton";
import HeroSectionSkeleton from "@/components/HeroSection/Skeleton";
import MenuSkeleton from "@/components/Menu/Skeleton";
import MovieGridSkeleton from "@/components/MovieGrid/Skeleton/MovieGridSkeleton";


export default function Loading() {
  return (
    <>
      <MenuSkeleton />
      <HeroSectionSkeleton />
      <CategoriesListSkeleton />
      <MovieGridSkeleton />
    </>
  );
}
