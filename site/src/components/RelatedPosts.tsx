import Link from "next/link";
import { posts, type BlogPost } from "@/lib/blog";

interface RelatedPostsProps {
  currentSlug: string;
  currentCategory: string;
  currentTags: string[];
}

export default function RelatedPosts({
  currentSlug,
  currentCategory,
  currentTags,
}: RelatedPostsProps) {
  // Score each post by relevance: same category = 3, shared tag = 1 each
  const scored = posts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      let score = 0;
      if (post.category === currentCategory) score += 3;
      for (const tag of post.tags) {
        if (currentTags.includes(tag)) score += 1;
      }
      return { post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const related: BlogPost[] = scored.map((s) => s.post);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2
        className="text-xl font-bold text-white mb-4"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        You Might Also Like
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-600/50 rounded-xl p-4 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-cyan-400 font-medium bg-cyan-400/10 px-2 py-0.5 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-white/30">
                {post.readingTime} min read
              </span>
            </div>
            <h3 className="font-medium text-white group-hover:text-cyan-400 transition text-sm leading-snug mb-1">
              {post.title}
            </h3>
            <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/blog/"
          className="text-sm font-medium text-cyan-400 hover:underline"
        >
          View all articles &rarr;
        </Link>
      </div>
    </section>
  );
}
