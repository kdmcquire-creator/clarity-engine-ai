import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Clarity Engine privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1
            className="text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-white/40 text-sm mb-10">Last updated: January 1, 2025</p>

          <div className="space-y-8 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Overview</h2>
              <p>
                Clarity Engine (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates
                clarity-engine.ai. This policy describes how we collect, use, and
                protect information when you use our website and tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
              <p>
                <strong className="text-white">Tool usage:</strong> Our browser-based tools
                process content entirely on your device. We do not transmit or store the
                content you paste into our free frontend tools.
              </p>
              <p className="mt-3">
                <strong className="text-white">Analytics:</strong> We use Google Tag Manager
                and Google Analytics to collect anonymized usage data including page views,
                session duration, and general geographic region. No personally identifiable
                information is collected through analytics.
              </p>
              <p className="mt-3">
                <strong className="text-white">Advertising:</strong> We display ads via
                Google AdSense. Google may use cookies to serve ads based on your prior
                visits. See Google&apos;s privacy policy for details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Cookies</h2>
              <p>
                We use functional cookies for analytics and advertising. By using our
                site, you consent to the use of cookies as described in this policy.
                You may disable cookies in your browser settings, though some features
                may be affected.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
              <p>
                We use the following third-party services: Google Analytics (analytics),
                Google AdSense (advertising), Google Tag Manager (tag management),
                and Cloudflare Workers (hosting). Each service has its own privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Data Retention</h2>
              <p>
                We do not store personal data beyond what is automatically collected
                by our analytics and advertising providers. Anonymous analytics data
                is retained per Google Analytics default settings (26 months).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Your Rights</h2>
              <p>
                Depending on your jurisdiction, you may have the right to access,
                correct, or delete personal data we hold about you. Contact us at
                the email below to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Contact</h2>
              <p>
                For privacy inquiries, contact us at:{" "}
                <a href="mailto:privacy@clarity-engine.ai" className="text-cyan-400 hover:text-cyan-300">
                  privacy@clarity-engine.ai
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
