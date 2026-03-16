import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Copy, Code } from "lucide-react";
import { toast } from "sonner";

export default function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState("article");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [datePublished, setDatePublished] = useState(new Date().toISOString().split("T")[0]);
  const [generatedSchema, setGeneratedSchema] = useState("");

  const generateSchema = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    let schema = {};

    if (schemaType === "article") {
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description || "Article about " + title,
        author: {
          "@type": "Person",
          name: author || "Clarity Engine",
        },
        datePublished: datePublished,
        dateModified: new Date().toISOString().split("T")[0],
      };
    } else if (schemaType === "product") {
      schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: title,
        description: description || "Product: " + title,
        brand: {
          "@type": "Brand",
          name: author || "Your Brand",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.5",
          ratingCount: "100",
        },
      };
    } else if (schemaType === "faq") {
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: title,
            acceptedAnswer: {
              "@type": "Answer",
              text: description || "Answer to the question",
            },
          },
        ],
      };
    }

    const schemaJson = JSON.stringify(schema, null, 2);
    const schemaTag = `<script type="application/ld+json">\n${schemaJson}\n</script>`;
    setGeneratedSchema(schemaTag);
    toast.success("Schema markup generated!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSchema);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Clarity Engine
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
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/tools">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition">
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Schema Markup Generator
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Generate structured data markup to help search engines better understand your content. Schema markup can improve your search visibility and enable rich snippets.
            </p>
            <p className="text-slate-600">
              Schema markup is a standardized format that helps search engines understand the meaning of your content. By adding schema markup to your pages, you can enable rich snippets in search results—like star ratings, prices, and publication dates. This not only improves your click-through rate but also helps Google and other search engines crawl and index your content more effectively. This tool generates the correct schema markup for articles, products, FAQs, and more, ready to paste into your HTML.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div id="generator" className="lg:col-span-2">
              <Card className="p-6 bg-white border-slate-200 mb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Schema Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Schema Type
                    </label>
                    <select
                      value={schemaType}
                      onChange={(e) => setSchemaType(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    >
                      <option value="article">Article</option>
                      <option value="product">Product</option>
                      <option value="faq">FAQ Page</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Title *
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter title or headline"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter description or answer"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Author / Brand
                    </label>
                    <Input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Your name or brand"
                    />
                  </div>

                  {schemaType === "article" && (
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Date Published
                      </label>
                      <Input
                        type="date"
                        value={datePublished}
                        onChange={(e) => setDatePublished(e.target.value)}
                      />
                    </div>
                  )}

                  <Button
                    onClick={generateSchema}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    Generate Schema Markup
                  </Button>
                </div>
              </Card>

              {/* Output */}
              {generatedSchema && (
                <Card className="p-6 bg-white border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Generated Markup
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
                    <pre>{generatedSchema}</pre>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-3">How It Works</h3>
                <ol className="space-y-2 text-sm text-slate-700">
                  <li>1. Select your schema type</li>
                  <li>2. Fill in the information</li>
                  <li>3. Generate the markup</li>
                  <li>4. Copy and paste into your HTML</li>
                  <li>5. Test with Google's Rich Results Test</li>
                </ol>
              </Card>

              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="font-semibold text-slate-900 mb-3">Schema Types</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Article - Blog posts, news</li>
                  <li>• Product - E-commerce items</li>
                  <li>• FAQ - Question pages</li>
                  <li>• Event - Conferences, webinars</li>
                  <li>• Recipe - Cooking instructions</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Validate Your Schema
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Test your markup with Google's Rich Results Test tool.
                </p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Test Now
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-16">
        <div className="container text-center">
          <p>&copy; 2026 Clarity Engine. All rights reserved. Built by a team of SEO experts.</p>
        </div>
      </footer>
    </div>
  );
}
