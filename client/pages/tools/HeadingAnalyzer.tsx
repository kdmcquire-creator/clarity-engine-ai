import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface HeadingAnalysis {
  h1Count: number;
  h2Count: number;
  h3Count: number;
  h4Count: number;
  h5Count: number;
  h6Count: number;
  issues: string[];
  score: number;
}

export default function HeadingAnalyzer() {
  const [html, setHtml] = useState("");
  const [analysis, setAnalysis] = useState<HeadingAnalysis | null>(null);

  const analyzeHeadings = () => {
    if (!html.trim()) {
      toast.error("Please paste your HTML content");
      return;
    }

    // Parse headings from HTML
    const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
    const h2Matches = html.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
    const h3Matches = html.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [];
    const h4Matches = html.match(/<h4[^>]*>(.*?)<\/h4>/gi) || [];
    const h5Matches = html.match(/<h5[^>]*>(.*?)<\/h5>/gi) || [];
    const h6Matches = html.match(/<h6[^>]*>(.*?)<\/h6>/gi) || [];

    const issues: string[] = [];
    let score = 100;

    if (h1Matches.length === 0) {
      issues.push("Missing H1 tag - every page should have exactly one H1");
      score -= 30;
    } else if (h1Matches.length > 1) {
      issues.push(`Multiple H1 tags found (${h1Matches.length}) - use only one per page`);
      score -= 20;
    }

    if (h2Matches.length === 0 && h1Matches.length > 0) {
      issues.push("No H2 tags found - use H2 for main sections");
      score -= 15;
    }

    if (h3Matches.length === 0 && h2Matches.length > 0) {
      issues.push("No H3 tags found - use H3 for subsections");
      score -= 10;
    }

    // Check for skipped heading levels
    if (h1Matches.length > 0 && h2Matches.length === 0 && (h3Matches.length > 0 || h4Matches.length > 0)) {
      issues.push("Heading hierarchy is broken - skipping from H1 to H3/H4");
      score -= 15;
    }

    if (h2Matches.length > 0 && h3Matches.length === 0 && (h4Matches.length > 0 || h5Matches.length > 0)) {
      issues.push("Heading hierarchy is broken - skipping from H2 to H4/H5");
      score -= 10;
    }

    if (issues.length === 0) {
      issues.push("Excellent heading structure! Your hierarchy is properly organized.");
    }

    setAnalysis({
      h1Count: h1Matches.length,
      h2Count: h2Matches.length,
      h3Count: h3Matches.length,
      h4Count: h4Matches.length,
      h5Count: h5Matches.length,
      h6Count: h6Matches.length,
      issues,
      score: Math.max(0, score),
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
              Heading Structure Analyzer
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Analyze your page's heading hierarchy to ensure proper SEO structure. Correct heading usage helps search engines understand your content and improves accessibility for all users.
            </p>
            <p className="text-slate-600">
              Headings are crucial for both SEO and user experience. Search engines use heading tags (H1-H6) to understand the structure and hierarchy of your content. A proper heading structure should have one H1 tag per page (your main topic), followed by H2 tags for major sections, H3 tags for subsections, and so on. Skipping heading levels or using multiple H1 tags confuses search engines and hurts your rankings. This tool analyzes your HTML and identifies structural issues to help you optimize your heading hierarchy.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white border-slate-200 mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Paste Your HTML</h2>
                <Textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  placeholder="Paste your page's HTML code here..."
                  rows={8}
                  className="mb-4"
                />
                <Button
                  onClick={analyzeHeadings}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Analyze Headings
                </Button>
              </Card>

              {/* Results */}
              {analysis && (
                <Card className="p-6 bg-white border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Analysis Results</h2>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3 bg-slate-50 rounded text-center">
                      <p className="text-xs text-slate-600">H1 Tags</p>
                      <p className="text-2xl font-bold text-slate-900">{analysis.h1Count}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded text-center">
                      <p className="text-xs text-slate-600">H2 Tags</p>
                      <p className="text-2xl font-bold text-slate-900">{analysis.h2Count}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded text-center">
                      <p className="text-xs text-slate-600">H3+ Tags</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {analysis.h3Count + analysis.h4Count + analysis.h5Count + analysis.h6Count}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Issues & Recommendations</h3>
                    <ul className="space-y-2">
                      {analysis.issues.map((issue, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-slate-700">
                          {issue.includes("Excellent") ? (
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          )}
                          <span>{issue}</span>
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
                  <p className="text-sm text-slate-600 mb-2">Structure Score</p>
                  <p className="text-5xl font-bold text-blue-600 mb-3">{analysis.score}</p>
                  <p className="text-xs text-slate-600">
                    {analysis.score >= 80
                      ? "Excellent structure!"
                      : analysis.score >= 60
                      ? "Good structure with improvements needed"
                      : "Significant issues to fix"}
                  </p>
                </Card>
              )}

              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="font-semibold text-slate-900 mb-3">Best Practices</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>✓ One H1 per page</li>
                  <li>✓ Use H2 for main sections</li>
                  <li>✓ Use H3 for subsections</li>
                  <li>✓ Don't skip levels</li>
                  <li>✓ Include keywords naturally</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Need More Tools?
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Combine with other SEO tools for comprehensive optimization.
                </p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  Explore All Tools
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
