import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSupport() {
  const { user, isAuthenticated } = useAuth();
  const [tickets, setTickets] = useState([
    {
      id: "TK001",
      customer: "John Smith",
      email: "john@acmemarketing.com",
      subject: "How to use Keyword Density Checker",
      status: "open",
      priority: "medium",
      created: "2026-03-09 14:32",
      updated: "2026-03-09 16:45",
      rating: null,
    },
    {
      id: "TK002",
      customer: "Sarah Johnson",
      email: "sarah@dagencypro.com",
      subject: "Billing question about Pro tier",
      status: "resolved",
      priority: "high",
      created: "2026-03-08 09:15",
      updated: "2026-03-08 11:30",
      rating: 5,
    },
    {
      id: "TK003",
      customer: "Mike Chen",
      email: "mike@seofreelancer.com",
      subject: "API integration help",
      status: "open",
      priority: "high",
      created: "2026-03-07 10:20",
      updated: "2026-03-09 13:45",
      rating: null,
    },
    {
      id: "TK004",
      customer: "Emma Wilson",
      email: "emma@contentmasters.com",
      subject: "Feature request: Export to PDF",
      status: "resolved",
      priority: "low",
      created: "2026-03-05 08:30",
      updated: "2026-03-06 14:20",
      rating: 4,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");

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

  const handleResolveTicket = (id: string) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, status: "resolved" } : t)));
    toast.success("Ticket marked as resolved");
  };

  const openCount = tickets.filter((t) => t.status === "open").length;
  const resolvedCount = tickets.filter((t) => t.status === "resolved").length;
  const avgRating =
    tickets.filter((t) => t.rating).reduce((sum, t) => sum + (t.rating || 0), 0) /
    tickets.filter((t) => t.rating).length;

  const filteredTickets = filterStatus === "all" ? tickets : tickets.filter((t) => t.status === filterStatus);

  const stats = [
    { label: "Open Tickets", value: openCount, icon: MessageCircle, color: "text-blue-600" },
    { label: "Resolved", value: resolvedCount, icon: CheckCircle, color: "text-green-600" },
    { label: "Avg Rating", value: avgRating.toFixed(1), icon: Star, color: "text-yellow-600" },
    { label: "Response Time", value: "2.3h", icon: Clock, color: "text-purple-600" },
  ];

  const priorityColor = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-blue-100 text-blue-700",
  };

  const statusColor = {
    open: "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
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
            <h1 className="text-xl font-bold text-slate-900">Customer Support</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-600">{stat.label}</h3>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          {["all", "open", "resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-3 font-medium transition border-b-2 ${
                filterStatus === status
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {status === "all" ? "All Tickets" : status === "open" ? "Open" : "Resolved"}
            </button>
          ))}
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Ticket ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Subject</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Created</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono text-sm font-semibold text-blue-600">{ticket.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-slate-900">{ticket.customer}</p>
                        <p className="text-xs text-slate-600">{ticket.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700 max-w-xs truncate">{ticket.subject}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          statusColor[ticket.status as keyof typeof statusColor]
                        }`}
                      >
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          priorityColor[ticket.priority as keyof typeof priorityColor]
                        }`}
                      >
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{ticket.created}</td>
                    <td className="py-3 px-4">
                      {ticket.status === "open" ? (
                        <Button
                          size="sm"
                          onClick={() => handleResolveTicket(ticket.id)}
                          className="text-xs"
                        >
                          Resolve
                        </Button>
                      ) : (
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold text-slate-900">{ticket.rating}/5</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="mt-12 bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Knowledge Base</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-2">Most Viewed Articles</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex justify-between">
                  <span>Getting Started with Clarity Engine</span>
                  <span className="text-slate-500">2.4k views</span>
                </li>
                <li className="flex justify-between">
                  <span>How to Use Keyword Density Checker</span>
                  <span className="text-slate-500">1.8k views</span>
                </li>
                <li className="flex justify-between">
                  <span>API Integration Guide</span>
                  <span className="text-slate-500">1.2k views</span>
                </li>
              </ul>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-2">Support Metrics</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex justify-between">
                  <span>Avg Response Time</span>
                  <span className="font-semibold text-slate-900">2.3 hours</span>
                </li>
                <li className="flex justify-between">
                  <span>Customer Satisfaction</span>
                  <span className="font-semibold text-green-600">4.6/5</span>
                </li>
                <li className="flex justify-between">
                  <span>Resolution Rate</span>
                  <span className="font-semibold text-blue-600">92%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
