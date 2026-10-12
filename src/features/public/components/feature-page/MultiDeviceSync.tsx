import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  Bell,
  LayoutDashboard,
  Settings,
  Wrench,
  Factory,
  BarChart3,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Activity,
} from "lucide-react";

import styles from "./MultiDeviceSync.module.css";

export default function MultiDeviceSync() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* LEFT CONTENT */}
        <div className={styles.content}>
          <div className={styles.eyebrow}>MULTI-DEVICE SYNC</div>

          <h2>
            Your mill, on
            <br />
            <span>every screen.</span>
          </h2>

          <p className={styles.subtitle}>
            Desktop, tablet, phone. Always in sync.
          </p>

          <p className={styles.description}>
            Start on the office desktop and finish on your phone.
            ProMiller keeps every device showing the same live data.
            The desktop view suits the office, a tablet view suits
            the shop floor, and the phone gives you alerts wherever
            you are.
          </p>

          <div className={styles.features}>
            <Feature
              icon={<Monitor size={25} />}
              title="Full desktop dashboard"
              text="Deep insights, complete control."
            />

            <Feature
              icon={<Tablet size={25} />}
              title="Floor-ready tablet view"
              text="Quick access, built for the shop floor."
            />

            <Feature
              icon={<Smartphone size={25} />}
              title="Instant phone alerts"
              text="Stay informed, always."
            />

            <Feature
              icon={<RefreshCw size={25} />}
              title="Always in sync across devices"
              text="One mill. One source of truth."
            />
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className={styles.visual}>

          {/* Desktop */}
          <DesktopDashboard />

          {/* Tablet */}
          <TabletDashboard />

          {/* Phone */}
          <PhoneDashboard />

          {/* Sync orbit */}
          <div className={styles.syncOrbit}>
            <div className={styles.syncArrow}>
              <RefreshCw size={30} strokeWidth={2} />
            </div>

            <div className={styles.syncText}>
              Real-time sync
              <br />
              across all devices
            </div>
          </div>
        </div>

        {/* BOTTOM DEVICE INFO */}
        <div className={styles.deviceBar}>

          <DeviceItem
            icon={<Monitor />}
            title="Desktop"
            text="Full control. Deeper insights."
          />

          <div className={styles.divider} />

          <DeviceItem
            icon={<Tablet />}
            title="Tablet"
            text="On-floor access. Quick actions."
          />

          <div className={styles.divider} />

          <DeviceItem
            icon={<Smartphone />}
            title="Phone"
            text="Alerts, anytime. Anywhere."
          />

        </div>
      </div>
    </section>
  );
}


/* ------------------------------------------------ */
/* FEATURE ITEM */
/* ------------------------------------------------ */

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>{icon}</div>

      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}


/* ------------------------------------------------ */
/* DESKTOP DASHBOARD */
/* ------------------------------------------------ */

function DesktopDashboard() {
  return (
    <div className={styles.desktopWrapper}>
      <div className={styles.desktopMonitor}>

        <div className={styles.desktopScreen}>

          {/* Sidebar */}
          <aside className={styles.sidebar}>

            <div className={styles.logo}>
              <span>✦</span>
              ProMiller
            </div>

            <div className={`${styles.navItem} ${styles.active}`}>
              <LayoutDashboard size={14} />
              Overview
            </div>

            <div className={styles.navItem}>
              <Factory size={14} />
              Machines
            </div>

            <div className={styles.navItem}>
              <BarChart3 size={14} />
              Production
            </div>

            <div className={styles.navItem}>
              <Zap size={14} />
              Energy
            </div>

            <div className={styles.navItem}>
              <Wrench size={14} />
              Maintenance
            </div>

            <div className={styles.navItem}>
              <BarChart3 size={14} />
              Reports
            </div>

            <div className={styles.navItem}>
              <Settings size={14} />
              Settings
            </div>
          </aside>

          {/* Dashboard */}
          <main className={styles.dashboard}>

            <div className={styles.topbar}>
              <span>◉ &nbsp; Sita Ram Flour Mills⌄</span>

              <div className={styles.user}>
                <Bell size={14} />
                <span className={styles.avatar}>A</span>
                <span>
                  Amit Raj
                  <small>Owner⌄</small>
                </span>
              </div>
            </div>

            <div className={styles.dashboardTitle}>
              <h3>Mill Overview</h3>
              <p>Live performance · All systems operational</p>
            </div>

            {/* Stats */}
            <div className={styles.stats}>

              <Stat
                title="Total Production"
                value="248.5 t"
                change="+12%"
                icon={<Factory />}
              />

              <Stat
                title="Energy Consumption"
                value="3,240 kWh"
                change="-8%"
                icon={<Zap />}
              />

              <Stat
                title="Machine Health"
                value="92%"
                change="4 machines excellent"
                icon={<ShieldCheck />}
              />

              <Stat
                title="Active Alerts"
                value="2"
                change="1 requires attention"
                danger
                icon={<AlertTriangle />}
              />

            </div>

            <div className={styles.dashboardGrid}>

              {/* Machine table */}
              <div className={styles.machineCard}>
                <h4>Machine Status</h4>

                <div className={styles.tableHeader}>
                  <span>Machine</span>
                  <span>Status</span>
                  <span>RPM</span>
                  <span>Load</span>
                  <span>Output</span>
                  <span>Health</span>
                </div>

                {[
                  ["WonderMill 01", "1450", "78%", "12.5", "96%"],
                  ["WonderMill 02", "1480", "82%", "12.8", "91%"],
                  ["WonderMill 03", "1420", "76%", "11.9", "88%"],
                  ["WonderMill 04", "0", "0%", "0.0", "70%"],
                ].map((machine, i) => (
                  <div className={styles.tableRow} key={i}>
                    <span>{machine[0]}</span>

                    <span>
                      <i
                        className={
                          i === 3
                            ? styles.statusIdle
                            : styles.statusRunning
                        }
                      />
                      {i === 3 ? "Idle" : "Running"}
                    </span>

                    <span>{machine[1]}</span>
                    <span>{machine[2]}</span>
                    <span>{machine[3]}</span>
                    <span>{machine[4]}</span>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className={styles.chartCard}>
                <h4>Production Trend</h4>

                <div className={styles.chartLegend}>
                  <span>● Today</span>
                  <span>● Yesterday</span>
                </div>

                <div className={styles.chart}>
                  <div className={styles.chartLine} />
                  <div className={styles.chartLineSecondary} />
                </div>

                <div className={styles.chartLabels}>
                  <span>6AM</span>
                  <span>10AM</span>
                  <span>2PM</span>
                  <span>6PM</span>
                  <span>10PM</span>
                </div>
              </div>

            </div>

          </main>
        </div>
      </div>

      <div className={styles.monitorStand}>
        <div />
      </div>
    </div>
  );
}


/* ------------------------------------------------ */
/* STAT CARD */
/* ------------------------------------------------ */

function Stat({
  title,
  value,
  change,
  icon,
  danger,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statHeader}>
        <span>{title}</span>
        <div className={danger ? styles.dangerIcon : styles.statIcon}>
          {icon}
        </div>
      </div>

      <strong>{value}</strong>

      <small className={danger ? styles.dangerText : ""}>
        {change}
      </small>
    </div>
  );
}


/* ------------------------------------------------ */
/* TABLET */
/* ------------------------------------------------ */

function TabletDashboard() {
  return (
    <div className={styles.tablet}>
      <div className={styles.tabletScreen}>

        <div className={styles.tabletHeader}>
          <div className={styles.logo}>
            ✦ ProMiller
          </div>

          <span>Mill Floor</span>
        </div>

        <div className={styles.tabletContent}>

          <div className={styles.machineHero}>
            <div>
              <h4>WonderMill 01</h4>

              <span className={styles.running}>
                ● Running
              </span>

              <div className={styles.machineStats}>
                <strong>1450</strong>
                <small>RPM</small>

                <strong>78%</strong>
                <small>Load</small>

                <strong>12.5</strong>
                <small>Output</small>
              </div>
            </div>

            <div className={styles.millImage}>
              <div className={styles.millGraphic}>
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className={styles.millBadge}>
                Output
                <strong>12.5 t/h</strong>
              </div>
            </div>
          </div>

          <div className={styles.tabletStats}>

            <MiniCard
              title="Energy Usage"
              value="420 kWh"
              change="-6% vs last hour"
            />

            <MiniCard
              title="Machine Temperature"
              value="42°C"
              change="Normal"
            />

            <MiniCard
              title="Running Hours"
              value="2,842 h"
              change="+12% this month"
            />

          </div>

          <div className={styles.tabletNav}>
            <span className={styles.selected}>
              <LayoutDashboard />
              Overview
            </span>

            <span>
              <Factory />
              Machines
            </span>

            <span>
              <Bell />
              Alerts
            </span>

            <span>
              <BarChart3 />
              Reports
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}


function MiniCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className={styles.miniCard}>
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{change}</small>

      <div className={styles.miniGraph}>
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}


/* ------------------------------------------------ */
/* PHONE */
/* ------------------------------------------------ */

function PhoneDashboard() {
  return (
    <div className={styles.phone}>
      <div className={styles.phoneNotch} />

      <div className={styles.phoneScreen}>

        <div className={styles.phoneTime}>
          <span>10:24</span>
          <span>•••</span>
        </div>

        <div className={styles.phoneClock}>
          10:24
          <small>Tuesday, 22 Apr</small>
        </div>

        <div className={styles.notification}>
          <div className={styles.notificationIcon}>
            <Bell size={14} />
          </div>

          <div>
            <strong>ProMiller</strong>
            <small>now</small>

            <p>
              High Energy Consumption Alert
            </p>

            <span>
              WonderMill 03 is consuming 10% more
              energy than usual.
            </span>
          </div>
        </div>

        <div className={styles.phoneGlow} />

        <div className={styles.phoneHome} />

      </div>
    </div>
  );
}


/* ------------------------------------------------ */
/* DEVICE ITEM */
/* ------------------------------------------------ */

function DeviceItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className={styles.deviceItem}>
      <div className={styles.deviceIcon}>{icon}</div>

      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}