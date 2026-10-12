import styles from "./PredictiveMaintenance.module.css";

const features = [
  {
    icon: "⌁",
    title: "Wear-trend detection",
    text: "From vibration and load data.",
  },
  {
    icon: "□",
    title: "Maintenance reminders",
    text: "Scheduled automatically.",
  },
  {
    icon: "◇",
    title: "Spare-parts alerts",
    text: "Replacements arrive before you need them.",
  },
  {
    icon: "▤",
    title: "Service history",
    text: "A full history for each machine.",
  },
];

export default function PredictiveMaintenance() {
  return (
    <main className={styles.section}>
      <div className={styles.container}>
        {/* LEFT — DASHBOARD */}
        <div className={styles.dashboardWrap}>
          <div className={styles.dashboard}>
            <div className={styles.machineHeader}>
              <div className={styles.machineImage}>
                <div className={styles.machineShape}>
                  <span />
                  <i />
                </div>
              </div>

              <div className={styles.machineInfo}>
                <h3>Ball Mill 01</h3>
                <p>Grinding Section</p>

                <div className={styles.health}>
                  <div className={styles.healthCircle}>92%</div>

                  <div>
                    <span>Machine Health</span>
                    <div className={styles.healthBar}>
                      <i />
                    </div>
                  </div>
                </div>
              </div>

              {/* Glassmorphic status capsule */}
              <div className={styles.running}>
                <span />
                <strong>Running</strong>
              </div>
            </div>

            <div className={styles.metrics}>
              <Metric label="RPM" value="28.4" icon="◉" />
              <Metric label="Load" value="76%" icon="⌁" />
              <Metric label="Vibration" value="2.1 mm/s" icon="∿" />
            </div>

            <div className={styles.dashboardBottom}>
              <div className={styles.chartCard}>
                <h4>Vibration trend</h4>

                <div className={styles.chart}>
                  <div className={styles.chartGrid} />

                  <svg
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      points="0,115 65,105 130,75 195,85 260,68 325,58 390,42 445,47 500,18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    {[0, 65, 130, 195, 260, 325, 390, 445, 500].map(
                      (x, index) => (
                        <circle
                          key={index}
                          cx={x}
                          cy={
                            [115, 105, 75, 85, 68, 58, 42, 47, 18][index]
                          }
                          r="4"
                          fill="currentColor"
                        />
                      )
                    )}
                  </svg>

                  <div className={styles.chartDays}>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              <div className={styles.maintenanceCard}>
                <div className={styles.maintenanceIcon}>⚒</div>

                <strong>Maintenance scheduled</strong>
                <span>Next service in 12 days</span>
                <small>Lubrication & inspection</small>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — CONTENT */}
        <div className={styles.content}>
          {/* <span className={styles.eyebrow}>PREDICTIVE MAINTENANCE</span> */}

          <h1>
            Fix it before
            <br />
            <span>it breaks.</span>
          </h1>

          <h2>
            Problems show up in the data long before they stop the mill.
          </h2>

          <p className={styles.description}>
            ProMiller watches vibration, load and running patterns to flag
            problems early — while they&apos;re still small, planned repairs.
          </p>

          <div className={styles.stat}>
            <strong>20%</strong>
            <span>
              less downtime
              <small>Based on industry averages for predictive maintenance.</small>
            </span>
          </div>

          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <div className={styles.feature} key={feature.title}>
                <div className={styles.featureIcon}>{feature.icon}</div>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className={styles.metric}>
      <div className={styles.metricIcon}>{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}