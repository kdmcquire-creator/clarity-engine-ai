import React, { useState } from "react";
import { Code, Copy, ExternalLink, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_ENDPOINTS = [
  {
    name: "List Articles",
    method: "GET",
    endpoint: "/api/trpc/articles.list",
    description: "Retrieve a list of published articles",
    params: "limit: number (default: 20)",
    example: `curl -X GET "https://api.clarity-engine.ai/api/trpc/articles.list"`,
  },
  {
    name: "Get Article by Slug",
    method: "GET",
    endpoint: "/api/trpc/articles.getBySlug",
    description: "Retrieve a specific article by its slug",
    params: "slug: string",
    example: `curl -X GET "https://api.clarity-engine.ai/api/trpc/articles.getBySlug?slug=seo-best-practices"`,
  },
  {
    name: "Create Newsletter Subscription",
    method: "POST",
    endpoint: "/api/trpc/newsletter.subscribe",
    description: "Subscribe a user to the newsletter",
    params: "email: string, source?: string",
    example: `curl -X POST "https://api.clarity-engine.ai/api/trpc/newsletter.subscribe" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@example.com","source":"website"}'`,
  },
  {
    name: "Get Leaderboard",
    method: "GET",
    endpoint: "/api/trpc/community.getLeaderboard",
    description: "Retrieve the community leaderboard",
    params: "None",
    example: `curl -X GET "https://api.clarity-engine.ai/api/trpc/community.getLeaderboard"`,
  },
  {
    name: "Create Forum Post",
    method: "POST",
    endpoint: "/api/trpc/community.createPost",
    description: "Create a new forum discussion (requires authentication)",
    params: "title: string, content: string, category: string",
    example: `curl -X POST "https://api.clarity-engine.ai/api/trpc/community.createPost" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"title":"My Discussion","content":"...","category":"general"}'`,
  },
];

const INTEGRATIONS = [
  { name: "Slack", icon: "💬", description: "Get notifications and updates directly in Slack" },
  { name: "Zapier", icon: "⚡", description: "Automate workflows with 1000+ apps" },
  { name: "Google Sheets", icon: "📊", description: "Export data directly to Google Sheets" },
  { name: "Make", icon: "🔗", description: "Build custom automation workflows" },
];

export default function APIDocumentation() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [apiKey, setApiKey] = useState("");

  const endpoint = API_ENDPOINTS[selectedEndpoint];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-wider">Developer</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">API Documentation</h1>
          <p className="text-xl text-white/90">
            Build powerful integrations with the Clarity Engine API
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* API Key Section */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-primary/10 to-secondary/10">
          <h2 className="text-2xl font-bold text-foreground mb-4">Get Your API Key</h2>
          <p className="text-foreground/60 mb-6">
            Create an API key to start building integrations with Clarity Engine
          </p>
          <div className="flex gap-4">
            <Input placeholder="Your API Key" type="password" className="flex-1" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            <Button>Generate New Key</Button>
          </div>
          <p className="text-xs text-foreground/50 mt-4">
            🔒 Keep your API key secret. Never commit it to version control.
          </p>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Endpoints List */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-foreground mb-4">Endpoints</h3>
            <div className="space-y-2">
              {API_ENDPOINTS.map((ep, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEndpoint(idx)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedEndpoint === idx
                      ? "bg-primary text-white shadow-lg"
                      : "bg-card hover:bg-muted text-foreground"
                  }`}
                >
                  <p className="font-semibold text-sm">{ep.name}</p>
                  <p className={`text-xs mt-1 ${selectedEndpoint === idx ? "text-white/70" : "text-foreground/50"}`}>
                    {ep.method} {ep.endpoint}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Endpoint Details */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded text-white font-bold text-sm ${
                  endpoint.method === "GET" ? "bg-blue-500" : "bg-green-500"
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-sm text-foreground/60 font-mono">{endpoint.endpoint}</code>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">{endpoint.name}</h3>
              <p className="text-foreground/60 mb-6">{endpoint.description}</p>

              <div className="mb-6">
                <h4 className="font-bold text-foreground mb-2">Parameters</h4>
                <p className="text-sm text-foreground/60 font-mono bg-muted p-3 rounded">
                  {endpoint.params}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-foreground mb-2">Example Request</h4>
                <div className="bg-slate-900 text-slate-100 p-4 rounded font-mono text-sm overflow-x-auto">
                  {endpoint.example}
                </div>
                <Button variant="outline" className="mt-3 gap-2" size="sm">
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>

              <Button className="w-full gap-2">
                <ExternalLink className="w-4 h-4" />
                View Full Documentation
              </Button>
            </Card>
          </div>
        </div>

        {/* Integrations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Popular Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTEGRATIONS.map((integration) => (
              <Card key={integration.name} className="p-6 text-center hover:shadow-lg transition-all cursor-pointer">
                <p className="text-4xl mb-3">{integration.icon}</p>
                <h3 className="font-bold text-foreground mb-2">{integration.name}</h3>
                <p className="text-sm text-foreground/60 mb-4">{integration.description}</p>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources */}
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Resources</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-foreground mb-2">Getting Started</h4>
              <p className="text-sm text-foreground/60 mb-3">
                Learn the basics and set up your first integration in 5 minutes
              </p>
              <Button variant="outline" size="sm">
                Read Guide
              </Button>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-2">Code Examples</h4>
              <p className="text-sm text-foreground/60 mb-3">
                Copy-paste examples in JavaScript, Python, and more
              </p>
              <Button variant="outline" size="sm">
                View Examples
              </Button>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-2">Support</h4>
              <p className="text-sm text-foreground/60 mb-3">
                Get help from our developer community and support team
              </p>
              <Button variant="outline" size="sm">
                Get Help
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
