import { loadEnvConfig } from "@next/env";

function check(name: string, ok: boolean) {
  console.log(ok ? "ok    " : "FAIL  ", name);
  if (!ok) process.exitCode = 1;
}

function throws(fn: () => unknown): boolean {
  try {
    fn();
    return false;
  } catch {
    return true;
  }
}

async function main() {
  // Loads .env and .env.local like Next.js does, before the env module is read.
  loadEnvConfig(process.cwd());
  const {
    canonicalJson,
    signReport,
    signatureFingerprint,
    toSignedContent,
    verifyReportSignature,
  } = await import("../src/server/report-signature");

  type Content = ReturnType<typeof toSignedContent>;

  const base: Content = {
    reportNo: "ATC-2026-000123",
    calculatorType: "ATTA_PRICING",
    calculatorVersion: "atta-cost@1.0.0",
    inputs: {
      inputs: { wheatPrice: 30, unloading: 0.2 },
      packSettings: { selected: "5ld" },
    },
    results: {
      costing: { millSalePricePerKg: 37.32 },
      packRows: [{ key: "5ld", marketPrice: 243.61 }],
    },
    issuedTo: {
      name: "Test User",
      companyName: "Demo Mills",
      city: "Jaipur",
      state: "Rajasthan",
      gstin: null,
    },
    issuedAt: "2026-10-06T08:30:00.000Z",
  };

  const { signature, signatureVersion } = signReport(base);
  const verify = (c: Content, s = signature, v = signatureVersion) =>
    verifyReportSignature(c, s, v);

  console.log("fingerprint:", signatureFingerprint(signature), "\n");

  check("signature is 64 hex characters", /^[0-9a-f]{64}$/.test(signature));
  check(
    "same content, same signature",
    signReport(structuredClone(base)).signature === signature,
  );
  check("untouched report verifies", verify(base));
  check(
    "key order does not matter",
    verify({
      issuedAt: base.issuedAt,
      issuedTo: base.issuedTo,
      results: base.results,
      inputs: base.inputs,
      calculatorVersion: base.calculatorVersion,
      calculatorType: base.calculatorType,
      reportNo: base.reportNo,
    }),
  );
  check(
    "createdAt becomes the signed issue time",
    toSignedContent({
      ...base,
      createdAt: new Date("2026-10-06T08:30:00.000Z"),
    }).issuedAt === base.issuedAt,
  );

  const text = JSON.stringify(base);
  const tampered: Array<[string, Content]> = [
    ["a result number", JSON.parse(text.replace("243.61", "243.60"))],
    [
      "an input number",
      JSON.parse(text.replace('"wheatPrice":30', '"wheatPrice":31')),
    ],
    ["the company name", JSON.parse(text.replace("Demo Mills", "Other Mills"))],
    ["the report number", { ...base, reportNo: "ATC-2026-000124" }],
    ["the issue time", { ...base, issuedAt: "2026-10-06T08:30:00.001Z" }],
    [
      "the calculator version",
      { ...base, calculatorVersion: "atta-cost@1.0.1" },
    ],
  ];
  for (const [name, content] of tampered) {
    check(`tampering with ${name} is detected`, !verify(content));
  }

  const flipped = (signature[0] === "a" ? "b" : "a") + signature.slice(1);
  check("altered signature is rejected", !verify(base, flipped));
  check("short signature is rejected", !verify(base, signature.slice(0, 63)));
  check("non-hex signature is rejected", !verify(base, "z".repeat(64)));
  check("unknown signature version is rejected", !verify(base, signature, 99));
  check(
    "fingerprint format",
    /^[0-9A-F]{4}(-[0-9A-F]{4}){3}$/.test(signatureFingerprint(signature)),
  );

  check(
    "canonicalJson sorts keys",
    canonicalJson({ b: 1, a: { d: 2, c: 3 } }) === '{"a":{"c":3,"d":2},"b":1}',
  );
  check(
    "canonicalJson skips undefined fields",
    canonicalJson({ a: 1, b: undefined }) === canonicalJson({ a: 1 }),
  );
  check(
    "canonicalJson rejects NaN",
    throws(() => canonicalJson({ a: Number.NaN })),
  );
  check(
    "canonicalJson rejects Date objects",
    throws(() => canonicalJson({ a: new Date() })),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
