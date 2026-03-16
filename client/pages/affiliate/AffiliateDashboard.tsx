import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TrendingUp, MousePointer, DollarSign, Target, Download, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";

interface AffiliateMetric {
  id: string;
  name: string;
  icon: string;
  clicks: number;
  conversions: number;
  conversionRate: number;
  earnings: number;
  commissionRate: string;
  trend: number;
  status: "active" | "pending" | "inactive";
}

// Mock data - in production this would come from tRPC
const affiliateMetrics: AffiliateMetric[] = [
  {
    id: "semrush",
    name: "Semrush Pro",
    icon: "🔍",
    clicks: 1247,
    conversions: 89,
    conversionRate: 7.1,
    earnings: 2670,
    commissionRate: "30%",
    trend: 12,
    status: "active",
  },
  {
    id: "ahrefs",
    name: "Ahrefs Lite",
    icon: "🔗",
    clicks: 892,
    conversions: 64,
    conversionRate: 7.2,
    earnings: 1280,
    commissionRate: "20%",
    trend: 8,
    status: "active",
  },
  {
    id: "surfer",
    name: "Surfer SEO",
    icon: "📝",
    clicks: 756,
    conversions: 52,
    conversionRate: 6.9,
    earnings: 1300,
    commissionRate: "25%",
    trend: 5,
    status: "active",
  },
  {
    id: "jasper",
    name: "Jasper AI",
    icon: "✨",
    clicks: 634,
    conversions: 41,
    conversionRate: 6.5,
    earnings: 820,
    commissionRate: "20%",
    trend: 3,
    status: "active",
  },
  {
    id: "grammarly",
    name: "Grammarly Premium",
    icon: "✍️",
    clicks: 445,
    conversions: 28,
    conversionRate: 6.3,
    earnings: 420,
    commissionRate: "15%",
    trend: -2,
    status: "active",
  },
  {
    id: "screaming-frog",
    name: "Screaming Frog",
    icon: "🕷️",
    clicks: 312,
    conversions: 18,
    conversionRate: 5.8,
    earnings: 180,
    commissionRate: "10%",
    trend: 1,
    status: "active",
  },
];

const totalClicks = affiliateMetrics.reduce((sum, m) => sum + m.clicks, 0);
const totalConversions = affiliateMetrics.reduce((sum, m) => sum + m.conversions, 0);
const totalEarnings = affiliateMetrics.reduce((sum, m) => sum + m.earnings, 0);
const avgConversionRate = (totalConversions / totalClicks * 100).toFixed(1);

export default function AffiliateDashboard() {
  const [dateRange, setDateRange] = useState("30days");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Affiliate Dashboard</h1>
            <p className="text-slate-600 mt-2">Track your affiliate performance, clicks, conversions, and earnings</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Date Range Filter */}
        <div className="flex gap-2">
          {[
            { label: "Last 7 Days", value: "7days" },
            { label: "Last 30 Days", value: "30days" },
            { label: "Last 90 Days", value: "90days" },
            { label: "All Time", value: "all" },
          ].map((option) => (
            <Button
              key={option.value}
              variant={dateRange === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange(option.value)}
              className={dateRange === option.value ? "bg-blue-600" : ""}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700">Total Clicks</h3>
              <MousePointer className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{totalClicks.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              +12% from last period
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700">Conversions</h3>
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{totalConversions}</div>
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              {avgConversionRate}% conversion rate
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700">Total Earnings</h3>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">${totalEarnings.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              +8% from last period
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-700">Avg Commission</h3>
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">${(totalEarnings / totalConversions).toFixed(2)}</div>
            <div className="flex items-center gap-1 mt-2 text-slate-600 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              Per conversion
            </div>
          </Card>
        </div>

        {/* Affiliate Programs Performance Table */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Affiliate Programs Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Program</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Clicks</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Conversions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Conv. Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Earnings</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Commission</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Trend</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {affiliateMetrics.map((metric, idx) => (
                  <tr key={metric.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{metric.icon}</span>
                        <div>
                          <div className="font-semibold text-slate-900">{metric.name}</div>
                          <div className="text-xs text-slate-500">{metric.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{metric.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{metric.conversions}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-slate-900 font-medium">{metric.conversionRate}%</div>
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${metric.conversionRate * 15}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-bold">${metric.earnings.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {metric.commissionRate}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1 font-semibold ${metric.trend >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {metric.trend >= 0 ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {Math.abs(metric.trend)}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className={
                          metric.status === "active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : metric.status === "pending"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {metric.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top Performing Articles */}
        <Card>
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Top Performing Articles</h2>
            <p className="text-sm text-slate-600 mt-1">Articles driving the most affiliate clicks and conversions</p>
          </div>
          <div className="divide-y divide-slate-200">
            {[
              {
                title: "Semrush vs Ahrefs: Head-to-Head Comparison for 2026",
                clicks: 342,
                conversions: 28,
                earnings: 840,
              },
              {
                title: "The Complete Guide to Keyword Research: From Beginner to Expert",
                clicks: 287,
                conversions: 19,
                earnings: 570,
              },
              {
                title: "Why Your Content Isn't Ranking: 7 SEO Mistakes You're Probably Making",
                clicks: 245,
                conversions: 16,
                earnings: 480,
              },
              {
                title: "Technical SEO Masterclass: Site Architecture & Performance Optimization",
                clicks: 198,
                conversions: 12,
                earnings: 360,
              },
              {
                title: "Link Building Strategies That Actually Work in 2026",
                clicks: 156,
                conversions: 9,
                earnings: 270,
              },
            ].map((article, idx) => (
              <div key={idx} className="p-6 hover:bg-slate-50 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 mb-2">{article.title}</h3>
                    <div className="flex gap-6 text-sm text-slate-600">
                      <span>📊 {article.clicks} clicks</span>
                      <span>✅ {article.conversions} conversions</span>
                      <span className="font-semibold text-slate-900">${article.earnings} earned</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
