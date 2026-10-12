import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/app";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import s from "./layout.module.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/* ───────── Sample data (replace with real values / a real screenshot) ───────── */
const NAV = [
  {
    l: "Dashboard",
    d: "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z",
    on: true,
  },
  { l: "Mills", d: "M3 20V9l6 3V9l6 3V5h3v15H3z" },
  { l: "Production", d: "M4 12a8 8 0 1016 0 8 8 0 10-16 0zM12 8v4l3 2" },
  { l: "Inventory", d: "M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10" },
  { l: "Orders", d: "M8 4h8v3H8zM6 6H5v15h14V6h-1M9 12h6M9 16h6" },
  { l: "Energy", d: "M13 2L5 14h6l-1 8 8-12h-6z" },
  { l: "Reports", d: "M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3" },
];

const KPIS = [
  { l: "Wheat intake", v: "128 t", c: "#1a6fd4" },
  { l: "Flour output", v: "96 t", c: "#20c07a" },
  { l: "Extraction", v: "75%", c: "#f0a020" },
  { l: "Open orders", v: "39", c: "#e5604d" },
];

const FLOW = [
  { l: "Intake", v: "128 t", p: 100 },
  { l: "Cleaning", v: "124 t", p: 97 },
  { l: "Grinding", v: "118 t", p: 92 },
  { l: "Sifting", v: "106 t", p: 83 },
  { l: "Packing", v: "96 t", p: 75 },
];

const TABLE = [
  { m: "Mill 1", o: "32.4 t", e: "94%", u: "21.5 h" },
  { m: "Mill 2", o: "28.9 t", e: "91%", u: "20.1 h" },
  { m: "Mill 3", o: "18.0 t", e: "76%", u: "14.2 h" },
  { m: "Mill 4", o: "16.7 t", e: "89%", u: "19.4 h" },
];

const MILLS = [
  { n: "Mill 1", r: "4.2 t/h", c: "#20c07a" },
  { n: "Mill 2", r: "3.8 t/h", c: "#20c07a" },
  { n: "Mill 3", r: "Idle", c: "#f0a020" },
  { n: "Mill 4", r: "4.4 t/h", c: "#20c07a" },
];

const ALERTS = [
  { t: "Mill 3 stopped", d: "Motor overload · 2 min ago", c: "#e5604d" },
  { t: "Wheat stock low", d: "Silo 2 · below 10 t", c: "#f0a020" },
];

const vars = (o: Record<string, string | number>) => o as CSSProperties;

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    if (session.user.role === "ADMIN") redirect(ROUTES.admin);
    else redirect(ROUTES.dashboard);
  }

  return (
    <div className={`${s.shell} ${font.className}`}>
      {/* ───────── Form column ───────── */}
      <main className={s.formCol}>
        <header className={s.top}>
          <Link href={ROUTES.home} className={s.back}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to home
          </Link>
        </header>

        <div className={s.formSlot}>
          <div className={s.formInner}>{children}</div>
        </div>

        <footer className={s.foot}>
          <span>© {new Date().getFullYear()} PROMILLER</span>
          <span className={s.secure}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3l8 3v6c0 4.5-3.2 8.2-8 9-4.8-.8-8-4.5-8-9V6l8-3z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Secure sign-in
          </span>
        </footer>
      </main>

      {/* ───────── Showcase panel ───────── */}
      <aside className={s.panel} aria-hidden="true">
        <div className={s.bg} />

        <div className={s.copyHeader}>
          <div className={s.copy}>
            <h1>
              One platform.
              <br />
              Endless Solutions.
            </h1>
            <p>Smart Milling, Better Results.</p>
          </div>

          <Image
            src="/ProMiller-logo.webp"
            className={s.copyLogo}
            alt="ProMiller"
            width={180}
            height={180}
          />
        </div>

        <div className={s.stage}>
          {/* Card 1 — many mills, one device */}
          {/* <div className={`${s.card} ${s.mills}`}>
            <div className={s.hubHead}>
              <span className={s.device}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h13v9H3zM1 18h17M19 9h4v9h-4z" />
                </svg>
              </span>
              <div>
                <strong>One screen, every mill</strong>
                <small>4 mills connected</small>
              </div>
              <em className={s.live}>
                <i />
                Live
              </em>
            </div>
            <ul className={s.millList}>
              {MILLS.map((m) => (
                <li key={m.n}>
                  <span className={s.dot} style={{ background: m.c }} />
                  <b>{m.n}</b>
                  <small>{m.r}</small>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Card 2 — alerts */}
          {/* <div className={`${s.card} ${s.alert}`}>
            <div className={s.alertHead}>
              <span className={s.alertIco}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 004 0" />
                </svg>
              </span>
              <div>
                <strong>Alerts</strong>
                <small>2 need attention</small>
              </div>
              <em className={s.badge}>New</em>
            </div>
            <ul className={s.alertList}>
              {ALERTS.map((a) => (
                <li key={a.t}>
                  <span className={s.dot} style={{ background: a.c }} />
                  <div>
                    <strong>{a.t}</strong>
                    <small>{a.d}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Card 3 — power saving */}
          {/* <div className={`${s.card} ${s.saving}`}>
            <small>Monthly power saving</small>
            <b>₹45,000–₹75,000</b>
            <span>10 chakkis · 18 hrs/day · ₹8/kWh</span>
          </div> */}

          {/* Dashboard window */}
          <div className={s.dash}>
            <div className={s.winBar}>
              <i />
              <i />
              <i />
            </div>
            <div className={s.winBody}>
              <nav className={s.side}>
                {NAV.map((n) => (
                  <div key={n.l} className={`${s.navItem} ${n.on ? s.on : ""}`}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={n.d} />
                    </svg>
                    <span className={s.navLabel}>{n.l}</span>
                  </div>
                ))}
              </nav>

              <div className={s.main}>
                <div className={s.toolbar}>
                  <span className={s.picker}>
                    All mills (4)
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                  <div className={s.chips}>
                    <span>Today</span>
                    <span className={s.active}>7D</span>
                    <span>1M</span>
                    <span>6M</span>
                  </div>
                </div>

                <div className={s.kpis}>
                  {KPIS.map((k) => (
                    <div key={k.l} className={s.kpi}>
                      <small>
                        <i style={{ background: k.c }} />
                        {k.l}
                      </small>
                      <b>{k.v}</b>
                    </div>
                  ))}
                </div>

                <div className={s.box}>
                  <div className={s.boxHead}>
                    Production flow <em>Live</em>
                  </div>
                  <div className={s.flow}>
                    {FLOW.map((f, i) => (
                      <div key={f.l} className={s.fcol}>
                        <small>{f.l}</small>
                        <b>{f.v}</b>
                        <div className={s.track}>
                          <span className={s.pct}>{f.p}%</span>
                          <span
                            className={s.fill}
                            style={vars({ "--p": `${f.p}%`, "--i": i })}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={s.box}>
                  <div className={s.boxHead}>Mill performance</div>
                  <div className={s.table}>
                    <div className={`${s.tr} ${s.th}`}>
                      <span>Mill</span>
                      <span>Output</span>
                      <span>Efficiency</span>
                      <span className={s.hideMd}>Uptime</span>
                    </div>
                    {TABLE.map((r) => (
                      <div key={r.m} className={s.tr}>
                        <b>{r.m}</b>
                        <span>{r.o}</span>
                        <span>{r.e}</span>
                        <span className={s.hideMd}>{r.u}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
