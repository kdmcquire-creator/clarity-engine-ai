import Link from "next/link";
import { tools, type SeoTool } from "@/lib/tools";

interface RelatedToolsProps {
  currentSlug: string;
  currentCategory: string;
  maxItems?: number;
}

export default function RelatedTools({
  currentSlug,
  currentCategory,
  maxItems = 3,
}: RelatedToolsProps) {
  // Prioritize same category, then fill with other tools
  const sameCat = tools.filter(
    (t) => t.category === currentCategory && t.slug !== currentSlug
  );
  const otherCat = tools.filter(
    (t) => t.category !== currentCategory && t.slug !== currentSlug
  );
  const related: SeoTool[] = [...sameCat, ...otherCat].slice(0, maxItems);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2
        className="text-xl font-bold text-white mb-4"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Similar Tools
      </h2>
      <div className="grid md:grid-cols-3 gap-3">
        {related.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}/`}
            className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-600/50 rounded-xl p-4 transition-all"
          >
            <h3 className="font-medium text-white group-hover:text-cyan-400 transition text-sm mb-1">
              {t.name}
            </h3>
            <p className="text-white/40 text-xs line-clamp-2">
              {t.shortDesc}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/tools/"
          className="text-sm font-medium text-cyan-400 hover:underline"
        >
          View all tools &rarr;
        </Link>
      </div>
    </section>
  );
}
