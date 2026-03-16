import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Send, BarChart3, Settings } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: "welcome" | "newsletter" | "certification" | "upgrade" | "abandoned";
  status: "active" | "paused" | "scheduled";
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  createdAt: string;
  nextSendTime?: string;
}

interface EmailStats {
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  totalConverted: number;
  averageOpenRate: number;
  averageClickRate: number;
}

export function AdminEmailCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Welcome Series",
      type: "welcome",
      status: "active",
      sentCount: 1250,
      openRate: 45.2,
      clickRate: 12.8,
      conversionRate: 3.2,
      createdAt: "2026-03-01",
    },
    {
      id: "2",
      name: "Weekly Tips",
      type: "newsletter",
      status: "active",
      sentCount: 3400,
      openRate: 38.5,
      clickRate: 8.9,
      conversionRate: 1.5,
      createdAt: "2026-02-15",
      nextSendTime: "2026-03-10T09:00:00Z",
    },
    {
      id: "3",
      name: "Certification Alerts",
      type: "certification",
      status: "active",
      sentCount: 450,
      openRate: 62.3,
      clickRate: 28.5,
      conversionRate: 8.9,
      createdAt: "2026-02-20",
    },
    {
      id: "4",
      name: "Pro Upgrade",
      type: "upgrade",
      status: "active",
      sentCount: 2100,
      openRate: 32.1,
      clickRate: 6.4,
      conversionRate: 2.1,
      createdAt: "2026-02-10",
    },
  ]);

  const [stats] = useState<EmailStats>({
    totalSent: 7200,
    totalOpened: 2880,
    totalClicked: 720,
    totalConverted: 144,
    averageOpenRate: 40.0,
    averageClickRate: 10.0,
  });

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "paused" : "active" }
          : c
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Email Campaigns</h1>
          <p className="text-gray-600 mt-2">Manage automated email campaigns and track performance</p>
        </div>
        <Button
          onClick={() => setShowNewCampaign(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Email Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Emails Sent</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalSent.toLocaleString()}
              </p>
            </div>
            <Send className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Open Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.averageOpenRate.toFixed(1)}%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg Click Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.averageClickRate.toFixed(1)}%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Conversions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalConverted}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-500 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Campaigns List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Sent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Open Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Click Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Conversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500">
                        Created {new Date(campaign.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        campaign.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {campaign.sentCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {campaign.openRate.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {campaign.clickRate.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {campaign.conversionRate.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCampaignStatus(campaign.id)}
                    >
                      {campaign.status === "active" ? "Pause" : "Resume"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedCampaign.name}
            </h2>
            <Button
              variant="ghost"
              onClick={() => setSelectedCampaign(null)}
            >
              ✕
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900">
                {selectedCampaign.sentCount}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Open Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {selectedCampaign.openRate.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Click Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {selectedCampaign.clickRate.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-purple-600">
                {selectedCampaign.conversionRate.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Detailed Analytics
            </Button>
            <Button variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Edit Campaign Settings
            </Button>
          </div>
        </Card>
      )}

      {/* New Campaign Form */}
      {showNewCampaign && (
        <Card className="p-6 bg-green-50 border-green-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Create New Campaign
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                placeholder="e.g., Spring Promotion"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Type
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Welcome Email</option>
                <option>Newsletter</option>
                <option>Certification Alert</option>
                <option>Upgrade Promotion</option>
                <option>Abandoned Checkout</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>All Users</option>
                <option>Free Plan Users</option>
                <option>Pro Plan Users</option>
                <option>Enterprise Users</option>
                <option>Inactive Users</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => setShowNewCampaign(false)}
              >
                Create Campaign
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowNewCampaign(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
