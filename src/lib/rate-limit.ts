import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";
import { env } from "@/env";

/** All limits live here. Change a number once and it applies everywhere. */
export const RATE_LIMITS = {
  login: { limit: 5, windowSec: 15 * 60 }, // key: IP
  register: { limit: 10, windowSec: 60 * 60 }, // key: IP
  passwordReset: { limit: 3, windowSec: 60 * 60 }, // key: email
  resendVerification: { limit: 3, windowSec: 60 * 60 }, // key: email
  reportCreate: { limit: 20, windowSec: 60 * 60 }, // key: user id
  reportDownload: { limit: 60, windowSec: 60 * 60 }, // key: user id
  verifyLookup: { limit: 30, windowSec: 60 }, // key: IP
  passwordChange: { limit: 5, windowSec: 15 * 60 }, // key: user id
  accountDelete: { limit: 5, windowSec: 15 * 60 }, // key: user id
} as const;

export type RateLimitName = keyof typeof RATE_LIMITS;

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  /** Epoch ms when the oldest hit leaves the window. */
  resetAt: number;
  retryAfterSeconds: number;
}

type Raw = Omit<RateLimitResult, "retryAfterSeconds">;

// ---- Upstash (shared across serverless instances) ----
const redis =
  env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

if (!redis && process.env.NODE_ENV === "production") {
  console.warn(
    "[rate-limit] UPSTASH_REDIS_* not set: using in-memory limits, which are not shared between serverless instances.",
  );
}

const limiters = new Map<RateLimitName, Ratelimit>();

function getUpstashLimiter(name: RateLimitName): Ratelimit | null {
  if (!redis) return null;
  let limiter = limiters.get(name);
  if (!limiter) {
    const { limit, windowSec } = RATE_LIMITS[name];
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
      prefix: `rl:${name}`,
    });
    limiters.set(name, limiter);
  }
  return limiter;
}

// ---- In-memory fallback (development) ----
const memory = new Map<string, number[]>();
const MAX_WINDOW_MS =
  Math.max(...Object.values(RATE_LIMITS).map((c) => c.windowSec)) * 1000;

function memoryLimit(name: RateLimitName, key: string): Raw {
  const { limit, windowSec } = RATE_LIMITS[name];
  const windowMs = windowSec * 1000;
  const now = Date.now();
  const id = `${name}:${key}`;
  const hits = (memory.get(id) ?? []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    memory.set(id, hits);
    return { success: false, limit, remaining: 0, resetAt: hits[0] + windowMs };
  }

  hits.push(now);
  memory.set(id, hits);

  if (memory.size > 5000) {
    for (const [k, v] of memory) {
      if (v.length === 0 || now - v[v.length - 1] > MAX_WINDOW_MS)
        memory.delete(k);
    }
  }
  return {
    success: true,
    limit,
    remaining: limit - hits.length,
    resetAt: hits[0] + windowMs,
  };
}

/**
 * Check and count one hit for `name` + `key`.
 * Keys: use IP for anonymous routes, user id for signed-in actions,
 * lower-cased email for email-based limits.
 */
export async function rateLimit(
  name: RateLimitName,
  key: string,
): Promise<RateLimitResult> {
  const cfg = RATE_LIMITS[name];
  const cleanKey = key.trim().toLowerCase();
  const limiter = getUpstashLimiter(name);

  let raw: Raw;
  if (limiter) {
    try {
      const r = await limiter.limit(cleanKey);
      raw = {
        success: r.success,
        limit: r.limit,
        remaining: r.remaining,
        resetAt: r.reset,
      };
    } catch (error) {
      // Store outage must not take the whole site down: allow and log.
      console.error(
        "[rate-limit] store error, allowing request:",
        name,
        error instanceof Error ? error.name : "UnknownError",
      );
      return {
        success: true,
        limit: cfg.limit,
        remaining: cfg.limit,
        resetAt: Date.now() + cfg.windowSec * 1000,
        retryAfterSeconds: 0,
      };
    }
  } else {
    raw = memoryLimit(name, cleanKey);
  }

  return {
    ...raw,
    retryAfterSeconds: raw.success
      ? 0
      : Math.max(1, Math.ceil((raw.resetAt - Date.now()) / 1000)),
  };
}

/** Client IP for server actions and route handlers. */
export async function getRequestIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

export function rateLimitMessage(result: RateLimitResult): string {
  const s = result.retryAfterSeconds;
  if (s < 60) return `Too many attempts. Try again in ${s} seconds.`;
  const m = Math.ceil(s / 60);
  return `Too many attempts. Try again in ${m} minute${m === 1 ? "" : "s"}.`;
}
