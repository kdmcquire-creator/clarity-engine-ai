import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const articles = [
  {
    title: "10 Essential SEO Strategies for 2026: A Comprehensive Guide",
    slug: "10-essential-seo-strategies-2026",
    excerpt: "Discover the most effective SEO strategies that will dominate search rankings in 2026. From technical SEO to content optimization, learn what separates winners from the rest.",
    content: `Search Engine Optimization continues to evolve rapidly. In 2026, the landscape has shifted dramatically from keyword stuffing and backlink manipulation to a more sophisticated, user-centric approach.

The foundation of modern SEO rests on three pillars: technical excellence, content quality, and user experience. Technical SEO ensures that search engines can crawl and index your site efficiently. This includes optimizing site speed, implementing structured data, fixing crawl errors, and ensuring mobile responsiveness.

Content quality has become non-negotiable. Search engines now prioritize content that genuinely answers user queries with depth and accuracy. Rather than targeting keywords, focus on creating comprehensive guides that address the full customer journey. Long-form content that covers topics thoroughly tends to rank better than thin, keyword-focused pages.

User experience signals have gained significant weight in ranking algorithms. Metrics like Core Web Vitals, click-through rates, and time on page all influence rankings. Optimize for fast loading times, intuitive navigation, and clear calls-to-action.

Link building remains important but has evolved. Quality matters far more than quantity. Focus on earning links from authoritative, relevant sources through exceptional content and genuine relationships.

Finally, don't overlook local SEO if you serve a geographic market. Optimize your Google Business Profile, gather reviews, and ensure consistent NAP (Name, Address, Phone) information across the web.`,
    authorName: "Sarah Chen",
    published: true,
    publishedAt: new Date('2026-02-15'),
  },
  {
    title: "The Complete Guide to Keyword Research: Beyond Google Keyword Planner",
    slug: "complete-guide-keyword-research",
    excerpt: "Master advanced keyword research techniques that go beyond basic tools. Learn how to identify high-intent keywords, analyze competitor strategies, and find untapped opportunities.",
    content: `Keyword research is the foundation of any successful SEO strategy. Yet many marketers rely solely on Google Keyword Planner, missing out on deeper insights that can drive significant competitive advantages.

Effective keyword research begins with understanding search intent. Not all keywords are created equal. Some indicate commercial intent (users ready to buy), others informational (users seeking knowledge), and some navigational (users looking for specific sites). Tailor your content strategy to match these intents.

Use multiple data sources for comprehensive research. Google Search Console reveals actual queries bringing traffic to your site. Google Trends shows seasonal patterns and emerging topics. Competitor analysis tools like SEMrush and Ahrefs reveal what keywords competitors rank for and their backlink profiles.

Long-tail keywords often represent the best opportunities. While they have lower search volume individually, they typically have lower competition and higher conversion rates. A strategy combining broad, medium, and long-tail keywords creates a balanced portfolio.

Consider search volume in context. A keyword with 1,000 monthly searches might be more valuable than one with 10,000 searches if it has lower competition and higher commercial intent. Use keyword difficulty metrics to assess ranking feasibility.

Don't forget about related keywords and semantic variations. Search engines understand synonyms and related concepts. Optimize for topic clusters rather than individual keywords. This approach improves rankings and provides better user experience.

Finally, validate your keyword research with actual testing. Monitor rankings, traffic, and conversions. Refine your strategy based on real-world performance data.`,
    authorName: "Marcus Rodriguez",
    published: true,
    publishedAt: new Date('2026-02-08'),
  },
  {
    title: "Content Optimization Secrets: How to Rank Higher Without Sacrificing Quality",
    slug: "content-optimization-secrets",
    excerpt: "Learn the art of balancing SEO optimization with genuine, engaging content. Discover proven techniques used by top-ranking websites to achieve both visibility and reader satisfaction.",
    content: `The tension between SEO optimization and content quality is a common challenge. The good news: they're not mutually exclusive. The best content is both well-optimized and genuinely valuable to readers.

Start with comprehensive keyword research, but don't let keywords dictate your content. Use them as a framework, not a constraint. Your primary goal should be answering user questions thoroughly and accurately.

Structure matters significantly. Use clear headings (H1, H2, H3) that include relevant keywords naturally. This helps both search engines and readers understand your content hierarchy. Aim for one H1 per page, with multiple H2s breaking up sections.

Optimize your introduction. The first 100-150 words are critical. Include your primary keyword naturally while clearly stating what readers will learn. This improves both click-through rates from search results and user engagement.

Use internal linking strategically. Link to related content using descriptive anchor text. This helps distribute page authority and keeps readers engaged with your content ecosystem. Aim for 2-5 internal links per 1,000 words, depending on content length and relevance.

Meta descriptions, while not direct ranking factors, significantly impact click-through rates. Write compelling descriptions (150-160 characters) that accurately summarize your content and include relevant keywords.

Optimize images for both user experience and SEO. Use descriptive alt text, compress file sizes for faster loading, and include relevant keywords naturally in image filenames.

Finally, update and refresh old content regularly. Search engines favor fresh content. Review top-performing pages quarterly, update statistics, add new insights, and refresh publication dates.`,
    authorName: "Jessica Liu",
    published: true,
    publishedAt: new Date('2026-01-28'),
  },
  {
    title: "Technical SEO Audit Checklist: 50+ Items to Improve Your Site's Health",
    slug: "technical-seo-audit-checklist",
    excerpt: "A comprehensive technical SEO audit checklist covering everything from site speed to structured data. Use this guide to identify and fix issues that might be holding back your rankings.",
    content: `Technical SEO forms the foundation that allows search engines to crawl, index, and rank your content effectively. A thorough technical audit can reveal issues costing you rankings and traffic.

Start with crawlability. Ensure your robots.txt file isn't blocking important pages. Check for noindex tags on pages you want indexed. Use Google Search Console to identify crawl errors and fix them promptly.

Site speed is crucial. Use Google PageSpeed Insights and GTmetrix to identify performance bottlenecks. Optimize images, enable compression, leverage browser caching, and consider a Content Delivery Network (CDN) for global sites.

Mobile responsiveness is non-negotiable. With mobile-first indexing, Google primarily crawls the mobile version of your site. Ensure your site is fully responsive and provides an excellent mobile experience.

Implement structured data markup using Schema.org vocabulary. This helps search engines understand your content better and can enable rich snippets in search results. Use tools like Schema.org validator to verify implementation.

SSL certificates are essential. Migrate to HTTPS if you haven't already. Search engines favor secure sites, and users trust them more.

Fix duplicate content issues. Use canonical tags to indicate preferred versions of pages. Implement proper redirects (301 for permanent moves) to consolidate link authority.

Audit your internal linking structure. Ensure important pages are easily accessible within 2-3 clicks from the homepage. Fix broken links and orphaned pages that receive no internal links.

Optimize your XML sitemaps. Include all important pages, exclude low-value pages, and update regularly. Submit to Google Search Console and Bing Webmaster Tools.

Monitor Core Web Vitals: Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). These user experience metrics directly impact rankings.

Finally, set up proper analytics and tracking. Implement Google Analytics 4, Google Search Console, and conversion tracking to measure SEO performance.`,
    authorName: "David Thompson",
    published: true,
    publishedAt: new Date('2026-01-15'),
  },
  {
    title: "Backlink Strategy That Actually Works: Building Authority Without Shortcuts",
    slug: "backlink-strategy-that-works",
    excerpt: "Discover ethical, effective backlink strategies that build genuine authority. Learn why quality matters more than quantity and how to earn links that actually move the needle.",
    content: `Backlinks remain one of the most important ranking factors, but the approach has evolved significantly. Gone are the days of aggressive link building schemes. Today's successful strategy focuses on earning quality links through exceptional content and genuine relationships.

Understand link quality first. A single link from an authoritative, relevant site is worth far more than dozens of links from low-quality directories. Evaluate potential link sources based on domain authority, relevance, and audience alignment.

Create linkable assets. The best way to earn links is to create content so valuable that others want to link to it. This might be original research, comprehensive guides, interactive tools, or unique data visualizations.

Develop relationships with journalists, bloggers, and industry influencers. These relationships often lead to natural link opportunities. Engage with their content, provide value, and build genuine connections before asking for coverage.

Use the skyscraper technique: find top-ranking content in your niche, create something better, and reach out to sites linking to the original. This proven method consistently generates quality links.

Guest posting remains effective when done right. Write for reputable publications in your industry. Focus on providing value to their audience, not just getting a link. Quality guest posts can drive referral traffic and build authority.

Monitor your backlink profile regularly. Use tools like Ahrefs or SEMrush to track new links, identify toxic links, and analyze competitor link profiles. Disavow spammy links that could harm your site.

Leverage unlinked mentions. When people mention your brand online without linking, reach out and ask them to add a link. This is often an easy way to convert mentions into links.

Finally, remember that link building is a long-term strategy. Focus on consistent, ethical practices that build genuine authority over time.`,
    authorName: "Emily Watson",
    published: true,
    publishedAt: new Date('2026-01-05'),
  },
];

try {
  for (const article of articles) {
    await connection.execute(
      `INSERT INTO articles (title, slug, excerpt, content, authorName, published, publishedAt, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [article.title, article.slug, article.excerpt, article.content, article.authorName, article.published, article.publishedAt]
    );
    console.log(`✓ Created article: ${article.title}`);
  }
  console.log('\n✅ All articles seeded successfully!');
} catch (error) {
  console.error('Error seeding articles:', error);
} finally {
  await connection.end();
}
