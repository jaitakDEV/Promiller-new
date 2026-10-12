import type { CSSProperties } from "react";
import {
  HardHat,
  User,
  Settings,
  BarChart3,
  Clock,
  Cog,
  PieChart,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import styles from "./SmartControl.module.css";

const W = 860;
const H = 270;

const pctX = (x: number) => `${(x / W) * 100}%`;
const pctY = (y: number) => `${(y / H) * 100}%`;

type Tone = "green" | "blue" | "orange";
type ExtraKind = "bars" | "line" | "toggle" | "donut";

type CardItem = {
  id: string;
  title: string;
  sub: string;
  Icon: LucideIcon;
  tone: Tone;
  y: number;
  extra?: ExtraKind;
};

type Flow = {
  id: string;
  d: string;
  tone: Tone;
  delay: number;
};

const LEFT: CardItem[] = [
  {
    id: "operator",
    title: "Operator",
    sub: "Run & Monitor",
    Icon: HardHat,
    tone: "green",
    y: 43,
  },
  {
    id: "supervisor",
    title: "Supervisor",
    sub: "Manage & Adjust",
    Icon: User,
    tone: "blue",
    y: 128,
  },
  {
    id: "admin",
    title: "Admin",
    sub: "Configure & Control",
    Icon: Settings,
    tone: "orange",
    y: 211,
  },
];

const RIGHT: CardItem[] = [
  {
    id: "mis",
    title: "MIS & Reports",
    sub: "Ready dashboards",
    Icon: BarChart3,
    tone: "green",
    y: 36,
    extra: "bars",
  },
  {
    id: "hist",
    title: "Historical Data",
    sub: "Never lost",
    Icon: Clock,
    tone: "blue",
    y: 102,
    extra: "line",
  },
  {
    id: "auto",
    title: "Automated Operation",
    sub: "Timers, calibration, stone wear adjustment",
    Icon: Cog,
    tone: "orange",
    y: 168,
    extra: "toggle",
  },
  {
    id: "perf",
    title: "Performance Insights",
    sub: "Track & improve",
    Icon: PieChart,
    tone: "green",
    y: 234,
    extra: "donut",
  },
];

const PILLS = [
  { label: "xCommand", tone: "green" as Tone, x: 250, y: 43 },
  { label: "xStatus", tone: "blue" as Tone, x: 250, y: 128 },
  { label: "xConfig", tone: "orange" as Tone, x: 250, y: 211 },
];

const FLOWS: Flow[] = [
  {
    id: "f1",
    d: "M160 43 H300 C335 43 335 95 363 95",
    tone: "green",
    delay: 0,
  },
  {
    id: "f2",
    d: "M160 128 H363",
    tone: "blue",
    delay: 0.6,
  },
  {
    id: "f3",
    d: "M160 211 H300 C335 211 335 162 363 162",
    tone: "orange",
    delay: 1.2,
  },
 // PROMILLER → RIGHT
  {
    id: "f4",
    d: "M488 100 C550 100 560 36 628 36",
    tone: "green",
    delay: 0.3,
  },
  {
    id: "f5",
    d: "M488 116 C550 116 560 102 628 102",
    tone: "blue",
    delay: 0.9,
  },
  {
    id: "f6",
    d: "M488 142 C550 142 560 168 628 168",
    tone: "orange",
    delay: 1.5,
  },
  {
    id: "f7",
    d: "M488 164 C550 164 560 234 628 234",
    tone: "green",
    delay: 0.1,
  },
];

const COLORS: Record<Tone, string> = {
  green: "#16a34a",
  blue: "#2f7df6",
  orange: "#f08a1c",
};

const startOf = (d: string): [number, number] => {
  const m = /^M\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/.exec(d);
  return m ? [Number(m[1]), Number(m[2])] : [0, 0];
};

function Extra({ kind }: { kind: ExtraKind }) {
  if (kind === "bars") {
    return (
      <div className={styles.bars} aria-hidden>
        {[30, 45, 38, 62, 80, 100].map((h, i) => (
          <i
            key={i}
            style={{
              height: `${h}%`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (kind === "line") {
    return (
      <svg className={styles.spark} viewBox="0 0 60 28" aria-hidden>
        <path d="M2 24 L14 18 L24 21 L36 12 L46 14 L58 3" />
      </svg>
    );
  }

  if (kind === "toggle") {
    return (
      <span className={styles.toggle} aria-hidden>
        <b />
      </span>
    );
  }

  return (
    <svg className={styles.donut} viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="13" className={styles.donutBg} />
      <circle
        cx="18"
        cy="18"
        r="13"
        className={styles.donutFg}
        pathLength="100"
      />
    </svg>
  );
}

function Card({
  item,
  side,
}: {
  item: CardItem;
  side: "left" | "right";
}) {
  const { Icon } = item;

  return (
    <div
      className={`${styles.card} ${styles[side]}`}
      style={
        {
          top: pctY(item.y),
          "--tone": COLORS[item.tone],
        } as CSSProperties
      }
    >
      <span className={`${styles.icon} ${styles[item.tone]}`}>
        <Icon size="1em" strokeWidth={1.8} />
      </span>

      <span className={styles.text}>
        <strong>{item.title}</strong>
        <small>{item.sub}</small>
      </span>

      {item.extra && <Extra kind={item.extra} />}
    </div>
  );
}

export default function SmartControl() {
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>Smart Control</p>

      <h2 className={styles.title}>
        A mill that runs itself,
        <span>and tells you how it did.</span>
      </h2>

      <p className={styles.lede}>
        The right people in control, every number recorded, routine work
        automated.
      </p>

      <div className={styles.scroller}>
        <div className={styles.stage}>
          <div className={styles.globe} aria-hidden />

          <svg
            className={styles.wires}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              {Object.entries(COLORS).map(([key, color]) => (
                <marker
                  key={key}
                  id={`arrow-${key}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M1 1 L9 5 L1 9 Z" fill={color} />
                </marker>
              ))}
            </defs>

            {FLOWS.map((flow) => {
              const [sx, sy] = startOf(flow.d);

              return (
                <g
                  key={flow.id}
                  style={
                    {
                      "--c": COLORS[flow.tone],
                    } as CSSProperties
                  }
                >
                  <path
                    id={flow.id}
                    d={flow.d}
                    className={styles.track}
                    markerEnd={`url(#arrow-${flow.tone})`}
                  />

                  <path
                    d={flow.d}
                    className={styles.flow}
                    style={{
                      animationDelay: `${flow.delay}s`,
                    }}
                  />

                  <g className={styles.pulse}>
                    <circle r="7" fill="var(--c)" opacity="0.18" />
                    <circle r="3.2" fill="var(--c)" />

                    <animateMotion
                      dur="3.2s"
                      begin={`${flow.delay}s`}
                      repeatCount="indefinite"
                    >
                      <mpath href={`#${flow.id}`} />
                    </animateMotion>
                  </g>

                  <circle
                    cx={sx}
                    cy={sy}
                    r="3.5"
                    fill="var(--c)"
                  />
                </g>
              );
            })}
          </svg>

          {PILLS.map((pill) => (
            <span
              key={pill.label}
              className={`${styles.pill} ${styles[pill.tone]}`}
              style={{
                left: pctX(pill.x),
                top: pctY(pill.y),
              }}
            >
              {pill.label}
            </span>
          ))}

          {LEFT.map((item) => (
            <Card key={item.id} item={item} side="left" />
          ))}

          {RIGHT.map((item) => (
            <Card key={item.id} item={item} side="right" />
          ))}

          <div className={styles.hub}>
            <span className={styles.ring} />

            <span className={styles.hubIcon}>
              <Cloud size="1em" strokeWidth={1.6} />
            </span>

            <strong>ProMiller</strong>
            <small>Smart Control</small>
          </div>
        </div>
      </div>
    </section>
  );
}