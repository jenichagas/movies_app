"use client";

import { useState } from "react";
import styles from "./HeroSection.module.scss";

const VIDEOS = ["/film-1.mp4", "/film2.mp4", "/film4.mp4"];

export default function HeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % VIDEOS.length);
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <video
          key={currentVideoIndex} 
          className={styles.heroVideo}
          src={VIDEOS[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
      </div>
    </div>
  );
}