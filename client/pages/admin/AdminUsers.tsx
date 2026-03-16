import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Users, Shield, Trash2, Edit, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminUsers() {
  const { user, isAuthenticated } = useAuth();
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@acmemarketing.com",
      role: "admin",
      tier: "Enterprise",
      status: "active",
      joined: "2025-11-15",
      lastLogin: "2026-03-09 14:32",
      tools: 17,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@dagencypro.com",
      role: "user",
      tier: "Pro",
      status: "active",
      joined: "2026-01-20",
      lastLogin: "2026-03-08 09:15",
      tools: 8,
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@seofreelancer.com",
      role: "user",
      tier: "Pro",
      status: "inactive",
      joined: "2026-02-10",
      lastLogin: "2026-02-28 16:45",
      tools: 3,
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@contentmasters.com",
      role: "admin",
      tier: "Enterprise",
      status: "active",
      joined: "2025-09-05",
      lastLogin: "2026-03-09 11:20",
      tools: 17,
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      email: "alex@startupseo.io",
      role: "user",
      tier: "Free",
      status: "active",
      joined: "2026-02-28",
      lastLogin: "2026-03-01 08:30",
      tools: 2,
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

  const handlePromoteToAdmin = (id: number) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: "admin" } : u)));
    toast.success("User promoted to admin");
  };

  const handleDemoteToUser = (id: number) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: "user" } : u)));
    toast.success("User demoted to regular user");
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("User deleted");
  };

  const adminCount = users.filter((u) => u.role === "admin").length;
  const activeCount = users.filter((u) => u.status === "active").length;
  const totalUsers = users.length;

  const stats = [
    { label: "Total Users", value: totalUsers, icon: Users },
    { label: "Active", value: activeCount, icon: CheckCircle },
    { label: "Admins", value: adminCount, icon: Shield },
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
            <h1 className="text-xl font-bold text-slate-900">User Management</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-600">{stat.label}</h3>
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">User</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Tier</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Last Login</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Tools</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-600">{u.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {u.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{u.tier}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {u.status === "active" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                        )}
                        <span className="text-sm font-medium text-slate-900 capitalize">{u.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{u.joined}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{u.lastLogin}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-slate-900">{u.tools}/17</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            u.role === "admin"
                              ? handleDemoteToUser(u.id)
                              : handlePromoteToAdmin(u.id)
                          }
                          className="p-2 hover:bg-slate-100 rounded transition"
                          title={u.role === "admin" ? "Demote to user" : "Promote to admin"}
                        >
                          <Shield className="h-4 w-4 text-slate-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-2 hover:bg-red-100 rounded transition"
                          title="Delete user"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
