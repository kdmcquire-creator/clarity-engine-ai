import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp } from "lucide-react";

interface RecommendedTool {
  id: string;
  name: string;
  category: string;
  reason: string;
  matchScore: number;
  icon: string;
}

const recommendedTools: RecommendedTool[] = [
  {
    id: "backlink-checker",
    name: "Backlink Checker",
    category: "Competitive Analysis",
    reason: "Based on your keyword research activity",
    matchScore: 95,
    icon: "🔗",
  },
  {
    id: "content-gap-analyzer",
    name: "Content Gap Analyzer",
    category: "Content Analysis",
    reason: "Complements your readability score usage",
    matchScore: 88,
    icon: "📊",
  },
  {
    id: "competitor-analysis",
    name: "Competitor Analysis",
    category: "Competitive Analysis",
    reason: "Next logical step after keyword research",
    matchScore: 82,
    icon: "🎯",
  },
];

export default function ToolRecommendations() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-bold text-slate-900">Recommended for You</h3>
      </div>

      <div className="space-y-4">
        {recommendedTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg p-4 border border-blue-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tool.icon}</span>
                <div>
                  <h4 className="font-semibold text-slate-900">{tool.name}</h4>
                  <p className="text-sm text-slate-600">{tool.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600">{tool.matchScore}%</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">{tool.reason}</p>
            <Button asChild size="sm" className="w-full">
              <Link href={`/tools/${tool.id}`}>Try Tool</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
