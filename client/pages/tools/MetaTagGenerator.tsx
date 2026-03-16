import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Copy, Eye } from "lucide-react";
import { toast } from "sonner";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [slug, setSlug] = useState("");

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e: string) => {
    setTitle(e);
    if (!slug) {
      setSlug(generateSlug(e));
    }
  };

  const generateMetaTags = (): string => {
    if (!title.trim()) {
      toast.error("Please enter a page title");
      return "";
    }

    const metaTags = `<!-- Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ""}
<meta name="author" content="SEO Toolkit">

<!-- Open Graph Tags (Social Media) -->
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://yoursite.com/${slug}">

<!-- Twitter Card Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">

<!-- Canonical Tag -->
<link rel="canonical" href="https://yoursite.com/${slug}">`;

    return metaTags;
  };

  const copyToClipboard = () => {
    const metaTags = generateMetaTags();
    navigator.clipboard.writeText(metaTags);
    toast.success("Meta tags copied to clipboard");
  };

  const metaTags = generateMetaTags();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            SEO Toolkit
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">
              Tools
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">
              About
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link href="/tools">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition">
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Meta Tag Generator
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Create optimized meta tags for your web pages. Improve click-through rates and social sharing with properly formatted meta information.
            </p>
            <p className="text-lg text-slate-600">
              Our generator automatically creates meta tags for search engines, social media platforms, and browsers. It includes Open Graph tags for Facebook, Twitter Card tags for X, and canonical tags to prevent duplicate content issues. Just enter your page details and copy the generated code directly into your HTML head section.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="p-6 bg-white border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Page Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Page Title *
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter your page title (50-60 characters)"
                      maxLength={60}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      {title.length}/60 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Meta Description
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter your meta description (150-160 characters)"
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      {description.length}/160 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Keywords (comma-separated)
                    </label>
                    <Textarea
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="keyword1, keyword2, keyword3"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      URL Slug
                    </label>
                    <Input
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="auto-generated from title"
                    />
                  </div>
                </div>
              </Card>

              {/* Tips Card */}
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Best Practices</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Title: 50-60 characters for optimal display</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Description: 150-160 characters</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Include primary keyword in title and description</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Make descriptions compelling to improve CTR</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
              {title && (
                <>
                  {/* Preview Card */}
                  <Card className="p-6 bg-white border-slate-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Eye className="h-5 w-5 text-blue-600" />
                      <h2 className="text-lg font-semibold text-slate-900">
                        Search Result Preview
                      </h2>
                    </div>

                    <div className="bg-white border border-slate-300 rounded-lg p-4 space-y-2">
                      <p className="text-sm text-blue-600 font-medium">
                        https://yoursite.com/{slug}
                      </p>
                      <p className="text-lg text-slate-900 font-semibold line-clamp-2">
                        {title}
                      </p>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {description || "Your meta description will appear here..."}
                      </p>
                    </div>
                  </Card>

                  {/* Meta Tags Output */}
                  <Card className="p-6 bg-white border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-slate-900">
                        Generated Meta Tags
                      </h2>
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy
                      </Button>
                    </div>

                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-xs">
                      <pre>{metaTags}</pre>
                    </div>
                  </Card>

                  {/* CTA Card */}
                  <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      Optimize Further
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Use Surfer SEO or SEMrush to analyze competitor meta tags and improve your rankings.
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Learn More
                    </Button>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-16">
        <div className="container text-center">
          <p>&copy; 2026 SEO Toolkit. All rights reserved. Built by a team of SEO experts.</p>
        </div>
      </footer>
    </div>
  );
}
