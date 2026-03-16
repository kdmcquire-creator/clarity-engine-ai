import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, TrendingUp, Calendar, DollarSign, Users } from "lucide-react";
import { useState } from "react";

export default function AdminForecasting() {
  const { user, isAuthenticated } = useAuth();
  const [forecastPeriod, setForecastPeriod] = useState("6m");

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

  const forecasts = {
    "3m": {
      revenue: 18500,
      subscriptions: 156,
      churn: 3.2,
      growth: 12.5,
    },
    "6m": {
      revenue: 42800,
      subscriptions: 298,
      churn: 2.8,
      growth: 18.3,
    },
    "12m": {
      revenue: 125600,
      subscriptions: 645,
      churn: 2.1,
      growth: 24.7,
    },
  };

  const current = forecasts[forecastPeriod as keyof typeof forecasts];

  const monthlyProjection = [
    { month: "Mar 2026", revenue: 5840, subs: 42, churn: 3.5 },
    { month: "Apr 2026", revenue: 6200, subs: 48, churn: 3.2 },
    { month: "May 2026", revenue: 6850, subs: 56, churn: 3.0 },
    { month: "Jun 2026", revenue: 7420, subs: 64, churn: 2.8 },
    { month: "Jul 2026", revenue: 8150, subs: 74, churn: 2.6 },
    { month: "Aug 2026", revenue: 8920, subs: 85, churn: 2.4 },
  ];

  const scenarios = [
    {
      name: "Conservative",
      description: "Slower growth, higher churn",
      revenue: 89200,
      confidence: 75,
      color: "bg-yellow-100",
    },
    {
      name: "Base Case",
      description: "Current trends continue",
      revenue: 125600,
      confidence: 85,
      color: "bg-blue-100",
    },
    {
      name: "Aggressive",
      description: "Viral growth, low churn",
      revenue: 187400,
      confidence: 60,
      color: "bg-green-100",
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
            <h1 className="text-xl font-bold text-slate-900">Revenue Forecasting</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Period Selector */}
        <div className="flex gap-4 mb-12">
          {["3m", "6m", "12m"].map((period) => (
            <Button
              key={period}
              variant={forecastPeriod === period ? "default" : "outline"}
              onClick={() => setForecastPeriod(period)}
            >
              {period === "3m" ? "3 Months" : period === "6m" ? "6 Months" : "12 Months"}
            </Button>
          ))}
        </div>

        {/* Forecast Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Projected Revenue
            </h3>
            <p className="text-3xl font-bold text-slate-900">${(current.revenue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +{current.growth}% growth
            </p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Projected Subscribers
            </h3>
            <p className="text-3xl font-bold text-slate-900">{current.subscriptions}</p>
            <p className="text-xs text-slate-500 mt-2">Paid subscriptions</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Projected Churn</h3>
            <p className="text-3xl font-bold text-slate-900">{current.churn}%</p>
            <p className="text-xs text-green-600 mt-2">Monthly churn rate</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">MRR</h3>
            <p className="text-3xl font-bold text-slate-900">${(current.revenue / (forecastPeriod === "3m" ? 3 : forecastPeriod === "6m" ? 6 : 12) / 1000).toFixed(1)}K</p>
            <p className="text-xs text-slate-500 mt-2">Monthly recurring revenue</p>
          </div>
        </div>

        {/* Monthly Projection */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Monthly Projection</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Month</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Revenue</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">New Subs</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Churn Rate</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlyProjection.map((row, idx) => (
                  <tr key={row.month} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">{row.month}</td>
                    <td className="py-3 px-4 text-sm text-right text-green-600 font-semibold">${row.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm text-right text-slate-900 font-medium">{row.subs}</td>
                    <td className="py-3 px-4 text-sm text-right text-slate-600">{row.churn}%</td>
                    <td className="py-3 px-4 text-sm text-right">
                      {idx === 0 ? (
                        <span className="text-slate-600">-</span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          +{(((monthlyProjection[idx].revenue - monthlyProjection[idx - 1].revenue) / monthlyProjection[idx - 1].revenue) * 100).toFixed(1)}%
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Scenario Analysis</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <div key={scenario.name} className={`${scenario.color} rounded-lg p-6 border-2 border-slate-200`}>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{scenario.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{scenario.description}</p>
                <div className="mb-4">
                  <p className="text-xs text-slate-600 mb-1">12-Month Revenue</p>
                  <p className="text-3xl font-bold text-slate-900">${(scenario.revenue / 1000).toFixed(0)}K</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-300 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${scenario.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{scenario.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Drivers */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Key Revenue Drivers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">Subscription Growth</h3>
              <p className="text-sm text-slate-600 mb-3">Current: 42/month | Projected: 64/month by June</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  Optimize
                </Button>
                <Button size="sm" className="flex-1 text-xs">
                  View Details
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">Churn Reduction</h3>
              <p className="text-sm text-slate-600 mb-3">Current: 3.5% | Target: 2.0% by December</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  Optimize
                </Button>
                <Button size="sm" className="flex-1 text-xs">
                  View Details
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">Affiliate Revenue</h3>
              <p className="text-sm text-slate-600 mb-3">Current: 31% of revenue | Target: 40% by Q4</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  Optimize
                </Button>
                <Button size="sm" className="flex-1 text-xs">
                  View Details
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">AdSense Revenue</h3>
              <p className="text-sm text-slate-600 mb-3">Current: 11% of revenue | Target: 15% by Q4</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  Optimize
                </Button>
                <Button size="sm" className="flex-1 text-xs">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
