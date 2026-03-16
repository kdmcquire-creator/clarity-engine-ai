import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, AlertCircle, CheckCircle, Zap } from "lucide-react";
import { toast } from "sonner";

interface TitleAnalysis {
  title: string;
  length: number;
  score: number;
  issues: string[];
  suggestions: string[];
  preview: {
    desktop: string;
    mobile: string;
  };
}

export default function TitleTagOptimizer() {
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [analysis, setAnalysis] = useState<TitleAnalysis | null>(null);

  const analyzeTitleTag = () => {
    if (!title.trim()) {
      toast.error("Please enter a title tag");
      return;
    }

    const length = title.length;
    const issues: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Length checks
    if (length < 30) {
      issues.push("Title is too short (under 30 characters)");
      suggestions.push("Expand your title to include more descriptive keywords");
      score -= 20;
    } else if (length > 60) {
      issues.push("Title may be truncated in search results (over 60 characters)");
      suggestions.push("Consider shortening to 50-60 characters for optimal display");
      score -= 15;
    } else {
      suggestions.push("Title length is optimal for search results");
    }

    // Keyword checks
    if (keyword && !title.toLowerCase().includes(keyword.toLowerCase())) {
      issues.push("Primary keyword not found in title");
      suggestions.push(`Include "${keyword}" naturally in your title`);
      score -= 25;
    } else if (keyword) {
      suggestions.push("Primary keyword is included in title");
    }

    // Brand check
    if (!title.includes("|") && !title.includes("-")) {
      suggestions.push("Consider adding a separator (| or -) and brand name");
    }

    // Duplicate word check
    const words = title.toLowerCase().split(/\s+/);
    const duplicates = words.filter((word, index) => words.indexOf(word) !== index);
    if (duplicates.length > 0) {
      issues.push("Title contains duplicate words");
      score -= 10;
    }

    // Desktop preview (typically 50-60 chars visible)
    const desktopPreview = length > 60 ? title.substring(0, 57) + "..." : title;
    // Mobile preview (typically 40 chars visible)
    const mobilePreview = length > 40 ? title.substring(0, 37) + "..." : title;

    setAnalysis({
      title,
      length,
      score: Math.max(0, score),
      issues,
      suggestions,
      preview: {
        desktop: desktopPreview,
        mobile: mobilePreview,
      },
    });

    toast.success("Analysis complete!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            SEO Toolkit
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">
              Tools
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">
              About
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/tools">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition">
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Title Tag Optimizer
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Craft compelling title tags that rank higher and get more clicks. Optimize for both search engines and users.
            </p>
            <p className="text-slate-600">
              Your title tag is the first thing users see in search results, and it's one of the most important on-page SEO factors. A well-optimized title tag should include your primary keyword, be between 50-60 characters to avoid truncation, and clearly communicate what the page is about. This tool analyzes your title tags and provides specific recommendations to improve click-through rates and search rankings. It checks for keyword inclusion, optimal length, and formatting best practices to ensure your titles stand out in search results.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white border-slate-200 mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Enter Your Title</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Title Tag
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Your page title here"
                      maxLength={100}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      {title.length}/100 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Primary Keyword (Optional)
                    </label>
                    <Input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Your main keyword"
                    />
                  </div>

                  <Button
                    onClick={analyzeTitleTag}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Analyze Title Tag
                  </Button>
                </div>
              </Card>

              {/* Results */}
              {analysis && (
                <Card className="p-6 bg-white border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Analysis Results</h2>

                  {/* Preview */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-600 mb-2 font-semibold">DESKTOP PREVIEW</p>
                    <p className="text-sm text-slate-900 mb-4 truncate">{analysis.preview.desktop}</p>

                    <p className="text-xs text-slate-600 mb-2 font-semibold">MOBILE PREVIEW</p>
                    <p className="text-sm text-slate-900 truncate">{analysis.preview.mobile}</p>
                  </div>

                  {/* Issues */}
                  {analysis.issues.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-slate-900 mb-3">Issues Found</h3>
                      <ul className="space-y-2">
                        {analysis.issues.map((issue, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-slate-700">
                            <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Recommendations</h3>
                    <ul className="space-y-2">
                      {analysis.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-slate-700">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {analysis && (
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <p className="text-sm text-slate-600 mb-2">Optimization Score</p>
                  <p className="text-5xl font-bold text-blue-600 mb-3">{analysis.score}</p>
                  <p className="text-xs text-slate-600">
                    {analysis.score >= 80
                      ? "Excellent title tag!"
                      : analysis.score >= 60
                      ? "Good, but can be improved"
                      : "Needs optimization"}
                  </p>
                </Card>
              )}

              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  Best Practices
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• 50-60 characters optimal</li>
                  <li>• Include primary keyword</li>
                  <li>• Put keyword near start</li>
                  <li>• Make it compelling</li>
                  <li>• Avoid keyword stuffing</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Need More Optimization?
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Combine with our Meta Tag Generator for complete optimization.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Explore Tools
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-16">
        <div className="container text-center">
          <p>&copy; 2026 SEO Toolkit. All rights reserved. Built by a team of SEO experts.</p>
        </div>
      </footer>
    </div>
  );
}
