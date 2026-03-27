import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO & Content Marketing Blog",
  description:
    "Free guides on SEO strategy, keyword research, technical SEO, and content marketing. Written by practitioners, not content farms.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1
              className="text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              SEO &amp; Content Marketing Blog
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Actionable guides written for marketers who want results, not
              theory.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-cyan-400 font-medium bg-cyan-400/10 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-white/30">
                    {post.readingTime} min read
                  </span>
                </div>
                <h2 className="font-bold text-white group-hover:text-cyan-400 transition mb-2 leading-snug text-lg flex-1">
                  {post.title}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-white/30 mt-auto">
                  <span>{post.author}</span>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
