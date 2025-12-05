"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Player.module.scss";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaSun, FaLock, FaLockOpen } from "react-icons/fa";

interface PlayerProps {
  onClose: () => void;
  title: string;
}

export default function Player({ onClose, title }: PlayerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [brightness, setBrightness] = useState(1);
  const [isLocked, setIsLocked] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const titleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTitleAndAutoHide = useCallback(() => {
    if (isLocked) return;
    if (titleTimeoutRef.current) {
      clearTimeout(titleTimeoutRef.current);
    }
    setIsTitleVisible(true);
    titleTimeoutRef.current = setTimeout(() => {
      setIsTitleVisible(false);
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
    // Ao desbloquear, mostramos os controles novamente
    if (isLocked) {
      showTitleAndAutoHide();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      showTitleAndAutoHide();
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
      if (titleTimeoutRef.current) {
        clearTimeout(titleTimeoutRef.current);
      }
    };
  }, [isVisible, handleKeyDown, showTitleAndAutoHide]);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div
      className={`overlay ${isVisible ? "visible" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.playerContainer} ${
          isVisible ? styles.playerVisible : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={showTitleAndAutoHide}
      >
        <div className={styles.content}>
          <video
            ref={videoRef}
            className={styles.video}
            controls
            autoPlay
            onEnded={() => setIsTitleVisible(true)}
            style={{ filter: `brightness(${brightness})` }}
          >
            <source src="/TRAILER.mp4" type="video/mp4" />
          </video>

          {isLocked && <div className={styles.lockOverlay} />}

          <button
            className={`${styles.toggleLockButton} ${
              !isTitleVisible && !isLocked ? styles.controlHidden : ""
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
                !isTitleVisible ? styles.controlHidden : ""
              }`}
            >
              <h4>{title}</h4>
            </div>

            <div
              className={`${styles.brightnessControl} ${
                !isTitleVisible ? styles.controlHidden : ""
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
