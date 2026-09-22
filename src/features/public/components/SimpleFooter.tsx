import Link from "next/link";
import Image from "next/image";

type FooterLink = { label: string; href: string };
type FooterGroup = { title: string; links: FooterLink[] };

const BRAND = "Pro Miller";

const groups: FooterGroup[] = [
  {
    title: "Pages",
    links: [
      { label: "All Products", href: "#" },
      { label: "Studio", href: "#" },
      { label: "Clients", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
  {
    title: "Register",
    links: [
      { label: "Sign Up", href: "#" },
      { label: "Login", href: "#" },
      { label: "Forgot Password", href: "#" },
    ],
  },
];

const BUBBLES = [
  { left: "6%", size: 10, delay: "0s", duration: "9s" },
  { left: "18%", size: 16, delay: "2.5s", duration: "12s" },
  { left: "31%", size: 8, delay: "5s", duration: "8s" },
  { left: "47%", size: 14, delay: "1s", duration: "11s" },
  { left: "62%", size: 9, delay: "3.5s", duration: "9.5s" },
  { left: "76%", size: 18, delay: "6s", duration: "13s" },
  { left: "90%", size: 11, delay: "0.5s", duration: "10s" },
];

// 2 identical periods, taaki translateX(-50%) pe loop seamless rahe
const WAVE_PATH =
  "M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 " +
  "C1400,120 1600,0 1800,60 C2000,120 2200,0 2400,60 L2400,0 L0,0 Z";

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M9.5 3h4.6L21 21h-4.7L9.5 3Z" />
      <path d="M3 21 7.8 9.5l2.3 5.6L7.7 21H3Z" />
    </svg>
  );
}

const CSS = `
  @keyframes pm-wave {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes pm-rise {
    0%   { transform: translateY(0) scale(0.6); opacity: 0; }
    15%  { opacity: 0.7; }
    100% { transform: translateY(-340px) scale(1); opacity: 0; }
  }
  @keyframes pm-flow {
    from { background-position: 0% 50%; }
    to   { background-position: 200% 50%; }
  }
  @keyframes pm-ripple {
    0%   { transform: scale(1);   opacity: 0.7; }
    100% { transform: scale(2.1); opacity: 0; }
  }

  .pm-wave-back  { animation: pm-wave 16s linear infinite; }
  .pm-wave-front { animation: pm-wave 9s linear infinite; }
  .pm-bubble     { animation: pm-rise linear infinite; }

  .pm-brand {
    background-image: linear-gradient(
      90deg, #ffffff, #c4f1ff, #ffffff, #8fdcfb, #ffffff
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: pm-flow 7s linear infinite;
  }

  /* logo ripple */
  .pm-ripple { opacity: 0; }
  .pm-logo:hover .pm-ripple,
  .pm-logo:focus-visible .pm-ripple {
    animation: pm-ripple 1.1s ease-out infinite;
  }

  /* water-fill link hover */
  .pm-link {
    position: relative;
    display: inline-block;
    overflow: hidden;
    isolation: isolate;
    margin-left: -0.75rem;
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    color: #12496f;
    transition: color 0.35s ease;
  }
  .pm-link::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(90deg, #1e6aa0, #2980b9);
    transform: translateY(105%);
    border-radius: 50% 50% 0 0 / 45% 45% 0 0;
    transition:
      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
      border-radius 0.45s ease;
  }
  .pm-link:hover,
  .pm-link:focus-visible { color: #ffffff; }
  .pm-link:hover::before,
  .pm-link:focus-visible::before {
    transform: translateY(0);
    border-radius: 9999px;
  }
  .pm-link:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) {
    .pm-wave-back, .pm-wave-front, .pm-bubble, .pm-brand,
    .pm-logo:hover .pm-ripple { animation: none !important; }
  }
`;

export function SimpleFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #ffffff 0%, #dff4fe 16%, #6dd5fa 55%, #2980b9 100%)",
      }}
    >
      <style>{CSS}</style>

      {/* animated water waves (top) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 overflow-hidden md:h-24"
      >
        <svg
          viewBox="0 0 2400 120"
          preserveAspectRatio="none"
          className="pm-wave-back absolute left-0 top-0 h-full w-[200%]"
        >
          <path d={WAVE_PATH} fill="#ffffff" fillOpacity="0.5" />
        </svg>
        <svg
          viewBox="0 0 2400 120"
          preserveAspectRatio="none"
          className="pm-wave-front absolute left-0 top-0 h-full w-[200%]"
          style={{ transform: "translateY(-14%)" }}
        >
          <path d={WAVE_PATH} fill="#ffffff" />
        </svg>
      </div>

      {/* rising bubbles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="pm-bubble absolute bottom-0 rounded-full border border-white/70 bg-white/25"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDelay: b.delay,
              animationDuration: b.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 px-2 pt-24 sm:px-6 md:pt-32 lg:grid-cols-2 lg:gap-8 lg:px-16 lg:pt-36">
          <div>
            <Link
              href="/"
              aria-label={`${BRAND} home`}
              className="pm-logo inline-flex items-center gap-3 rounded-sm text-[#0b3a5b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            ></Link>
            <Image
              src="/ProMiller-logo.webp"
              alt="ProMiller logo"
              width={300}
              height={300}
              priority
              className="h-24 w-auto object-contain drop-shadow-sm md:h-24"
            />
            <p className="mt-6 max-w-xs text-sm text-[#0b3a5b]/70">
              Milling above the clouds. Smarter, cleaner and more efficient
              flour mills.
            </p>
            <p className="mt-4 text-sm text-[#0b3a5b]/70">
              © copyright {BRAND} {year}. All rights reserved.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4"
          >
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-[#0b3a5b]">
                  {group.title}
                </h3>
                <span className="mt-2 block h-0.5 w-8 rounded-full bg-gradient-to-r from-[#2980B9] to-transparent" />
                <ul className="mt-4 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="pm-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="px-2 pb-8 pt-16 sm:px-6 md:pb-12 md:pt-24 lg:px-16">
          <p
            aria-hidden="true"
            className="pm-brand select-none whitespace-nowrap text-center text-[clamp(3.5rem,16.5vw,14rem)] font-bold leading-none tracking-tight"
          >
            {BRAND}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SimpleFooter;
