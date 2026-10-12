"use client";

import { useState } from "react";
import styles from "./EnergyMonitoring.module.css";

const features = [
  {
    title: "Live energy consumption tracking",
    content:
      "Monitor electricity consumption continuously across every connected machine and production line."
  },
  {
    title: "Usage tied to machine load and output",
    content:
      "See exactly how power consumption changes with machine load, production output and operating conditions."
  },
  {
    title: "Load-based optimisation suggestions",
    content:
      "ProMiller identifies inefficient load patterns and recommends practical adjustments to reduce energy use."
  },
  {
    title: "Trends over days, weeks and months",
    content:
      "Compare energy performance over time and spot rising consumption, unusual patterns and opportunities to save."
  }
];

export default function EnergyMonitoring() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFeature = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left */}
        <div className={styles.left}>
          <div className={styles.eyebrow}>02 — Energy Monitoring</div>

          <h2 className={styles.heading}>
            Know where every
            <br />
            unit of power goes.
          </h2>

          <p className={styles.subheading}>
            Lower electricity use starts with seeing it.
          </p>

          <div className={styles.featureList}>
            {features.map((feature, index) => {
              const isOpen = openIndex === index;

              return (
                <button
                  key={feature.title}
                  className={`${styles.featureCard} ${
                    isOpen ? styles.featureCardOpen : ""
                  }`}
                  onClick={() => toggleFeature(index)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardTitle}>
                      {feature.title}
                    </span>

                    <span
                      className={`${styles.plus} ${
                        isOpen ? styles.plusOpen : ""
                      }`}
                    >
                      +
                    </span>
                  </div>

                  <div
                    className={`${styles.cardContent} ${
                      isOpen ? styles.cardContentOpen : ""
                    }`}
                  >
                    <p>{feature.content}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right */}
        <div className={styles.visual}>
          <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
              <div className={styles.logo}>
                <span className={styles.logoMark}>P</span>
                <span>ProMiller</span>
              </div>

              <div className={styles.search}>
                <span>⌕</span>
                Search
              </div>

              <div className={styles.headerDot} />
            </div>

            <div className={styles.dashboardBody}>
              <div className={styles.revenueLabel}>
                Energy consumption
              </div>

              <div className={styles.energyValue}>
                1,342 <span>kWh</span>
                <small>↓ 12.4%</small>
              </div>

              <div className={styles.chart}>
                <div className={styles.chartLabels}>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>

                <div className={styles.bars}>
                  {[48, 70, 58, 84, 52, 74, 42, 63, 78, 54].map(
                    (height, index) => (
                      <div
                        key={index}
                        className={styles.bar}
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>

              <div className={styles.stats}>
                <div className={styles.statCard}>
                  <span>Machine load</span>
                  <strong>72%</strong>
                  <div className={styles.progress}>
                    <i style={{ width: "72%" }} />
                  </div>
                </div>

                <div className={styles.statCard}>
                  <span>Energy / output</span>
                  <strong>8.42 kWh</strong>
                  <div className={styles.progress}>
                    <i style={{ width: "56%" }} />
                  </div>
                </div>

                <div className={styles.statCard}>
                  <span>Potential saving</span>
                  <strong>14.8%</strong>
                  <div className={styles.progress}>
                    <i style={{ width: "81%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating mobile dashboard */}
          <div className={styles.phone}>
            <div className={styles.phoneNotch} />

            <div className={styles.phoneHeader}>
              <span>ProMiller</span>
              <span>•••</span>
            </div>

            <span className={styles.phoneLabel}>
              Today&apos;s energy
            </span>

            <strong className={styles.phoneValue}>
              342 kWh
            </strong>

            <span className={styles.phoneChange}>
              ↓ 8.2% vs yesterday
            </span>

            <div className={styles.phoneChart}>
              {[30, 45, 38, 68, 55, 78, 49, 62].map(
                (height, index) => (
                  <div
                    key={index}
                    className={styles.phoneBar}
                    style={{ height: `${height}%` }}
                  />
                )
              )}
            </div>

            <div className={styles.phoneReport}>
              <span>Energy efficiency</span>
              <strong>92%</strong>
            </div>

            <div className={styles.phoneReport}>
              <span>Machine load</span>
              <strong>74%</strong>
            </div>
          </div>

          <div className={styles.brandText}>ProMiller</div>
        </div>
      </div>
    </section>
  );
}