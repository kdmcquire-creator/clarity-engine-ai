import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/cron-auth";
import { posts } from "@/lib/blog";

const STALE_DAYS = parseInt(process.env.STALE_DAYS || "90", 10);

interface StalePostReport {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  daysSincePublished: number;
  reason: string;
}

export async function POST(request: Request) {
  const authError = verifyCronAuth(request);
  if (authError) return authError;

  const now = new Date();
  const stalePosts: StalePostReport[] = [];

  for (const post of posts) {
    const publishDate = new Date(post.publishedAt);
    const daysSince = Math.floor(
      (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSince >= STALE_DAYS) {
      stalePosts.push({
        slug: post.slug,
        title: post.title,
        category: post.category,
        publishedAt: post.publishedAt,
        daysSincePublished: daysSince,
        reason: `Published ${daysSince} days ago (threshold: ${STALE_DAYS})`,
      });
    }
  }

  // Sort by staleness — oldest first
  stalePosts.sort((a, b) => b.daysSincePublished - a.daysSincePublished);

  const summary = {
    totalPosts: posts.length,
    staleCount: stalePosts.length,
    threshold: STALE_DAYS,
    generatedAt: now.toISOString(),
  };

  console.log(JSON.stringify({ type: "stale_queue_complete", summary }));

  // If SendGrid is configured, email the digest
  if (process.env.SENDGRID_API_KEY && stalePosts.length > 0) {
    try {
      const sgMail = await import("@sendgrid/mail");
      sgMail.default.setApiKey(process.env.SENDGRID_API_KEY);

      const staleList = stalePosts
        .map((p) => `- ${p.title} (${p.category}): ${p.reason}`)
        .join("\n");

      await sgMail.default.send({
        to: process.env.CONTACT_TO_EMAIL || "admin@clarity-engine.ai",
        from:
          process.env.SENDGRID_FROM_EMAIL || "noreply@clarity-engine.ai",
        subject: `[Clarity Engine AI] ${stalePosts.length} posts need review`,
        text: `Stale Content Queue Report\n\n${summary.staleCount} posts need attention:\n\n${staleList}\n\nGenerated: ${summary.generatedAt}`,
      });

      console.log(
        JSON.stringify({ type: "stale_queue_email_sent", to: process.env.CONTACT_TO_EMAIL })
      );
    } catch (err) {
      console.error(
        JSON.stringify({
          type: "stale_queue_email_error",
          error: err instanceof Error ? err.message : "Unknown",
        })
      );
    }
  }

  return NextResponse.json({ summary, stalePosts });
}
