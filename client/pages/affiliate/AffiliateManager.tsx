import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface AffiliateProgram {
  name: string;
  description: string;
  commissionRate: string;
  trackingLink: string;
  status: "active" | "pending" | "inactive";
  earnings: number;
}

const affiliatePrograms: AffiliateProgram[] = [
  {
    name: "Semrush",
    description: "All-in-one SEO platform with keyword research and site audits",
    commissionRate: "30% recurring",
    trackingLink: "https://semrush.com/?ref=clarity-engine",
    status: "active",
    earnings: 0,
  },
  {
    name: "Surfer SEO",
    description: "Content optimization and SERP analysis tool",
    commissionRate: "25% recurring",
    trackingLink: "https://surferseo.com/?ref=clarity-engine",
    status: "active",
    earnings: 0,
  },
  {
    name: "Jasper AI",
    description: "AI-powered content writing and copywriting assistant",
    commissionRate: "30% recurring",
    trackingLink: "https://jasper.ai/?ref=clarity-engine",
    status: "active",
    earnings: 0,
  },
  {
    name: "Ahrefs",
    description: "Comprehensive backlink analysis and competitor research",
    commissionRate: "20% recurring",
    trackingLink: "https://ahrefs.com/?ref=clarity-engine",
    status: "active",
    earnings: 0,
  },
];

export function AffiliateManager() {
  const [programs, setPrograms] = useState<AffiliateProgram[]>(affiliatePrograms);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const totalEarnings = programs.reduce((sum, p) => sum + p.earnings, 0);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Total Affiliate Earnings
          </h3>
          <p className="text-3xl font-bold text-green-600">${totalEarnings.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Active Programs
          </h3>
          <p className="text-3xl font-bold text-blue-600">{programs.length}</p>
          <p className="text-xs text-gray-500 mt-2">Generating revenue</p>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Affiliate Programs</h2>

        {programs.map((program) => (
          <Card key={program.name} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{program.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{program.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  program.status === "active"
                    ? "bg-green-100 text-green-800"
                    : program.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Commission Rate</p>
                <p className="text-lg font-semibold text-gray-900">
                  {program.commissionRate}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Earnings</p>
                <p className="text-lg font-semibold text-green-600">
                  ${program.earnings.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-xs text-gray-500 mb-2">Tracking Link</p>
              <div className="flex items-center gap-2">
                <code className="text-xs text-gray-700 flex-1 truncate">
                  {program.trackingLink}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(program.trackingLink)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open(program.trackingLink, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Program
              </Button>
              <Button size="sm" variant="outline">
                View Analytics
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Affiliate Tips</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Share tracking links in your Resources articles</li>
          <li>• Create comparison guides highlighting affiliate products</li>
          <li>• Add affiliate links to tool recommendation emails</li>
          <li>• Mention affiliate products in video tutorials</li>
          <li>• Track which channels drive the most conversions</li>
        </ul>
      </Card>
    </div>
  );
}
