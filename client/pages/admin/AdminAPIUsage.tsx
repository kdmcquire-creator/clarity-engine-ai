import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, BarChart3, AlertTriangle, Zap, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function AdminAPIUsage() {
  const { user, isAuthenticated } = useAuth();

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

  const apiStats = [
    { label: "Total API Calls", value: "2.4M", change: "+18%", icon: BarChart3 },
    { label: "Active API Keys", value: "127", change: "+12", icon: Zap },
    { label: "Rate Limit Hits", value: "34", change: "-5", icon: AlertTriangle },
    { label: "Avg Response Time", value: "142ms", change: "-8%", icon: TrendingUp },
  ];

  const topEndpoints = [
    { endpoint: "/api/tools/keyword-density", calls: 485200, avgTime: 145, errors: 12 },
    { endpoint: "/api/tools/readability", calls: 342100, avgTime: 128, errors: 8 },
    { endpoint: "/api/tools/meta-generator", calls: 298500, avgTime: 156, errors: 15 },
    { endpoint: "/api/tools/backlink-checker", calls: 215300, avgTime: 234, errors: 22 },
    { endpoint: "/api/tools/schema-markup", calls: 187400, avgTime: 167, errors: 9 },
  ];

  const rateLimitTiers = [
    { tier: "Free", requests: "100/day", concurrent: 5, cost: "$0" },
    { tier: "Pro", requests: "10K/day", concurrent: 50, cost: "$29/mo" },
    { tier: "Enterprise", requests: "Unlimited", concurrent: 500, cost: "Custom" },
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
            <h1 className="text-xl font-bold text-slate-900">API Usage & Rate Limiting</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {apiStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-600">{stat.label}</h3>
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Top Endpoints */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Top API Endpoints</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Endpoint</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Calls (30d)</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Avg Response</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Errors</th>
                </tr>
              </thead>
              <tbody>
                {topEndpoints.map((ep, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono text-sm text-blue-600">{ep.endpoint}</td>
                    <td className="py-3 px-4 text-sm text-slate-900 font-semibold">{ep.calls.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{ep.avgTime}ms</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        ep.errors < 15 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {ep.errors}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rate Limit Tiers */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Rate Limit Tiers</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Tier</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Requests/Day</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Concurrent</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Price</th>
                </tr>
              </thead>
              <tbody>
                {rateLimitTiers.map((tier, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900">{tier.tier}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{tier.requests}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{tier.concurrent} requests</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{tier.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* API Health */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">API Health</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm font-medium text-slate-900">API Server</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm font-medium text-slate-900">Rate Limiter</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm font-medium text-slate-900">Cache Layer</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Operational</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Issues</h2>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-900">High latency spike on /api/tools/backlink-checker</p>
                <p className="text-xs text-yellow-700 mt-1">Resolved 2 hours ago</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900">Rate limit exceeded for 3 API keys</p>
                <p className="text-xs text-blue-700 mt-1">Notified users, limits reset in 4 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
