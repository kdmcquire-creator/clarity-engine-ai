import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Shield, Lock, AlertTriangle, CheckCircle, Key, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSecurity() {
  const { user, isAuthenticated } = useAuth();
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [ipWhitelistEnabled, setIpWhitelistEnabled] = useState(false);

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

  const securityMetrics = [
    { label: "Security Score", value: "92/100", status: "excellent", icon: Shield },
    { label: "Last Audit", value: "5 days ago", status: "good", icon: CheckCircle },
    { label: "Active Sessions", value: "12", status: "good", icon: Eye },
    { label: "Failed Login Attempts", value: "3", status: "warning", icon: AlertTriangle },
  ];

  const securityFeatures = [
    {
      name: "Two-Factor Authentication",
      status: twoFAEnabled,
      description: "Require 2FA for all admin accounts",
      icon: Lock,
    },
    {
      name: "IP Whitelist",
      status: ipWhitelistEnabled,
      description: "Restrict admin access to specific IPs",
      icon: Shield,
    },
    {
      name: "API Key Rotation",
      status: true,
      description: "Rotate API keys every 90 days",
      icon: Key,
    },
    {
      name: "SSL/TLS Encryption",
      status: true,
      description: "All traffic encrypted with TLS 1.3",
      icon: Lock,
    },
  ];

  const auditLog = [
    {
      action: "Admin login",
      user: "john@clarity-engine.ai",
      ip: "203.0.113.42",
      timestamp: "2026-03-10 08:15:00",
      status: "success",
    },
    {
      action: "API key created",
      user: "sarah@clarity-engine.ai",
      ip: "198.51.100.89",
      timestamp: "2026-03-10 07:45:23",
      status: "success",
    },
    {
      action: "Failed login attempt",
      user: "unknown",
      ip: "192.0.2.15",
      timestamp: "2026-03-10 06:32:11",
      status: "failed",
    },
    {
      action: "Password changed",
      user: "mike@clarity-engine.ai",
      ip: "203.0.113.99",
      timestamp: "2026-03-10 05:20:45",
      status: "success",
    },
  ];

  const handleToggleSecurity = (feature: string) => {
    if (feature === "2fa") {
      setTwoFAEnabled(!twoFAEnabled);
      toast.success(`Two-Factor Authentication ${!twoFAEnabled ? "enabled" : "disabled"}`);
    } else if (feature === "ip") {
      setIpWhitelistEnabled(!ipWhitelistEnabled);
      toast.success(`IP Whitelist ${!ipWhitelistEnabled ? "enabled" : "disabled"}`);
    }
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
            <h1 className="text-xl font-bold text-slate-900">Security & Compliance</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Security Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {securityMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-600">{metric.label}</h3>
                  <Icon
                    className={`h-5 w-5 ${
                      metric.status === "excellent"
                        ? "text-green-600"
                        : metric.status === "good"
                          ? "text-blue-600"
                          : "text-yellow-600"
                    }`}
                  />
                </div>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              </div>
            );
          })}
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Security Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-slate-600 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-slate-900">{feature.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">{feature.description}</p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        feature.status
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {feature.status ? "Enabled" : "Disabled"}
                    </div>
                  </div>
                  {(feature.name === "Two-Factor Authentication" ||
                    feature.name === "IP Whitelist") && (
                    <button
                      onClick={() =>
                        handleToggleSecurity(
                          feature.name === "Two-Factor Authentication" ? "2fa" : "ip"
                        )
                      }
                      className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {feature.status ? "Disable" : "Enable"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Audit Log</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Action</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">User</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">IP Address</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Timestamp</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((log, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900">{log.action}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{log.user}</td>
                    <td className="py-3 px-4 text-sm font-mono text-slate-600">{log.ip}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{log.timestamp}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          log.status === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {log.status === "success" ? "Success" : "Failed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
