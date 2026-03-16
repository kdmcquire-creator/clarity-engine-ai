import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Code, Key, Zap, Lock, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const apiEndpoints = [
  {
    method: "GET",
    path: "/api/tools",
    description: "Get list of all available SEO tools",
    rateLimit: "100 req/min",
    auth: "Required",
  },
  {
    method: "POST",
    path: "/api/tools/:id/analyze",
    description: "Run analysis with specified tool",
    rateLimit: "50 req/min",
    auth: "Required",
  },
  {
    method: "GET",
    path: "/api/results/:id",
    description: "Retrieve analysis results",
    rateLimit: "200 req/min",
    auth: "Required",
  },
  {
    method: "GET",
    path: "/api/user/profile",
    description: "Get authenticated user profile",
    rateLimit: "500 req/min",
    auth: "Required",
  },
  {
    method: "POST",
    path: "/api/user/saved-tools",
    description: "Save tool to user favorites",
    rateLimit: "100 req/min",
    auth: "Required",
  },
  {
    method: "GET",
    path: "/api/certifications",
    description: "Get user certifications and progress",
    rateLimit: "100 req/min",
    auth: "Required",
  },
];

const codeExamples = {
  javascript: `const clarityEngine = require('clarity-engine-sdk');

const client = new clarityEngine.Client({
  apiKey: 'your-api-key-here'
});

// Get all tools
const tools = await client.tools.list();

// Run analysis
const result = await client.tools.analyze('keyword-research', {
  keyword: 'seo tools',
  language: 'en'
});

console.log(result);`,

  python: `from clarity_engine import ClarityEngine

client = ClarityEngine(api_key='your-api-key-here')

# Get all tools
tools = client.tools.list()

# Run analysis
result = client.tools.analyze('keyword-research', {
    'keyword': 'seo tools',
    'language': 'en'
})

print(result)`,

  curl: `curl -X POST https://api.clarityengine.io/api/tools/keyword-research/analyze \\
  -H "Authorization: Bearer your-api-key-here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "keyword": "seo tools",
    "language": "en"
  }'`,
};

export default function ApiDocs() {
  const { user, isAuthenticated } = useAuth();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof codeExamples>("javascript");

  const isPaidUser = user?.role === "admin"; // In real app, check actual subscription status

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Sign In Required</h1>
          <p className="text-slate-600 mb-8">Please sign in to access API documentation.</p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!isPaidUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center max-w-md">
          <Lock className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">API Access Requires Subscription</h1>
          <p className="text-slate-600 mb-8">
            Unlock powerful API access to integrate Clarity Engine tools into your applications. Upgrade your account to get started.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/upgrade">
              <Zap className="h-4 w-4" />
              Upgrade to Pro
            </Link>
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
            <span className="text-sm text-slate-600">{user?.name}</span>
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Code className="h-10 w-10 text-blue-600" />
            API Documentation
          </h1>
          <p className="text-slate-600">Integrate Clarity Engine SEO tools into your applications with our powerful REST API.</p>
        </div>

        {/* API Key Management */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Key className="h-5 w-5 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">API Keys</h2>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-600">Production API Key</p>
                <p className="font-mono text-sm text-slate-900 mt-1">sk_live_••••••••••••••••••••••••</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard("sk_live_1234567890abcdef", "api-key")}
              >
                {copiedCode === "api-key" ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2">
              <Key className="h-4 w-4" />
              Generate New Key
            </Button>
            <Button variant="outline" className="gap-2">
              <Lock className="h-4 w-4" />
              Revoke Current Key
            </Button>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Start Examples</h2>

          <div className="flex gap-2 mb-6">
            {(Object.keys(codeExamples) as Array<keyof typeof codeExamples>).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded font-semibold transition ${
                  selectedLanguage === lang
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 rounded-lg p-6 relative">
            <pre className="text-slate-100 text-sm overflow-x-auto font-mono">
              <code>{codeExamples[selectedLanguage]}</code>
            </pre>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 gap-2"
              onClick={() => copyToClipboard(codeExamples[selectedLanguage], "code-example")}
            >
              <Copy className="h-4 w-4" />
              {copiedCode === "code-example" ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">API Endpoints</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Endpoint</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Rate Limit</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((endpoint, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          endpoint.method === "GET"
                            ? "bg-green-100 text-green-700"
                            : endpoint.method === "POST"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-slate-900">{endpoint.path}</td>
                    <td className="py-3 px-4 text-slate-600">{endpoint.description}</td>
                    <td className="py-3 px-4 text-slate-600">{endpoint.rateLimit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Need Help?</h2>
          <p className="text-slate-600 mb-6">
            Check out our comprehensive documentation or contact our support team for assistance with API integration.
          </p>
          <div className="flex gap-4">
            <Button asChild variant="outline">
              <a href="#" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Full Documentation
              </a>
            </Button>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
