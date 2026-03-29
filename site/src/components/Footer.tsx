import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-800 border-t border-white/10 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-xs">CE</span>
              </div>
              <span
                className="font-bold text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Clarity Engine
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Free SEO &amp; content marketing tools to help you rank higher,
              write better, and grow faster.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">
              Free Tools
            </h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link
                  href="/tools/keyword-density-checker/"
                  className="hover:text-white transition"
                >
                  Keyword Density Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/meta-tag-generator/"
                  className="hover:text-white transition"
                >
                  Meta Tag Generator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/serp-simulator/"
                  className="hover:text-white transition"
                >
                  SERP Simulator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/readability-score/"
                  className="hover:text-white transition"
                >
                  Readability Score
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/"
                  className="hover:text-cyan-400 transition font-medium"
                >
                  All 17 Tools →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>
                <Link href="/about/" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Network links */}
        <div className="border-t border-white/10 pt-6 mb-6">
          <p className="text-xs text-white/30 text-center uppercase tracking-wider mb-3 font-medium">
            More AI Resources
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="https://aiproductivityhub.co" target="_blank" rel="noopener" className="text-sm text-white/40 hover:text-cyan-400 transition">AI Productivity Hub</a>
            <a href="https://aifinancehub.ai" target="_blank" rel="noopener" className="text-sm text-white/40 hover:text-cyan-400 transition">AI Finance Hub</a>
            <a href="https://legaltech-ai-hub.com" target="_blank" rel="noopener" className="text-sm text-white/40 hover:text-cyan-400 transition">Legal AI Hub</a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-white/40 text-sm">
          <p className="text-xs text-white/25 mb-3">
            <a
              href="/go/amazon/"
              target="_blank"
              rel="nofollow noopener sponsored"
              className="hover:text-cyan-400 transition"
            >
              🛒 Amazon Associate
            </a>
            {" "}· As an Amazon Associate I earn from qualifying purchases.
          </p>
          © {year} Clarity Engine. All rights reserved.
          <span className="mx-2">·</span>
          <a
            href="https://clarity-engine.ai"
            className="hover:text-white transition"
          >
            clarity-engine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
