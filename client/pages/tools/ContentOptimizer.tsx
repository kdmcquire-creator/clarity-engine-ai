import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import {
  Loader2,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Copy,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { optimizeContent } from "../../../server/contentOptimizer";

interface ScoreProps {
  score: number;
  label: string;
}

function ScoreCard({ score, label }: ScoreProps) {
  const getColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50";
    if (score >= 60) return "bg-yellow-50";
    return "bg-red-50";
  };

  return (
    <Card className={`p-6 text-center ${getBgColor(score)}`}>
      <div className={`text-4xl font-bold ${getColor(score)} mb-2`}>{score}</div>
      <div className="text-sm font-medium text-slate-600">{label}</div>
    </Card>
  );
}

export default function ContentOptimizer() {
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "readability" | "seo" | "engagement">("overview");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Please enter content to analyze");
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await optimizeContent(content, keyword || undefined);
      setAnalysis(result);
      toast.success("Content analyzed successfully!");
    } catch (error) {
      toast.error("Failed to analyze content");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyRecommendations = () => {
    if (!analysis) return;
    const text = `Content Optimization Report\n\nOverall Score: ${analysis.overallScore}/100\n\nNext Steps:\n${analysis.nextSteps.map((step: string, i: number) => `${i + 1}. ${step}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    toast.success("Recommendations copied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-slate-900">
            Clarity Engine
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/content-brief-generator" className="text-slate-600 hover:text-slate-900 transition">
              Brief Generator
            </Link>
            <Link to="/" className="text-slate-600 hover:text-slate-900 transition">
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="container max-w-6xl py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Content Optimizer</h1>
          </div>
          <p className="text-lg text-slate-600">AI-powered analysis and recommendations to improve your content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Analyze Content</h2>

              <form onSubmit={handleAnalyze} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Target Keyword (Optional)</label>
                  <Input
                    type="text"
                    placeholder="e.g., SEO best practices"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                  <Textarea
                    placeholder="Paste your content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-500 mt-2">{content.split(/\s+/).length} words</div>
                </div>

                <Button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze Content
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm">Pro Tip</h4>
                    <p className="text-xs text-blue-700 mt-1">Include a target keyword to get more specific SEO recommendations.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {!analysis ? (
              <Card className="p-12 text-center">
                <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Analysis Yet</h3>
                <p className="text-slate-600">Paste your content and click "Analyze Content" to get started.</p>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Scores Overview */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Optimization Scores</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <ScoreCard score={analysis.overallScore} label="Overall Score" />
                    <ScoreCard score={analysis.readabilityScore} label="Readability" />
                    <ScoreCard score={analysis.seoScore} label="SEO Score" />
                    <ScoreCard score={analysis.engagementScore} label="Engagement" />
                  </div>
                </div>

                {/* Tabs */}
                <div>
                  <div className="flex gap-2 border-b border-slate-200 mb-6">
                    {(["overview", "readability", "seo", "engagement"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 font-medium transition ${
                          activeTab === tab
                            ? "border-b-2 border-purple-600 text-purple-600"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      {/* Strengths */}
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          Strengths
                        </h3>
                        <ul className="space-y-2">
                          {analysis.strengths.map((strength: string, i: number) => (
                            <li key={i} className="flex gap-2 text-slate-700">
                              <span className="text-green-600 font-bold">✓</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Weaknesses */}
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                          Areas for Improvement
                        </h3>
                        <ul className="space-y-2">
                          {analysis.weaknesses.map((weakness: string, i: number) => (
                            <li key={i} className="flex gap-2 text-slate-700">
                              <span className="text-yellow-600 font-bold">!</span>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Next Steps */}
                      <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                          Prioritized Next Steps
                        </h3>
                        <ol className="space-y-2">
                          {analysis.nextSteps.map((step: string, i: number) => (
                            <li key={i} className="flex gap-3 text-slate-700">
                              <span className="font-bold text-purple-600 flex-shrink-0">{i + 1}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Readability Tab */}
                  {activeTab === "readability" && (
                    <div className="space-y-4">
                      {analysis.readabilityRecommendations.map((rec: any, i: number) => (
                        <Card key={i} className="p-4 border-l-4 border-blue-500">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-slate-900">{rec.issue}</h4>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              rec.priority === "high" ? "bg-red-100 text-red-700" :
                              rec.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-blue-100 text-blue-700"
                            }`}>
                              {rec.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-slate-600">{rec.suggestion}</p>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* SEO Tab */}
                  {activeTab === "seo" && (
                    <div className="space-y-4">
                      {analysis.seoRecommendations.map((rec: any, i: number) => (
                        <Card key={i} className="p-4 border-l-4 border-green-500">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-slate-900">{rec.issue}</h4>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              rec.priority === "high" ? "bg-red-100 text-red-700" :
                              rec.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-green-100 text-green-700"
                            }`}>
                              {rec.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-slate-600">{rec.suggestion}</p>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Engagement Tab */}
                  {activeTab === "engagement" && (
                    <div className="space-y-4">
                      {analysis.engagementRecommendations.map((rec: any, i: number) => (
                        <Card key={i} className="p-4 border-l-4 border-pink-500">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-slate-900">{rec.issue}</h4>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              rec.priority === "high" ? "bg-red-100 text-red-700" :
                              rec.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-pink-100 text-pink-700"
                            }`}>
                              {rec.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-slate-600">{rec.suggestion}</p>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleCopyRecommendations}
                    className="flex-1 border border-slate-300 text-slate-900 hover:bg-slate-100 py-3 rounded-lg font-medium transition"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Report
                  </Button>
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
