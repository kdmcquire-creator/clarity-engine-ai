import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { MessageCircle, Calendar, User, Share2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const { user, isAuthenticated } = useAuth();
  const [commentContent, setCommentContent] = useState("");
  const [commentName, setCommentName] = useState(user?.name || "");
  const [commentEmail, setCommentEmail] = useState(user?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch article
  const articleQuery = trpc.articles.getBySlug.useQuery({ slug: slug || "" }, {
    enabled: !!slug,
  });

  // Fetch comments
  const commentsQuery = trpc.comments.getByArticleId.useQuery(
    { articleId: articleQuery.data?.id || 0 },
    { enabled: !!articleQuery.data?.id }
  );

  // Create comment mutation
  const createCommentMutation = trpc.comments.create.useMutation();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!articleQuery.data) {
      toast.error("Article not found");
      return;
    }

    if (!commentContent.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    if (!commentName.trim() || !commentEmail.trim()) {
      toast.error("Please enter your name and email");
      return;
    }

    setIsSubmitting(true);
    try {
      await createCommentMutation.mutateAsync({
        articleId: articleQuery.data.id,
        userName: commentName,
        userEmail: commentEmail,
        content: commentContent,
      });

      toast.success("Comment submitted successfully!");
      setCommentContent("");
      
      // Refetch comments
      await commentsQuery.refetch();
    } catch (error) {
      toast.error("Failed to submit comment");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (articleQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-slate-600">Loading article...</div>
      </div>
    );
  }

  if (!articleQuery.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
          <div className="container flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-slate-900">Clarity Engine</Link>
          </div>
        </nav>
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <Link href="/">
            <Button>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const article = articleQuery.data;
  const approvedComments = (commentsQuery.data || []).filter(c => c.approved);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-slate-900">Clarity Engine</Link>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-slate-600 hover:text-slate-900 transition">Tools</Link>
            <Link href="/about" className="text-slate-600 hover:text-slate-900 transition">About</Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="container py-16">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </button>
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Recently"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{approvedComments.length} comments</span>
              </div>
            </div>

            {article.excerpt && (
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {article.excerpt}
              </p>
            )}
          </header>

          {/* Article Body */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            {article.content ? (
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {article.content}
              </div>
            ) : (
              <p className="text-slate-600">Full article content coming soon.</p>
            )}
          </div>

          <Separator className="my-12" />

          {/* Author Bio */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{article.authorName || "Editorial Team"}</h3>
                <p className="text-slate-600">Expert contributor to Clarity Engine, specializing in SEO strategy and content optimization.</p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Comments ({approvedComments.length})</h2>

            {/* Comment Form */}
            <Card className="p-8 mb-12 bg-white border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Leave a Comment</h3>

              {!isAuthenticated && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-900 mb-3">
                    <strong>Pro Tip:</strong> Sign in with your social account to have your comment approved instantly!
                  </p>
                  <div className="flex gap-3">
                    <Button asChild variant="outline" size="sm">
                      <a href={getLoginUrl()}>
                        Sign in with Google
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmitComment} className="space-y-6">
                {!isAuthenticated && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">Name</label>
                        <Input
                          type="text"
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
                        <Input
                          type="email"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Comment</label>
                  <Textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Share your thoughts..."
                    rows={5}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting || createCommentMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting || createCommentMutation.isPending ? "Posting..." : "Post Comment"}
                </Button>

                {!isAuthenticated && (
                  <p className="text-xs text-slate-500">
                    Comments from unauthenticated users will be moderated before appearing.
                  </p>
                )}
              </form>
            </Card>

            {/* Comments List */}
            <div className="space-y-6">
              {approvedComments.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                  <MessageCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                approvedComments.map((comment) => (
                  <Card key={comment.id} className="p-6 bg-white border-slate-200 hover:shadow-md transition">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-slate-900">{comment.userName}</h4>
                          <span className="text-xs text-slate-500">
                            {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Recently"}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-16">
        <div className="container text-center">
          <p>&copy; 2025 Clarity Engine. All rights reserved. Built by a team of SEO experts.</p>
        </div>
      </footer>
    </div>
  );
}
