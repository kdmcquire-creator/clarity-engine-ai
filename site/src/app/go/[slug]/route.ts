import { NextResponse, after } from "next/server";
import { tools } from "@/lib/tools";
import { logAffiliateClick, persistAffiliateClick } from "@/lib/analytics";

// Static affiliate links not tied to a specific tool page
const staticLinks: Record<string, string> = {
  semrush: "https://www.semrush.com/sem/?ref=clarityengine",
  ahrefs: "https://ahrefs.com/?ref=clarityengine",
  surfer: "https://surferseo.com/?via=clarityengine",
  moz: "https://moz.com/?ref=clarityengine",
  mangools: "https://mangools.com#a69b590a66aee08840d5414cd",
  "mangools-kwfinder": "https://mangools.com/kwfinder#a69b590a66aee08840d5414cd",
  amazon: "https://www.amazon.com/?tag=clarityengine-20",
  siteground: "https://www.siteground.com/index.htm?afcode=758135cea38bbc354897accd3183d9ff",
  nordvpn: "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=142338",
};

function resolveDestination(slug: string): string | undefined {
  if (staticLinks[slug]) return staticLinks[slug];
  const tool = tools.find((t) => t.slug === slug);
  if (tool?.affiliateUrl) return tool.affiliateUrl;
  if (tool?.websiteUrl) return tool.websiteUrl;
  return undefined;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const destination = resolveDestination(slug);

  const clickEvent = {
    slug,
    destination: destination ?? "not_found",
    referrer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
    timestamp: new Date().toISOString(),
    ip:
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for"),
  };

  logAffiliateClick(clickEvent);
  after(() => persistAffiliateClick(clickEvent));

  if (destination) {
    return NextResponse.redirect(destination, 302);
  }

  return NextResponse.redirect(new URL("/tools/", request.url), 302);
}
