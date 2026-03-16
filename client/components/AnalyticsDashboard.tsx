import { Card } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";

interface MetricCard {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const metrics: MetricCard[] = [
  {
    label: "Monthly Recurring Revenue",
    value: "$0",
    change: 0,
    icon: <BarChart className="w-6 h-6 text-green-600" />,
  },
  {
    label: "Active Subscriptions",
    value: 0,
    change: 0,
    icon: <LineChart className="w-6 h-6 text-blue-600" />,
  },
  {
    label: "Conversion Rate",
    value: "0%",
    change: 0,
    icon: <PieChart className="w-6 h-6 text-purple-600" />,
  },
  {
    label: "Churn Rate",
    value: "0%",
    change: 0,
    icon: <BarChart className="w-6 h-6 text-red-600" />,
  },
];

const conversionFunnel = [
  { stage: "Visitors", count: 0, percentage: 100 },
  { stage: "Signup", count: 0, percentage: 0 },
  { stage: "Tool Usage", count: 0, percentage: 0 },
  { stage: "Pricing Page", count: 0, percentage: 0 },
  { stage: "Checkout", count: 0, percentage: 0 },
  { stage: "Paid Subscriber", count: 0, percentage: 0 },
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Revenue Metrics</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.label} className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                {metric.icon}
              </div>
              <p
                className={`text-xs font-semibold ${
                  metric.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change >= 0 ? "+" : ""}{metric.change}% from last month
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion Funnel</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{stage.stage}</span>
                  <span className="text-sm text-gray-600">
                    {stage.count} ({stage.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
                {index < conversionFunnel.length - 1 && (
                  <div className="text-center my-2">
                    <span className="text-xs text-gray-500">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Tools by Usage</h2>
          <Card className="p-6">
            <div className="space-y-3">
              {[
                { name: "Keyword Research", usage: 0 },
                { name: "Content Analysis", usage: 0 },
                { name: "Backlink Checker", usage: 0 },
                { name: "Meta Tag Generator", usage: 0 },
                { name: "Readability Score", usage: 0 },
              ].map((tool) => (
                <div key={tool.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{tool.name}</span>
                  <span className="font-semibold text-gray-900">{tool.usage}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Breakdown</h2>
          <Card className="p-6">
            <div className="space-y-3">
              {[
                { tier: "Free", count: 0, percentage: 100 },
                { tier: "Pro", count: 0, percentage: 0 },
                { tier: "Enterprise", count: 0, percentage: 0 },
              ].map((sub) => (
                <div key={sub.tier}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{sub.tier}</span>
                    <span className="font-semibold text-gray-900">
                      {sub.count} ({sub.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${sub.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">📊 Analytics Tips</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Track conversion rate at each funnel stage to identify drop-off points</li>
          <li>• Monitor which tools drive the most signups and conversions</li>
          <li>• Analyze user behavior to optimize onboarding and pricing</li>
          <li>• Set up alerts for unusual changes in key metrics</li>
          <li>• A/B test pricing, CTAs, and email campaigns based on data</li>
        </ul>
      </Card>
    </div>
  );
}
