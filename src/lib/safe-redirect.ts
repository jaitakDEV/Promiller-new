export const DEFAULT_REDIRECT = "/dashboard";
export const ALLOWED_REDIRECT_PREFIXES: readonly string[] = [
  "/calculators",
  "/dashboard",
  "/admin",
];

const MAX_LENGTH = 512;
// eslint-disable-next-line no-control-regex
const FORBIDDEN = /[\u0000-\u001f\u007f\\]/;
const BASE = "http://callback.invalid";

function hasAllowedPrefix(
  pathname: string,
  prefixes: readonly string[],
): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * Returns a safe same-origin path for post-login redirects, or the fallback.
 * Accepts only relative paths under an allow-listed prefix.
 */
export function safeCallbackUrl(
  input: string | null | undefined,
  fallback: string = DEFAULT_REDIRECT,
  prefixes: readonly string[] = ALLOWED_REDIRECT_PREFIXES,
): string {
  if (typeof input !== "string") return fallback;
  const value = input.trim();
  if (value.length === 0 || value.length > MAX_LENGTH) return fallback;
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  if (FORBIDDEN.test(value)) return fallback;

  let decoded: string;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return fallback;
  }
  if (decoded.startsWith("//") || FORBIDDEN.test(decoded)) return fallback;

  let url: URL;
  try {
    url = new URL(value, BASE);
  } catch {
    return fallback;
  }
  if (url.origin !== BASE) return fallback;
  if (!hasAllowedPrefix(url.pathname, prefixes)) return fallback;

  return `${url.pathname}${url.search}${url.hash}`;
}
