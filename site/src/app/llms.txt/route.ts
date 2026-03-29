import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Clarity Engine AI
> SEO tools and guides powered by AI.

## About
Clarity Engine AI provides free AI-powered SEO tools and practical guides for improving search rankings, keyword research, content strategy, and technical SEO.

## Sections
- /tools — Free AI SEO tools
- /blog — In-depth SEO guides and tutorials

## Contact
https://clarity-engine.ai/about/
`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
