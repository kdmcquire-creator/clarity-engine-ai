import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Clarity Engine",
  description:
    "Get in touch with the Clarity Engine team. Questions, feedback, partnership inquiries, or affiliate program questions welcome.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/60 mb-12 text-lg">
            Questions, feedback, partnership inquiries, or affiliate program
            questions — we read every email.
          </p>

          <div className="space-y-6">
            {/* Email CTA */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-1">General Inquiries</h2>
              <p className="text-white/50 text-sm mb-4">
                Bug reports, feature requests, content feedback, and general questions.
              </p>
              <a
                href="mailto:contact@clarity-engine.ai"
                className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm py-2 px-5 rounded-lg transition-colors"
              >
                contact@clarity-engine.ai
              </a>
            </div>

            {/* Partnerships */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-1">
                Partnerships &amp; Advertising
              </h2>
              <p className="text-white/50 text-sm mb-4">
                Sponsored content, affiliate program queries, or tool listing
                requests.
              </p>
              <a
                href="mailto:partnerships@clarity-engine.ai"
                className="inline-block border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-semibold text-sm py-2 px-5 rounded-lg transition-colors"
              >
                partnerships@clarity-engine.ai
              </a>
            </div>

            {/* Response time note */}
            <p className="text-white/30 text-sm text-center pt-2">
              We aim to respond within 2 business days.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
