import styles from "./Film.module.scss";
import TrendingPeople from "@/components/TrendingPeople";
import FilmDetails from "./FilmDetails";
import SimilarMovies from "@/components/SimilarMovies";
import {
  getMovieDetails,
  getSimilarMovies,
  getTrendingPeople,
  getMovieVideos,
} from "@/lib/movies";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";

export default async function Film({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  const sessionId = session.session_id;

  const [
    movieResponse,
    similarMoviesResponse,
    trendingPeopleResponse,
    videosResponse,
  ] = await Promise.all([
    getMovieDetails(id, sessionId),
    getSimilarMovies(id),
    getTrendingPeople(),
    getMovieVideos(id),
  ]);

  if (!movieResponse.success) {
    return notFound();
  }
  const movie = movieResponse.data;

  const similarMovies = similarMoviesResponse.success
    ? similarMoviesResponse.data
    : [];
  const trendingPeople = trendingPeopleResponse.success
    ? trendingPeopleResponse.data
    : [];
  const videos = videosResponse.success ? videosResponse.data : [];

  const officialTrailer =
    videos.find(
      (v) => v.type === "Trailer" && v.site === "YouTube" && v.official
    ) ||
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    null;

  const isFavorite = movie.account_states?.favorite || false;

  return (
    <div className={styles.filmContainer}>
      <div className={styles.mainContent}>
        <FilmDetails
          movie={movie}
          isFavorite={isFavorite}
          videoKey={officialTrailer?.key}
        />
        <div className={styles.similarSection}>
          <SimilarMovies movies={similarMovies} />
        </div>
      </div>
      <aside className={styles.sidebar}>
        <TrendingPeople people={trendingPeople} />
      </aside>
    </div>
  );
}
