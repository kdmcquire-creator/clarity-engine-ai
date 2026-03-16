import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Clock, User, ArrowLeft, Share2, MessageCircle, ChevronUp, Palette, Info } from "lucide-react";
import { TemplateRenderer, TEMPLATE_METADATA, type TemplateType } from "@/components/ArticleTemplates";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ContextualAffiliateLinks } from "@/components/ContextualAffiliateLinks";
import { AuthorByline } from "@/components/AuthorByline";
import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

// Helper function to get random template
function getRandomTemplate(): TemplateType {
  const templates: TemplateType[] = ['hero-sidebar', 'timeline', 'card-grid', 'split-screen', 'infographic', 'expert-interview', 'scrollytelling', 'data-dashboard'];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Import article data from Resources
const resourcesData = [
  {
    id: "semrush-vs-ahrefs",
    title: "Semrush vs Ahrefs: Head-to-Head Comparison for 2026",
    excerpt: "Choosing between Semrush and Ahrefs? We break down the differences, strengths, and best use cases for each platform.",
    author: "Eleanor Vance",
    date: "2026-03-10",
    readTime: 12,
    category: "SEO Tools",
    type: "comparison",
    content: `<h2>Introduction</h2>
<p>If you've spent more than five minutes in the SEO community, you've probably heard the eternal debate: Semrush or Ahrefs? It's the kind of question that sparks passionate arguments in Slack channels and Reddit threads alike. Both platforms are industry-standard for a reason—they're genuinely powerful. But they're also expensive, and choosing the wrong one for your specific needs can feel like flushing money down the drain.</p>
<p>I've spent the better part of a decade working with both platforms, and I've seen teams thrive with one and struggle with the other. The truth? There's no universal "winner." But there <em>are</em> winners for specific use cases. Let's dig in.</p>
<h2>The Fundamental Difference</h2>
<p>Before we get into the weeds, here's the core distinction: Semrush is broader. Ahrefs is deeper. Semrush gives you a toolkit for content marketing, PPC research, and social media management. Ahrefs gives you the most comprehensive backlink database on the planet and exceptional link-building research. If you're a solo entrepreneur wearing ten hats, Semrush might save your sanity. If you're a link-building specialist, Ahrefs is non-negotiable.</p>
<h2>Feature Deep Dive</h2>
<h3>Keyword Research</h3>
<p>Both platforms have excellent keyword research tools, but they approach it differently. Semrush's interface is more intuitive—I can usually find what I need without consulting documentation. Ahrefs' keyword explorer is more powerful if you know what you're doing; it gives you more filtering options and better search intent data. Winner: Tie, depending on your skill level.</p>
<h3>Backlink Analysis</h3>
<p>This is where Ahrefs flexes. Their backlink database is simply larger and more accurate. If you're doing serious link building or competitive analysis, Ahrefs' data is worth the premium. Semrush's backlink data is solid, but it lags behind. Winner: Ahrefs, decisively.</p>
<h3>Content Marketing Tools</h3>
<p>Semrush has a more robust content marketing suite. Their SEO Writing Assistant is genuinely useful, and their content calendar integrates well with their other tools. Ahrefs has content marketing features, but they feel bolted-on. Winner: Semrush.</p>
<h3>Ease of Use</h3>
<p>Semrush has a gentler learning curve. Ahrefs' interface is powerful but dense. If you're new to SEO, Semrush will feel less overwhelming. Winner: Semrush.</p>
<h2>Pricing Reality Check</h2>
<p>Both platforms start at around $99/month for their entry-level plans. But here's where it gets interesting: Semrush's lower tiers are actually feature-rich. You can do real work on their Standard plan. Ahrefs' Lite plan feels a bit limited. If you're bootstrapped, Semrush gives you more bang for your buck at lower price points.</p>
<h2>The Verdict</h2>
<p>Choose Semrush if you're a generalist marketer, content creator, or small business owner who needs a Swiss Army knife. Choose Ahrefs if you're serious about link building, competitive analysis, or you're working at an agency where backlink data is critical. Many agencies use both—and honestly, if your budget allows, that's the smartest play.</p>`,
  },
  {
    id: "keyword-research-guide",
    title: "The Complete Guide to Keyword Research: From Beginner to Expert",
    excerpt: "Master keyword research with our comprehensive guide covering intent, strategy, and common mistakes that hold back rankings.",
    author: "David Kim",
    date: "2026-03-09",
    readTime: 18,
    category: "SEO Fundamentals",
    type: "guide",
    content: `<h2>Introduction</h2>
<p>Keyword research is the foundation of SEO. I know that sounds like a cliché—you've probably heard it a hundred times. But here's why it matters: if you're not targeting the right keywords, you're essentially building a house on sand. You can have the best content in the world, but if nobody's searching for it, it doesn't matter.</p>
<p>I've seen businesses spend months creating content around keywords that have zero commercial intent. I've also seen tiny blogs rank for six-figure search volume keywords because they understood their audience's actual search behavior. The difference? Keyword research.</p>
<h2>What Is Keyword Research, Really?</h2>
<p>At its core, keyword research is the process of understanding what your audience is searching for and why. It's not just about finding high-volume keywords—it's about finding keywords that align with your business goals and have actual search intent behind them.</p>
<p>Think of it this way: a keyword is a window into your customer's mind. When someone types "how to fix a leaky faucet," they're telling you something specific. They have a problem, they want to solve it, and they're looking for help. That's intent. That's gold.</p>`,
  },
  {
    id: "content-not-ranking",
    title: "Why Your Content Isn't Ranking: 7 SEO Mistakes You're Probably Making",
    excerpt: "Your content is great, but it's not ranking. We identify the 7 most common SEO mistakes and how to fix them.",
    author: "Marcus Thorne",
    date: "2026-03-08",
    readTime: 14,
    category: "SEO Fundamentals",
    type: "deep-dive",
    content: `<h2>Introduction</h2>
<p>You published that blog post. You optimized it. You promoted it. And... crickets. It's not ranking, traffic isn't coming, and you're wondering what the hell went wrong.</p>
<p>I've been there. I've also helped dozens of teams figure out why their content isn't performing. Usually, it's not one catastrophic mistake—it's a combination of small, fixable issues. Let's walk through the most common ones.</p>`,
  },
];

export default function Resource() {
  const [match, params] = useRoute("/resource/:id");
  const [showBackButton, setShowBackButton] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('hero-sidebar');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showCTAModal, setShowCTAModal] = useState(false);
  const [tooltipTemplate, setTooltipTemplate] = useState<TemplateType | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when article changes and assign random template
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedTemplate(getRandomTemplate());
  }, [params?.id]);

  if (!match) return null;

  const article = resourcesData.find((a) => a.id === params?.id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="container flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-slate-900">Clarity Engine</Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition">Home</Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">About</Link>
              <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">Tools</Link>
              <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition">Resources</Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">Contact</Link>
            </div>
          </div>
        </nav>

        <div className="container py-24 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Resource Not Found</h1>
          <p className="text-xl text-slate-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/resources">
            <Button>← Back to Resources</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">Clarity Engine</Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition">Home</Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">About</Link>
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">Tools</Link>
            <Link href="/resources" className="text-slate-600 hover:text-slate-900 transition">Resources</Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">Contact</Link>
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                onMouseEnter={() => setTooltipTemplate(selectedTemplate)}
                onMouseLeave={() => setTooltipTemplate(null)}
                className="flex items-center gap-2"
              >
                <Palette className="h-4 w-4" />
                Layout
              </Button>
              {/* Tooltip */}
              {tooltipTemplate && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none z-50 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-slate-900">
                  {TEMPLATE_METADATA[tooltipTemplate].name}: See how our solutions adapt
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-96 overflow-y-auto bg-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Choose Article Layout</h2>
                <button
                  onClick={() => setShowTemplateSelector(false)}
                  className="text-slate-500 hover:text-slate-700 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {(Object.entries(TEMPLATE_METADATA) as Array<[TemplateType, typeof TEMPLATE_METADATA[TemplateType]]>).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedTemplate(key);
                      setShowTemplateSelector(false);
                    }}
                    className={`p-4 rounded-lg border-2 text-left transition relative group ${
                      selectedTemplate === key
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-2xl mb-2">{template.icon}</div>
                        <h3 className="font-semibold text-slate-900">{template.name}</h3>
                        <p className="text-sm text-slate-600">{template.description}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTooltipTemplate(key);
                          setShowCTAModal(true);
                        }}
                        className="ml-2 text-slate-400 hover:text-blue-600 transition"
                        title="Learn more"
                      >
                        <Info className="h-5 w-5" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* CTA Modal */}
      {showCTAModal && tooltipTemplate && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{TEMPLATE_METADATA[tooltipTemplate].icon}</span>
                <h3 className="text-2xl font-bold text-slate-900">{TEMPLATE_METADATA[tooltipTemplate].name}</h3>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">{TEMPLATE_METADATA[tooltipTemplate].cta}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedTemplate(tooltipTemplate);
                    setShowCTAModal(false);
                    setShowTemplateSelector(false);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                  Try This Layout
                </button>
                <button
                  onClick={() => setShowCTAModal(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Sticky Back Button */}
      {showBackButton && (
        <div className="fixed bottom-8 right-8 z-40">
          <Link href="/resources">
            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Button>
          </Link>
        </div>
      )}

      {/* Author Byline */}
      <div className="container max-w-4xl mb-8">
        <AuthorByline 
          authorName={article.author}
          articleCategory={article.category}
          articleTitle={article.title}
        />
      </div>

      {/* Article Rendered with Selected Template */}
      <TemplateRenderer
        templateType={selectedTemplate}
        title={article.title}
        content={article.content}
        author={article.author}
        date={article.date}
        category={article.category}
        readTime={article.readTime}
        excerpt={article.excerpt}
      />

      {/* Contextual Affiliate Links Section */}
      <div className="container max-w-4xl py-12">
        <ContextualAffiliateLinks
          articleTitle={article.title}
          articleContent={article.content}
          articleId={article.id}
        />
      </div>

      {/* Newsletter Signup Section */}
      <div className="container max-w-4xl py-12">
        <NewsletterSignup 
          articleTitle={article.title} 
          articleCategory={article.category}
        />
      </div>

      {/* Comments Section */}
      <div className="container max-w-4xl py-16">
        <Separator className="my-12" />
        <h3 className="text-2xl font-bold text-slate-900 mb-8">Comments</h3>
        <CommentSection articleId={article.id} />
      </div>
    </div>
  );
}

function CommentSection({ articleId }: { articleId: string }) {
  const { isAuthenticated, user } = useAuth();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createCommentMutation = trpc.comments.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    setIsSubmitting(true);
    try {
      await createCommentMutation.mutateAsync({
        articleId: parseInt(articleId),
        userName: user?.name || "Anonymous",
        userEmail: user?.email || "noemail@example.com",
        content: comment,
      });
      setComment("");
      toast.success("Comment posted!");
    } catch (error) {
      toast.error("Failed to post comment");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {isAuthenticated ? `Comment as ${user?.name}` : "Sign in to comment"}
          </label>
          <Textarea
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!isAuthenticated || isSubmitting}
            className="min-h-24"
          />
        </div>
        <Button
          type="submit"
          disabled={!isAuthenticated || isSubmitting || !comment.trim()}
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full" />
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900">Sample Comment</h4>
              <p className="text-sm text-slate-600 mb-2">Great article! Very helpful insights.</p>
              <p className="text-xs text-slate-500">2 days ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
