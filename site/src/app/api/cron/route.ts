import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron-auth";

// Main cron dispatcher
// Cloudflare Workers cron trigger calls this endpoint via moonsmoke-cron-scheduler
// It dispatches to each sub-cron in parallel
export async function POST(request: Request) {
  const authError = verifyCronAuth(request);
  if (authError) return authError;

  const baseUrl = new URL(request.url).origin;
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }

  const headers = { Authorization: `Bearer ${cronSecret}` };

  const endpoints = ["check-links", "stale-queue"];

  const results = await Promise.allSettled(
    endpoints.map((ep) =>
      fetch(`${baseUrl}/api/cron/${ep}`, {
        method: "POST",
        headers,
      }).then(async (r) => ({ endpoint: ep, status: r.status, body: await r.json() }))
    )
  );

  const summary = results.map((result, i) => {
    if (result.status === "fulfilled") {
      return {
        endpoint: endpoints[i],
        status: result.value.status,
        success: result.value.status === 200,
      };
    }
    return {
      endpoint: endpoints[i],
      status: 500,
      success: false,
      error: result.reason?.message || "Unknown error",
    };
  });

  console.log(
    JSON.stringify({ type: "cron_dispatch_complete", summary })
  );

  return NextResponse.json({
    dispatched: summary,
    completedAt: new Date().toISOString(),
  });
}
