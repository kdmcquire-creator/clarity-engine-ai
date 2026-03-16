import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Bell, Mail, Download, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminReporting() {
  const { user, isAuthenticated } = useAuth();
  const [reportFrequency, setReportFrequency] = useState("weekly");
  const [alerts, setAlerts] = useState([
    { id: 1, type: "revenue", threshold: 500, condition: "below", enabled: true, lastTriggered: "2026-03-08" },
    { id: 2, type: "conversion", threshold: 2.0, condition: "below", enabled: true, lastTriggered: "2026-03-05" },
    { id: 3, type: "churn", threshold: 5, condition: "above", enabled: true, lastTriggered: null },
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

  const handleGenerateReport = () => {
    toast.success("Report generated and sent to your email!");
  };

  const handleDownloadReport = () => {
    toast.success("Report downloaded successfully!");
  };

  const handleToggleAlert = (id: number) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)));
    toast.success("Alert preference updated");
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
            <h1 className="text-xl font-bold text-slate-900">Revenue Reporting & Alerts</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Report Generation */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Generate Reports</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Report Settings */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Report Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Report Frequency</label>
                  <select
                    value={reportFrequency}
                    onChange={(e) => setReportFrequency(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Recipients</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Include Sections</label>
                  <div className="space-y-2">
                    {["Revenue Summary", "Conversion Metrics", "Affiliate Performance", "AdSense Earnings"].map((section) => (
                      <label key={section} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm text-slate-700">{section}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button onClick={handleGenerateReport} className="w-full flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  Generate & Email Report
                </Button>
                <Button onClick={handleDownloadReport} variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  Download as PDF
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Automated Reports
                </Button>
              </div>

              {/* Recent Reports */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Recent Reports</h4>
                <div className="space-y-2">
                  {["March 9, 2026", "March 2, 2026", "February 23, 2026"].map((date) => (
                    <div key={date} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                      <span className="text-sm text-slate-600">{date}</span>
                      <Button size="sm" variant="ghost">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Management */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Alert Management
          </h2>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {alert.enabled ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-slate-400" />
                    )}
                    <div>
                      <h4 className="font-semibold text-slate-900 capitalize">
                        {alert.type} Alert
                      </h4>
                      <p className="text-sm text-slate-600">
                        Trigger when {alert.type} is {alert.condition} ${alert.threshold}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {alert.lastTriggered && (
                      <span className="text-xs text-slate-500">Last: {alert.lastTriggered}</span>
                    )}
                    <button
                      onClick={() => handleToggleAlert(alert.id)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                        alert.enabled
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {alert.enabled ? "Enabled" : "Disabled"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Alert */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Create New Alert</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Alert Type</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Revenue</option>
                  <option>Conversion</option>
                  <option>Churn</option>
                  <option>Affiliate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Condition</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Above</option>
                  <option>Below</option>
                  <option>Equals</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Threshold</label>
                <input
                  type="number"
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full">Create Alert</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Channels */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Notification Channels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">Email Notifications</h3>
              <p className="text-sm text-slate-600 mb-4">Receive alerts and reports via email</p>
              <Button variant="outline" size="sm" className="w-full">
                Configure
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">Slack Integration</h3>
              <p className="text-sm text-slate-600 mb-4">Get real-time alerts in your Slack channel</p>
              <Button variant="outline" size="sm" className="w-full">
                Connect
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-slate-900 mb-2">SMS Alerts</h3>
              <p className="text-sm text-slate-600 mb-4">Critical alerts sent to your phone</p>
              <Button variant="outline" size="sm" className="w-full">
                Enable
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
