"use client";

import { useState } from "react";
import styles from "./MachineHealthScore.module.css";

const history = [76, 78, 77, 81, 79, 84, 87, 86, 89, 91];

export default function MachineHealthScore() {
  const [checked, setChecked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const score = 89;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Intro */}
        <div className={styles.intro}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            MACHINE HEALTH
          </div>

          <h2>
            One number.
            <br />
            <span>Instant clarity.</span>
          </h2>

          <p>
            Know how every machine is doing in a second. ProMiller turns
            machine signals into one simple health score.
          </p>
        </div>

        {/* Interactive card */}
        <div
          className={`${styles.healthCard} ${
            checked ? styles.cardExpanded : ""
          }`}
        >
          {!checked ? (
            /* Initial state */
            <div className={styles.checkState}>
              <div className={styles.machineIcon}>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M7 9h10M7 13h5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <circle cx="17" cy="14" r="1" fill="currentColor" />
                </svg>
              </div>

              <div className={styles.checkContent}>
                <span className={styles.machineLabel}>
                  CNC Milling Machine · M-204
                </span>

                <h3>How is this machine doing?</h3>

                <p>
                  Check its current health using live machine signals.
                </p>
              </div>

              <button
                className={styles.checkButton}
                onClick={() => setChecked(true)}
              >
                Check health
                <span>↗</span>
              </button>
            </div>
          ) : (
            /* Revealed state */
            <div className={styles.resultState}>
              <div className={styles.resultHeader}>
                <div>
                  <div className={styles.machineName}>
                    <span className={styles.liveDot} />
                    CNC Milling Machine · M-204
                  </div>

                  <h3>Machine health</h3>
                </div>

                <button
                  className={styles.closeButton}
                  onClick={() => {
                    setChecked(false);
                    setShowDetails(false);
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className={styles.scoreLayout}>
                {/* Gauge */}
                <div className={styles.gaugeWrapper}>
                  <svg
                    className={styles.gauge}
                    viewBox="0 0 300 175"
                    fill="none"
                  >
                    {/* Background arc */}
                    <path
                      d="M25 150 A125 125 0 0 1 275 150"
                      pathLength="100"
                      className={styles.gaugeTrack}
                    />

                    {/* Green progress */}
                    <path
                      d="M25 150 A125 125 0 0 1 275 150"
                      pathLength="100"
                      className={styles.gaugeProgress}
                    />
                  </svg>

                  <div className={styles.scoreContent}>
                    <span>Your health score</span>

                    <strong>{score}</strong>

                    <div className={styles.healthyPill}>
                      <span />
                      Healthy
                    </div>
                  </div>
                </div>

                {/* Score explanation */}
                <div className={styles.scoreInfo}>
                  <div className={styles.statusBox}>
                    <div className={styles.statusIcon}>✓</div>

                    <div>
                      <strong>Machine is running well</strong>
                      <p>
                        No critical issues detected across current machine
                        signals.
                      </p>
                    </div>
                  </div>

                  <div className={styles.metrics}>
                    <div>
                      <span>Temperature</span>
                      <strong>Normal</strong>
                    </div>

                    <div>
                      <span>Vibration</span>
                      <strong>Low</strong>
                    </div>

                    <div>
                      <span>Load</span>
                      <strong>Optimal</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className={styles.historySection}>
                <div className={styles.historyHeader}>
                  <div>
                    <span>HEALTH HISTORY</span>
                    <h4>Stable over the last 10 readings</h4>
                  </div>

                  <span className={styles.historyChange}>+13 pts</span>
                </div>

                <div className={styles.chart}>
                  <div className={styles.chartGrid}>
                    <span />
                    <span />
                    <span />
                  </div>

                  <svg
                    viewBox="0 0 600 130"
                    preserveAspectRatio="none"
                    className={styles.chartSvg}
                  >
                    <defs>
                      <linearGradient
                        id="areaGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="currentColor"
                          stopOpacity="0.16"
                        />
                        <stop
                          offset="100%"
                          stopColor="currentColor"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 82 L66 76 L133 80 L200 59 L266 69 L333 48 L400 39 L466 43 L533 28 L600 18 L600 130 L0 130 Z"
                      fill="url(#areaGradient)"
                    />

                    <path
                      d="M0 82 L66 76 L133 80 L200 59 L266 69 L333 48 L400 39 L466 43 L533 28 L600 18"
                      className={styles.chartLine}
                    />

                    <circle cx="600" cy="18" r="5" className={styles.chartDot} />
                  </svg>

                  <div className={styles.chartLabels}>
                    <span>10 readings ago</span>
                    <span>Now</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div
                className={`${styles.details} ${
                  showDetails ? styles.detailsOpen : ""
                }`}
              >
                <div className={styles.detailsGrid}>
                  <div>
                    <span>Health score</span>
                    <strong>89 / 100</strong>
                  </div>

                  <div>
                    <span>Last checked</span>
                    <strong>Just now</strong>
                  </div>

                  <div>
                    <span>Signals analysed</span>
                    <strong>24</strong>
                  </div>

                  <div>
                    <span>Risk level</span>
                    <strong className={styles.lowRisk}>Low</strong>
                  </div>
                </div>
              </div>

              <button
                className={styles.detailsButton}
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Hide details" : "View why this score"}
                <span className={showDetails ? styles.rotate : ""}>↓</span>
              </button>
            </div>
          )}
        </div>

        {/* Feature points */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureNumber}>01</div>
            <div>
              <h4>A single score per machine</h4>
              <p>
                Every machine gets a clear 0–100 health score.
              </p>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureNumber}>02</div>
            <div>
              <h4>Colour-coded status</h4>
              <p>
                Healthy, watch, or action needed — at a glance.
              </p>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureNumber}>03</div>
            <div>
              <h4>Drill into the reasons</h4>
              <p>
                Understand exactly what is driving the score.
              </p>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureNumber}>04</div>
            <div>
              <h4>Spot slow decline</h4>
              <p>
                Historical scores reveal problems before they become
                downtime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}