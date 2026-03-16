import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Copy, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminAdSense() {
  const { user, isAuthenticated } = useAuth();
  const [adSlots, setAdSlots] = useState([
    { id: 1, name: "Header Banner", slotId: "ca-pub-xxxxxxxxxxxxxxxx/1234567890", placement: "header", status: "active" },
    { id: 2, name: "Sidebar Ad", slotId: "ca-pub-xxxxxxxxxxxxxxxx/0987654321", placement: "sidebar", status: "active" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", slotId: "", placement: "header" });

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

  const handleCopySlotId = (slotId: string) => {
    navigator.clipboard.writeText(slotId);
    toast.success("Slot ID copied to clipboard!");
  };

  const handleAddSlot = () => {
    if (!formData.name || !formData.slotId) {
      toast.error("Please fill in all fields");
      return;
    }

    const newSlot = {
      id: adSlots.length + 1,
      name: formData.name,
      slotId: formData.slotId,
      placement: formData.placement,
      status: "active",
    };

    setAdSlots([...adSlots, newSlot]);
    setFormData({ name: "", slotId: "", placement: "header" });
    setShowForm(false);
    toast.success("Ad slot added successfully!");
  };

  const handleDeleteSlot = (id: number) => {
    setAdSlots(adSlots.filter((slot) => slot.id !== id));
    toast.success("Ad slot removed");
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
            <h1 className="text-xl font-bold text-slate-900">AdSense Management</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Monthly Earnings</h3>
            <p className="text-3xl font-bold text-slate-900">$0.00</p>
            <p className="text-xs text-slate-500 mt-2">Last 30 days</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Impressions</h3>
            <p className="text-3xl font-bold text-slate-900">0</p>
            <p className="text-xs text-slate-500 mt-2">All time</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Click Rate</h3>
            <p className="text-3xl font-bold text-slate-900">0%</p>
            <p className="text-xs text-slate-500 mt-2">Average CTR</p>
          </div>
        </div>

        {/* Ad Slots Management */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Ad Slots</h2>
            <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Ad Slot
            </Button>
          </div>

          {/* Add Slot Form */}
          {showForm && (
            <div className="bg-slate-50 rounded-lg p-6 mb-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Create New Ad Slot</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Slot Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Header Banner"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">AdSense Slot ID</label>
                  <input
                    type="text"
                    placeholder="ca-pub-xxxxxxxxxxxxxxxx/1234567890"
                    value={formData.slotId}
                    onChange={(e) => setFormData({ ...formData, slotId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Placement</label>
                  <select
                    value={formData.placement}
                    onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="header">Header</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="footer">Footer</option>
                    <option value="content">Content</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleAddSlot} className="flex-1">
                    Add Slot
                  </Button>
                  <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Ad Slots List */}
          <div className="space-y-4">
            {adSlots.map((slot) => (
              <div key={slot.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">{slot.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">Placement: {slot.placement}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {slot.status}
                  </span>
                </div>
                <div className="bg-slate-50 rounded p-3 mb-3 flex items-center justify-between">
                  <code className="text-xs text-slate-600 break-all">{slot.slotId}</code>
                  <button
                    onClick={() => handleCopySlotId(slot.slotId)}
                    className="ml-2 p-1 hover:bg-slate-200 rounded transition"
                  >
                    <Copy className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Guide */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Setup Instructions</h2>
          <ol className="space-y-3 text-blue-900">
            <li className="flex gap-3">
              <span className="font-semibold">1.</span>
              <span>Create a Google AdSense account at <a href="https://www.google.com/adsense" target="_blank" rel="noopener noreferrer" className="underline">google.com/adsense</a></span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">2.</span>
              <span>Generate ad slot IDs from your AdSense dashboard</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">3.</span>
              <span>Add each slot using the form above with its placement location</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">4.</span>
              <span>Ads will automatically display on your website in the specified placements</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
