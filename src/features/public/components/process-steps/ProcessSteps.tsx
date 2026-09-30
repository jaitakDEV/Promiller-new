// import type { ReactElement } from "react";
// import styles from "./ProcessSteps.module.css";

// type Step = {
//   id: number;
//   title: string;
//   description: string;
//   icon: (props: { className?: string }) => ReactElement;
// };

// /* ---------------------------------- Icons ---------------------------------- */
// /* Minimal hand-drawn stroke icons, matched in weight to the reference design. */

// function IconEligibility({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M12 3l7 3v5c0 4.6-3 7.9-7 9-4-1.1-7-4.4-7-9V6l7-3z"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M9 12l2 2 4-4"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function IconUpload({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M6.5 17.5a3.5 3.5 0 01-.5-6.96A5 5 0 0115.9 8.1 4 4 0 0117 16H16"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M12 20v-8m0 0l-2.5 2.5M12 12l2.5 2.5"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function IconApproved({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
//       <path
//         d="M8.5 12.3l2.3 2.2L15.5 9.7"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function IconPlanning({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect
//         x="4.5"
//         y="4.5"
//         width="15"
//         height="15"
//         rx="2"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       />
//       <path
//         d="M4.5 9.5h15M8.5 4.5v-1M15.5 4.5v-1"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//       />
//       <path
//         d="M8 13h3M8 16h6"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// function IconDesign({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M12 3.5l8 4.5-8 4.5-8-4.5 8-4.5z"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M4 12l8 4.5 8-4.5M4 15.5L12 20l8-4.5"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinejoin="round"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// function IconDevelopment({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M9 8l-4 4 4 4M15 8l4 4-4 4"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M13.5 6.5l-3 11"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// function IconTesting({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M9 3.5h6"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//       />
//       <path
//         d="M10 4v4.2c0 .5-.15.9-.42 1.28L5.9 15.2c-1 1.4-.02 3.3 1.7 3.3h8.8c1.72 0 2.7-1.9 1.7-3.3l-3.68-5.72A2.2 2.2 0 0114 8.2V4"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M8 14.5h8"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// function IconLaunch({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M12 3c2.5 1.6 4 4.6 4 8.2 0 1.6-.3 3-.8 4.3H8.8c-.5-1.3-.8-2.7-.8-4.3C8 7.6 9.5 4.6 12 3z"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinejoin="round"
//       />
//       <circle
//         cx="12"
//         cy="10.5"
//         r="1.4"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       />
//       <path
//         d="M8.2 15.3L5.8 18M15.8 15.3l2.4 2.7M10 18.8l2 2.2 2-2.2"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// function IconSupport({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M5 13v-1a7 7 0 0114 0v1"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//       />
//       <rect
//         x="3.5"
//         y="13"
//         width="4"
//         height="5"
//         rx="1.3"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       />
//       <rect
//         x="16.5"
//         y="13"
//         width="4"
//         height="5"
//         rx="1.3"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       />
//       <path
//         d="M18.5 18v.8a2.7 2.7 0 01-2.7 2.7H13"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// /* ---------------------------------- Data ---------------------------------- */

// const STEPS: Step[] = [
//   {
//     id: 1,
//     title: "Check Eligibility",
//     description:
//       "Answer a few quick questions so we can confirm you qualify before you apply.",
//     icon: IconEligibility,
//   },
//   {
//     id: 2,
//     title: "Upload Documents",
//     description:
//       "Securely upload the paperwork we need — we'll guide you through what's required.",
//     icon: IconUpload,
//   },
//   {
//     id: 3,
//     title: "Get Approved",
//     description:
//       "Our team reviews everything and confirms your approval, usually within a day.",
//     icon: IconApproved,
//   },
//   {
//     id: 4,
//     title: "Planning",
//     description:
//       "We map out scope, timeline, and requirements before any design work begins.",
//     icon: IconPlanning,
//   },
//   {
//     id: 5,
//     title: "Design",
//     description:
//       "We shape the interface and experience around what your users actually need.",
//     icon: IconDesign,
//   },
//   {
//     id: 6,
//     title: "Development",
//     description:
//       "Our engineers build the product to spec, with regular check-ins along the way.",
//     icon: IconDevelopment,
//   },
//   {
//     id: 7,
//     title: "Testing",
//     description:
//       "Every feature is tested against real scenarios before it reaches your users.",
//     icon: IconTesting,
//   },
//   {
//     id: 8,
//     title: "Launch",
//     description:
//       "We ship your product and watch closely through the first days live.",
//     icon: IconLaunch,
//   },
//   {
//     id: 9,
//     title: "Support",
//     description:
//       "Ongoing support keeps everything running smoothly long after launch.",
//     icon: IconSupport,
//   },
// ];

// // Visual order for the desktop snake grid (3 columns x 3 rows).
// // Row 1 reads left→right, row 2 right→left, row 3 left→right —
// // matching the reference layout's alternating direction.
// const GRID_ORDER = [
//   [1, 2, 3],
//   [6, 5, 4],
//   [7, 8, 9],
// ] as const;

// function findStep(id: number): Step {
//   return STEPS.find((s) => s.id === id)!;
// }

// /* --------------------------------- Component -------------------------------- */

// export default function ProcessSteps() {
//   return (
//     <section className={styles.section} aria-labelledby="process-heading">
//       <div className={styles.inner}>
//         <header className={styles.header}>
//           <span className={styles.eyebrow}>Step by step process</span>
//           <h2 id="process-heading" className={styles.heading}>
//             A clear process, start to finish
//           </h2>
//         </header>

//         {/* Desktop / tablet: snake grid with S-curve connector */}
//         <div className={styles.flowDesktop} aria-hidden={false}>
//           <svg
//             className={styles.connector}
//             viewBox="0 0 300 300"
//             preserveAspectRatio="none"
//             focusable="false"
//             aria-hidden="true"
//           >
//             {/* <path
//               d="M50,15 L150,15 L250,15
//                  C 300,10 300,150 250,125
//                  L150,125 L50,125
//                  C 0,110 0,250 50,235
//                  L150,235 L250,235"
//               fill="none"
//               className={styles.connectorPath}
//             /> */}
//             <path
//               d="
//     M50,15
//     L250,15
//     C305,15 305,125 250,125
//     L50,125
//     C-5,125 -5,235 50,235
//     L250,235
//   "
//               fill="none"
//               className={styles.connectorPath}
//             />
//           </svg>

//           <div className={styles.grid}>
//             {GRID_ORDER.map((row, rowIndex) =>
//               row.map((stepId) => {
//                 const step = findStep(stepId);
//                 const Icon = step.icon;
//                 const isHighlighted = step.id === 2;
//                 return (
//                   <div
//                     className={styles.node}
//                     key={step.id}
//                     style={{ gridRow: rowIndex + 1 }}
//                   >
//                     <div
//                       className={
//                         isHighlighted
//                           ? `${styles.badge} ${styles.badgeActive}`
//                           : styles.badge
//                       }
//                     >
//                       <Icon className={styles.icon} />
//                     </div>
//                     <h3 className={styles.nodeTitle}>{step.title}</h3>
//                     <p className={styles.nodeText}>{step.description}</p>
//                   </div>
//                 );
//               }),
//             )}
//           </div>
//         </div>

//         {/* Mobile: vertical timeline, true reading order */}
//         <ol className={styles.flowMobile}>
//           {STEPS.map((step) => {
//             const Icon = step.icon;
//             const isHighlighted = step.id === 2;
//             return (
//               <li className={styles.mobileNode} key={step.id}>
//                 <div
//                   className={
//                     isHighlighted
//                       ? `${styles.badge} ${styles.badgeActive}`
//                       : styles.badge
//                   }
//                 >
//                   <Icon className={styles.icon} />
//                 </div>
//                 <div className={styles.mobileText}>
//                   <h3 className={styles.nodeTitle}>{step.title}</h3>
//                   <p className={styles.nodeText}>{step.description}</p>
//                 </div>
//               </li>
//             );
//           })}
//         </ol>
//       </div>
//     </section>
//   );
// }

"use client";

import type { ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ProcessSteps.module.css";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: (props: { className?: string }) => ReactElement;
};

/* ---------------------------------- Icons ---------------------------------- */

function IconEligibility({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3l7 3v5c0 4.6-3 7.9-7 9-4-1.1-7-4.4-7-9V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconUpload({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 17.5a3.5 3.5 0 01-.5-6.96A5 5 0 0115.9 8.1 4 4 0 0117 16H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 20v-8m0 0l-2.5 2.5M12 12l2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconApproved({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.5 12.3l2.3 2.2L15.5 9.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconPlanning({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4.5"
        y="4.5"
        width="15"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4.5 9.5h15M8.5 4.5v-1M15.5 4.5v-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 13h3M8 16h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconDesign({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3.5l8 4.5-8 4.5-8-4.5 8-4.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 12l8 4.5 8-4.5M4 15.5L12 20l8-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconDevelopment({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 8l-4 4 4 4M15 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 6.5l-3 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconTesting({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 3.5h6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 4v4.2c0 .5-.15.9-.42 1.28L5.9 15.2c-1 1.4-.02 3.3 1.7 3.3h8.8c1.72 0 2.7-1.9 1.7-3.3l-3.68-5.72A2.2 2.2 0 0114 8.2V4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 14.5h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconLaunch({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3c2.5 1.6 4 4.6 4 8.2 0 1.6-.3 3-.8 4.3H8.8c-.5-1.3-.8-2.7-.8-4.3C8 7.6 9.5 4.6 12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10.5"
        r="1.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.2 15.3L5.8 18M15.8 15.3l2.4 2.7M10 18.8l2 2.2 2-2.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconSupport({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 13v-1a7 7 0 0114 0v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="3.5"
        y="13"
        width="4"
        height="5"
        rx="1.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="16.5"
        y="13"
        width="4"
        height="5"
        rx="1.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M18.5 18v.8a2.7 2.7 0 01-2.7 2.7H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------------------------- Data ---------------------------------- */

const STEPS: Step[] = [
  {
    id: 1,
    title: "Check Eligibility",
    description:
      "Answer a few quick questions so we can confirm you qualify before you apply.",
    icon: IconEligibility,
  },
  {
    id: 2,
    title: "Upload Documents",
    description:
      "Securely upload the paperwork we need — we'll guide you through what's required.",
    icon: IconUpload,
  },
  {
    id: 3,
    title: "Get Approved",
    description:
      "Our team reviews everything and confirms your approval, usually within a day.",
    icon: IconApproved,
  },
  {
    id: 4,
    title: "Planning",
    description:
      "We map out scope, timeline, and requirements before any design work begins.",
    icon: IconPlanning,
  },
  {
    id: 5,
    title: "Design",
    description:
      "We shape the interface and experience around what your users actually need.",
    icon: IconDesign,
  },
  {
    id: 6,
    title: "Development",
    description:
      "Our engineers build the product to spec, with regular check-ins along the way.",
    icon: IconDevelopment,
  },
  {
    id: 7,
    title: "Testing",
    description:
      "Every feature is tested against real scenarios before it reaches your users.",
    icon: IconTesting,
  },
  {
    id: 8,
    title: "Launch",
    description:
      "We ship your product and watch closely through the first days live.",
    icon: IconLaunch,
  },
  {
    id: 9,
    title: "Support",
    description:
      "Ongoing support keeps everything running smoothly long after launch.",
    icon: IconSupport,
  },
];

const GRID_ORDER = [
  [1, 2, 3],
  [6, 5, 4],
  [7, 8, 9],
] as const;

function findStep(id: number): Step {
  return STEPS.find((s) => s.id === id)!;
}

/* ----------------------- Scroll-completion tuning ----------------------- */
const OBSERVER_THRESHOLD = 0.5; // step must be ~50% visible before it's eligible
const OBSERVER_ROOT_MARGIN = "0px 0px -12% 0px";
const TICK_DELAY_MS = 450; // pause after a step becomes eligible, before it ticks
const STEP_STAGGER_MS = 500; // minimum gap between one change and the next (forward or reverse)

/* --------------------------------- Component -------------------------------- */

type NodeState = { eligible: boolean; below: boolean };

export default function ProcessSteps() {
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());
  // Per-element state (desktop + mobile share step ids, so track by element key)
  const nodeStateRef = useRef<Map<string, NodeState>>(new Map());
  const completedRef = useRef<Set<number>>(new Set()); // mirror of state, safe to read in timers
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastChangeAtRef = useRef<number>(0);

  const registerNode = useCallback((key: string, el: HTMLElement | null) => {
    if (el) elementsRef.current.set(key, el);
    else elementsRef.current.delete(key);
  }, []);

  useEffect(() => {
    const sortedIds = STEPS.map((s) => s.id).sort((a, b) => a - b);
    const reversedIds = [...sortedIds].reverse();

    // A step is "ready" if any of its rendered elements is in view or already scrolled past.
    const isEligible = (id: number) =>
      ["desktop", "mobile"].some(
        (p) => nodeStateRef.current.get(`${p}-${id}`)?.eligible,
      );

    // A step is "below" if its element is below the viewport (user scrolled back up past it).
    const isBelow = (id: number) =>
      ["desktop", "mobile"].some(
        (p) => nodeStateRef.current.get(`${p}-${id}`)?.below,
      );

    type Action = { type: "forward" | "reverse"; id: number };

    const pickAction = (): Action | null => {
      const completed = completedRef.current;

      // Reverse: the highest completed step, once it has scrolled back below the viewport.
      const lastDone = reversedIds.find((id) => completed.has(id));
      if (lastDone !== undefined && isBelow(lastDone)) {
        return { type: "reverse", id: lastDone };
      }

      // Forward: the lowest incomplete step, once it's eligible.
      const nextId = sortedIds.find((id) => !completed.has(id));
      if (nextId !== undefined && isEligible(nextId)) {
        return { type: "forward", id: nextId };
      }

      return null;
    };

    const isStillValid = (a: Action) =>
      a.type === "reverse"
        ? completedRef.current.has(a.id) && isBelow(a.id)
        : !completedRef.current.has(a.id) && isEligible(a.id);

    const scheduleAdvance = () => {
      if (advanceTimerRef.current) return; // already have one pending

      const action = pickAction();
      if (!action) return;

      const elapsed = Date.now() - lastChangeAtRef.current;
      const wait = Math.max(TICK_DELAY_MS, STEP_STAGGER_MS - elapsed);

      advanceTimerRef.current = setTimeout(() => {
        advanceTimerRef.current = null;

        // Conditions may have changed while we waited (user scrolled the other way)
        if (isStillValid(action)) {
          const next = new Set(completedRef.current);
          if (action.type === "forward") next.add(action.id);
          else next.delete(action.id);
          completedRef.current = next;
          lastChangeAtRef.current = Date.now();
          setCompletedIds(next);
        }

        scheduleAdvance(); // keep going if more steps are ready
      }, wait);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const key = el.dataset.nodeKey;
          if (!key) return;

          // Skip hidden layouts (display: none gives a zero-size rect)
          if (entry.boundingClientRect.height === 0) {
            nodeStateRef.current.set(key, { eligible: false, below: false });
            return;
          }

          const visibleEnough = entry.intersectionRatio >= OBSERVER_THRESHOLD;
          const isBelowViewport =
            !visibleEnough &&
            entry.boundingClientRect.top > window.innerHeight / 2;

          nodeStateRef.current.set(key, {
            // in view, or already scrolled past the top
            eligible: !isBelowViewport,
            below: isBelowViewport,
          });
        });
        scheduleAdvance();
      },
      { threshold: OBSERVER_THRESHOLD, rootMargin: OBSERVER_ROOT_MARGIN },
    );

    elementsRef.current.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (advanceTimerRef.current) {
        clearTimeout(advanceTimerRef.current);
        advanceTimerRef.current = null;
      }
    };
  }, []);

  const renderBadge = (step: Step, isDone: boolean) => {
    const Icon = step.icon;
    return (
      <div
        className={
          isDone ? `${styles.badge} ${styles.badgeActive}` : styles.badge
        }
      >
        <Icon className={styles.icon} />
      </div>
    );
  };

  return (
    <section className={styles.section} aria-labelledby="process-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Step by step process</span>
          <h2 id="process-heading" className={styles.heading}>
            A clear process, start to finish
          </h2>
        </header>

        <div className={styles.flowDesktop}>
          <svg
            className={styles.connector}
            viewBox="0 0 300 300"
            preserveAspectRatio="none"
            focusable="false"
            aria-hidden="true"
          >
            <path
              d="
    M50,15
    L250,15
    C305,15 305,125 250,125
    L50,125
    C-5,125 -5,235 50,235
    L250,235
  "
              fill="none"
              className={styles.connectorPath}
            />
          </svg>

          <div className={styles.grid}>
            {GRID_ORDER.map((row, rowIndex) =>
              row.map((stepId) => {
                const step = findStep(stepId);
                const isDone = completedIds.has(step.id);
                return (
                  <div
                    className={styles.node}
                    key={step.id}
                    style={{ gridRow: rowIndex + 1 }}
                    data-step-id={step.id}
                    data-node-key={`desktop-${step.id}`}
                    ref={(el) => registerNode(`desktop-${step.id}`, el)}
                  >
                    {renderBadge(step, isDone)}
                    <h3 className={styles.nodeTitle}>{step.title}</h3>
                    <p className={styles.nodeText}>{step.description}</p>
                  </div>
                );
              }),
            )}
          </div>
        </div>

        <ol className={styles.flowMobile}>
          {STEPS.map((step) => {
            const isDone = completedIds.has(step.id);
            return (
              <li
                className={styles.mobileNode}
                key={step.id}
                data-step-id={step.id}
                data-node-key={`mobile-${step.id}`}
                ref={(el) => registerNode(`mobile-${step.id}`, el)}
              >
                {renderBadge(step, isDone)}
                <div className={styles.mobileText}>
                  <h3 className={styles.nodeTitle}>{step.title}</h3>
                  <p className={styles.nodeText}>{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
