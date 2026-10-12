import {
  parsePhoneNumberFromString,
  type CountryCode,
  type PhoneNumber,
} from "libphonenumber-js";

export const DEFAULT_COUNTRY: CountryCode = "IN";

const INDIA_CALLING_CODE = "91";
const INDIA_MOBILE = /^[6-9]\d{9}$/;
const MAX_INPUT_LENGTH = 32;

function parse(input: string, country: CountryCode): PhoneNumber | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_INPUT_LENGTH) return null;

  const parsed = parsePhoneNumberFromString(trimmed, country);
  if (!parsed || !parsed.isValid()) return null;

  // V1 rule: Indian numbers must be 10-digit mobiles starting 6-9.
  if (
    parsed.countryCallingCode === INDIA_CALLING_CODE &&
    !INDIA_MOBILE.test(parsed.nationalNumber)
  ) {
    return null;
  }
  return parsed;
}

/** Returns the E.164 form (for example +919876543210) or null when invalid. */
export function normalizePhone(
  input: string,
  country: CountryCode = DEFAULT_COUNTRY,
): string | null {
  return parse(input, country)?.number ?? null;
}

export function isValidPhone(
  input: string,
  country: CountryCode = DEFAULT_COUNTRY,
): boolean {
  return parse(input, country) !== null;
}

/** International display format for the owner, e.g. +91 98765 43210. */
export function formatPhone(e164: string): string {
  const parsed = parsePhoneNumberFromString(e164);
  return parsed ? parsed.formatInternational() : e164;
}

/**
 * Masked display for admin lists, emails and notifications.
 * +919876543210 -> +91 98•••••210
 */
export function maskPhone(e164: string | null | undefined): string {
  if (!e164) return "";
  const parsed = parsePhoneNumberFromString(e164);
  if (!parsed) return "••••••••";
  const national = parsed.nationalNumber;
  if (national.length <= 5) {
    return `+${parsed.countryCallingCode} ${"•".repeat(national.length)}`;
  }
  const hidden = "•".repeat(national.length - 5);
  return `+${parsed.countryCallingCode} ${national.slice(0, 2)}${hidden}${national.slice(-3)}`;
}

/** Splits an E.164 number into country + national digits, for form defaults. */
export function splitPhone(
  e164: string | null | undefined,
): { country: CountryCode; national: string } | null {
  if (!e164) return null;
  const parsed = parsePhoneNumberFromString(e164);
  if (!parsed) return null;
  return {
    country: parsed.country ?? DEFAULT_COUNTRY,
    national: parsed.nationalNumber,
  };
}
