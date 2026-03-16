import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, Share2, Lock, MessageSquare, FileText, Plus, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const teamWorkspaces = [
  {
    id: "workspace-1",
    name: "Marketing Team",
    description: "SEO and content marketing team",
    members: 5,
    projects: 3,
    lastActive: "2 hours ago",
    role: "Owner",
    sharedResults: 12,
  },
  {
    id: "workspace-2",
    name: "Client Project - TechCorp",
    description: "SEO audit and optimization for TechCorp",
    members: 3,
    projects: 1,
    lastActive: "30 minutes ago",
    role: "Collaborator",
    sharedResults: 8,
  },
  {
    id: "workspace-3",
    name: "Content Strategy",
    description: "Content planning and optimization",
    members: 4,
    projects: 2,
    lastActive: "1 day ago",
    role: "Editor",
    sharedResults: 5,
  },
];

const recentSharedResults = [
  {
    id: "result-1",
    title: "Homepage SEO Audit",
    tool: "Page Speed Insights",
    sharedBy: "Sarah Johnson",
    sharedDate: "2 hours ago",
    workspace: "Marketing Team",
    score: 92,
  },
  {
    id: "result-2",
    title: "Competitor Backlink Analysis",
    tool: "Backlink Checker",
    sharedBy: "Mike Chen",
    sharedDate: "4 hours ago",
    workspace: "Client Project - TechCorp",
    score: 85,
  },
  {
    id: "result-3",
    title: "Keyword Gap Analysis",
    tool: "Keyword Research",
    sharedBy: "Emily Davis",
    sharedDate: "1 day ago",
    workspace: "Content Strategy",
    score: 78,
  },
];

export default function TeamCollaboration() {
  const { user, isAuthenticated } = useAuth();
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Sign In Required</h1>
          <p className="text-slate-600 mb-8">Please sign in to access team collaboration features.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    toast.success("Workspace link copied!");
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Clarity Engine
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user?.name}</span>
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Team Collaboration</h1>
            <p className="text-slate-600">Share tool results and collaborate with your team in real-time.</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Workspace
          </Button>
        </div>

        {/* Workspaces */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Workspaces</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {teamWorkspaces.map((workspace) => (
              <div key={workspace.id} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{workspace.name}</h3>
                    <p className="text-sm text-slate-600">{workspace.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {workspace.role}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                  <div>
                    <span className="text-slate-600">Members</span>
                    <p className="font-semibold text-slate-900">{workspace.members}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Projects</span>
                    <p className="font-semibold text-slate-900">{workspace.projects}</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Shared Results</span>
                    <p className="font-semibold text-slate-900">{workspace.sharedResults}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-4">Last active: {workspace.lastActive}</p>

                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/team/${workspace.id}`}>Open Workspace</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(`https://clarity-engine.com/team/invite/${workspace.id}`, workspace.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Shared Results */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Share2 className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">Recent Shared Results</h2>
          </div>

          <div className="space-y-4">
            {recentSharedResults.map((result) => (
              <div key={result.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">{result.title}</h4>
                    <p className="text-sm text-slate-600">{result.tool}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{result.score}</div>
                    <div className="text-xs text-slate-600">Score</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div>
                    <span>Shared by {result.sharedBy}</span>
                    <span className="mx-2">•</span>
                    <span>{result.sharedDate}</span>
                  </div>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded">{result.workspace}</span>
                </div>

                <div className="mt-3 flex gap-2">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <a href="#">View Details</a>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <MessageSquare className="h-4 w-4" />
                    Comment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <Users className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">Team Management</h3>
            <p className="text-sm text-slate-600">Invite team members, manage permissions, and organize projects.</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <Share2 className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">Real-time Sharing</h3>
            <p className="text-sm text-slate-600">Share tool results instantly with your team and get feedback.</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <Lock className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">Secure Access</h3>
            <p className="text-sm text-slate-600">Control who can view, edit, and share your SEO data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
