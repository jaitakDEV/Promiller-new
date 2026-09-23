"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import styles from "./ScrollableLaptop.module.css";

export default function ScrollableLaptop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // =====================================================
  // TEXT
  // =====================================================

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.20, 0.36, 0.42],
    [1, 1, 0.4, 0]
  );

  const textY = useTransform(
    scrollYProgress,
    [0, 0.42],
    [0, -100]
  );

  // =====================================================
  // VIDEO WIDTH
  // =====================================================

  const videoWidth = useTransform(
    scrollYProgress,
    [0, 0.20, 0.42, 0.50, 0.72, 0.88, 1],
    ["65vw", "65vw", "72vw", "100vw", "100vw", "65vw", "65vw"]
  );

  // =====================================================
  // VIDEO HEIGHT
  // =====================================================

  const videoHeight = useTransform(
    scrollYProgress,
    [0, 0.20, 0.42, 0.50, 0.72, 0.88, 1],
    ["40vh", "45vh", "55vh", "100vh", "100vh", "45vh", "40vh"]
  );

  // =====================================================
  // VIDEO TOP POSITION
  // =====================================================

  const videoTop = useTransform(
    scrollYProgress,
    [0, 0.20, 0.42, 0.50, 0.72, 0.88, 1],
    ["44vh", "44vh", "22vh", "0vh", "0vh", "44vh", "44vh"]
  );

  // =====================================================
  // BORDER RADIUS
  // =====================================================

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.42, 0.50, 0.72, 0.88, 1],
    [24, 24, 0, 0, 24, 24]
  );

  // =====================================================
  // VIDEO OPACITY
  // =====================================================

  const videoOpacity = useTransform(
    scrollYProgress,
    [0, 0.42, 0.50, 0.72, 0.88],
    [0.95, 1, 1, 1, 1]
  );

  // =====================================================
  // INITIAL DARK OVERLAY
  // =====================================================

  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.20, 0.42, 0.50],
    [0.20, 0.20, 0.08, 0]
  );

  // =====================================================
  // GLASSMORPHISM BORDER OPACITY
  // Visible before/after the fullscreen phase, hidden
  // while the video is edge-to-edge (0.50 → 0.72)
  // =====================================================

  const glassBorderOpacity = useTransform(
    scrollYProgress,
    [0, 0.42, 0.50, 0.72, 0.88, 1],
    [1, 1, 0, 0, 1, 1]
  );

  // =====================================================
  // VIDEO PLAY / PAUSE
  // =====================================================

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const video = videoRef.current;
      if (!video) return;

      const isFullscreen = value >= 0.50 && value <= 0.72;

      if (isFullscreen) {
        if (video.paused) {
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch((error) => {
              console.error("Video playback failed:", error);
            });
        }
      } else {
        if (!video.paused) {
          video.pause();
        }
        setIsPlaying(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* TEXT */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute left-1/2 top-[8vh] z-0 w-[90%] -translate-x-1/2 text-center pointer-events-none"
        >
          <h2 className={styles.grad1}>
            See your{" "}
            <span className={styles.grad2}>whole mill</span> in one screen
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#ababab] md:text-lg">
            A 20-second look at how a mill owner checks
            their entire operation — before their first cup of chai.
          </p>
        </motion.div>
        {/* VIDEO CONTAINER */}
        <motion.div
          style={{
            width: videoWidth,
            height: videoHeight,
            top: videoTop,
            opacity: videoOpacity,
            borderRadius,
          }}
          className="absolute left-1/2 -translate-x-1/2 overflow-hidden bg-black shadow-2xl will-change-[width,height,top] border border-white/20"
        >
          {/* VIDEO */}
          <video
            ref={videoRef}
            src="/videos/Promiler-final.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* DARK OVERLAY */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-black"
          />

          {/* =================================================
              GLASSMORPHISM BORDER
              Only visible before/after the fullscreen phase
          ================================================= */}

          <motion.div
            style={{
              opacity: glassBorderOpacity,
              borderRadius: "inherit",
            }}
            className="pointer-events-none absolute inset-0 z-20"
          >
            <div
              className="absolute inset-0 rounded-[inherit] backdrop-blur-md"
              style={{
                border: "1px solid rgba(255,255,255,0.35)",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 60%)",
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 24px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.25)",
              }}
            />
          </motion.div>

          {/* PLAY INDICATOR */}
          {!isPlaying && (
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-xl">
                ▶
              </div>
            </div>
          )}
        </motion.div>
        </div>
    </section>
  );
}