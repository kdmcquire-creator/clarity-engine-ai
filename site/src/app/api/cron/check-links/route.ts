import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron-auth";
import { tools } from "@/lib/tools";

type LinkStatus = "ok" | "broken" | "redirect";

interface LinkCheckResult {
  slug: string;
  websiteUrl: string;
  websiteStatus: number | null;
  affiliateUrl?: string;
  affiliateStatus?: number | null;
  linkStatus: LinkStatus;
  error?: string;
  responseTimeMs: number;
  checkedAt: string;
}

async function checkUrl(
  url: string,
  timeoutMs = 10_000
): Promise<{ status: number | null; error?: string; responseTimeMs: number }> {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "ClarityEngineAI-LinkChecker/1.0 (+https://clarity-engine.ai)",
      },
    });

    clearTimeout(timeout);

    // Retry with GET if HEAD is rejected (some sites block HEAD requests)
    if (response.status === 405 || response.status === 403) {
      const controller2 = new AbortController();
      const timeout2 = setTimeout(() => controller2.abort(), timeoutMs);
      const retryResponse = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller2.signal,
        headers: {
          "User-Agent":
            "ClarityEngineAI-LinkChecker/1.0 (+https://clarity-engine.ai)",
        },
      });
      clearTimeout(timeout2);
      return {
        status: retryResponse.status,
        responseTimeMs: Date.now() - start,
      };
    }

    return {
      status: response.status,
      responseTimeMs: Date.now() - start,
    };
  } catch (err) {
    return {
      status: null,
      error: err instanceof Error ? err.message : "Unknown error",
      responseTimeMs: Date.now() - start,
    };
  }
}

export async function POST(request: Request) {
  const authError = verifyCronAuth(request);
  if (authError) return authError;

  const results: LinkCheckResult[] = [];
  const checkedAt = new Date().toISOString();

  // Filter to tools that have a websiteUrl (frontend-only tools have no external URL)
  const checkableTools = tools.filter((t) => t.websiteUrl);

  // Check tools in batches to avoid overwhelming targets
  const BATCH_SIZE = 5;
  for (let i = 0; i < checkableTools.length; i += BATCH_SIZE) {
    const batch = checkableTools.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(async (tool) => {
        const websiteCheck = await checkUrl(tool.websiteUrl!);

        let affiliateCheck:
          | { status: number | null; error?: string; responseTimeMs: number }
          | undefined;
        if (tool.affiliateUrl) {
          affiliateCheck = await checkUrl(tool.affiliateUrl);
        }

        // Determine overall status
        let linkStatus: LinkStatus = "ok";
        let error: string | undefined;

        if (websiteCheck.status === null) {
          linkStatus = "broken";
          error = `Website: ${websiteCheck.error}`;
        } else if (websiteCheck.status >= 400) {
          linkStatus = "broken";
          error = `Website returned ${websiteCheck.status}`;
        } else if (websiteCheck.status >= 300) {
          linkStatus = "redirect";
        }

        if (affiliateCheck) {
          if (affiliateCheck.status === null) {
            linkStatus = "broken";
            error = `${error ? error + "; " : ""}Affiliate: ${affiliateCheck.error}`;
          } else if (affiliateCheck.status >= 400) {
            linkStatus = "broken";
            error = `${error ? error + "; " : ""}Affiliate returned ${affiliateCheck.status}`;
          }
        }

        const result: LinkCheckResult = {
          slug: tool.slug,
          websiteUrl: tool.websiteUrl!,
          websiteStatus: websiteCheck.status,
          linkStatus,
          responseTimeMs: websiteCheck.responseTimeMs,
          checkedAt,
        };

        if (tool.affiliateUrl) {
          result.affiliateUrl = tool.affiliateUrl;
          result.affiliateStatus = affiliateCheck?.status ?? null;
        }
        if (error) result.error = error;

        return result;
      })
    );

    results.push(...batchResults);
  }

  const broken = results.filter((r) => r.linkStatus === "broken");
  const summary = {
    total: results.length,
    ok: results.filter((r) => r.linkStatus === "ok").length,
    broken: broken.length,
    redirect: results.filter((r) => r.linkStatus === "redirect").length,
    checkedAt,
  };

  // Log structured results for Cloudflare Workers logs
  console.log(JSON.stringify({ type: "link_check_complete", summary }));

  if (broken.length > 0) {
    console.warn(
      JSON.stringify({
        type: "broken_links_found",
        broken: broken.map((b) => ({
          slug: b.slug,
          error: b.error,
        })),
      })
    );
  }

  return NextResponse.json({ summary, results });
}
