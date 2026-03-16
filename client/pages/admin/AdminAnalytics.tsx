import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, BarChart3, PieChart, Calendar } from "lucide-react";
import { useState } from "react";

export default function AdminAnalytics() {
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

  const analyticsData = {
    "7d": {
      revenue: 1240.5,
      subscriptions: 8,
      affiliateCommissions: 340.2,
      adsenseEarnings: 120.5,
      conversionRate: 3.2,
      avgOrderValue: 155.06,
    },
    "30d": {
      revenue: 5840.75,
      subscriptions: 42,
      affiliateCommissions: 1820.5,
      adsenseEarnings: 620.25,
      conversionRate: 2.8,
      avgOrderValue: 139.06,
    },
    "90d": {
      revenue: 18450.3,
      subscriptions: 156,
      affiliateCommissions: 5920.8,
      adsenseEarnings: 2150.5,
      conversionRate: 2.5,
      avgOrderValue: 118.27,
    },
  };

  const data = analyticsData[timeRange as keyof typeof analyticsData];

  const conversionFunnel = [
    { stage: "Visitors", count: 45230, percentage: 100 },
    { stage: "Tool Users", count: 12450, percentage: 27.5 },
    { stage: "Pricing Page", count: 3120, percentage: 25.1 },
    { stage: "Checkout", count: 1240, percentage: 39.7 },
    { stage: "Paid Subscribers", count: 42, percentage: 3.4 },
  ];

  const revenueBySource = [
    { source: "Subscriptions", revenue: 3850.5, percentage: 65.9 },
    { source: "Affiliate", revenue: 1820.5, percentage: 31.2 },
    { source: "AdSense", revenue: 620.25, percentage: 10.6 },
  ];

  const topPerformingTools = [
    { name: "Keyword Research", users: 3240, revenue: 1240 },
    { name: "Meta Tag Generator", users: 2850, revenue: 980 },
    { name: "Readability Score", users: 2120, revenue: 750 },
    { name: "Backlink Checker", users: 1890, revenue: 620 },
    { name: "SERP Simulator", users: 1650, revenue: 540 },
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
            <h1 className="text-xl font-bold text-slate-900">Revenue Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            {["7d", "30d", "90d"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Total Revenue</h3>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">${data.revenue.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last period
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">New Subscriptions</h3>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{data.subscriptions}</p>
            <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.2% from last period
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Conversion Rate</h3>
              <BarChart3 className="h-5 w-3 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{data.conversionRate}%</p>
            <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -0.3% from last period
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Avg Order Value</h3>
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">${data.avgOrderValue.toFixed(2)}</p>
            <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +5.1% from last period
            </p>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Revenue by Source */}
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Revenue by Source
            </h2>
            <div className="space-y-4">
              {revenueBySource.map((item) => (
                <div key={item.source}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{item.source}</span>
                    <span className="text-sm font-semibold text-slate-900">${item.revenue.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{item.percentage}% of total</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Conversion Funnel
            </h2>
            <div className="space-y-3">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{stage.stage}</span>
                    <span className="text-sm font-semibold text-slate-900">{stage.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        index === 0
                          ? "bg-blue-600"
                          : index === 1
                          ? "bg-blue-500"
                          : index === 2
                          ? "bg-blue-400"
                          : index === 3
                          ? "bg-blue-300"
                          : "bg-green-600"
                      }`}
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{stage.percentage}% conversion</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Tools */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Top Performing Tools</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Tool Name</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Users</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Revenue</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Avg Revenue/User</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingTools.map((tool) => (
                  <tr key={tool.name} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4 text-sm text-slate-900 font-medium">{tool.name}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 text-right">{tool.users.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-green-600 font-semibold text-right">${tool.revenue}</td>
                    <td className="py-3 px-4 text-sm text-slate-600 text-right">${(tool.revenue / tool.users).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daily Revenue Chart */}
        <div className="mt-12 bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Daily Revenue Trend</h2>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600">Chart visualization coming soon</p>
              <p className="text-xs text-slate-500 mt-1">Real-time data will display here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
