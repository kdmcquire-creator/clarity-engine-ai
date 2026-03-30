import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface ClickEvent {
  slug: string;
  destination: string;
  referrer: string | null;
  userAgent: string | null;
  timestamp: string;
  ip: string | null;
}

// Minimal KV type — subset of @cloudflare/workers-types KVNamespace
interface KVNamespace {
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

interface WorkerEnv {
  AFFILIATE_CLICKS: KVNamespace;
}

export function logAffiliateClick(event: ClickEvent): void {
  console.log(JSON.stringify({ type: "affiliate_click", site: "ce", ...event }));
}

export async function persistAffiliateClick(event: ClickEvent): Promise<void> {
  try {
    const env = getCloudflareContext().env as unknown as WorkerEnv;
    const date = event.timestamp.slice(0, 10);
    const key = `ce:${date}:${event.slug}:${Date.now()}`;
    await env.AFFILIATE_CLICKS.put(key, JSON.stringify(event), {
      expirationTtl: 7776000, // 90 days
    });
  } catch {
    // KV unavailable in local dev — already logged via console
  }
}

// Client-side GA4 / GTM helper
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

export function trackAffiliateClick(toolSlug: string, source: string): void {
  trackEvent("affiliate_click", { tool_slug: toolSlug, source });
}
