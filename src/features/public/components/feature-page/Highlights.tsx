'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
} from 'react';
import styles from './Highlights.module.css';

const AUTOPLAY_MS = 6000;

/* ---------- Small CSS/SVG visuals (swap for real dashboard screenshots later) ---------- */

function BarsVisual() {
  const bars = [62, 88, 45, 74, 96, 58];
  return (
    <div className={styles.bars} aria-hidden="true">
      {bars.map((h, i) => (
        <span key={i} style={{ '--h': `${h}%` } as CSSProperties} />
      ))}
    </div>
  );
}

function EnergyVisual() {
  return (
    <svg className={styles.chart} viewBox="0 0 320 120" aria-hidden="true">
      <polyline
        points="0,90 40,70 80,78 120,40 160,56 200,30 240,48 280,22 320,34"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="0" y1="112" x2="320" y2="112" stroke="currentColor" strokeOpacity=".25" />
    </svg>
  );
}

function VibrationVisual() {
  return (
    <svg className={styles.chart} viewBox="0 0 320 120" aria-hidden="true">
      <path
        d="M0 60 q10 -10 20 0 t20 0 t20 0 t20 0 t20 0 q8 -18 16 0 t16 0 q7 -32 14 0 t14 0 q6 -46 12 0 t12 0 q5 -56 10 0 t10 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="292" cy="60" r="7" fill="var(--accent)" />
    </svg>
  );
}

function ScoreVisual() {
  return (
    <div className={styles.ring} style={{ '--score': 92 } as CSSProperties} aria-hidden="true">
      <span>92</span>
    </div>
  );
}

function SafetyVisual() {
  return (
    <ol className={styles.stages} aria-hidden="true">
      <li>Alarm</li>
      <li>Remedy</li>
      <li>Shutdown</li>
    </ol>
  );
}

function RemoteVisual() {
  return (
    <div className={styles.phone} aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}

/* ---------- Content ---------- */

type Tone = 'forest' | 'wheat' | 'slate' | 'stone';

type CardData = {
  id: string;
  tone: Tone;
  text: string;
  Visual: ComponentType;
};

const CARDS: CardData[] = [
  {
    id: 'live',
    tone: 'forest',
    text: 'Every machine. Every shift. Live on one screen.',
    Visual: BarsVisual,
  },
  {
    id: 'energy',
    tone: 'wheat',
    text: 'See where every unit of power goes, then use less of it.',
    Visual: EnergyVisual,
  },
  {
    id: 'maintenance',
    tone: 'slate',
    text: 'Fix it before it breaks. Wear shows up in the data first.',
    Visual: VibrationVisual,
  },
  {
    id: 'health',
    tone: 'stone',
    text: 'One health score per machine. Know in a second.',
    Visual: ScoreVisual,
  },
  {
    id: 'safety',
    tone: 'forest',
    text: 'Alarm, remedy, shutdown. Only the faulty unit stops.',
    Visual: SafetyVisual,
  },
  {
    id: 'remote',
    tone: 'wheat',
    text: 'Run your mill from anywhere, on any screen.',
    Visual: RemoteVisual,
  },
];

/* ---------- Component ---------- */

export default function Highlights() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const goTo = useCallback((i: number) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[i];
    if (!scroller || !card) return;
    const left = card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2;
    scroller.scrollTo({ left, behavior: 'smooth' });
  }, []);

  // Track which card is closest to the centre while scrolling
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let raf = 0;

    const update = () => {
      const centre = scroller.scrollLeft + scroller.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Autoplay: advance after AUTOPLAY_MS, loop back to the first card
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => goTo((active + 1) % CARDS.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, playing, goTo]);

  return (
    <section className={styles.section} aria-roledescription="carousel" aria-label="ProMiller highlights">
      <div className={styles.head}>
        <h2 className={styles.title}>Get the highlights.</h2>
      </div>

      <ul className={styles.scroller} ref={scrollerRef}>
        {CARDS.map(({ id, tone, text, Visual }, i) => (
          <li
            key={id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`${styles.card} ${styles[tone]} ${i === active ? styles.isActive : ''}`}
            onClick={() => i !== active && goTo(i)}
            aria-label={`${i + 1} of ${CARDS.length}`}
          >
            <p className={styles.copy}>{text}</p>
            <div className={styles.stage}>
              <Visual />
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.controls}>
        <div className={styles.dots} role="tablist" aria-label="Choose a highlight">
          {CARDS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Highlight ${i + 1}`}
              className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
            >
              {i === active && (
                <span
                  key={`${active}-${playing}`}
                  className={`${styles.fill} ${playing ? styles.fillRunning : ''}`}
                  style={{ '--dur': `${AUTOPLAY_MS}ms` } as CSSProperties}
                />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.playBtn}
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause autoplay' : 'Play autoplay'}
        >
          {playing ? (
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <rect x="2" y="1.5" width="2.8" height="9" rx="1" fill="currentColor" />
              <rect x="7.2" y="1.5" width="2.8" height="9" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M3 1.8v8.4a.6.6 0 0 0 .9.5l6.7-4.2a.6.6 0 0 0 0-1L3.9 1.3a.6.6 0 0 0-.9.5Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}