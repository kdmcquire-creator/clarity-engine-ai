import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Clarity Engine terms of service.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1
            className="text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Terms of Service
          </h1>
          <p className="text-white/40 text-sm mb-10">Last updated: January 1, 2025</p>

          <div className="space-y-8 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Acceptance</h2>
              <p>
                By accessing clarity-engine.ai, you agree to be bound by these Terms
                of Service. If you disagree with any part, do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Use of Tools</h2>
              <p>
                Our SEO tools are provided free of charge for personal and commercial
                use. You may use the output of our tools in your own projects. You may
                not resell, redistribute, or build competing products directly from
                our tool outputs without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. No Warranty</h2>
              <p>
                Clarity Engine tools are provided &quot;as is&quot; without warranty of any
                kind. SEO results depend on many factors outside our control. We do not
                guarantee ranking improvements from using our tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Clarity Engine shall not be
                liable for any indirect, incidental, special, or consequential damages
                arising from use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Intellectual Property</h2>
              <p>
                All content on clarity-engine.ai — including tool code, blog articles,
                and UI — is owned by Clarity Engine. You may not reproduce or distribute
                our content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Acceptable Use</h2>
              <p>
                You agree not to use our services to: (a) violate any laws, (b) spam
                or abuse our AI tools, (c) attempt to reverse-engineer our systems,
                or (d) use automated tools to scrape our content at scale.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Changes</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use
                of the site after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Contact</h2>
              <p>
                Questions about these terms:{" "}
                <a href="mailto:legal@clarity-engine.ai" className="text-cyan-400 hover:text-cyan-300">
                  legal@clarity-engine.ai
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
