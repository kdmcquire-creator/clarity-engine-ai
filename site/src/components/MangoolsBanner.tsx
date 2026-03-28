/**
 * MangoolsBanner
 *
 * Renders a 250×250 Mangools affiliate iframe banner.
 * All banner URLs use fragment-based affiliate tracking: #a69b590a66aee08840d5414cd
 *
 * Usage:
 *   <MangoolsBanner tool="kwfinder" />
 *   <MangoolsBanner tool="serpchecker" />
 *   <MangoolsBanner tool="siteprofiler" />
 *   <MangoolsBanner tool="serpwatcher" />
 *   <MangoolsBanner tool="linkminer" />
 */

const AFFILIATE_ID = "a69b590a66aee08840d5414cd";

const TOOL_CONFIG: Record<string, { label: string; slug: string }> = {
  kwfinder: { label: "KWFinder", slug: "kwfinder" },
  serpchecker: { label: "SERPChecker", slug: "serpchecker" },
  siteprofiler: { label: "SiteProfiler", slug: "siteprofiler" },
  serpwatcher: { label: "SERPWatcher", slug: "serpwatcher" },
  linkminer: { label: "LinkMiner", slug: "linkminer" },
};

type MangoolsTool = keyof typeof TOOL_CONFIG;

interface MangoolsBannerProps {
  tool: MangoolsTool;
  theme?: "light" | "dark";
}

export function MangoolsBanner({ tool, theme = "light" }: MangoolsBannerProps) {
  const config = TOOL_CONFIG[tool];
  if (!config) return null;

  const src = `https://mangools.com/affil-banners/${config.slug}-ad.html?title=default&theme=${theme}&size=250x250#${AFFILIATE_ID}`;

  return (
    <div
      style={{ maxWidth: 250 }}
      className="my-4"
      aria-label={`${config.label} — affiliate banner`}
    >
      <iframe
        src={src}
        width="250"
        height="250"
        style={{ border: 0, display: "block" }}
        title={`${config.label} by Mangools`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className="text-xs text-zinc-500 mt-1 text-center">
        Affiliate link — we may earn a commission
      </p>
    </div>
  );
}

export default MangoolsBanner;
