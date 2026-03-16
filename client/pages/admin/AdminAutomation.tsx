import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Zap, CheckCircle, Clock, AlertCircle, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminAutomation() {
  const { user, isAuthenticated } = useAuth();
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: "Welcome Email Sequence",
      trigger: "New signup",
      action: "Send welcome email + onboarding tutorial",
      status: "active",
      executions: 342,
      lastRun: "2026-03-09 14:32",
      successRate: 98.5,
    },
    {
      id: 2,
      name: "Inactive User Alert",
      trigger: "No login for 7 days",
      action: "Send re-engagement email with discount",
      status: "active",
      executions: 28,
      lastRun: "2026-03-09 08:15",
      successRate: 96.2,
    },
    {
      id: 3,
      name: "High Usage Upsell",
      trigger: "Usage above 80%",
      action: "Send upgrade recommendation",
      status: "active",
      executions: 15,
      lastRun: "2026-03-08 22:45",
      successRate: 94.8,
    },
    {
      id: 4,
      name: "Churn Prevention",
      trigger: "Risk score above 70",
      action: "Assign to success manager + send offer",
      status: "active",
      executions: 8,
      lastRun: "2026-03-09 10:20",
      successRate: 92.1,
    },
    {
      id: 5,
      name: "Monthly Report",
      trigger: "First day of month",
      action: "Generate and email monthly report",
      status: "scheduled",
      executions: 2,
      lastRun: "2026-03-01 00:05",
      successRate: 100,
    },
  ]);

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

  const activeCount = automations.filter((a) => a.status === "active").length;
  const totalExecutions = automations.reduce((sum, a) => sum + a.executions, 0);
  const avgSuccessRate = (automations.reduce((sum, a) => sum + a.successRate, 0) / automations.length).toFixed(1);

  const handleToggleAutomation = (id: number) => {
    setAutomations(
      automations.map((a) =>
        a.id === id ? { ...a, status: a.status === "active" ? "paused" : "active" } : a
      )
    );
    toast.success("Automation updated");
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
            <h1 className="text-xl font-bold text-slate-900">Automation Engine</h1>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Automation
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Active Automations</h3>
            <p className="text-3xl font-bold text-slate-900">{activeCount}</p>
            <p className="text-xs text-slate-500 mt-2">Running now</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Executions</h3>
            <p className="text-3xl font-bold text-slate-900">{totalExecutions}</p>
            <p className="text-xs text-slate-500 mt-2">All time</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Avg Success Rate</h3>
            <p className="text-3xl font-bold text-green-600">{avgSuccessRate}%</p>
            <p className="text-xs text-slate-500 mt-2">Across all automations</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Time Saved</h3>
            <p className="text-3xl font-bold text-blue-600">156h</p>
            <p className="text-xs text-slate-500 mt-2">Manual work eliminated</p>
          </div>
        </div>

        {/* Automations List */}
        <div className="space-y-4 mb-12">
          {automations.map((automation) => (
            <div key={automation.id} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{automation.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        automation.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {automation.status === "active" ? "ACTIVE" : "PAUSED"}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p>Trigger: {automation.trigger}</p>
                    <p>Action: {automation.action}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleAutomation(automation.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                    automation.status === "active"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {automation.status === "active" ? "Pause" : "Resume"}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 bg-slate-50 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Executions</p>
                  <p className="text-lg font-bold text-slate-900">{automation.executions}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Success Rate</p>
                  <p className="text-lg font-bold text-green-600">{automation.successRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Last Run</p>
                  <p className="text-lg font-bold text-slate-900">{automation.lastRun}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  View Logs
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  Duplicate
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Automation Templates */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Automation Templates
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">Engagement Automation</h3>
              <p className="text-sm text-slate-600 mb-3">Send tips and resources based on tool usage patterns</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Create
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">Upsell Automation</h3>
              <p className="text-sm text-slate-600 mb-3">Recommend upgrades when usage reaches thresholds</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Create
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">Retention Automation</h3>
              <p className="text-sm text-slate-600 mb-3">Win back inactive users with personalized offers</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Create
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">Feedback Automation</h3>
              <p className="text-sm text-slate-600 mb-3">Collect NPS and feature requests at key moments</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
