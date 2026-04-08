import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteGroundBanner from "@/components/SiteGroundBanner";
import SiteGroundLeaderboard from "@/components/SiteGroundLeaderboard";
import { NordVPNLeaderboard } from "@/components/NordVPNLeaderboard";
import SidebarAmazon from "@/components/SidebarAmazon";
import { posts, getPostBySlug, postContent } from "@/lib/blog";
import RelatedPosts from "@/components/RelatedPosts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

/** Convert markdown-style [text](url) links in a string to inline <a> elements. */
function parseLinks(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      const isInternal = match[2].startsWith("/");
      return (
        <a
          key={i}
          href={match[2]}
          {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="text-cyan-400 hover:underline font-medium"
        >
          {match[1]}
        </a>
      );
    }
    return part;
  });
}

function renderContent(md: string) {
  const lines = md.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="text-2xl font-bold text-white mt-8 mb-3"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      const text = line.slice(2, -2);
      elements.push(
        <p key={i} className="text-white font-semibold mt-4 mb-1">
          {text}
        </p>
      );
    } else if (line.match(/^\*\*\d+\./)) {
      const text = line.replace(/\*\*/g, "");
      elements.push(
        <p key={i} className="text-white font-semibold mt-4 mb-1">
          {text}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 mb-4 text-white/70">
          {items.map((item, j) => (
            <li key={j}>{parseLinks(item)}</li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      // Inline bold + link rendering
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j} className="text-white font-semibold">{parseLinks(part.slice(2, -2))}</strong>;
        }
        return <span key={j}>{parseLinks(part)}</span>;
      });
      elements.push(
        <p key={i} className="text-white/70 leading-relaxed mb-3">
          {rendered}
        </p>
      );
    }
    i++;
  }

  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = postContent[post.slug] || "";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "Clarity Engine AI", url: "https://clarity-engine.ai" },
    publisher: { "@type": "Organization", name: "Clarity Engine AI", url: "https://clarity-engine.ai" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://clarity-engine.ai/blog/${post.slug}/` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://clarity-engine.ai" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://clarity-engine.ai/blog/" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://clarity-engine.ai/blog/${post.slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        <div className="lg:col-span-2">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
            <Link href="/blog/" className="hover:text-white transition">
              Blog
            </Link>
            <span>/</span>
            <span className="text-white/60 truncate">{post.title}</span>
          </div>

          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-cyan-400 font-medium bg-cyan-400/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-white/30">{post.readingTime} min read</span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {post.title}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-4">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-white/30 border-t border-white/10 pt-4">
              <span>{post.author}</span>
              <span>·</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>·</span>
              <div className="flex gap-1">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white/5 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Leaderboard above article */}
          <SiteGroundLeaderboard />

          {/* Article body */}
          <article className="prose prose-invert max-w-none">
            {renderContent(content)}
          </article>

          {/* SiteGround banner */}
          <SiteGroundBanner />

          {/* Post-article sponsor */}
          <NordVPNLeaderboard />

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-blue-900/40 to-navy-800 border border-blue-800/40 rounded-2xl p-6 text-center">
            <h3
              className="text-xl font-bold text-white mb-2"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Put this into practice
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Use our free SEO tools to apply what you just learned — no signup required.
            </p>
            <Link
              href="/tools/"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Explore All 17 Tools →
            </Link>
          </div>

          {/* Related posts */}
          <RelatedPosts
            currentSlug={post.slug}
            currentCategory={post.category}
            currentTags={post.tags}
          />
        </div>{/* lg:col-span-2 */}

          {/* Sidebar — sticky */}
          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-6 space-y-6">
              <SidebarAmazon />
            </div>
          </aside>

        </div>{/* lg:grid */}
        </div>{/* max-w-6xl */}
      </main>
      <Footer />
    </>
  );
}
