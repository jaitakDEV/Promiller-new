"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { Poppins } from "next/font/google";
import {
  ArrowRight,
  BarChart3,
  Cog,
  Eye,
  TrendingUp,
  Wheat,
} from "lucide-react";
import styles from "./when-and-whom.module.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* Writes --mx / --my (pointer, -1..1) and --sy (scroll, -1..1) onto the section, eased. */
function useParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0, s: 0 };
    const cur = { x: 0, y: 0, s: 0 };
    let raf = 0;

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      cur.s += (target.s - cur.s) * 0.08;
      el.style.setProperty("--mx", cur.x.toFixed(3));
      el.style.setProperty("--my", cur.y.toFixed(3));
      el.style.setProperty("--sy", cur.s.toFixed(3));
      const settled =
        Math.abs(target.x - cur.x) < 0.001 &&
        Math.abs(target.y - cur.y) < 0.001 &&
        Math.abs(target.s - cur.s) < 0.001;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      target.s = Math.max(
        -1,
        Math.min(1, (r.top + r.height / 2 - vh / 2) / vh),
      );
      kick();
    };

    onScroll();
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

/* depth = px of travel; keep between 6 and 14 for a slight effect */
function FloatCard({
  depth,
  pos,
  children,
}: {
  depth: number;
  pos: string;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.floatWrap} ${pos}`}>
      <div className={styles.card} style={{ "--d": depth } as CSSProperties}>
        {children}
      </div>
    </div>
  );
}

function Sparkline({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 160 40"
      className={styles.spark}
      fill="none"
      aria-hidden="true"
    >
      <path d={d} stroke="#2980b9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Bars({
  heights,
  fadeLast = false,
  className = "",
}: {
  heights: number[];
  fadeLast?: boolean;
  className?: string;
}) {
  return (
    <div className={`${styles.bars} ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className={styles.bar}
          style={{
            height: `${h}%`,
            background:
              fadeLast && i === heights.length - 1
                ? "#e2e8f0"
                : `rgba(41,128,185,${0.25 + (i / heights.length) * 0.75})`,
          }}
        />
      ))}
    </div>
  );
}

const reasons = [
  {
    icon: TrendingUp,
    title: "Increase Efficiency",
    text: "Streamline processes and reduce manual work across your mill.",
  },
  {
    icon: Eye,
    title: "Get Real-Time Visibility",
    text: "Monitor production, inventory and operations from anywhere.",
  },
  {
    icon: BarChart3,
    title: "Scale Your Operations",
    text: "Easily manage growing volumes and multiple plants.",
  },
  {
    icon: Cog,
    title: "Modernize Your Mill",
    text: "Replace outdated systems with a connected, digital solution.",
  },
];

export default function WhenAndWhom() {
  const ref = useRef<HTMLElement>(null);
  useParallax(ref);

  return (
    <section ref={ref} className={`${styles.section} ${font.className}`}>
      <div className={styles.inner}>
        {/* ---------------- Left ---------------- */}
        <div className={styles.left}>
          <span className={styles.badge}>When &amp; Whom</span>

          <h2 className={styles.title}>
            Built for Modern
            <br className={styles.br} />{" "}
            <span className={styles.accentLight}>40 TPD+</span> Flour Mills,
            <br className={styles.br} /> Ready for{" "}
            <span className={styles.accentDark}>What&rsquo;s Next</span>
          </h2>

          <p className={styles.sub}>
            Promiller is designed for growing flour mills that want better
            visibility, smarter operations and a future-ready digital setup.
          </p>

          {/* <a href="#" className={styles.cta}>
            Explore for Your Mill
            <ArrowRight size={16} />
          </a> */}

          <div className={styles.visual}>
            <div className={styles.photoWrap}>
              <div className={styles.circle} aria-hidden="true" />

              {/* Put your mill photo at /public/images/sectionImages/mill.png */}
              <Image
                src="/images/sectionImages/mill.png"
                alt="Flour mill silos and processing tower"
                fill
                priority
                sizes="(min-width: 1100px) 60vw, 100vw"
                className={styles.photo}
              />
            </div>

            <svg
              className={styles.connectors}
              viewBox="0 0 900 760"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 418 118 Q 410 160 418 190"
                stroke="#2980b9"
                strokeOpacity="0.5"
                strokeDasharray="3 4"
              />
              <path
                d="M 345 165 Q 380 175 383 210"
                stroke="#2980b9"
                strokeOpacity="0.5"
                strokeDasharray="3 4"
              />
              <path
                d="M 700 300 Q 760 280 830 300"
                stroke="#2980b9"
                strokeOpacity="0.5"
                strokeDasharray="3 4"
              />
            </svg>

            <FloatCard depth={10} pos={styles.posProduction}>
              <p className={styles.cardLabel}>Production</p>
              <div className={styles.cardRow}>
                <span className={styles.cardValue}>285 TPD</span>
                <span className={styles.delta}>↑ 12%</span>
              </div>
              <Sparkline d="M2 30 C 20 26, 30 34, 50 26 S 80 22, 100 20 S 130 12, 158 8" />
            </FloatCard>

            <FloatCard depth={7} pos={styles.posInventory}>
              <p className={styles.cardLabel}>Wheat Inventory</p>
              <div className={styles.invRow}>
                <span className={styles.cardValue}>1,240 MT</span>
                <span className={styles.leaf}>
                  <Wheat size={16} aria-hidden="true" />
                </span>
              </div>
              <div className={styles.progress}>
                <div className={styles.progressFill} />
              </div>
            </FloatCard>

            <FloatCard depth={13} pos={styles.posStatus}>
              <p className={styles.cardLabel}>Plant Status</p>
              <div className={styles.statusRow}>
                <span className={styles.status}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  Running
                </span>
                <Bars heights={[10, 18, 30, 42, 60, 78, 100]} />
              </div>
            </FloatCard>

            <FloatCard depth={9} pos={styles.posEnergy}>
              <p className={styles.cardLabel}>Energy Usage</p>
              <span className={styles.cardValue}>320 kWh</span>
              <Bars
                heights={[12, 22, 30, 45, 60, 85, 40]}
                fadeLast
                className={styles.barsEnergy}
              />
            </FloatCard>

            <FloatCard depth={12} pos={styles.posMoisture}>
              <p className={styles.cardLabel}>Moisture (Avg)</p>
              <span className={styles.cardValue}>12.6%</span>
              <Sparkline d="M2 30 C 25 34, 35 20, 60 24 S 95 34, 120 22 S 145 14, 158 16" />
            </FloatCard>
          </div>
        </div>

        {/* ---------------- Right ---------------- */}
        <div className={styles.right}>
          <p className={styles.eyebrow}>When to choose</p>
          <h3 className={styles.rightTitle}>
            It&rsquo;s time to upgrade
            <br />
            when you want to&hellip;
          </h3>

          <ul className={styles.list}>
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className={styles.item}>
                <span className={styles.iconTile}>
                  <Icon size={32} strokeWidth={1.8} color="#111" />
                </span>
                <div>
                  <h4 className={styles.itemTitle}>{title}</h4>
                  <p className={styles.itemText}>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
