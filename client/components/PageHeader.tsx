import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

interface PageHeaderProps {
  title?: string;
  sections?: Array<{ id: string; label: string }>;
}

export default function PageHeader({ title, sections }: PageHeaderProps) {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          Clarity Engine
        </Link>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a href="/#tools" className="text-slate-600 hover:text-slate-900 transition text-sm">
              Tools
            </a>
            <a href="/#resources" className="text-slate-600 hover:text-slate-900 transition text-sm">
              Resources
            </a>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition text-sm">
              About
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition text-sm">
              Contact
            </Link>
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition text-sm">
              Home
            </Link>
          </div>
          {!isAuthenticated && (
            <Button asChild size="sm">
              <a href={getLoginUrl()}>Sign In</a>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
