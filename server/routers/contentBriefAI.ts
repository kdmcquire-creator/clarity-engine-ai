/**
 * Content Brief AI Service
 * Generates comprehensive SEO content briefs using Forge API
 */

import { generateText } from "ai";

interface ContentBriefRequest {
  keyword: string;
  competitorUrl?: string;
}

interface ContentBriefResponse {
  keyword: string;
  keywordResearch: string;
  competitorAnalysis: string;
  contentOutline: string;
  contentRecommendations: string;
  linkingStrategy: string;
  metaOptimization: string;
  fullBrief: string;
}

/**
 * Generate a comprehensive content brief using AI
 */
export async function generateContentBrief(
  request: ContentBriefRequest
): Promise<ContentBriefResponse> {
  const { keyword, competitorUrl } = request;

  try {
    // Generate keyword research section
    const keywordResearchPrompt = `
You are an expert SEO strategist. Generate a keyword research section for the target keyword: "${keyword}"

Include:
- Primary keyword and variations
- LSI keywords (semantically related keywords)
- Long-tail keyword opportunities
- Search intent analysis
- Monthly search volume estimates (use realistic numbers)
- Keyword difficulty assessment

Format as a structured section with headers and bullet points.
`;

    const keywordResearch = await generateTextSection(keywordResearchPrompt);

    // Generate competitor analysis section
    const competitorPrompt = `
You are an expert SEO strategist. Generate a competitor analysis section for the keyword: "${keyword}"
${competitorUrl ? `Analyze this competitor URL: ${competitorUrl}` : "Analyze typical top-ranking competitors for this keyword"}

Include:
- Top 3 competitor analysis
- Content gaps and opportunities
- Unique angle recommendations
- Content length benchmarks
- Format recommendations (blog post, guide, video, etc.)
- Unique value proposition suggestions

Format as a structured section with headers and bullet points.
`;

    const competitorAnalysis = await generateTextSection(competitorPrompt);

    // Generate content outline section
    const outlinePrompt = `
You are an expert content strategist. Generate a detailed content outline for: "${keyword}"

Include:
- H1 title (SEO-optimized)
- H2 sections (5-7 main sections)
- H3 subsections under each H2
- Key points to cover in each section
- Recommended content depth for each section

Format as a hierarchical outline with clear structure.
`;

    const contentOutline = await generateTextSection(outlinePrompt);

    // Generate content recommendations section
    const recommendationsPrompt = `
You are an expert content strategist. Generate content recommendations for: "${keyword}"

Include:
- Target word count (provide range)
- Readability score target (Flesch Reading Ease)
- Keyword density targets
- Internal linking recommendations (number of links)
- External linking recommendations (number and types)
- Media recommendations (images, videos, infographics)
- Call-to-action recommendations

Format as a structured section with specific metrics.
`;

    const contentRecommendations = await generateTextSection(recommendationsPrompt);

    // Generate linking strategy section
    const linkingPrompt = `
You are an expert SEO strategist. Generate a linking strategy for: "${keyword}"

Include:
- Internal linking opportunities (suggest 5-7 related topics to link to)
- External linking opportunities (suggest 3-5 authoritative sources to link to)
- Anchor text recommendations
- Link placement strategy
- Backlink building recommendations

Format as a structured section with actionable recommendations.
`;

    const linkingStrategy = await generateTextSection(linkingPrompt);

    // Generate meta optimization section
    const metaPrompt = `
You are an expert SEO strategist. Generate meta optimization recommendations for: "${keyword}"

Include:
- Meta title (60 characters max, include primary keyword)
- Meta description (160 characters max, compelling and keyword-rich)
- URL slug recommendation
- H1 tag recommendation
- Schema markup recommendations (JSON-LD)
- Open Graph tags for social sharing

Format as a structured section with specific examples.
`;

    const metaOptimization = await generateTextSection(metaPrompt);

    // Compile full brief
    const fullBrief = `# Content Brief: ${keyword}

## Keyword Research
${keywordResearch}

## Competitor Analysis
${competitorAnalysis}

## Content Outline
${contentOutline}

## Content Recommendations
${contentRecommendations}

## Linking Strategy
${linkingStrategy}

## Meta Optimization
${metaOptimization}
`;

    return {
      keyword,
      keywordResearch,
      competitorAnalysis,
      contentOutline,
      contentRecommendations,
      linkingStrategy,
      metaOptimization,
      fullBrief,
    };
  } catch (error) {
    console.error("Failed to generate content brief:", error);
    throw new Error("Failed to generate content brief. Please try again.");
  }
}

/**
 * Helper function to generate a text section using AI
 */
async function generateTextSection(prompt: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: "openai:gpt-4-turbo",
      prompt,
      temperature: 0.7,
    });

    return text;
  } catch (error) {
    console.error("Failed to generate text section:", error);
    return "Unable to generate this section. Please try again.";
  }
}
