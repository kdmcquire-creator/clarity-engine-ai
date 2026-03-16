import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, AlertCircle, CheckCircle, TrendingUp, Target, Zap } from "lucide-react";
import { useState } from "react";

export default function AdminConversionFunnel() {
  const { user, isAuthenticated } = useAuth();
  const [selectedStage, setSelectedStage] = useState("pricing");

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Access Denied</h1>
          <Button asChild>
            <Link href="/admin">Return to Admin Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const funnelStages = [
    {
      id: "landing",
      name: "Landing Page",
      visitors: 45230,
      conversionRate: 27.5,
      dropoff: 72.5,
      avgTimeOnPage: "2m 15s",
      bounceRate: 35,
      optimization: "Add more compelling hero section with social proof",
    },
    {
      id: "tools",
      name: "Tools Page",
      visitors: 12450,
      conversionRate: 25.1,
      dropoff: 74.9,
      avgTimeOnPage: "3m 42s",
      bounceRate: 28,
      optimization: "Highlight top 3 tools with quick start buttons",
    },
    {
      id: "pricing",
      name: "Pricing Page",
      visitors: 3120,
      conversionRate: 39.7,
      dropoff: 60.3,
      avgTimeOnPage: "4m 18s",
      bounceRate: 22,
      optimization: "Add comparison table and testimonials",
    },
    {
      id: "checkout",
      name: "Checkout",
      visitors: 1240,
      conversionRate: 3.4,
      dropoff: 96.6,
      avgTimeOnPage: "1m 30s",
      bounceRate: 45,
      optimization: "Simplify form, add trust badges, offer guest checkout",
    },
    {
      id: "success",
      name: "Purchase Complete",
      visitors: 42,
      conversionRate: 100,
      dropoff: 0,
      avgTimeOnPage: "0m 45s",
      bounceRate: 0,
      optimization: "Upsell complementary tools and resources",
    },
  ];

  const currentStage = funnelStages.find((s) => s.id === selectedStage) || funnelStages[2];

  const optimizations = [
    {
      title: "Add Video Demo",
      impact: "High",
      effort: "Medium",
      estimatedLift: "+15%",
      status: "pending",
    },
    {
      title: "Implement Live Chat",
      impact: "High",
      effort: "High",
      estimatedLift: "+12%",
      status: "pending",
    },
    {
      title: "Add Trust Badges",
      impact: "Medium",
      effort: "Low",
      estimatedLift: "+8%",
      status: "completed",
    },
    {
      title: "Simplify Checkout Form",
      impact: "High",
      effort: "Medium",
      estimatedLift: "+18%",
      status: "in-progress",
    },
    {
      title: "Add FAQ Section",
      impact: "Medium",
      effort: "Low",
      estimatedLift: "+6%",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-slate-900">Conversion Funnel Optimization</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Funnel Visualization */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Conversion Funnel</h2>
          <div className="space-y-4">
            {funnelStages.map((stage, index) => (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`cursor-pointer transition-all rounded-lg p-4 border-2 ${
                  selectedStage === stage.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{stage.name}</h3>
                    <div className="flex items-center gap-6 text-sm text-slate-600">
                      <span>{stage.visitors.toLocaleString()} visitors</span>
                      <span className="text-green-600 font-medium">{stage.conversionRate}% conversion</span>
                      <span className="text-red-600">{stage.dropoff}% dropoff</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-32 bg-slate-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${Math.max(stage.conversionRate, 5)}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-600">{stage.conversionRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Details */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Stage Metrics */}
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6">{currentStage.name} Metrics</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Visitors</p>
                <p className="text-3xl font-bold text-slate-900">{currentStage.visitors.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Conversion Rate</p>
                <p className="text-3xl font-bold text-green-600">{currentStage.conversionRate}%</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Bounce Rate</p>
                <p className="text-3xl font-bold text-red-600">{currentStage.bounceRate}%</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg Time on Page</p>
                <p className="text-3xl font-bold text-slate-900">{currentStage.avgTimeOnPage}</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Optimization Recommendation
            </h3>
            <p className="text-slate-700 mb-4">{currentStage.optimization}</p>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-slate-600 mb-2">
                <strong>Expected Impact:</strong> This optimization could increase conversion by 8-15% based on industry benchmarks.
              </p>
              <p className="text-sm text-slate-600">
                <strong>Implementation Time:</strong> 2-3 days for design and development.
              </p>
            </div>
          </div>
        </div>

        {/* Optimization Roadmap */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Target className="h-6 w-6" />
            Optimization Roadmap
          </h2>
          <div className="space-y-4">
            {optimizations.map((opt) => (
              <div key={opt.title} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {opt.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : opt.status === "in-progress" ? (
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-slate-400" />
                    )}
                    <h4 className="font-semibold text-slate-900">{opt.title}</h4>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      opt.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : opt.status === "in-progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {opt.status === "completed" ? "Done" : opt.status === "in-progress" ? "In Progress" : "Pending"}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 mb-1">Impact</p>
                    <p className="font-semibold text-slate-900">{opt.impact}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Effort</p>
                    <p className="font-semibold text-slate-900">{opt.effort}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Est. Lift</p>
                    <p className="font-semibold text-green-600">{opt.estimatedLift}</p>
                  </div>
                  <div>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      {opt.status === "completed" ? "View" : "Start"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Wins */}
        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">🚀 Quick Wins (Easy Wins)</h2>
          <ul className="space-y-2 text-green-900">
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>Add trust badges (SSL, money-back guarantee) - 2 hours - +8% conversion</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>Implement exit-intent popup with discount - 3 hours - +5% conversion</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>Add FAQ section to pricing page - 4 hours - +6% conversion</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>Create customer testimonials carousel - 6 hours - +10% conversion</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
