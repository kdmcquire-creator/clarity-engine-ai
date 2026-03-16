import { useState } from "react";
import { Copy, Download, TrendingUp, DollarSign, Users, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AffiliatePartnerPortal() {
  const [referralCode] = useState("CLARITY2024");
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`https://clarity-engine.ai?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { label: "Total Earnings", value: "$2,450", icon: DollarSign, color: "text-green-600" },
    { label: "Referrals", value: "24", icon: Users, color: "text-blue-600" },
    { label: "Conversions", value: "8", icon: TrendingUp, color: "text-purple-600" },
    { label: "Commission Rate", value: "15%", icon: Link2, color: "text-orange-600" },
  ];

  const referrals = [
    { id: 1, email: "john@example.com", status: "converted", earnings: "$450", date: "2024-03-10" },
    { id: 2, email: "jane@example.com", status: "pending", earnings: "$0", date: "2024-03-09" },
    { id: 3, email: "bob@example.com", status: "converted", earnings: "$300", date: "2024-03-08" },
  ];

  const marketingMaterials = [
    { title: "Email Template 1", type: "Email", size: "12 KB" },
    { title: "Social Media Graphics", type: "Images", size: "2.4 MB" },
    { title: "Landing Page Copy", type: "Document", size: "45 KB" },
    { title: "Product Brochure", type: "PDF", size: "1.2 MB" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Partner Portal</h1>
          <p className="text-xl text-gray-600">Earn up to 15% commission on every referral</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Referral Code */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-4">Your Referral Link</h2>
          <div className="flex gap-4 items-center">
            <div className="flex-1 bg-white/20 rounded-lg p-4 font-mono text-sm break-all">
              https://clarity-engine.ai?ref={referralCode}
            </div>
            <Button
              onClick={handleCopyCode}
              className="bg-white text-blue-600 hover:bg-gray-100 whitespace-nowrap"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="referrals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="materials">Marketing Materials</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>

          {/* Referrals Tab */}
          <TabsContent value="referrals">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Recent Referrals</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Earnings</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((referral) => (
                      <tr key={referral.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{referral.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              referral.status === "converted"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {referral.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-900">{referral.earnings}</td>
                        <td className="py-3 px-4 text-gray-600">{referral.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Marketing Materials Tab */}
          <TabsContent value="materials">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Download Marketing Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketingMaterials.map((material, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{material.title}</p>
                      <p className="text-sm text-gray-600">{material.type} • {material.size}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Payouts Tab */}
          <TabsContent value="payouts">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Payout History</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">March 2024 Payout</p>
                    <p className="text-sm text-gray-600">Processed on March 31, 2024</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">$450.00</p>
                </div>
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">February 2024 Payout</p>
                    <p className="text-sm text-gray-600">Processed on February 29, 2024</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">$320.00</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
