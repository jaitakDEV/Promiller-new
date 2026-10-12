import { loadEnvConfig } from "@next/env";
import { PrismaClient } from "@prisma/client";

async function main() {
  loadEnvConfig(process.cwd());
  const { signatureFingerprint, toSignedContent, verifyReportSignature } =
    await import("../src/server/report-signature");

  const db = new PrismaClient();
  const reports = await db.calculationReport.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  console.log(`checking ${reports.length} latest report(s)\n`);

  for (const r of reports) {
    const ok = verifyReportSignature(
      toSignedContent(r),
      r.signature,
      r.signatureVersion,
    );
    console.log(
      r.reportNo,
      ok ? "signature ok" : "SIGNATURE MISMATCH",
      signatureFingerprint(r.signature),
      `code length ${r.verifyKey.length}`,
    );
    if (!ok) process.exitCode = 1;
  }
  await db.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
