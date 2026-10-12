import { createHmac } from "node:crypto";
import { cache } from "react";
import { headers } from "next/headers";
import type { ConsentDocument } from "@prisma/client";
import { env } from "@/env";
import { db } from "@/server/db";
import { LEGAL_DOCUMENTS, LEGAL_VERSIONS } from "@/config/legal";
import { getRequestIp } from "@/lib/rate-limit";

export type ConsentEvidence = {
  ipHash: string | null;
  userAgent: string | null;
};

/** HMAC of the client IP. The raw IP is never stored. */
export function hashIp(ip: string): string | null {
  if (!ip || ip === "unknown") return null;
  return createHmac("sha256", env.CONSENT_HASH_SALT).update(ip).digest("hex");
}

/** Evidence taken from the current request (hashed IP + shortened user agent). */
export async function getConsentEvidence(): Promise<ConsentEvidence> {
  const ip = await getRequestIp();
  const userAgent = (await headers()).get("user-agent");
  return {
    ipHash: hashIp(ip),
    userAgent: userAgent ? userAgent.slice(0, 200) : null,
  };
}

/** One row per legal document, at its current version (for Prisma create). */
export function currentConsentRows(evidence: ConsentEvidence): {
  document: ConsentDocument;
  version: string;
  ipHash: string | null;
  userAgent: string | null;
}[] {
  return LEGAL_DOCUMENTS.map((d) => ({
    document: d.document,
    version: LEGAL_VERSIONS[d.document],
    ipHash: evidence.ipHash,
    userAgent: evidence.userAgent,
  }));
}

/**
 * Documents the user has NOT yet accepted at their current version.
 * Empty array means the user is up to date. Cached per request.
 */
export const getPendingConsents = cache(
  async (userId: string): Promise<ConsentDocument[]> => {
    const accepted = await db.consentRecord.findMany({
      where: {
        userId,
        OR: LEGAL_DOCUMENTS.map((d) => ({
          document: d.document,
          version: LEGAL_VERSIONS[d.document],
        })),
      },
      select: { document: true },
    });
    const done = new Set(accepted.map((r) => r.document));
    return LEGAL_DOCUMENTS.filter((d) => !done.has(d.document)).map(
      (d) => d.document,
    );
  },
);
