import { randomBytes, timingSafeEqual } from "node:crypto";

export const VERIFY_KEY_LENGTH = 12;

// 31 symbols: no 0, 1, I, L or O, so a printed code cannot be misread.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

// Bytes at or above this limit are skipped so every symbol is equally likely.
// (256 is not a multiple of 31; a plain "% 31" would favour the first symbols.)
const BYTE_LIMIT = 256 - (256 % ALPHABET.length);

const KEY_PATTERN = new RegExp(`^[${ALPHABET}]{${VERIFY_KEY_LENGTH}}$`);

/** A new random verification code, e.g. "K7M2QXW9PBTD" (about 59.5 bits). */
export function generateVerifyKey(): string {
  let key = "";
  while (key.length < VERIFY_KEY_LENGTH) {
    for (const byte of randomBytes(VERIFY_KEY_LENGTH * 2)) {
      if (byte >= BYTE_LIMIT) continue;
      key += ALPHABET[byte % ALPHABET.length];
      if (key.length === VERIFY_KEY_LENGTH) break;
    }
  }
  return key;
}

export function isVerifyKeyFormat(value: string): boolean {
  return KEY_PATTERN.test(value);
}

/** Accepts what a person types: any case, with spaces or dashes. */
export function normalizeVerifyKey(input: string): string {
  return input.toUpperCase().replace(/[\s-]/g, "");
}

/** Printed form: K7M2-QXW9-PBTD */
export function formatVerifyKey(key: string): string {
  return key.match(/.{1,4}/g)?.join("-") ?? key;
}

/** Constant-time comparison of the stored code with what was provided. */
export function verifyKeyMatches(stored: string, provided: string): boolean {
  const given = normalizeVerifyKey(provided);
  if (!isVerifyKeyFormat(given) || !isVerifyKeyFormat(stored)) return false;

  const a = Buffer.from(stored, "utf8");
  const b = Buffer.from(given, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
