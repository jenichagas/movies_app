"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./TrendingPeople.module.scss";
import Image from "next/image";
import TrendingPeopleSkeleton from "./Skeleton/TrendingPeopleSkeleton";

interface Person {
  id: number;
  name: string;
  profile_path: string;
}

export default function TrendingPeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingPeople() {
      setLoading(true);
      try {
        const response = await fetch(`/api/trending-people`);
        if (!response.ok) {
          throw new Error("Failed to fetch trending people");
        }
        const data = await response.json();
        setPeople(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingPeople();
  }, []);

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

  if (loading) {
    return <TrendingPeopleSkeleton />;
  }

  if (!people || people.length === 0) {
    return null;
  }

  const imageBaseUrl = "https://image.tmdb.org/t/p/w185";

  return (
    <div className={styles.peopleContainer}>
      <h3> Artistas Populares</h3>
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
