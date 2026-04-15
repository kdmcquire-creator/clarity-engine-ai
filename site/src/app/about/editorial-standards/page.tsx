import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description:
    "How Clarity Engine AI researches, produces, and updates SEO content. Our methodology, affiliate disclosures, corrections policy, and update cadence.",
  alternates: {
    canonical: "/about/editorial-standards/",
  },
  openGraph: {
    title: "Editorial Standards | Clarity Engine AI",
    description:
      "How we research, review, and update SEO and content marketing content.",
    type: "website",
    url: "https://clarity-engine.ai/about/editorial-standards/",
  },
};

export default function EditorialStandardsPage() {
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
              Editorial Standards
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              How we research, write, and update SEO content at Clarity
              Engine.
            </p>
          </div>

          <div className="space-y-8 text-white/70 leading-relaxed">
            <section>
              <p>
                Clarity Engine AI is published by the{" "}
                <Link
                  href="/about/editorial-team/"
                  className="text-cyan-400 hover:underline"
                >
                  Clarity Engine Editorial Team
                </Link>
                , part of the Moonsmoke Network. Here&apos;s how we work.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Research Process
              </h2>
              <p>
                Hands-on use first. Documentation and vendor claims second.
                Public user reviews third. For SEO content specifically, we
                test tactics on our own network of sites and watch what
                actually moves rankings in Google Search Console before we
                write about it. We don&apos;t repeat advice we haven&apos;t
                seen work in our own data.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Content Production
              </h2>
              <p>
                AI-assisted research and drafting. Human review and editing
                before publication. Fact-checking against primary sources. We
                use AI as a research and drafting aid, but every article
                passes through a human editor. SEO claims are verified against
                current Google documentation, Search Console data, or our own
                ranking results.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Review Methodology
              </h2>
              <p>
                For SEO tools and tactics, we evaluate on five dimensions:
                whether it works on our own sites, how easy it is to implement,
                whether it holds up across algorithm updates, how well it
                scales beyond a single page, and how closely vendor claims
                match what we see in real data. We don&apos;t rate tools with
                a proprietary score &mdash; we tell you where each one wins
                and where it falls short.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Affiliate Disclosure
              </h2>
              <p>
                We earn commissions on some links. See our{" "}
                <Link
                  href="/affiliate-disclosure/"
                  className="text-cyan-400 hover:underline"
                >
                  affiliate disclosure
                </Link>{" "}
                for details. We only link to products we recommend.
                Affiliate relationships never influence a recommendation.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Update Cadence
              </h2>
              <p>
                We re-review tools on a 90-day rolling schedule. Pricing and
                feature changes trigger immediate updates. For SEO content,
                we also revisit posts after major Google algorithm updates
                to make sure the advice still holds.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Corrections Policy
              </h2>
              <p>
                Found an error?{" "}
                <Link
                  href="/contact/"
                  className="text-cyan-400 hover:underline"
                >
                  Contact us
                </Link>
                . We correct errors and note the update date at the top of
                any edited post.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
