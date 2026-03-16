import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Save, AlertCircle, CheckCircle, Lock, Bell, Palette, Database } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { user, isAuthenticated } = useAuth();
  const [settings, setSettings] = useState({
    siteName: "Clarity Engine",
    siteUrl: "https://clarity-engine.ai",
    supportEmail: "support@clarity-engine.ai",
    timezone: "America/Chicago",
    currency: "USD",
    maintenanceMode: false,
    allowNewSignups: true,
    requireEmailVerification: true,
    stripeTestMode: true,
    sendgridEnabled: false,
    googleAnalyticsEnabled: false,
  });

  const [activeTab, setActiveTab] = useState("general");

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

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const handleToggleSetting = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const tabs = [
    { id: "general", label: "General", icon: Palette },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Database },
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
            <h1 className="text-xl font-bold text-slate-900">Platform Settings</h1>
          </div>
          <Button onClick={handleSaveSettings} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="bg-white rounded-lg border border-slate-200 p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">General Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Site URL</label>
                <input
                  type="text"
                  value={settings.siteUrl}
                  onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>America/Chicago</option>
                    <option>America/New_York</option>
                    <option>America/Los_Angeles</option>
                    <option>Europe/London</option>
                    <option>Europe/Paris</option>
                    <option>Asia/Tokyo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>JPY</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="bg-white rounded-lg border border-slate-200 p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Security Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-slate-900">Maintenance Mode</h3>
                  <p className="text-sm text-slate-600">Disable access for all non-admin users</p>
                </div>
                <button
                  onClick={() => handleToggleSetting("maintenanceMode")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.maintenanceMode ? "bg-red-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.maintenanceMode ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-slate-900">Require Email Verification</h3>
                  <p className="text-sm text-slate-600">Users must verify email before accessing platform</p>
                </div>
                <button
                  onClick={() => handleToggleSetting("requireEmailVerification")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.requireEmailVerification ? "bg-green-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.requireEmailVerification ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-slate-900">Allow New Signups</h3>
                  <p className="text-sm text-slate-600">Enable or disable new user registrations</p>
                </div>
                <button
                  onClick={() => handleToggleSetting("allowNewSignups")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.allowNewSignups ? "bg-green-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.allowNewSignups ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Integrations */}
        {activeTab === "integrations" && (
          <div className="bg-white rounded-lg border border-slate-200 p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Integrations</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-slate-900">Stripe Test Mode</h3>
                  <p className="text-sm text-slate-600">Using test API keys for payments</p>
                </div>
                <div className="flex items-center gap-2">
                  {settings.stripeTestMode && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                  <button
                    onClick={() => handleToggleSetting("stripeTestMode")}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                      settings.stripeTestMode ? "bg-yellow-600" : "bg-green-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                        settings.stripeTestMode ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-slate-900">SendGrid Email Service</h3>
                  <p className="text-sm text-slate-600">Email automation and campaigns</p>
                </div>
                <div className="flex items-center gap-2">
                  {!settings.sendgridEnabled && <AlertCircle className="h-5 w-5 text-red-600" />}
                  <button
                    onClick={() => handleToggleSetting("sendgridEnabled")}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                      settings.sendgridEnabled ? "bg-green-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                        settings.sendgridEnabled ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-slate-900">Google Analytics</h3>
                  <p className="text-sm text-slate-600">Traffic and conversion tracking</p>
                </div>
                <div className="flex items-center gap-2">
                  {!settings.googleAnalyticsEnabled && <AlertCircle className="h-5 w-5 text-red-600" />}
                  <button
                    onClick={() => handleToggleSetting("googleAnalyticsEnabled")}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                      settings.googleAnalyticsEnabled ? "bg-green-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                        settings.googleAnalyticsEnabled ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
