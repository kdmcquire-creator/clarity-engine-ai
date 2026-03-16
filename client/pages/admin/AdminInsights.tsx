import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, AlertTriangle, Zap, Target, Users, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";

export default function AdminInsights() {
  const { user, isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState("30d");

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

  const insights = [
    {
      title: "Pricing Page Conversion Opportunity",
      description: "Pricing page has 34% bounce rate vs 12% site average. A/B test headline to improve engagement.",
      impact: "Potential +8% conversion lift",
      priority: "high",
      icon: Target,
    },
    {
      title: "Mobile User Engagement Gap",
      description: "Mobile users complete 40% fewer tools than desktop. Optimize mobile UX for tool workflows.",
      impact: "Could increase mobile revenue 25%",
      priority: "high",
      icon: TrendingUp,
    },
    {
      title: "Email List Growth Slowing",
      description: "Newsletter signup rate dropped 15% last week. Refresh homepage CTA copy and positioning.",
      impact: "Recover 200+ subscribers/week",
      priority: "medium",
      icon: Users,
    },
    {
      title: "Pro Tier Underperforming",
      description: "Pro tier has 2x lower adoption than Free. Consider feature bundling or pricing adjustment.",
      impact: "Potential +$2,400 MRR",
      priority: "medium",
      icon: DollarSign,
    },
    {
      title: "Tool Usage Concentration",
      description: "80% of usage concentrated in 3 tools. Promote underutilized tools via email campaigns.",
      impact: "Increase user engagement 30%",
      priority: "low",
      icon: Zap,
    },
  ];

  const recommendations = [
    {
      category: "Monetization",
      items: [
        "Launch AdSense on Resources section (estimated +$150/month)",
        "Expand affiliate program to include HubSpot, Mailchimp (new revenue stream)",
        "Create premium tool tier ($49/month) with advanced features",
      ],
    },
    {
      category: "Growth",
      items: [
        "Start YouTube channel with tool tutorials (SEO + traffic driver)",
        "Create 5 viral-worthy SEO guides targeting high-volume keywords",
        "Launch referral program (10% commission for new customers)",
      ],
    },
    {
      category: "Retention",
      items: [
        "Implement in-app onboarding for each tool (reduce abandonment)",
        "Create weekly email digest of tool recommendations",
        "Add gamification (badges, streaks, leaderboards)",
      ],
    },
  ];

  const priorityColor = {
    high: "bg-red-100 text-red-700 border-red-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    low: "bg-blue-100 text-blue-700 border-blue-300",
  };

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
            <h1 className="text-xl font-bold text-slate-900">AI-Powered Insights</h1>
          </div>
          <div className="flex gap-2">
            {["7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                  timeRange === range
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Key Insights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Insights</h2>
          <div className="space-y-4">
            {insights.map((insight, idx) => {
              const Icon = insight.icon;
              return (
                <div
                  key={idx}
                  className={`border-l-4 rounded-lg p-6 bg-white ${
                    insight.priority === "high"
                      ? "border-red-500"
                      : insight.priority === "medium"
                        ? "border-yellow-500"
                        : "border-blue-500"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon
                        className={`h-5 w-5 mt-1 ${
                          insight.priority === "high"
                            ? "text-red-600"
                            : insight.priority === "medium"
                              ? "text-yellow-600"
                              : "text-blue-600"
                        }`}
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">{insight.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{insight.description}</p>
                        <p className="text-sm font-semibold text-green-600">{insight.impact}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-4 ${
                        priorityColor[insight.priority as keyof typeof priorityColor]
                      }`}
                    >
                      {insight.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">{rec.category}</h3>
              <ul className="space-y-3">
                {rec.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex gap-3">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span className="text-sm text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Action Items */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recommended Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                This Week
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Launch A/B test on pricing page headline</li>
                <li>• Optimize mobile tool interface</li>
                <li>• Review and update email templates</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border border-purple-200">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                This Month
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Set up AdSense on Resources section</li>
                <li>• Create YouTube channel and first 3 videos</li>
                <li>• Implement in-app onboarding for tools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
