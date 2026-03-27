import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Clarity Engine is a free SEO tool cluster built for content marketers, freelancers, and growth teams who want professional results without expensive subscriptions.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-10">
            <h1
              className="text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              About Clarity Engine
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Professional SEO tools should not cost $200/month. We built
              Clarity Engine to fix that.
            </p>
          </div>

          <div className="space-y-8 text-white/70 leading-relaxed">
            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                What We Do
              </h2>
              <p>
                Clarity Engine is a free cluster of 17 SEO and content marketing
                tools designed for marketers, freelancers, bloggers, and growth
                teams. Our tools cover keyword analysis, readability scoring,
                meta tag generation, SERP simulation, schema markup, URL
                auditing, and AI-powered content strategy.
              </p>
              <p className="mt-3">
                Most tools run entirely in your browser — no server calls, no
                login, no waiting. Results are instant. Your content stays on
                your device.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Our Philosophy
              </h2>
              <p>
                The best SEO tools are the ones you actually use. Complexity and
                paywalls are the enemy of good marketing habits. We build tools
                that are fast to open, clear in output, and free to use without
                restriction.
              </p>
              <p className="mt-3">
                We fund Clarity Engine through tasteful advertising and affiliate
                partnerships with tools we actually recommend. We will never sell
                your data or put tools behind paywalls.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                The Tools
              </h2>
              <p>
                Our 17 tools span content analysis, technical SEO, keyword
                research, SERP optimization, and AI-powered strategy. Ten tools
                run completely client-side — instant and private. Seven tools
                use AI processing to deliver deeper insights.
              </p>
            </section>

            <div className="bg-gradient-to-br from-blue-900/40 to-navy-800 border border-blue-800/40 rounded-2xl p-6 text-center">
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Start using the tools
              </h3>
              <p className="text-white/60 text-sm mb-4">
                No account, no credit card, no friction.
              </p>
              <Link
                href="/tools/"
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                Browse All 17 Tools →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
