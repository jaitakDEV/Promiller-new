import { roundMoney, roundPercent } from "../src/lib/money";

const cases: Array<[string, number, number]> = [
  ["1.005", roundMoney(1.005), 1.01],
  ["2.675", roundMoney(2.675), 2.68],
  ["0.1 + 0.2", roundMoney(0.1 + 0.2), 0.3],
  ["-1.005", roundMoney(-1.005), -1.01],
  ["1e-7", roundMoney(1e-7), 0],
  ["-0.001", roundMoney(-0.001), 0],
  ["NaN", roundMoney(Number.NaN), 0],
  ["95.505 pct", roundPercent(95.505), 95.51],
];

for (const [name, got, want] of cases) {
  console.log(
    name.padEnd(12),
    String(got).padEnd(8),
    got === want ? "ok" : `WRONG (want ${want})`,
  );
}
