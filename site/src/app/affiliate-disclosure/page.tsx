import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Clarity Engine",
  description:
    "Clarity Engine participates in affiliate programs. Learn how we earn commissions and how that affects our editorial independence.",
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Affiliate Disclosure
          </h1>
          <p className="text-white/40 text-sm mb-12">Last updated: March 27, 2026</p>

          <div className="space-y-8 text-white/70 leading-relaxed">
            <p>
              Clarity Engine (clarity-engine.ai) participates in affiliate
              marketing programs. When you click certain links on our site and
              make a purchase, we may earn a commission at no additional cost to
              you.
            </p>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">How Affiliate Links Work</h2>
              <p>
                Some links on this site — particularly on tool pages and in blog
                posts — are affiliate links. When you click an affiliate link and
                complete a purchase on the linked site, the merchant pays us a
                small referral fee. This is a standard practice that helps us keep
                our free tools running and continue producing high-quality SEO
                content.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Editorial Independence</h2>
              <p>
                Affiliate relationships do not influence our tool recommendations,
                editorial opinions, or the results our AI tools produce. We
                recommend products we believe are genuinely useful to SEO
                practitioners. Our AI-powered tools operate independently of any
                commercial relationships.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Types of Compensation</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-white">Affiliate commissions</strong> — earned when you purchase a product
                  or service through our referral links.
                </li>
                <li>
                  <strong className="text-white">Display advertising</strong> — we display Google AdSense ads, which
                  are served based on page content and visitor context.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Identifying Affiliate Links</h2>
              <p>
                Affiliate links on Clarity Engine route through{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-cyan-300">
                  clarity-engine.ai/go/
                </code>
                . CTAs marked <em>Sponsored</em> in gray text above a button
                indicate an affiliate relationship.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">FTC Compliance</h2>
              <p>
                In accordance with FTC guidelines (16 CFR Part 255), we disclose
                material connections between Clarity Engine and any brands or
                products we recommend. This page and the <em>Sponsored</em> labels
                on individual CTAs serve as that disclosure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3">Questions</h2>
              <p>
                If you have questions about our affiliate relationships, contact us
                at{" "}
                <a
                  href="mailto:contact@clarity-engine.ai"
                  className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                >
                  contact@clarity-engine.ai
                </a>{" "}
                or visit our{" "}
                <Link
                  href="/contact/"
                  className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                >
                  contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
