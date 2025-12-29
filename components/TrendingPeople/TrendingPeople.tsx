"use client";
import Slider from "react-slick";
import styles from "./TrendingPeople.module.scss";
import Image from "next/image";
import { Person } from "@/app/types";

interface TrendingPeopleProps {
  people: Person[];
}

export default function TrendingPeople({ people }: TrendingPeopleProps) {
  const settings = {
    dots: false,
    infinite: true,
    vertical: true,
    verticalSwiping: false,
    slidesToShow: 8,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (!people || people.length === 0) {
    return null; // Ou um skeleton/placeholder se preferir
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/w185";

  return (
    <div className={styles.peopleContainer}>
      <h3>Artistas Populares</h3>
      <Slider {...settings}>
        {people
          .filter((person) => person.profile_path)
          .map((person) => (
            <div key={person.id} className={styles.person}>
              <Image
                src={`${imageBaseUrl}${person.profile_path}`}
                alt={person.name}
                width={80}
                height={80}
                className={styles.personImage}
              />
              <div className={styles.personInfo}>
                <strong>{person.name}</strong>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
