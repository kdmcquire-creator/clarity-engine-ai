import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Calendar, User, MessageCircle, ArrowRight } from "lucide-react";

export default function Blog() {
  const articlesQuery = trpc.articles.list.useQuery();
  const articles = articlesQuery.data || [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">SEO Toolkit</Link>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">Tools</Link>
            <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition font-semibold">Blog</Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">About</Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            SEO & Content Marketing Insights
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Expert articles, tips, and strategies to help you master SEO, improve your content, and grow your online presence.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container py-24 flex-1">
        {articlesQuery.isLoading ? (
          <div className="text-center py-16">
            <div className="text-slate-600">Loading articles...</div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-slate-600 mb-4">No articles published yet.</div>
            <p className="text-slate-500">Check back soon for expert SEO insights and strategies.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <Card className="h-full p-6 bg-white border-slate-200 hover:shadow-lg hover:border-blue-300 transition cursor-pointer group">
                  <div className="flex flex-col h-full">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                        Article
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    {article.excerpt && (
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{article.authorName || "Editorial Team"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Recently"}
                        </span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition">
                      Read More <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get the latest SEO tips, tool updates, and marketing strategies delivered to your inbox.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 rounded-lg text-slate-900"
            />
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-12">
        <div className="container text-center">
          <p>&copy; 2026 SEO Toolkit. All rights reserved. Built by a team of SEO experts.</p>
        </div>
      </footer>
    </div>
  );
}
