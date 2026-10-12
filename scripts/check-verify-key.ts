import {
  VERIFY_KEY_LENGTH,
  formatVerifyKey,
  generateVerifyKey,
  isVerifyKeyFormat,
  normalizeVerifyKey,
  verifyKeyMatches,
} from "../src/server/verify-key";

function check(name: string, ok: boolean) {
  console.log(ok ? "ok    " : "FAIL  ", name);
  if (!ok) process.exitCode = 1;
}

const COUNT = 10_000;
const keys = Array.from({ length: COUNT }, () => generateVerifyKey());

console.log(
  "sample keys:",
  keys.slice(0, 3).map(formatVerifyKey).join("  "),
  "\n",
);

check(
  `every key has ${VERIFY_KEY_LENGTH} characters`,
  keys.every((k) => k.length === VERIFY_KEY_LENGTH),
);
check("every key passes the format check", keys.every(isVerifyKeyFormat));
check(
  "no ambiguous characters (0 1 I L O)",
  keys.every((k) => !/[01ILO]/.test(k)),
);
check(`${COUNT} keys are all different`, new Set(keys).size === COUNT);

// Every symbol should appear about equally often (expected ~3871 each).
const counts = new Map<string, number>();
for (const key of keys)
  for (const ch of key) counts.set(ch, (counts.get(ch) ?? 0) + 1);
const expected = (COUNT * VERIFY_KEY_LENGTH) / 31;
const values = [...counts.values()];
check("all 31 symbols are used", counts.size === 31);
check(
  `symbols are evenly spread (min ${Math.min(...values)}, max ${Math.max(...values)}, expected ~${Math.round(expected)})`,
  values.every((v) => Math.abs(v - expected) < expected * 0.1),
);

const key = keys[0];
check("same key matches", verifyKeyMatches(key, key));
check(
  "lower case with dashes matches",
  verifyKeyMatches(key, formatVerifyKey(key).toLowerCase()),
);
check(
  "spaces are ignored",
  verifyKeyMatches(key, key.slice(0, 6) + " " + key.slice(6)),
);
check("a different key does not match", !verifyKeyMatches(key, keys[1]));
check(
  "one wrong character does not match",
  !verifyKeyMatches(key, key.slice(0, 11) + (key[11] === "2" ? "3" : "2")),
);
check("too short does not match", !verifyKeyMatches(key, key.slice(0, 11)));
check("too long does not match", !verifyKeyMatches(key, key + "2"));
check(
  "characters outside the alphabet do not match",
  !verifyKeyMatches(key, "0".repeat(12)),
);
check("empty input does not match", !verifyKeyMatches(key, ""));
check(
  "normalize strips dashes and spaces",
  normalizeVerifyKey("ab-cd ef") === "ABCDEF",
);
check(
  "format groups by four",
  formatVerifyKey("ABCDEFGHJKMN") === "ABCD-EFGH-JKMN",
);
