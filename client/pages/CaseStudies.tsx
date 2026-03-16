import React from "react";
import { caseStudies } from "@/data/caseStudies";
import { Link } from "wouter";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-wider">
              Success Stories
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Real Results from Real Clients</h1>
          <p className="text-xl text-white/90">
            See how businesses like yours achieved remarkable growth using our SEO tools and strategies
          </p>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <Link key={study.id} href={`/case-study/${study.slug}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Case Study
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">
                    {study.title}
                  </h3>
                  <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                    {study.excerpt}
                  </p>

                  {/* Author & Date */}
                  <div className="flex items-center justify-between text-xs text-foreground/50 mb-4 mt-auto">
                    <span>{study.author}</span>
                    <span>{study.date.toLocaleDateString()}</span>
                  </div>

                  {/* CTA */}
                  <Button className="w-full gap-2 group">
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Results Summary */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Average Traffic Increase", value: "+300%", icon: "📈" },
            { label: "Average ROI", value: "1,100%", icon: "💰" },
            { label: "Clients Served", value: "500+", icon: "👥" },
            { label: "Success Rate", value: "98%", icon: "✅" },
          ].map((stat) => (
            <Card key={stat.label} className="p-6 text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
              <p className="text-sm text-foreground/60">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-foreground/60 mb-8 max-w-2xl mx-auto">
            Start using our SEO tools and strategies today to achieve similar results for your business.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg">Get Started Free</Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
