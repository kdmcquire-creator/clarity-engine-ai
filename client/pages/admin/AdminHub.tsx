import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  BarChart3,
  Users,
  TrendingUp,
  AlertTriangle,
  Zap,
  DollarSign,
  Mail,
  Settings,
  CreditCard,
  Target,
  Clock,
  Gauge,
} from "lucide-react";

export default function AdminHub() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Access Denied</h1>
          <p className="text-slate-600 mb-6">You need admin privileges to access this page</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const adminTools = [
    {
      category: "Monetization",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      tools: [
        { name: "AdSense", path: "/admin/adsense", description: "Manage ad placements and earnings" },
        { name: "Affiliate", path: "/admin/affiliate", description: "Track affiliate commissions" },
        { name: "Email", path: "/admin/email", description: "SendGrid email campaigns" },
        { name: "Stripe", path: "/admin/stripe", description: "Payment processing" },
      ],
    },
    {
      category: "Analytics & Insights",
      icon: BarChart3,
      color: "from-blue-500 to-cyan-600",
      tools: [
        { name: "Analytics", path: "/admin/analytics", description: "Real-time revenue dashboard" },
        { name: "Conversion Funnel", path: "/admin/funnel", description: "Stage-by-stage optimization" },
        { name: "A/B Testing", path: "/admin/ab-testing", description: "Test variants and winners" },
        { name: "Reporting", path: "/admin/reporting", description: "Automated reports & alerts" },
      ],
    },
    {
      category: "Customer Success",
      icon: Users,
      color: "from-purple-500 to-pink-600",
      tools: [
        { name: "Success Dashboard", path: "/admin/customer-success", description: "Segment health & NPS" },
        { name: "Forecasting", path: "/admin/forecasting", description: "Revenue projections" },
        { name: "Churn Prediction", path: "/admin/churn-prediction", description: "At-risk customers" },
        { name: "Automation", path: "/admin/automation", description: "Automated workflows" },
      ],
    },
    {
      category: "Platform Management",
      icon: Settings,
      color: "from-orange-500 to-red-600",
      tools: [
        { name: "Content", path: "/admin/content", description: "Manage pages & resources" },
        { name: "Users", path: "/admin/users", description: "User management & roles" },
        { name: "Settings", path: "/admin/settings", description: "Platform configuration" },
        { name: "Webhooks", path: "/admin/webhooks", description: "Notification setup" },
      ],
    },
  ];

  const quickStats = [
    { label: "Total Revenue", value: "$5,840", change: "+12.5%", icon: DollarSign, color: "text-green-600" },
    { label: "Active Users", value: "156", change: "+8.3%", icon: Users, color: "text-blue-600" },
    { label: "Conversion Rate", value: "3.2%", change: "+0.8%", icon: Target, color: "text-purple-600" },
    { label: "Churn Rate", value: "3.5%", change: "-0.2%", icon: TrendingUp, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 border-b border-slate-700">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Admin Control Center</h1>
          <p className="text-slate-300">Manage monetization, analytics, customers, and platform settings</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-600">{stat.label}</h3>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </p>
              </div>
            );
          })}
        </div>

        {/* Admin Tools Grid */}
        {adminTools.map((category, catIdx) => {
          const CategoryIcon = category.icon;
          return (
            <div key={catIdx} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className={`bg-gradient-to-r ${category.color} p-3 rounded-lg`}>
                  <CategoryIcon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{category.category}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.tools.map((tool, toolIdx) => (
                  <Link key={toolIdx} href={tool.path}>
                    <a className="block bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition group">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">{tool.description}</p>
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                        <span>Open</span>
                        <span className="text-lg">→</span>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 h-12 text-base">
              <Mail className="h-5 w-5 mr-2" />
              Send Campaign Email
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 h-12 text-base">
              <Zap className="h-5 w-5 mr-2" />
              Create Automation
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 h-12 text-base">
              <Target className="h-5 w-5 mr-2" />
              Launch A/B Test
            </Button>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">System Health</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">API Status</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-xs text-slate-600">All systems operational</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Database</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-xs text-slate-600">Connected and healthy</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Email Service</span>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
              <p className="text-xs text-slate-600">Awaiting API key</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Webhooks</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-xs text-slate-600">3 active webhooks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
