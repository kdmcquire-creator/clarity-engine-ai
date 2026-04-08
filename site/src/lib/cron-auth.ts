import { NextResponse } from "next/server";

/**
 * Constant-time string comparison to prevent timing attacks.
 * Returns true if strings are equal, false otherwise.
 */
function safeCompare(a: string | undefined | null, b: string): boolean {
  if (!a) return false;
  if (a.length !== b.length) return false;

  // XOR-based constant-time comparison
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Verify that a cron request is authorized.
 * Checks for CRON_SECRET in the Authorization header (Bearer token).
 * Returns null if authorized, or an error response if not.
 */
export function verifyCronAuth(request: Request): NextResponse | null {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("[cron-auth] CRON_SECRET not configured");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!safeCompare(token, cronSecret)) {
    console.warn("[cron-auth] Unauthorized cron request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

/**
 * Verify admin API key from x-api-key header.
 * Returns null if authorized, or an error response if not.
 */
export function verifyAdminAuth(request: Request): NextResponse | null {
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    console.error("[admin-auth] ADMIN_API_KEY not configured");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const providedKey = request.headers.get("x-api-key");

  if (!safeCompare(providedKey, adminKey)) {
    console.warn("[admin-auth] Unauthorized admin request");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
