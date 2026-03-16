import React from "react";
import { useRoute } from "wouter";
import { caseStudies } from "@/data/caseStudies";
import { Link } from "wouter";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CaseStudyDetail() {
  const [match, params] = useRoute("/case-study/:slug");
  const study = params ? caseStudies.find((s) => s.slug === params.slug) : null;

  if (!match || !study) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <Link href="/case-studies">
            <Button>Back to Case Studies</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedStudies = study ? caseStudies.filter((s) => s.id !== study.id).slice(0, 3) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/case-studies">
            <button className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Case Studies
            </button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{study.title}</h1>
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{study.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{study.date.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <img
          src={study.image}
          alt={study.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none">
          {study && study.content.split("\n").map((paragraph, idx) => {
            if (paragraph.startsWith("#")) {
              const match = paragraph.match(/^#+/);
              const level = match ? match[0].length : 1;
              const text = paragraph.replace(/^#+\s/, "");
              if (level === 1)
                return (
                  <h1 key={idx} className="text-3xl font-bold text-foreground mt-8 mb-4">
                    {text}
                  </h1>
                );
              if (level === 2)
                return (
                  <h2 key={idx} className="text-2xl font-bold text-foreground mt-6 mb-3">
                    {text}
                  </h2>
                );
              if (level === 3)
                return (
                  <h3 key={idx} className="text-xl font-bold text-foreground mt-4 mb-2">
                    {text}
                  </h3>
                );
            }
            if (paragraph.startsWith("-")) {
              return (
                <li key={idx} className="text-foreground/80 ml-6 mb-2">
                  {paragraph.replace(/^-\s/, "")}
                </li>
              );
            }
            if (paragraph.trim()) {
              return (
                <p key={idx} className="text-foreground/80 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            }
            return null;
          })}
        </div>

        {/* Related Case Studies */}
        <div className="mt-20 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStudies.map((relatedStudy) => (
              <Link key={relatedStudy.id} href={`/case-study/${relatedStudy.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                  <img
                    src={relatedStudy.image}
                    alt={relatedStudy.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2">
                      {relatedStudy.title}
                    </h3>
                    <p className="text-sm text-foreground/60 line-clamp-2">
                      {relatedStudy.excerpt}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Achieve Similar Results?
          </h3>
          <p className="text-foreground/60 mb-6">
            Start using our SEO tools and strategies to transform your business today.
          </p>
          <Button size="lg">Get Started Free</Button>
        </div>
      </div>
    </div>
  );
}
