import Link from "next/link";
import type { LegalContent } from "@/features/legal/content";

function formatVersionDate(version: string): string {
  const d = new Date(`${version}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return version;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function hasPlaceholders(content: LegalContent): boolean {
  return JSON.stringify(content).includes("[TO BE CONFIRMED");
}

type Props = {
  content: LegalContent;
  version: string;
  other: { title: string; href: string };
};

export function LegalDocumentView({ content, version, other }: Props) {
  // Only warns developers; never shown in production builds.
  const showDraftNotice =
    process.env.NODE_ENV !== "production" && hasPlaceholders(content);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 text-slate-700 sm:px-6 md:py-24">
      <Link
        href="/register"
        className="text-sm font-medium text-[#1e6aa0] hover:underline"
      >
        ← Back to registration
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#0b3a5b] md:text-4xl">
        {content.title}
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Version {version} · Last updated {formatVersionDate(version)}
      </p>

      {showDraftNotice && (
        <p
          role="note"
          className="mt-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
        >
          Development notice: some text still contains placeholders. Fill them
          in src/config/company.ts before launch.
        </p>
      )}

      <div className="mt-8 space-y-3">
        {content.intro.map((p) => (
          <p key={p} className="leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <nav
        aria-label="On this page"
        className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5"
      >
        <p className="text-sm font-semibold text-[#0b3a5b]">On this page</p>
        <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
          {content.sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-[#1e6aa0] hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-10">
        {content.sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-[#0b3a5b]">{s.title}</h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="mt-3 leading-relaxed">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p className="mt-12 border-t border-slate-200 pt-6 text-sm">
        Also read:{" "}
        <Link href={other.href} className="text-[#1e6aa0] hover:underline">
          {other.title}
        </Link>
      </p>
    </article>
  );
}
