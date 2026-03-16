import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Smartphone, Download, Zap, BarChart3, Users, Lock, Apple, Smartphone as AndroidIcon } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Fast Analysis",
    description: "Run SEO analysis on the go with optimized mobile performance",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-green-600" />,
    title: "View Results",
    description: "Access all your analysis results and historical data anywhere",
  },
  {
    icon: <Users className="h-8 w-8 text-purple-600" />,
    title: "Team Collaboration",
    description: "Share results with team members and collaborate in real-time",
  },
  {
    icon: <Lock className="h-8 w-8 text-orange-600" />,
    title: "Secure Access",
    description: "Enterprise-grade security with biometric authentication",
  },
];

export default function MobileApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Clarity Engine
          </Link>
          <div className="flex items-center gap-4">
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              SEO Tools in Your Pocket
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Master SEO analysis anywhere with the Clarity Engine mobile app. Run audits, check rankings, and collaborate with your team on iOS and Android.
            </p>
            <div className="flex gap-4 mb-12">
              <Button size="lg" className="gap-2">
                <Apple className="h-5 w-5" />
                Download on iOS
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Smartphone className="h-5 w-5" />
                Get on Android
              </Button>
            </div>
            <p className="text-sm text-slate-600">
              Available on App Store and Google Play. Requires iOS 14+ or Android 10+
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl shadow-2xl flex items-center justify-center">
              <Smartphone className="h-32 w-32 text-white opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-20 border-t border-slate-200">
        <div className="container">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="container py-20">
        <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
          Screenshots
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <Smartphone className="h-16 w-16 text-slate-400" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">
                  {idx === 1 ? "Tool Analysis" : idx === 2 ? "Results Dashboard" : "Team Collaboration"}
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  {idx === 1
                    ? "Run SEO analysis with a single tap"
                    : idx === 2
                      ? "View all your results in one place"
                      : "Share results with your team instantly"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specs */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Apple className="h-5 w-5" />
                iOS App
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Requires iOS 14.0 or later</li>
                <li>• Compatible with iPhone and iPad</li>
                <li>• Offline mode for basic features</li>
                <li>• Face ID / Touch ID authentication</li>
                <li>• Dark mode support</li>
                <li>• File size: ~85 MB</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Android App
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Requires Android 10.0 or later</li>
                <li>• Works on phones and tablets</li>
                <li>• Offline mode for basic features</li>
                <li>• Biometric authentication</li>
                <li>• Dark mode support</li>
                <li>• File size: ~92 MB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Download the Clarity Engine app today and master SEO on the go.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2">
              <Apple className="h-5 w-5" />
              Download on iOS
            </Button>
            <Button size="lg" variant="secondary" className="gap-2">
              <Smartphone className="h-5 w-5" />
              Get on Android
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
