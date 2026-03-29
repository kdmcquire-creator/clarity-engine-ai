const categories = [
  {
    label: "SEO & Content Marketing Books",
    url: "https://www.amazon.com/s?k=seo+content+marketing+books&tag=clarityengine-20",
    icon: "📚",
  },
  {
    label: "Digital Marketing Tools",
    url: "https://www.amazon.com/s?k=digital+marketing+productivity+tools&tag=clarityengine-20",
    icon: "🔧",
  },
  {
    label: "AI Writing & Strategy",
    url: "https://www.amazon.com/s?k=AI+writing+strategy+content+books&tag=clarityengine-20",
    icon: "✍️",
  },
];

export default function SidebarAmazon() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Shop on Amazon</p>
            <p className="text-white/80 text-xs">SEO &amp; content books</p>
          </div>
        </div>
      </div>

      {/* Category links */}
      <div className="p-4 space-y-2">
        {categories.map((cat) => (
          <a
            key={cat.label}
            href={cat.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-3 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm font-medium text-white/80 hover:border-cyan-500/40 hover:bg-white/10 transition-all group"
          >
            <span className="text-lg">{cat.icon}</span>
            <span className="flex-1">{cat.label}</span>
            <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}

        <a
          href="https://www.amazon.com/?tag=clarityengine-20"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full text-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm py-2.5 rounded-xl transition-colors mt-3"
        >
          Browse Amazon →
        </a>
      </div>

      <p className="px-4 pb-3 text-center text-xs text-white/30">
        As an Amazon Associate I earn from qualifying purchases.
      </p>
    </div>
  );
}
