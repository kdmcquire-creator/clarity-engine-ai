import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, BarChart3, Lightbulb, Users, Mail, MessageSquare } from "lucide-react";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-slate-900">Clarity Engine</div>
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
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">
              Contact
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition">Home</Link>
            ) : (
              <Button asChild size="sm">
                <a href={getLoginUrl()}>Sign In</a>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Master Your SEO with Free, Powerful Tools
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            A curated collection of SEO and content marketing tools designed to help entrepreneurs, marketers, and creators rank higher, write better, and grow faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button asChild size="lg" variant="outline">
              <a href={getLoginUrl()}>Create Free Account</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 border-t border-slate-200">
        <div className="container">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Why Choose Our Toolkit?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-blue-600" />,
                title: "Instant Insights",
                description: "Get actionable SEO data in seconds, not hours. Analyze keywords, backlinks, and content gaps instantly."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
                title: "Data-Driven Decisions",
                description: "Make smarter marketing choices with detailed analytics and competitive intelligence."
              },
              {
                icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
                title: "Content Excellence",
                description: "Optimize your content for search engines and readers. Get readability scores and improvement suggestions."
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-lg border border-slate-200 hover:shadow-lg transition">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="container py-24">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Our Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Keyword Density Checker",
            "Meta Tag Generator",
            "Backlink Analyzer",
            "Content Gap Analyzer",
            "Readability Score",
            "Schema Markup Generator",
          ].map((tool, i) => (
            <div key={i} className="p-6 bg-white rounded-lg border border-slate-200 hover:shadow-lg transition cursor-pointer">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{tool}</h3>
              <p className="text-slate-600 text-sm mb-4">Optimize your SEO strategy with this powerful tool.</p>
              <Link href="/tools" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Try Now →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your SEO Game?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of marketers using our free tools to rank higher and grow faster.</p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
            <a href={getLoginUrl()}>Get Started Free</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools" className="hover:text-white transition">Tools</Link></li>
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white transition">Guides</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Clarity Engine. All rights reserved. Built by a team of SEO experts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
