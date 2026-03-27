// Click tracking — structured logs captured by Cloudflare Workers
// Upgrade path: swap console.log for KV or D1 writes when volume justifies it

export interface ClickEvent {
  slug: string;
  destination: string;
  referrer: string | null;
  userAgent: string | null;
  timestamp: string;
  ip: string | null;
}

export function logAffiliateClick(event: ClickEvent): void {
  console.log(
    JSON.stringify({
      type: "affiliate_click",
      ...event,
    })
  );
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
