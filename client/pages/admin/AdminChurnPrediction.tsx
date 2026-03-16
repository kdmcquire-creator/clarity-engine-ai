import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, AlertTriangle, TrendingDown, Send, Target } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminChurnPrediction() {
  const { user, isAuthenticated } = useAuth();
  const [selectedRisk, setSelectedRisk] = useState("high");

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

  const atRiskCustomers = [
    {
      id: 1,
      name: "SEO Freelancer Hub",
      email: "team@seofreelancer.com",
      tier: "Pro",
      riskScore: 92,
      riskLevel: "high",
      lastActive: "28 days ago",
      signals: ["No logins in 4 weeks", "Used only 2 tools", "Opened 0 emails"],
      reason: "Low engagement and inactive",
      retentionAction: "Send win-back email with discount",
    },
    {
      id: 2,
      name: "Startup SEO",
      email: "hello@startupseo.io",
      tier: "Free",
      riskScore: 85,
      riskLevel: "high",
      lastActive: "5 days ago",
      signals: ["Free tier user", "Low tool usage", "No upgrade interest"],
      reason: "Free user with minimal engagement",
      retentionAction: "Offer 50% discount on Pro tier",
    },
    {
      id: 3,
      name: "Local Business SEO",
      email: "contact@localbiz.com",
      tier: "Pro",
      riskScore: 72,
      riskLevel: "medium",
      lastActive: "14 days ago",
      signals: ["Declining usage", "Viewed competitor tools", "Opened pricing page"],
      reason: "Considering alternatives",
      retentionAction: "Schedule customer success call",
    },
    {
      id: 4,
      name: "Content Agency Plus",
      email: "support@contentplus.com",
      tier: "Pro",
      riskScore: 58,
      riskLevel: "medium",
      lastActive: "7 days ago",
      signals: ["Moderate usage", "One support ticket", "Viewed features page"],
      reason: "Possible feature gap",
      retentionAction: "Send feature tutorial email",
    },
  ];

  const filteredCustomers = atRiskCustomers.filter((c) => {
    if (selectedRisk === "high") return c.riskLevel === "high";
    if (selectedRisk === "medium") return c.riskLevel === "medium";
    return true;
  });

  const highRiskCount = atRiskCustomers.filter((c) => c.riskLevel === "high").length;
  const mediumRiskCount = atRiskCustomers.filter((c) => c.riskLevel === "medium").length;

  const handleSendRetention = (customerId: number) => {
    toast.success("Retention email sent successfully!");
  };

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
            <h1 className="text-xl font-bold text-slate-900">Churn Prediction & Retention</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Risk Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">High Risk</h3>
            <p className="text-3xl font-bold text-red-600">{highRiskCount}</p>
            <p className="text-xs text-slate-500 mt-2">Likely to churn soon</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Medium Risk</h3>
            <p className="text-3xl font-bold text-yellow-600">{mediumRiskCount}</p>
            <p className="text-xs text-slate-500 mt-2">Monitor closely</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Potential Revenue Loss</h3>
            <p className="text-3xl font-bold text-orange-600">$2,840</p>
            <p className="text-xs text-slate-500 mt-2">If all at-risk churn</p>
          </div>
        </div>

        {/* Risk Filters */}
        <div className="flex gap-4 mb-12">
          {["all", "high", "medium"].map((risk) => (
            <button
              key={risk}
              onClick={() => setSelectedRisk(risk)}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                selectedRisk === risk
                  ? "bg-red-600 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              {risk === "all" ? "All At-Risk" : risk === "high" ? "High Risk" : "Medium Risk"}
            </button>
          ))}
        </div>

        {/* At-Risk Customers */}
        <div className="space-y-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{customer.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        customer.riskLevel === "high"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {customer.riskLevel === "high" ? "HIGH RISK" : "MEDIUM RISK"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{customer.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-600 mb-1">Risk Score</p>
                  <p className="text-3xl font-bold text-red-600">{customer.riskScore}%</p>
                </div>
              </div>

              {/* Risk Signals */}
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Risk Signals</h4>
                  <ul className="space-y-1">
                    {customer.signals.map((signal, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <AlertTriangle className="h-3 w-3 text-red-600 flex-shrink-0" />
                        {signal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Customer Info</h4>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p>Tier: {customer.tier}</p>
                    <p>Last Active: {customer.lastActive}</p>
                    <p>Reason: {customer.reason}</p>
                  </div>
                </div>
              </div>

              {/* Retention Action */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                <p className="text-sm text-blue-900 font-medium mb-2">Recommended Action:</p>
                <p className="text-sm text-blue-800">{customer.retentionAction}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSendRetention(customer.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                  Send Retention Email
                </Button>
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                  <Target className="h-4 w-4" />
                  Schedule Call
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Retention Strategies */}
        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-green-900 mb-4">Retention Strategies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-slate-900 mb-2">Win-Back Discount</h3>
              <p className="text-sm text-slate-600 mb-3">Offer 50% off for 3 months to inactive users</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Create Campaign
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-slate-900 mb-2">Feature Tutorial</h3>
              <p className="text-sm text-slate-600 mb-3">Send video tutorials for underused features</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Create Campaign
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-slate-900 mb-2">Success Call</h3>
              <p className="text-sm text-slate-600 mb-3">Schedule 1-on-1 call with high-value customers</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
