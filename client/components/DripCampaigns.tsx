import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Edit2, Trash2, Play, Pause } from "lucide-react";

interface DripCampaign {
  id: string;
  name: string;
  description: string;
  status: "draft" | "active" | "paused" | "completed";
  emailCount: number;
  subscribers: number;
  createdAt: string;
  startDate?: string;
}

export default function DripCampaigns() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [campaigns, setCampaigns] = useState<DripCampaign[]>([
    {
      id: "1",
      name: "Onboarding Series",
      description: "Welcome sequence for new users",
      status: "active",
      emailCount: 5,
      subscribers: 342,
      createdAt: "2026-03-01",
      startDate: "2026-03-01",
    },
    {
      id: "2",
      name: "Re-engagement Campaign",
      description: "Win back inactive users",
      status: "draft",
      emailCount: 3,
      subscribers: 0,
      createdAt: "2026-03-10",
    },
    {
      id: "3",
      name: "Abandoned Checkout",
      description: "Recover lost sales",
      status: "paused",
      emailCount: 2,
      subscribers: 156,
      createdAt: "2026-02-15",
      startDate: "2026-02-20",
    },
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    emailCount: "3",
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (!user || user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Admin access required</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const handleCreateCampaign = () => {
    if (newCampaign.name && newCampaign.description) {
      const campaign: DripCampaign = {
        id: Date.now().toString(),
        name: newCampaign.name,
        description: newCampaign.description,
        status: "draft",
        emailCount: parseInt(newCampaign.emailCount),
        subscribers: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCampaigns([...campaigns, campaign]);
      setNewCampaign({ name: "", description: "", emailCount: "3" });
      setShowNewCampaign(false);
    }
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  const handleToggleCampaign = (id: string, currentStatus: string) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === id
          ? { ...c, status: currentStatus === "active" ? "paused" : "active" }
          : c
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Drip Campaigns</h1>
              <p className="text-muted-foreground">Create and manage automated email sequences</p>
            </div>
            <Button onClick={() => setShowNewCampaign(!showNewCampaign)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* New Campaign Form */}
        {showNewCampaign && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Create New Drip Campaign</CardTitle>
              <CardDescription>Set up an automated email sequence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Campaign Name</label>
                <Input
                  placeholder="e.g., Onboarding Series"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe the purpose of this campaign"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Number of Emails</label>
                <Select value={newCampaign.emailCount} onValueChange={(value) => setNewCampaign({ ...newCampaign, emailCount: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Email</SelectItem>
                    <SelectItem value="2">2 Emails</SelectItem>
                    <SelectItem value="3">3 Emails</SelectItem>
                    <SelectItem value="5">5 Emails</SelectItem>
                    <SelectItem value="7">7 Emails</SelectItem>
                    <SelectItem value="10">10 Emails</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>Create Campaign</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Campaigns List */}
        <div className="space-y-4">
          {campaigns.length === 0 ? (
            <Card>
              <CardContent className="pt-12 text-center">
                <p className="text-muted-foreground mb-4">No campaigns yet</p>
                <Button onClick={() => setShowNewCampaign(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create First Campaign
                </Button>
              </CardContent>
            </Card>
          ) : (
            campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{campaign.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusBadge(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{campaign.description}</p>
                      <div className="flex gap-6 text-sm">
                        <div>
                          <span className="text-muted-foreground">Emails: </span>
                          <span className="font-medium">{campaign.emailCount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Active Subscribers: </span>
                          <span className="font-medium">{campaign.subscribers}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Created: </span>
                          <span className="font-medium">{campaign.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleCampaign(campaign.id, campaign.status)}
                        className="gap-1"
                      >
                        {campaign.status === "active" ? (
                          <>
                            <Pause className="w-4 h-4" />
                            Pause
                          </>
                        ) : campaign.status === "draft" ? (
                          <>
                            <Play className="w-4 h-4" />
                            Launch
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Resume
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteCampaign(campaign.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Info Box */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base">How Drip Campaigns Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Drip campaigns</strong> automatically send a series of emails to subscribers based on triggers and timing.
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Set up email sequences with custom delays between messages</li>
              <li>Trigger campaigns based on user actions (signup, purchase, etc.)</li>
              <li>Personalize emails with subscriber data</li>
              <li>Track opens, clicks, and conversions</li>
              <li>Pause or resume campaigns anytime</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
