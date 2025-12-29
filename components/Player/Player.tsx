"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Player.module.scss";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaSun, FaLock, FaLockOpen } from "react-icons/fa";

interface PlayerProps {
  onClose: () => void;
  title: string;
  videoUrl: string;
}

export default function Player({ onClose, title, videoUrl }: PlayerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [brightness, setBrightness] = useState(1);

  const [isLocked, setIsLocked] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showControlsAndAutoHide = useCallback(() => {
    if (isLocked) return;
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setIsControlsVisible(true);
    controlsTimeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 5000);
  }, [isLocked]);

  const handleClose = useCallback(() => {
    if (isLocked) return;
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, isLocked]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isLocked) return;
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose, isLocked]
  );
  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(e.target.value));
  };
  const toggleLock = () => {
    setIsLocked((prev) => !prev);
    if (isLocked) {
      showControlsAndAutoHide();
    }
  };

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      showControlsAndAutoHide();
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isVisible, handleKeyDown, showControlsAndAutoHide]);

  if (!isMounted) {
    return null;
  }

  const isYoutubeVideo = videoUrl.includes("youtube.com");

  const playerContent = isYoutubeVideo ? (
    <iframe
      src={videoUrl}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={styles.iframe}
      onEnded={() => setIsVisible(true)}
      style={{ filter: `brightness(${brightness})` }}
    ></iframe>
  ) : (
    <video
      className={styles.video}
      controls
      autoPlay
      onEnded={() => setIsControlsVisible(true)}
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  );

  return createPortal(
    <div
      className={`${styles.overlay} ${isVisible ? styles.overlayVisible : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.playerContainer} ${
          isVisible ? styles.playerVisible : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={showControlsAndAutoHide}
      >
        <div className={styles.content}>
          {playerContent}

          {isLocked && <div className={styles.lockOverlay} />}

          <button
            className={`${styles.toggleLockButton} ${
              !isControlsVisible && !isLocked ? styles.controlHidden : ""
            }`}
            onClick={toggleLock}
          >
            {isLocked ? <FaLock /> : <FaLockOpen />}
          </button>

          <div className={isLocked ? styles.controlHidden : ""}>
            <button className={styles.closeButton} onClick={handleClose}>
              <IoCloseCircleOutline />
            </button>

            <div
              className={`${styles.title} ${
                !isControlsVisible ? styles.controlHidden : ""
              }`}
            >
              <h4>{title}</h4>
            </div>
            <div
              className={`${styles.brightnessControl} ${
                !isControlsVisible ? styles.controlHidden : ""
              }`}
            >
              <FaSun />
              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={brightness}
                  onChange={handleBrightnessChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")!
  );
}
