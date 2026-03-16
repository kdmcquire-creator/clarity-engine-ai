import { Link } from "wouter";

export function SiteNavigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition">
          <a>Clarity Engine</a>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium transition">
            <a>Home</a>
          </Link>
          <Link href="/about" className="text-slate-600 hover:text-slate-900 font-medium transition">
            <a>About</a>
          </Link>
          <Link href="/tools" className="text-slate-600 hover:text-slate-900 font-medium transition">
            <a>Tools</a>
          </Link>
          <Link href="/resources" className="text-slate-600 hover:text-slate-900 font-medium transition">
            <a>Resources</a>
          </Link>
          <Link href="/contact" className="text-slate-600 hover:text-slate-900 font-medium transition">
            <a>Contact</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
