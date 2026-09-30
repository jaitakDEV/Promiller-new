"use client";

import React from "react";
import { motion } from "motion/react";
import styles from "./AboutusSection.module.css";
import { Caveat } from "next/font/google";
import Image from "next/image";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

interface FeaturePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const FEATURE_PILLARS: FeaturePillar[] = [
  {
    id: "consultation",
    title: "Expert Consultation",
    subtitle: "Milling Feasibility & Audits",
    description:
      "In-depth grain analysis, flowsheet optimization, and throughput diagnostics by seasoned milling technocrats from R.S. Choyal Group.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="10" r="5" />
        <path d="M7 26c0-4.4 4-8 9-8s9 3.6 9 8" />
        <path d="M25 11a3.5 3.5 0 0 1 0 6" />
        <path d="M7 17a3.5 3.5 0 0 1 0-6" />
      </svg>
    ),
  },
  {
    id: "solutions",
    title: "Tailored Solutions",
    subtitle: "Bespoke Plant Engineering",
    description:
      "Custom roller configurations, pneumatic convey systems, and automated roll gap mechanics customized precisely to your regional grain variety and target flour yield.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="16" r="4" />
        <path d="M16 4v4m0 16v4M4 16h4m16 0h4" />
        <path d="M7.5 7.5l2.8 2.8m11.4 11.4l2.8 2.8M7.5 24.5l2.8-2.8m11.4-11.4l2.8-2.8" />
        <circle cx="25" cy="7" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "support",
    title: "Installation & Support",
    subtitle: "Turnkey Commissioning",
    description:
      "End-to-end mechanical, electrical, and SCADA automation erection, followed by rigorous wet commissioning, operator training, and 24/7 technical hotline.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 6a10 10 0 0 1 10 10c0 3.2-1.5 6-3.8 7.8L21 21" />
        <path d="M16 26A10 10 0 0 1 6 16c0-3.2 1.5-6 3.8-7.8L11 11" />
        <path d="M26 6v5h-5M6 26v-5h5" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    ),
  },
  {
    id: "partnership",
    title: "Long-Term Partnership",
    subtitle: "Lifecycle Value & Growth",
    description:
      "Preventive maintenance contracts, guaranteed spare parts inventory, annual energy efficiency audits, and future-proof digital upgrades.",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 14l5-3 5 4 5-4 5 3v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-9z" />
        <path d="M11 15l5 4 5-4" />
        <path d="M16 19v5" />
        <circle cx="16" cy="7" r="2.5" />
      </svg>
    ),
  },
];

function renderTitleLines(title: string) {
  const parts = title.includes(" & ")
    ? title.split(" & ").map((p, i) => (i === 0 ? `${p} &` : p))
    : title.split(" ").length === 2
      ? title.split(" ")
      : [title];

  if (parts.length === 1) return parts[0];

  return parts.map((line, i) => <span key={i}>{line}</span>);
}

export function AboutusSection() {
  return (
    <section id="about-promiller-section" className={styles.section}>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="promillerIconGradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="32"
            y2="0"
          >
            <stop offset="0%" stopColor="#2980B9" />
            <stop offset="100%" stopColor="#6DD5FA" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.blobTop} aria-hidden="true" />
      <div className={styles.blobBottom} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrap}>
              <div className={styles.backdropShapeOne} aria-hidden="true" />
              <div className={styles.backdropShapeTwo} aria-hidden="true" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={styles.mainImage}
              >
                <Image
                  src="/images/sectionImages/Home-page1.png"
                  alt="Freshly milled flour"
                  width={1200}
                  height={800}
                  priority
                />
                <div className={styles.mainImageOverlay} />
                <div className={styles.mainImageBadge}>
                  <div className={styles.mainImageBadgeLeft}>
                    <span className={styles.pulseDot} />
                    <span className={styles.badgeTitle}>
                      ProMiller Eco-Floor
                    </span>
                  </div>
                  <span className={styles.badgeSub}>R.S. Choyal</span>
                </div>
              </motion.div>

              <div className={styles.sideStack}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`${styles.handwritten} ${caveat.className}`}
                >
                  <span
                    className={`${styles.handwrittenLine} ${styles.lineOne}`}
                  >
                    From Grain
                  </span>
                  <span
                    className={`${styles.handwrittenLine} ${styles.lineTwo}`}
                  >
                    to Goodness
                  </span>

                  <svg
                    className={styles.doodleArrow}
                    viewBox="0 0 36 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M8 2 C 14 14, 28 20, 24 38" />
                    <path d="M19 32 L 24 38 L 29 33" />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={styles.sproutBadge}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      width: "2.75rem",
                      height: "2.75rem",
                    }}
                  >
                    <path d="M0 0h24v24H0z" fill="none" />

                    <path
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M14.35 9.65L3 21
      M19.67 8.586c-2.128 2.128-5.32 1.064-5.32 1.064s-1.064-3.192 1.064-5.32c1.389-1.389 3.231-1.418 4.343-1.27a1.36 1.36 0 0 1 1.184 1.183c.147 1.112.118 2.954-1.271 4.343
      m-3.902 7.094c-2.837 0-4.256-2.837-4.256-2.837s1.419-2.837 4.256-2.837c1.82 0 3.056 1.166 3.709 2.003a1.34 1.34 0 0 1 0 1.668c-.653.837-1.89 2.003-3.709 2.003
      M8.32 8.232c0 2.838 2.838 4.256 2.838 4.256s2.837-1.418 2.837-4.256c0-1.819-1.166-3.055-2.004-3.708a1.34 1.34 0 0 0-1.667 0c-.837.653-2.004 1.89-2.004 3.708
      m2.838 12.058c-2.838 0-4.257-2.837-4.257-2.837s1.42-2.837 4.257-2.837c1.819 0 3.055 1.166 3.708 2.003a1.34 1.34 0 0 1 0 1.668c-.653.837-1.89 2.003-3.708 2.003
      m-7.449-7.447c0 2.837 2.838 4.255 2.838 4.255s2.837-1.418 2.837-4.255c0-1.82-1.166-3.056-2.004-3.709a1.34 1.34 0 0 0-1.667 0c-.837.653-2.004 1.89-2.004 3.708"
                    />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className={styles.flourCard}
                >
                  <Image
                    src="/images/sectionImages/Home-page3.jpg"
                    alt="Freshly milled flour"
                    width={1200}
                    height={800}
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </div>

          <div className={styles.contentColumn}>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.eyebrowRow}
            >
              <span className={styles.tagPill}>About Us</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className={styles.headline}>
                More Than Just Machines, We Build{" "}
                <span className={styles.headlineAccent}>Milling Success</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.narrative}
            >
              <p>
                <strong>ProMiller</strong> is a trusted next-generation milling
                ecosystem developed by the{" "}
                <span className={styles.narrativeAccent}>
                  R.S. Choyal Group
                </span>
                , known for transforming traditional flour mills into highly
                efficient, technology-driven operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={styles.pillarsWrap}
            >
              <div className={styles.pillarsGrid}>
                {FEATURE_PILLARS.map((pillar) => (
                  <div key={pillar.id} className={styles.pillarCard}>
                    <div className={styles.pillarIcon}>{pillar.icon}</div>
                    <div className={styles.pillarTitle}>
                      {renderTitleLines(pillar.title)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
