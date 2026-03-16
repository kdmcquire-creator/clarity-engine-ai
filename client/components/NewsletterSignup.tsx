import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface NewsletterSignupProps {
  articleTitle?: string;
  articleCategory?: string;
}

export function NewsletterSignup({ articleTitle, articleCategory }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const subscriptionMutation = trpc.newsletter.subscribe.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await subscriptionMutation.mutateAsync({
        email: email.trim(),
      });

      setIsSuccess(true);
      setEmail("");
      toast.success("Welcome! Check your email for the free SEO audit template.");

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

      toast.success("Welcome! Check your email for exclusive SEO tips.");
    } catch (error: any) {
      if (error?.data?.code === "CONFLICT") {
        toast.error("This email is already subscribed");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 overflow-hidden">
      <div className="p-8 md:p-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600">
              <Mail className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Get Weekly SEO Insights
            </h3>
            <p className="text-slate-700 mb-4">
              Join 10,000+ marketers getting actionable SEO strategies delivered to their inbox every week. Plus, get instant access to our free SEO audit template.
            </p>

            {/* Incentive Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-blue-200">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-slate-700">Free SEO Audit Template</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-blue-200">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-slate-700">Weekly Strategies</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-blue-200">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-slate-700">Unsubscribe Anytime</span>
              </div>
            </div>

            {/* Signup Form */}
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-white border-slate-300 placeholder:text-slate-500"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 whitespace-nowrap"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900">Subscription confirmed!</p>
                  <p className="text-sm text-green-700">Check your email for your free SEO audit template.</p>
                </div>
              </div>
            )}

            {/* Privacy Notice */}
            <p className="text-xs text-slate-600 mt-4">
              We respect your privacy. Unsubscribe at any time. By subscribing, you agree to our{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
