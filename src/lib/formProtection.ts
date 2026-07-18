import type { NextRequest } from "next/server";

/** Honeypot field — bots that fill it are silently discarded. */
export const HONEYPOT_FIELD = "website";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

// In-memory only — resets per serverless isolate; first-line defense, not global.
const hits = new Map<string, number[]>();

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

/** Returns true if the request is allowed; false if rate-limited. */
export function checkRateLimit(routeKey: string, ip: string): boolean {
  const key = `${routeKey}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function isHoneypotTripped(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}
