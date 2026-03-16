import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, Code, FileText, Search, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function AdminDocumentation() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("getting-started");

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

  const documentation = {
    "getting-started": [
      {
        title: "Platform Overview",
        description: "Introduction to Clarity Engine and its core features",
        readTime: "5 min",
      },
      {
        title: "Admin Dashboard Guide",
        description: "Navigate and use all admin tools effectively",
        readTime: "8 min",
      },
      {
        title: "User Management",
        description: "Add, edit, and manage team members and roles",
        readTime: "6 min",
      },
      {
        title: "Settings Configuration",
        description: "Configure platform settings and integrations",
        readTime: "7 min",
      },
    ],
    "api-docs": [
      {
        title: "API Authentication",
        description: "Authenticate requests using API keys",
        readTime: "4 min",
      },
      {
        title: "Tools Endpoints",
        description: "Complete reference for all tool API endpoints",
        readTime: "15 min",
      },
      {
        title: "Error Handling",
        description: "Understanding and handling API errors",
        readTime: "5 min",
      },
      {
        title: "Rate Limiting",
        description: "Rate limit tiers and best practices",
        readTime: "6 min",
      },
    ],
    "monetization": [
      {
        title: "Stripe Setup",
        description: "Configure Stripe for payment processing",
        readTime: "8 min",
      },
      {
        title: "Affiliate Program",
        description: "Manage affiliate partnerships and commissions",
        readTime: "10 min",
      },
      {
        title: "AdSense Integration",
        description: "Set up and optimize Google AdSense",
        readTime: "7 min",
      },
      {
        title: "Email Marketing",
        description: "SendGrid integration and email automation",
        readTime: "9 min",
      },
    ],
    "advanced": [
      {
        title: "Database Schema",
        description: "Understanding the database structure",
        readTime: "12 min",
      },
      {
        title: "Custom Integrations",
        description: "Build custom integrations with webhooks",
        readTime: "14 min",
      },
      {
        title: "Performance Optimization",
        description: "Optimize platform performance and scalability",
        readTime: "11 min",
      },
      {
        title: "Security Best Practices",
        description: "Security guidelines and compliance",
        readTime: "10 min",
      },
    ],
  };

  const categories = [
    { id: "getting-started", label: "Getting Started", icon: BookOpen },
    { id: "api-docs", label: "API Documentation", icon: Code },
    { id: "monetization", label: "Monetization", icon: FileText },
    { id: "advanced", label: "Advanced Topics", icon: Code },
  ];

  const currentDocs = documentation[selectedCategory as keyof typeof documentation] || [];

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
            <h1 className="text-xl font-bold text-slate-900">Documentation & Help</h1>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-slate-600" />
            <input
              type="text"
              placeholder="Search docs..."
              className="bg-transparent text-sm focus:outline-none w-48"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 p-4 sticky top-24">
              <h2 className="font-bold text-slate-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                        selectedCategory === cat.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <div className="space-y-4">
              {currentDocs.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{doc.title}</h3>
                    <ExternalLink className="h-5 w-5 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{doc.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">📖 {doc.readTime} read</span>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Read Article →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Links</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="#"
                  className="p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-slate-900 mb-1">API Reference</h3>
                  <p className="text-sm text-slate-600">Complete API documentation</p>
                </a>
                <a
                  href="#"
                  className="p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-slate-900 mb-1">Video Tutorials</h3>
                  <p className="text-sm text-slate-600">Learn with step-by-step videos</p>
                </a>
                <a
                  href="#"
                  className="p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-slate-900 mb-1">Community Forum</h3>
                  <p className="text-sm text-slate-600">Get help from the community</p>
                </a>
                <a
                  href="#"
                  className="p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-slate-900 mb-1">Support Center</h3>
                  <p className="text-sm text-slate-600">Contact our support team</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
