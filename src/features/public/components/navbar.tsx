"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import styles from "./Navbar.module.css";

type SubItem = { name: string; path: string; external?: boolean };
type MenuItem = {
  name: string;
  path?: string;
  external?: boolean;
  dropdown?: SubItem[];
};

const menuItems: MenuItem[] = [
  {
    name: "About Us",
    dropdown: [{ name: "About Us", path: "/about-us" }],
  },

  { name: "Features", dropdown: [{ name: "Features", path: "" }] },
  { name: "Installation", dropdown: [{ name: "Installation", path: "" }] },
  {
    name: "Modules",
    dropdown: [{ name: "Calculators", path: "" }],
  },

  {
    name: "Contact Us",
    dropdown: [{ name: "Contact Us", path: "" }],
  },
];

const socials = [
  {
    icon: Mail,
    link: "",
    isLucide: true,
  },
  {
    icon: FaFacebookF,
    link: "",
    isLucide: false,
  },
  {
    icon: FaInstagram,
    link: "",
    isLucide: false,
  },
  { icon: FaTwitter, link: "", isLucide: false },
  {
    icon: FaYoutube,
    link: "",
    isLucide: false,
  },
  { icon: FaLinkedinIn, link: "", isLucide: false },
];

function DesktopDropdown({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const show = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  return (
    <li
      style={{ position: "relative", listStyle: "none" }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button type="button" className={styles.dropdownTrigger}>
        {item.name}
        <ChevronDown
          size={13}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      {open && (
        <div
          className={styles.dropdownWrapper}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <div className={styles.dropdownPanel}>
            {item.dropdown!.map((sub) =>
              sub.external ? (
                <a
                  key={sub.name}
                  href={sub.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dropdownItem}
                >
                  {sub.name}
                </a>
              ) : (
                <Link
                  key={sub.name}
                  href={sub.path}
                  className={styles.dropdownItem}
                >
                  {sub.name}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const pathname = usePathname();

  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const lastScrollY = lastScrollYRef.current;
        const scrolledDown = currentScrollY > lastScrollY;
        const pastThreshold = currentScrollY > 80;

        // Never hide the navbar while the mobile drawer is open, or before
        // the user has scrolled past a small threshold near the top —
        // this avoids a jittery hide/show on tiny scroll wobbles.
        if (mobileOpen || currentScrollY <= 80) {
          setNavHidden(false);
        } else if (scrolledDown && pastThreshold) {
          setNavHidden(true);
        } else if (!scrolledDown) {
          setNavHidden(false);
        }

        lastScrollYRef.current = currentScrollY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  const scrollLockRef = useRef(false);

  const lockScroll = useCallback(() => {
    if (!scrollLockRef.current) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      scrollLockRef.current = true;
    }
  }, []);

  const unlockScroll = useCallback(() => {
    if (scrollLockRef.current) {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      scrollLockRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [mobileOpen, lockScroll, unlockScroll]);

  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setMobileOpen(false);
      setMobileDropdown(null);
    }
  }, [pathname]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileDropdown(null);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${navHidden ? styles.headerHidden : ""}`}
      >
        <nav className={styles.mainNav}>
          <div className={styles.navInner}>
            <Link href="/" className={styles.logoLink}>
              <div className={styles.logoBox}>
                <Image
                  src="/pro-miller-logo.webp"
                  alt="MDSSC"
                  width={140}
                  height={52}
                  className={styles.logoImg}
                  priority
                />
              </div>
            </Link>

            <div className={styles.navMenuBox}>
              <ul className={styles.desktopMenu}>
                {menuItems.map((item) =>
                  item.dropdown ? (
                    <DesktopDropdown key={item.name} item={item} />
                  ) : item.external ? (
                    <li key={item.name} style={{ listStyle: "none" }}>
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.navLinkUnderline}
                      >
                        {item.name}
                      </a>
                    </li>
                  ) : (
                    <li key={item.name} style={{ listStyle: "none" }}>
                      <Link
                        href={item.path ?? "/"}
                        className={styles.navLinkUnderline}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className={styles.navAuthBtns}>
              <Link href="" className={styles.btnLogin}>
                {" "}
                Login
              </Link>
              <Link href="" className={styles.btnGetStarted}>
                Get Started
              </Link>
            </div>

            <button
              type="button"
              className={styles.hamburgerBtn}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={28} color="#0951a5" />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ""}`}
        onClick={closeMobile}
        aria-hidden="true"
      />

      <div
        className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className={styles.drawerHeader}>
          <Image
            src="/pro-miller-logo.webp"
            alt="MDSSC"
            width={80}
            height={30}
            style={{ height: "30px", width: "auto" }}
          />
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close navigation menu"
            className={styles.drawerCloseBtn}
          >
            <X size={24} color="#0951a5" />
          </button>
        </div>

        <div className={styles.drawerContactStrip}>
          <a href="tel:18001231104" className={styles.drawerContactLink}>
            <Phone size={13} style={{ color: "#93c5fd" }} />
            1800-123-1104
          </a>
          <a
            href="mailto:promiller@support.in"
            className={styles.drawerContactLink}
          >
            <Mail size={13} style={{ color: "#93c5fd" }} />
            promiller@support.in
          </a>
        </div>

        <div className={styles.drawerAuthGrid}>
          <Link
            href="/login"
            onClick={closeMobile}
            className={styles.drawerBtnLogin}
          >
            Login
          </Link>
          <Link
            href="/register"
            onClick={closeMobile}
            className={styles.drawerBtnGetStarted}
          >
            Get Started
          </Link>
        </div>

        <div className={styles.drawerMenuList}>
          {menuItems.map((item) => (
            <div key={item.name} className={styles.drawerMenuItem}>
              {item.dropdown ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileDropdown((prev) =>
                        prev === item.name ? null : item.name,
                      )
                    }
                    className={styles.drawerMenuTrigger}
                  >
                    {item.name}
                    <ChevronDown
                      size={18}
                      style={{
                        transition: "transform 0.2s",
                        transform:
                          mobileDropdown === item.name
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        color: "#0951a5",
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {mobileDropdown === item.name && (
                    <div className={styles.drawerSubList}>
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          onClick={closeMobile}
                          className={styles.drawerSubLink}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : item.external ? (
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className={styles.drawerMenuLink}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  href={item.path ?? "/"}
                  onClick={closeMobile}
                  className={styles.drawerMenuLink}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className={styles.drawerSocials}>
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.link}
              target="_blank"
              rel="noreferrer"
              className={styles.drawerSocialIcon}
              aria-label={`Social link ${i + 1}`}
            >
              <s.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
