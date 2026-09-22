"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

export type Logo = {
  name: string;
  src: string;
  /** Intrinsic size of the file. Only used for aspect ratio; display size is set by CSS. */
  width?: number;
  height?: number;
  /** Extra classes for this logo, e.g. "dark:invert" for black SVGs on dark backgrounds. */
  className?: string;
};

type SingleRowLogoCloudProps = {
  logos: Logo[];
  heading?: string;
  /** Milliseconds between swaps. */
  interval?: number;
  className?: string;
};

/** Number of logos visible in the row at any time. */
const SLOTS = 5;

export function SingleRowLogoCloud({
  logos,
  heading = "Trusted by the best",
  interval = 2000,
  className = "",
}: SingleRowLogoCloudProps) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  // Split the list into batches of 5. If the last batch is short,
  // it wraps around to the start so every slot always has a logo.
  const batches = useMemo(() => {
    if (logos.length === 0) return [];
    const count = Math.ceil(logos.length / SLOTS);
    return Array.from({ length: count }, (_, b) =>
      Array.from(
        { length: Math.min(SLOTS, logos.length) },
        (_, i) => logos[(b * SLOTS + i) % logos.length],
      ),
    );
  }, [logos]);

  useEffect(() => {
    if (batches.length < 2) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % batches.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [batches.length, interval]);

  if (batches.length === 0) return null;

  const offset = reduceMotion ? 0 : 12;
  const blur = reduceMotion ? "blur(0px)" : "blur(8px)";

  return (
    <section
      aria-label={heading}
      className={`mx-auto w-full max-w-6xl px-4 py-10 md:px-8 ${className}`}
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
        <p className="shrink-0 text-center text-base font-medium text-neutral-500 dark:text-neutral-400 md:text-left md:text-lg">
          {heading}
        </p>

        <div className="grid w-full grid-cols-5 items-center gap-3 sm:gap-8 md:flex-1">
          {batches[active].map((_, slot) => {
            const logo = batches[active][slot];
            return (
              <div
                key={slot}
                className="flex h-8 items-center justify-center sm:h-10"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={logo.name}
                    className="flex h-full w-full items-center justify-center"
                    initial={{ opacity: 0, y: offset, filter: blur }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.4, ease: "easeOut" },
                    }}
                    exit={{
                      opacity: 0,
                      y: -offset,
                      filter: blur,
                      // Stagger: each slot leaves a little after the previous one.
                      transition: {
                        duration: 0.3,
                        ease: "easeIn",
                        delay: reduceMotion ? 0 : slot * 0.08,
                      },
                    }}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width ?? 120}
                      height={logo.height ?? 32}
                      draggable={false}
                      className={`h-4 w-auto max-w-full select-none object-contain sm:h-5 md:h-6 ${logo.className ?? ""}`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SingleRowLogoCloud;
