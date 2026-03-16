import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Plus, CheckCircle, AlertCircle, Trash2, Copy, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminWebhooks() {
  const { user, isAuthenticated } = useAuth();
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      name: "Slack - Revenue Alerts",
      url: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX",
      events: ["revenue.threshold_exceeded", "churn.high_risk_detected"],
      status: "active",
      lastTriggered: "2026-03-09 14:32",
      successRate: 99.2,
      deliveries: 342,
    },
    {
      id: 2,
      name: "Email - Daily Report",
      url: "https://api.sendgrid.com/v3/mail/send",
      events: ["report.daily_generated"],
      status: "active",
      lastTriggered: "2026-03-10 00:05",
      successRate: 100,
      deliveries: 10,
    },
    {
      id: 3,
      name: "Slack - Churn Alerts",
      url: "https://hooks.slack.com/services/T00000000/B00000001/YYYYYYYYYYYYYYYYYYYY",
      events: ["churn.prediction_updated", "customer.at_risk"],
      status: "active",
      lastTriggered: "2026-03-09 16:45",
      successRate: 98.8,
      deliveries: 156,
    },
    {
      id: 4,
      name: "Discord - Team Notifications",
      url: "https://discordapp.com/api/webhooks/123456789/abcdefghijklmnop",
      events: ["automation.executed", "test.winner_detected"],
      status: "inactive",
      lastTriggered: "2026-02-28 11:20",
      successRate: 97.5,
      deliveries: 89,
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

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Webhook URL copied to clipboard");
  };

  const handleDeleteWebhook = (id: number) => {
    setWebhooks(webhooks.filter((w) => w.id !== id));
    toast.success("Webhook deleted");
  };

  const handleToggleWebhook = (id: number) => {
    setWebhooks(
      webhooks.map((w) =>
        w.id === id ? { ...w, status: w.status === "active" ? "inactive" : "active" } : w
      )
    );
    toast.success("Webhook updated");
  };

  const activeCount = webhooks.filter((w) => w.status === "active").length;
  const totalDeliveries = webhooks.reduce((sum, w) => sum + w.deliveries, 0);

  const eventTypes = [
    { id: "revenue.threshold_exceeded", name: "Revenue Threshold Exceeded", category: "Revenue" },
    { id: "churn.high_risk_detected", name: "High Risk Customer Detected", category: "Churn" },
    { id: "churn.prediction_updated", name: "Churn Prediction Updated", category: "Churn" },
    { id: "customer.at_risk", name: "Customer At Risk", category: "Customer" },
    { id: "automation.executed", name: "Automation Executed", category: "Automation" },
    { id: "test.winner_detected", name: "A/B Test Winner Detected", category: "Testing" },
    { id: "report.daily_generated", name: "Daily Report Generated", category: "Reporting" },
    { id: "subscription.created", name: "New Subscription", category: "Subscription" },
    { id: "subscription.cancelled", name: "Subscription Cancelled", category: "Subscription" },
    { id: "payment.failed", name: "Payment Failed", category: "Payment" },
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
            <h1 className="text-xl font-bold text-slate-900">Webhook Notifications</h1>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Webhook
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Active Webhooks</h3>
            <p className="text-3xl font-bold text-slate-900">{activeCount}</p>
            <p className="text-xs text-slate-500 mt-2">Connected and running</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Deliveries</h3>
            <p className="text-3xl font-bold text-slate-900">{totalDeliveries}</p>
            <p className="text-xs text-slate-500 mt-2">All time</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Avg Success Rate</h3>
            <p className="text-3xl font-bold text-green-600">
              {(webhooks.reduce((sum, w) => sum + w.successRate, 0) / webhooks.length).toFixed(1)}%
            </p>
            <p className="text-xs text-slate-500 mt-2">Delivery reliability</p>
          </div>
        </div>

        {/* Webhooks List */}
        <div className="space-y-4 mb-12">
          {webhooks.map((webhook) => (
            <div key={webhook.id} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{webhook.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        webhook.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {webhook.status === "active" ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700 flex-1 truncate">
                      {webhook.url}
                    </code>
                    <button
                      onClick={() => handleCopyUrl(webhook.url)}
                      className="p-2 hover:bg-slate-100 rounded transition"
                      title="Copy URL"
                    >
                      <Copy className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleWebhook(webhook.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                    webhook.status === "active"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {webhook.status === "active" ? "Disable" : "Enable"}
                </button>
              </div>

              {/* Events */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-slate-900 mb-2">Subscribed Events:</p>
                <div className="flex flex-wrap gap-2">
                  {webhook.events.map((event) => (
                    <span key={event} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 bg-slate-50 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Deliveries</p>
                  <p className="text-lg font-bold text-slate-900">{webhook.deliveries}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Success Rate</p>
                  <p className="text-lg font-bold text-green-600">{webhook.successRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1">Last Triggered</p>
                  <p className="text-lg font-bold text-slate-900">{webhook.lastTriggered}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  <Eye className="h-4 w-4 mr-1" />
                  View Logs
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs">
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteWebhook(webhook.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Available Events */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Available Events</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {eventTypes.map((event) => (
              <div key={event.id} className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{event.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{event.category}</p>
                  </div>
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">{event.id}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
