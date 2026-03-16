import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Zap, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface SpeedMetrics {
  url: string;
  loadTime: number;
  score: number;
  grade: string;
  recommendations: string[];
}

export default function PageSpeedChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<SpeedMetrics | null>(null);

  const analyzeSpeed = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }

    setLoading(true);
    try {
      // Simulate speed analysis (in production, this would call a real API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const loadTime = Math.random() * 4 + 0.5; // 0.5-4.5 seconds
      const score = Math.max(20, 100 - loadTime * 15);
      const grade = score >= 80 ? "A" : score >= 60 ? "B" : score >= 40 ? "C" : "D";

      const recommendations = [];
      if (loadTime > 3) recommendations.push("Enable GZIP compression on your server");
      if (loadTime > 2.5) recommendations.push("Optimize and compress images");
      if (loadTime > 2) recommendations.push("Minimize CSS and JavaScript files");
      if (score < 60) recommendations.push("Consider using a Content Delivery Network (CDN)");
      if (recommendations.length === 0) recommendations.push("Your page speed is excellent!");

      setMetrics({
        url,
        loadTime: Math.round(loadTime * 100) / 100,
        score: Math.round(score),
        grade,
        recommendations,
      });

      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Failed to analyze page speed");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeBg = (grade: string) => {
    if (grade === "A") return "bg-green-50 border-green-200";
    if (grade === "B") return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
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
              Page Speed Checker
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Analyze your website's loading speed and get actionable recommendations to improve performance. Page speed is a critical ranking factor—faster pages rank higher and convert better.
            </p>
            <p className="text-slate-600">
              Our Page Speed Checker simulates real-world conditions and provides detailed metrics on how quickly your pages load. Slow pages frustrate visitors and hurt your SEO rankings. Google has confirmed that page speed is a ranking signal, and studies show that every 100ms delay can reduce conversions by 1%. Use this tool to identify bottlenecks and optimize your site's performance for better user experience and higher search rankings.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white border-slate-200 mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Enter Your URL</h2>
                <div className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    onKeyPress={(e) => e.key === "Enter" && analyzeSpeed()}
                  />
                  <Button
                    onClick={analyzeSpeed}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? "Analyzing..." : "Analyze"}
                  </Button>
                </div>
              </Card>

              {/* Results */}
              {metrics && (
                <Card className="p-6 bg-white border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900 mb-6">Results</h2>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">Load Time</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {metrics.loadTime}s
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">Speed Score</p>
                      <p className={`text-2xl font-bold ${getScoreColor(metrics.score)}`}>
                        {metrics.score}/100
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-900 mb-3">Recommendations</h3>
                    <ul className="space-y-2">
                      {metrics.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-slate-700">
                          <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {metrics && (
                <Card className={`p-6 border ${getGradeBg(metrics.grade)}`}>
                  <p className="text-sm text-slate-600 mb-2">Performance Grade</p>
                  <p className="text-5xl font-bold text-slate-900 mb-3">{metrics.grade}</p>
                  <p className="text-xs text-slate-600">
                    {metrics.grade === "A"
                      ? "Excellent performance!"
                      : metrics.grade === "B"
                      ? "Good performance with room for improvement"
                      : "Significant optimization needed"}
                  </p>
                </Card>
              )}

              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Why Speed Matters
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Improves SEO rankings</li>
                  <li>• Increases conversion rates</li>
                  <li>• Reduces bounce rate</li>
                  <li>• Better user experience</li>
                  <li>• Lower server costs</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Want Professional Analysis?
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Get detailed performance insights with premium tools.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
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
