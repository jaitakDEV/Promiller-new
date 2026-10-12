import { PrismaClient } from "@prisma/client";
import {
  allocateReportNumber,
  formatReportNumber,
  parseReportNumber,
  type ReportPrefix,
} from "../src/features/reports/lib/report-number";
import { getIstYear } from "../src/lib/datetime";

const db = new PrismaClient();
// Not in the registry, so the real ATC/CVC/PSC counters stay untouched.
const TEST_PREFIX = "TST" as unknown as ReportPrefix;

function check(name: string, ok: boolean) {
  console.log(ok ? "ok    " : "FAIL  ", name);
  if (!ok) process.exitCode = 1;
}

async function main() {
  // 1. Formatting and parsing
  check(
    "format ATC-2026-000123",
    formatReportNumber("ATC", 2026, 123) === "ATC-2026-000123",
  );
  const parsed = parseReportNumber("atc-2026-000123");
  check(
    "parse (any case)",
    parsed?.prefix === "ATC" && parsed.year === 2026 && parsed.sequence === 123,
  );
  check(
    "parse rejects junk",
    parseReportNumber("XYZ-2026-000123") === null &&
      parseReportNumber("ATC-26-1") === null,
  );
  check(
    "IST year boundary",
    getIstYear(new Date("2025-12-31T19:00:00Z")) === 2026,
  );

  // 2. Concurrent allocation; every 4th transaction fails after allocating
  const issuedAt = new Date();
  const TOTAL = 12;
  const outcomes = await Promise.all(
    Array.from({ length: TOTAL }, (_, i) =>
      db
        .$transaction(
          async (tx) => {
            const number = await allocateReportNumber(
              tx,
              TEST_PREFIX,
              issuedAt,
            );
            if (i % 4 === 3)
              throw new Error("simulated failure after allocation");
            return number;
          },
          { maxWait: 30_000, timeout: 30_000 },
        )
        .then(
          (number) => ({ ok: true as const, number }),
          () => ({ ok: false as const }),
        ),
    ),
  );

  const numbers = outcomes.flatMap((o) => (o.ok ? [o.number] : []));
  const failed = outcomes.length - numbers.length;
  const sequences = numbers
    .map((n) => Number(n.split("-")[2]))
    .sort((a, b) => a - b);

  console.log(`\ncommitted: ${numbers.length}, rolled back: ${failed}`);
  console.log("numbers  :", [...numbers].sort().join(", "));

  check("no duplicate numbers", new Set(numbers).size === numbers.length);
  check(
    "no gaps (1..N)",
    sequences.every((s, i) => s === i + 1),
  );

  const counter = await db.reportCounter.findUnique({
    where: { prefix_year: { prefix: "TST", year: getIstYear(issuedAt) } },
  });
  check(
    "counter equals committed count (rollbacks left no gap)",
    counter?.lastValue === numbers.length,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.reportCounter.deleteMany({ where: { prefix: "TST" } });
    await db.$disconnect();
  });
