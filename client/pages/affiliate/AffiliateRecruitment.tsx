import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DollarSign, Users, TrendingUp, Award, CheckCircle, ArrowRight } from "lucide-react";

export default function AffiliateRecruitment() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In production, would call trpc.affiliateProgram.applyToProgram
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setEmail("");
      setCompanyName("");
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Up to 20% Commission",
      description: "Competitive commission rates that increase with performance",
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Access to affiliate managers and marketing resources",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Track clicks, conversions, and earnings in real-time",
    },
    {
      icon: Award,
      title: "Exclusive Rewards",
      description: "Bonus payouts and incentives for top performers",
    },
  ];

  const tiers = [
    {
      name: "Standard",
      commission: "10%",
      requirements: "No minimum",
      features: [
        "10% commission on all referrals",
        "Monthly payouts",
        "Marketing materials",
        "Email support",
      ],
    },
    {
      name: "Professional",
      commission: "15%",
      requirements: "50+ conversions/month",
      features: [
        "15% commission on all referrals",
        "Weekly payouts",
        "Premium marketing materials",
        "Priority support",
        "Dedicated account manager",
      ],
      highlighted: true,
    },
    {
      name: "Elite",
      commission: "20%",
      requirements: "200+ conversions/month",
      features: [
        "20% commission on all referrals",
        "Bi-weekly payouts",
        "Custom marketing materials",
        "24/7 support",
        "Dedicated account manager",
        "Exclusive bonuses",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Become a Clarity Engine Affiliate</h1>
          <p className="text-xl opacity-90 mb-8">
            Earn recurring commissions by promoting the best free SEO tools on the web
          </p>
          <div className="flex gap-4 justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold">10-20%</p>
              <p className="text-sm opacity-75">Commission Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">$0</p>
              <p className="text-sm opacity-75">Minimum Payout</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">30 Days</p>
              <p className="text-sm opacity-75">Cookie Duration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Join Our Program?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <Icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Commission Tiers */}
      <div className="bg-white py-20 border-t border-gray-200">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Commission Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <Card
                key={index}
                className={`p-8 transition-all ${
                  tier.highlighted ? "ring-2 ring-blue-600 shadow-xl scale-105" : "hover:shadow-lg"
                }`}
              >
                {tier.highlighted && (
                  <div className="bg-blue-600 text-white text-center py-2 px-4 rounded-lg mb-4 text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">{tier.commission}</p>
                <p className="text-sm text-gray-600 mb-6">{tier.requirements}</p>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="container max-w-2xl mx-auto px-4 py-20">
        <Card className="p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join the Program</h2>
          <p className="text-gray-600 mb-8">
            Apply now and start earning. We'll review your application within 48 hours.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-600 mb-4">
                Thank you for applying to the Clarity Engine Affiliate Program. We'll review your
                application and get back to you within 48 hours.
              </p>
              <p className="text-sm text-gray-500">Check your email for updates</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Company Name</label>
                <Input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your Company"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  By applying, you agree to our{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Affiliate Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !email || !companyName}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Submitting..." : "Apply Now"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          )}
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20 border-t border-gray-200">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How do I get paid?",
                a: "We offer monthly payouts via Stripe, bank transfer, or PayPal. Minimum payout is $50.",
              },
              {
                q: "How long is the cookie duration?",
                a: "Our affiliate cookies last for 30 days. If a user converts within 30 days of clicking your link, you'll earn the commission.",
              },
              {
                q: "Can I use paid advertising?",
                a: "Yes, but you cannot bid on branded keywords (Clarity Engine, etc.). All other advertising channels are allowed.",
              },
              {
                q: "What marketing materials are available?",
                a: "We provide banners, email templates, social media content, and detailed guides. Premium materials are available for Professional and Elite tiers.",
              },
              {
                q: "How are commissions calculated?",
                a: "Commissions are calculated based on the subscription value of referred customers. Your tier determines your commission percentage.",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join hundreds of affiliates already promoting Clarity Engine
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
