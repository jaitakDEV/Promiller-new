import {
  buildAttaCostSnapshot,
  buildIssuedTo,
  loadIssuedTo,
} from "../src/features/reports/lib/snapshot";

function check(name: string, ok: boolean) {
  console.log(ok ? "ok    " : "FAIL  ", name);
  if (!ok) process.exitCode = 1;
}

const input = {
  inputs: {
    wheatPrice: 30,
    unloading: 0.2,
    millingCharges: 1.5,
    loadingOfAtta: 0.3,
    cleaningLossPct: 1,
    grindingLossPct: 1,
    processLossPct: 0.5,
    moistureGainPct: 2,
    branRefractionPct: 20,
    branSalePrice: 22,
    branPackingMaterial: 0.5,
    feedRefractionPct: 3,
    feedSalePrice: 12,
    wheatQty: 1000,
    boriQty: 10,
    boriPrice: 15,
    millMarginPct: 5,
  },
  packMaterials: { "5hdpe": 6, "5ld": 4, "10hdpe": 8, "10ld": 6, "50hdpe": 25 },
  packSettings: {
    inner: 0.1,
    outer: 1,
    gstPct: 5,
    distPct: 8,
    retPct: 10,
    selected: "5ld" as const,
  },
};

async function main() {
  // ---- calculation snapshot ----
  const snapshot = buildAttaCostSnapshot(input);
  console.log("headline:", snapshot.headline, "\n");

  check(
    "type and version",
    snapshot.calculatorType === "ATTA_PRICING" &&
      snapshot.calculatorVersion === "atta-cost@1.0.0",
  );
  check(
    "headline text",
    snapshot.headline === "Mill price ₹37.32/kg · 5 kg LD Pouch MRP ₹243.61",
  );
  check(
    "stored inputs equal the validated input",
    JSON.stringify(snapshot.inputs) === JSON.stringify(input),
  );

  const results = snapshot.results as {
    costing: { millSalePricePerKg: number };
    packRows: { key: string }[];
    recommendedKey: string;
  };
  check(
    "results hold costing, 5 pack rows and the selected key",
    results.costing.millSalePricePerKg === 37.32 &&
      results.packRows.length === 5 &&
      results.recommendedKey === "5ld",
  );
  check(
    "same input gives the same snapshot",
    JSON.stringify(buildAttaCostSnapshot(structuredClone(input))) ===
      JSON.stringify(snapshot),
  );

  // ---- issuedTo ----
  const issued = buildIssuedTo(
    { name: "  Ramesh Kumar  " },
    {
      companyName: " Demo Mills ",
      city: "Jaipur",
      state: "Rajasthan",
      gstin: "27aapfu0939f1zv",
    },
  );
  check(
    "values are trimmed",
    issued.name === "Ramesh Kumar" && issued.companyName === "Demo Mills",
  );
  check("gstin is upper case", issued.gstin === "27AAPFU0939F1ZV");
  check(
    "only the 5 expected fields (no phone, no email)",
    JSON.stringify(Object.keys(issued)) ===
      JSON.stringify(["name", "companyName", "city", "state", "gstin"]),
  );

  const noCompany = buildIssuedTo({ name: null }, null);
  check(
    "no company, no name: everything is null",
    Object.values(noCompany).every((v) => v === null),
  );
  const blanks = buildIssuedTo(
    { name: "A" },
    { companyName: "  ", city: "", state: null, gstin: " " },
  );
  check(
    "blank text becomes null",
    blanks.companyName === null &&
      blanks.city === null &&
      blanks.gstin === null,
  );

  // ---- later edits do not change an issued snapshot ----
  const company = {
    companyName: "Old Name",
    city: "Jaipur",
    state: "Rajasthan",
    gstin: null as string | null,
  };
  const frozen = buildIssuedTo({ name: "Ramesh" }, company);
  company.companyName = "New Name";
  company.city = "Delhi";
  check(
    "changing the profile afterwards does not change the snapshot",
    frozen.companyName === "Old Name" && frozen.city === "Jaipur",
  );

  // ---- loadIssuedTo with a fake database client ----
  const fake = (user: { name: string | null } | null) =>
    ({
      user: { findUnique: async () => user },
      companyProfile: {
        findUnique: async () => ({
          companyName: "Demo Mills",
          city: "Jaipur",
          state: "Rajasthan",
          gstin: null,
        }),
      },
    }) as never;
  const loaded = await loadIssuedTo(fake({ name: "Ramesh" }), "user-1");
  check(
    "loadIssuedTo combines user and company",
    loaded.name === "Ramesh" && loaded.companyName === "Demo Mills",
  );
  let threw = false;
  try {
    await loadIssuedTo(fake(null), "missing");
  } catch {
    threw = true;
  }
  check("loadIssuedTo fails for an unknown user", threw);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
