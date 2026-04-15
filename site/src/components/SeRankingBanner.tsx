/**
 * SeRankingBanner
 *
 * Renders the official SE Ranking affiliate iframe widget.
 * Uses publisher ID 5009081 (Clarity Engine's SE Ranking ga= code).
 *
 * Sizes:
 *   "full"    — 100% wide, 188px tall (hero/inline placements)
 *   "compact" — 100% wide, 78px tall  (sidebar/tight placements)
 *
 * Notes:
 *   - Clicks on the iframe go directly to seranking.com with SE Ranking's
 *     own widget tracking, bypassing /go/se-ranking/. Internal click logs
 *     are not recorded for these placements. The richer creative is the
 *     tradeoff.
 *   - Always renders with loading="lazy" and explicit width/height to
 *     protect LCP/CLS.
 *
 * Usage:
 *   <SeRankingBanner size="full" />
 *   <SeRankingBanner size="compact" className="max-w-sm" />
 */

const AFFILIATE_ID = "5009081";

interface SeRankingBannerProps {
  size: "full" | "compact";
  /** Optional wrapper class override for layout-specific spacing. */
  className?: string;
}

export function SeRankingBanner({ size, className }: SeRankingBannerProps) {
  const small = size === "compact" ? 1 : 0;
  const height = size === "compact" ? 78 : 188;
  const src = `https://online.seranking.com/affiliatewidget.html?id=${AFFILIATE_ID}&lang=en&full=1&small=${small}`;

  return (
    <div
      className={`my-6 ${className ?? ""}`.trim()}
      aria-label="Sponsored: SE Ranking"
    >
      <iframe
        src={src}
        title="SE Ranking affiliate banner"
        width="100%"
        height={height}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        frameBorder="0"
        style={{ border: 0, display: "block", width: "100%", height }}
      />
      <p className="text-xs text-white/30 mt-1 text-center">Sponsored</p>
    </div>
  );
}

export default SeRankingBanner;
