import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Copy, Download } from "lucide-react";
import { toast } from "sonner";

interface KeywordResult {
  keyword: string;
  count: number;
  density: number;
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");
  const [minLength, setMinLength] = useState(3);
  const [results, setResults] = useState<KeywordResult[]>([]);
  const [wordCount, setWordCount] = useState(0);

  const analyzeKeywords = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    // Count total words
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const totalWords = words.length;
    setWordCount(totalWords);

    // Extract keywords (words longer than minLength)
    const keywordMap = new Map<string, number>();
    words.forEach((word) => {
      if (word.length >= minLength) {
        keywordMap.set(word, (keywordMap.get(word) || 0) + 1);
      }
    });

    // Calculate density and sort
    const keywordResults: KeywordResult[] = Array.from(keywordMap.entries())
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: (count / totalWords) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50); // Top 50 keywords

    setResults(keywordResults);
    toast.success(`Analyzed ${totalWords} words`);
  };

  const downloadResults = () => {
    if (results.length === 0) {
      toast.error("No results to download");
      return;
    }

    const csv = [
      ["Keyword", "Count", "Density (%)"],
      ...results.map((r) => [r.keyword, r.count, r.density.toFixed(2)]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keyword-density-report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Report downloaded");
  };

  const copyToClipboard = () => {
    const text = results
      .map((r) => `${r.keyword}: ${r.count} (${r.density.toFixed(2)}%)`)
      .join("\n");
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
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
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Keyword Density Checker
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Analyze keyword frequency and density in your content. Optimize for SEO while maintaining natural readability.
            </p>
            <p className="text-slate-600">
              Keyword density is the percentage of times a keyword appears in your content relative to the total word count. Finding the right balance is crucial for SEO—too low and search engines won't recognize your topic, too high and you'll be penalized for keyword stuffing. The ideal keyword density is typically between 1-3% for your primary keyword. This tool analyzes your content and shows you exactly how often each keyword appears, helping you optimize without overdoing it. You can also identify which keywords appear most frequently and adjust your content strategy accordingly.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-white border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Paste Your Content</h2>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your article, blog post, or any text content here..."
                  rows={10}
                  className="mb-4"
                />

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Minimum Word Length
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={minLength}
                      onChange={(e) => setMinLength(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={analyzeKeywords}
                      className="bg-blue-600 hover:bg-blue-700 w-full"
                    >
                      Analyze
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Results */}
              {results.length > 0 && (
                <Card className="p-6 bg-white border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Top Keywords ({results.length})
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                      <Button
                        onClick={downloadResults}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-slate-900">
                            Keyword
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-slate-900">
                            Count
                          </th>
                          <th className="text-center py-3 px-4 font-semibold text-slate-900">
                            Density %
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((result, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-slate-100 hover:bg-slate-50 transition"
                          >
                            <td className="py-3 px-4 text-slate-700">{result.keyword}</td>
                            <td className="text-center py-3 px-4 text-slate-700">
                              {result.count}
                            </td>
                            <td className="text-center py-3 px-4">
                              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                {result.density.toFixed(2)}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              {wordCount > 0 && (
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Content Stats</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Total Words</p>
                      <p className="text-2xl font-bold text-blue-600">{wordCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Unique Keywords</p>
                      <p className="text-2xl font-bold text-blue-600">{results.length}</p>
                    </div>
                    {results.length > 0 && (
                      <div>
                        <p className="text-sm text-slate-600">Top Keyword Density</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {results[0].density.toFixed(2)}%
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Tips Card */}
              <Card className="p-6 bg-white border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">SEO Tips</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Aim for 1-3% keyword density for your primary keyword</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Avoid keyword stuffing - focus on natural readability</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Use semantic variations and related keywords</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Longer content naturally has lower keyword density</span>
                  </li>
                </ul>
              </Card>

              {/* CTA Card */}
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  Want Advanced Analysis?
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Get detailed SEO insights with Surfer SEO or SEMrush.
                </p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  Learn More
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
