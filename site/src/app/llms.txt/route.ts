import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Clarity Engine AI
> Practical SEO and AI-search (GEO) guidance for operators running real sites.

## About
Clarity Engine AI covers search engine optimization (SEO), generative engine optimization (GEO), keyword research, content strategy, technical SEO, link building, and the AI tools practitioners use to do this work. We practice SEO on our own network of sites and write about what we see working in real Google Search Console data.

## Sections
- /tools — Free SEO utilities (keyword density, meta tag generator, SERP snippet preview, schema markup tools, and more)
- /blog — In-depth SEO guides, tutorials, and analysis
- /categories — Topic clusters including Technical SEO, AI Search, Link Building, Keyword Research, Local SEO

## GEO (Generative Engine Optimization) Coverage
We cover how content appears and gets cited in AI-generated responses from ChatGPT, Perplexity, Claude, and Google AI Overviews — including structured content patterns, citation optimization, and brand visibility tracking.

## Editorial Approach
- We practice SEO on our own sites. Recommendations are grounded in real GSC performance data.
- Affiliate relationships with SEO tool vendors (Moz, SE Ranking, Mangools, and others) are disclosed on every review.
- Content is AI-assisted in research and drafting; reviewed and edited by a human (Kyle McQuire, Founder of Moonsmoke LLC) before publication.

## Contact
https://clarity-engine.ai/about/
`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
