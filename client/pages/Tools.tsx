import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Code, BarChart3, FileText, Zap, Link2, Eye, Lightbulb, CheckCircle, Layers, Gauge, Brain, BookOpen, Settings, Zap as ZapIcon, X } from "lucide-react";
import { useState, useMemo } from "react";
import { AdSenseSlot } from "@/components/AdSenseSlot";
import { AdSenseVerification } from "@/components/AdSenseVerification";

const toolsByCategory = {
  "Content Analysis": [
    {
      id: "keyword-density",
      name: "Keyword Density Checker",
      description: "Analyze keyword frequency in your content to ensure optimal SEO without over-optimization.",
      icon: <Search className="h-8 w-8" />,
      path: "/tools/keyword-density",
      difficulty: "beginner"
    },
    {
      id: "readability-score",
      name: "Readability Score Calculator",
      description: "Measure content readability and get suggestions for improvement.",
      icon: <Eye className="h-8 w-8" />,
      path: "/tools/readability-score",
      difficulty: "beginner"
    },
    {
      id: "content-gap",
      name: "Content Gap Analyzer",
      description: "Discover content gaps between your site and competitors' top-ranking pages.",
      icon: <BarChart3 className="h-8 w-8" />,
      path: "/tools/content-gap-analyzer",
      difficulty: "intermediate"
    },
    {
      id: "duplicate-content",
      name: "Duplicate Content Detector",
      description: "Identify duplicate content issues that may harm your SEO rankings.",
      icon: <CheckCircle className="h-8 w-8" />,
      path: "/tools/duplicate-content-detector",
      difficulty: "beginner"
    },
  ],
  "Technical SEO": [
    {
      id: "schema-markup",
      name: "Schema Markup Generator",
      description: "Generate structured data markup to enhance your search engine visibility.",
      icon: <Layers className="h-8 w-8" />,
      path: "/tools/schema-markup",
      difficulty: "advanced"
    },
    {
      id: "heading-analyzer",
      name: "Heading Structure Analyzer",
      description: "Analyze your heading hierarchy and ensure proper H1-H6 structure.",
      icon: <FileText className="h-8 w-8" />,
      path: "/tools/heading-analyzer",
      difficulty: "beginner"
    },
    {
      id: "url-analyzer",
      name: "URL Structure Analyzer",
      description: "Analyze and improve your URL structure for better SEO performance.",
      icon: <Settings className="h-8 w-8" />,
      path: "/tools/url-analyzer",
      difficulty: "intermediate"
    },
    {
      id: "internal-links",
      name: "Internal Link Analyzer",
      description: "Get suggestions for internal linking opportunities to improve site structure.",
      icon: <Zap className="h-8 w-8" />,
      path: "/tools/internal-link-analyzer",
      difficulty: "intermediate"
    },
  ],
  "Keyword Research": [
    {
      id: "keyword-research",
      name: "Keyword Research Tool",
      description: "Discover high-potential keywords for your niche with search volume and difficulty data.",
      icon: <Brain className="h-8 w-8" />,
      path: "/tools/keyword-research",
      difficulty: "intermediate"
    },
    {
      id: "serp-simulator",
      name: "SERP Simulator",
      description: "Preview how your page will appear in search results before publishing.",
      icon: <Eye className="h-8 w-8" />,
      path: "/tools/serp-simulator",
      difficulty: "beginner"
    },
  ],
  "Optimization": [
    {
      id: "meta-tag-generator",
      name: "Meta Tag Generator",
      description: "Generate compelling meta titles and descriptions optimized for search engines and CTR.",
      icon: <Code className="h-8 w-8" />,
      path: "/tools/meta-tag-generator",
      difficulty: "beginner"
    },
    {
      id: "title-optimizer",
      name: "Title Tag Optimizer",
      description: "Optimize your title tags for both search engines and user engagement.",
      icon: <Lightbulb className="h-8 w-8" />,
      path: "/tools/title-optimizer",
      difficulty: "beginner"
    },
    {
      id: "content-outline",
      name: "Content Outline Generator",
      description: "Generate SEO-optimized content outlines based on top-ranking pages.",
      icon: <BookOpen className="h-8 w-8" />,
      path: "/tools/content-outline-generator",
      difficulty: "intermediate"
    },
  ],
  "Performance & Competitive Analysis": [
    {
      id: "page-speed",
      name: "Page Speed Insights",
      description: "Analyze page load speed and get recommendations for improvement.",
      icon: <Gauge className="h-8 w-8" />,
      path: "/tools/page-speed",
      difficulty: "beginner"
    },
    {
      id: "mobile-friendliness",
      name: "Mobile Friendliness Checker",
      description: "Ensure your website is optimized for mobile devices and users.",
      icon: <ZapIcon className="h-8 w-8" />,
      path: "/tools/mobile-friendliness",
      difficulty: "beginner"
    },
    {
      id: "backlink-checker",
      name: "Backlink Checker",
      description: "Analyze your backlink profile and identify opportunities for link building.",
      icon: <Link2 className="h-8 w-8" />,
      path: "/tools/backlink-checker",
      difficulty: "intermediate"
    },
    {
      id: "competitor-analysis",
      name: "Competitor Analysis Tool",
      description: "Compare your SEO performance against competitors and identify opportunities.",
      icon: <BarChart3 className="h-8 w-8" />,
      path: "/tools/competitor-analysis",
      difficulty: "advanced"
    },
  ],
};

// Flatten tools for search
const allTools = Object.values(toolsByCategory).flat();

export default function Tools() {
  return (
    <>
      <AdSenseVerification />
      <ToolsContent />
    </>
  );
}

function ToolsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || 
        Object.entries(toolsByCategory).some(([cat, tools]) => 
          cat === selectedCategory && tools.some(t => t.id === tool.id)
        );
      const matchesDifficulty = !selectedDifficulty || tool.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const categories = Object.keys(toolsByCategory);
  const difficulties = ["beginner", "intermediate", "advanced"];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">Clarity Engine</Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition">Home</Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">About</Link>
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition font-semibold">Tools</Link>
            <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition">Resources</Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            17 Free SEO Tools to Rank Higher
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-4">
            Everything you need to optimize your website, analyze competitors, and dominate search rankings—all completely free.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our toolkit is organized into five categories: Content Analysis tools help you understand your current SEO performance and identify issues. Technical SEO tools ensure your site structure, URLs, and markup are search-engine friendly. Keyword Research tools help you discover keywords and content opportunities. Optimization tools let you improve your on-page elements like titles, meta tags, and content. Performance & Competitive Analysis tools measure speed, mobile-friendliness, backlinks, and competitor strategies.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search tools by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 text-base"
            />
          </div>

          {/* Filter Buttons */}
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">Category</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    !selectedCategory
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">Difficulty Level</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    !selectedDifficulty
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
                  }`}
                >
                  All Levels
                </button>
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                      selectedDifficulty === diff
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory || selectedDifficulty) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setSelectedDifficulty(null);
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Clear all filters
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-sm text-slate-600">
            Showing {filteredTools.length} of {allTools.length} tools
          </div>
        </div>
      </section>

      {/* Filtered Tools Grid */}
      <section className="container py-12">
        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No tools found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setSelectedDifficulty(null);
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <Link key={tool.id} href={tool.path}>
                <a className="block p-6 bg-white rounded-lg border border-slate-200 hover:shadow-lg hover:border-blue-300 transition group cursor-pointer h-full no-underline text-inherit">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-blue-600 group-hover:text-blue-700 transition">{tool.icon}</div>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-600 capitalize">
                      {tool.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-snug">{tool.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{tool.description}</p>
                  <span className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition">
                    Try Now <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 mt-12">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Start Optimizing Your SEO Today</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            All tools are completely free and require no credit card. Create an account to save your results and track progress over time.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
            Create Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-12">
        <div className="container text-center">
          <p>&copy; 2025 Clarity Engine. All rights reserved. Built by a team of SEO experts.</p>
        </div>
      </footer>
    </div>
  );
}
