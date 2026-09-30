"use client";

import {
  Settings2,
  Zap,
  CircleGauge,
  UsersRound,
  BarChart3,
  CalendarDays,
  Monitor,
  Check,
  type LucideIcon,
} from "lucide-react";

import { CloudShader } from "@/components/ui/cloud-shader";

import styles from "./WhyPromiller.module.css";

type PanelVariant = "manual" | "digital";

interface ComparisonRow {
  icon?: LucideIcon;
  title: string;
  description: string;
}

interface ComparisonPanelProps {
  variant: PanelVariant;
  headerIcon: LucideIcon;
  label: string;
  title: string;
  badge: string;
  rows: ComparisonRow[];
}

const MANUAL_ROWS: ComparisonRow[] = [
  {
    icon: Settings2,
    title: "Outdated Technology",
    description: "Traditional chakki systems with limited control.",
  },
  {
    icon: Zap,
    title: "High Power Consumption",
    description: "Little visibility into energy waste.",
  },
  {
    icon: CircleGauge,
    title: "Inconsistent Quality",
    description: "Manual operation creates variable output.",
  },
  {
    icon: UsersRound,
    title: "Labor Intensive",
    description: "Constant manual work and stone maintenance.",
  },
  {
    icon: BarChart3,
    title: "No Data",
    description: "Performance is difficult to track.",
  },
];

const PROMILLER_ROWS: ComparisonRow[] = [
  {
    title: "Cutting-Edge Technology",
    description: "Digital WonderMill system with intelligent controls.",
  },
  {
    title: "30–40% Power Savings",
    description: "Real-time optimization reduces operating costs.",
  },
  {
    title: "Consistent Quality",
    description: "Automation keeps output reliable every time.",
  },
  {
    title: "Highly Automated",
    description: "Less labor with automatic adjustments.",
  },
  {
    title: "Full Visibility",
    description: "Live dashboards and actionable trends.",
  },
];

const PANELS: ComparisonPanelProps[] = [
  {
    variant: "manual",
    headerIcon: CalendarDays,
    label: "Today",
    title: "Manual",
    badge: "Before",
    rows: MANUAL_ROWS,
  },
  {
    variant: "digital",
    headerIcon: Monitor,
    label: "With ProMiller",
    title: "Digital",
    badge: "After",
    rows: PROMILLER_ROWS,
  },
];

const HIGHLIGHTS: string[] = [
  "Smarter mill management",
  "Better operational visibility",
];

function ComparisonPanel({
  variant,
  headerIcon: HeaderIcon,
  label,
  title,
  badge,
  rows,
}: ComparisonPanelProps) {
  const headingId = `before-after-${variant}`;

  return (
    <article
      className={`${styles.panel} ${styles[variant]}`}
      aria-labelledby={headingId}
    >
      <header className={styles.panelHeader}>
        <span className={styles.headerIcon} aria-hidden="true">
          <HeaderIcon focusable="false" />
        </span>

        <div className={styles.headerText}>
          <span className={styles.headerLabel}>{label}</span>
          <h3 id={headingId} className={styles.headerTitle}>
            {title}
          </h3>
        </div>

        <span className={styles.badge}>{badge}</span>
      </header>

      <ul className={styles.rows}>
        {rows.map(({ icon: Icon = Check, title: rowTitle, description }) => (
          <li className={styles.row} key={rowTitle}>
            <span className={styles.featureIcon} aria-hidden="true">
              <Icon focusable="false" />
            </span>

            <div className={styles.rowContent}>
              <p className={styles.rowTitle}>{rowTitle}</p>
              <p className={styles.rowText}>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function WhyPromiller() {
  return (
    <section className={styles.section} aria-labelledby="before-after-heading">
      <div className={styles.background} aria-hidden="true">
        <CloudShader className={styles.backgroundShader} />
        <div className={styles.backgroundVeil} />
      </div>

      <div className={styles.container}>
        <div className={styles.mainGrid}>
          <div className={styles.contentColumn}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Why ProMiller
            </span>

            <h2 id="before-after-heading" className={styles.headline}>
              Your Flour Mill:
              <span>Before &amp; After</span>
            </h2>

            <p className={styles.description}>
              See how ProMiller transforms traditional milling into a smarter,
              more efficient digital operation.
            </p>

            <div className={styles.keyFigure}>
              <p className={styles.keyValue}>30–40%</p>
              <p className={styles.keyLabel}>
                Power savings through real-time optimization
              </p>
            </div>

            <ul className={styles.miniPoints}>
              {HIGHLIGHTS.map((point) => (
                <li className={styles.miniPoint} key={point}>
                  <span className={styles.pointIcon} aria-hidden="true">
                    <Check focusable="false" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.comparisonColumn}>
            <div className={styles.comparisonShell}>
              <div className={styles.comparisonGrid}>
                {PANELS.map((panel) => (
                  <ComparisonPanel key={panel.variant} {...panel} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
