"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./calculators-list.module.css";

const HERO_IMAGE = "/images/sectionImages/Calculatorhero.png";

// Internal route (route group "(public)" URL mein count nahi hota)
const ATTA_COST_ROUTE = "/calculators/atta-cost";

type TabKey = "atta" | "conveying" | "power";

interface CalcBox {
  title: string;
  text: string;
}

interface CalculatorInfo {
  label: string;
  title: string;
  overview: string;
  boxes: CalcBox[];
}

const QUICK_FACTS = [
  "30 Second Calculation",
  "Free to Use",
  "No Login Required",
  "Built for Flour Mills",
];

const CALCULATORS: Record<TabKey, CalculatorInfo> = {
  atta: {
    label: "Atta Price Calculator",
    title: "Know your real atta price — before the wheat reaches your chakki.",
    overview:
      "Atta pricing isn't just wheat cost. Between power bills, labour, bran recovery, stone wear, packaging, freight, and margin — a wrong calculation means you're selling at a loss without knowing it. The Atta Price Calculator puts every variable in one place, so you can price with confidence every single day.",
    boxes: [
      { title: "Raw Material", text: "Wheat input cost." },
      {
        title: "By-product Credit",
        text: "Bran recovery percentage and bran sale value.",
      },
      {
        title: "Variable Cost",
        text: "Power consumption and electricity cost per quintal.",
      },
      {
        title: "Fixed Overhead",
        text: "Labour, supervision and indirect operating costs.",
      },
      {
        title: "Per-unit Costs",
        text: "Stone wear, packaging and handling charges.",
      },
      {
        title: "Distribution Cost",
        text: "Transport and freight per delivery zone.",
      },
      { title: "Profit Centre", text: "Target margin / profit percentage." },
      {
        title: "Output",
        text: "Resulting net atta price per kg / per bag.",
      },
      { title: "Risk View", text: "Break-even analysis." },
    ],
  },

  conveying: {
    label: "Conveying Capacity Calculator",
    title:
      "Right-size your conveyors and elevators. Stop overpaying for power you don't need.",
    overview:
      "Undersized conveyors bottleneck your production. Oversized ones waste power and capital. The Conveying Capacity Calculator solves both — enter your mill's throughput requirements and it outputs accurate motor sizing, belt/bucket specifications, and drive requirements for screw conveyors, belt conveyors, chain conveyors, and bucket elevators.",
    boxes: [
      {
        title: "Throughput",
        text: "Required conveying capacity (tonnes per hour).",
      },
      {
        title: "Motor Sizing",
        text: "Drive motor power (kW/HP) — exact, not over-engineered.",
      },
      {
        title: "Mechanical Spec",
        text: "Belt width, chain pitch or bucket dimensions.",
      },
      { title: "Speed Spec", text: "Conveyor speed (RPM / m per second)." },
      {
        title: "Engineering Correction",
        text: "Inclination factor and material angle of repose adjustment.",
      },
      {
        title: "Drive Type",
        text: "Recommended drive type — direct, gearbox or VFD-controlled.",
      },
      {
        title: "Economics",
        text: "Estimated power cost per tonne conveyed.",
      },
      {
        title: "Layout Options",
        text: "Alternative configurations for space-constrained layouts.",
      },
    ],
  },

  power: {
    label: "Power Saving Calculator",
    title:
      "See exactly how much power — and money — ProMiller technology puts back in your pocket.",
    overview:
      "Power is typically 40–55% of a flour mill's variable operating cost. WonderMill and iQuadra technology, combined with VFD-controlled drives and load-optimized operation, consistently deliver 25–40% power savings over conventional chakki systems. This calculator turns that claim into a number specific to your mill.",
    boxes: [
      {
        title: "Baseline",
        text: "Current monthly power consumption from your existing setup.",
      },
      {
        title: "Post-upgrade",
        text: "Expected consumption after WonderMill / iQuadra installation.",
      },
      { title: "Energy Saving", text: "Monthly unit savings (kWh)." },
      {
        title: "Financial Saving",
        text: "Monthly cost saving at your actual power tariff (₹).",
      },
      { title: "Annual Impact", text: "Annual saving projection (₹)." },
      {
        title: "Sustainability",
        text: "Carbon footprint reduction (CO₂ kg saved per year).",
      },
      {
        title: "ROI View",
        text: "Payback scenario modelling — how long savings take to compound.",
      },
      {
        title: "Config Comparison",
        text: "Compare 10-7 / 10-8 / 10-10 / 10-12 ProMiller configurations.",
      },
    ],
  },
};

const TAB_ORDER: TabKey[] = ["atta", "conveying", "power"];

const CONVEYOR_TYPES = [
  {
    name: "Screw conveyors",
    desc: "Horizontal and inclined wheat/flour transfer.",
  },
  { name: "Belt conveyors", desc: "Bulk grain and bag handling." },
  { name: "Chain conveyors", desc: "Heavy-duty grain movement." },
  { name: "Bucket elevators", desc: "Vertical grain and flour lifting." },
  { name: "Pneumatic conveying", desc: "Dustless flour transfer." },
];

const POWER_INPUTS = [
  "Number of chakkis currently running.",
  "Average daily run hours.",
  "Motor HP per chakki (25 HP / 18.5 kW).",
  "Your electricity tariff (₹ / kWh).",
  "Target ProMiller configuration (10-7, 10-8, 10-10 or 10-12).",
];

const ATTA_DIFFERENCES = [
  "Designed around chakki-atta economics — not generic food manufacturing models.",
  "Separates fixed and variable costs the way a mill actually tracks them.",
  "Accounts for bran credit, which most calculators ignore.",
  "Updates dynamically — change wheat price, everything recalculates instantly.",
  "Printable daily price sheet output for dealer and wholesale communication.",
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.sectionTitle}>
      <span aria-hidden="true" />
      <h3>{children}</h3>
    </div>
  );
}

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<TabKey>("atta");
  const data = CALCULATORS[activeTab];

  return (
    <div className={styles.page}>
      {/* ================= HERO ================= */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Milling Calculators</span>
            <h1>
              Take Control of Your Mill Economics with{" "}
              <span className={styles.accent}>Smart Calculators</span>
            </h1>
            <p>
              Calculate atta pricing, conveying capacity, and power savings with
              precision tools designed specifically for flour mills.
            </p>

            <div className={styles.ctaRow}>
              <Link href={ATTA_COST_ROUTE} className={styles.ctaPrimary}>
                Launch Atta Calculator
              </Link>
              <a href="#calculators" className={styles.ctaGhost}>
                Explore Calculators
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <span
              className={`${styles.ring} ${styles.ring1}`}
              aria-hidden="true"
            />
            <span
              className={`${styles.ring} ${styles.ring2}`}
              aria-hidden="true"
            />
            <span
              className={`${styles.ring} ${styles.ring3}`}
              aria-hidden="true"
            />
            <span
              className={`${styles.ring} ${styles.ring4}`}
              aria-hidden="true"
            />
            <span
              className={`${styles.ring} ${styles.ring5}`}
              aria-hidden="true"
            />
            <span
              className={`${styles.ring} ${styles.ring6}`}
              aria-hidden="true"
            />

            <div
              className={`${styles.floatCard} ${styles.cardOrders}`}
              aria-hidden="true"
            >
              <h4>Production Orders</h4>
              <ul className={styles.orderList}>
                <li>
                  <span className={styles.orderDot} data-tone="wait" />
                  Wheat Intake
                </li>
                <li>
                  <span className={styles.orderDot} data-tone="run" />
                  Grinding — Line 2
                </li>
                <li>
                  <span className={styles.orderDot} data-tone="ok" />
                  Packing Ready
                </li>
              </ul>
            </div>

            <div
              className={`${styles.floatCard} ${styles.cardAlloc}`}
              aria-hidden="true"
            >
              <h4>Cost Allocation</h4>
              <div className={styles.allocRow}>
                <span className={styles.donut} />
                <ul className={styles.allocList}>
                  <li>
                    <i data-tone="power" />
                    Power 42%
                  </li>
                  <li>
                    <i data-tone="labour" />
                    Labour 27%
                  </li>
                  <li>
                    <i data-tone="other" />
                    Other 31%
                  </li>
                </ul>
              </div>
            </div>

            <div
              className={`${styles.floatCard} ${styles.cardSaving}`}
              aria-hidden="true"
            >
              <span>Monthly power saving</span>
              <strong>₹45,000–₹75,000</strong>
              <small>10 chakkis · 18 hrs/day · ₹8/kWh</small>
            </div>

            <div className={styles.heroMedia}>
              <Image
                src={HERO_IMAGE}
                alt="Flour mill owner reviewing production on a tablet"
                fill
                priority
                sizes="(max-width: 992px) 70vw, 32vw"
                className={styles.heroImage}
              />
            </div>

            <span
              className={`${styles.badgeIcon} ${styles.iconA}`}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M3 12h4l3 8 4-16 3 8h4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={`${styles.badgeIcon} ${styles.iconB}`}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="4" />
                <path
                  d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span
              className={`${styles.badgeIcon} ${styles.iconC}`}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M3 3v18h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 15l4-5 3 3 4-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span
              className={`${styles.dot} ${styles.dotA}`}
              aria-hidden="true"
            />
            <span
              className={`${styles.dot} ${styles.dotB}`}
              aria-hidden="true"
            />
            <span
              className={`${styles.dot} ${styles.dotC}`}
              aria-hidden="true"
            />
          </div>
        </div>
      </header>

      {/* ================= TABS ================= */}
      <nav
        id="calculators"
        className={styles.tabs}
        role="tablist"
        aria-label="Calculators"
      >
        {TAB_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeTab === key}
            className={activeTab === key ? styles.active : ""}
            onClick={() => setActiveTab(key)}
          >
            {CALCULATORS[key].label}
          </button>
        ))}
      </nav>

      {/* ================= MAIN ================= */}
      <section className={styles.layout}>
        {/* Intro card */}
        <div className={styles.introCard}>
          <div className={styles.introHeader}>
            <span className={styles.badge}>{data.label}</span>
            <h2>{data.title}</h2>
            <p>{data.overview}</p>

            {activeTab === "atta" ? (
              <Link href={ATTA_COST_ROUTE} className={styles.launchBtn}>
                Launch Atta Calculator
              </Link>
            ) : (
              <button
                type="button"
                className={`${styles.launchBtn} ${styles.comingSoonBtn}`}
                disabled
              >
                Coming Soon
              </button>
            )}
          </div>

          <ul className={styles.quickFacts}>
            {QUICK_FACTS.map((item) => (
              <li className={styles.factCard} key={item}>
                <span className={styles.factIcon} aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What it calculates */}
        <section className={styles.contentSection}>
          <SectionTitle>What It Calculates</SectionTitle>

          <div className={styles.calculateGrid}>
            {data.boxes.map((box) => (
              <div className={styles.calculateBox} key={box.title}>
                <h4>{box.title}</h4>
                <p>{box.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CONVEYING DETAILS ================= */}
        {activeTab === "conveying" && (
          <section className={styles.contentSection}>
            <SectionTitle>Conveyor And Elevator Types Covered</SectionTitle>

            <ul className={styles.chevronList}>
              {CONVEYOR_TYPES.map((t) => (
                <li key={t.name}>
                  <strong>{t.name}</strong> — {t.desc}
                </li>
              ))}
            </ul>

            <div className={styles.highlightNote}>
              Most mills oversize conveyors by <strong>20–35%</strong>, paying
              for unused capacity in every electricity bill. This calculator
              fixes that.
            </div>

            <div className={styles.technicalInfo}>
              <h4>Technical Basis</h4>
              <p>
                Calculations follow{" "}
                <strong>
                  CEMA (Conveyor Equipment Manufacturers Association)
                </strong>{" "}
                standard engineering formulae, adapted for Indian mill operating
                conditions — specifically the material bulk densities, moisture
                ranges, and ambient temperatures relevant to wheat, atta, maida,
                and bran.
              </p>
            </div>
          </section>
        )}

        {/* ================= POWER DETAILS ================= */}
        {activeTab === "power" && (
          <section className={styles.contentSection}>
            <SectionTitle>Input Variables</SectionTitle>

            <ul className={styles.chevronList}>
              {POWER_INPUTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className={styles.highlightNote}>
              A <strong>10-chakki</strong> mill running{" "}
              <strong>18 hours/day</strong> at <strong>₹8/kWh</strong> typically
              saves <strong>₹45,000–₹75,000 per month.</strong> Enter your
              numbers and see yours.
            </div>

            <div className={styles.technicalInfo}>
              <h4>Why This Matters</h4>
              <p>
                The Power Saving Calculator is not a marketing estimate — it is
                a decision tool. When a mill owner runs this before an
                eligibility check, the monthly saving figure often becomes the
                single most compelling number in the entire ProMiller
                conversation. It makes the zero-investment model
                self-explanatory.
              </p>
            </div>
          </section>
        )}

        {/* ================= ATTA DETAILS ================= */}
        {activeTab === "atta" && (
          <>
            <section className={styles.contentSection}>
              <SectionTitle>Who It Is For</SectionTitle>

              <p className={styles.sectionText}>
                Chakki atta mill owners, branded flour producers, bulk flour
                suppliers, and any mill running an atta profit centre —
                including mills selling to retailers, wholesalers, or direct
                consumers.
              </p>

              <div className={styles.highlightNote}>
                Enter today&apos;s wheat rate, your power tariff, and your bran
                price — the calculator gives you your atta floor price in under{" "}
                <strong>30 seconds.</strong>
              </div>
            </section>

            <section className={styles.contentSection}>
              <SectionTitle>Why It Is Different</SectionTitle>

              <ul className={styles.chevronList}>
                {ATTA_DIFFERENCES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </section>
    </div>
  );
}
