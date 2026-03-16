import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Plus, Mail, Trash2, Edit, CheckCircle, Clock, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminTeam() {
  const { user, isAuthenticated } = useAuth();
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@clarity-engine.ai",
      role: "Owner",
      status: "active",
      joined: "2025-11-15",
      permissions: ["all"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@clarity-engine.ai",
      role: "Admin",
      status: "active",
      joined: "2026-01-20",
      permissions: ["analytics", "users", "content", "settings"],
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@clarity-engine.ai",
      role: "Editor",
      status: "active",
      joined: "2026-02-10",
      permissions: ["content", "analytics"],
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@clarity-engine.ai",
      role: "Analyst",
      status: "pending",
      joined: "2026-03-01",
      permissions: ["analytics"],
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Editor");

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

  const handleInviteTeamMember = () => {
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    setTeamMembers([
      ...teamMembers,
      {
        id: teamMembers.length + 1,
        name: inviteEmail.split("@")[0],
        email: inviteEmail,
        role: inviteRole,
        status: "pending",
        joined: new Date().toISOString().split("T")[0],
        permissions: [],
      },
    ]);
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
  };

  const handleRemoveMember = (id: number) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id));
    toast.success("Team member removed");
  };

  const activeCount = teamMembers.filter((m) => m.status === "active").length;
  const pendingCount = teamMembers.filter((m) => m.status === "pending").length;

  const rolePermissions = {
    Owner: ["all"],
    Admin: ["analytics", "users", "content", "settings", "monetization"],
    Editor: ["content", "analytics"],
    Analyst: ["analytics"],
    Viewer: ["analytics"],
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
            <h1 className="text-xl font-bold text-slate-900">Team Management</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Total Members</h3>
            <p className="text-3xl font-bold text-slate-900">{teamMembers.length}</p>
            <p className="text-xs text-slate-500 mt-2">Team size</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Active</h3>
            <p className="text-3xl font-bold text-green-600">{activeCount}</p>
            <p className="text-xs text-slate-500 mt-2">Accepted invitations</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
            <p className="text-xs text-slate-500 mt-2">Awaiting acceptance</p>
          </div>
        </div>

        {/* Invite Section */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Invite Team Member</h2>
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="team@example.com"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Role</label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Admin</option>
                <option>Editor</option>
                <option>Analyst</option>
                <option>Viewer</option>
              </select>
            </div>
            <Button onClick={handleInviteTeamMember} className="flex items-center gap-2 h-10">
              <Plus className="h-4 w-4" />
              Send Invite
            </Button>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Member</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Permissions</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-slate-900">{member.name}</p>
                        <p className="text-xs text-slate-600">{member.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {member.status === "active" ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">Active</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-600">Pending</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{member.joined}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{member.permissions.length} permissions</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded transition" title="Edit">
                          <Edit className="h-4 w-4 text-slate-600" />
                        </button>
                        {member.role !== "Owner" && (
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="p-2 hover:bg-red-100 rounded transition"
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Permissions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Role Permissions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(rolePermissions).map(([role, perms]) => (
              <div key={role} className="bg-white rounded-lg p-4 border border-blue-200">
                <h3 className="font-bold text-slate-900 mb-3">{role}</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {Array.isArray(perms) && perms[0] === "all" ? (
                    <li className="text-green-600 font-semibold">Full access to all features</li>
                  ) : (
                    Array.isArray(perms) &&
                    perms.map((perm) => (
                      <li key={perm} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {perm.charAt(0).toUpperCase() + perm.slice(1)}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
