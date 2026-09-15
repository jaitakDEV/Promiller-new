import styles from "./MarqueeBar.module.css";

const items = [
  { pill: "✦ Innovation", text: "Smart Flour Milling" },
  { pill: "✦ Efficiency", text: "Lower Power Costs" },
  { pill: "✦ Trusted", text: "275+ Installations" },
  { pill: "✦ Experience", text: "60+ Years of Expertise" },
];

export function MarqueeBar() {
  return (
    <div className={styles.bar} role="marquee" aria-label="Announcements">
      <div className={styles.fadeLeft} aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />

      <div className={styles.track}>
        {[...Array(2)].flatMap((_, copy) =>
          items.flatMap((item, i) => [
            <span key={`item-${copy}-${i}`} className={styles.item}>
              <span className={styles.pill}>{item.pill}</span>
              {item.text}
            </span>,
            <span key={`dot-${copy}-${i}`} aria-hidden="true" />,
          ]),
        )}
      </div>
    </div>
  );
}
