import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy-900/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CE</span>
            </div>
            <span
              className="text-xl font-bold text-white"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Clarity Engine
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/tools/"
              className="text-white/70 hover:text-white transition text-sm font-medium"
            >
              Tools
            </Link>
            <Link
              href="/blog/"
              className="text-white/70 hover:text-white transition text-sm font-medium"
            >
              Blog
            </Link>
            <Link
              href="/about/"
              className="text-white/70 hover:text-white transition text-sm font-medium"
            >
              About
            </Link>
          </nav>
          <Link
            href="/tools/"
            className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Free Tools →
          </Link>
        </div>
      </div>
    </header>
  );
}
