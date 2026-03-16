import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { LogOut, Star, Clock, Settings, Home } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [savedTools, setSavedTools] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<string[]>([]);
  
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="container flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-slate-900">
              Clarity Engine
            </Link>
          </div>
        </nav>
        <div className="container py-24 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Access Denied</h1>
          <p className="text-slate-600 mb-8">You need to be signed in to access your dashboard.</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleSaveTool = (toolName: string) => {
    if (savedTools.includes(toolName)) {
      setSavedTools(savedTools.filter(t => t !== toolName));
      toast.success(`Removed "${toolName}" from saved tools`);
    } else {
      setSavedTools([...savedTools, toolName]);
      toast.success(`Saved "${toolName}" to your favorites`);
    }
  };

  const tools = [
    "Keyword Density Checker",
    "Meta Tag Generator",
    "Readability Score",
    "Page Speed Checker",
    "Heading Analyzer",
    "Schema Markup Generator",
    "Title Tag Optimizer",
    "URL Structure Analyzer",
    "Backlink Checker",
    "Internal Link Analyzer",
    "Content Gap Analyzer",
    "Competitor Analysis",
    "Keyword Research",
    "SERP Simulator",
    "Mobile Friendliness",
    "Duplicate Content Detector",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Clarity Engine
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">
              Tools
            </Link>
            <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition">
              Resources
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">
              About
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* User Profile Card */}
          <Card className="md:col-span-1 p-6 bg-white border-slate-200">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">{user.name}</h2>
              <p className="text-sm text-slate-600 mb-6">{user.email}</p>
              <Separator className="my-6" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Saved Tools:</span>
                  <span className="font-semibold text-slate-900">{savedTools.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Member Since:</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center gap-4">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-slate-600">Saved Tools</p>
                <p className="text-2xl font-bold text-slate-900">{savedTools.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center gap-4">
              <Clock className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-slate-600">Tools Used</p>
                <p className="text-2xl font-bold text-slate-900">{recentTools.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-slate-200">
            <div className="flex items-center gap-4">
              <Settings className="h-8 w-8 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Account Status</p>
                <p className="text-2xl font-bold text-slate-900">Active</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Saved Tools Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Your Saved Tools</h2>
          {savedTools.length === 0 ? (
            <Card className="p-12 bg-white border-slate-200 text-center">
              <Star className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 mb-6">You haven't saved any tools yet.</p>
              <Link href="/tools">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Explore Tools
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.filter(tool => savedTools.includes(tool)).map((tool, i) => (
                <Card key={i} className="p-6 bg-white border-slate-200 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">{tool}</h3>
                    <button
                      onClick={() => toggleSaveTool(tool)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">One of your favorite SEO tools</p>
                  <Link href="/tools">
                    <Button variant="outline" size="sm" className="w-full">
                      Use Tool
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* All Tools Section */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">All Available Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, i) => (
              <Card key={i} className="p-6 bg-white border-slate-200 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-base font-semibold text-slate-900">{tool}</h3>
                  <button
                    onClick={() => toggleSaveTool(tool)}
                    className={`${savedTools.includes(tool) ? "text-yellow-500" : "text-slate-300 hover:text-slate-400"}`}
                  >
                    <Star className={`h-5 w-5 ${savedTools.includes(tool) ? "fill-current" : ""}`} />
                  </button>
                </div>
                <Link href="/tools">
                  <Button variant="outline" size="sm" className="w-full">
                    Try Now
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-16">
        <div className="container text-center">
          <p>&copy; 2026 Clarity Engine. All rights reserved. Built by a team of SEO experts.</p>
        </div>
      </footer>
    </div>
  );
}
