import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Copy, ExternalLink, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminAffiliate() {
  const { user, isAuthenticated } = useAuth();
  const [programs] = useState([
    {
      id: 1,
      name: "Semrush",
      logo: "🔍",
      commissionRate: "30%",
      clicks: 245,
      conversions: 12,
      earnings: "$360.00",
      trackingLink: "https://semrush.com?ref=clarity-engine",
      status: "active",
    },
    {
      id: 2,
      name: "Surfer SEO",
      logo: "🏄",
      commissionRate: "25%",
      clicks: 189,
      conversions: 8,
      earnings: "$200.00",
      trackingLink: "https://surferseo.com?ref=clarity-engine",
      status: "active",
    },
    {
      id: 3,
      name: "Jasper AI",
      logo: "✨",
      commissionRate: "20%",
      clicks: 156,
      conversions: 5,
      earnings: "$150.00",
      trackingLink: "https://jasper.ai?ref=clarity-engine",
      status: "active",
    },
    {
      id: 4,
      name: "Ahrefs",
      logo: "🔗",
      commissionRate: "35%",
      clicks: 312,
      conversions: 15,
      earnings: "$525.00",
      trackingLink: "https://ahrefs.com?ref=clarity-engine",
      status: "active",
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

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  const totalEarnings = programs.reduce((sum, p) => {
    const amount = parseFloat(p.earnings.replace("$", "").replace(",", ""));
    return sum + amount;
  }, 0);

  const totalClicks = programs.reduce((sum, p) => sum + p.clicks, 0);
  const totalConversions = programs.reduce((sum, p) => sum + p.conversions, 0);

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
            <h1 className="text-xl font-bold text-slate-900">Affiliate Programs</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-slate-900">${totalEarnings.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mt-2">All programs</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Clicks</h3>
            <p className="text-3xl font-bold text-slate-900">{totalClicks}</p>
            <p className="text-xs text-slate-500 mt-2">Affiliate links</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Conversions</h3>
            <p className="text-3xl font-bold text-slate-900">{totalConversions}</p>
            <p className="text-xs text-slate-500 mt-2">Paid signups</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold text-slate-900">
              {totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : "0"}%
            </p>
            <p className="text-xs text-slate-500 mt-2">Click to conversion</p>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition">
              {/* Program Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{program.logo}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{program.name}</h3>
                      <p className="text-xs text-slate-600">Commission: {program.commissionRate}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {program.status}
                  </span>
                </div>
              </div>

              {/* Program Stats */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Clicks</p>
                    <p className="text-2xl font-bold text-slate-900">{program.clicks}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Conversions</p>
                    <p className="text-2xl font-bold text-slate-900">{program.conversions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Earnings</p>
                    <p className="text-2xl font-bold text-green-600">{program.earnings}</p>
                  </div>
                </div>

                {/* Tracking Link */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs text-slate-600 mb-2 font-medium">Tracking Link</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={program.trackingLink}
                      readOnly
                      className="flex-1 bg-white border border-slate-300 rounded px-3 py-2 text-xs text-slate-600"
                    />
                    <button
                      onClick={() => handleCopyLink(program.trackingLink)}
                      className="p-2 hover:bg-slate-200 rounded transition"
                    >
                      <Copy className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button asChild variant="outline" className="flex-1 text-xs">
                    <a href={program.trackingLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit Site
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    View Stats
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Guide */}
        <div className="mt-12 bg-purple-50 border border-purple-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Affiliate Setup Guide</h2>
          <ol className="space-y-3 text-purple-900">
            <li className="flex gap-3">
              <span className="font-semibold">1.</span>
              <span>Sign up for each affiliate program (Semrush, Surfer, Jasper, Ahrefs)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">2.</span>
              <span>Get your unique referral/tracking links from each program's dashboard</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">3.</span>
              <span>Update the tracking links above with your personal affiliate links</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">4.</span>
              <span>Share these links in your Resources, Pricing page, and email campaigns</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">5.</span>
              <span>Monitor clicks and conversions to optimize your affiliate strategy</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
