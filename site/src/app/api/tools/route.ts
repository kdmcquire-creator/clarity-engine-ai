import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

if (!process.env.ANTHROPIC_API_KEY) {
  // Warn at module load time (visible in logs) but don't throw — the POST handler returns 503.
  console.warn("ANTHROPIC_API_KEY is not set. AI tool endpoints will return 503.");
}

const TOOL_PROMPTS: Record<
  string,
  (inputs: Record<string, string>) => { system: string; user: string }
> = {
  "backlink-analyzer": ({ domain }) => ({
    system: `You are an expert SEO consultant specializing in backlink analysis. Provide detailed, actionable backlink profile assessments. Format with clear sections using markdown headers.`,
    user: `Analyze the backlink profile for: ${domain}\n\nProvide:\n1. **Domain Authority Assessment** - estimated authority signals and what they mean\n2. **Likely Backlink Profile** - types of links this domain probably has based on its industry/age\n3. **Anchor Text Recommendations** - ideal anchor text distribution\n4. **Link Building Priorities** - top 5 specific link building opportunities\n5. **Risk Factors** - potential toxic link patterns to avoid\n6. **Action Plan** - 3 immediate next steps\n\nBe specific and practical.`,
  }),
  "content-gap-analyzer": ({ topic, competitors }) => ({
    system: `You are a content strategy expert. Analyze content gaps and opportunities with precision. Use markdown for structured output.`,
    user: `Topic: ${topic}\nCompetitors/context: ${competitors || "general industry leaders"}\n\nIdentify content gaps:\n1. **Missing Core Topics** - 5 topics your competitors cover that you likely don't\n2. **Keyword Opportunities** - 10 specific long-tail keywords with high intent\n3. **Content Format Gaps** - what formats (guides, tools, comparisons) are underserved\n4. **Search Intent Clusters** - group opportunities by informational/commercial/navigational\n5. **Quick Wins** - 3 pieces of content you could create this week to capture traffic\n6. **Content Brief** - outline for the single highest-opportunity piece`,
  }),
  "content-outline-generator": ({ keyword }) => ({
    system: `You are an SEO content strategist. Create comprehensive, rankable content outlines. Be specific with H2/H3 structure.`,
    user: `Target keyword: ${keyword}\n\nCreate a complete content outline:\n1. **Recommended Title** - optimized title tag (under 60 chars)\n2. **Meta Description** - compelling 150-160 char description\n3. **Article Structure** - full H2/H3 outline with:\n   - Word count target per section\n   - Key points to cover\n   - LSI keywords to include\n4. **Featured Snippet Target** - the question/format most likely to win a snippet\n5. **Internal Linking Suggestions** - 3-5 related topics to link to\n6. **Estimated Total Word Count** and reading time\n7. **Content Type Recommendation** - guide, listicle, comparison, etc.`,
  }),
  "internal-link-analyzer": ({ content }) => ({
    system: `You are an SEO specialist focused on internal linking strategy. Analyze content and provide actionable internal linking recommendations.`,
    user: `Content to analyze:\n${content}\n\nProvide internal link analysis:\n1. **Current Link Assessment** - evaluate any existing links found\n2. **Missing Link Opportunities** - 5-8 phrases that should be linked\n3. **Anchor Text Optimization** - recommended anchor text variations\n4. **Link Equity Flow** - how to distribute authority optimally\n5. **Orphan Page Risk** - topics mentioned that might not be interlinked\n6. **Implementation Priority** - ordered list of changes to make`,
  }),
  "page-speed-checker": ({ url }) => ({
    system: `You are a web performance expert. Provide specific, actionable Core Web Vitals optimization advice.`,
    user: `URL to analyze: ${url}\n\nProvide a performance optimization assessment:\n1. **Performance Estimate** - based on the URL/domain type, estimate likely Core Web Vitals scores\n2. **LCP Optimization** - largest contentful paint improvements\n3. **CLS Fixes** - cumulative layout shift prevention\n4. **INP Improvements** - interaction to next paint optimizations\n5. **JavaScript Audit** - common JS performance issues to check\n6. **Image Optimization** - image format and lazy loading recommendations\n7. **Priority Action List** - top 5 changes ordered by impact/effort ratio\n8. **Tools to Use** - specific free tools to audit this URL`,
  }),
  "competitor-tracker": ({ domains }) => ({
    system: `You are a competitive intelligence analyst for SEO. Provide strategic competitive analysis.`,
    user: `Competitor domains: ${domains}\n\nCompetitive analysis:\n1. **Content Strategy Analysis** - what content approach these domains likely use\n2. **Keyword Targeting Patterns** - keyword themes they're targeting\n3. **Estimated Traffic Opportunities** - gaps you could exploit\n4. **Content Format Strengths** - what formats they dominate\n5. **Backlink Strategy Insights** - link building approaches to replicate\n6. **Weaknesses to Exploit** - specific gaps in their coverage\n7. **Battle Plan** - 5 specific actions to outrank them in 90 days`,
  }),
  "keyword-research-tool": ({ keyword }) => ({
    system: `You are a keyword research specialist. Generate comprehensive keyword clusters with actionable insights.`,
    user: `Seed keyword: ${keyword}\n\nKeyword research results:\n1. **Primary Keywords** - 5 high-value variations with estimated intent\n2. **Long-tail Opportunities** - 10 specific long-tail phrases (3-5 words)\n3. **Question Keywords** - 8 questions people ask about this topic (for FAQs/featured snippets)\n4. **Commercial Intent Keywords** - buyer-focused terms worth targeting\n5. **Informational Keywords** - educational content opportunities\n6. **Keyword Clusters** - group into 3-4 content silos\n7. **Difficulty Assessment** - beginner/intermediate/advanced difficulty for each cluster\n8. **Content Calendar** - suggested 4-week content plan using these keywords`,
  }),
};

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "AI tools are not configured yet. Please set the ANTHROPIC_API_KEY environment variable.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const { tool, ...inputs } = await req.json();

  const promptFn = TOOL_PROMPTS[tool];
  if (!promptFn) {
    return new Response(JSON.stringify({ error: "Unknown tool" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { system, user } = promptFn(inputs as Record<string, string>);

  const stream = await client.messages.stream({
    model: "claude-3-5-haiku-20241022",
    max_tokens: 1500,
    system,
    messages: [{ role: "user", content: user }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
