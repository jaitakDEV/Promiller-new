"use client";

import { useId, useState, type FormEvent } from "react";
import styles from "./contact-section.module.css";
import {
  WORLD_MAP_HEIGHT,
  WORLD_MAP_PATH,
  WORLD_MAP_WIDTH,
  projectToMap,
} from "./world-map-path";

export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type ContactDetail = { label: string; href?: string };

type ContactSectionProps = {
  title?: string;
  description?: string;
  details?: ContactDetail[];
  /** Where the "We are here" pin sits on the map. Defaults to central India. */
  pin?: { lat: number; lng: number };
  pinLabel?: string;
  /** Called with the form values. Throw/reject to show the error message. */
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
};

const DEFAULT_DETAILS: ContactDetail[] = [
  { label: "contact@yoursaas.ai", href: "mailto:contact@yoursaas.ai" },
  { label: "+1 (800) 123 XX21" },
  { label: "support@yoursaas.ai", href: "mailto:support@yoursaas.ai" },
];

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="3" fill="#2f7cf6" />
      <path
        d="m4.5 8 7.5 5.5L19.5 8"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorldMap({
  pin,
  label,
}: {
  pin: { lat: number; lng: number };
  label: string;
}) {
  const { x, y } = projectToMap(pin.lat, pin.lng);

  return (
    <div
      className={styles.mapStage}
      role="img"
      aria-label={`Map showing our location: ${label}`}
    >
      <div className={styles.map}>
        <svg
          className={styles.mapSvg}
          viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
          aria-hidden="true"
          focusable="false"
        >
          <path className={styles.land} d={WORLD_MAP_PATH} />
        </svg>

        <div className={styles.pin} style={{ left: `${x}%`, top: `${y}%` }}>
          <span className={styles.pinBase} />
          <span className={styles.pinPulse} />
          <div className={styles.pinBeam}>
            <span className={styles.pinLabel}>{label}</span>
            <span className={styles.pinLine} />
          </div>
        </div>
      </div>
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactSection({
  title = "Contact us",
  description = "We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.",
  details = DEFAULT_DETAILS,
  pin = { lat: 20.6, lng: 79 },
  pinLabel = "We are here",
  onSubmit,
}: ContactSectionProps) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget; // capture before any await
    const fd = new FormData(form);
    const data: ContactFormData = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    setStatus("submitting");
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // No handler passed yet: just log so the UI can be tested.
      }
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className={styles.section} aria-labelledby={`${uid}-title`}>
      <div className={styles.container}>
        {/* Left: intro, details, map */}
        <div className={styles.left}>
          <span className={styles.iconTile}>
            <MailIcon />
          </span>

          <h2 id={`${uid}-title`} className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>

          <ul className={styles.details}>
            {details.map((d) => (
              <li key={d.label}>
                {d.href ? (
                  <a href={d.href}>{d.label}</a>
                ) : (
                  <span>{d.label}</span>
                )}
              </li>
            ))}
          </ul>

          <WorldMap pin={pin} label={pinLabel} />
        </div>

        {/* Right: form card */}
        <div className={styles.card}>
          <div className={styles.decor} aria-hidden="true" />
          <span
            className={`${styles.decorBlock} ${styles.decorBlockA}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.decorBlock} ${styles.decorBlockB}`}
            aria-hidden="true"
          />

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${uid}-name`}>
                Full name
              </label>
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${uid}-email`}>
                Email Address
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${uid}-company`}>
                Company
              </label>
              <input
                id={`${uid}-company`}
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Your company"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${uid}-message`}>
                Message
              </label>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={4}
                placeholder="Type your message here"
                required
                className={styles.textarea}
              />
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.button}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Submit"}
              </button>

              <p
                role="status"
                aria-live="polite"
                className={`${styles.status} ${
                  status === "success"
                    ? styles.statusSuccess
                    : status === "error"
                      ? styles.statusError
                      : ""
                }`}
              >
                {status === "success" && "Thanks! We'll get back to you soon."}
                {status === "error" &&
                  "Something went wrong. Please try again."}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
