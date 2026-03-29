"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AffiliateBlock from "@/components/AffiliateBlock";
import SiteGroundHalfPage from "@/components/SiteGroundHalfPage";
import MangoolsBanner from "@/components/MangoolsBanner";
import { tools, getToolBySlug } from "@/lib/tools";

// Map each CE tool slug to the most relevant Mangools product + theme
type MangoolsPlacement = {
  tool: "kwfinder" | "serpchecker" | "siteprofiler" | "serpwatcher" | "linkminer";
  theme?: "light" | "dark" | "default";
  version?: "domain";
};

const MANGOOLS_TOOL_MAP: Record<string, MangoolsPlacement> = {
  "keyword-research-tool":     { tool: "kwfinder",     version: "domain" },
  "content-outline-generator": { tool: "kwfinder",     theme: "default"  },
  "backlink-analyzer":         { tool: "linkminer",    theme: "default"  },
  "internal-link-analyzer":    { tool: "linkminer",    theme: "default"  },
  "content-gap-analyzer":      { tool: "serpchecker",  theme: "default"  },
  "competitor-tracker":        { tool: "siteprofiler", theme: "default"  },
  "page-speed-checker":        { tool: "siteprofiler", theme: "default"  },
};

// ─── Utility helpers ──────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "by","from","is","are","was","were","be","been","being","have","has",
  "had","do","does","did","will","would","could","should","may","might",
  "this","that","these","those","it","its","i","you","he","she","we","they",
  "not","as","if","so","than","then","when","where","who","which","how",
]);

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countSentences(text: string) {
  return text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  const vowels = word.match(/[aeiouy]+/g);
  let count = vowels ? vowels.length : 1;
  if (word.endsWith("e")) count -= 1;
  return Math.max(1, count);
}

function fleschScore(text: string): number {
  const words = countWords(text);
  const sentences = countSentences(text);
  const syllables = text
    .split(/\s+/)
    .reduce((sum, w) => sum + countSyllables(w), 0);
  if (words === 0 || sentences === 0) return 0;
  return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
}

function gradeLevel(score: number): string {
  if (score >= 90) return "5th grade";
  if (score >= 80) return "6th grade";
  if (score >= 70) return "7th grade";
  if (score >= 60) return "8th–9th grade";
  if (score >= 50) return "10th–12th grade";
  if (score >= 30) return "College level";
  return "Professional / Graduate";
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

function similarityPercent(a: string, b: string): number {
  const sentA = new Set(
    a.split(/[.!?]+/).map((s) => s.trim().toLowerCase()).filter(Boolean)
  );
  const sentB = new Set(
    b.split(/[.!?]+/).map((s) => s.trim().toLowerCase()).filter(Boolean)
  );
  let matches = 0;
  sentA.forEach((s) => { if (sentB.has(s)) matches++; });
  const total = Math.max(sentA.size, sentB.size, 1);
  return Math.round((matches / total) * 100);
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-white/70 mb-1">
      {children}
    </label>
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 8,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white/90 placeholder-white/30 focus:outline-none focus:border-blue-600/50 resize-y text-sm"
    />
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white/90 placeholder-white/30 focus:outline-none focus:border-blue-600/50 text-sm"
    />
  );
}

function Button({
  onClick,
  children,
  variant = "primary",
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl font-medium text-sm transition ${
        variant === "primary"
          ? "bg-blue-600 hover:bg-blue-500 text-white"
          : "bg-white/10 hover:bg-white/20 text-white"
      }`}
    >
      {children}
    </button>
  );
}

function ResultBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 bg-navy-800 border border-white/10 rounded-xl p-5">
      {children}
    </div>
  );
}

function CharCount({
  value,
  max,
  warn,
}: {
  value: string;
  max: number;
  warn: number;
}) {
  const len = value.length;
  const color =
    len > max ? "text-red-400" : len > warn ? "text-yellow-400" : "text-green-400";
  return (
    <span className={`text-xs ${color}`}>
      {len}/{max}
    </span>
  );
}

// ─── Individual tool implementations ─────────────────────────────────────────

function KeywordDensityTool() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<
    { word: string; count: number; density: string }[]
  >([]);

  const analyze = useCallback(() => {
    const words = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
    const total = words.length;
    const freq: Record<string, number> = {};
    words.forEach((w) => { freq[w] = (freq[w] || 0) + 1; });
    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / total) * 100).toFixed(2) + "%",
      }));
    setResults(sorted);
  }, [text]);

  return (
    <div>
      <Label>Paste your content</Label>
      <TextArea value={text} onChange={setText} placeholder="Paste your article or page content here..." rows={10} />
      <div className="mt-3">
        <Button onClick={analyze}>Analyze Keyword Density</Button>
      </div>
      {results.length > 0 && (
        <ResultBox>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white">Keyword Density Results</h3>
            <Button
              variant="secondary"
              onClick={() =>
                copyToClipboard(
                  results.map((r) => `${r.word}\t${r.count}\t${r.density}`).join("\n")
                )
              }
            >
              Copy
            </Button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-left">
                <th className="pb-2 font-medium">Keyword</th>
                <th className="pb-2 font-medium">Count</th>
                <th className="pb-2 font-medium">Density</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.word} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-2 text-white">{r.word}</td>
                  <td className="py-2 text-white/70">{r.count}</td>
                  <td className="py-2">
                    <span
                      className={
                        parseFloat(r.density) > 3
                          ? "text-yellow-400"
                          : "text-green-400"
                      }
                    >
                      {r.density}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-white/40">
            Stop words excluded. Aim for 1–2% density for primary keywords.
          </p>
        </ResultBox>
      )}
    </div>
  );
}

function MetaTagGeneratorTool() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [copied, setCopied] = useState(false);

  const html = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="description" content="${desc}" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
${image ? `<meta property="og:image" content="${image}" />` : ""}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${url}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
${image ? `<meta name="twitter:image" content="${image}" />` : ""}`;

  const handleCopy = () => {
    copyToClipboard(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Page Title</Label>
          <CharCount value={title} max={60} warn={50} />
        </div>
        <Input value={title} onChange={setTitle} placeholder="Your page title (50–60 chars)" />
        {title.length > 60 && (
          <p className="text-xs text-red-400 mt-1">Title is too long — Google will truncate it.</p>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Meta Description</Label>
          <CharCount value={desc} max={160} warn={130} />
        </div>
        <TextArea value={desc} onChange={setDesc} placeholder="Compelling description (150–160 chars)" rows={3} />
        {desc.length > 160 && (
          <p className="text-xs text-red-400 mt-1">Description is too long — Google will truncate it.</p>
        )}
      </div>
      <div>
        <Label>Page URL</Label>
        <Input value={url} onChange={setUrl} placeholder="https://yourdomain.com/page/" />
      </div>
      <div>
        <Label>OG Image URL (optional)</Label>
        <Input value={image} onChange={setImage} placeholder="https://yourdomain.com/og-image.jpg" />
      </div>
      {title && (
        <ResultBox>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-white">Generated HTML</h3>
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy HTML"}
            </Button>
          </div>
          <pre className="text-xs text-white/70 bg-black/20 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
            {html}
          </pre>
        </ResultBox>
      )}
    </div>
  );
}

function ReadabilityTool() {
  const [text, setText] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const analyze = useCallback(() => {
    const s = fleschScore(text);
    setScore(Math.min(100, Math.max(0, Math.round(s))));
  }, [text]);

  const scoreColor =
    score === null
      ? ""
      : score >= 70
      ? "text-green-400"
      : score >= 50
      ? "text-yellow-400"
      : "text-red-400";

  const sentences = text ? countSentences(text) : 0;
  const words = text ? countWords(text) : 0;
  const avgWordsPerSentence = sentences > 0 ? Math.round(words / sentences) : 0;

  return (
    <div>
      <Label>Paste your content</Label>
      <TextArea value={text} onChange={setText} placeholder="Paste your article content here..." rows={10} />
      <div className="mt-3">
        <Button onClick={analyze}>Calculate Readability</Button>
      </div>
      {score !== null && (
        <ResultBox>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className={`text-3xl font-bold mb-1 ${scoreColor}`}>{score}</div>
              <div className="text-xs text-white/50">Flesch Score</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-white mb-1">{gradeLevel(score)}</div>
              <div className="text-xs text-white/50">Reading Level</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">{words}</div>
              <div className="text-xs text-white/50">Total Words</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <div
                className={`text-3xl font-bold mb-1 ${
                  avgWordsPerSentence > 25 ? "text-yellow-400" : "text-green-400"
                }`}
              >
                {avgWordsPerSentence}
              </div>
              <div className="text-xs text-white/50">Avg Words/Sentence</div>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-white/70">
              <span className="font-medium text-white">Score interpretation:</span>{" "}
              {score >= 70
                ? "Good — easy to read for most audiences."
                : score >= 50
                ? "Fair — consider simplifying sentence structure."
                : "Hard — this content may be too complex for general audiences."}
            </p>
            {avgWordsPerSentence > 20 && (
              <p className="text-yellow-400 text-xs">
                Tip: Your average sentence length is high. Break long sentences into shorter ones for better readability.
              </p>
            )}
          </div>
        </ResultBox>
      )}
    </div>
  );
}

function SchemaMarkupTool() {
  const [type, setType] = useState("Article");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const schemaFields: Record<string, { key: string; label: string; placeholder: string }[]> = {
    Article: [
      { key: "headline", label: "Headline", placeholder: "Article title" },
      { key: "author", label: "Author Name", placeholder: "John Doe" },
      { key: "datePublished", label: "Date Published", placeholder: "2025-01-01" },
      { key: "url", label: "URL", placeholder: "https://example.com/article" },
      { key: "image", label: "Image URL", placeholder: "https://example.com/image.jpg" },
    ],
    FAQ: [
      { key: "q1", label: "Question 1", placeholder: "What is SEO?" },
      { key: "a1", label: "Answer 1", placeholder: "SEO stands for Search Engine Optimization..." },
      { key: "q2", label: "Question 2", placeholder: "How long does SEO take?" },
      { key: "a2", label: "Answer 2", placeholder: "SEO typically takes 3–6 months..." },
    ],
    Product: [
      { key: "name", label: "Product Name", placeholder: "My Product" },
      { key: "description", label: "Description", placeholder: "Product description" },
      { key: "price", label: "Price", placeholder: "29.99" },
      { key: "currency", label: "Currency", placeholder: "USD" },
      { key: "availability", label: "Availability", placeholder: "InStock" },
    ],
    LocalBusiness: [
      { key: "name", label: "Business Name", placeholder: "Acme Corp" },
      { key: "address", label: "Street Address", placeholder: "123 Main St" },
      { key: "city", label: "City", placeholder: "New York" },
      { key: "phone", label: "Phone", placeholder: "+1-212-555-0100" },
      { key: "url", label: "Website URL", placeholder: "https://acme.com" },
    ],
  };

  function buildSchema() {
    const f = fields;
    if (type === "Article") {
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: f.headline || "",
          author: { "@type": "Person", name: f.author || "" },
          datePublished: f.datePublished || "",
          url: f.url || "",
          image: f.image || "",
        },
        null,
        2
      );
    }
    if (type === "FAQ") {
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: f.q1 || "", acceptedAnswer: { "@type": "Answer", text: f.a1 || "" } },
            { "@type": "Question", name: f.q2 || "", acceptedAnswer: { "@type": "Answer", text: f.a2 || "" } },
          ],
        },
        null,
        2
      );
    }
    if (type === "Product") {
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: f.name || "",
          description: f.description || "",
          offers: {
            "@type": "Offer",
            price: f.price || "",
            priceCurrency: f.currency || "USD",
            availability: `https://schema.org/${f.availability || "InStock"}`,
          },
        },
        null,
        2
      );
    }
    if (type === "LocalBusiness") {
      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: f.name || "",
          address: {
            "@type": "PostalAddress",
            streetAddress: f.address || "",
            addressLocality: f.city || "",
          },
          telephone: f.phone || "",
          url: f.url || "",
        },
        null,
        2
      );
    }
    return "{}";
  }

  const schema = buildSchema();
  const wrapped = `<script type="application/ld+json">\n${schema}\n</script>`;

  const handleCopy = () => {
    copyToClipboard(wrapped);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-4">
        <Label>Schema Type</Label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(schemaFields).map((t) => (
            <button
              key={t}
              onClick={() => { setType(t); setFields({}); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                type === t
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {schemaFields[type].map((f) => (
          <div key={f.key}>
            <Label>{f.label}</Label>
            <Input
              value={fields[f.key] || ""}
              onChange={(v) => setFields((prev) => ({ ...prev, [f.key]: v }))}
              placeholder={f.placeholder}
            />
          </div>
        ))}
      </div>
      <ResultBox>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-white">JSON-LD Output</h3>
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy Script Tag"}
          </Button>
        </div>
        <pre className="text-xs text-white/70 bg-black/20 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
          {wrapped}
        </pre>
      </ResultBox>
    </div>
  );
}

function HeadingAnalyzerTool() {
  const [text, setText] = useState("");
  const [headings, setHeadings] = useState<{ level: number; text: string }[]>([]);

  const analyze = useCallback(() => {
    const lines = text.split("\n");
    const found: { level: number; text: string }[] = [];
    for (const line of lines) {
      const mdMatch = line.match(/^(#{1,6})\s+(.+)/);
      if (mdMatch) {
        found.push({ level: mdMatch[1].length, text: mdMatch[2].trim() });
        continue;
      }
      const htmlMatch = line.match(/<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/i);
      if (htmlMatch) {
        found.push({ level: parseInt(htmlMatch[1]), text: htmlMatch[2].trim() });
      }
    }
    setHeadings(found);
  }, [text]);

  const levelColors = [
    "text-blue-400",
    "text-cyan-400",
    "text-green-400",
    "text-yellow-400",
    "text-orange-400",
    "text-red-400",
  ];

  const hasH1 = headings.some((h) => h.level === 1);
  const multipleH1 = headings.filter((h) => h.level === 1).length > 1;

  return (
    <div>
      <Label>Paste HTML or Markdown with headings</Label>
      <TextArea
        value={text}
        onChange={setText}
        placeholder={`# H1 Title\n## H2 Section\n### H3 Subsection\nor paste HTML with <h1>, <h2>, etc.`}
        rows={10}
      />
      <div className="mt-3">
        <Button onClick={analyze}>Analyze Headings</Button>
      </div>
      {headings.length > 0 && (
        <ResultBox>
          <h3 className="font-semibold text-white mb-3">Heading Hierarchy</h3>
          <div className="space-y-1 mb-4">
            {headings.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-2"
                style={{ paddingLeft: `${(h.level - 1) * 16}px` }}
              >
                <span className={`text-xs font-bold ${levelColors[h.level - 1]} w-8`}>
                  H{h.level}
                </span>
                <span className="text-white/80 text-sm">{h.text}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1 text-xs">
            {!hasH1 && <p className="text-red-400">Missing H1 — every page needs exactly one H1.</p>}
            {multipleH1 && <p className="text-yellow-400">Multiple H1 tags detected — use only one H1 per page.</p>}
            {hasH1 && !multipleH1 && <p className="text-green-400">H1 structure looks good.</p>}
          </div>
        </ResultBox>
      )}
    </div>
  );
}

function TitleTagOptimizerTool() {
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");

  const PIXEL_MAX = 600;
  const charPixels = title.length * 6.5;
  const pixelPct = Math.min(100, (charPixels / PIXEL_MAX) * 100);
  const barColor = pixelPct > 100 ? "bg-red-500" : pixelPct > 85 ? "bg-yellow-500" : "bg-green-500";

  const powerWords = ["best", "free", "guide", "how to", "top", "ultimate", "complete", "easy", "fast", "proven"];
  const foundPower = powerWords.filter((w) => title.toLowerCase().includes(w));
  const hasKeyword = keyword && title.toLowerCase().includes(keyword.toLowerCase());
  const keywordPos =
    keyword && title.toLowerCase().includes(keyword.toLowerCase())
      ? title.toLowerCase().indexOf(keyword.toLowerCase()) < title.length / 2
        ? "Front (good)"
        : "Back (consider moving it earlier)"
      : keyword
      ? "Not found"
      : "—";

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Title Tag</Label>
          <CharCount value={title} max={60} warn={50} />
        </div>
        <Input value={title} onChange={setTitle} placeholder="Enter your page title..." />
      </div>
      <div>
        <Label>Target Keyword (optional)</Label>
        <Input value={keyword} onChange={setKeyword} placeholder="e.g. best seo tools" />
      </div>
      {title && (
        <ResultBox>
          <h3 className="font-semibold text-white mb-4">Title Analysis</h3>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span>Pixel width estimate</span>
              <span>{Math.round(charPixels)}px / {PIXEL_MAX}px max</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${barColor} transition-all`}
                style={{ width: `${Math.min(100, pixelPct)}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-white/50 text-xs mb-1">Keyword Position</div>
              <div className={hasKeyword ? "text-green-400" : "text-white/70"}>{keywordPos}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-white/50 text-xs mb-1">Power Words</div>
              <div className="text-white/70">
                {foundPower.length > 0 ? (
                  <span className="text-green-400">{foundPower.join(", ")}</span>
                ) : (
                  <span className="text-yellow-400">None detected</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-navy-900/50 rounded-xl border border-white/10 text-sm">
            <div className="text-xs text-white/40 mb-1">SERP Preview</div>
            <div className="text-blue-400 font-medium truncate">
              {title.length > 60 ? title.slice(0, 60) + "…" : title}
            </div>
          </div>
        </ResultBox>
      )}
    </div>
  );
}

function UrlAnalyzerTool() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<{ label: string; pass: boolean; note: string }[] | null>(null);

  const analyze = useCallback(() => {
    if (!url) return;
    const checks = [
      {
        label: "Uses HTTPS",
        pass: url.startsWith("https://"),
        note: url.startsWith("https://") ? "Good — secure connection." : "Use HTTPS for SEO and security.",
      },
      {
        label: "URL length",
        pass: url.length <= 75,
        note: url.length <= 75 ? `${url.length} chars — within recommended length.` : `${url.length} chars — keep URLs under 75 characters.`,
      },
      {
        label: "No spaces or special chars",
        pass: !/[^\w\-./:]/.test(url),
        note: /[^\w\-./:]/.test(url) ? "Remove spaces and special characters." : "URL characters look clean.",
      },
      {
        label: "Lowercase",
        pass: url === url.toLowerCase(),
        note: url === url.toLowerCase() ? "All lowercase — good." : "Use lowercase URLs to avoid duplicate content.",
      },
      {
        label: "No underscores",
        pass: !url.includes("_"),
        note: url.includes("_") ? "Use hyphens instead of underscores." : "No underscores — good.",
      },
      {
        label: "No query parameters",
        pass: !url.includes("?"),
        note: url.includes("?") ? "Query params can cause indexing issues. Consider clean URLs." : "No query parameters — good.",
      },
    ];
    setResults(checks);
  }, [url]);

  const score = results ? Math.round((results.filter((r) => r.pass).length / results.length) * 100) : 0;

  return (
    <div>
      <Label>Enter a URL to analyze</Label>
      <Input value={url} onChange={setUrl} placeholder="https://example.com/your-page/" />
      <div className="mt-3">
        <Button onClick={analyze}>Analyze URL</Button>
      </div>
      {results && (
        <ResultBox>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">URL Analysis</h3>
            <span
              className={`text-sm font-bold ${
                score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"
              }`}
            >
              Score: {score}/100
            </span>
          </div>
          <div className="space-y-2">
            {results.map((r) => (
              <div key={r.label} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <span className={`mt-0.5 text-sm ${r.pass ? "text-green-400" : "text-red-400"}`}>
                  {r.pass ? "✓" : "✗"}
                </span>
                <div>
                  <div className="text-sm font-medium text-white">{r.label}</div>
                  <div className="text-xs text-white/50">{r.note}</div>
                </div>
              </div>
            ))}
          </div>
        </ResultBox>
      )}
    </div>
  );
}

function SerpSimulatorTool() {
  const [title, setTitle] = useState("");
  const [serpUrl, setSerpUrl] = useState("");
  const [desc, setDesc] = useState("");

  const displayTitle = title.length > 60 ? title.slice(0, 60) + "…" : title;
  const displayDesc = desc.length > 160 ? desc.slice(0, 160) + "…" : desc;
  const displayUrl = serpUrl
    ? serpUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "example.com/your-page";

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Page Title</Label>
          <CharCount value={title} max={60} warn={50} />
        </div>
        <Input value={title} onChange={setTitle} placeholder="Your page title..." />
      </div>
      <div>
        <Label>Page URL</Label>
        <Input value={serpUrl} onChange={setSerpUrl} placeholder="https://example.com/your-page/" />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label>Meta Description</Label>
          <CharCount value={desc} max={160} warn={130} />
        </div>
        <TextArea value={desc} onChange={setDesc} placeholder="Your meta description..." rows={3} />
      </div>

      <ResultBox>
        <h3 className="font-semibold text-white mb-4 text-sm">Desktop Preview</h3>
        <div className="bg-white rounded-xl p-4 font-sans">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">CE</span>
            </div>
            <div>
              <div className="text-xs text-gray-800 font-medium leading-none">
                {displayUrl.split("/")[0]}
              </div>
              <div className="text-xs text-gray-500">{displayUrl}</div>
            </div>
          </div>
          <div className="text-blue-700 text-lg hover:underline cursor-pointer leading-snug">
            {displayTitle || "Your Page Title Will Appear Here"}
          </div>
          <div className="text-sm text-gray-600 mt-1 leading-relaxed">
            {displayDesc || "Your meta description will appear here. Make it compelling to drive clicks from search results."}
          </div>
        </div>

        <h3 className="font-semibold text-white mt-4 mb-3 text-sm">Mobile Preview</h3>
        <div className="bg-white rounded-xl p-3 font-sans max-w-sm">
          <div className="text-xs text-gray-500 mb-1">{displayUrl.split("/")[0]}</div>
          <div className="text-blue-700 text-base hover:underline cursor-pointer leading-snug">
            {displayTitle || "Your Page Title Here"}
          </div>
          <div className="text-xs text-gray-600 mt-1 leading-relaxed">
            {displayDesc.length > 100
              ? displayDesc.slice(0, 100) + "…"
              : displayDesc || "Meta description preview..."}
          </div>
        </div>
      </ResultBox>
    </div>
  );
}

function DuplicateContentTool() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [result, setResult] = useState<{ pct: number; risk: string } | null>(null);

  const analyze = useCallback(() => {
    const pct = similarityPercent(text1, text2);
    const risk = pct >= 80 ? "High" : pct >= 50 ? "Medium" : pct >= 20 ? "Low" : "Minimal";
    setResult({ pct, risk });
  }, [text1, text2]);

  const riskColor =
    result?.risk === "High"
      ? "text-red-400"
      : result?.risk === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Content A</Label>
          <TextArea value={text1} onChange={setText1} placeholder="Paste first piece of content..." rows={10} />
        </div>
        <div>
          <Label>Content B</Label>
          <TextArea value={text2} onChange={setText2} placeholder="Paste second piece of content..." rows={10} />
        </div>
      </div>
      <div className="mt-3">
        <Button onClick={analyze}>Compare Content</Button>
      </div>
      {result && (
        <ResultBox>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${riskColor}`}>{result.pct}%</div>
              <div className="text-xs text-white/50 mt-1">Similarity</div>
            </div>
            <div>
              <div className="text-sm text-white/70 mb-1">
                SEO Risk: <span className={`font-bold ${riskColor}`}>{result.risk}</span>
              </div>
              <p className="text-xs text-white/50">
                {result.pct >= 80
                  ? "Significant duplication detected. Consider canonicalizing or rewriting."
                  : result.pct >= 50
                  ? "Moderate similarity. Ensure both pages serve distinct purposes."
                  : result.pct >= 20
                  ? "Minor overlap. Likely acceptable."
                  : "Content is sufficiently unique."}
              </p>
            </div>
          </div>
        </ResultBox>
      )}
    </div>
  );
}

function MobileFriendlinessTool() {
  const [html, setHtml] = useState("");
  const [checks, setChecks] = useState<{ label: string; pass: boolean; note: string }[] | null>(null);

  const analyze = useCallback(() => {
    const h = html.toLowerCase();
    const results = [
      {
        label: "Viewport meta tag",
        pass: h.includes('name="viewport"') || h.includes("name='viewport'"),
        note: h.includes("viewport")
          ? 'Found: viewport meta tag present.'
          : 'Missing <meta name="viewport" content="width=device-width, initial-scale=1">',
      },
      {
        label: "Responsive images",
        pass: h.includes("max-width") || h.includes("width: 100%") || h.includes("img-fluid"),
        note: h.includes("max-width") ? "Responsive image styles detected." : "Add max-width: 100% to images.",
      },
      {
        label: "No fixed-width layout",
        pass: !h.match(/width:\s*\d{3,}px/),
        note: h.match(/width:\s*\d{3,}px/)
          ? "Fixed pixel widths detected — use percentages or max-width."
          : "No large fixed widths detected.",
      },
      {
        label: "Font size legibility",
        pass: !h.match(/font-size:\s*([0-9]|1[0-4])px/),
        note: h.match(/font-size:\s*([0-9]|1[0-4])px/)
          ? "Small font sizes detected (under 15px). Use 16px minimum for body text."
          : "No tiny font sizes detected.",
      },
      {
        label: "No horizontal scroll triggers",
        pass: !h.includes("overflow-x: scroll"),
        note: h.includes("overflow-x: scroll")
          ? "overflow-x: scroll found — avoid horizontal scroll on mobile."
          : "No horizontal scroll styles detected.",
      },
    ];
    setChecks(results);
  }, [html]);

  const score = checks
    ? Math.round((checks.filter((c) => c.pass).length / checks.length) * 100)
    : 0;

  return (
    <div>
      <Label>Paste your page HTML</Label>
      <TextArea value={html} onChange={setHtml} placeholder="Paste your HTML here..." rows={10} />
      <div className="mt-3">
        <Button onClick={analyze}>Check Mobile Friendliness</Button>
      </div>
      {checks && (
        <ResultBox>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Mobile SEO Audit</h3>
            <span
              className={`text-sm font-bold ${
                score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"
              }`}
            >
              {score}/100
            </span>
          </div>
          <div className="space-y-2">
            {checks.map((c) => (
              <div key={c.label} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <span className={`mt-0.5 text-sm ${c.pass ? "text-green-400" : "text-red-400"}`}>
                  {c.pass ? "✓" : "✗"}
                </span>
                <div>
                  <div className="text-sm font-medium text-white">{c.label}</div>
                  <div className="text-xs text-white/50">{c.note}</div>
                </div>
              </div>
            ))}
          </div>
        </ResultBox>
      )}
    </div>
  );
}

// ─── AI streaming hook ────────────────────────────────────────────────────────────────

function useStreamingResult() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const run = useCallback(async (tool: string, inputs: Record<string, string>) => {
    setResult("");
    setLoading(true);
    setDone(false);
    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, ...inputs }),
      });
      if (!res.ok) throw new Error("API error");
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done: d, value } = await reader.read();
        if (d) break;
        setResult((prev) => prev + decoder.decode(value));
      }
      setDone(true);
    } catch {
      setResult("Error running analysis. Please try again.");
      setDone(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, done, run };
}

// ─── Markdown renderer ──────────────────────────────────────────────────────────────
// Content is HTML-escaped (&, <, >) before template injection, preventing XSS.

function renderMarkdown(text: string): string {
  const lines = text.split("\n");
  const html: string[] = [];
  for (const raw of lines) {
    let line = raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    if (/^##\s+/.test(line)) {
      const inner = line.replace(/^##\s+/, "").replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
      html.push(`<h3 class="text-white font-bold mt-4 mb-2 text-base">${inner}</h3>`);
      continue;
    }
    if (/^#\s+/.test(line)) {
      const inner = line.replace(/^#\s+/, "").replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
      html.push(`<h2 class="text-white font-bold mt-5 mb-2 text-lg">${inner}</h2>`);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const inner = line.replace(/^\d+\.\s+/, "").replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
      html.push(`<div class="flex gap-2 text-sm mb-1"><span class="text-cyan-400 shrink-0">&#8226;</span><span class="text-white/70">${inner}</span></div>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const inner = line.replace(/^[-*]\s+/, "").replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
      html.push(`<div class="flex gap-2 text-sm mb-1 ml-3"><span class="text-cyan-400 shrink-0">&#8226;</span><span class="text-white/70">${inner}</span></div>`);
      continue;
    }
    if (line.trim() === "") {
      html.push('<div class="mb-1"></div>');
      continue;
    }
    const inner = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
    html.push(`<p class="text-white/70 text-sm mb-2">${inner}</p>`);
  }
  return html.join("");
}

// ─── Shared AI result display ────────────────────────────────────────────────────────────────

function AiResultBox({ result, loading, done }: { result: string; loading: boolean; done: boolean }) {
  if (!result && !loading) return null;
  return (
    <ResultBox>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-white/40 uppercase tracking-wider">AI Analysis</span>
        <div className="flex items-center gap-2">
          {loading && (
            <span className="flex items-center gap-1.5 text-xs text-cyan-400">
              <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Generating...
            </span>
          )}
          {done && result && (
            <Button variant="secondary" onClick={() => copyToClipboard(result)}>
              Copy Results
            </Button>
          )}
        </div>
      </div>
      <div
        className="prose-output"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(result) }}
      />
    </ResultBox>
  );
}

// ─── AI tool components ───────────────────────────────────────────────────────────────────

function BacklinkAnalyzerTool() {
  const [domain, setDomain] = useState("");
  const { result, loading, done, run } = useStreamingResult();
  return (
    <div>
      <Label>Domain to analyze</Label>
      <Input value={domain} onChange={setDomain} placeholder="example.com" />
      <div className="mt-3">
        <Button onClick={() => run("backlink-analyzer", { domain })}>
          {loading ? "Analyzing..." : "Analyze Backlinks"}
        </Button>
      </div>
      <AiResultBox result={result} loading={loading} done={done} />
    </div>
  );
}

function ContentGapAnalyzerTool() {
  const [topic, setTopic] = useState("");
  const [competitors, setCompetitors] = useState("");
  const { result, loading, done, run } = useStreamingResult();
  return (
    <div>
      <Label>Your Topic</Label>
      <Input value={topic} onChange={setTopic} placeholder="e.g. email marketing for SaaS" />
      <div className="mt-4">
        <Label>Competitor URLs or context (optional)</Label>
        <TextArea
          value={competitors}
          onChange={setCompetitors}
          placeholder="e.g. mailchimp.com, convertkit.com -- or describe your niche"
          rows={3}
        />
      </div>
      <div className="mt-3">
        <Button onClick={() => run("content-gap-analyzer", { topic, competitors })}>
          {loading ? "Analyzing..." : "Find Content Gaps"}
        </Button>
      </div>
      <AiResultBox result={result} loading={loading} done={done} />
    </div>
  );
}

function ContentOutlineGeneratorTool() {
  const [keyword, setKeyword] = useState("");
  const { result, loading, done, run } = useStreamingResult();
  return (
    <div>
      <Label>Target keyword</Label>
      <Input value={keyword} onChange={setKeyword} placeholder="e.g. best project management software" />
      <div className="mt-3">
        <Button onClick={() => run("content-outline-generator", { keyword })}>
          {loading ? "Generating..." : "Generate Outline"}
        </Button>
      </div>
      <AiResultBox result={result} loading={loading} done={done} />
    </div>
  );
}

function InternalLinkAnalyzerTool() {
  const [content, setContent] = useState("");
  const { result, loading, done, run } = useStreamingResult();
  return (
    <div>
      <Label>Paste your content or HTML to analyze</Label>
      <TextArea
        value={content}
        onChange={setContent}
        placeholder="Paste your article content or page HTML here..."
        rows={10}
      />
      <div className="mt-3">
        <Button onClick={() => run("internal-link-analyzer", { content })}>
          {loading ? "Analyzing..." : "Analyze Internal Links"}
        </Button>
      </div>
      <AiResultBox result={result} loading={loading} done={done} />
    </div>
  );
}

function PageSpeedCheckerTool() {
  const [url, setUrl] = useState("");
  const { result, loading, done, run } = useStreamingResult();
  return (
    <div>
      <Label>URL to analyze</Label>
      <Input value={url} onChange={setUrl} placeholder="https://example.com/page" />
      <div className="mt-3">
        <Button onClick={() => run("page-speed-checker", { url })}>
          {loading ? "Analyzing..." : "Check Page Speed"}
        </Button>
      </div>
      <AiResultBox result={result} loading={loading} done={done} />
    </div>
  );
}

function CompetitorTrackerTool() {
  const [domains, setDomains] = useState("");
  const { result, loading, done, run } = useStreamingResult();
  return (
    <div>
      <Label>Competitor domains (one per line)</Label>
      <TextArea
        value={domains}
        onChange={setDomains}
        placeholder={"competitor1.com\ncompetitor2.com\ncompetitor3.com"}
        rows={5}
      />
      <div className="mt-3">
        <Button onClick={() => run("competitor-tracker", { domains })}>
          {loading ? "Analyzing..." : "Analyze Competitors"}
        </Button>
      </div>
      <AiResultBox result={result} loading={loading} done={done} />
    </div>
  );
}

function KeywordResearchTool() {
  const [keyword, setKeyword] = useState("");
  const { result, loading, done, run } = useStreamingResult();
  return (
    <div>
      <Label>Seed keyword</Label>
      <Input value={keyword} onChange={setKeyword} placeholder="e.g. content marketing" />
      <div className="mt-3">
        <Button onClick={() => run("keyword-research-tool", { keyword })}>
          {loading ? "Researching..." : "Research Keywords"}
        </Button>
      </div>
      <AiResultBox result={result} loading={loading} done={done} />
    </div>
  );
}

// ─── Tool router ──────────────────────────────────────────────────────────────────────────────────

function ToolRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case "keyword-density-checker": return <KeywordDensityTool />;
    case "meta-tag-generator": return <MetaTagGeneratorTool />;
    case "readability-score": return <ReadabilityTool />;
    case "schema-markup-generator": return <SchemaMarkupTool />;
    case "heading-analyzer": return <HeadingAnalyzerTool />;
    case "title-tag-optimizer": return <TitleTagOptimizerTool />;
    case "url-structure-analyzer": return <UrlAnalyzerTool />;
    case "serp-simulator": return <SerpSimulatorTool />;
    case "duplicate-content-detector": return <DuplicateContentTool />;
    case "mobile-friendliness-checker": return <MobileFriendlinessTool />;
    case "backlink-analyzer": return <BacklinkAnalyzerTool />;
    case "content-gap-analyzer": return <ContentGapAnalyzerTool />;
    case "content-outline-generator": return <ContentOutlineGeneratorTool />;
    case "internal-link-analyzer": return <InternalLinkAnalyzerTool />;
    case "page-speed-checker": return <PageSpeedCheckerTool />;
    case "competitor-tracker": return <CompetitorTrackerTool />;
    case "keyword-research-tool": return <KeywordResearchTool />;
    default: return null;
  }
}
// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ToolPage() {
  const params = useParams();
  const rawSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const slug = rawSlug ?? "";
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <>
        <Header />
        <main className="py-20 px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Tool not found</h1>
          <Link href="/tools/" className="text-cyan-400 hover:text-cyan-300">
            ← Back to all tools
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: tool.category,
    url: `https://clarity-engine.ai/tools/${tool.slug}/`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://clarity-engine.ai" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://clarity-engine.ai/tools/" },
      { "@type": "ListItem", position: 3, name: tool.name, item: `https://clarity-engine.ai/tools/${tool.slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
            <Link href="/tools/" className="hover:text-white transition">
              Tools
            </Link>
            <span>/</span>
            <span className="text-white/70">{tool.name}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <h1
                className="text-3xl font-extrabold text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                {tool.name}
              </h1>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  tool.isFrontendOnly
                    ? "bg-green-900/40 text-green-400 border border-green-800/50"
                    : "bg-blue-900/40 text-blue-400 border border-blue-800/50"
                }`}
              >
                {tool.isFrontendOnly ? "Free — Instant" : "AI-Powered"}
              </span>
            </div>
            <p className="text-white/60 text-lg">{tool.description}</p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tool.features.map((f) => (
              <span
                key={f}
                className="text-xs bg-white/5 border border-white/10 text-white/60 px-3 py-1 rounded-full"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Tool UI */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <ToolRenderer slug={slug} />
          </div>

          {/* Affiliate CTA */}
          <AffiliateBlock
            toolSlug={slug}
            ctaLabel={tool.ctaLabel}
          />

          {/* Half-page banner */}
          <SiteGroundHalfPage />

          {/* Mangools contextual banner */}
          {MANGOOLS_TOOL_MAP[slug] && (() => {
            const { tool, theme, version } = MANGOOLS_TOOL_MAP[slug];
            return (
              <div className="flex justify-center mt-6">
                <MangoolsBanner tool={tool} theme={theme} version={version} />
              </div>
            );
          })()}

          {/* Related tools */}
          <div className="mt-12">
            <h2
              className="text-xl font-bold text-white mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              More Free Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-3">
              {tools
                .filter((t) => t.slug !== slug)
                .slice(0, 3)
                .map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}/`}
                    className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-600/50 rounded-xl p-4 transition-all"
                  >
                    <h3 className="font-medium text-white group-hover:text-cyan-400 transition text-sm mb-1">
                      {t.name}
                    </h3>
                    <p className="text-white/40 text-xs">{t.shortDesc}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
