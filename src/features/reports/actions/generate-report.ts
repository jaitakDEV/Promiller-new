"use server";

import { Prisma } from "@prisma/client";
import { z } from "zod";
import { db } from "@/server/db";
import { apiError, apiSuccess } from "@/lib/utils";
import { rateLimit, rateLimitMessage } from "@/lib/rate-limit";
import { getUserAccess } from "@/server/guards";
import { generateVerifyKey } from "@/server/verify-key";
import { signReport, toSignedContent } from "@/server/report-signature";
import { getCalculator, isLive } from "@/config/calculators";
import { attaCostInputSchema } from "@/features/calculators/atta-cost/lib/schema";
import { allocateReportNumber } from "@/features/reports/lib/report-number";
import {
  buildAttaCostSnapshot,
  loadIssuedTo,
  toJsonObject,
} from "@/features/reports/lib/snapshot";
import {
  REPORT_NOTE_MAX,
  REPORT_TITLE_MAX,
  cleanNote,
  cleanTitle,
  defaultReportTitle,
} from "@/features/reports/lib/report-text";

// strictObject: any field we do not expect (for example results calculated by
// the browser) is rejected. Results are always recomputed here on the server.
const requestSchema = z.strictObject({
  calculator: z.literal("atta-cost"),
  input: attaCostInputSchema,
  locale: z.enum(["en", "hi"]),
  title: z
    .string()
    .max(
      REPORT_TITLE_MAX,
      `Report name must be ${REPORT_TITLE_MAX} characters or fewer`,
    )
    .optional(),
  note: z
    .string()
    .max(REPORT_NOTE_MAX, `Note must be ${REPORT_NOTE_MAX} characters or fewer`)
    .optional(),
  idempotencyKey: z
    .string()
    .regex(/^[A-Za-z0-9_-]{16,64}$/, "Invalid request key"),
});

async function findExisting(userId: string, idempotencyKey: string) {
  return db.calculationReport.findUnique({
    where: { userId_idempotencyKey: { userId, idempotencyKey } },
    select: { id: true, reportNo: true, deletedAt: true },
  });
}

/**
 * Issues a report: validate, recompute on the server, number it, sign it and
 * store it, all in one transaction. Repeating the same idempotencyKey returns
 * the report that already exists instead of creating a second one.
 */
export async function generateReportAction(data: unknown) {
  // 1. Who is asking (checked against the database)
  const access = await getUserAccess();
  if (!access.ok) return apiError(access.error);
  const userId = access.user.id;

  // 2. Validate the request
  const parsed = requestSchema.safeParse(data);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const where = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    return apiError(`${where}${issue.message}`);
  }
  const { input, locale, idempotencyKey } = parsed.data;

  const calculator = getCalculator(parsed.data.calculator);
  if (!calculator || !isLive(calculator)) {
    return apiError("This calculator is not available yet.");
  }

  // 3. Same request again: return the existing report (not counted by the rate limit)
  const existing = await findExisting(userId, idempotencyKey);
  if (existing) {
    if (existing.deletedAt) {
      return apiError(
        "This report was deleted. Change an input to create a new one.",
      );
    }
    return apiSuccess({
      id: existing.id,
      reportNo: existing.reportNo,
      created: false,
    });
  }

  // 4. Rate limit: 20 new reports per hour
  const limit = await rateLimit("reportCreate", userId);
  if (!limit.success) return apiError(rateLimitMessage(limit));

  // 5. Everything that does not need the database lock
  const issuedAt = new Date();
  const issuedTo = await loadIssuedTo(db, userId);
  const snapshot = buildAttaCostSnapshot(input);
  const title =
    cleanTitle(parsed.data.title) ??
    defaultReportTitle(calculator.name.en, issuedAt);
  const note = cleanNote(parsed.data.note);
  const verifyKey = generateVerifyKey();

  // 6. One transaction: number, signature and insert succeed or fail together
  try {
    const report = await db.$transaction(
      async (tx) => {
        // Last step before the insert, so the counter row is locked for as short as possible.
        const reportNo = await allocateReportNumber(
          tx,
          calculator.reportPrefix,
          issuedAt,
        );

        const { signature, signatureVersion } = signReport(
          toSignedContent({
            reportNo,
            calculatorType: snapshot.calculatorType,
            calculatorVersion: snapshot.calculatorVersion,
            inputs: snapshot.inputs,
            results: snapshot.results,
            issuedTo,
            createdAt: issuedAt,
          }),
        );

        return tx.calculationReport.create({
          data: {
            reportNo,
            userId,
            calculatorType: snapshot.calculatorType,
            calculatorVersion: snapshot.calculatorVersion,
            title,
            note,
            inputs: snapshot.inputs,
            results: snapshot.results,
            headline: snapshot.headline,
            issuedTo: toJsonObject(issuedTo),
            locale,
            verifyKey,
            signature,
            signatureVersion,
            idempotencyKey,
            // The exact time that was signed (the database must not pick its own).
            createdAt: issuedAt,
          },
          select: { id: true, reportNo: true },
        });
      },
      { maxWait: 5_000, timeout: 10_000 },
    );

    return apiSuccess({
      id: report.id,
      reportNo: report.reportNo,
      created: true,
    });
  } catch (error) {
    // Two clicks at the same moment: the second one hits the unique key.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const again = await findExisting(userId, idempotencyKey);
      if (again && !again.deletedAt) {
        return apiSuccess({
          id: again.id,
          reportNo: again.reportNo,
          created: false,
        });
      }
    }
    // Log only the error type: messages can echo report content.
    console.error(
      "[GENERATE_REPORT]",
      error instanceof Error ? error.name : "UnknownError",
    );
    return apiError("Could not save the report. Please try again.");
  }
}
