"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RemoteControl.module.css";

const locations = [
  { id: 1, x: 23, y: 39 },
  { id: 2, x: 47, y: 30 },
  { id: 3, x: 57, y: 52 },
  { id: 4, x: 65, y: 57 },
  { id: 5, x: 35, y: 66 },
  { id: 6, x: 82, y: 70 },
];

export default function RemoteControl() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.remoteSection} ${
        started ? styles.started : ""
      }`}
    >
      {/* ==================================================
          WORLD / RADAR VISUAL
      ================================================== */}

      <div className={styles.visualSection}>
        <div className={styles.visualContainer}>

          <div className={styles.radar}>

            {/* Radar rings */}
            <div className={`${styles.ring} ${styles.ringLarge}`} />
            <div className={`${styles.ring} ${styles.ringMedium}`} />
            <div className={`${styles.ring} ${styles.ringSmall}`} />

            {/* Radar crosshair */}
            <div className={styles.horizontalLine} />
            <div className={styles.verticalLine} />

            {/* Radar sweep */}
            <div className={styles.sweep}>
              <span className={styles.sweepEdge} />
            </div>

            {/* ==================================================
                WORLD MAP
            ================================================== */}

            <div className={styles.map}>
              <svg
                viewBox="0 0 1000 520"
                className={styles.mapSvg}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* North America */}
                <path
                  className={styles.continent}
                  d="
                    M95 125
                    C120 100 155 87 188 92
                    L220 108
                    L239 128
                    L223 146
                    L207 151
                    L200 172
                    L181 178
                    L166 193
                    L145 174
                    L126 166
                    L111 146
                    Z
                  "
                />

                {/* South America */}
                <path
                  className={styles.continent}
                  d="
                    M278 258
                    C304 267 322 283 329 305
                    C338 329 326 354 317 374
                    C308 394 307 417 295 438
                    L279 451
                    L271 423
                    L275 399
                    L264 376
                    L271 351
                    L263 328
                    L270 304
                    L259 282
                    Z
                  "
                />

                {/* Europe */}
                <path
                  className={styles.continent}
                  d="
                    M449 130
                    L468 118
                    L485 121
                    L499 112
                    L519 116
                    L531 129
                    L525 143
                    L507 148
                    L493 158
                    L473 153
                    L457 145
                    Z
                  "
                />

                {/* Africa */}
                <path
                  className={styles.continent}
                  d="
                    M463 191
                    C489 178 517 183 536 201
                    L548 227
                    L542 256
                    L529 283
                    L518 316
                    L501 340
                    L479 327
                    L466 299
                    L455 273
                    L446 246
                    L451 218
                    Z
                  "
                />

                {/* Asia */}
                <path
                  className={styles.continent}
                  d="
                    M535 123
                    C565 102 603 96 637 104
                    L677 113
                    L713 129
                    L739 147
                    L765 158
                    L774 180
                    L755 194
                    L727 190
                    L707 202
                    L679 196
                    L652 211
                    L626 201
                    L603 184
                    L576 181
                    L553 163
                    L535 145
                    Z
                  "
                />

                {/* India */}
                <path
                  className={styles.continent}
                  d="
                    M641 205
                    L663 213
                    L675 231
                    L666 250
                    L651 262
                    L638 246
                    L633 226
                    Z
                  "
                />

                {/* Australia */}
                <path
                  className={styles.continent}
                  d="
                    M746 330
                    C769 313 805 312 832 326
                    L856 345
                    L851 372
                    L830 392
                    L798 402
                    L769 393
                    L747 374
                    L738 350
                    Z
                  "
                />
              </svg>

              {/* Connection paths */}
              <svg
                className={styles.connectionLines}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path d="M23 39 Q37 27 47 30 T57 52" />
                <path d="M47 30 Q52 42 57 52" />
                <path d="M57 52 Q70 61 82 70" />
                <path d="M57 52 Q45 61 35 66" />
                <path d="M57 52 Q62 54 65 57" />
              </svg>

              {/* Connected mills */}
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  className={`${styles.location} ${
                    styles[`location${index + 1}`]
                  }`}
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                  }}
                >
                  <span className={styles.locationRing} />
                  <span className={styles.locationDot} />
                </div>
              ))}
            </div>

            {/* Center connection */}
            <div className={styles.centerPoint}>
              <span className={styles.centerPulse} />
              <span className={styles.centerPulseTwo} />
              <span className={styles.centerDot} />
            </div>

            {/* Floating connection cards */}

            <div className={`${styles.connectionCard} ${styles.cardOne}`}>
              <span className={styles.cardIcon}>✓</span>

              <div>
                <small>CONNECTION</small>
                <strong>Mill Connected</strong>
              </div>
            </div>

            <div className={`${styles.connectionCard} ${styles.cardTwo}`}>
              <span className={styles.cardIcon}>↗</span>

              <div>
                <small>REMOTE ACCESS</small>
                <strong>Authorised</strong>
              </div>
            </div>

            <div className={`${styles.connectionCard} ${styles.cardThree}`}>
              <span className={styles.cardIcon}>●</span>

              <div>
                <small>SYSTEM STATUS</small>
                <strong>All Systems Online</strong>
              </div>
            </div>

            {/* Bottom labels */}
            <div className={styles.networkStatus}>
              <span />
              6 MILLS CONNECTED
            </div>

            <div className={styles.networkLabel}>
              SECURE REMOTE NETWORK
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          CONTENT
      ================================================== */}

      <div className={styles.contentSection}>
        <div className={styles.contentContainer}>

          <div className={styles.headingBlock}>

            <div className={styles.sectionMeta}>
              <span>06</span>
              <i />
              <strong>REMOTE CONTROL</strong>
            </div>

            <div className={styles.headingRow}>
              <h2>
                Run your mill
                <br />
                <span>from anywhere.</span>
              </h2>

              {/* POINTER MOVED TO RIGHT OF HEADING */}
              <div className={styles.headingPointer}>
                <div className={styles.pointerCircle}>
                  <span className={styles.pointerPulse} />
                  <span className={styles.pointerDot} />
                </div>

                <div className={styles.pointerLine} />

                <div className={styles.pointerLabel}>
                  <span>REMOTE</span>
                  <strong>CONNECTED</strong>
                </div>
              </div>
            </div>

            <p className={styles.subhead}>
              Operate and diagnose without being on the floor.
            </p>

            <p className={styles.description}>
              Authorised users can operate the mill from a phone,
              tablet or desktop. Check what is happening, diagnose
              problems and act remotely without being on the
              factory floor.
            </p>
          </div>

          {/* ==================================================
              FEATURES
          ================================================== */}

          <div className={styles.features}>

            <div className={styles.feature}>
              <div className={styles.featureNumber}>01</div>

              <div className={styles.featureIcon}>
                <span>□</span>
              </div>

              <div>
                <strong>Remote operation</strong>
                <p>from any device</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureNumber}>02</div>

              <div className={styles.featureIcon}>
                <span>⌁</span>
              </div>

              <div>
                <strong>Remote diagnostics</strong>
                <p>for faster support</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureNumber}>03</div>

              <div className={styles.featureIcon}>
                <span>◇</span>
              </div>

              <div>
                <strong>Secure, authorised</strong>
                <p>access only</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureNumber}>04</div>

              <div className={styles.featureIcon}>
                <span>⊞</span>
              </div>

              <div>
                <strong>Same controls</strong>
                <p>on every screen</p>
              </div>
            </div>

          </div>

          {/* Devices */}

          <div className={styles.devices}>
            <span>PHONE</span>
            <i />
            <span>TABLET</span>
            <i />
            <span>DESKTOP</span>
          </div>

        </div>
      </div>
    </section>
  );
}