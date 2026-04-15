import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Clarity Engine Editorial Team",
  description:
    "Clarity Engine AI is published by Moonsmoke LLC. We practice SEO on our own network of sites and write about what we see working in real Google Search Console data.",
  alternates: {
    canonical: "/about/editorial-team/",
  },
  openGraph: {
    title: "The Clarity Engine Editorial Team",
    description:
      "SEO recommendations grounded in outcomes from the sites we run ourselves.",
    type: "website",
    url: "https://clarity-engine.ai/about/editorial-team/",
  },
};

export default function EditorialTeamPage() {
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
              The Clarity Engine Editorial Team
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              We practice SEO on our own sites and write about what we see
              working in real Google Search Console data.
            </p>
          </div>

          <div className="space-y-8 text-white/70 leading-relaxed">
            <section>
              <p>
                Clarity Engine AI is part of the Moonsmoke Network. We practice
                SEO on our own network of sites and write about what we see
                working in real Google Search Console data. Every SEO
                recommendation we make is grounded in outcomes from the sites
                we run ourselves.
              </p>
            </section>

            {/* Brand block */}
            <div className="bg-gradient-to-br from-blue-900/40 to-navy-800 border border-blue-800/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="flex-shrink-0">
                <Image
                  src="/moonsmoke/logo.png"
                  alt="Moonsmoke LLC logo"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>
              <div className="text-center sm:text-left">
                <p
                  className="font-bold text-white text-lg mb-1"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Moonsmoke LLC &bull; Austin, Texas
                </p>
                <p className="text-sm text-white/50 mb-3">
                  Publisher of the Moonsmoke Network
                </p>
                <p className="text-sm text-white/70">
                  <span className="font-medium text-white/80">
                    Our other sites:{" "}
                  </span>
                  <a
                    href="https://aiproductivityhub.co/"
                    className="text-cyan-400 hover:underline"
                  >
                    AI Productivity Hub
                  </a>
                  {" \u00b7 "}
                  <a
                    href="https://aifinancehub.ai/"
                    className="text-cyan-400 hover:underline"
                  >
                    AI Finance Hub
                  </a>
                  {" \u00b7 "}
                  <a
                    href="https://legaltech-ai-hub.com/"
                    className="text-cyan-400 hover:underline"
                  >
                    LegalTech AI Hub
                  </a>
                </p>
              </div>
            </div>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                How We Work
              </h2>
              <ul className="list-disc list-outside pl-6 space-y-2 text-white/70">
                <li>
                  We use AI tools to help research and draft content. Every
                  article is reviewed and edited by a human before publication.
                  We never publish raw AI output.
                </li>
                <li>
                  We only recommend tools we&apos;ve actually used. If we
                  haven&apos;t used it, we say so.
                </li>
                <li>
                  Affiliate disclosures appear on every review. Recommendations
                  are never paid placements.
                </li>
                <li>
                  We update posts when tools change pricing, features, or
                  positioning.
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Find Us Elsewhere
              </h2>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/company/moonsmoke/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy-800 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-white/70 font-medium px-4 py-2 rounded-lg transition"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/MoonsmokeNetwrk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy-800 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-white/70 font-medium px-4 py-2 rounded-lg transition"
                >
                  X (Twitter)
                </a>
                <a
                  href="https://www.pinterest.com/moonsmokecontent/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy-800 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 text-white/70 font-medium px-4 py-2 rounded-lg transition"
                >
                  Pinterest
                </a>
              </div>
            </section>

            {/* Footer links */}
            <div className="border-t border-white/10 pt-6 flex flex-wrap gap-6 text-sm">
              <Link
                href="/about/editorial-standards/"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition"
              >
                Editorial Standards &rarr;
              </Link>
              <Link
                href="/contact/"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition"
              >
                Contact Us &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
