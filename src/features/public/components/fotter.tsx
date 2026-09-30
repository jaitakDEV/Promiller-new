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

const CSS = `
  .pm-link {
    display: inline-block;
    margin-left: -0.75rem;
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    color: #12496f;
    transition: color 0.2s ease, background-color 0.2s ease;
  }
  .pm-link:hover,
  .pm-link:focus-visible {
    color: #ffffff;
    background-color: #1e6aa0;
  }
  .pm-link:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }
`;

export function Footer() {
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 px-2 pt-16 sm:px-6 md:pt-20 lg:grid-cols-2 lg:gap-8 lg:px-16 lg:pt-24">
          <div>
            <Link
              href="/"
              aria-label={`${BRAND} home`}
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Image
                src="/ProMiller-logo.webp"
                alt="ProMiller logo"
                width={300}
                height={300}
                priority
                className="h-24 w-auto object-contain drop-shadow-sm md:h-24"
              />
            </Link>
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
            className="select-none whitespace-nowrap text-center text-[clamp(3.5rem,16.5vw,14rem)] font-bold leading-none tracking-tight text-white/90"
          >
            {BRAND}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
