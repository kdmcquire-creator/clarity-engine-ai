import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  BarChart3,
  Link2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Competitor {
  id: number;
  name: string;
  website: string;
  totalKeywords: number;
  averageRank: number;
  averageVolume: number;
  topKeywords: string[];
  trend: "up" | "down" | "stable";
  backlinks: number;
}

export default function CompetitorTracker() {
  const [competitors] = useState<Competitor[]>([
    {
      id: 1,
      name: "Semrush",
      website: "semrush.com",
      totalKeywords: 2847,
      averageRank: 4.2,
      averageVolume: 1250,
      topKeywords: ["SEO tools", "keyword research", "competitor analysis"],
      trend: "up",
      backlinks: 45230,
    },
    {
      id: 2,
      name: "Ahrefs",
      website: "ahrefs.com",
      totalKeywords: 3124,
      averageRank: 3.8,
      averageVolume: 1450,
      topKeywords: ["backlink checker", "SEO tools", "content gap"],
      trend: "up",
      backlinks: 52100,
    },
    {
      id: 3,
      name: "Moz",
      website: "moz.com",
      totalKeywords: 1956,
      averageRank: 5.1,
      averageVolume: 890,
      topKeywords: ["domain authority", "SEO", "link building"],
      trend: "down",
      backlinks: 38450,
    },
  ]);

  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(
    competitors[0]
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
                <BarChart3 className="w-10 h-10 text-primary" />
                Competitor Tracker
              </h1>
              <p className="text-foreground/60 mt-2">
                Monitor competitor rankings and strategy
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Competitor
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Competitor List */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Your Competitors
              </h2>
              <div className="space-y-2">
                {competitors.map((competitor) => (
                  <button
                    key={competitor.id}
                    onClick={() => setSelectedCompetitor(competitor)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCompetitor?.id === competitor.id
                        ? "bg-primary/10 border border-primary"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <p className="font-semibold text-foreground">
                      {competitor.name}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {competitor.website}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-background px-2 py-1 rounded">
                        {competitor.totalKeywords} keywords
                      </span>
                      <div
                        className={`flex items-center gap-1 text-xs ${
                          competitor.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {competitor.trend === "up" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {competitor.averageRank.toFixed(1)} avg rank
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Competitor Details */}
          <div className="lg:col-span-2">
            {selectedCompetitor && (
              <div className="space-y-6">
                {/* Overview Stats */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {selectedCompetitor.name}
                      </h2>
                      <a
                        href={`https://${selectedCompetitor.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 mt-1"
                      >
                        <Globe className="w-4 h-4" />
                        {selectedCompetitor.website}
                      </a>
                    </div>
                    <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        label: "Total Keywords",
                        value: selectedCompetitor.totalKeywords,
                      },
                      {
                        label: "Avg Rank",
                        value: selectedCompetitor.averageRank.toFixed(1),
                      },
                      {
                        label: "Avg Volume",
                        value: selectedCompetitor.averageVolume.toLocaleString(),
                      },
                      {
                        label: "Backlinks",
                        value: selectedCompetitor.backlinks.toLocaleString(),
                      },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-muted p-3 rounded-lg"
                      >
                        <p className="text-xs text-foreground/60 mb-1">
                          {metric.label}
                        </p>
                        <p className="text-xl font-bold text-foreground">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Top Keywords */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Top Keywords by Volume
                  </h3>
                  <div className="space-y-3">
                    {selectedCompetitor.topKeywords.map((keyword, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-foreground/60">
                            #{idx + 1}
                          </span>
                          <p className="font-medium text-foreground">
                            {keyword}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-background px-2 py-1 rounded">
                            Vol: 2.4K
                          </span>
                          <span className="text-xs bg-background px-2 py-1 rounded">
                            Rank: 3
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Backlink Analysis */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-primary" />
                    Backlink Analysis
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: "Total Backlinks",
                        value: selectedCompetitor.backlinks.toLocaleString(),
                      },
                      { label: "Referring Domains", value: "1,245" },
                      { label: "Dofollow Links", value: "38,450" },
                      { label: "Authority Score", value: "87/100" },
                    ].map((item) => (
                      <div key={item.label} className="bg-muted p-4 rounded-lg">
                        <p className="text-xs text-foreground/60 mb-1">
                          {item.label}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Ranking Trend Chart */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Ranking Trend (Last 90 Days)
                  </h3>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-foreground/20 mx-auto mb-2" />
                      <p className="text-foreground/60">
                        Chart visualization would render here
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
