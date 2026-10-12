import { getCountryCallingCode, type CountryCode } from "libphonenumber-js";

// Fixed list keeps server and browser output identical (no hydration warning).
// Add more countries here when needed; validation accepts any valid country.
const COUNTRIES: { code: CountryCode; name: string }[] = [
  { code: "IN", name: "India" },
  { code: "AE", name: "UAE" },
  { code: "NP", name: "Nepal" },
  { code: "BD", name: "Bangladesh" },
  { code: "LK", name: "Sri Lanka" },
  { code: "PK", name: "Pakistan" },
  { code: "BT", name: "Bhutan" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" },
  { code: "OM", name: "Oman" },
  { code: "BH", name: "Bahrain" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
];

export const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({
  ...c,
  dial: getCountryCallingCode(c.code),
}));
