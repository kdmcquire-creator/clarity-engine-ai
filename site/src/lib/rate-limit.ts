import { NextResponse } from "next/server";

// Simple in-memory rate limiter
// In production on Cloudflare Workers, consider using Durable Objects or KV
const requestCounts = new Map<string, { count: number; resetAt: number }>();

const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  requestCounts.forEach((value, key) => {
    if (value.resetAt < now) {
      requestCounts.delete(key);
    }
  });
}

/**
 * Rate limit by IP address.
 * Returns null if allowed, or an error response if rate limited.
 */
export function rateLimit(
  request: Request,
  {
    maxRequests = 10,
    windowMs = 60_000,
  }: { maxRequests?: number; windowMs?: number } = {}
): NextResponse | null {
  cleanup();

  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    "unknown";

  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || entry.resetAt < now) {
    requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return null;
  }

  entry.count++;

  if (entry.count > maxRequests) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((entry.resetAt - now) / 1000)),
        },
      }
    );
  }

  return null;
}
