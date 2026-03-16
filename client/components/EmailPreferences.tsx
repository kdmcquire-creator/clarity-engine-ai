import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Bell, Settings, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

interface EmailPreferences {
  weeklyNewsletter: boolean;
  newArticleNotifications: boolean;
  productUpdates: boolean;
  specialOffers: boolean;
  weeklyDigest: boolean;
  frequency: "daily" | "weekly" | "monthly";
}

export default function EmailPreferences() {
  const [preferences, setPreferences] = useState<EmailPreferences>({
    weeklyNewsletter: true,
    newArticleNotifications: true,
    productUpdates: false,
    specialOffers: false,
    weeklyDigest: true,
    frequency: "weekly",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: keyof Omit<EmailPreferences, "frequency">) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFrequencyChange = (freq: "daily" | "weekly" | "monthly") => {
    setPreferences((prev) => ({
      ...prev,
      frequency: freq,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Email preferences updated successfully!");
    } catch (error) {
      toast.error("Failed to save preferences");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-slate-900">
            Clarity Engine
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-600 hover:text-slate-900 transition">
              Home
            </Link>
            <Link to="/resources" className="text-slate-600 hover:text-slate-900 transition">
              Resources
            </Link>
          </div>
        </div>
      </nav>

      <div className="container max-w-2xl py-16">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Email Preferences</h1>
              <p className="text-slate-600 mt-1">Manage how you receive updates from Clarity Engine</p>
            </div>
          </div>
        </div>

        {/* Preferences Sections */}
        <div className="space-y-8">
          {/* Newsletter Section */}
          <Card className="p-8 border-slate-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Newsletter & Updates</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Receive curated SEO insights and best practices
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={preferences.weeklyNewsletter}
                  onChange={() => handleToggle("weeklyNewsletter")}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-slate-700">
                    Weekly Newsletter
                  </p>
                  <p className="text-sm text-slate-600">
                    Get the latest SEO tips, tools, and strategies every week
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={preferences.newArticleNotifications}
                  onChange={() => handleToggle("newArticleNotifications")}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-slate-700">
                    New Article Notifications
                  </p>
                  <p className="text-sm text-slate-600">
                    Be notified when we publish new in-depth guides
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={preferences.weeklyDigest}
                  onChange={() => handleToggle("weeklyDigest")}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-slate-700">
                    Weekly Digest
                  </p>
                  <p className="text-sm text-slate-600">
                    Summary of top articles and trending topics
                  </p>
                </div>
              </label>
            </div>
          </Card>

          {/* Promotional Section */}
          <Card className="p-8 border-slate-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Settings className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Promotions & Offers</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Special offers and product announcements
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={preferences.productUpdates}
                  onChange={() => handleToggle("productUpdates")}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-slate-700">
                    Product Updates
                  </p>
                  <p className="text-sm text-slate-600">
                    New features and improvements to our tools
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <Checkbox
                  checked={preferences.specialOffers}
                  onChange={() => handleToggle("specialOffers")}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-slate-700">
                    Special Offers
                  </p>
                  <p className="text-sm text-slate-600">
                    Exclusive deals and limited-time promotions
                  </p>
                </div>
              </label>
            </div>
          </Card>

          {/* Frequency Section */}
          <Card className="p-8 border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Email Frequency</h2>

            <div className="space-y-3">
              {(["daily", "weekly", "monthly"] as const).map((freq) => (
                <label key={freq} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="frequency"
                    value={freq}
                    checked={preferences.frequency === freq}
                    onChange={() => handleFrequencyChange(freq)}
                    className="w-5 h-5 text-blue-600 cursor-pointer"
                  />
                  <div>
                    <p className="font-medium text-slate-900 group-hover:text-slate-700 capitalize">
                      {freq === "daily" && "Daily"}
                      {freq === "weekly" && "Weekly"}
                      {freq === "monthly" && "Monthly"}
                    </p>
                    <p className="text-sm text-slate-600">
                      {freq === "daily" && "Get updates every day"}
                      {freq === "weekly" && "Get updates every week"}
                      {freq === "monthly" && "Get updates once a month"}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            >
              {isSaving ? "Saving..." : "Save Preferences"}
            </Button>
            <Link to="/">
              <Button
                variant="outline"
                className="flex-1 border-slate-300 text-slate-900 hover:bg-slate-100 py-3 rounded-lg font-medium transition"
              >
                Cancel
              </Button>
            </Link>
          </div>

          {/* Info Box */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <p className="text-sm text-slate-700">
              <strong>Privacy Notice:</strong> We respect your inbox. You can unsubscribe from any email at any time by clicking the unsubscribe link at the bottom of our emails. We never share your email with third parties.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
