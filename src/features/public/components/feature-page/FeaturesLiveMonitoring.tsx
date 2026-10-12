import styles from "./FeaturesLiveMonitoring.module.css";

const monitoringItems = [
  {
    number: "01",
    title: "Live RPM",
    description: "Know exactly how fast each machine is running.",
    icon: "↗",
  },
  {
    number: "02",
    title: "Machine Load",
    description: "Spot abnormal loading before it becomes a problem.",
    icon: "◌",
  },
  {
    number: "03",
    title: "Production Output",
    description: "Track production in real time against expected output.",
    icon: "▥",
  },
  {
    number: "04",
    title: "Machine Status",
    description: "See which machines are running, idle or stopped.",
    icon: "!",
  },
  {
    number: "05",
    title: "Live Performance",
    description: "Replace assumptions with actual operating data.",
    icon: "▥",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.copy}>
            <h1>
              See your mill.
              <br />
              <span>As it happens.</span>
            </h1>

            <p className={styles.lead}>
              Your mill shouldn&apos;t be a black box.
            </p>

            <p className={styles.description}>
              ProMiller gives you a live view of every connected machine —
              from production output and RPM to machine load and operating
              status.
            </p>

            <p className={styles.description}>
              Whether you&apos;re inside the mill or remote, you always know
              what&apos;s happening.
            </p>

            <div className={styles.statement}>
              <div className={styles.statementIcon}>↗</div>

              <div>
                <strong>
                  No more asking,
                  <br />
                  “How is the mill running?”
                </strong>
                <span>Open ProMiller. Know.</span>
              </div>
            </div>
          </div>

          {/* ANALYTICS CARD */}
          <div className={styles.analytics}>
            <div className={styles.analyticsHeader}>
              <span>Live analytics</span>
              <span className={styles.live}>
                <i />
                LIVE
              </span>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.production}>
                <div className={styles.metricIcon}>◈</div>

                <div>
                  <small>Total production</small>
                  <strong>264.2K</strong>
                </div>
              </div>

              <div className={styles.rpm}>
                <small>Live RPM</small>
                <strong>56K</strong>
                <span>↗ +12%</span>
              </div>
            </div>

            <div className={styles.chartHeader}>
              <span>Production output</span>
              <small>Live</small>
            </div>

            <div className={styles.chart}>
              <div className={styles.gridLine} />
              <div className={styles.gridLine} />
              <div className={styles.gridLine} />

              <svg
                viewBox="0 0 600 190"
                preserveAspectRatio="none"
                className={styles.chartSvg}
              >
                <polyline
                  points="0,145 75,130 145,82 220,94 295,52 370,76 445,42 520,44 600,12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                {[
                  [0, 145],
                  [75, 130],
                  [145, 82],
                  [220, 94],
                  [295, 52],
                  [370, 76],
                  [445, 42],
                  [520, 44],
                  [600, 12],
                ].map(([cx, cy], index) => (
                  <circle
                    key={index}
                    cx={cx}
                    cy={cy}
                    r="5"
                    fill="currentColor"
                  />
                ))}
              </svg>

              <div className={styles.days}>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>

              <div className={styles.loadBadge}>
                <small>Machine load</small>
                <strong>+58%</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN SEE — NEW SECTION */}
      <section className={styles.monitoring}>
        <div className={styles.sectionIntro}>
          {/* <span className={styles.eyebrow}>LIVE MONITORING</span> */}

          <h2>
            Everything you need <br />
            <span>to know your mill.</span>
          </h2>

          <p>
            Real-time visibility across every connected machine, all in one
            place.
          </p>
        </div>

        <div className={styles.featureGrid}>
          {monitoringItems.map((item) => (
            <article className={styles.featureCard} key={item.number}>
              <div className={styles.featureTop}>
                <span className={styles.featureNumber}>{item.number}</span>
                <div className={styles.featureIcon}>{item.icon}</div>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}