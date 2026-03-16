import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Zap, CheckCircle, AlertCircle, Settings, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminIntegrations() {
  const { user, isAuthenticated } = useAuth();
  const [integrations, setIntegrations] = useState([
    {
      name: "Stripe",
      category: "Payments",
      status: "connected",
      description: "Payment processing for subscriptions",
      icon: "💳",
    },
    {
      name: "SendGrid",
      category: "Email",
      status: "pending",
      description: "Email delivery and automation",
      icon: "📧",
    },
    {
      name: "Google Analytics",
      category: "Analytics",
      status: "connected",
      description: "Website traffic and user behavior",
      icon: "📊",
    },
    {
      name: "Slack",
      category: "Notifications",
      status: "disconnected",
      description: "Real-time alerts and notifications",
      icon: "💬",
    },
    {
      name: "GitHub",
      category: "Development",
      status: "connected",
      description: "Code repository and CI/CD",
      icon: "🐙",
    },
    {
      name: "Zapier",
      category: "Automation",
      status: "disconnected",
      description: "Connect with 1000+ apps",
      icon: "⚡",
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

  const handleConnect = (name: string) => {
    setIntegrations(
      integrations.map((int) =>
        int.name === name ? { ...int, status: "connected" } : int
      )
    );
    toast.success(`${name} connected successfully`);
  };

  const handleDisconnect = (name: string) => {
    setIntegrations(
      integrations.map((int) =>
        int.name === name ? { ...int, status: "disconnected" } : int
      )
    );
    toast.success(`${name} disconnected`);
  };

  const connected = integrations.filter((i) => i.status === "connected").length;
  const pending = integrations.filter((i) => i.status === "pending").length;

  const categories = ["Payments", "Email", "Analytics", "Notifications", "Development", "Automation"];

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
            <h1 className="text-xl font-bold text-slate-900">Integrations</h1>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Integration
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Connected</h3>
            <p className="text-3xl font-bold text-green-600">{connected}</p>
            <p className="text-xs text-slate-500 mt-2">Active integrations</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{pending}</p>
            <p className="text-xs text-slate-500 mt-2">Awaiting configuration</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Available</h3>
            <p className="text-3xl font-bold text-blue-600">{integrations.length}</p>
            <p className="text-xs text-slate-500 mt-2">Total integrations</p>
          </div>
        </div>

        {/* Integrations by Category */}
        {categories.map((category) => {
          const categoryIntegrations = integrations.filter((i) => i.category === category);
          return (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{category}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {categoryIntegrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{integration.icon}</span>
                        <div>
                          <h3 className="font-bold text-slate-900">{integration.name}</h3>
                          <p className="text-sm text-slate-600 mt-1">{integration.description}</p>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          integration.status === "connected"
                            ? "bg-green-100 text-green-700"
                            : integration.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {integration.status === "connected"
                          ? "Connected"
                          : integration.status === "pending"
                            ? "Pending"
                            : "Disconnected"}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {integration.status === "connected" ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleDisconnect(integration.name)}
                          >
                            Disconnect
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleConnect(integration.name)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Integration Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Integration Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Best Practices
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Test integrations in development first</li>
                <li>• Keep API keys secure and rotate regularly</li>
                <li>• Monitor integration health and logs</li>
                <li>• Set up alerts for failed syncs</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                Troubleshooting
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Check API key validity and permissions</li>
                <li>• Verify webhook endpoints are accessible</li>
                <li>• Review integration logs for errors</li>
                <li>• Contact support if issues persist</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
