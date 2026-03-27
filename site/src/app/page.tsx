import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tools } from "@/lib/tools";
import { posts } from "@/lib/blog";

export default function HomePage() {
  const featuredTools = tools.slice(0, 6);
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
          <div className="absolute top-20 left-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl" />
          <div className="container mx-auto relative text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6 text-sm text-white/70">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              17 Free SEO Tools — No Login Required
            </div>
            <h1
              className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Your Free SEO
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Command Center
              </span>
            </h1>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
              17 professional-grade SEO tools, completely free. Analyze
              keywords, generate schemas, simulate SERPs, check readability —
              no account needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools/"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition text-lg"
              >
                Explore All Tools →
              </Link>
              <Link
                href="/blog/"
                className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition text-lg"
              >
                Read the Blog
              </Link>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Popular Free Tools
              </h2>
              <p className="text-white/50">
                No signup. No credit card. Just results.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}/`}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-600/50 rounded-2xl p-6 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white group-hover:text-cyan-400 transition">
                      {tool.name}
                    </h3>
                    {tool.isFrontendOnly && (
                      <span className="text-xs bg-green-900/40 text-green-400 border border-green-800/50 px-2 py-0.5 rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {tool.shortDesc}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/tools/"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition"
              >
                See all 17 tools →
              </Link>
            </div>
          </div>
        </section>

        {/* Why CE */}
        <section className="py-20 px-4 bg-navy-800/50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Why Clarity Engine?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "⚡",
                  title: "Instant Results",
                  desc: "No loading spinners. Frontend tools compute results in milliseconds, right in your browser.",
                },
                {
                  icon: "🔒",
                  title: "No Account Needed",
                  desc: "We believe SEO tools should be free and accessible. Zero sign-up friction, ever.",
                },
                {
                  icon: "🎯",
                  title: "Built for Marketers",
                  desc: "Tools designed by content marketers who actually use them. Clean outputs you can act on.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog preview */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Latest from the Blog
              </h2>
              <Link
                href="/blog/"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
              >
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}/`}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all"
                >
                  <span className="text-xs text-cyan-400 font-medium mb-2 block">
                    {post.category}
                  </span>
                  <h3 className="font-semibold text-white group-hover:text-cyan-400 transition mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-xs text-white/30">
                    {post.readingTime} min read
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
