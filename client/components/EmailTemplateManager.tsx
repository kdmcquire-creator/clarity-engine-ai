import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Send, Eye } from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description: string;
  trigger: string;
  status: "active" | "draft" | "inactive";
  preview: string;
}

const emailTemplates: EmailTemplate[] = [
  {
    id: "welcome",
    name: "Welcome Email",
    subject: "Welcome to Clarity Engine! 🚀",
    description: "Sent immediately after user signup",
    trigger: "User signup",
    status: "active",
    preview: `Hi {{firstName}},

Welcome to Clarity Engine! We're excited to have you on board.

You now have access to our suite of 17 powerful SEO tools. Here's what you can do:

1. Explore our Tools - Start with Keyword Research or Content Analysis
2. Read our Resources - Learn best practices from our expert guides
3. Earn Certifications - Complete courses and showcase your SEO expertise

Get started: {{appUrl}}/tools

Questions? Reply to this email or visit {{appUrl}}/contact

Best regards,
The Clarity Engine Team`,
  },
  {
    id: "weekly-tips",
    name: "Weekly SEO Tips",
    subject: "Your Weekly SEO Tip from Clarity Engine 💡",
    description: "Sent every Monday morning to active users",
    trigger: "Weekly schedule (Mondays 8am)",
    status: "active",
    preview: `Hi {{firstName}},

This week's SEO tip: {{weeklyTip}}

Pro tip: {{proTip}}

Try it with our {{toolName}} tool: {{toolUrl}}

Happy optimizing!
Clarity Engine Team`,
  },
  {
    id: "upgrade-prompt",
    name: "Upgrade Prompt",
    subject: "Unlock Advanced Features - Pro Plan Now Available",
    description: "Sent to free users after 7 days of inactivity",
    trigger: "7 days after signup (if no paid conversion)",
    status: "active",
    preview: `Hi {{firstName}},

You've been using Clarity Engine for a week! Here's what you're missing with a Pro upgrade:

✨ Advanced Features:
- Unlimited keyword research
- Advanced content analysis
- API access for integrations
- Priority support
- Team collaboration (up to 3 members)

Upgrade now: {{appUrl}}/pricing

Questions? We're here to help: {{supportEmail}}

Best,
Clarity Engine Team`,
  },
  {
    id: "abandoned-checkout",
    name: "Abandoned Checkout Recovery",
    subject: "Complete Your Purchase - {{discount}}% Off Inside",
    description: "Sent 1 hour after user leaves checkout page",
    trigger: "Abandoned checkout (1 hour delay)",
    status: "draft",
    preview: `Hi {{firstName}},

We noticed you started upgrading to {{tierName}} but didn't complete the purchase.

No worries! Here's {{discount}}% off just for you:
Coupon: {{couponCode}}

Complete your purchase: {{checkoutUrl}}

Questions about features? Check our FAQ: {{faqUrl}}

Best,
Clarity Engine Team`,
  },
  {
    id: "certification-complete",
    name: "Certification Completion",
    subject: "🎉 Congratulations! You've Earned {{certName}} Badge",
    description: "Sent when user completes a certification",
    trigger: "Certification completion",
    status: "active",
    preview: `Hi {{firstName}},

Congratulations! You've successfully completed the {{certName}} certification!

Your achievement:
📜 Certificate: {{certName}}
🏆 Badge: {{badgeUrl}}
📊 Score: {{score}}%

Share your achievement:
- LinkedIn: {{linkedinShareUrl}}
- Twitter: {{twitterShareUrl}}

Next steps: Explore our {{nextCert}} certification

Proud of you!
Clarity Engine Team`,
  },
];

export function EmailTemplateManager() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [templates, setTemplates] = useState<EmailTemplate[]>(emailTemplates);

  const toggleStatus = (id: string) => {
    setTemplates(
      templates.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "active" ? "inactive" : "active",
            }
          : t
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Active Templates</h3>
          <p className="text-3xl font-bold text-blue-600">
            {templates.filter((t) => t.status === "active").length}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Draft Templates</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {templates.filter((t) => t.status === "draft").length}
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Templates</h3>
          <p className="text-3xl font-bold text-gray-900">{templates.length}</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Email Templates</h2>

          {templates.map((template) => (
            <Card
              key={template.id}
              className={`p-4 cursor-pointer transition ${
                selectedTemplate?.id === template.id
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    template.status === "active"
                      ? "bg-green-100 text-green-800"
                      : template.status === "draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {template.status}
                </span>
              </div>
              <p className="text-xs text-gray-600">Trigger: {template.trigger}</p>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {selectedTemplate.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={selectedTemplate.subject}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Trigger
                  </label>
                  <p className="text-sm text-gray-600">{selectedTemplate.trigger}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap font-mono max-h-64 overflow-y-auto">
                    {selectedTemplate.preview}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Eye className="w-4 h-4 mr-2" />
                    Edit Template
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toggleStatus(selectedTemplate.id)}
                  >
                    {selectedTemplate.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => {}}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Test Email
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">📧 Email Best Practices</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Use personalization variables like firstName and tierName</li>
          <li>• Keep subject lines under 50 characters for mobile</li>
          <li>• Include clear CTAs (Call-To-Action buttons)</li>
          <li>• Test emails before sending to full list</li>
          <li>• Monitor open rates and click-through rates</li>
          <li>• Respect unsubscribe preferences</li>
        </ul>
      </Card>
    </div>
  );
}
