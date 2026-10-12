import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CALCULATORS,
  calculatorPath,
  getCalculator,
  isLive,
} from "@/config/calculators";

// Shared page for calculators that are listed but not built yet.
export function ComingSoonCalculator({ slug }: { slug: string }) {
  const calculator = getCalculator(slug);
  if (!calculator) notFound();

  const available = CALCULATORS.filter((c) => c.slug !== slug && isLive(c));

  return (
    <div
      style={{ maxWidth: "640px", margin: "0 auto", padding: "4rem 1.5rem" }}
    >
      <Link
        href="/calculators"
        style={{
          fontSize: "13px",
          color: "#1c5d87",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        ← All calculators
      </Link>

      <div
        style={{
          marginTop: "1.5rem",
          background: "#fff",
          border: "1px solid #d5e4ef",
          borderRadius: "20px",
          padding: "2rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "999px",
            background: "#e6f1f9",
            border: "1px solid #d5e4ef",
            color: "#2980b9",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          Coming soon
        </span>

        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#111a2b",
            margin: "16px 0 10px",
            letterSpacing: "-0.3px",
          }}
        >
          {calculator.name.en}
        </h1>

        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#4a5a6b",
            margin: "0 0 8px",
          }}
        >
          {calculator.description.en}
        </p>
        <p
          lang="hi"
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#4a5a6b",
            margin: "0 0 20px",
          }}
        >
          {calculator.description.hi}
        </p>

        <p style={{ fontSize: "14px", color: "#111a2b", margin: 0 }}>
          We are still building this calculator. It will appear here as soon as
          it is ready.
        </p>

        {available.length > 0 && (
          <div
            style={{
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid #d5e4ef",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#4a5a6b",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: "0 0 10px",
              }}
            >
              Available now
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {available.map((c) => (
                <Link
                  key={c.slug}
                  href={calculatorPath(c.slug)}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "999px",
                    background: "#2980b9",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {c.name.en}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
