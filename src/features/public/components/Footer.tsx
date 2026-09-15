import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

const QUICK_LINKS = [
  { label: "Photo gallery and press news", href: "#" },
  { label: "Academic Bank of Credits (ABC)", href: "#" },
  { label: "UGC Notices", href: "#" },
  { label: "Guest House", href: "#" },
  { label: "Research - Development", href: "#" },
  { label: "Video gallery", href: "#" },
  { label: "CSR Certificate", href: "#" },
  { label: "Documentary", href: "#" },
  { label: "Alumni", href: "#" },
  { label: "RTI", href: "#" },
  { label: "Academic Integrity", href: "#" },
  { label: "Forms and Formats", href: "#" },
  { label: "Foreign Admission", href: "#" },
  { label: "NIRF", href: "#" },
  { label: "SC/ST/OBC Cell", href: "#" },
  { label: "University Bulletin and Reports", href: "#" },
  { label: "AICTE", href: "#" },
  { label: "Grievance", href: "#" },
  { label: "NSS Cell", href: "#" },
  { label: "Equal opportunity", href: "#" },
  { label: "Anti Ragging", href: "#" },
  { label: "Internal Quality Assurance Cell (IQAC)", href: "#" },
  { label: "Internal Complaint Committee", href: "#" },
  { label: "Service rules and Roster", href: "#" },
  { label: "Centre of Excellence/ Shodhpeeth", href: "#" },
  { label: "Anti Sexual Harassment Cell", href: "#" },
  { label: "AISHE", href: "#" },
  { label: "Mental health and well-being", href: "#" },
  { label: "Public Self-Disclosure", href: "#" },
  { label: "National Archives of India", href: "#" },
  { label: "Bhavya Bhavans", href: "#" },
  { label: "UGC-INFLIBNET Centre", href: "#" },
  { label: "IPR Guidelines", href: "#" },
  { label: "CUG", href: "#" },
];

const NAV_COLUMNS = [
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Vision & Mission", href: "/vision-mission" },
      { label: "Governance", href: "/governance" },
      { label: "Accreditations", href: "#" },
      { label: "Campus Life", href: "#" },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Programmes", href: "#" },
      { label: "Admissions", href: "#" },
      { label: "Academics", href: "#" },
      { label: "Faculty & Research", href: "#" },
      { label: "Examinations", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Membership Plans", href: "/pricing" },
      { label: "Consultancy", href: "#" },
      { label: "Registration Help", href: "#" },
      { label: "Courses", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/mysba.co.in",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mysba.co.in/",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@mysba-swavalambibharatabhi565",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="white"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Mail",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=info@mysba.co.in",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topStrip}>
        <div className={styles.linksGrid}>
          {QUICK_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={styles.linkItem}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.mainFooter}>
        <div className={styles.brandCol}>
          <div className={styles.logoPlaceholder}>
            <Image
              src="/mdssc-logo.svg"
              alt="MDSSC"
              width={160}
              height={56}
              style={{ objectFit: "contain" }}
            />
          </div>
          {/* <Image
            src="/mdssc-logo.svg"
            alt="MDSSC"
            width={160}
            height={56}
            style={{ objectFit: "contain" }}
          /> */}

          <p className={styles.brandDesc}>
            MDSU-CHARGE is a knowledge-driven platform committed to empowering
            India's MSME ecosystem through education, consultancy, and
            institutional support.
          </p>

          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {NAV_COLUMNS.map((col) => (
          <div key={col.title} className={styles.navCol}>
            <p className={styles.navColTitle}>{col.title}</p>
            <ul className={styles.navList}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.contactRow}>
        <a href="tel:18001231104" className={styles.contactItem}>
          <span className={styles.contactIcon}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
            </svg>
          </span>
          1800-123-0000
        </a>
        <a
          href="mailto:admissions@mdsucharge.in"
          className={styles.contactItem}
        >
          <span className={styles.contactIcon}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </span>
          admissions@mdsucharge.in
        </a>
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
        >
          <span className={styles.contactIcon}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          MDS University, Ajmer, Rajasthan
        </a>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomBarInner}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} MDSU-CHARGE. All rights reserved.
          </span>
          <div className={styles.bottomLinks}>
            <Link href="#" className={styles.bottomLink}>
              Privacy Policy
            </Link>
            <Link href="#" className={styles.bottomLink}>
              Terms of Use
            </Link>
            <Link href="#" className={styles.bottomLink}>
              Disclaimer
            </Link>
            <Link href="#" className={styles.bottomLink}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
