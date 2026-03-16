import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, BookOpen, Link as LinkIcon, Settings, FileText } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface GeneratedBrief {
  keyword: string;
  keywordResearch: string;
  competitorAnalysis: string;
  contentOutline: string;
  contentRecommendations: string;
  linkingStrategy: string;
  metaOptimization: string;
  fullBrief: string;
}

export default function ContentBriefGenerator() {
  const [keyword, setKeyword] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<GeneratedBrief | null>(null);
  const [activeTab, setActiveTab] = useState<"outline" | "keywords" | "competitor" | "recommendations" | "linking" | "meta">("outline");

  // Using any type temporarily due to tRPC type generation delay
  const generateMutation = (trpc as any).contentBrief.generate.useMutation();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      toast.error("Please enter a keyword");
      return;
    }

    setIsGenerating(true);
    try {
      try {
        const result = await generateMutation.mutateAsync({
          keyword: keyword.trim(),
          competitorUrl: competitorUrl.trim() || undefined,
        });
        
        if (result && result.brief) {
          setGeneratedBrief(result.brief);
          toast.success("Content brief generated successfully!");
        }
      } catch (error) {
        toast.error("Failed to generate content brief. Please try again.");
        console.error(error);
      } finally {
        setIsGenerating(false);
      }
    } catch (error) {
      toast.error("Failed to generate content brief. Please try again.");
      console.error(error);
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (generatedBrief) {
      toast.success("Brief saved to your library!");
      // Brief is auto-saved in the mutation
    }
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
            <Link to="/" className="text-slate-600 hover:text-slate-900 transition">
              Home
            </Link>
            <Link to="/tools" className="text-slate-600 hover:text-slate-900 transition">
              Tools
            </Link>
          </div>
        </div>
      </nav>

      <div className="container max-w-6xl py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Content Brief Generator</h1>
              <p className="text-slate-600 mt-1">AI-powered SEO content briefs in seconds</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card className="p-8 sticky top-24">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Generate Brief</h2>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Target Keyword *
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., SEO best practices"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    disabled={isGenerating}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Competitor URL (Optional)
                  </label>
                  <Input
                    type="url"
                    placeholder="https://competitor.com/article"
                    value={competitorUrl}
                    onChange={(e) => setCompetitorUrl(e.target.value)}
                    disabled={isGenerating}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isGenerating || !keyword.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Brief
                    </>
                  )}
                </Button>

                {generatedBrief && (
                  <Button
                    type="button"
                    onClick={handleSave}
                    variant="outline"
                    className="w-full border-slate-300 text-slate-900 hover:bg-slate-100 py-3 rounded-lg font-medium transition"
                  >
                    Save to Library
                  </Button>
                )}
              </form>

              {/* Info Box */}
              <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
                <p className="text-sm text-slate-700">
                  <strong>Pro Tip:</strong> Include a competitor URL to get more targeted recommendations based on what's already ranking.
                </p>
              </Card>
            </Card>
          </div>

          {/* Brief Display Section */}
          <div className="lg:col-span-2">
            {!generatedBrief ? (
              <Card className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Brief Generated Yet</h3>
                <p className="text-slate-600">
                  Enter a keyword and click "Generate Brief" to create a comprehensive SEO content brief.
                </p>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[
                    { id: "outline" as const, label: "Outline", icon: FileText },
                    { id: "keywords" as const, label: "Keywords", icon: Sparkles },
                    { id: "competitor" as const, label: "Competitor", icon: LinkIcon },
                    { id: "recommendations" as const, label: "Recommendations", icon: Settings },
                    { id: "linking" as const, label: "Linking", icon: LinkIcon },
                    { id: "meta" as const, label: "Meta", icon: Settings },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                        activeTab === id
                          ? "bg-purple-600 text-white"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Content */}
                <Card className="p-8">
                  <div className="prose prose-sm max-w-none">
                    {activeTab === "outline" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Content Outline</h3>
                        <div className="text-slate-700 whitespace-pre-wrap">{generatedBrief.contentOutline}</div>
                      </div>
                    )}
                    {activeTab === "keywords" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Keyword Research</h3>
                        <div className="text-slate-700 whitespace-pre-wrap">{generatedBrief.keywordResearch}</div>
                      </div>
                    )}
                    {activeTab === "competitor" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Competitor Analysis</h3>
                        <div className="text-slate-700 whitespace-pre-wrap">{generatedBrief.competitorAnalysis}</div>
                      </div>
                    )}
                    {activeTab === "recommendations" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Content Recommendations</h3>
                        <div className="text-slate-700 whitespace-pre-wrap">{generatedBrief.contentRecommendations}</div>
                      </div>
                    )}
                    {activeTab === "linking" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Linking Strategy</h3>
                        <div className="text-slate-700 whitespace-pre-wrap">{generatedBrief.linkingStrategy}</div>
                      </div>
                    )}
                    {activeTab === "meta" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900">Meta Optimization</h3>
                        <div className="text-slate-700 whitespace-pre-wrap">{generatedBrief.metaOptimization}</div>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      const text = generatedBrief.fullBrief;
                      navigator.clipboard.writeText(text);
                      toast.success("Brief copied to clipboard!");
                    }}
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition"
                  >
                    Copy Brief
                  </Button>
                  <Button
                    onClick={() => {
                      setGeneratedBrief(null);
                      setKeyword("");
                      setCompetitorUrl("");
                    }}
                    variant="outline"
                    className="flex-1 border-slate-300 text-slate-900 hover:bg-slate-100 py-3 rounded-lg font-medium transition"
                  >
                    Generate New
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
