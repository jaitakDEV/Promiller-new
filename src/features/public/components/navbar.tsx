// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   useCallback,
//   useEffect,
//   useId,
//   useRef,
//   useState,
//   type ReactNode,
// } from "react";

// /* -------------------------------------------------------------------------- */
// /*  Config                                                                    */
// /* -------------------------------------------------------------------------- */

// type NavItem = { label: string; href: string };

// const NAV_ITEMS: NavItem[] = [
//   { label: "About", href: "/#about" },
//   { label: "Features", href: "/features" },
//   { label: "Modules", href: "/#modules" },
//   { label: "Contact Us", href: "/#contact" },
// ];

// const SIGN_IN = { label: "Login", href: "/login" };
// const CTA = { label: "Get started", href: "/register" };

// /** Switch to solid state after this much scroll… */
// const SCROLL_ON = 24;
// /** …and back to transparent only below this (hysteresis stops flicker). */
// const SCROLL_OFF = 8;

// /**
//  * One shared timing for EVERY animated property, so padding, radius,
//  * background, shadow, logo size and text colours all move in sync.
//  * (Mismatched durations are what makes a navbar transition feel jerky.)
//  */
// const MOTION =
//   "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

// /* -------------------------------------------------------------------------- */
// /*  Component                                                                 */
// /* -------------------------------------------------------------------------- */

// type NavbarProps = {
//   /** Logo over the transparent state (white / light logo). */
//   logoSrc?: string;
//   /** Colour logo shown on the white state. */
//   logoSolidSrc?: string;
//   logoAlt?: string;
// };

// export default function Navbar({
//   logoSrc = "/ProMiller-logo.webp",
//   logoSolidSrc = "/pro-miller-color-logo.webp",
//   logoAlt = "ProMiller logo",
// }: NavbarProps) {
//   const pathname = usePathname();
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   // White card when scrolled OR when the mobile menu is open
//   const solid = scrolled || open;

//   const closeMenu = useCallback(() => setOpen(false), []);

//   /* Scroll detection (passive + rAF throttled + hysteresis) */
//   useEffect(() => {
//     let ticking = false;
//     const update = () => {
//       const y = window.scrollY;
//       setScrolled((prev) =>
//         y > SCROLL_ON ? true : y < SCROLL_OFF ? false : prev,
//       );
//       ticking = false;
//     };
//     const onScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(update);
//         ticking = true;
//       }
//     };
//     update();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* Close menu on route change */
//   useEffect(() => {
//     setOpen(false);
//   }, [pathname]);

//   /* Close on Escape, and when resizing up to desktop */
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setOpen(false);
//     };
//     const mq = window.matchMedia("(min-width: 768px)");
//     const onChange = (e: MediaQueryListEvent) => {
//       if (e.matches) setOpen(false);
//     };
//     window.addEventListener("keydown", onKey);
//     mq.addEventListener("change", onChange);
//     return () => {
//       window.removeEventListener("keydown", onKey);
//       mq.removeEventListener("change", onChange);
//     };
//   }, []);

//   /* Lock body scroll while the mobile menu is open */
//   useEffect(() => {
//     if (!open) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = prev;
//     };
//   }, [open]);

//   const logoSize = scrolled ? "h-12 md:h-14" : "h-16 md:h-20";

//   const linkBase = `rounded-md px-1 py-1 text-base font-semibold transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500`;
//   const linkTone = solid
//     ? "text-slate-700 hover:text-sky-700"
//     : "text-white/90 hover:text-white";

//   return (
//     <header
//       className={`fixed inset-x-0 top-0 z-50 transition-[padding] ${MOTION} ${
//         solid ? "px-3 pt-3 md:px-6" : "px-0 pt-0"
//       }`}
//     >
//       <div
//         className={`w-full transition-[background-color,box-shadow,border-radius] ${MOTION} ${
//           solid
//             ? "rounded-2xl bg-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5"
//             : "rounded-none bg-white/0 shadow-none ring-0 ring-transparent"
//         }`}
//       >
//         <nav
//           aria-label="Main navigation"
//           className={`flex items-center justify-between px-4 transition-[padding] ${MOTION} md:px-6 ${
//             scrolled ? "py-2" : "py-3 md:py-4"
//           }`}
//         >
//           {/* Logo: cross-fades between white (top) and colour (scrolled) */}
//           <Link
//             href="/"
//             aria-label="Go to homepage"
//             onClick={closeMenu}
//             className="relative flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
//           >
//             <Image
//               src={logoSrc}
//               alt={logoAlt}
//               width={300}
//               height={300}
//               priority
//               className={`w-auto object-contain transition-[height,opacity] ${MOTION} ${logoSize} ${
//                 solid ? "opacity-0" : "opacity-100"
//               }`}
//             />
//             <Image
//               src={logoSolidSrc}
//               alt=""
//               aria-hidden="true"
//               width={300}
//               height={300}
//               priority
//               className={`absolute left-0 top-0 h-full w-auto object-contain object-left transition-opacity ${MOTION} ${
//                 solid ? "opacity-100" : "opacity-0"
//               }`}
//             />
//           </Link>

//           {/* Desktop links */}
//           <ul className="hidden items-center gap-8 md:flex">
//             {NAV_ITEMS.map((item) => {
//               if (item.label === "Modules") {
//                 return (
//                   <li key={item.href}>
//                     <ModulesDropdown
//                       triggerClassName={`${linkBase} ${linkTone}`}
//                     />
//                   </li>
//                 );
//               }
//               const active = pathname === item.href;
//               return (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     aria-current={active ? "page" : undefined}
//                     className={`${linkBase} ${linkTone}`}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>

//           {/* Desktop actions */}
//           <div className="hidden items-center gap-3 md:flex">
//             <Link
//               href={SIGN_IN.href}
//               className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
//                 solid
//                   ? "border-slate-300 text-slate-800 hover:border-slate-900"
//                   : "border-white/60 text-white hover:bg-white/10"
//               }`}
//             >
//               {SIGN_IN.label}
//             </Link>
//             <Link
//               href={CTA.href}
//               className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
//                 solid
//                   ? "bg-slate-900 text-white hover:bg-slate-700"
//                   : "bg-white text-sky-700 hover:bg-white/90"
//               }`}
//             >
//               {CTA.label}
//               <ArrowIcon />
//             </Link>
//           </div>

//           {/* Mobile toggle */}
//           <button
//             type="button"
//             aria-label={open ? "Close menu" : "Open menu"}
//             aria-expanded={open}
//             aria-controls="mobile-menu"
//             onClick={() => setOpen((v) => !v)}
//             className={`inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 md:hidden ${
//               solid
//                 ? "text-slate-900 hover:bg-slate-100"
//                 : "text-white hover:bg-white/10"
//             }`}
//           >
//             <span className="relative block h-4 w-6" aria-hidden="true">
//               <span
//                 className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${
//                   open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
//                 }`}
//               />
//               <span
//                 className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded bg-current transition-opacity duration-200 ${
//                   open ? "opacity-0" : "opacity-100"
//                 }`}
//               />
//               <span
//                 className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${
//                   open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
//                 }`}
//               />
//             </span>
//           </button>
//         </nav>

//         {/* Mobile menu (animated height via grid rows) */}
//         <div
//           id="mobile-menu"
//           aria-hidden={!open}
//           className={`grid transition-[grid-template-rows] ${MOTION} md:hidden ${
//             open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//           }`}
//         >
//           <div className="overflow-hidden">
//             <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto border-t border-slate-100 px-4 pb-5 pt-3">
//               <ul className="flex flex-col">
//                 {NAV_ITEMS.map((item) => {
//                   if (item.label === "Modules") {
//                     return (
//                       <li key={item.href}>
//                         <ModulesAccordion
//                           onNavigate={closeMenu}
//                           menuOpen={open}
//                         />
//                       </li>
//                     );
//                   }
//                   const active = pathname === item.href;
//                   return (
//                     <li key={item.href}>
//                       <Link
//                         href={item.href}
//                         tabIndex={open ? 0 : -1}
//                         aria-current={active ? "page" : undefined}
//                         onClick={closeMenu}
//                         className="block rounded-lg px-3 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-500"
//                       >
//                         {item.label}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>

//               <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
//                 <Link
//                   href={SIGN_IN.href}
//                   tabIndex={open ? 0 : -1}
//                   onClick={closeMenu}
//                   className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-800 transition-colors hover:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
//                 >
//                   {SIGN_IN.label}
//                 </Link>
//                 <Link
//                   href={CTA.href}
//                   tabIndex={open ? 0 : -1}
//                   onClick={closeMenu}
//                   className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
//                 >
//                   {CTA.label}
//                   <ArrowIcon />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Icons                                                                     */
// /* -------------------------------------------------------------------------- */

// function ArrowIcon() {
//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={1.75}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="h-4 w-4"
//     >
//       <path d="M5 12h14M13 6l6 6-6 6" />
//     </svg>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Data  (edit titles, descriptions and links to match your real modules)    */
// /* -------------------------------------------------------------------------- */

// type ModuleItem = {
//   title: string;
//   description: string;
//   href: string;
//   icon: ReactNode;
// };

// const MODULES: ModuleItem[] = [
//   {
//     title: "Calculators",
//     description:
//       "Calculate atta pricing, conveying capacity, and power savings with precision tools",
//     href: "/calculators",
//     icon: (
//       <>
//         <rect x="3" y="4" width="18" height="17" rx="2" />
//         <path d="M8 2v4M16 2v4M3 10h18" />
//       </>
//     ),
//   },
//   {
//     title: "Grain Circle (Coming Soon)",
//     description:
//       "Connect with other millers, traders and suppliers to buy and sell grain.",
//     href: "",
//     icon: (
//       <>
//         <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
//         <path d="M3.3 7.7L12 12.5l8.7-4.8M12 22V12.5" />
//       </>
//     ),
//   },
// ];

// const FOOTER = {
//   text: "Not sure which module fits?",
//   linkLabel: "Talk to our team",
//   href: "/#contact",
// };

// /* -------------------------------------------------------------------------- */
// /*  Small pieces                                                              */
// /* -------------------------------------------------------------------------- */

// function Icon({
//   children,
//   className = "h-5 w-5",
// }: {
//   children: ReactNode;
//   className?: string;
// }) {
//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={1.75}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       {children}
//     </svg>
//   );
// }

// function Chevron({ open }: { open: boolean }) {
//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={`h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
//         open ? "rotate-180" : ""
//       }`}
//     >
//       <path d="M6 9l6 6 6-6" />
//     </svg>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Desktop dropdown                                                          */
// /* -------------------------------------------------------------------------- */

// type ModulesDropdownProps = {
//   /** Pass the same classes you use for the other nav links (linkBase + linkTone). */
//   triggerClassName: string;
//   label?: string;
// };

// export function ModulesDropdown({
//   triggerClassName,
//   label = "Modules",
// }: ModulesDropdownProps) {
//   const [open, setOpen] = useState(false);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLButtonElement>(null);
//   const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const panelId = useId();

//   const clearTimer = () => {
//     if (timer.current) clearTimeout(timer.current);
//   };

//   const show = useCallback(() => {
//     clearTimer();
//     setOpen(true);
//   }, []);

//   // Small delay on leave so the pointer can travel from trigger to panel
//   const hideSoon = useCallback(() => {
//     clearTimer();
//     timer.current = setTimeout(() => setOpen(false), 140);
//   }, []);

//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setOpen(false);
//         triggerRef.current?.focus();
//       }
//     };
//     const onPointerDown = (e: PointerEvent) => {
//       if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
//     };
//     document.addEventListener("keydown", onKey);
//     document.addEventListener("pointerdown", onPointerDown);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.removeEventListener("pointerdown", onPointerDown);
//     };
//   }, [open]);

//   useEffect(() => clearTimer, []);

//   return (
//     <div
//       ref={wrapRef}
//       className="relative"
//       onMouseEnter={show}
//       onMouseLeave={hideSoon}
//       onBlur={(e) => {
//         if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
//       }}
//     >
//       <button
//         ref={triggerRef}
//         type="button"
//         aria-expanded={open}
//         aria-controls={panelId}
//         aria-haspopup="true"
//         onClick={() => setOpen((v) => !v)}
//         className={`inline-flex items-center gap-1.5 ${triggerClassName}`}
//       >
//         {label}
//         <Chevron open={open} />
//       </button>

//       {/* pt-4 is an invisible hover bridge between trigger and card */}
//       <div
//         id={panelId}
//         className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none ${
//           open
//             ? "visible translate-y-0 opacity-100"
//             : "pointer-events-none invisible translate-y-2 opacity-0"
//         }`}
//       >
//         <div className="w-[min(41rem,calc(100vw-3rem))] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5">
//           <ul className="grid gap-1 p-3 sm:grid-cols-2">
//             {MODULES.map((m) => (
//               <li key={m.title}>
//                 <Link
//                   href={m.href}
//                   tabIndex={open ? 0 : -1}
//                   onClick={() => setOpen(false)}
//                   className="group flex items-start gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-500"
//                 >
//                   <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 transition-colors duration-200 group-hover:bg-sky-600 group-hover:text-white">
//                     <Icon>{m.icon}</Icon>
//                   </span>
//                   <span className="min-w-0">
//                     <span className="block text-sm font-semibold text-slate-900">
//                       {m.title}
//                     </span>
//                     <span className="mt-0.5 block text-sm leading-snug text-slate-500">
//                       {m.description}
//                     </span>
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-4">
//             <p className="text-sm text-slate-600">{FOOTER.text}</p>
//             <Link
//               href={FOOTER.href}
//               tabIndex={open ? 0 : -1}
//               onClick={() => setOpen(false)}
//               className="text-sm font-semibold text-sky-700 transition-colors hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
//             >
//               {FOOTER.linkLabel}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Mobile accordion                                                          */
// /* -------------------------------------------------------------------------- */

// type ModulesAccordionProps = {
//   /** Call this to close the mobile menu after a link is tapped. */
//   onNavigate: () => void;
//   /** Whether the mobile menu itself is open (used for tab order + reset). */
//   menuOpen: boolean;
//   label?: string;
// };

// export function ModulesAccordion({
//   onNavigate,
//   menuOpen,
//   label = "Modules",
// }: ModulesAccordionProps) {
//   const [open, setOpen] = useState(false);
//   const listId = useId();

//   // Collapse again whenever the whole mobile menu closes
//   useEffect(() => {
//     if (!menuOpen) setOpen(false);
//   }, [menuOpen]);

//   const focusable = menuOpen && open ? 0 : -1;

//   return (
//     <div>
//       <button
//         type="button"
//         aria-expanded={open}
//         aria-controls={listId}
//         tabIndex={menuOpen ? 0 : -1}
//         onClick={() => setOpen((v) => !v)}
//         className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-500"
//       >
//         {label}
//         <Chevron open={open} />
//       </button>

//       <div
//         id={listId}
//         aria-hidden={!open}
//         className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
//           open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//         }`}
//       >
//         <ul className="overflow-hidden">
//           {MODULES.map((m) => (
//             <li key={m.title}>
//               <Link
//                 href={m.href}
//                 tabIndex={focusable}
//                 onClick={onNavigate}
//                 className="flex items-center gap-3 rounded-lg py-2.5 pl-4 pr-3 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-500"
//               >
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
//                   <Icon className="h-4 w-4">{m.icon}</Icon>
//                 </span>
//                 <span className="text-sm font-medium text-slate-700">
//                   {m.title}
//                 </span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   useCallback,
//   useEffect,
//   useId,
//   useRef,
//   useState,
//   type ReactNode,
// } from "react";

// /* -------------------------------------------------------------------------- */
// /*  Config                                                                    */
// /* -------------------------------------------------------------------------- */

// type NavItem = { label: string; href: string };

// const NAV_ITEMS: NavItem[] = [
//   { label: "About", href: "/#about" },
//   { label: "Features", href: "/features" },
//   { label: "Modules", href: "/#modules" },
//   { label: "Contact Us", href: "/#contact" },
// ];

// const SIGN_IN = { label: "Login", href: "/login" };
// const CTA = { label: "Get started", href: "/register" };

// /** Switch to solid state after this much scroll… */
// const SCROLL_ON = 24;
// /** …and back to transparent only below this (hysteresis stops flicker). */
// const SCROLL_OFF = 8;

// /**
//  * One shared timing for EVERY animated property, so padding, radius,
//  * background, shadow, logo size and text colours all move in sync.
//  * (Mismatched durations are what makes a navbar transition feel jerky.)
//  */
// const MOTION =
//   "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

// /* -------------------------------------------------------------------------- */
// /*  Component                                                                 */
// /* -------------------------------------------------------------------------- */

// type NavbarProps = {
//   /** Logo over the transparent state (white / light logo). */
//   logoSrc?: string;
//   /** Colour logo shown on the white state. */
//   logoSolidSrc?: string;
//   logoAlt?: string;
// };

// export default function Navbar({
//   logoSrc = "/ProMiller-logo.webp",
//   logoSolidSrc = "/pro-miller-color-logo.webp",
//   logoAlt = "ProMiller logo",
// }: NavbarProps) {
//   const pathname = usePathname();

//   // ✅ CHANGE 1: /features page ka flag
//   const isFeatures = pathname === "/features";

//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   // White card when scrolled OR when the mobile menu is open
//   const solid = scrolled || open;

//   // ✅ CHANGE 2: /features par navbar blue rahega (top par bhi, scroll par bhi)
//   const blue = isFeatures;

//   // ✅ CHANGE 3: colour logo sirf tab dikhao jab white card ho (blue par hamesha white logo)
//   const showColorLogo = solid && !blue;

//   const closeMenu = useCallback(() => setOpen(false), []);

//   /* Scroll detection (passive + rAF throttled + hysteresis) */
//   useEffect(() => {
//     let ticking = false;
//     const update = () => {
//       const y = window.scrollY;
//       setScrolled((prev) =>
//         y > SCROLL_ON ? true : y < SCROLL_OFF ? false : prev,
//       );
//       ticking = false;
//     };
//     const onScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(update);
//         ticking = true;
//       }
//     };
//     update();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* Close menu on route change */
//   useEffect(() => {
//     setOpen(false);
//   }, [pathname]);

//   /* Close on Escape, and when resizing up to desktop */
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setOpen(false);
//     };
//     const mq = window.matchMedia("(min-width: 768px)");
//     const onChange = (e: MediaQueryListEvent) => {
//       if (e.matches) setOpen(false);
//     };
//     window.addEventListener("keydown", onKey);
//     mq.addEventListener("change", onChange);
//     return () => {
//       window.removeEventListener("keydown", onKey);
//       mq.removeEventListener("change", onChange);
//     };
//   }, []);

//   /* Lock body scroll while the mobile menu is open */
//   useEffect(() => {
//     if (!open) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = prev;
//     };
//   }, [open]);

//   const logoSize = scrolled ? "h-12 md:h-14" : "h-16 md:h-20";

//   const linkBase = `rounded-md px-1 py-1 text-base font-semibold transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500`;

//   // ✅ CHANGE 4: blue hone par links hamesha white
//   const linkTone = blue
//     ? "text-white/90 hover:text-white"
//     : solid
//       ? "text-slate-700 hover:text-sky-700"
//       : "text-white/90 hover:text-white";

//   return (
//     <header
//       className={`fixed inset-x-0 top-0 z-50 transition-[padding] ${MOTION} ${
//         solid ? "px-3 pt-3 md:px-6" : "px-0 pt-0"
//       }`}
//     >
//       {/* ✅ CHANGE 5: background blue on /features, otherwise original behaviour */}
//       <div
//         className={`w-full transition-[background-color,box-shadow,border-radius] ${MOTION} ${
//           blue
//             ? solid
//               ? "rounded-2xl bg-sky-700 shadow-lg shadow-slate-900/20 ring-1 ring-white/10"
//               : "rounded-none bg-sky-700 shadow-none ring-0 ring-transparent"
//             : solid
//               ? "rounded-2xl bg-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5"
//               : "rounded-none bg-white/0 shadow-none ring-0 ring-transparent"
//         }`}
//       >
//         <nav
//           aria-label="Main navigation"
//           className={`flex items-center justify-between px-4 transition-[padding] ${MOTION} md:px-6 ${
//             scrolled ? "py-2" : "py-3 md:py-4"
//           }`}
//         >
//           {/* Logo: cross-fades between white (top) and colour (scrolled) */}
//           <Link
//             href="/"
//             aria-label="Go to homepage"
//             onClick={closeMenu}
//             className="relative flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
//           >
//             {/* ✅ CHANGE 6a: `solid` ki jagah `showColorLogo` */}
//             <Image
//               src={logoSrc}
//               alt={logoAlt}
//               width={300}
//               height={300}
//               priority
//               className={`w-auto object-contain transition-[height,opacity] ${MOTION} ${logoSize} ${
//                 showColorLogo ? "opacity-0" : "opacity-100"
//               }`}
//             />
//             {/* ✅ CHANGE 6b: `solid` ki jagah `showColorLogo` */}
//             <Image
//               src={logoSolidSrc}
//               alt=""
//               aria-hidden="true"
//               width={300}
//               height={300}
//               priority
//               className={`absolute left-0 top-0 h-full w-auto object-contain object-left transition-opacity ${MOTION} ${
//                 showColorLogo ? "opacity-100" : "opacity-0"
//               }`}
//             />
//           </Link>

//           {/* Desktop links */}
//           <ul className="hidden items-center gap-8 md:flex">
//             {NAV_ITEMS.map((item) => {
//               if (item.label === "Modules") {
//                 return (
//                   <li key={item.href}>
//                     <ModulesDropdown
//                       triggerClassName={`${linkBase} ${linkTone}`}
//                     />
//                   </li>
//                 );
//               }
//               const active = pathname === item.href;
//               return (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     aria-current={active ? "page" : undefined}
//                     className={`${linkBase} ${linkTone}`}
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>

//           {/* Desktop actions */}
//           <div className="hidden items-center gap-3 md:flex">
//             {/* ✅ CHANGE 7: Login button - `blue || !solid` */}
//             <Link
//               href={SIGN_IN.href}
//               className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
//                 blue || !solid
//                   ? "border-white/60 text-white hover:bg-white/10"
//                   : "border-slate-300 text-slate-800 hover:border-slate-900"
//               }`}
//             >
//               {SIGN_IN.label}
//             </Link>
//             {/* ✅ CHANGE 8: CTA button - `blue || !solid` */}
//             <Link
//               href={CTA.href}
//               className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
//                 blue || !solid
//                   ? "bg-white text-sky-700 hover:bg-white/90"
//                   : "bg-slate-900 text-white hover:bg-slate-700"
//               }`}
//             >
//               {CTA.label}
//               <ArrowIcon />
//             </Link>
//           </div>

//           {/* Mobile toggle */}
//           {/* ✅ CHANGE 9: Mobile toggle - `blue || !solid` */}
//           <button
//             type="button"
//             aria-label={open ? "Close menu" : "Open menu"}
//             aria-expanded={open}
//             aria-controls="mobile-menu"
//             onClick={() => setOpen((v) => !v)}
//             className={`inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 md:hidden ${
//               blue || !solid
//                 ? "text-white hover:bg-white/10"
//                 : "text-slate-900 hover:bg-slate-100"
//             }`}
//           >
//             <span className="relative block h-4 w-6" aria-hidden="true">
//               <span
//                 className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${
//                   open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
//                 }`}
//               />
//               <span
//                 className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded bg-current transition-opacity duration-200 ${
//                   open ? "opacity-0" : "opacity-100"
//                 }`}
//               />
//               <span
//                 className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${
//                   open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
//                 }`}
//               />
//             </span>
//           </button>
//         </nav>

//         {/* Mobile menu (animated height via grid rows) */}
//         <div
//           id="mobile-menu"
//           aria-hidden={!open}
//           className={`grid transition-[grid-template-rows] ${MOTION} md:hidden ${
//             open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//           }`}
//         >
//           <div className="overflow-hidden">
//             {/* ✅ CHANGE 10: bg-white + rounded-b-2xl taaki blue par bhi dark links dikhein */}
//             <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-b-2xl border-t border-slate-100 bg-white px-4 pb-5 pt-3">
//               <ul className="flex flex-col">
//                 {NAV_ITEMS.map((item) => {
//                   if (item.label === "Modules") {
//                     return (
//                       <li key={item.href}>
//                         <ModulesAccordion
//                           onNavigate={closeMenu}
//                           menuOpen={open}
//                         />
//                       </li>
//                     );
//                   }
//                   const active = pathname === item.href;
//                   return (
//                     <li key={item.href}>
//                       <Link
//                         href={item.href}
//                         tabIndex={open ? 0 : -1}
//                         aria-current={active ? "page" : undefined}
//                         onClick={closeMenu}
//                         className="block rounded-lg px-3 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-500"
//                       >
//                         {item.label}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>

//               <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
//                 <Link
//                   href={SIGN_IN.href}
//                   tabIndex={open ? 0 : -1}
//                   onClick={closeMenu}
//                   className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-800 transition-colors hover:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
//                 >
//                   {SIGN_IN.label}
//                 </Link>
//                 <Link
//                   href={CTA.href}
//                   tabIndex={open ? 0 : -1}
//                   onClick={closeMenu}
//                   className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
//                 >
//                   {CTA.label}
//                   <ArrowIcon />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Icons                                                                     */
// /* -------------------------------------------------------------------------- */

// function ArrowIcon() {
//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={1.75}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="h-4 w-4"
//     >
//       <path d="M5 12h14M13 6l6 6-6 6" />
//     </svg>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Data  (edit titles, descriptions and links to match your real modules)    */
// /* -------------------------------------------------------------------------- */

// type ModuleItem = {
//   title: string;
//   description: string;
//   href: string;
//   icon: ReactNode;
// };

// const MODULES: ModuleItem[] = [
//   {
//     title: "Calculators",
//     description:
//       "Calculate atta pricing, conveying capacity, and power savings with precision tools",
//     href: "/calculators",
//     icon: (
//       <>
//         <rect x="3" y="4" width="18" height="17" rx="2" />
//         <path d="M8 2v4M16 2v4M3 10h18" />
//       </>
//     ),
//   },
//   {
//     title: "Grain Circle (Coming Soon)",
//     description:
//       "Connect with other millers, traders and suppliers to buy and sell grain.",
//     href: "",
//     icon: (
//       <>
//         <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
//         <path d="M3.3 7.7L12 12.5l8.7-4.8M12 22V12.5" />
//       </>
//     ),
//   },
// ];

// const FOOTER = {
//   text: "Not sure which module fits?",
//   linkLabel: "Talk to our team",
//   href: "/#contact",
// };

// /* -------------------------------------------------------------------------- */
// /*  Small pieces                                                              */
// /* -------------------------------------------------------------------------- */

// function Icon({
//   children,
//   className = "h-5 w-5",
// }: {
//   children: ReactNode;
//   className?: string;
// }) {
//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={1.75}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={className}
//     >
//       {children}
//     </svg>
//   );
// }

// function Chevron({ open }: { open: boolean }) {
//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className={`h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
//         open ? "rotate-180" : ""
//       }`}
//     >
//       <path d="M6 9l6 6 6-6" />
//     </svg>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Desktop dropdown                                                          */
// /* -------------------------------------------------------------------------- */

// type ModulesDropdownProps = {
//   /** Pass the same classes you use for the other nav links (linkBase + linkTone). */
//   triggerClassName: string;
//   label?: string;
// };

// export function ModulesDropdown({
//   triggerClassName,
//   label = "Modules",
// }: ModulesDropdownProps) {
//   const [open, setOpen] = useState(false);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLButtonElement>(null);
//   const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const panelId = useId();

//   const clearTimer = () => {
//     if (timer.current) clearTimeout(timer.current);
//   };

//   const show = useCallback(() => {
//     clearTimer();
//     setOpen(true);
//   }, []);

//   // Small delay on leave so the pointer can travel from trigger to panel
//   const hideSoon = useCallback(() => {
//     clearTimer();
//     timer.current = setTimeout(() => setOpen(false), 140);
//   }, []);

//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setOpen(false);
//         triggerRef.current?.focus();
//       }
//     };
//     const onPointerDown = (e: PointerEvent) => {
//       if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
//     };
//     document.addEventListener("keydown", onKey);
//     document.addEventListener("pointerdown", onPointerDown);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.removeEventListener("pointerdown", onPointerDown);
//     };
//   }, [open]);

//   useEffect(() => clearTimer, []);

//   return (
//     <div
//       ref={wrapRef}
//       className="relative"
//       onMouseEnter={show}
//       onMouseLeave={hideSoon}
//       onBlur={(e) => {
//         if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
//       }}
//     >
//       <button
//         ref={triggerRef}
//         type="button"
//         aria-expanded={open}
//         aria-controls={panelId}
//         aria-haspopup="true"
//         onClick={() => setOpen((v) => !v)}
//         className={`inline-flex items-center gap-1.5 ${triggerClassName}`}
//       >
//         {label}
//         <Chevron open={open} />
//       </button>

//       {/* pt-4 is an invisible hover bridge between trigger and card */}
//       <div
//         id={panelId}
//         className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none ${
//           open
//             ? "visible translate-y-0 opacity-100"
//             : "pointer-events-none invisible translate-y-2 opacity-0"
//         }`}
//       >
//         <div className="w-[min(41rem,calc(100vw-3rem))] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5">
//           <ul className="grid gap-1 p-3 sm:grid-cols-2">
//             {MODULES.map((m) => (
//               <li key={m.title}>
//                 <Link
//                   href={m.href}
//                   tabIndex={open ? 0 : -1}
//                   onClick={() => setOpen(false)}
//                   className="group flex items-start gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-500"
//                 >
//                   <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 transition-colors duration-200 group-hover:bg-sky-600 group-hover:text-white">
//                     <Icon>{m.icon}</Icon>
//                   </span>
//                   <span className="min-w-0">
//                     <span className="block text-sm font-semibold text-slate-900">
//                       {m.title}
//                     </span>
//                     <span className="mt-0.5 block text-sm leading-snug text-slate-500">
//                       {m.description}
//                     </span>
//                   </span>
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-4">
//             <p className="text-sm text-slate-600">{FOOTER.text}</p>
//             <Link
//               href={FOOTER.href}
//               tabIndex={open ? 0 : -1}
//               onClick={() => setOpen(false)}
//               className="text-sm font-semibold text-sky-700 transition-colors hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
//             >
//               {FOOTER.linkLabel}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Mobile accordion                                                          */
// /* -------------------------------------------------------------------------- */

// type ModulesAccordionProps = {
//   /** Call this to close the mobile menu after a link is tapped. */
//   onNavigate: () => void;
//   /** Whether the mobile menu itself is open (used for tab order + reset). */
//   menuOpen: boolean;
//   label?: string;
// };

// export function ModulesAccordion({
//   onNavigate,
//   menuOpen,
//   label = "Modules",
// }: ModulesAccordionProps) {
//   const [open, setOpen] = useState(false);
//   const listId = useId();

//   // Collapse again whenever the whole mobile menu closes
//   useEffect(() => {
//     if (!menuOpen) setOpen(false);
//   }, [menuOpen]);

//   const focusable = menuOpen && open ? 0 : -1;

//   return (
//     <div>
//       <button
//         type="button"
//         aria-expanded={open}
//         aria-controls={listId}
//         tabIndex={menuOpen ? 0 : -1}
//         onClick={() => setOpen((v) => !v)}
//         className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-500"
//       >
//         {label}
//         <Chevron open={open} />
//       </button>

//       <div
//         id={listId}
//         aria-hidden={!open}
//         className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
//           open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//         }`}
//       >
//         <ul className="overflow-hidden">
//           {MODULES.map((m) => (
//             <li key={m.title}>
//               <Link
//                 href={m.href}
//                 tabIndex={focusable}
//                 onClick={onNavigate}
//                 className="flex items-center gap-3 rounded-lg py-2.5 pl-4 pr-3 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-500"
//               >
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
//                   <Icon className="h-4 w-4">{m.icon}</Icon>
//                 </span>
//                 <span className="text-sm font-medium text-slate-700">
//                   {m.title}
//                 </span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Features", href: "/features" },
  { label: "Modules", href: "/#modules" },
  { label: "Contact Us", href: "/#contact" },
];

const SIGN_IN = { label: "Login", href: "/login" };
const CTA = { label: "Get started", href: "/register" };

/** Switch to solid state after this much scroll… */
const SCROLL_ON = 24;
/** …and back to transparent only below this (hysteresis stops flicker). */
const SCROLL_OFF = 8;

/**
 * One shared timing for EVERY animated property, so padding, radius,
 * background, shadow, logo size and text colours all move in sync.
 * (Mismatched durations are what makes a navbar transition feel jerky.)
 */
const MOTION =
  "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

type NavbarProps = {
  /** Logo over the transparent state (white / light logo). */
  logoSrc?: string;
  /** Colour logo shown on the white state. */
  logoSolidSrc?: string;
  logoAlt?: string;
};

export default function Navbar({
  logoSrc = "/ProMiller-logo.webp",
  logoSolidSrc = "/pro-miller-color-logo.webp",
  logoAlt = "ProMiller logo",
}: NavbarProps) {
  const pathname = usePathname();

  // ✅ CHANGE 1: /features page ka flag
  const isFeatures = pathname === "/features";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // White card when scrolled OR when the mobile menu is open
  const solid = scrolled || open;

  // ✅ CHANGE 2: /features par navbar blue rahega (top par bhi, scroll par bhi)
  const blue = isFeatures;

  // ✅ CHANGE 3: colour logo sirf tab dikhao jab white card ho (blue par hamesha white logo)
  const showColorLogo = solid && !blue;

  // ✅ CHANGE 11: floating card look (left/right/top padding + rounded) -
  // scroll/menu open par ya /features page par hamesha
  const floating = solid || blue;

  const closeMenu = useCallback(() => setOpen(false), []);

  /* Scroll detection (passive + rAF throttled + hysteresis) */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled((prev) =>
        y > SCROLL_ON ? true : y < SCROLL_OFF ? false : prev,
      );
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on route change */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Close on Escape, and when resizing up to desktop */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  /* Lock body scroll while the mobile menu is open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const logoSize = scrolled ? "h-12 md:h-14" : "h-16 md:h-20";

  const linkBase = `rounded-md px-1 py-1 text-base font-semibold transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500`;

  // ✅ CHANGE 4: blue hone par links hamesha white
  const linkTone = blue
    ? "text-white/90 hover:text-white"
    : solid
      ? "text-slate-700 hover:text-sky-700"
      : "text-white/90 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] ${MOTION} ${
        floating ? "px-3 pt-3 md:px-6" : "px-0 pt-0"
      }`}
    >
      {/* ✅ CHANGE 5: background blue on /features, otherwise original behaviour */}
      <div
        className={`w-full transition-[background-color,box-shadow,border-radius] ${MOTION} ${
          blue
            ? "rounded-2xl bg-sky-700 shadow-lg shadow-slate-900/20 ring-1 ring-white/10"
            : solid
              ? "rounded-2xl bg-white shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5"
              : "rounded-none bg-white/0 shadow-none ring-0 ring-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={`flex items-center justify-between px-4 transition-[padding] ${MOTION} md:px-6 ${
            scrolled ? "py-2" : "py-3 md:py-4"
          }`}
        >
          {/* Logo: cross-fades between white (top) and colour (scrolled) */}
          <Link
            href="/"
            aria-label="Go to homepage"
            onClick={closeMenu}
            className="relative flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          >
            {/* ✅ CHANGE 6a: `solid` ki jagah `showColorLogo` */}
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={300}
              height={300}
              priority
              className={`w-auto object-contain transition-[height,opacity] ${MOTION} ${logoSize} ${
                showColorLogo ? "opacity-0" : "opacity-100"
              }`}
            />
            {/* ✅ CHANGE 6b: `solid` ki jagah `showColorLogo` */}
            <Image
              src={logoSolidSrc}
              alt=""
              aria-hidden="true"
              width={300}
              height={300}
              priority
              className={`absolute left-0 top-0 h-full w-auto object-contain object-left transition-opacity ${MOTION} ${
                showColorLogo ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              if (item.label === "Modules") {
                return (
                  <li key={item.href}>
                    <ModulesDropdown
                      triggerClassName={`${linkBase} ${linkTone}`}
                    />
                  </li>
                );
              }
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`${linkBase} ${linkTone}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* ✅ CHANGE 7: Login button - `blue || !solid` */}
            <Link
              href={SIGN_IN.href}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                blue || !solid
                  ? "border-white/60 text-white hover:bg-white/10"
                  : "border-slate-300 text-slate-800 hover:border-slate-900"
              }`}
            >
              {SIGN_IN.label}
            </Link>
            {/* ✅ CHANGE 8: CTA button - `blue || !solid` */}
            <Link
              href={CTA.href}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                blue || !solid
                  ? "bg-white text-sky-700 hover:bg-white/90"
                  : "bg-slate-900 text-white hover:bg-slate-700"
              }`}
            >
              {CTA.label}
              <ArrowIcon />
            </Link>
          </div>

          {/* Mobile toggle */}
          {/* ✅ CHANGE 9: Mobile toggle - `blue || !solid` */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${MOTION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 md:hidden ${
              blue || !solid
                ? "text-white hover:bg-white/10"
                : "text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </nav>

        {/* Mobile menu (animated height via grid rows) */}
        <div
          id="mobile-menu"
          aria-hidden={!open}
          className={`grid transition-[grid-template-rows] ${MOTION} md:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            {/* ✅ CHANGE 10: bg-white + rounded-b-2xl taaki blue par bhi dark links dikhein */}
            <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-b-2xl border-t border-slate-100 bg-white px-4 pb-5 pt-3">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => {
                  if (item.label === "Modules") {
                    return (
                      <li key={item.href}>
                        <ModulesAccordion
                          onNavigate={closeMenu}
                          menuOpen={open}
                        />
                      </li>
                    );
                  }
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        tabIndex={open ? 0 : -1}
                        aria-current={active ? "page" : undefined}
                        onClick={closeMenu}
                        className="block rounded-lg px-3 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-500"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <Link
                  href={SIGN_IN.href}
                  tabIndex={open ? 0 : -1}
                  onClick={closeMenu}
                  className="rounded-lg border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-800 transition-colors hover:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  {SIGN_IN.label}
                </Link>
                <Link
                  href={CTA.href}
                  tabIndex={open ? 0 : -1}
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  {CTA.label}
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data  (edit titles, descriptions and links to match your real modules)    */
/* -------------------------------------------------------------------------- */

type ModuleItem = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

const MODULES: ModuleItem[] = [
  {
    title: "Calculators",
    description:
      "Calculate atta pricing, conveying capacity, and power savings with precision tools",
    href: "/calculators",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
      </>
    ),
  },
  {
    title: "Grain Circle (Coming Soon)",
    description:
      "Connect with other millers, traders and suppliers to buy and sell grain.",
    href: "",
    icon: (
      <>
        <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
        <path d="M3.3 7.7L12 12.5l8.7-4.8M12 22V12.5" />
      </>
    ),
  },
];

const FOOTER = {
  text: "Not sure which module fits?",
  linkLabel: "Talk to our team",
  href: "/#contact",
};

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                              */
/* -------------------------------------------------------------------------- */

function Icon({
  children,
  className = "h-5 w-5",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Desktop dropdown                                                          */
/* -------------------------------------------------------------------------- */

type ModulesDropdownProps = {
  /** Pass the same classes you use for the other nav links (linkBase + linkTone). */
  triggerClassName: string;
  label?: string;
};

export function ModulesDropdown({
  triggerClassName,
  label = "Modules",
}: ModulesDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  const show = useCallback(() => {
    clearTimer();
    setOpen(true);
  }, []);

  // Small delay on leave so the pointer can travel from trigger to panel
  const hideSoon = useCallback(() => {
    clearTimer();
    timer.current = setTimeout(() => setOpen(false), 140);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => clearTimer, []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hideSoon}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 ${triggerClassName}`}
      >
        {label}
        <Chevron open={open} />
      </button>

      {/* pt-4 is an invisible hover bridge between trigger and card */}
      <div
        id={panelId}
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none ${
          open
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible translate-y-2 opacity-0"
        }`}
      >
        <div className="w-[min(41rem,calc(100vw-3rem))] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5">
          <ul className="grid gap-1 p-3 sm:grid-cols-2">
            {MODULES.map((m) => (
              <li key={m.title}>
                <Link
                  href={m.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="group flex items-start gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-500"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 transition-colors duration-200 group-hover:bg-sky-600 group-hover:text-white">
                    <Icon>{m.icon}</Icon>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-900">
                      {m.title}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-slate-500">
                      {m.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <p className="text-sm text-slate-600">{FOOTER.text}</p>
            <Link
              href={FOOTER.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-sky-700 transition-colors hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              {FOOTER.linkLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile accordion                                                          */
/* -------------------------------------------------------------------------- */

type ModulesAccordionProps = {
  /** Call this to close the mobile menu after a link is tapped. */
  onNavigate: () => void;
  /** Whether the mobile menu itself is open (used for tab order + reset). */
  menuOpen: boolean;
  label?: string;
};

export function ModulesAccordion({
  onNavigate,
  menuOpen,
  label = "Modules",
}: ModulesAccordionProps) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  // Collapse again whenever the whole mobile menu closes
  useEffect(() => {
    if (!menuOpen) setOpen(false);
  }, [menuOpen]);

  const focusable = menuOpen && open ? 0 : -1;

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-sky-500"
      >
        {label}
        <Chevron open={open} />
      </button>

      <div
        id={listId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="overflow-hidden">
          {MODULES.map((m) => (
            <li key={m.title}>
              <Link
                href={m.href}
                tabIndex={focusable}
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-lg py-2.5 pl-4 pr-3 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-500"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                  <Icon className="h-4 w-4">{m.icon}</Icon>
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {m.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
