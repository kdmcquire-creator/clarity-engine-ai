export interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  trackingId: string;
  category: string;
  description: string;
  icon: string;
  commission?: string;
  featured?: boolean;
}

export interface ContextualAffiliateLink {
  keyword: string;
  affiliateLinks: AffiliateLink[];
}

// Affiliate programs with tracking IDs
export const affiliatePrograms: Record<string, AffiliateLink> = {
  'semrush-pro': {
    id: 'semrush-pro',
    name: 'Semrush Pro',
    url: 'https://semrush.com',
    trackingId: 'clarity-engine-semrush',
    category: 'SEO Tools',
    description: 'All-in-one SEO platform with keyword research, backlink analysis, and competitor tracking',
    icon: '🔍',
    commission: '30%',
    featured: true,
  },
  'ahrefs-lite': {
    id: 'ahrefs-lite',
    name: 'Ahrefs Lite',
    url: 'https://ahrefs.com',
    trackingId: 'clarity-engine-ahrefs',
    category: 'SEO Tools',
    description: 'Industry-leading backlink analysis and competitor research tool',
    icon: '🔗',
    commission: '20%',
    featured: true,
  },
  'surfer-seo': {
    id: 'surfer-seo',
    name: 'Surfer SEO',
    url: 'https://surferseo.com',
    trackingId: 'clarity-engine-surfer',
    category: 'Content Optimization',
    description: 'AI-powered content optimization tool for better rankings and engagement',
    icon: '📝',
    commission: '25%',
    featured: true,
  },
  'jasper-ai': {
    id: 'jasper-ai',
    name: 'Jasper AI',
    url: 'https://jasper.ai',
    trackingId: 'clarity-engine-jasper',
    category: 'AI Writing',
    description: 'AI content writer for creating SEO-optimized blog posts and marketing copy',
    icon: '✨',
    commission: '20%',
    featured: true,
  },
  'grammarly-premium': {
    id: 'grammarly-premium',
    name: 'Grammarly Premium',
    url: 'https://grammarly.com',
    trackingId: 'clarity-engine-grammarly',
    category: 'Writing Tools',
    description: 'Advanced grammar and plagiarism checker for polished content',
    icon: '✍️',
    commission: '15%',
  },
  'google-analytics-4': {
    id: 'google-analytics-4',
    name: 'Google Analytics 4',
    url: 'https://analytics.google.com',
    trackingId: 'clarity-engine-ga4',
    category: 'Analytics',
    description: 'Free analytics platform for tracking website performance and user behavior',
    icon: '📊',
  },
  'google-search-console': {
    id: 'google-search-console',
    name: 'Google Search Console',
    url: 'https://search.google.com/search-console',
    trackingId: 'clarity-engine-gsc',
    category: 'Analytics',
    description: 'Free tool for monitoring and optimizing your site\'s presence in Google Search',
    icon: '🔎',
  },
  'screaming-frog': {
    id: 'screaming-frog',
    name: 'Screaming Frog SEO Spider',
    url: 'https://www.screamingfrog.co.uk',
    trackingId: 'clarity-engine-frog',
    category: 'SEO Tools',
    description: 'Website crawler for technical SEO audits and site analysis',
    icon: '🕷️',
    commission: '10%',
  },
};

// Contextual affiliate links by article topic/keyword
export const contextualLinks: ContextualAffiliateLink[] = [
  {
    keyword: 'keyword research',
    affiliateLinks: [
      affiliatePrograms['semrush-pro'],
      affiliatePrograms['ahrefs-lite'],
      affiliatePrograms['google-search-console'],
    ],
  },
  {
    keyword: 'content optimization',
    affiliateLinks: [
      affiliatePrograms['surfer-seo'],
      affiliatePrograms['jasper-ai'],
      affiliatePrograms['grammarly-premium'],
    ],
  },
  {
    keyword: 'backlink analysis',
    affiliateLinks: [
      affiliatePrograms['ahrefs-lite'],
      affiliatePrograms['semrush-pro'],
      affiliatePrograms['screaming-frog'],
    ],
  },
  {
    keyword: 'technical seo',
    affiliateLinks: [
      affiliatePrograms['screaming-frog'],
      affiliatePrograms['semrush-pro'],
      affiliatePrograms['google-search-console'],
    ],
  },
  {
    keyword: 'seo tools',
    affiliateLinks: [
      affiliatePrograms['semrush-pro'],
      affiliatePrograms['ahrefs-lite'],
      affiliatePrograms['surfer-seo'],
    ],
  },
  {
    keyword: 'analytics',
    affiliateLinks: [
      affiliatePrograms['google-analytics-4'],
      affiliatePrograms['semrush-pro'],
      affiliatePrograms['google-search-console'],
    ],
  },
];

export function getContextualLinks(articleTitle: string, articleContent: string): AffiliateLink[] {
  const searchText = `${articleTitle} ${articleContent}`.toLowerCase();
  const links: AffiliateLink[] = [];
  const seen = new Set<string>();

  for (const contextual of contextualLinks) {
    if (searchText.includes(contextual.keyword.toLowerCase())) {
      for (const link of contextual.affiliateLinks) {
        if (!seen.has(link.id)) {
          links.push(link);
          seen.add(link.id);
        }
      }
    }
  }

  // If no contextual links found, return featured links
  if (links.length === 0) {
    return Object.values(affiliatePrograms)
      .filter((link) => link.featured)
      .slice(0, 3);
  }

  return links.slice(0, 4);
}

export function getAffiliateLink(id: string): AffiliateLink | undefined {
  return affiliatePrograms[id];
}

export function getAllAffiliateLinks(): AffiliateLink[] {
  return Object.values(affiliatePrograms);
}

export function getFeaturedAffiliateLinks(): AffiliateLink[] {
  return Object.values(affiliatePrograms).filter((link) => link.featured);
}
