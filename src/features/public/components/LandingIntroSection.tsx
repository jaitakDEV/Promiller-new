"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./LandingIntroSection.module.css";

type Stage = "start" | "active" | "end";

export default function LandingIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const prevStageRef = useRef<Stage>("start");
  const autoScrollingRef = useRef(false);

  const [stage, setStage] = useState<Stage>("start");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (autoScrollingRef.current) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const scrolled = -rect.top;
      const progress = Math.min(
        1,
        Math.max(0, scrolled / (sectionHeight - window.innerHeight)),
      );

      let next: Stage;
      if (progress < 0.15) next = "start";
      else if (progress > 0.85) next = "end";
      else next = "active";

      setStage((prev) => (prev === next ? prev : next));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const safePlay = (video: HTMLVideoElement) => {
    if (!video.paused) return;
    const promise = video.play();
    playPromiseRef.current = promise;
    promise
      .then(() => {
        if (playPromiseRef.current === promise) setIsPlaying(true);
      })
      .catch((error: DOMException) => {
        if (error?.name !== "AbortError") {
          console.error("Video playback failed:", error);
        }
      });
  };

  const safePause = (video: HTMLVideoElement) => {
    if (video.paused) {
      setIsPlaying(false);
      return;
    }
    const pending = playPromiseRef.current;
    if (pending) {
      pending.finally(() => {
        if (!video.paused) video.pause();
        setIsPlaying(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const enteringActiveFresh =
      stage === "active" && prevStageRef.current !== "active";

    if (stage === "active") {
      if (enteringActiveFresh) {
        video.currentTime = 0;
      }
      safePlay(video);
    } else {
      safePause(video);
      video.currentTime = 0;
    }

    prevStageRef.current = stage;
  }, [stage]);

  const handleVideoEnded = () => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const targetScrollY = window.scrollY + rect.bottom - window.innerHeight;

    autoScrollingRef.current = true;
    setStage("end");

    window.scrollTo({ top: targetScrollY, behavior: "smooth" });

    window.setTimeout(() => {
      autoScrollingRef.current = false;
    }, 900);
  };

  const isActive = stage === "active";

  const containerStyle: React.CSSProperties = isActive
    ? {
        width: "100%",
        height: "100%",
        top: "0",
        borderRadius: 0,
      }
    : {
        width: "65vw",
        height: "42vh",
        top: "44vh",
        borderRadius: 24,
      };

  return (
    <section ref={sectionRef} className="relative h-[280vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* TEXT — sirf start stage mein visible */}
        <div
          className="absolute left-1/2 top-[8vh] z-0 w-[90%] -translate-x-1/2 text-center pointer-events-none transition-opacity duration-500"
          style={{ opacity: stage === "start" ? 1 : 0 }}
        >
          <h2 className={styles.grad1}>
            See your <span className={styles.grad2}>whole mill</span> in one
            screen
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#4f6a87] md:text-lg">
            A 20-second look at how a mill owner checks their entire operation
            before their first cup of chai.
          </p>
        </div>

        {/* VIDEO CONTAINER — 3 fixed states ke beech CSS transition se snap hota hai */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            transition:
              "width 550ms cubic-bezier(0.65,0,0.35,1), height 550ms cubic-bezier(0.65,0,0.35,1), top 550ms cubic-bezier(0.65,0,0.35,1), border-radius 550ms ease",
            ...containerStyle,
          }}
          className="overflow-hidden bg-black shadow-2xl border border-white/20"
        >
          <video
            ref={videoRef}
            src="/videos/Promiler-final.mp4"
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* DARK OVERLAY — sirf start stage mein thoda dark */}
          <div
            className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-500"
            style={{ opacity: stage === "start" ? 0.2 : 0 }}
          />

          {/* GLASSMORPHISM BORDER — sirf jab video chhoti hai */}
          {!isActive && (
            <div
              className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
              style={{ borderRadius: "inherit" }}
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
            </div>
          )}

          {/* PLAY INDICATOR */}
          {!isPlaying && (
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-xl">
                ▶
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
