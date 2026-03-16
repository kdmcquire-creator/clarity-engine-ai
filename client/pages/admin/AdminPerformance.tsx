import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Zap, AlertTriangle, TrendingDown, Database, Cpu, Wifi } from "lucide-react";
import { useState } from "react";

export default function AdminPerformance() {
  const { user, isAuthenticated } = useAuth();
  const [metrics, setMetrics] = useState({
    pageLoadTime: 1.8,
    databaseQueryTime: 45,
    apiResponseTime: 120,
    errorRate: 0.02,
    uptime: 99.98,
    cpuUsage: 32,
    memoryUsage: 58,
    bandwidthUsage: 42,
  });

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

  const performanceMetrics = [
    {
      label: "Page Load Time",
      value: `${metrics.pageLoadTime}s`,
      target: "< 2s",
      status: metrics.pageLoadTime < 2 ? "good" : "warning",
      icon: Zap,
    },
    {
      label: "Database Query Time",
      value: `${metrics.databaseQueryTime}ms`,
      target: "< 100ms",
      status: metrics.databaseQueryTime < 100 ? "good" : "warning",
      icon: Database,
    },
    {
      label: "API Response Time",
      value: `${metrics.apiResponseTime}ms`,
      target: "< 200ms",
      status: metrics.apiResponseTime < 200 ? "good" : "warning",
      icon: Wifi,
    },
    {
      label: "Error Rate",
      value: `${(metrics.errorRate * 100).toFixed(2)}%`,
      target: "< 0.1%",
      status: metrics.errorRate < 0.001 ? "good" : "warning",
      icon: AlertTriangle,
    },
  ];

  const systemMetrics = [
    {
      label: "CPU Usage",
      value: metrics.cpuUsage,
      max: 100,
      icon: Cpu,
      color: "bg-blue-500",
    },
    {
      label: "Memory Usage",
      value: metrics.memoryUsage,
      max: 100,
      icon: Database,
      color: "bg-purple-500",
    },
    {
      label: "Bandwidth Usage",
      value: metrics.bandwidthUsage,
      max: 100,
      icon: Wifi,
      color: "bg-green-500",
    },
  ];

  const optimizations = [
    {
      title: "Enable CDN Caching",
      description: "Cache static assets on CDN to reduce load times",
      impact: "Potential 30% improvement",
      status: "pending",
    },
    {
      title: "Database Query Optimization",
      description: "Add indexes to frequently queried columns",
      impact: "Potential 40% improvement",
      status: "pending",
    },
    {
      title: "Image Optimization",
      description: "Compress and lazy-load images",
      impact: "Potential 25% improvement",
      status: "in-progress",
    },
    {
      title: "Code Splitting",
      description: "Split React bundles for faster initial load",
      impact: "Potential 20% improvement",
      status: "completed",
    },
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
            <h1 className="text-xl font-bold text-slate-900">Performance Monitoring</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-600">All Systems Operational</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {performanceMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-600">{metric.label}</h3>
                  <Icon
                    className={`h-5 w-5 ${
                      metric.status === "good" ? "text-green-600" : "text-yellow-600"
                    }`}
                  />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</p>
                <p className="text-xs text-slate-500">Target: {metric.target}</p>
              </div>
            );
          })}
        </div>

        {/* System Resources */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">System Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {systemMetrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-slate-600" />
                      <h3 className="font-semibold text-slate-900">{metric.label}</h3>
                    </div>
                    <span className="text-lg font-bold text-slate-900">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${metric.color}`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Uptime */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Uptime & Reliability</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Current Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-sm font-medium text-slate-900">API Server</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-sm font-medium text-slate-900">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-sm font-medium text-slate-900">Email Service</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600 font-medium">Operational</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Uptime Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-sm text-slate-700">This Month</span>
                  <span className="text-sm font-bold text-slate-900">99.98%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-sm text-slate-700">Last 90 Days</span>
                  <span className="text-sm font-bold text-slate-900">99.95%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-sm text-slate-700">All Time</span>
                  <span className="text-sm font-bold text-slate-900">99.92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Roadmap */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance Optimization Roadmap</h2>
          <div className="space-y-4">
            {optimizations.map((opt, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{opt.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{opt.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-4 ${
                      opt.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : opt.status === "in-progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {opt.status === "completed"
                      ? "✓ Done"
                      : opt.status === "in-progress"
                        ? "In Progress"
                        : "Pending"}
                  </span>
                </div>
                <p className="text-xs text-green-600 font-medium">{opt.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
