import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Tool() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setResults({ status: "analyzed", data: input });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">SEO Toolkit</Link>
          <div className="flex items-center gap-6">
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">Tools</Link>
            <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition">Resources</Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">About</Link>
          </div>
        </div>
      </nav>

      <div className="container py-12">
        <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Link>

        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">SEO Analysis Tool</h1>
          
          <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 mb-8">
            <p className="text-slate-600 mb-6 leading-relaxed">
              This powerful analysis tool helps you optimize your SEO strategy with detailed insights and actionable recommendations. Get comprehensive data to improve your search rankings and online visibility.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Use this tool to identify opportunities, track performance metrics, and stay ahead of your competition. Our analysis provides the insights you need to make data-driven decisions for your digital marketing strategy.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Enter URL or Domain</label>
                <Input
                  placeholder="example.com"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                />
              </div>
              <Button onClick={handleAnalyze} className="bg-blue-600 hover:bg-blue-700">
                Analyze
              </Button>
            </div>
          </div>

          {results && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Analysis Results</h3>
              <p className="text-slate-600">Analysis complete for: {results.data}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
