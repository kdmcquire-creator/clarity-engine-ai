import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AffiliateLink {
  name: string;
  url: string;
  description: string;
  icon: string;
  color: string;
}

interface AffiliateLinkProps {
  links: AffiliateLink[];
  position?: 'inline' | 'sidebar' | 'footer';
}

const affiliatePrograms: Record<string, AffiliateLink> = {
  semrush: {
    name: 'Semrush',
    url: 'https://www.semrush.com/?ref=clarity-engine',
    description: 'All-in-one SEO platform for keyword research, competitive analysis, and rank tracking',
    icon: '🔍',
    color: 'from-blue-500 to-blue-600',
  },
  surfer: {
    name: 'Surfer SEO',
    url: 'https://surfer.com/?ref=clarity-engine',
    description: 'AI-powered content optimization and SERP analysis tool',
    icon: '📊',
    color: 'from-purple-500 to-purple-600',
  },
  jasper: {
    name: 'Jasper AI',
    url: 'https://www.jasper.ai/?ref=clarity-engine',
    description: 'AI content writer for creating optimized blog posts and marketing copy',
    icon: '✨',
    color: 'from-pink-500 to-pink-600',
  },
  ahrefs: {
    name: 'Ahrefs',
    url: 'https://ahrefs.com/?ref=clarity-engine',
    description: 'Comprehensive backlink analysis and competitor research platform',
    icon: '🔗',
    color: 'from-orange-500 to-orange-600',
  },
};

// Inline affiliate links (within article text)
export const InlineAffiliateLink: React.FC<{ program: keyof typeof affiliatePrograms }> = ({ program }) => {
  const link = affiliatePrograms[program];
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium underline hover:no-underline transition"
    >
      {link.name}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
};

// Sidebar affiliate card
export const AffiliateSidebar: React.FC<{ programs?: (keyof typeof affiliatePrograms)[] }> = ({
  programs = ['semrush', 'surfer', 'jasper', 'ahrefs'],
}) => (
  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
    <h3 className="font-semibold text-slate-900 mb-4">Recommended Tools</h3>
    <div className="space-y-3">
      {programs.map((program) => {
        const link = affiliatePrograms[program];
        return (
          <a
            key={program}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition group"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{link.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-900 group-hover:text-blue-600 transition">{link.name}</div>
                <p className="text-xs text-slate-600 line-clamp-2">{link.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition flex-shrink-0 mt-0.5" />
            </div>
          </a>
        );
      })}
    </div>
    <p className="text-xs text-slate-500 mt-4">
      We earn a commission from these affiliate links at no extra cost to you.
    </p>
  </div>
);

// Footer affiliate section
export const AffiliateFooter: React.FC<{ programs?: (keyof typeof affiliatePrograms)[] }> = ({
  programs = ['semrush', 'surfer', 'jasper', 'ahrefs'],
}) => (
  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 rounded-lg border border-slate-200 my-8">
    <h3 className="text-xl font-bold text-slate-900 mb-2">Tools We Recommend</h3>
    <p className="text-slate-600 mb-6">
      We've personally tested these tools and recommend them to our readers. Click below to explore them:
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      {programs.map((program) => {
        const link = affiliatePrograms[program];
        return (
          <a
            key={program}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 bg-gradient-to-r ${link.color} rounded-lg text-white hover:shadow-lg transition group flex items-center justify-between`}
          >
            <div>
              <div className="font-semibold">{link.name}</div>
              <div className="text-sm opacity-90">{link.description}</div>
            </div>
            <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition flex-shrink-0" />
          </a>
        );
      })}
    </div>
    <p className="text-xs text-slate-500 mt-4">
      Affiliate disclosure: We earn commissions from these links. This helps us create free content.
    </p>
  </div>
);

// Contextual affiliate callout (for specific mentions)
export const AffiliateCallout: React.FC<{ program: keyof typeof affiliatePrograms; context: string }> = ({
  program,
  context,
}) => {
  const link = affiliatePrograms[program];
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6 rounded-r-lg">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{link.icon}</span>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 mb-1">
            Try {link.name}
          </h4>
          <p className="text-sm text-slate-600 mb-3">
            {context} {link.name} is perfect for this. {link.description}
          </p>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
          >
            Explore {link.name}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
