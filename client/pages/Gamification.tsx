import React, { useState } from "react";
import { Trophy, Zap, Star, Award, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BADGES = [
  { id: "first-post", name: "First Post", icon: "📝", description: "Posted your first forum discussion" },
  { id: "helpful", name: "Helpful Contributor", icon: "🤝", description: "Received 10+ upvotes on replies" },
  { id: "expert", name: "Expert", icon: "🏆", description: "Provided 5 marked solutions" },
  { id: "streak", name: "On Fire", icon: "🔥", description: "Active 7 days in a row" },
  { id: "mentor", name: "Mentor", icon: "👨‍🏫", description: "Helped 20+ community members" },
  { id: "innovator", name: "Innovator", icon: "💡", description: "Shared 3 case studies" },
];

const LEADERBOARD = [
  {
    rank: 1,
    name: "David Kim",
    points: 2450,
    level: "Master",
    badges: ["expert", "mentor", "streak"],
    postsCreated: 45,
    repliesCreated: 156,
  },
  {
    rank: 2,
    name: "Sarah Chen",
    points: 1890,
    level: "Expert",
    badges: ["helpful", "expert", "innovator"],
    postsCreated: 32,
    repliesCreated: 98,
  },
  {
    rank: 3,
    name: "James Rodriguez",
    points: 1650,
    level: "Expert",
    badges: ["helpful", "mentor"],
    postsCreated: 28,
    repliesCreated: 87,
  },
  {
    rank: 4,
    name: "Lisa Wang",
    points: 1420,
    level: "Contributor",
    badges: ["helpful", "streak"],
    postsCreated: 22,
    repliesCreated: 65,
  },
  {
    rank: 5,
    name: "Marcus Thorne",
    points: 1210,
    level: "Contributor",
    badges: ["first-post", "helpful"],
    postsCreated: 18,
    repliesCreated: 54,
  },
];

export default function Gamification() {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-wider">Achievements</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Earn Badges & Climb the Leaderboard</h1>
          <p className="text-xl text-white/90">
            Engage with the community, help others, and unlock exclusive badges
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Your Progress */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-primary/10 to-secondary/10">
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">1,240</p>
              <p className="text-foreground/60">Points</p>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "62%" }}></div>
              </div>
              <p className="text-xs text-foreground/50 mt-2">620 to next level</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-500 mb-2">12</p>
              <p className="text-foreground/60">Badges</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-500 mb-2">Expert</p>
              <p className="text-foreground/60">Current Level</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-500 mb-2">#8</p>
              <p className="text-foreground/60">Leaderboard Rank</p>
            </div>
          </div>
        </Card>

        {/* Badges Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BADGES.map((badge) => (
              <button
                key={badge.id}
                onClick={() => setSelectedBadge(selectedBadge === badge.id ? null : badge.id)}
                className={`p-6 rounded-lg transition-all text-center ${
                  selectedBadge === badge.id
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-card hover:bg-muted"
                }`}
              >
                <p className="text-4xl mb-3">{badge.icon}</p>
                <p className="font-bold text-foreground mb-1">{badge.name}</p>
                <p className={`text-xs ${selectedBadge === badge.id ? "text-white/80" : "text-foreground/60"}`}>
                  {badge.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Global Leaderboard</h2>
          <div className="space-y-3">
            {LEADERBOARD.map((member) => (
              <Card key={member.rank} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="text-center min-w-fit">
                    <p className="text-2xl font-bold text-primary">{member.rank}</p>
                    <p className="text-xs text-foreground/50">Rank</p>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-foreground/60 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold">
                        {member.level}
                      </span>
                      <span>📝 {member.postsCreated} posts</span>
                      <span>💬 {member.repliesCreated} replies</span>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 flex-wrap">
                      {member.badges.map((badgeId) => {
                        const badge = BADGES.find((b) => b.id === badgeId);
                        return (
                          <span key={badgeId} className="text-lg" title={badge?.name}>
                            {badge?.icon}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{member.points}</p>
                    <p className="text-xs text-foreground/50">points</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Join the Competition?</h3>
          <p className="text-foreground/60 mb-6">
            Start contributing to the community and earn badges, points, and recognition
          </p>
          <Button size="lg">Go to Community Forum</Button>
        </div>
      </div>
    </div>
  );
}
