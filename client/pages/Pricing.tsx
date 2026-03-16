import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { AdSenseVerification } from "@/components/AdSenseVerification";

const tiers = [
  {
    name: "Free",
    price: "0",
    description: "Get started with essential SEO tools",
    features: [
      "5 basic SEO tools",
      "Keyword research (limited)",
      "Content analysis",
      "Basic reports",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "29",
    description: "For growing businesses and freelancers",
    features: [
      "All Free features",
      "12 advanced SEO tools",
      "Unlimited keyword research",
      "Advanced content analysis",
      "API access",
      "Priority support",
      "Custom reports",
      "Team collaboration (up to 3 members)",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "99",
    description: "For agencies and large teams",
    features: [
      "All Pro features",
      "All 17 SEO tools",
      "Unlimited team members",
      "White-label reports",
      "Advanced API",
      "24/7 dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <>
      <AdSenseVerification />
      <PricingContent />
    </>
  );
}

function PricingContent() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // const checkoutMutation = trpc.stripe.createCheckoutSession.useMutation();

  const handleSubscribe = async (tier: "pro" | "enterprise") => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    setIsLoading(true);
    try {
      toast.info("Stripe checkout coming soon!");
      setIsLoading(false);
      return;
      
      // TODO: Wire up Stripe checkout
      const response = { url: null, sessionId: null };

      // if (response?.url) {
      //   window.location.href = response.url;
      // } else if (response?.sessionId) {
      //   window.location.href = `https://checkout.stripe.com/pay/${response.sessionId}`;
      // }
      // toast.success(`Redirecting to checkout for ${tier} tier...`);
    } catch (error) {
      toast.error("Failed to start checkout. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-slate-900">Clarity Engine</Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-600 hover:text-slate-900 transition">Home</Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900 transition">About</Link>
            <Link to="/tools" className="text-slate-600 hover:text-slate-900 transition">Tools</Link>
            <Link to="/resources" className="text-slate-600 hover:text-slate-900 transition">Resources</Link>
            <Link to="/contact" className="text-slate-600 hover:text-slate-900 transition">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="container py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your SEO needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative p-8 ${
                  tier.popular ? "ring-2 ring-blue-600 md:scale-105" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ${tier.price}
                    </span>
                    {tier.price !== "0" && (
                      <span className="text-gray-600">/month</span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (tier.name === "Free") {
                      window.location.href = "/tools";
                    } else if (tier.name === "Pro") {
                      handleSubscribe("pro");
                    } else {
                      handleSubscribe("enterprise");
                    }
                  }}
                  disabled={isLoading}
                  className={`w-full mb-8 ${
                    tier.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  {isLoading ? "Processing..." : tier.cta}
                </Button>

                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Questions about pricing?
            </h2>
            <p className="text-gray-600 mb-6">
              Contact our sales team for custom enterprise solutions and volume
              discounts.
            </p>
            <Button
              onClick={() => (window.location.href = "/contact")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
  );
}
