import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, Lightbulb } from "lucide-react";
import { AdSenseVerification } from "@/components/AdSenseVerification";

export default function About() {
  return (
    <>
      <AdSenseVerification />
      <AboutContent />
    </>
  );
}

function AboutContent() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">Clarity Engine</Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition">Home</Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition font-semibold">About</Link>
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">Tools</Link>
            <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition">Resources</Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            About Clarity Engine
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            We believe that world-class SEO and content marketing tools should be accessible to everyone—not just enterprises with massive budgets.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-24 border-t border-slate-200">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Clarity Engine was founded with a simple mission: to democratize access to professional-grade SEO and content marketing tools. We believe that every entrepreneur, marketer, and content creator deserves access to the same insights and optimization capabilities that Fortune 500 companies use.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our tools are built by SEO experts who have spent years in the trenches—running agencies, scaling startups, and helping businesses rank for competitive keywords. We know what works, and we've distilled that knowledge into a suite of free, powerful tools.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-12 flex items-center justify-center">
              <Target className="w-32 h-32 text-blue-600 opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container py-24">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
              title: "Transparency",
              description: "We believe in honest, straightforward advice. No black-hat tactics, no misleading metrics—just real SEO insights you can trust."
            },
            {
              icon: <Users className="h-8 w-8 text-blue-600" />,
              title: "Community First",
              description: "Our success is built on the success of our users. We listen to feedback, iterate quickly, and constantly improve our tools."
            },
            {
              icon: <Target className="h-8 w-8 text-blue-600" />,
              title: "Excellence",
              description: "We're obsessed with quality. Every tool is tested rigorously and refined based on real-world usage and expert feedback."
            },
          ].map((value, i) => (
            <div key={i} className="p-8 bg-white rounded-lg border border-slate-200 hover:shadow-lg transition">
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
              <p className="text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-24 border-t border-slate-200">
        <div className="container">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Meet Our Team</h2>
          <p className="text-center text-slate-600 text-lg mb-16 max-w-2xl mx-auto">
            Our editorial team consists of experienced SEO professionals, content strategists, and marketing experts who are passionate about helping others succeed.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Eleanor Vance",
                role: "SEO Strategy & Analytics",
                bio: "A former agency lead with a knack for deciphering complex SEO data into actionable insights."
              },
              {
                name: "Marcus Thorne",
                role: "Content Marketing & Copywriting",
                bio: "A seasoned content strategist known for crafting compelling narratives that drive engagement and conversions."
              },
              {
                name: "Sophia Chen",
                role: "Technical SEO & Web Performance",
                bio: "A web developer turned SEO specialist, focusing on the technical underpinnings of high-ranking sites."
              },
              {
                name: "David Kim",
                role: "Keyword Research & Competitive Analysis",
                bio: "An expert in uncovering hidden keyword opportunities and dissecting competitor strategies."
              },
              {
                name: "Isabella Rossi",
                role: "Link Building & Outreach",
                bio: "Specializes in building high-quality backlinks and fostering valuable industry relationships."
              },
              {
                name: "Jamal Adebayo",
                role: "AI & Automation in Marketing",
                bio: "Explores the cutting edge of AI tools and automation to streamline marketing workflows."
              },
            ].map((member, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>\n                <p className="text-slate-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24 text-center">
        <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Improve Your SEO?</h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Start using our free tools today and see the difference professional-grade SEO insights can make for your website.
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/tools">
            Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-12">
        <div className="container text-center">
          <p>&copy; 2025 Clarity Engine. All rights reserved. Built by a team of SEO experts.</p>
        </div>
      </footer>
    </div>
  );
}
