import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, AlertCircle, CheckCircle, Link2 } from "lucide-react";
import { toast } from "sonner";

interface URLAnalysis {
  url: string;
  issues: string[];
  suggestions: string[];
  score: number;
  structure: {
    protocol: string;
    domain: string;
    path: string;
    parameters: string;
  };
}

export default function URLStructureAnalyzer() {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState<URLAnalysis | null>(null);

  const analyzeURL = () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
      const issues: string[] = [];
      const suggestions: string[] = [];
      let score = 100;

      // Parse URL structure
      const protocol = urlObj.protocol.replace(":", "");
      const domain = urlObj.hostname;
      const path = urlObj.pathname;
      const parameters = urlObj.search;

      // Check for HTTPS
      if (protocol !== "https") {
        issues.push("Not using HTTPS - security and SEO issue");
        suggestions.push("Migrate to HTTPS for better security and rankings");
        score -= 20;
      } else {
        suggestions.push("Using HTTPS - excellent for security and SEO");
      }

      // Check URL length
      if (url.length > 75) {
        issues.push("URL is too long (over 75 characters)");
        suggestions.push("Shorten your URL for better shareability and readability");
        score -= 15;
      } else {
        suggestions.push("URL length is optimal");
      }

      // Check for readable keywords
      const pathSegments = path.split("/").filter((s) => s);
      const hasKeywords = pathSegments.some((segment) => segment.length > 3);
      if (!hasKeywords) {
        issues.push("URL lacks descriptive keywords");
        suggestions.push("Include relevant keywords in your URL path");
        score -= 15;
      } else {
        suggestions.push("URL contains descriptive keywords");
      }

      // Check for special characters
      const specialChars = url.match(/[^a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]/g);
      if (specialChars && specialChars.length > 0) {
        issues.push("URL contains special characters that may cause issues");
        suggestions.push("Use only hyphens for word separation, avoid underscores");
        score -= 10;
      }

      // Check for parameters
      if (parameters) {
        issues.push("URL contains query parameters");
        suggestions.push("Consider using URL rewriting to hide parameters from users");
        score -= 5;
      }

      // Check for lowercase
      if (url !== url.toLowerCase()) {
        issues.push("URL contains uppercase letters");
        suggestions.push("Use lowercase URLs for consistency and to avoid duplicate content");
        score -= 5;
      }

      // Check for hyphens vs underscores
      if (path.includes("_")) {
        issues.push("URL uses underscores instead of hyphens");
        suggestions.push("Replace underscores with hyphens for better SEO");
        score -= 5;
      }

      if (issues.length === 0) {
        suggestions.push("Your URL structure follows SEO best practices!");
      }

      setAnalysis({
        url,
        issues,
        suggestions,
        score: Math.max(0, score),
        structure: {
          protocol,
          domain,
          path: path || "/",
          parameters: parameters || "None",
        },
      });

      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Invalid URL format");
    }
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
              URL Structure Analyzer
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Analyze your URL structure for SEO best practices. Clean, descriptive URLs improve rankings and user experience.
            </p>
            <p className="text-slate-600">
              Your URL structure is one of the first things search engines evaluate when crawling your site. A well-structured URL should be short, descriptive, and use hyphens to separate words. It should also use HTTPS, avoid special characters, and include relevant keywords that describe the page content. This tool analyzes your URL and identifies issues that could hurt your SEO performance, then provides specific recommendations to improve your URL structure. Remember: users should be able to understand what a page is about just by looking at the URL.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white border-slate-200 mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Enter Your URL</h2>

                <div className="space-y-4">
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/your-page-url"
                    onKeyPress={(e) => e.key === "Enter" && analyzeURL()}
                  />
                  <Button
                    onClick={analyzeURL}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Analyze URL
                  </Button>
                </div>
              </Card>

              {/* Results */}
              {analysis && (
                <Card className="p-6 bg-white border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Analysis Results</h2>

                  {/* Structure Breakdown */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-600 mb-3 font-semibold">URL STRUCTURE</p>
                    <div className="space-y-2 text-sm font-mono text-slate-700">
                      <p>
                        <span className="text-slate-500">Protocol:</span> {analysis.structure.protocol}
                      </p>
                      <p>
                        <span className="text-slate-500">Domain:</span> {analysis.structure.domain}
                      </p>
                      <p>
                        <span className="text-slate-500">Path:</span> {analysis.structure.path}
                      </p>
                      <p>
                        <span className="text-slate-500">Parameters:</span> {analysis.structure.parameters}
                      </p>
                    </div>
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
                  <p className="text-sm text-slate-600 mb-2">URL Score</p>
                  <p className="text-5xl font-bold text-blue-600 mb-3">{analysis.score}</p>
                  <p className="text-xs text-slate-600">
                    {analysis.score >= 80
                      ? "Excellent URL structure!"
                      : analysis.score >= 60
                      ? "Good structure with improvements"
                      : "Needs optimization"}
                  </p>
                </Card>
              )}

              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-green-600" />
                  SEO Best Practices
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Use HTTPS always</li>
                  <li>• Keep URLs short</li>
                  <li>• Use hyphens, not underscores</li>
                  <li>• Include keywords</li>
                  <li>• Use lowercase letters</li>
                  <li>• Avoid special characters</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Complete Your Audit
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Use our other tools to optimize your entire site.
                </p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  View All Tools
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
