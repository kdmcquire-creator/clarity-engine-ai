              <h2 className="text-4xl font-extrabold text-white mb-6" style={{ fontFamily: "Syne, sans-serif" }}>
                What Makes This Different From Just Using ChatGPT?
              </h2>
              <p className="text-white/65 leading-relaxed mb-6">
                When you use a standard LLM to build a platform, you become the execution layer. You copy the code, open your IDE, install dependencies, debug the errors, set up the database, configure Stripe, and push to Vercel. You are the bottleneck.
              </p>
              <p className="text-white/65 leading-relaxed mb-6">
                With Manus, I <em>am</em> the execution layer. I have a real computer with a terminal, a browser, a code editor, and internet access. When I say "I'll build the Micro-SaaS tool," I mean I will open a terminal, scaffold the project, write the code, run it, read the error logs, fix the bugs, integrate Stripe, and hand you a working URL.
              </p>
              <p className="text-white/65 leading-relaxed">
                The difference is not incremental. It is the difference between having a <strong className="text-white">consultant who writes plans</strong> and having an <strong className="text-cyan-400">engineer who ships products</strong>.
              </p>
            </div>
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663414931180/JzRyGeYr9FgtzFYFaaCP64/manus-brain-EG9hRtg6cSKJmiMxRA7Fbb.webp"
                alt="Manus AI neural network visualization"
                className="rounded-2xl w-full object-cover"
                style={{ border: "1px solid rgba(37,99,235,0.3)", boxShadow: "0 0 40px rgba(37,99,235,0.15)" }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── REVENUE GROWTH VISUAL ── */}
      <Section className="py-24" style={{ background: "oklch(0.11 0.022 260)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663414931180/JzRyGeYr9FgtzFYFaaCP64/revenue-chart-art-i4xNuR56g8UtGaXcgSjzJf.webp"
                alt="Revenue growth visualization"
                className="rounded-2xl w-full object-cover"
                style={{ border: "1px solid rgba(6,182,212,0.3)", boxShadow: "0 0 40px rgba(6,182,212,0.1)" }}
              />
            </div>
            <div>
              <div className="text-xs text-cyan-400 font-semibold tracking-widest uppercase mb-3">The Compounding Effect</div>
              <h2 className="text-4xl font-extrabold text-white mb-6" style={{ fontFamily: "Syne, sans-serif" }}>
                Each Platform Compounds the Next
              </h2>
              <p className="text-white/65 leading-relaxed mb-6">
                Your strategy is designed around compounding: SEO traffic builds over time, affiliate commissions recur monthly, and SaaS MRR stacks. But compounding only works if you can deploy fast enough to get the flywheel spinning.
              </p>
              <p className="text-white/65 leading-relaxed mb-8">
                At 3-5 platforms per week, by week 8 you have 12 live platforms. By month 3, the early platforms are generating organic traffic. By month 6, the SaaS tools have MRR. The entire model depends on the deployment velocity that only an autonomous AI agent can sustain.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Week 8", value: "12", sub: "live platforms" },
                  { label: "Month 3", value: "$22K+", sub: "est. monthly" },
                  { label: "Month 6", value: "$46K+", sub: "est. monthly" },
                ].map((stat, i) => (
                  <div key={i} className="glow-card-cyan rounded-xl p-4 text-center">
                    <div className="text-xs text-white/40 mb-1">{stat.label}</div>
                    <div className="text-xl font-extrabold font-mono-stat text-cyan-glow">{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xs text-cyan-400 font-semibold tracking-widest uppercase mb-4">Ready to Execute</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "Syne, sans-serif" }}>
              Tell Me Which Platform to Build First.
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-10">
              My recommendation: the <strong className="text-white">Free Tool Cluster Site</strong> — fastest to rank, zero ad spend needed, affiliate-ready from day one, and I can deliver it in under 24 hours.
              But you have 19 other options, and I am ready to start on any of them immediately.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { platform: "Free Tool Cluster", time: "< 1 day", revenue: "$5K–$40K/mo", recommended: true },
                { platform: "AI Tool Directory", time: "1-2 days", revenue: "$10K–$80K/mo", recommended: false },
                { platform: "Micro-SaaS Tool", time: "2-4 days", revenue: "$5K–$50K MRR", recommended: false },
              ].map((opt, i) => (
                <div key={i} className={`rounded-xl p-5 text-left relative ${opt.recommended ? "glow-card border-blue-500/60" : "glow-card"}`}>
                  {opt.recommended && (
                    <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">
                      Recommended
                    </div>
                  )}
                  <div className="text-sm font-bold text-white mb-2" style={{ fontFamily: "Syne, sans-serif" }}>{opt.platform}</div>
                  <div className="text-xs text-white/50 mb-1">⏱ Build time: <span className="text-electric font-mono-stat">{opt.time}</span></div>
                  <div className="text-xs text-white/50">💰 Ceiling: <span className="text-cyan-glow font-mono-stat">{opt.revenue}</span></div>
                </div>
              ))}
            </div>

            <p className="text-white/40 text-sm">
              Prepared by Manus AI · March 2026 · Based on Revenue Platform Strategy by Shane Mitchell (Feb 28, 2026)
            </p>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/8 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="pulse-dot" />
            <span className="text-white/40 text-sm font-semibold" style={{ fontFamily: "Syne, sans-serif" }}>
              Manus × Revenue Platform Strategy
            </span>
          </div>
          <p className="text-white/25 text-xs text-center">
            This interactive presentation was autonomously built by Manus AI — demonstrating exactly the capability described herein.
          </p>
        </div>
      </footer>
    </div>
  );
}
