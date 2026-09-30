"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type TouchEvent,
} from "react";

import { processSteps, type Step } from "./steps";
import styles from "./how-it-works.module.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext", "devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const AUTOPLAY_MS = 4200;
const SWIPE_THRESHOLD = 50;

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          direction === "right"
            ? "M4 10h11m0 0l-4.5-4.5M15 10l-4.5 4.5"
            : "M16 10H5m0 0l4.5-4.5M5 10l4.5 4.5"
        }
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="3.4" height="12" rx="1" />
      <rect x="10.6" y="3" width="3.4" height="12" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5 3.4v11.2a.8.8 0 0 0 1.2.7l9-5.6a.8.8 0 0 0 0-1.4l-9-5.6A.8.8 0 0 0 5 3.4Z" />
    </svg>
  );
}

type HowItWorksProps = {
  /** Defaults to the ProMiller process steps */
  steps?: Step[];
  heading?: string;
  /** Small line above the heading */
  kicker?: string;
  /** Paragraph under the heading */
  intro?: string;
};

/* Used when <HowItWorks /> is rendered with no props */
const DEFAULT_HEADER = {
  kicker: "How ProMiller Works",
  heading: "Your Mill, Transformed",
  intro:
    "We upgrade your existing infrastructure with smart WonderMill technology and ongoing performance management, no rebuild required.",
};

export default function HowItWorks(props: HowItWorksProps) {
  const usingDefaults = !props.steps;
  const steps = props.steps ?? processSteps;
  const heading = props.heading ?? DEFAULT_HEADER.heading;
  // Custom step lists don't inherit the default kicker / intro text
  const kicker =
    props.kicker ?? (usingDefaults ? DEFAULT_HEADER.kicker : undefined);
  const intro =
    props.intro ?? (usingDefaults ? DEFAULT_HEADER.intro : undefined);
  const total = steps.length;
  const headingId = useId();

  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [focused, setFocused] = useState(false); // keyboard focus inside the section
  const [touching, setTouching] = useState(false); // finger on the slider
  const [hidden, setHidden] = useState(false); // browser tab in background
  const [inView, setInView] = useState(false); // section visible on screen
  const [userPaused, setUserPaused] = useState(false); // pause button
  const [reducedMotion, setReducedMotion] = useState(false);

  // Autoplay keeps running on hover; it only stops for the reasons below
  const paused = focused || touching || hidden || !inView || userPaused;
  const running = !paused && !reducedMotion;

  const sectionRef = useRef<HTMLElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const activeRef = useRef(0);
  const lastPlaced = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total); // wraps around at both ends
    },
    [total],
  );
  function renderHeading(text: string) {
    const words = text.trim().split(" ");
    const last = words.pop();
    return (
      <>
        {words.join(" ")} <span className={styles.headingAccent}>{last}</span>
      </>
    );
  }

  const place = useCallback((instant: boolean) => {
    const viewport = windowRef.current;
    const track = trackRef.current;
    const index = activeRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!viewport || !track || !card) return;

    // Longer jumps (e.g. last → first) get a little more time so they don't blur past
    const distance = Math.abs(index - lastPlaced.current);
    lastPlaced.current = index;
    const duration = instant
      ? 0
      : Math.min(480 + Math.max(distance - 1, 0) * 90, 850);

    const x = (viewport.clientWidth - card.offsetWidth) / 2 - card.offsetLeft;
    track.style.transitionDuration = `${duration}ms`;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }, []);

  useLayoutEffect(() => {
    activeRef.current = active;
    place(false);
  }, [active, place]);

  useEffect(() => {
    const viewport = windowRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => place(true));
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [place]);

  // Enable the slide transition only after the first position is set (no jump on load)
  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  /* ---------- Autoplay conditions ---------- */

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Only autoplay while the section is actually on screen
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  /* ---------- Swipe ---------- */

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    setTouching(true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    setTouching(false);
    if (!start) return;

    const touch = event.changedTouches[0];
    const dx = start.x - touch.clientX;
    const dy = start.y - touch.clientY;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    goTo(dx > 0 ? active + 1 : active - 1);
  };

  return (
    <section
      ref={sectionRef}
      className={`${poppins.className} ${styles.section}`}
      style={{ "--autoplay-ms": `${AUTOPLAY_MS}ms` } as CSSProperties}
      data-paused={!running}
      aria-labelledby={headingId}
      onFocus={(event) => setFocused(event.target.matches(":focus-visible"))}
      onBlur={() => setFocused(false)}
    >
      {/* Header */}
      <header className={styles.header}>
        {kicker && <p className={styles.kicker}>{kicker}</p>}
        <h2 id={headingId} className={styles.heading}>
          {renderHeading(heading)}
        </h2>
        {intro && <p className={styles.intro}>{intro}</p>}
      </header>

      {/* Slider */}
      <div
        className={styles.stage}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${heading}, ${total} steps`}
      >
        <div
          ref={windowRef}
          className={styles.window}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => setTouching(false)}
        >
          <div
            ref={trackRef}
            className={styles.track}
            data-ready={ready}
            aria-live={running ? "off" : "polite"}
          >
            {steps.map((step, index) => {
              const isActive = index === active;
              // First two images are preloaded; the rest load eagerly so sliding never waits on a fetch
              const loadProps =
                index < 2 ? { priority: true } : { loading: "eager" as const };

              return (
                <article
                  key={step.id}
                  className={styles.card}
                  data-active={isActive}
                  data-fit={step.image.fit ?? "cover"}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Step ${index + 1} of ${total}: ${step.title}`}
                  aria-hidden={!isActive}
                  onClick={isActive ? undefined : () => goTo(index)}
                >
                  {step.image.fit === "contain" ? (
                    <div className={styles.figure}>
                      <Image
                        src={step.image.src}
                        alt=""
                        fill
                        sizes="(min-width: 900px) 420px, 70vw"
                        quality={80}
                        className={styles.imageContain}
                        {...loadProps}
                      />
                    </div>
                  ) : (
                    <>
                      <Image
                        src={step.image.src}
                        alt=""
                        fill
                        sizes="(min-width: 900px) 900px, 88vw"
                        quality={80}
                        className={styles.image}
                        {...loadProps}
                      />
                      <div className={styles.overlay} aria-hidden="true" />
                    </>
                  )}

                  <p className={styles.stepCount}>
                    Step {index + 1} <span>of {total}</span>
                  </p>

                  <div className={styles.content}>
                    <span className={styles.badge}>
                      <i aria-hidden="true" />
                      {step.label}
                    </span>
                    <h3 className={styles.title}>{step.title}</h3>
                    {step.description && (
                      <p className={styles.description}>{step.description}</p>
                    )}

                    {step.highlight && (
                      <div className={styles.highlight}>
                        <span className={styles.highlightValue}>
                          {step.highlight.value}
                        </span>
                        <span className={styles.highlightCaption}>
                          {step.highlight.caption}
                        </span>
                      </div>
                    )}

                    {step.flow && (
                      <div className={styles.flow}>
                        <div className={styles.flowBox}>
                          <span className={styles.flowLabel}>
                            {step.flow.fromLabel}
                          </span>
                          <span className={styles.flowValue}>
                            {step.flow.fromValue}
                          </span>
                        </div>
                        <span className={styles.flowArrow} aria-hidden="true">
                          <ArrowIcon />
                        </span>
                        <div className={styles.flowBox}>
                          <span className={styles.flowLabel}>
                            {step.flow.toLabel}
                          </span>
                          <span className={styles.flowValue}>
                            {step.flow.toValue}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls: arrows + step dots (with progress) + pause */}
      <div className={styles.controls}>
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous step"
            onClick={() => goTo(active - 1)}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next step"
            onClick={() => goTo(active + 1)}
          >
            <ArrowIcon />
          </button>
        </div>

        <div className={styles.dots}>
          {steps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              className={styles.dot}
              data-active={index === active}
              aria-label={`Go to step ${index + 1}: ${step.label}`}
              aria-current={index === active ? "step" : undefined}
              onClick={() => goTo(index)}
              onAnimationEnd={
                index === active ? () => goTo(active + 1) : undefined
              }
            />
          ))}
        </div>

        {reducedMotion ? (
          <span className={styles.controlsSpacer} aria-hidden="true" />
        ) : (
          <button
            type="button"
            className={`${styles.arrow} ${styles.playPause}`}
            aria-label={userPaused ? "Play autoplay" : "Pause autoplay"}
            aria-pressed={userPaused}
            onClick={() => setUserPaused((value) => !value)}
          >
            {userPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
        )}
      </div>
    </section>
  );
}
