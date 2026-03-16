import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp } from "lucide-react";
import { getContextualLinks } from "@/data/affiliateLinks";
import { trpc } from "@/lib/trpc";
import { useEffect } from "react";

interface ContextualAffiliateLinksProps {
  articleTitle: string;
  articleContent: string;
  articleId?: string;
}

export function ContextualAffiliateLinks({
  articleTitle,
  articleContent,
  articleId,
}: ContextualAffiliateLinksProps) {
  const links = getContextualLinks(articleTitle, articleContent);
  const handleLinkClick = (linkId: string) => {
    // Track the click (ready for implementation)
    console.log(`Affiliate link clicked: ${linkId} from article: ${articleId}`);
  };

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-amber-600" />
          <h3 className="text-lg font-bold text-slate-900">Recommended Tools</h3>
        </div>
        <p className="text-sm text-slate-700 mb-4">
          Tools mentioned in this article that can help you implement these strategies:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
              handleLinkClick(link.id);
              window.open(link.url, '_blank');
            }}
              className="group"
            >
              <Card className="p-4 hover:shadow-lg transition-all duration-300 h-full border-amber-200 hover:border-amber-400 cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{link.icon}</div>
                  {link.commission && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                      {link.commission}
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition">
                  {link.name}
                </h4>
                <p className="text-sm text-slate-700 mb-3 line-clamp-2">{link.description}</p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                  Learn More
                  <ExternalLink className="h-3 w-3" />
                </div>
              </Card>
            </a>
          ))}
        </div>

        <p className="text-xs text-slate-600 mt-4 text-center">
          We earn a commission when you purchase through these links, at no extra cost to you.
        </p>
      </div>
    </Card>
  );
}
