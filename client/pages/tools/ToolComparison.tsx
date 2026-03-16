import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, X, Plus } from "lucide-react";
import { useState } from "react";

const allTools = [
  {
    id: "keyword-density",
    name: "Keyword Density Checker",
    category: "Content Analysis",
    price: "Free",
    features: {
      "Real-time analysis": true,
      "Keyword suggestions": true,
      "Export results": false,
      "API access": false,
      "Bulk analysis": false,
      "Historical tracking": false,
    },
    pros: ["Easy to use", "Instant results", "No signup required"],
    cons: ["Limited features", "No bulk processing", "No API access"],
  },
  {
    id: "meta-tag-generator",
    name: "Meta Tag Generator",
    category: "Optimization",
    price: "Free",
    features: {
      "Real-time analysis": true,
      "Keyword suggestions": true,
      "Export results": true,
      "API access": false,
      "Bulk analysis": false,
      "Historical tracking": false,
    },
    pros: ["Generates optimized tags", "Preview in SERP", "Mobile preview"],
    cons: ["Single page at a time", "No bulk processing"],
  },
  {
    id: "page-speed",
    name: "Page Speed Insights",
    category: "Performance & Competitive Analysis",
    price: "Free",
    features: {
      "Real-time analysis": true,
      "Keyword suggestions": false,
      "Export results": true,
      "API access": true,
      "Bulk analysis": true,
      "Historical tracking": true,
    },
    pros: ["Comprehensive metrics", "Mobile & desktop", "Actionable recommendations"],
    cons: ["Complex to interpret", "Requires technical knowledge"],
  },
  {
    id: "backlink-checker",
    name: "Backlink Checker",
    category: "Performance & Competitive Analysis",
    price: "Free",
    features: {
      "Real-time analysis": true,
      "Keyword suggestions": false,
      "Export results": true,
      "API access": true,
      "Bulk analysis": true,
      "Historical tracking": true,
    },
    pros: ["Detailed backlink data", "Competitor analysis", "Link quality metrics"],
    cons: ["Limited free version", "Requires account"],
  },
  {
    id: "keyword-research",
    name: "Keyword Research Tool",
    category: "Keyword Research",
    price: "Free",
    features: {
      "Real-time analysis": true,
      "Keyword suggestions": true,
      "Export results": true,
      "API access": true,
      "Bulk analysis": true,
      "Historical tracking": true,
    },
    pros: ["Comprehensive keyword data", "Search volume metrics", "Competition analysis"],
    cons: ["Large dataset can be overwhelming", "Requires interpretation"],
  },
];

export default function ToolComparison() {
  const { isAuthenticated } = useAuth();
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const toggleTool = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const comparisonTools = selectedTools.length > 0 ? allTools.filter((t) => selectedTools.includes(t.id)) : allTools.slice(0, 3);

  const allFeatures = Array.from(
    new Set(comparisonTools.flatMap((tool) => Object.keys(tool.features)))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Clarity Engine
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">
              Tools
            </Link>
            <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition">
              Resources
            </Link>
            {isAuthenticated && (
              <Button asChild size="sm" variant="outline">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Tool Comparison</h1>
          <p className="text-slate-600">Compare features across our SEO tools to find the perfect fit for your needs.</p>
        </div>

        {/* Tool Selection */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Select Tools to Compare</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`p-4 rounded-lg border-2 transition text-left ${
                  selectedTools.includes(tool.id)
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{tool.name}</h3>
                    <p className="text-sm text-slate-600">{tool.category}</p>
                  </div>
                  {selectedTools.includes(tool.id) && <Check className="h-5 w-5 text-blue-600" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left font-semibold text-slate-900 w-48">Feature</th>
                  {comparisonTools.map((tool) => (
                    <th key={tool.id} className="px-6 py-4 text-center font-semibold text-slate-900 min-w-40">
                      <div className="font-bold text-base">{tool.name}</div>
                      <div className="text-sm font-normal text-slate-600">{tool.price}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature, idx) => (
                  <tr key={feature} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-4 font-medium text-slate-900">{feature}</td>
                    {comparisonTools.map((tool) => (
                      <td key={tool.id} className="px-6 py-4 text-center">
                        {tool.features[feature as keyof typeof tool.features] ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-slate-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pros and Cons */}
        {comparisonTools.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Pros & Cons</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonTools.map((tool) => (
                <div key={tool.id} className="bg-white rounded-lg border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">{tool.name}</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-green-700 mb-3">Pros</h4>
                    <ul className="space-y-2">
                      {tool.pros.map((pro, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-slate-600">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-red-700 mb-3">Cons</h4>
                    <ul className="space-y-2">
                      {tool.cons.map((con, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-slate-600">
                          <X className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="w-full mt-6">
                    <Link href={`/tools/${tool.id}`}>Try Tool</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
