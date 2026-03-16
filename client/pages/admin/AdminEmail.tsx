import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Plus, Edit2, Trash2, Send, BarChart3 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminEmail() {
  const { user, isAuthenticated } = useAuth();
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Welcome Email",
      type: "welcome",
      status: "active",
      recipients: 342,
      sent: 342,
      opened: 156,
      clicked: 48,
      createdAt: "2026-03-01",
    },
    {
      id: 2,
      name: "Weekly SEO Tips",
      type: "newsletter",
      status: "active",
      recipients: 289,
      sent: 289,
      opened: 124,
      clicked: 35,
      createdAt: "2026-02-15",
    },
    {
      id: 3,
      name: "Upgrade to Pro",
      type: "promotion",
      status: "active",
      recipients: 215,
      sent: 215,
      opened: 68,
      clicked: 12,
      createdAt: "2026-02-20",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "newsletter",
    subject: "",
    content: "",
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

  const handleAddCampaign = () => {
    if (!formData.name || !formData.subject) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newCampaign = {
      id: campaigns.length + 1,
      name: formData.name,
      type: formData.type,
      status: "draft",
      recipients: 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setCampaigns([...campaigns, newCampaign]);
    setFormData({ name: "", type: "newsletter", subject: "", content: "" });
    setShowForm(false);
    toast.success("Campaign created successfully!");
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    toast.success("Campaign deleted");
  };

  const handleSendCampaign = (id: number) => {
    toast.success("Campaign sent to all subscribers!");
  };

  const totalSubscribers = 342;
  const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
  const totalOpened = campaigns.reduce((sum, c) => sum + c.opened, 0);
  const totalClicked = campaigns.reduce((sum, c) => sum + c.clicked, 0);

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
            <h1 className="text-xl font-bold text-slate-900">Email Campaigns</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Active Subscribers</h3>
            <p className="text-3xl font-bold text-slate-900">{totalSubscribers}</p>
            <p className="text-xs text-slate-500 mt-2">Newsletter list</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Sent</h3>
            <p className="text-3xl font-bold text-slate-900">{totalSent}</p>
            <p className="text-xs text-slate-500 mt-2">All campaigns</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Open Rate</h3>
            <p className="text-3xl font-bold text-slate-900">
              {totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : "0"}%
            </p>
            <p className="text-xs text-slate-500 mt-2">Average</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Click Rate</h3>
            <p className="text-3xl font-bold text-slate-900">
              {totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : "0"}%
            </p>
            <p className="text-xs text-slate-500 mt-2">Average</p>
          </div>
        </div>

        {/* Campaigns Management */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Campaigns</h2>
            <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Campaign
            </Button>
          </div>

          {/* Create Campaign Form */}
          {showForm && (
            <div className="bg-slate-50 rounded-lg p-6 mb-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Create New Campaign</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Weekly Tips #5"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="newsletter">Newsletter</option>
                      <option value="promotion">Promotion</option>
                      <option value="announcement">Announcement</option>
                      <option value="welcome">Welcome</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Subject</label>
                  <input
                    type="text"
                    placeholder="e.g., Your Weekly SEO Tips"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Content</label>
                  <textarea
                    placeholder="Write your email content here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleAddCampaign} className="flex-1">
                    Create Campaign
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Campaigns List */}
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-slate-900">{campaign.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Type: {campaign.type} • Created: {campaign.createdAt}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>

                {/* Campaign Stats */}
                <div className="grid grid-cols-4 gap-4 mb-4 bg-slate-50 p-3 rounded">
                  <div>
                    <p className="text-xs text-slate-600">Sent</p>
                    <p className="text-lg font-bold text-slate-900">{campaign.sent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Opened</p>
                    <p className="text-lg font-bold text-blue-600">
                      {campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(0) : "0"}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Clicked</p>
                    <p className="text-lg font-bold text-purple-600">
                      {campaign.sent > 0 ? ((campaign.clicked / campaign.sent) * 100).toFixed(0) : "0"}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Recipients</p>
                    <p className="text-lg font-bold text-slate-900">{campaign.recipients}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <Edit2 className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 text-xs bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSendCampaign(campaign.id)}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    Send
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                  >
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Stats
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="text-xs"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SendGrid Integration Guide */}
        <div className="mt-12 bg-cyan-50 border border-cyan-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-cyan-900 mb-4">SendGrid Setup Instructions</h2>
          <ol className="space-y-3 text-cyan-900">
            <li className="flex gap-3">
              <span className="font-semibold">1.</span>
              <span>Create a SendGrid account at <a href="https://sendgrid.com" target="_blank" rel="noopener noreferrer" className="underline">sendgrid.com</a></span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">2.</span>
              <span>Generate an API key from Settings → API Keys</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">3.</span>
              <span>Add your SendGrid API key to your environment variables (SENDGRID_API_KEY)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">4.</span>
              <span>Create email templates in SendGrid dashboard</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">5.</span>
              <span>Use the form above to create and send campaigns to your subscribers</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
