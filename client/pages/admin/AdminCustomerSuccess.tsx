import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Users, TrendingUp, AlertCircle, CheckCircle, MessageSquare, Calendar } from "lucide-react";
import { useState } from "react";

export default function AdminCustomerSuccess() {
  const { user, isAuthenticated } = useAuth();
  const [selectedSegment, setSelectedSegment] = useState("all");

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

  const segments = [
    { id: "all", name: "All Customers", count: 156, health: 85 },
    { id: "pro", name: "Pro Tier", count: 98, health: 88 },
    { id: "enterprise", name: "Enterprise", count: 58, health: 92 },
  ];

  const customers = [
    {
      id: 1,
      name: "Acme Marketing",
      email: "contact@acmemarketing.com",
      tier: "Enterprise",
      signup: "2025-11-15",
      lastActive: "2026-03-09",
      usage: 85,
      health: "excellent",
      features: ["All Tools", "API Access", "Team Collab"],
      nps: 9,
      risk: "low",
    },
    {
      id: 2,
      name: "Digital Agency Pro",
      email: "hello@dagencypro.com",
      tier: "Pro",
      signup: "2026-01-20",
      lastActive: "2026-03-08",
      usage: 62,
      health: "good",
      features: ["Core Tools", "API Access"],
      nps: 7,
      risk: "low",
    },
    {
      id: 3,
      name: "SEO Freelancer Hub",
      email: "team@seofreelancer.com",
      tier: "Pro",
      signup: "2026-02-10",
      lastActive: "2026-02-28",
      usage: 35,
      health: "at-risk",
      features: ["Core Tools"],
      nps: 4,
      risk: "high",
    },
    {
      id: 4,
      name: "Content Masters",
      email: "support@contentmasters.com",
      tier: "Enterprise",
      signup: "2025-09-05",
      lastActive: "2026-03-09",
      usage: 92,
      health: "excellent",
      features: ["All Tools", "API Access", "Team Collab", "White Label"],
      nps: 10,
      risk: "low",
    },
    {
      id: 5,
      name: "Startup SEO",
      email: "hello@startupseo.io",
      tier: "Free",
      signup: "2026-02-28",
      lastActive: "2026-03-01",
      usage: 15,
      health: "at-risk",
      features: ["Limited Tools"],
      nps: 3,
      risk: "high",
    },
  ];

  const currentSegment = segments.find((s) => s.id === selectedSegment) || segments[0];
  const filteredCustomers = customers.filter((c) => {
    if (selectedSegment === "pro") return c.tier === "Pro";
    if (selectedSegment === "enterprise") return c.tier === "Enterprise";
    return true;
  });

  const atRiskCount = filteredCustomers.filter((c) => c.risk === "high").length;
  const excellentCount = filteredCustomers.filter((c) => c.health === "excellent").length;
  const avgNPS = Math.round(filteredCustomers.reduce((sum, c) => sum + c.nps, 0) / filteredCustomers.length);

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
            <h1 className="text-xl font-bold text-slate-900">Customer Success</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Segment Tabs */}
        <div className="flex gap-4 mb-12">
          {segments.map((seg) => (
            <button
              key={seg.id}
              onClick={() => setSelectedSegment(seg.id)}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                selectedSegment === seg.id
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {seg.name}
              <span className="ml-2 text-sm opacity-75">({seg.count})</span>
            </button>
          ))}
        </div>

        {/* Health Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Customers</h3>
            <p className="text-3xl font-bold text-slate-900">{currentSegment.count}</p>
            <p className="text-xs text-slate-500 mt-2">In {currentSegment.name}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Excellent Health</h3>
            <p className="text-3xl font-bold text-green-600">{excellentCount}</p>
            <p className="text-xs text-slate-500 mt-2">{Math.round((excellentCount / filteredCustomers.length) * 100)}% of segment</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">At Risk</h3>
            <p className="text-3xl font-bold text-red-600">{atRiskCount}</p>
            <p className="text-xs text-slate-500 mt-2">Need attention</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Avg NPS</h3>
            <p className="text-3xl font-bold text-blue-600">{avgNPS}</p>
            <p className="text-xs text-slate-500 mt-2">Net Promoter Score</p>
          </div>
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Customers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Tier</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Signup</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Last Active</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Usage</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Health</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">NPS</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-slate-900">{customer.name}</p>
                        <p className="text-xs text-slate-600">{customer.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {customer.tier}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{customer.signup}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{customer.lastActive}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              customer.usage >= 70
                        ? 'bg-green-600'
                        : customer.usage >= 40
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                            }`}
                            style={{ width: `${customer.usage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{customer.usage}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {customer.health === "excellent" ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : customer.health === "good" ? (
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="text-sm font-medium text-slate-900 capitalize">{customer.health}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-semibold ${customer.nps >= 8 ? 'text-green-600' : customer.nps >= 6 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {customer.nps}/10
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="text-xs">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Reach Out
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Success Playbook */}
        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">Customer Success Playbook</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-slate-900 mb-2">🎯 Onboarding</h3>
              <p className="text-sm text-slate-600 mb-3">Send welcome email with 5-step tutorial within 1 hour of signup</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Send Now
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-slate-900 mb-2">📈 Engagement</h3>
              <p className="text-sm text-slate-600 mb-3">Check-in with customers using less than 5% of tools after 7 days</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Send Check-in
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-slate-900 mb-2">💡 Upsell</h3>
              <p className="text-sm text-slate-600 mb-3">Offer upgrade to customers with high usage (above 70%)</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Create Campaign
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
