export type SeoTool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  shortDesc: string;
  isFrontendOnly: boolean;
  features: string[];
  affiliateUrl?: string;
  websiteUrl?: string;
  ctaLabel?: string;
};

export const toolCategories = [
  { name: "Content Analysis", slug: "content-analysis", icon: "📝" },
  { name: "Technical SEO", slug: "technical-seo", icon: "⚙️" },
  { name: "Keyword Research", slug: "keyword-research", icon: "🔍" },
  { name: "SERP Tools", slug: "serp-tools", icon: "🎯" },
  { name: "AI-Powered", slug: "ai-powered", icon: "🤖" },
];

export const tools: SeoTool[] = [
  {
    slug: "keyword-density-checker",
    name: "Keyword Density Checker",
    category: "content-analysis",
    shortDesc: "Analyze keyword frequency and percentage in any text",
    description:
      "Paste your content and instantly see which keywords appear most often, their frequency count, and density percentage. Ideal for on-page SEO optimization.",
    isFrontendOnly: true,
    features: [
      "Word frequency analysis",
      "Keyword density %",
      "Ignore common stop words",
      "Copy results to clipboard",
    ],
  },
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    category: "technical-seo",
    shortDesc: "Generate optimized title tags and meta descriptions",
    description:
      "Create perfectly formatted HTML meta tags for title, description, Open Graph, and Twitter Cards with live character count warnings.",
    isFrontendOnly: true,
    features: [
      "Title tag with 60-char limit",
      "Meta description 155-char limit",
      "Open Graph tags",
      "Twitter Card tags",
      "Copy HTML instantly",
    ],
  },
  {
    slug: "readability-score",
    name: "Readability Score",
    category: "content-analysis",
    shortDesc: "Calculate Flesch-Kincaid readability for your content",
    description:
      "Paste any text to get a Flesch Reading Ease score, grade level estimate, and actionable suggestions to make your content more accessible.",
    isFrontendOnly: true,
    features: [
      "Flesch Reading Ease",
      "Grade level estimate",
      "Sentence length analysis",
      "Word complexity score",
    ],
  },
  {
    slug: "schema-markup-generator",
    name: "Schema Markup Generator",
    category: "technical-seo",
    shortDesc: "Generate JSON-LD structured data for rich snippets",
    description:
      "Select a schema type (Article, FAQ, Product, LocalBusiness) and fill in the fields to get ready-to-paste JSON-LD structured data.",
    isFrontendOnly: true,
    features: [
      "Article, FAQ, Product schemas",
      "LocalBusiness schema",
      "Breadcrumb schema",
      "Valid JSON-LD output",
    ],
  },
  {
    slug: "heading-analyzer",
    name: "Heading Analyzer",
    category: "content-analysis",
    shortDesc: "Evaluate your heading hierarchy and structure",
    description:
      "Paste HTML or plain text with headers to visualize the H1–H6 hierarchy, catch missing headings, and optimize for SEO and accessibility.",
    isFrontendOnly: true,
    features: [
      "H1–H6 hierarchy visualization",
      "Missing heading detection",
      "Keyword presence check",
      "Structure score",
    ],
  },
  {
    slug: "title-tag-optimizer",
    name: "Title Tag Optimizer",
    category: "serp-tools",
    shortDesc: "Optimize title tags for length, keywords, and CTR",
    description:
      "Enter your page title to see pixel-width simulation, character count, keyword position analysis, and CTR optimization tips.",
    isFrontendOnly: true,
    features: [
      "Pixel-width simulation",
      "Character count",
      "Power word detection",
      "CTR score estimate",
    ],
  },
  {
    slug: "url-structure-analyzer",
    name: "URL Structure Analyzer",
    category: "technical-seo",
    shortDesc: "Audit URLs for SEO best practices",
    description:
      "Enter any URL to get a full SEO audit: length, keyword presence, special characters, HTTPS status, and a best-practice score.",
    isFrontendOnly: true,
    features: [
      "Length check",
      "Keyword detection",
      "Special character flagging",
      "HTTPS validation",
      "Best-practice score",
    ],
  },
  {
    slug: "serp-simulator",
    name: "SERP Simulator",
    category: "serp-tools",
    shortDesc: "Preview how your page looks in Google search results",
    description:
      "Enter your title, URL, and meta description to see a realistic Google SERP preview with pixel truncation warnings and mobile/desktop views.",
    isFrontendOnly: true,
    features: [
      "Desktop & mobile preview",
      "Pixel-width truncation warnings",
      "Real-time editing",
      "Favicon simulation",
    ],
  },
  {
    slug: "duplicate-content-detector",
    name: "Duplicate Content Detector",
    category: "content-analysis",
    shortDesc: "Compare two texts for similarity and duplication",
    description:
      "Paste two pieces of content side-by-side to get a similarity percentage, highlighted duplicate sentences, and SEO risk assessment.",
    isFrontendOnly: true,
    features: [
      "Sentence-level matching",
      "Similarity percentage",
      "Side-by-side diff view",
      "SEO risk rating",
    ],
  },
  {
    slug: "mobile-friendliness-checker",
    name: "Mobile Friendliness Checker",
    category: "technical-seo",
    shortDesc: "Check HTML for mobile SEO best practices",
    description:
      "Paste your page HTML to audit viewport meta tags, touch target sizes, font sizes, and responsive design elements.",
    isFrontendOnly: true,
    features: [
      "Viewport meta check",
      "Font size audit",
      "Touch target analysis",
      "Responsive image check",
    ],
  },
  {
    slug: "backlink-analyzer",
    name: "Backlink Analyzer",
    category: "ai-powered",
    shortDesc: "AI-powered backlink profile evaluation",
    description:
      "Enter your domain to get an AI analysis of your backlink profile strength, anchor text diversity, and link building recommendations.",
    isFrontendOnly: false,
    features: [
      "Domain authority signals",
      "Anchor text diversity",
      "Link quality estimation",
      "Actionable recommendations",
    ],
    affiliateUrl: "https://www.semrush.com/sem/?ref=clarityengine",
    websiteUrl: "https://www.semrush.com",
    ctaLabel: "Try Semrush Backlink Audit Free",
  },
  {
    slug: "content-gap-analyzer",
    name: "Content Gap Analyzer",
    category: "ai-powered",
    shortDesc: "Find missing topics vs. competitors",
    description:
      "Enter your topic and competitors' URLs to get AI-powered insights into content gaps, missing keywords, and opportunities to outrank.",
    isFrontendOnly: false,
    features: [
      "Topic gap identification",
      "Competitor content mapping",
      "Keyword opportunity scoring",
      "Content brief generation",
    ],
    affiliateUrl: "https://surferseo.com/?via=clarityengine",
    websiteUrl: "https://surferseo.com",
    ctaLabel: "Try Surfer SEO Content Gap Free",
  },
  {
    slug: "content-outline-generator",
    name: "Content Outline Generator",
    category: "ai-powered",
    shortDesc: "AI-generated content outlines for any keyword",
    description:
      "Enter a target keyword to get a structured H2/H3 outline with suggested word counts, LSI keywords, and SERP intent analysis.",
    isFrontendOnly: false,
    features: [
      "H2/H3 structure",
      "LSI keyword suggestions",
      "Word count recommendations",
      "Search intent analysis",
    ],
    affiliateUrl: "https://surferseo.com/?via=clarityengine",
    websiteUrl: "https://surferseo.com",
    ctaLabel: "Write Full Articles with Surfer SEO",
  },
  {
    slug: "internal-link-analyzer",
    name: "Internal Link Analyzer",
    category: "ai-powered",
    shortDesc: "Map and optimize your internal linking structure",
    description:
      "Paste your HTML content to get an AI analysis of internal link equity, orphan pages, and anchor text optimization opportunities.",
    isFrontendOnly: false,
    features: [
      "Link equity mapping",
      "Anchor text analysis",
      "Orphan page detection",
      "AI recommendations",
    ],
    affiliateUrl: "https://ahrefs.com/?ref=clarityengine",
    websiteUrl: "https://ahrefs.com",
    ctaLabel: "Audit Your Site with Ahrefs",
  },
  {
    slug: "page-speed-checker",
    name: "Page Speed Checker",
    category: "ai-powered",
    shortDesc: "Performance analysis with AI optimization tips",
    description:
      "Enter any URL for an AI-powered page speed audit with Core Web Vitals estimates and prioritized optimization recommendations.",
    isFrontendOnly: false,
    features: [
      "Core Web Vitals estimates",
      "Resource optimization tips",
      "Priority action list",
      "Before/after projections",
    ],
    affiliateUrl: "https://www.semrush.com/sem/?ref=clarityengine",
    websiteUrl: "https://www.semrush.com",
    ctaLabel: "Full Site Audit with Semrush",
  },
  {
    slug: "competitor-tracker",
    name: "Competitor Tracker",
    category: "ai-powered",
    shortDesc: "Monitor competitor rankings and content strategies",
    description:
      "Enter competitor domains to get AI-generated insights on their content strategy, top-ranking pages, and keyword opportunities you're missing.",
    isFrontendOnly: false,
    features: [
      "Content strategy analysis",
      "Top page identification",
      "Keyword gap reporting",
      "Strategic recommendations",
    ],
    affiliateUrl: "https://www.semrush.com/sem/?ref=clarityengine",
    websiteUrl: "https://www.semrush.com",
    ctaLabel: "Track Competitors with Semrush",
  },
  {
    slug: "keyword-research-tool",
    name: "Keyword Research Tool",
    category: "ai-powered",
    shortDesc: "Expand seed keywords with intent and difficulty",
    description:
      "Enter a seed keyword to get AI-generated keyword clusters with estimated search intent, difficulty ratings, and content format recommendations.",
    isFrontendOnly: false,
    features: [
      "Keyword clustering",
      "Search intent classification",
      "Difficulty estimation",
      "Content format suggestions",
    ],
    affiliateUrl: "https://ahrefs.com/?ref=clarityengine",
    websiteUrl: "https://ahrefs.com",
    ctaLabel: "Deep Keyword Research with Ahrefs",
  },
];

export function getToolsByCategory(category: string) {
  return tools.filter((t) => t.category === category);
}

export function getToolBySlug(slug: string) {
  return tools.find((t) => t.slug === slug);
}
