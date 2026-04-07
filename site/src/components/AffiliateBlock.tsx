import Link from "next/link";

interface AffiliateBlockProps {
  toolSlug: string;
  ctaLabel?: string;
}

// Default promo — shown on frontend-only tools or when a tool has no specific affiliate
const DEFAULT_CTA = {
  heading: "Want Real-Time SEO Data?",
  body: "Moz Pro gives you live keyword rankings, Domain Authority scores, site audits, and backlink analysis — everything our AI tools estimate, but with actual live data from the industry standard.",
  label: "Try Moz Pro Free for 30 Days",
  href: "/go/moz",
};

export default function AffiliateBlock({
  toolSlug,
  ctaLabel,
}: AffiliateBlockProps) {
  const href = `/go/${toolSlug}/`;
  const label = ctaLabel ?? DEFAULT_CTA.label;
  const isDefault = !ctaLabel;

  return (
    <div className="mt-8 rounded-2xl bg-gradient-to-br from-blue-950/60 to-cyan-950/40 border border-cyan-800/30 p-6">
      <p className="text-xs text-white/30 mb-2 uppercase tracking-widest">
        Sponsored
      </p>
      <h3 className="text-base font-bold text-white mb-2">
        {isDefault ? DEFAULT_CTA.heading : "Go Further with a Full SEO Suite"}
      </h3>
      <p className="text-sm text-white/50 mb-4">
        {isDefault
          ? DEFAULT_CTA.body
          : "Our AI analysis gives you direction — a professional SEO platform gives you the live data to act on it."}
      </p>
      <a
        href={isDefault ? DEFAULT_CTA.href : href}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm py-2 px-5 rounded-lg transition-colors"
      >
        {label}
      </a>
      <p className="text-xs text-white/20 mt-3">
        <Link href="/affiliate-disclosure/" className="underline hover:text-white/40 transition">
          Affiliate disclosure
        </Link>
      </p>
    </div>
  );
}
