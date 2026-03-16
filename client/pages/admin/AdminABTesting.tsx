import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Plus, TrendingUp, TrendingDown, CheckCircle, AlertCircle, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminABTesting() {
  const { user, isAuthenticated } = useAuth();
  const [tests, setTests] = useState([
    {
      id: 1,
      name: "CTA Button Color",
      page: "Pricing",
      variant_a: "Blue Button",
      variant_b: "Green Button",
      status: "running",
      traffic_split: "50/50",
      duration: "14 days",
      started: "2026-02-24",
      conversion_a: 2.8,
      conversion_b: 3.4,
      confidence: 92,
      winner: "B",
    },
    {
      id: 2,
      name: "Pricing Page Headline",
      page: "Pricing",
      variant_a: "Start Your Free Trial",
      variant_b: "Get Instant Access to All Tools",
      status: "completed",
      traffic_split: "50/50",
      duration: "21 days",
      started: "2026-02-10",
      conversion_a: 2.5,
      conversion_b: 3.2,
      confidence: 98,
      winner: "B",
    },
    {
      id: 3,
      name: "Hero Section Copy",
      page: "Home",
      variant_a: "Current Copy",
      variant_b: "Benefit-Focused Copy",
      status: "running",
      traffic_split: "50/50",
      duration: "7 days",
      started: "2026-03-03",
      conversion_a: 1.9,
      conversion_b: 2.1,
      confidence: 65,
      winner: null,
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

  const handleStopTest = (id: number) => {
    setTests(tests.map((t) => (t.id === id ? { ...t, status: "completed" } : t)));
    toast.success("Test stopped and results saved");
  };

  const handleApplyWinner = (id: number) => {
    toast.success("Winning variant applied to production!");
  };

  const runningTests = tests.filter((t) => t.status === "running");
  const completedTests = tests.filter((t) => t.status === "completed");
  const totalLift = completedTests.reduce((sum, t) => {
    if (t.winner === "B") return sum + ((t.conversion_b - t.conversion_a) / t.conversion_a) * 100;
    return sum;
  }, 0);

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
            <h1 className="text-xl font-bold text-slate-900">A/B Testing Dashboard</h1>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Test
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Active Tests</h3>
            <p className="text-3xl font-bold text-slate-900">{runningTests.length}</p>
            <p className="text-xs text-slate-500 mt-2">Currently running</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Completed Tests</h3>
            <p className="text-3xl font-bold text-slate-900">{completedTests.length}</p>
            <p className="text-xs text-slate-500 mt-2">All time</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Avg Lift</h3>
            <p className="text-3xl font-bold text-green-600">+{totalLift.toFixed(1)}%</p>
            <p className="text-xs text-slate-500 mt-2">From winners</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Revenue Impact</h3>
            <p className="text-3xl font-bold text-green-600">+$2,840</p>
            <p className="text-xs text-slate-500 mt-2">From optimizations</p>
          </div>
        </div>

        {/* Running Tests */}
        {runningTests.length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Active Tests</h2>
            <div className="space-y-6">
              {runningTests.map((test) => (
                <div key={test.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{test.name}</h3>
                      <p className="text-sm text-slate-600">
                        {test.page} • Started {test.started} • {test.duration}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {test.status}
                    </span>
                  </div>

                  {/* Test Variants */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Variant A (Control)</h4>
                      <p className="text-sm text-slate-700 mb-3">{test.variant_a}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-slate-900">{test.conversion_a}%</span>
                        <span className="text-xs text-slate-600">Conversion Rate</span>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Variant B (Test)</h4>
                      <p className="text-sm text-slate-700 mb-3">{test.variant_b}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">{test.conversion_b}%</span>
                        <span className="text-xs text-slate-600">
                          <TrendingUp className="h-4 w-4 inline" /> +{((test.conversion_b - test.conversion_a) / test.conversion_a * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Confidence & Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Statistical Confidence</p>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${test.confidence >= 95 ? "bg-green-600" : test.confidence >= 80 ? "bg-yellow-600" : "bg-slate-400"}`}
                            style={{ width: `${test.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{test.confidence}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleStopTest(test.id)}>
                        Stop Test
                      </Button>
                      {test.confidence >= 95 && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Apply Winner
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Tests */}
        {completedTests.length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Completed Tests</h2>
            <div className="space-y-4">
              {completedTests.map((test) => (
                <div key={test.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{test.name}</h4>
                      <p className="text-sm text-slate-600">
                        {test.page} • Variant A: {test.conversion_a}% • Variant B: {test.conversion_b}%
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {test.winner === "B" ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="text-sm font-semibold">Winner: B</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-600">
                          <AlertCircle className="h-5 w-5" />
                          <span className="text-sm font-semibold">No Winner</span>
                        </div>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Ideas */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
          <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Recommended Tests
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-slate-900 mb-2">Email Subject Lines</h3>
              <p className="text-sm text-slate-600 mb-3">Test different subject lines for welcome emails to increase open rates</p>
              <Button size="sm" variant="outline" className="w-full">
                Create Test
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-slate-900 mb-2">Pricing Tier Names</h3>
              <p className="text-sm text-slate-600 mb-3">Test different pricing tier names (Pro vs Premium vs Plus)</p>
              <Button size="sm" variant="outline" className="w-full">
                Create Test
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-slate-900 mb-2">Form Field Order</h3>
              <p className="text-sm text-slate-600 mb-3">Test different checkout form field ordering to reduce abandonment</p>
              <Button size="sm" variant="outline" className="w-full">
                Create Test
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-slate-900 mb-2">Call-to-Action Copy</h3>
              <p className="text-sm text-slate-600 mb-3">Test "Start Free Trial" vs "Get Started" vs "Try Now"</p>
              <Button size="sm" variant="outline" className="w-full">
                Create Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
