"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FeatureComp.module.css";

export default function AnalyticsHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Video could not be played:", error);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const futureText = "future";

  return (
    <main className={styles.hero}>
      <div className={styles.content}>
        {/* =========================
            TOP SECTION
        ========================= */}
        <div className={styles.topSection}>
          {/* =========================
              TEXT AREA
          ========================= */}
          <div className={styles.textArea}>
            <div className={styles.headingBlock}>
              {/* =========================
                  FIRST ROW
              ========================= */}
              <div className={styles.firstLine}>
                {/* ICON GROUP */}
                <div className={styles.decorGroup}>
                  {/* Lightning */}
                  <div className={`${styles.circle} ${styles.lightningCircle}`}>
                    <svg
                      viewBox="0 0 24 24"
                      className={styles.lightningIcon}
                      fill="currentColor"
                    >
                      <path d="M13.1 2 4 13h6.2L8.9 22 20 9.2h-6.4L13.1 2Z" />
                    </svg>
                  </div>

                  {/* Analytics */}
                  <div className={`${styles.circle} ${styles.analyticsCircle}`}>
                    <svg
                      viewBox="0 0 32 32"
                      className={styles.analyticsIcon}
                      fill="none"
                    >
                      <path
                        d="M5 23L12 16L17 19L27 9"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <circle cx="5" cy="23" r="2.5" fill="currentColor" />
                      <circle cx="12" cy="16" r="2.5" fill="currentColor" />
                      <circle cx="17" cy="19" r="2.5" fill="currentColor" />
                      <circle cx="27" cy="9" r="2.5" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* ANALYTICS */}
                <h1 className={`${styles.analyticsText} ${styles.entryRise}`}>
                  Analytics
                </h1>
              </div>

              {/* =========================
                  SECOND ROW
              ========================= */}
              <div className={styles.secondLine}>
                {/* THAT */}
                <span className={`${styles.blackText} ${styles.entryFlipRise}`}>
                  that
                </span>

                {/* HELPS */}
                <span className={`${styles.grayText} ${styles.entryZoom}`}>
                  helps
                </span>

                {/* YOU */}
                <span className={`${styles.blackText} ${styles.entryRise}`}>
                  you
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              VIDEO AREA
          ========================= */}
          <div className={styles.videoArea}>
            <div className={styles.videoWrapper}>
              <video
                ref={videoRef}
                className={styles.video}
                src="/videos/dashboard.mp4"
                muted
                playsInline
                preload="metadata"
              />

              <div className={styles.videoFade} />

              <button
                type="button"
                aria-label={
                  isPlaying ? "Pause dashboard video" : "Play dashboard video"
                }
                onClick={toggleVideo}
                className={`${styles.playButton} ${
                  isPlaying ? styles.playing : ""
                }`}
              >
                {isPlaying ? (
                  <span className={styles.pauseIcon}>
                    <span />
                    <span />
                  </span>
                ) : (
                  <span className={styles.playIcon} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =========================
            THIRD ROW
        ========================= */}
        <div className={styles.thirdLine}>
          {/* SHAPE */}
          <span className={`${styles.blackText} ${styles.entryRise}`}>
            shape
          </span>

          {/* MORPHING CIRCLE */}
          <div className={styles.shapeCircle}>
            <svg
              viewBox="0 0 32 32"
              className={styles.shapeIcon}
              fill="currentColor"
            >
              <rect x="7" y="13" width="4" height="10" rx="2" />

              <rect x="14" y="8" width="4" height="15" rx="2" />

              <rect x="21" y="11" width="4" height="12" rx="2" />
            </svg>
          </div>

          {/* THE */}
          <span className={`${styles.blackText} ${styles.entryRise}`}>the</span>

          {/* FUTURE */}
          <span className={styles.futureText}>
            {futureText.split("").map((char, index) => (
              <span
                key={char + index}
                className={styles.futureChar}
                style={{
                  animationDelay: `${1.05 + index * 0.09}s`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>
      </div>
    </main>
  );
}
