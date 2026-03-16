import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import {
  TrendingUp,
  MousePointer,
  DollarSign,
  Target,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AffiliateProgram {
  id: string;
  name: string;
  icon: string;
  commission: number;
  status: "active" | "pending" | "inactive";
  clicks: number;
  conversions: number;
  earnings: number;
  conversionRate: number;
  trend: number;
}

interface AnalyticsMetric {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const affiliatePrograms: AffiliateProgram[] = [
  {
    id: "semrush",
    name: "Semrush",
    icon: "🔍",
    commission: 40,
    status: "active",
    clicks: 2847,
    conversions: 156,
    earnings: 6240,
    conversionRate: 5.48,
    trend: 12,
  },
  {
    id: "ahrefs",
    name: "Ahrefs",
    icon: "📊",
    commission: 35,
    status: "active",
    clicks: 1923,
    conversions: 89,
    earnings: 3115,
    conversionRate: 4.63,
    trend: 8,
  },
  {
    id: "surfer",
    name: "Surfer SEO",
    icon: "🌊",
    commission: 30,
    status: "active",
    clicks: 1456,
    conversions: 72,
    earnings: 2160,
    conversionRate: 4.95,
    trend: 15,
  },
  {
    id: "jasper",
    name: "Jasper AI",
    icon: "✨",
    commission: 25,
    status: "active",
    clicks: 1234,
    conversions: 45,
    earnings: 1125,
    conversionRate: 3.65,
    trend: -2,
  },
  {
    id: "grammarly",
    name: "Grammarly",
    icon: "✍️",
    commission: 20,
    status: "pending",
    clicks: 892,
    conversions: 34,
    earnings: 680,
    conversionRate: 3.81,
    trend: 5,
  },
  {
    id: "screaming-frog",
    name: "Screaming Frog",
    icon: "🐸",
    commission: 15,
    status: "active",
    clicks: 567,
    conversions: 23,
    earnings: 345,
    conversionRate: 4.06,
    trend: 3,
  },
];

export default function AffiliateAnalytics() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("30d");

  const totalClicks = affiliatePrograms.reduce((sum, p) => sum + p.clicks, 0);
  const totalConversions = affiliatePrograms.reduce((sum, p) => sum + p.conversions, 0);
  const totalEarnings = affiliatePrograms.reduce((sum, p) => sum + p.earnings, 0);
  const avgConversionRate = (totalConversions / totalClicks * 100).toFixed(2);

  const metrics: AnalyticsMetric[] = [
    {
      label: "Total Clicks",
      value: totalClicks.toLocaleString(),
      change: 23,
      icon: <MousePointer className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      label: "Total Conversions",
      value: totalConversions,
      change: 18,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      label: "Total Earnings",
      value: `$${totalEarnings.toLocaleString()}`,
      change: 31,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-emerald-600",
    },
    {
      label: "Avg Conversion Rate",
      value: `${avgConversionRate}%`,
      change: 5,
      icon: <Target className="w-5 h-5" />,
      color: "text-purple-600",
    },
  ];

  const handleExportReport = () => {
    toast.success("Report exported successfully!");
  };

  const handleCopyLink = (programId: string) => {
    const link = `https://clarity-engine.ai/affiliate/${programId}`;
    navigator.clipboard.writeText(link);
    toast.success("Affiliate link copied to clipboard!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Affiliate Analytics</h1>
            <p className="text-muted-foreground mt-2">Track your affiliate performance and earnings</p>
          </div>
          <div className="flex gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <Button onClick={handleExportReport} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <Card key={idx} className="p-6 border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {metric.change >= 0 ? (
                      <ArrowUpRight className={`w-4 h-4 ${metric.color}`} />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={metric.change >= 0 ? metric.color : "text-red-600"}>
                      {Math.abs(metric.change)}%
                    </span>
                    <span className="text-xs text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-background ${metric.color}`}>{metric.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Programs Grid */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Affiliate Programs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {affiliatePrograms.map((program) => (
              <Card
                key={program.id}
                className="p-6 border-border cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setSelectedProgram(program.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{program.icon}</div>
                    <div>
                      <h3 className="font-bold text-foreground">{program.name}</h3>
                      <p className="text-sm text-muted-foreground">{program.commission}% Commission</p>
                    </div>
                  </div>
                  <Badge
                    variant={program.status === "active" ? "default" : program.status === "pending" ? "secondary" : "outline"}
                  >
                    {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Clicks</p>
                    <p className="text-lg font-bold text-foreground">{program.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conversions</p>
                    <p className="text-lg font-bold text-foreground">{program.conversions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conversion Rate</p>
                    <p className="text-lg font-bold text-foreground">{program.conversionRate.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Earnings</p>
                    <p className="text-lg font-bold text-green-600">${program.earnings.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    {program.trend >= 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={program.trend >= 0 ? "text-green-600" : "text-red-600"}>
                      {Math.abs(program.trend)}% {program.trend >= 0 ? "increase" : "decrease"}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyLink(program.id);
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <Card className="p-6 border-border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-2">Performance Insights</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <strong>Top Performer:</strong> Semrush leads with {affiliatePrograms[0].earnings} in earnings and{" "}
                  {affiliatePrograms[0].conversionRate.toFixed(2)}% conversion rate
                </li>
                <li>
                  <strong>Fastest Growing:</strong> Surfer SEO showing strongest growth at {affiliatePrograms[2].trend}% increase
                </li>
                <li>
                  <strong>Recommendation:</strong> Focus on Semrush and Ahrefs for maximum ROI. Consider increasing Surfer SEO
                  promotion.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Earnings Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="p-6 border-border">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-foreground">Earnings by Program</h3>
            </div>
            <div className="space-y-3">
              {affiliatePrograms.slice(0, 3).map((program) => (
                <div key={program.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-muted-foreground">{program.name}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">${program.earnings.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-foreground">Click Distribution</h3>
            </div>
            <div className="space-y-3">
              {affiliatePrograms.slice(0, 3).map((program) => {
                const percentage = ((program.clicks / totalClicks) * 100).toFixed(1);
                return (
                  <div key={program.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{program.name}</span>
                      <span className="text-sm font-bold text-foreground">{percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-foreground">Conversion Leaders</h3>
            </div>
            <div className="space-y-3">
              {[...affiliatePrograms].sort((a, b) => b.conversionRate - a.conversionRate).slice(0, 3).map((program) => (
                <div key={program.id} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{program.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{program.conversionRate.toFixed(2)}%</span>
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tips & Best Practices */}
        <Card className="p-6 border-border bg-amber-50 dark:bg-amber-950/20">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-foreground mb-2">Affiliate Tips & Best Practices</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Place affiliate links in contextual content where they add value to readers</li>
                <li>• Use honest, authentic reviews and recommendations to build trust</li>
                <li>• Track which links perform best and optimize placement accordingly</li>
                <li>• Disclose affiliate relationships transparently to maintain credibility</li>
                <li>• Test different link placements (beginning, middle, end of articles)</li>
                <li>• Monitor conversion rates and focus on high-performing programs</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
