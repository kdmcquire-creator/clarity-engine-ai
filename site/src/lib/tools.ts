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
      "The Keyword Density Checker analyzes how frequently target keywords appear in your content relative to total word count, giving you a clear breakdown of frequency counts and density percentages for every term. Search engines use keyword frequency as one of many signals to determine topical relevance, but over-optimization — commonly called keyword stuffing — can trigger algorithmic penalties that push your pages out of the top results entirely. This tool helps you walk that fine line by showing exactly where your content stands. Aim for a primary keyword density between 1% and 2%, with secondary keywords falling in the 0.5% to 1% range. If the tool reveals that any term exceeds 3% density, that is a strong signal to rewrite those sections using synonyms, semantic variations, and related phrases to distribute relevance more naturally. Pay close attention to exact-match repetition patterns, because Google's SpamBrain system is specifically trained to detect unnatural keyword repetition. Beyond raw percentages, consider the placement of your keywords: terms in headings, the first paragraph, and image alt text carry disproportionate ranking weight compared to keywords buried in the middle of body copy. Use this tool after every draft revision to make sure your edits have not accidentally skewed your density in either direction. Pro tip: run your top three competitors' content through this same checker for your target keyword — matching their density range is almost always safer and more effective than following generic percentage guidelines, because it reflects what Google is actually rewarding in your specific niche and search context.",
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
      "The Meta Tag Generator creates production-ready HTML meta tags for title, description, Open Graph, and Twitter Card markup, complete with live character count warnings so you never publish truncated snippets. Meta tags are the first thing Google and social platforms read when they encounter your page, and they directly control how your content appears in search results, Facebook shares, Twitter posts, and LinkedIn previews. A well-crafted title tag under 60 characters that leads with your primary keyword can measurably improve both your ranking position and your click-through rate, while a meta description within the 155-character limit serves as your free advertising copy on the search results page. The Open Graph tags this tool generates ensure your content displays with the correct title, image, and description when shared on social media — without them, platforms will guess what to display, often pulling irrelevant text or the wrong image. Twitter Card tags work similarly but follow Twitter's own specification, letting you control whether your link appears as a summary card or a large image preview. When interpreting the character count indicators, treat yellow warnings as a signal to tighten your wording, and red warnings as must-fix issues since truncated tags look unprofessional and lose the end of your message. Always write your title tag for humans first and search engines second — a compelling, clickable title with a natural keyword placement will outperform a keyword-stuffed tag every time. Pro tip: include your brand name at the end of title tags using a pipe separator, but only if there is room after your primary keyword phrase, because brand recognition in SERPs boosts click-through rates for established sites.",
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
      "The Readability Score tool calculates the Flesch Reading Ease score and grade level estimate for any text you paste, then provides actionable suggestions to make your content more accessible to a wider audience. Readability has a direct impact on SEO performance because Google rewards content that satisfies user intent quickly — if visitors land on your page and struggle to understand your writing, they bounce back to the search results, which sends a negative engagement signal that erodes your rankings over time. Studies consistently show that the highest-performing web content reads at a 7th to 8th grade level, even when the topic is technical or specialized. A Flesch score between 60 and 70 hits the sweet spot for most audiences. If your score falls below 50, your content is likely losing casual readers; above 80 and you may be oversimplifying in a way that fails to demonstrate expertise, which matters for E-E-A-T signals in competitive niches. When reviewing your results, focus on the sentence length analysis first: sentences longer than 20 words are the most common readability killer, and splitting them is usually the fastest fix. Next, examine the word complexity score and replace multi-syllable jargon with simpler alternatives wherever the meaning is preserved — for example, use 'start' instead of 'initiate' or 'help' instead of 'facilitate.' Paragraph length matters too: keep paragraphs under four sentences for web content. Pro tip: run your content through this tool after every editing pass, not just once, because edits that improve accuracy often accidentally increase complexity, and catching that regression early saves time.",
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
      "The Schema Markup Generator produces valid JSON-LD structured data for Article, FAQ, Product, LocalBusiness, and Breadcrumb schema types, giving you ready-to-paste code that helps search engines understand your content at a deeper level. Structured data is the foundation of rich snippets — those enhanced search results that display star ratings, FAQ dropdowns, price ranges, and business hours directly in Google's results page. Pages with rich snippets consistently earn higher click-through rates than plain blue links, often by 20-30%, because they occupy more visual real estate and communicate trustworthiness at a glance. The FAQ schema is especially powerful for informational content because it can display your questions and answers directly in search results, effectively doubling or tripling the space your listing occupies on the page. Product schema is essential for any e-commerce or review page because it enables price, availability, and review stars to appear in results. When using this tool, fill in every available field — Google's documentation is clear that more complete structured data performs better than minimal implementations. After generating your JSON-LD, paste it into your page's head section or at the bottom of the body tag, then validate it using Google's Rich Results Test to confirm there are no errors or warnings before publishing. Pay attention to required versus recommended fields: missing a required field means the schema will be ignored entirely. Pro tip: implement FAQ schema on your highest-traffic informational pages first, because FAQ rich results have the highest approval rate of any schema type and can produce visible SERP improvements within days of Google's next crawl.",
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
      "The Heading Analyzer parses your HTML or plain text to visualize the full H1 through H6 heading hierarchy, catch structural gaps like missing heading levels, and score your page's heading architecture for both SEO and accessibility. Headings serve a dual purpose in modern search optimization: they provide semantic structure that helps Google understand the topical organization of your content, and they create scannable anchor points that keep readers engaged on the page. A well-structured heading hierarchy directly improves your chances of earning featured snippets, because Google frequently pulls content from pages with clear, logically nested headings that answer specific questions. The most common mistakes this tool catches include using multiple H1 tags on a single page, skipping heading levels (jumping from H2 to H4, for instance), and using heading tags for styling purposes rather than structural ones. When you review your results, start with the structure score: anything below 80 suggests significant issues that need attention. Verify that you have exactly one H1 tag that contains your primary keyword, followed by H2 tags for each major section, and H3 tags for subsections within those sections. The keyword presence check tells you whether your target terms appear in enough headings — ideally your primary keyword shows up in the H1 and at least one H2, while secondary keywords are distributed across the remaining subheadings. Headings also matter for accessibility because screen readers use them to navigate page content, so a logical hierarchy is not just an SEO best practice but a legal compliance consideration under ADA guidelines. Pro tip: mirror the heading structure of the current top-ranking page for your target keyword, then add one or two additional subsections that cover angles competitors have missed.",
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
      "The Title Tag Optimizer evaluates your page title by simulating its pixel-width rendering in Google search results, counting characters, analyzing keyword position, and providing click-through rate optimization recommendations. Your title tag is arguably the single most important on-page SEO element because it directly influences both rankings and clicks — Google uses the title to understand what your page is about, and searchers use it to decide whether your result is worth clicking. Pixel width matters more than character count because Google truncates titles based on pixel width (approximately 580 pixels on desktop), and characters like capital W or M consume more space than lowercase i or l. This tool simulates that rendering so you can see exactly where your title will be cut off. Keyword position analysis reveals whether your primary keyword appears in the first half of the title, which is critical because both Google and users give disproportionate weight to the beginning of a title tag. If your keyword appears only at the end, it may get truncated and lose its ranking signal entirely. The power word detection feature identifies emotional triggers like 'best,' 'ultimate,' 'proven,' and 'free' that data shows can increase click-through rates by 10-20% in competitive search results. The CTR score estimate combines all these factors into an actionable rating. When your score is below 70, focus on moving your keyword earlier, adding a power word, and including a number if applicable — titles with numbers consistently outperform those without in click-through studies. Pro tip: write three to five title tag variations and pick the one that sounds most natural when read aloud, because Google increasingly rewrites titles that feel over-optimized or awkwardly constructed.",
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
      "The URL Structure Analyzer performs a comprehensive SEO audit on any URL you enter, evaluating length, keyword presence, special character usage, HTTPS status, and overall adherence to URL best practices. Clean, descriptive URLs are a confirmed Google ranking factor and play an important role in how both search engines and users perceive your pages. Google has stated that words in the URL path serve as a relevance signal, and click-through rate studies show that searchers prefer shorter, readable URLs over long strings of parameters and IDs. Ideally, your URLs should be under 75 characters, use hyphens as word separators (never underscores), contain your primary keyword, and avoid unnecessary parameters, session IDs, or deeply nested directory paths. The HTTPS check confirms that your page is served over a secure connection, which has been a ranking signal since 2014 and is now essentially mandatory for any serious website. When reviewing results, address red flags first: special characters like percent-encoded spaces, ampersands in the path, or uppercase letters all create issues ranging from duplicate content to broken links. A best-practice score below 60 usually means the URL has structural problems that are actively hurting your SEO — common culprits include dynamic parameters that create infinite URL variations and directory depths beyond three levels. Pay particular attention to keyword placement within the URL path: keywords closer to the root domain carry more weight than those buried in deep subdirectories. If you are building new pages, get the URL structure right before publishing because changing URLs later requires 301 redirects and temporarily costs ranking equity. Pro tip: audit your top twenty highest-traffic URLs through this tool as a priority, because fixing structural issues on pages that already receive search traffic produces the fastest measurable SEO improvements.",
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
      "The SERP Simulator shows you exactly how your page will appear in Google search results by rendering a realistic preview from your title tag, URL, and meta description, complete with pixel-accurate truncation warnings and both mobile and desktop views. This preview capability is essential because what users see in search results directly determines whether they click through to your site or scroll past to a competitor. Google renders titles and descriptions differently on mobile versus desktop — mobile displays are narrower and truncate earlier — so content that looks perfect on desktop may lose its call-to-action or keyword when viewed on a phone, where the majority of searches now happen. The pixel truncation warnings are more reliable than simple character counts because Google uses proportional fonts where different characters occupy different widths. A title full of wide characters like 'W' and 'M' will truncate much sooner than one with narrow characters. When your preview shows red truncation warnings, your most important words and selling points may be invisible to searchers, directly reducing your click-through rate. Use the real-time editing feature to iterate quickly: try different word orders, trim unnecessary words, and test whether moving your keyword earlier in the title improves the visual impact. Compare your simulated listing against what your competitors show for the same search query — if their descriptions feature specific numbers, dates, or value propositions and yours is generic, you will lose clicks regardless of ranking position. The favicon simulation helps you verify your brand icon renders cleanly at the small sizes Google uses. Pro tip: optimize your SERP appearance for mobile first since mobile search volume exceeds desktop in nearly every industry, and use the desktop preview as a secondary check.",
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
      "The Duplicate Content Detector compares two pieces of content side-by-side and calculates a similarity percentage, highlights matching sentences, and provides an SEO risk assessment for potential duplicate content issues. Duplicate content is one of the most misunderstood problems in SEO: while Google does not impose a formal 'penalty' for duplicates, it does choose only one version to index and rank, which means the other versions are effectively invisible in search results. This filtering can devastate your traffic if Google picks the wrong version or if a competitor has scraped your content and their version outranks yours. The similarity percentage gives you a clear threshold to work with — content with more than 25% sentence-level similarity should be reworked, and anything above 50% is a serious risk that requires immediate attention. The side-by-side diff view highlights exactly which sentences match, making it easy to identify whether the overlap is in boilerplate sections like disclaimers and CTAs (which are lower risk) or in the substantive body content (which is higher risk). Use this tool in several common scenarios: checking whether your own pages are too similar to each other, verifying that content you have commissioned from freelancers is original, and monitoring whether competitors are copying your published work without attribution. When the risk rating comes back as high, rewrite the overlapping sections using different examples, angles, and sentence structures rather than just swapping individual words, because Google's algorithms are sophisticated enough to detect shallow paraphrasing. Pro tip: run this comparison between your draft and the top three ranking pages for your target keyword before publishing, because if your content is too similar to what already ranks, Google has little reason to surface a near-duplicate when the existing results already satisfy the query.",
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
      "The Mobile Friendliness Checker audits your page HTML for critical mobile SEO factors including viewport meta tag configuration, touch target sizing, font size legibility, and responsive design element compliance. Since Google's switch to mobile-first indexing, the mobile version of your page is the primary version Google evaluates for rankings — meaning mobile issues do not just hurt your mobile traffic, they hurt your desktop rankings too. This tool catches the most common mobile SEO failures before they cost you positions. The viewport meta check verifies that your page includes a properly configured viewport tag, which is the most fundamental requirement for mobile rendering; without it, mobile browsers render your page at desktop width and force users to pinch-zoom, which Google interprets as a poor mobile experience. Touch target analysis measures whether your clickable elements (buttons, links, form fields) meet the recommended minimum size of 48 by 48 CSS pixels with adequate spacing between them — undersized targets cause mis-taps that frustrate users and increase bounce rates. The font size audit flags text rendered below 16 pixels, which is generally the minimum for comfortable reading on mobile screens without zooming. Responsive image checks verify that your images use srcset attributes or CSS-based responsive techniques rather than serving desktop-sized images to mobile devices, which wastes bandwidth and slows page load times dramatically on cellular connections. When reviewing results, prioritize viewport and font issues first because they have the most direct impact on Google's mobile usability assessment. Pro tip: test your page HTML through this tool using the actual source code from your live site rather than your development build, because build processes, CDNs, and server-side rendering can all modify the HTML in ways that introduce or resolve mobile issues you would otherwise miss.",
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
      "The Backlink Analyzer uses AI to evaluate your domain's backlink profile strength, assess anchor text diversity, estimate link quality, and generate prioritized link building recommendations. Backlinks remain one of Google's top three ranking factors, and the quality and diversity of your link profile often determines whether you can compete for high-value keywords in your niche. This tool examines the key signals that separate a healthy backlink profile from a risky one. Domain authority signals estimate the overall strength of your referring domains — a handful of links from authoritative, topically relevant sites is worth far more than hundreds of links from low-quality directories or unrelated blogs. The anchor text diversity analysis is equally important: a natural link profile contains a mix of branded anchors (your site name), naked URLs, generic phrases ('click here,' 'learn more'), and keyword-rich anchors. If more than 30% of your anchors contain exact-match keywords, that pattern looks manipulative to Google's Penguin algorithm and can trigger ranking suppression. The link quality estimation helps you identify potentially toxic links that could be dragging down your rankings — these often come from link farms, private blog networks, or hacked sites that linked to you without your knowledge. When reviewing the actionable recommendations, focus on opportunities to earn links from domains in your niche that already link to competitors but not to you, because these sites have demonstrated a willingness to link to content like yours. Outreach to these sites with a superior resource is the highest-ROI link building strategy available. Pro tip: monitor your backlink profile monthly rather than quarterly, because toxic links can appear at any time and catching them early through disavow requests minimizes ranking damage.",
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
      "The Content Gap Analyzer uses AI to compare your content against competitor pages, identifying missing topics, uncovered keywords, and specific opportunities where you can create or improve content to outrank the competition. Content gaps represent some of the highest-value SEO opportunities because they reveal exactly what your target audience is searching for that you are not yet addressing. When a competitor ranks for keywords you do not even have content for, every one of those searches is traffic you are leaving on the table. This tool performs a systematic analysis by mapping the topical coverage of competitor URLs against your own, then scoring each gap by estimated search volume and ranking difficulty so you can prioritize effectively. The topic gap identification goes beyond simple keyword matching — it uses semantic analysis to detect entire subject areas that your site has not yet explored, which are prime targets for new content creation. The competitor content mapping feature shows you how competitors structure their coverage of your shared topics, revealing whether they use long-form guides, comparison pages, or FAQ formats to capture different search intents. When interpreting the keyword opportunity scores, focus on gaps where you have topical authority but missing pages, because these are the easiest wins — Google already trusts your domain for the subject, you just need to create the specific content that matches the query. Gaps in areas where you have no topical authority require a longer-term content strategy to build up supporting pages first. Pro tip: revisit your content gap analysis every quarter, because competitors publish new content regularly and search trends shift — what was a low-priority gap three months ago may now be a high-volume opportunity worth pursuing immediately.",
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
      "The Content Outline Generator creates a structured H2/H3 content outline for any target keyword, complete with suggested word counts per section, LSI (latent semantic indexing) keyword recommendations, and a SERP intent analysis that tells you what type of content Google expects to rank. Starting with a data-driven outline rather than writing from scratch is one of the most reliable ways to produce content that ranks, because it ensures your article covers the same breadth and depth of topics that Google has already validated by ranking similar content. The H2/H3 structure provides a logical framework that improves both reader experience and search engine comprehension — well-organized content with clear subheadings earns more featured snippets, keeps readers on the page longer, and reduces bounce rates. The suggested word counts per section help you allocate your writing effort where it matters most, because not every section needs equal depth; some subtopics require detailed explanation while others only need a brief mention for completeness. LSI keyword suggestions expand your content's semantic footprint beyond your primary keyword, helping Google understand that your page thoroughly covers the topic rather than just targeting a single phrase. The SERP intent analysis is critical for content strategy: it reveals whether Google interprets your keyword as informational, transactional, navigational, or commercial investigation intent, and this determines whether you should write a how-to guide, a product comparison, a landing page, or a buying guide. Creating content that mismatches search intent is one of the most common reasons pages fail to rank despite having strong backlinks and on-page optimization. Pro tip: use the generated outline as a starting framework, then add one or two unique sections that no competitor covers to differentiate your content and give Google a reason to rank it above existing results.",
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
      "The Internal Link Analyzer uses AI to evaluate your page's internal linking structure, mapping link equity distribution, detecting orphan pages, and identifying anchor text optimization opportunities across your site. Internal linking is one of the most underutilized SEO levers because it is entirely within your control — unlike backlinks, which depend on external sites choosing to link to you, internal links can be strategically placed to direct ranking authority exactly where you need it. Google uses internal links to discover new pages, understand site hierarchy, and distribute PageRank throughout your domain, so a well-optimized internal linking structure can significantly improve rankings without any off-site work. The link equity mapping shows you how authority flows through your site, revealing whether your most important pages receive enough internal links to compete for their target keywords or whether link equity is being wasted on low-value pages. Orphan page detection is particularly valuable because orphan pages — those with no internal links pointing to them — are essentially invisible to Google's crawler and will rarely rank regardless of how good their content is. When the tool identifies orphan pages, adding just two or three contextual internal links from relevant existing pages can bring them into Google's index and start driving traffic. The anchor text analysis evaluates whether your internal link anchor text is descriptive and keyword-relevant, which helps Google understand what the linked page is about. Generic anchors like 'click here' or 'read more' waste an opportunity to pass topical relevance signals. Pro tip: create a hub-and-spoke internal linking structure where your most important pages (hubs) receive links from multiple supporting articles (spokes), and ensure every new piece of content you publish links to at least two or three existing pages to continuously strengthen your site's interconnected authority.",
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
      "The Page Speed Checker performs an AI-powered performance audit for any URL, generating Core Web Vitals estimates and a prioritized list of optimization recommendations with projected before-and-after performance improvements. Page speed is a direct Google ranking factor through the Core Web Vitals program, which measures three specific metrics: Largest Contentful Paint (LCP) for loading speed, First Input Delay (FID) and its successor Interaction to Next Paint (INP) for interactivity, and Cumulative Layout Shift (CLS) for visual stability. Sites that pass all three Core Web Vitals thresholds receive a ranking boost in Google's system, while sites with poor scores face a measurable disadvantage in competitive search results. Beyond rankings, page speed has a direct impact on conversion rates — research from Google shows that as page load time increases from 1 to 3 seconds, the probability of bounce increases by 32%, and at 5 seconds it increases by 90%. The resource optimization tips this tool provides identify the specific files, images, scripts, and rendering patterns that are slowing your page down, ranked by impact so you can fix the biggest bottlenecks first. Common high-impact recommendations include compressing and serving images in next-gen formats like WebP or AVIF, deferring non-critical JavaScript, implementing lazy loading for below-the-fold content, and leveraging browser caching with appropriate cache headers. The before-and-after projections help you build a business case for speed optimization by estimating how much each fix will improve your Core Web Vitals scores. Pro tip: prioritize LCP improvements first because it is the most heavily weighted Core Web Vital and often the easiest to fix through image optimization and server response time improvements, and focus specifically on your top-traffic pages where even small speed gains translate into measurable ranking and conversion improvements.",
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
      "The Competitor Tracker uses AI to analyze competitor domains and generate insights on their content strategy, identify their top-ranking pages, and surface keyword opportunities that your site is not yet targeting. Understanding what your competitors are doing well — and where they are vulnerable — is the foundation of any effective SEO strategy, because you are not just competing against an algorithm, you are competing against the other sites that Google considers relevant for the same queries. The content strategy analysis reveals your competitors' publishing patterns, including which topics they prioritize, how frequently they publish, and what content formats they use, giving you a clear picture of the competitive landscape in your niche. Top page identification shows you which competitor pages drive the most organic traffic, which is invaluable because it tells you exactly which topics and keywords are worth investing in — if a competitor's guide on a particular subject is their highest-traffic page, that is a validated market signal that the topic has significant search demand. The keyword gap reporting reveals terms where competitors rank but you do not, segmented by difficulty so you can identify quick wins alongside longer-term opportunities. When reviewing the strategic recommendations, distinguish between gaps you can fill with new content and gaps where you already have a page that is simply underperforming. Existing pages that target the right keywords but rank on page two or three often just need content improvements and additional internal links, which is a faster path to results than creating new pages from scratch. Pay attention to competitors' featured snippet ownership as well, because snippets can be captured with targeted content restructuring even when you are not the top organic result. Pro tip: track your top three competitors monthly to detect when they publish new content targeting your core keywords, because responding quickly with a superior resource while the topic is fresh gives you the best chance of capturing the ranking opportunity before it consolidates.",
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
      "The Keyword Research Tool expands any seed keyword into organized keyword clusters with estimated search intent classification, difficulty ratings, and content format recommendations tailored to each cluster. Effective keyword research is the starting point of every successful SEO campaign because it determines which topics you create content for and how you structure your site's information architecture. This tool goes beyond simple keyword suggestions by grouping related terms into clusters — sets of keywords that share the same search intent and can be targeted by a single page. Cluster-based targeting is more effective than targeting individual keywords because Google's natural language processing now understands semantic relationships between terms, so a well-written page targeting a keyword cluster can rank for dozens or even hundreds of related queries. The search intent classification (informational, navigational, transactional, or commercial investigation) is critical because it tells you what type of content to create for each cluster. A transactional keyword cluster needs a product or service page, while an informational cluster needs a guide or how-to article — targeting a keyword with the wrong content format is one of the most common reasons pages fail to rank. Difficulty ratings help you prioritize your content calendar by identifying clusters where you have a realistic chance of ranking with your current domain authority. If you are a newer site, focus on clusters with difficulty ratings below 30 and build up authority before tackling more competitive terms. The content format suggestions recommend whether each cluster is best served by a listicle, step-by-step guide, comparison page, or in-depth review based on what currently ranks. Pro tip: start by entering your three most important seed keywords and look for overlapping clusters across them — these shared clusters represent your topical core and should be your highest-priority content targets because they build interconnected authority that strengthens your entire site's relevance.",
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
