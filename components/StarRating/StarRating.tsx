import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import style from "./StarRating.module.scss"

export interface StarRatingProps {
  rating: number;
}

export default function StarRating(Props: StarRatingProps) {
  const numStar = Math.round(Props.rating / 2);
  const fullStars = [];
  const emptyStars = [];

  for (let i = 0; i < 5; i++) {
    if (i < numStar) {
      fullStars.push(i);
    } else {
      emptyStars.push(i);
    }
  }
  return (
    <div className={style.starRate}>
      {fullStars.map((index) => (
        <TiStarFullOutline key={index} />
      ))}
      {emptyStars.map((index) => (
        <TiStarOutline key={index} />
      ))}
    </div>
  );
}
