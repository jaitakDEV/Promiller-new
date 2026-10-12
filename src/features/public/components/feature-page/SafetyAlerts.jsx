"use client";

import { useEffect, useState } from "react";
import styles from "./SafetyAlerts.module.css";

export default function SafetyAlerts() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [emailOpened, setEmailOpened] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("safety-alerts");

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      const passed = -rect.top;
      const total = sectionHeight - viewportHeight;

      const progress = Math.min(1, Math.max(0, passed / total));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showConfirmation = scrollProgress > 0.32;
  // Gmail opens ONLY when the user clicks "Open Email App".
  // Scrolling must never open the Gmail view.
  const showEmail = emailOpened;

  return (
    <section id="safety-alerts" className={styles.section}>
      <div className={styles.stickyStage}>
        {/* =========================
            RED CYBER BACKGROUND
        ========================== */}
        <div
          className={`${styles.cyberScene} ${
            showConfirmation ? styles.cyberSceneHidden : ""
          }`}
        >
          <div className={styles.redGlow} />

          <div className={styles.cyberColumnLeft}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className={styles.cyberLine}
                style={{
                  animationDelay: `${i * -0.35}s`,
                }}
              >
                {
                  [
                    "ERR_004",
                    "SYSTEM_WARNING",
                    "MACHINE_07",
                    "VIBRATION_HIGH",
                    "LOAD_CRITICAL",
                    "TEMP_084",
                    "PRESSURE_ALERT",
                    "ISOLATION_PENDING",
                    "SAFETY_PROTOCOL",
                    "MOTOR_FAULT",
                  ][i % 10]
                }
              </div>
            ))}
          </div>

          <div className={styles.cyberColumnRight}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className={`${styles.cyberLine} ${styles.rightLine}`}
                style={{
                  animationDelay: `${i * -0.42}s`,
                }}
              >
                {
                  [
                    "0x0041",
                    "FAULT_DETECTED",
                    "SHUTDOWN_READY",
                    "ALERT_SIGNAL",
                    "UNIT_ISOLATED",
                    "REMEDY_REQUIRED",
                    "MACHINE_03",
                    "CRITICAL_STATE",
                    "ACTION_LOGGED",
                    "PROTECTION_ON",
                  ][i % 10]
                }
              </div>
            ))}
          </div>

          <div className={styles.cyberCenter}>
            <div className={styles.scanLine} />

            <span className={styles.cyberSmall}>
              PRO MILLER // SAFETY NETWORK
            </span>

            <h2>
              PROTECT
              <br />
              WHAT
              <br />
              MATTERS.
            </h2>

            <div className={styles.systemStatus}>
              <span className={styles.statusDot} />
              SYSTEM MONITORING ACTIVE
            </div>
          </div>
        </div>

        {/* =========================
            EMAIL CONFIRMATION CARD
        ========================== */}
        <div
          className={`${styles.confirmationWrapper} ${
            showConfirmation ? styles.confirmationVisible : ""
          } ${emailOpened ? styles.confirmationExit : ""}`}
        >
          <div className={styles.emailCard}>
            {/* <div className={styles.envelope}>
              <div className={styles.envelopeTop} />
              <div className={styles.envelopeBody}>
                <div className={styles.envelopeFoldLeft} />
                <div className={styles.envelopeFoldRight} />
              </div>
            </div> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="256"
              height="204"
              viewBox="0 0 256 204"
            >
              <path d="M0 0h256v204H0z" fill="none" />
              <defs>
                <linearGradient
                  id="SVGHzDbHcwG"
                  x1="165"
                  x2="165"
                  y1="44"
                  y2="166"
                  gradientUnits="userSpaceOnUse"
                >
                  {/* <stop stop-color="#60d673" /> */}
                  <stop offset=".17" stopColor="#42c868" />
                  <stop offset=".39" stopColor="#0ebc5f" />
                  <stop offset=".62" stopColor="#00a9bb" />
                  <stop offset=".86" stopColor="#3c90ff" />
                  <stop offset="1" stopColor="#3186ff" />
                </linearGradient>
                <linearGradient
                  id="SVG41ATXboZ"
                  x1="8"
                  x2="184"
                  y1="46.13"
                  y2="46.13"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset=".08" stopColor="#ff63a0" />
                  <stop offset=".3" stopColor="#fc413d" />
                  <stop offset=".5" stopColor="#fc413d" />
                  <stop offset=".65" stopColor="#fc413d" />
                  <stop offset=".72" stopColor="#fc5c30" />
                  <stop offset=".86" stopColor="#feb10c" />
                  <stop offset=".91" stopColor="#fec700" />
                  <stop offset=".96" stopColor="#ffdb0f" />
                </linearGradient>
              </defs>
              <path
                fill="url(#SVGHzDbHcwG)"
                d="M146 44h38v110c0 6.627-5.373 12-12 12h-20a6 6 0 0 1-6-6z"
                transform="translate(-11.636 -37.818)scale(1.45454)"
              />
              <path
                fill="#fc413d"
                d="M55.273 26.182H0v160c0 9.638 7.816 17.454 17.455 17.454h29.09a8.727 8.727 0 0 0 8.728-8.728z"
              />
              <path
                fill="url(#SVG41ATXboZ)"
                d="M39.226 30.456c-8.033-6.752-20.018-5.714-26.77 2.319c-6.752 8.032-5.714 20.017 2.319 26.77l76.078 63.949a8 8 0 0 0 10.295 0l76.078-63.95c8.032-6.752 9.07-18.737 2.318-26.77c-6.752-8.032-18.737-9.07-26.769-2.318L96 78.18z"
                transform="translate(-11.636 -37.818)scale(1.45454)"
              />
            </svg>

            <h2>Email Confirmation</h2>

            <p>
              We have sent an email to <span>yourfavouriteemail.com</span> to
              confirm the validity of the email address.
            </p>

            <button
              className={styles.openEmailButton}
              onClick={() => setEmailOpened(true)}
            >
              Open Email App
            </button>
          </div>
        </div>

        {/* =========================
            GMAIL EMAIL APP
        ========================== */}
        <div
          className={`${styles.gmailWrapper} ${
            showEmail ? styles.gmailVisible : ""
          }`}
        >
          <div className={styles.gmailApp}>
            {/* Gmail Header */}
            <header className={styles.gmailHeader}>
              <div className={styles.gmailLogo}>
                <div className={styles.gmailM}>M</div>
                <span>Gmail</span>
              </div>

              <div className={styles.gmailSearch}>
                <span>⌕</span>
                <span className={styles.searchText}>Search mail</span>
              </div>

              <div className={styles.gmailProfile}>P</div>
            </header>

            <div className={styles.gmailContent}>
              {/* Sidebar */}
              <aside className={styles.gmailSidebar}>
                <button className={styles.composeButton}>
                  <span>＋</span>
                  Compose
                </button>

                <div className={styles.sidebarItemActive}>
                  <span>▣</span>
                  Inbox
                  <strong>1</strong>
                </div>

                <div className={styles.sidebarItem}>
                  <span>☆</span>
                  Starred
                </div>

                <div className={styles.sidebarItem}>
                  <span>◷</span>
                  Snoozed
                </div>

                <div className={styles.sidebarItem}>
                  <span>→</span>
                  Sent
                </div>

                <div className={styles.sidebarItem}>
                  <span>◉</span>
                  Drafts
                </div>
              </aside>

              {/* Email Area */}
              <main className={styles.emailArea}>
                <div className={styles.emailToolbar}>
                  <button>←</button>
                  <button>▣</button>
                  <button>!</button>
                  <button>⌫</button>
                  <div className={styles.toolbarSpacer} />
                  <span>1 of 1</span>
                  <button>‹</button>
                  <button>›</button>
                </div>

                <article className={styles.emailContent}>
                  <div className={styles.emailSubjectRow}>
                    <h1>Safety alert — Machine protection system</h1>

                    <span className={styles.inboxTag}>Inbox</span>
                  </div>

                  <div className={styles.senderRow}>
                    <div className={styles.senderAvatar}>P</div>

                    <div className={styles.senderInfo}>
                      <strong>ProMiller Safety</strong>

                      <span>&lt;safety@promiller.ai&gt;</span>

                      <small>to me</small>
                    </div>

                    <div className={styles.emailDate}>Today, 9:41 AM</div>
                  </div>

                  {/* Email Body */}
                  <div className={styles.emailBody}>
                    <div className={styles.mailBrand}>
                      PROMILLER
                      <span>SAFETY SYSTEM</span>
                    </div>

                    <div className={styles.mailAlert}>
                      <span className={styles.alertIcon}>!</span>

                      <div>
                        <strong>MACHINE SAFETY PROTECTION</strong>

                        <p>Critical conditions are monitored continuously.</p>
                      </div>
                    </div>

                    <h2>Built to protect people and machines.</h2>

                    <h3>Alarm, remedy, shutdown, in that order.</h3>

                    <p>
                      A mill is a high-load, high-risk environment. ProMiller
                      responds to critical conditions in three stages.
                    </p>

                    <p>
                      It raises an alarm first, then prompts a corrective
                      action, and if the condition persists it shuts down the
                      affected machine before damage or injury can occur.
                    </p>

                    <p>
                      Only the faulty unit is isolated, so the rest of the mill
                      keeps running.
                    </p>

                    <div className={styles.safetySteps}>
                      <div className={styles.safetyStep}>
                        <span>01</span>
                        <div>
                          <strong>ALARM</strong>
                          <p>
                            Instant warning when abnormal conditions are
                            detected.
                          </p>
                        </div>
                      </div>

                      <div className={styles.safetyStep}>
                        <span>02</span>
                        <div>
                          <strong>REMEDY</strong>
                          <p>
                            Operators receive clear corrective instructions.
                          </p>
                        </div>
                      </div>

                      <div className={styles.safetyStep}>
                        <span>03</span>
                        <div>
                          <strong>SHUTDOWN</strong>
                          <p>
                            The affected machine is isolated if the condition
                            persists.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.featureGrid}>
                      <div>
                        <span>✓</span>
                        <p>Three-stage safety logic</p>
                      </div>

                      <div>
                        <span>✓</span>
                        <p>Individual machine isolation</p>
                      </div>

                      <div>
                        <span>✓</span>
                        <p>Instant phone alerts</p>
                      </div>

                      <div>
                        <span>✓</span>
                        <p>Complete event log</p>
                      </div>
                    </div>

                    <div className={styles.mailFooter}>
                      <strong>PROTECT. RESPOND. KEEP RUNNING.</strong>

                      <span>ProMiller Safety Intelligence</span>
                    </div>
                  </div>
                </article>
              </main>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
