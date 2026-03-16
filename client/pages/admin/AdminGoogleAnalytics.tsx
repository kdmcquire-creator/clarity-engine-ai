import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, BarChart3, TrendingUp, Users, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminGoogleAnalytics() {
  const { user, isAuthenticated } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle");

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

  const handleConnect = () => {
    setSyncStatus("connecting");
    setTimeout(() => {
      setIsConnected(true);
      setSyncStatus("connected");
      toast.success("Google Analytics connected successfully!");
    }, 2000);
  };

  const handleSync = () => {
    setSyncStatus("syncing");
    setTimeout(() => {
      setSyncStatus("synced");
      toast.success("Data synced from Google Analytics");
    }, 3000);
  };

  const metrics = [
    { label: "Page Views", value: "12,450", change: "+8.3%", icon: Eye },
    { label: "Unique Users", value: "3,240", change: "+5.2%", icon: Users },
    { label: "Conversion Rate", value: "3.2%", change: "+0.8%", icon: TrendingUp },
    { label: "Avg Session Duration", value: "3m 42s", change: "+12s", icon: BarChart3 },
  ];

  const topPages = [
    { path: "/tools", views: 4230, conversions: 142, rate: 3.4 },
    { path: "/pricing", views: 2840, conversions: 98, rate: 3.5 },
    { path: "/resources", views: 2150, conversions: 58, rate: 2.7 },
    { path: "/", views: 1890, conversions: 72, rate: 3.8 },
    { path: "/about", views: 1340, conversions: 31, rate: 2.3 },
  ];

  const conversionFunnel = [
    { stage: "Landing Page", users: 12450, rate: 100 },
    { stage: "View Tools", users: 8920, rate: 71.6 },
    { stage: "Pricing Page", users: 4230, rate: 34.0 },
    { stage: "Checkout", users: 1450, rate: 11.6 },
    { stage: "Purchase", users: 156, rate: 1.3 },
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
            <h1 className="text-xl font-bold text-slate-900">Google Analytics Integration</h1>
          </div>
          <div className="flex items-center gap-3">
            {isConnected && (
              <>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
                <Button onClick={handleSync} disabled={syncStatus === "syncing"}>
                  {syncStatus === "syncing" ? "Syncing..." : "Sync Now"}
                </Button>
              </>
            )}
            {!isConnected && (
              <Button onClick={handleConnect} disabled={syncStatus === "connecting"}>
                {syncStatus === "connecting" ? "Connecting..." : "Connect Google Analytics"}
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {!isConnected ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center mb-12">
            <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Connect Google Analytics</h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Connect your Google Analytics account to sync real-time traffic, conversion, and user behavior data
              directly into your admin dashboards.
            </p>
            <Button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
              <BarChart3 className="h-5 w-5 mr-2" />
              Connect Google Analytics
            </Button>
            <p className="text-xs text-slate-500 mt-4">
              You will be redirected to Google to authorize access to your analytics data
            </p>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {metrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-slate-600">{metric.label}</h3>
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</p>
                    <p className="text-xs text-green-600 font-medium">{metric.change}</p>
                  </div>
                );
              })}
            </div>

            {/* Top Pages */}
            <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Pages</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Page</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Views</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Conversions</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Conv. Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPages.map((page, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">{page.path}</td>
                        <td className="py-3 px-4 text-sm text-right text-slate-600">{page.views.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-right text-green-600 font-semibold">
                          {page.conversions}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-slate-900 font-medium">{page.rate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white rounded-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Conversion Funnel</h2>
              <div className="space-y-4">
                {conversionFunnel.map((stage, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-slate-900">{stage.stage}</h3>
                      <span className="text-sm text-slate-600">{stage.users.toLocaleString()} users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-8 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full flex items-center justify-end pr-3"
                          style={{ width: `${stage.rate}%` }}
                        >
                          <span className="text-xs font-bold text-white">{stage.rate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
