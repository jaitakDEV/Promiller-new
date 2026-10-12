import Link from "next/link";
import { ROUTES } from "@/config/app";

type Props = { missingPhone: boolean; missingCompany: boolean };

type Nudge = {
  key: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  bg: string;
  border: string;
  titleColor: string;
  textColor: string;
  buttonBg: string;
};

export function ProfileNudges({ missingPhone, missingCompany }: Props) {
  const nudges: Nudge[] = [];

  if (missingPhone) {
    nudges.push({
      key: "phone",
      title: "Add your phone number",
      text: "Your account has no phone number yet. Add it so we can reach you for account support and security.",
      cta: "Add phone number",
      href: `${ROUTES.profile}#phone`,
      bg: "#fffbeb",
      border: "#fde68a",
      titleColor: "#92400e",
      textColor: "#a16207",
      buttonBg: "#b45309",
    });
  }

  if (missingCompany) {
    nudges.push({
      key: "company",
      title: "Add your company details",
      text: "Your company name, city and GSTIN will appear on every report you generate.",
      cta: "Add company details",
      href: `${ROUTES.profile}#companyName`,
      bg: "#eff6ff",
      border: "#bfdbfe",
      titleColor: "#1e3a8a",
      textColor: "#1d4ed8",
      buttonBg: "#0951a5",
    });
  }

  if (nudges.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      {nudges.map((n) => (
        <div
          key={n.key}
          role="note"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
            padding: "14px 16px",
            background: n.bg,
            border: `1px solid ${n.border}`,
            borderRadius: "12px",
          }}
        >
          <div style={{ minWidth: 0, flex: "1 1 260px" }}>
            <p
              style={{
                margin: "0 0 2px",
                fontSize: "14px",
                fontWeight: 600,
                color: n.titleColor,
              }}
            >
              {n.title}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                lineHeight: 1.5,
                color: n.textColor,
              }}
            >
              {n.text}
            </p>
          </div>
          <Link
            href={n.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 14px",
              background: n.buttonBg,
              color: "#fff",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {n.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
