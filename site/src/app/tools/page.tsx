import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { tools, toolCategories } from "@/lib/tools";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "17 Free SEO Tools",
  description:
    "Free keyword density checker, meta tag generator, SERP simulator, readability scorer, and 13 more SEO tools. No account required.",
};

export default function ToolsPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1
              className="text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              17 Free SEO Tools
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Professional-grade SEO tools, completely free. No login, no
              credit card, no limits.
            </p>
          </div>

          {toolCategories.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat.slug);
            if (catTools.length === 0) return null;
            return (
              <div key={cat.slug} className="mb-12">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.name}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}/`}
                      className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-600/50 rounded-xl p-5 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white group-hover:text-cyan-400 transition text-sm">
                          {tool.name}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            tool.isFrontendOnly
                              ? "bg-green-900/40 text-green-400 border border-green-800/50"
                              : "bg-blue-900/40 text-blue-400 border border-blue-800/50"
                          }`}
                        >
                          {tool.isFrontendOnly ? "Free" : "AI"}
                        </span>
                      </div>
                      <p className="text-white/50 text-xs leading-relaxed">
                        {tool.shortDesc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
