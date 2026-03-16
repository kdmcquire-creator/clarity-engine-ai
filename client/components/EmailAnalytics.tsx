import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Eye, MousePointerClick, TrendingUp, Users, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function EmailAnalytics() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [dateRange, setDateRange] = useState("30days");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!user || user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Admin access required</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Mock data for analytics
  const metrics = {
    totalSent: 15240,
    openRate: 28.5,
    clickRate: 4.2,
    bounceRate: 0.8,
    subscriberGrowth: 342,
  };

  const engagementData = [
    { date: "Mar 1", sent: 1200, opened: 340, clicked: 45 },
    { date: "Mar 2", sent: 1400, opened: 392, clicked: 58 },
    { date: "Mar 3", sent: 1100, opened: 308, clicked: 42 },
    { date: "Mar 4", sent: 1600, opened: 456, clicked: 72 },
    { date: "Mar 5", sent: 1300, opened: 371, clicked: 51 },
    { date: "Mar 6", sent: 1500, opened: 428, clicked: 68 },
    { date: "Mar 7", sent: 1800, opened: 514, clicked: 85 },
  ];

  const campaignPerformance = [
    { name: "Welcome Email", sent: 2500, opened: 875, clicked: 125, bounced: 20 },
    { name: "Weekly Newsletter", sent: 8200, opened: 2050, clicked: 280, bounced: 65 },
    { name: "New Article Alert", sent: 3100, opened: 837, clicked: 118, bounced: 25 },
    { name: "Special Offers", sent: 1440, opened: 288, clicked: 36, bounced: 12 },
  ];

  const subscriberGrowth = [
    { month: "Jan", subscribers: 2400 },
    { month: "Feb", subscribers: 2800 },
    { month: "Mar", subscribers: 3142 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Email Analytics</h1>
              <p className="text-muted-foreground">Track email performance and engagement metrics</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="mb-6">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                Total Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalSent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">emails sent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-500" />
                Open Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.openRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">of emails opened</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 text-purple-500" />
                Click Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.clickRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">of emails clicked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-500" />
                Bounce Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.bounceRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">bounced emails</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                New Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{metrics.subscriberGrowth}</div>
              <p className="text-xs text-muted-foreground mt-1">this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Engagement Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trend</CardTitle>
              <CardDescription>Emails sent, opened, and clicked over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sent" stroke="#3b82f6" name="Sent" />
                  <Line type="monotone" dataKey="opened" stroke="#10b981" name="Opened" />
                  <Line type="monotone" dataKey="clicked" stroke="#8b5cf6" name="Clicked" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subscriber Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Growth</CardTitle>
              <CardDescription>Monthly subscriber count</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subscriberGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="subscribers" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Detailed metrics for each email campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Campaign</th>
                    <th className="text-right py-3 px-4 font-medium">Sent</th>
                    <th className="text-right py-3 px-4 font-medium">Opened</th>
                    <th className="text-right py-3 px-4 font-medium">Open Rate</th>
                    <th className="text-right py-3 px-4 font-medium">Clicked</th>
                    <th className="text-right py-3 px-4 font-medium">Click Rate</th>
                    <th className="text-right py-3 px-4 font-medium">Bounced</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignPerformance.map((campaign) => (
                    <tr key={campaign.name} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{campaign.name}</td>
                      <td className="text-right py-3 px-4">{campaign.sent.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">{campaign.opened.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">
                        {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                      </td>
                      <td className="text-right py-3 px-4">{campaign.clicked.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">
                        {((campaign.clicked / campaign.sent) * 100).toFixed(2)}%
                      </td>
                      <td className="text-right py-3 px-4">{campaign.bounced.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
