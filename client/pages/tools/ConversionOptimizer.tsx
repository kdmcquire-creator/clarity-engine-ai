import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Settings } from "lucide-react";

interface Variant {
  id: string;
  name: string;
  description: string;
  conversions: number;
  visitors: number;
  conversionRate: number;
  isWinner: boolean;
}

interface TestCampaign {
  id: string;
  name: string;
  type: string;
  status: "running" | "completed" | "paused";
  startDate: string;
  variants: Variant[];
}

const testCampaigns: TestCampaign[] = [
  {
    id: "pricing-cta",
    name: "Pricing Page CTA Button",
    type: "Button Text & Color",
    status: "running",
    startDate: "2026-03-10",
    variants: [
      {
        id: "v1",
        name: "Control",
        description: 'Gray button "Get Started"',
        conversions: 0,
        visitors: 0,
        conversionRate: 0,
        isWinner: false,
      },
      {
        id: "v2",
        name: "Variant A",
        description: 'Blue button "Start Free Trial"',
        conversions: 0,
        visitors: 0,
        conversionRate: 0,
        isWinner: false,
      },
      {
        id: "v3",
        name: "Variant B",
        description: 'Green button "Upgrade Now"',
        conversions: 0,
        visitors: 0,
        conversionRate: 0,
        isWinner: false,
      },
    ],
  },
  {
    id: "pricing-tiers",
    name: "Pricing Tier Layout",
    type: "Page Layout",
    status: "running",
    startDate: "2026-03-10",
    variants: [
      {
        id: "v1",
        name: "Control",
        description: "3 columns (Free, Pro, Enterprise)",
        conversions: 0,
        visitors: 0,
        conversionRate: 0,
        isWinner: false,
      },
      {
        id: "v2",
        name: "Variant A",
        description: "Pro highlighted with ring (current)",
        conversions: 0,
        visitors: 0,
        conversionRate: 0,
        isWinner: false,
      },
    ],
  },
];

export function ConversionOptimizer() {
  const [campaigns, setCampaigns] = useState<TestCampaign[]>(testCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<TestCampaign | null>(
    campaigns[0]
  );

  const getWinnerVariant = (variants: Variant[]) => {
    return variants.reduce((winner, variant) => {
      return variant.conversionRate > winner.conversionRate ? variant : winner;
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Active Tests</h3>
          <p className="text-3xl font-bold text-blue-600">
            {campaigns.filter((c) => c.status === "running").length}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Completed Tests</h3>
          <p className="text-3xl font-bold text-green-600">
            {campaigns.filter((c) => c.status === "completed").length}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Variants</h3>
          <p className="text-3xl font-bold text-purple-600">
            {campaigns.reduce((sum, c) => sum + c.variants.length, 0)}
          </p>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">A/B Tests</h2>

          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className={`p-4 cursor-pointer transition ${
                selectedCampaign?.id === campaign.id
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedCampaign(campaign)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{campaign.type}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    campaign.status === "running"
                      ? "bg-blue-100 text-blue-800"
                      : campaign.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Started: {new Date(campaign.startDate).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>

        {selectedCampaign && (
          <div className="md:col-span-2 space-y-4">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedCampaign.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedCampaign.type}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Test
                </Button>
              </div>

              <div className="space-y-4">
                {selectedCampaign.variants.map((variant) => {
                  const isWinner =
                    variant.conversionRate ===
                    Math.max(
                      ...selectedCampaign.variants.map((v) => v.conversionRate)
                    );

                  return (
                    <div
                      key={variant.id}
                      className={`p-4 rounded-lg border-2 ${
                        isWinner && variant.visitors > 0
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {variant.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {variant.description}
                          </p>
                        </div>
                        {isWinner && variant.visitors > 0 && (
                          <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded">
                            <TrendingUp className="w-3 h-3 inline mr-1" />
                            Winner
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Visitors</p>
                          <p className="text-lg font-bold text-gray-900">
                            {variant.visitors}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Conversions</p>
                          <p className="text-lg font-bold text-gray-900">
                            {variant.conversions}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Conversion Rate
                          </p>
                          <p className="text-lg font-bold text-blue-600">
                            {variant.conversionRate.toFixed(2)}%
                          </p>
                        </div>
                      </div>

                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isWinner && variant.visitors > 0
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }`}
                          style={{
                            width: `${
                              variant.visitors > 0
                                ? (variant.conversions / variant.visitors) * 100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  {selectedCampaign.status === "running"
                    ? "End Test & Implement Winner"
                    : "Start New Test"}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">🧪 A/B Testing Best Practices</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Run tests for at least 1-2 weeks to account for daily variations</li>
          <li>• Test one variable at a time (button color, text, layout, etc.)</li>
          <li>• Aim for at least 100+ conversions per variant for statistical significance</li>
          <li>• Use 95% confidence level before declaring a winner</li>
          <li>• Implement winners immediately and move to next test</li>
          <li>• Document all tests and results for future reference</li>
        </ul>
      </Card>
    </div>
  );
}
