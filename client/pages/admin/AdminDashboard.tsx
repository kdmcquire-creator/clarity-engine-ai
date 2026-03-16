import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, Mail, BarChart3, Settings, LogOut, ArrowRight, DollarSign, TrendingUp, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSubscribers: 0,
    totalComments: 0,
    toolsUsed: 0,
  });

  // Redirect non-admin users
  useEffect(() => {
    if (isAuthenticated && user?.role !== "admin") {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Access Denied</h1>
          <p className="text-slate-600 mb-8">You don't have permission to access the admin dashboard.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Clarity Engine
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Admin: {user?.name}</span>
            <Button asChild size="sm" variant="outline">
              <a href="/api/auth/logout">Logout</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Manage your Clarity Engine platform, view analytics, and monitor user engagement.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Total Users</h3>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">0</p>
            <p className="text-xs text-slate-500 mt-2">Registered accounts</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Newsletter Subscribers</h3>
              <Mail className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">0</p>
            <p className="text-xs text-slate-500 mt-2">Active subscribers</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Community Comments</h3>
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">0</p>
            <p className="text-xs text-slate-500 mt-2">Total comments</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-600">Tools Available</h3>
              <Settings className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">17</p>
            <p className="text-xs text-slate-500 mt-2">SEO tools</p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Content Management */}
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Content Management</h2>
            <p className="text-slate-600 mb-6">Manage resources, articles, and tool descriptions to keep your platform up-to-date.</p>
            <div className="space-y-3">
              <Button asChild className="w-full justify-between">
                <a href="/admin/resources">
                  Manage Resources <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <a href="/admin/articles">
                  Manage Articles <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <a href="/admin/tools">
                  Manage Tools <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">User Management</h2>
            <p className="text-slate-600 mb-6">Monitor user accounts, manage roles, and view engagement metrics.</p>
            <div className="space-y-3">
              <Button asChild className="w-full justify-between">
                <a href="/admin/users">
                  View All Users <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <a href="/admin/subscribers">
                  Newsletter Subscribers <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <a href="/admin/comments">
                  Moderate Comments <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Monetization Section */}
        <div className="mt-12 bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Monetization Management</h2>
          <Tabs defaultValue="adsense" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="adsense" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                AdSense
              </TabsTrigger>
              <TabsTrigger value="affiliate" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Affiliate Programs
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Email Campaigns
              </TabsTrigger>
            </TabsList>

            {/* AdSense Tab */}
            <TabsContent value="adsense" className="mt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">AdSense Configuration</h3>
                  <p className="text-sm text-slate-600 mb-4">Manage your Google AdSense settings and ad placements.</p>
                  <Button asChild className="w-full">
                    <a href="/admin/adsense">Configure AdSense <ArrowRight className="h-4 w-4 ml-2" /></a>
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Ad Performance</h3>
                  <p className="text-sm text-slate-600 mb-4">View earnings, impressions, and click-through rates.</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Monthly Earnings</span>
                      <span className="font-semibold text-green-600">$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Total Impressions</span>
                      <span className="font-semibold text-slate-900">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Affiliate Tab */}
            <TabsContent value="affiliate" className="mt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Affiliate Programs</h3>
                  <p className="text-sm text-slate-600 mb-4">Manage partnerships with Semrush, Surfer, Jasper, and Ahrefs.</p>
                  <Button asChild className="w-full">
                    <a href="/admin/affiliate">Manage Programs <ArrowRight className="h-4 w-4 ml-2" /></a>
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Earnings Summary</h3>
                  <p className="text-sm text-slate-600 mb-4">Track commissions and conversions across all programs.</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Total Commissions</span>
                      <span className="font-semibold text-orange-600">$0.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Total Clicks</span>
                      <span className="font-semibold text-slate-900">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Email Tab */}
            <TabsContent value="email" className="mt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Email Campaigns</h3>
                  <p className="text-sm text-slate-600 mb-4">Create and manage email marketing campaigns via SendGrid.</p>
                  <Button asChild className="w-full">
                    <a href="/admin/email">Manage Campaigns <ArrowRight className="h-4 w-4 ml-2" /></a>
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Email Statistics</h3>
                  <p className="text-sm text-slate-600 mb-4">Monitor open rates, click rates, and subscriber engagement.</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Active Subscribers</span>
                      <span className="font-semibold text-slate-900">0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">Open Rate</span>
                      <span className="font-semibold text-pink-600">0%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Analytics Section */}
        <div className="mt-12 bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Platform Analytics</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-4">Most Popular Tools</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Keyword Research Tool</span>
                  <span className="text-sm font-semibold text-blue-600">245 uses</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Meta Tag Generator</span>
                  <span className="text-sm font-semibold text-blue-600">189 uses</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Readability Score</span>
                  <span className="text-sm font-semibold text-blue-600">156 uses</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-4">User Growth</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">This Week</span>
                  <span className="text-sm font-semibold text-green-600">+12 users</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">This Month</span>
                  <span className="text-sm font-semibold text-green-600">+48 users</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Total Users</span>
                  <span className="text-sm font-semibold text-slate-600">0</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-4">Engagement</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Avg. Session Duration</span>
                  <span className="text-sm font-semibold text-slate-600">4m 32s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Bounce Rate</span>
                  <span className="text-sm font-semibold text-slate-600">32%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-700">Newsletter CTR</span>
                  <span className="text-sm font-semibold text-slate-600">24%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
