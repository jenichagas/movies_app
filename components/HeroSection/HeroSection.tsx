"use client";

import { useState } from "react";
import styles from "./HeroSection.module.scss";
import { FaCirclePlay } from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";
import Player from "../Player/Player";

const VIDEOS = [
  {
    id: 1,
    title: "Viagem Fantástica",
    description: "Uma jornada épica através de mundos desconhecidos.",
    src: "/film-1.mp4",
  },
  {
    id: 2,
    title: "Massacre em NewFork",
    description:
      "Um thriller eletrizante que vai prender sua atenção do começo ao fim.",
    src: "/film-2.mp4",
  },
  {
    id: 3,
    title: "Aventura Inesquecível",
    description: "Uma história de coragem e amizade que vai tocar seu coração.",
    src: "/film-3.mp4",
  },
];

export default function HeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % VIDEOS.length);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <video
          key={VIDEOS[currentVideoIndex].id}
          className={styles.heroVideo}
          src={VIDEOS[currentVideoIndex].src}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
      </div>
      <div className={styles.actions}>
        <div className={styles.textContent}>
          <h3 className={styles.heroTitle}>
            {VIDEOS[currentVideoIndex].title}
          </h3>
          <p className={styles.heroDescription}>
            {" "}
            {VIDEOS[currentVideoIndex].description}
          </p>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => setIsModalOpen(true)}>
            {" "}
            <FaCirclePlay /> Assistir trailer
          </button>
          <button>
            <IoInformationCircle /> detalhes
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Player
          title={VIDEOS[currentVideoIndex].title}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
