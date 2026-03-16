import React, { useState } from "react";
import { MessageSquare, TrendingUp, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  { id: "general", label: "General Discussion", icon: "💬", color: "from-blue-500 to-cyan-500" },
  { id: "tools", label: "Tool Tips & Tricks", icon: "🛠️", color: "from-purple-500 to-pink-500" },
  { id: "strategies", label: "SEO Strategies", icon: "📊", color: "from-green-500 to-emerald-500" },
  { id: "case-studies", label: "Case Studies", icon: "📈", color: "from-orange-500 to-red-500" },
];

const SAMPLE_POSTS = [
  {
    id: 1,
    title: "How to use the Keyword Research tool for long-tail keywords",
    author: "Sarah Chen",
    category: "tools",
    views: 342,
    replies: 12,
    isPinned: true,
    isAnswered: true,
  },
  {
    id: 2,
    title: "Best practices for content optimization in 2026",
    author: "Marcus Thorne",
    category: "strategies",
    views: 289,
    replies: 8,
    isPinned: false,
    isAnswered: true,
  },
  {
    id: 3,
    title: "Increased traffic by 300% using competitor analysis",
    author: "Eleanor Vance",
    category: "case-studies",
    views: 567,
    replies: 23,
    isPinned: false,
    isAnswered: false,
  },
];

const LEADERBOARD = [
  { rank: 1, name: "David Kim", points: 2450, badge: "🏆 Expert" },
  { rank: 2, name: "Sarah Chen", points: 1890, badge: "⭐ Contributor" },
  { rank: 3, name: "James Rodriguez", points: 1650, badge: "⭐ Contributor" },
  { rank: 4, name: "Lisa Wang", points: 1420, badge: "👤 Active Member" },
  { rank: 5, name: "Marcus Thorne", points: 1210, badge: "👤 Active Member" },
];

export default function CommunityForum() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-wider">Community</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Join Our Expert Community</h1>
          <p className="text-xl text-white/90">
            Connect with thousands of SEO professionals, share strategies, and grow together
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold text-foreground mb-2">12,500+</p>
            <p className="text-foreground/60">Active Members</p>
          </Card>
          <Card className="p-6 text-center">
            <MessageSquare className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-foreground mb-2">45,000+</p>
            <p className="text-foreground/60">Forum Posts</p>
          </Card>
          <Card className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-foreground mb-2">98%</p>
            <p className="text-foreground/60">Questions Answered</p>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-6"
          />

          {/* Category Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <p className="font-semibold text-sm">{category.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forum Posts */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Recent Discussions</h2>
              <Button>Start New Discussion</Button>
            </div>

            <div className="space-y-4">
              {SAMPLE_POSTS.map((post) => (
                <Card key={post.id} className="p-6 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        {post.isPinned && <span className="text-lg">📌</span>}
                        {post.isAnswered && <span className="text-lg">✅</span>}
                        <h3 className="text-lg font-bold text-foreground flex-1">{post.title}</h3>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">
                        by <span className="font-semibold">{post.author}</span>
                      </p>
                      <div className="flex gap-6 text-sm text-foreground/50">
                        <span>👁️ {post.views} views</span>
                        <span>💬 {post.replies} replies</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Top Contributors</h3>
              </div>

              <div className="space-y-3">
                {LEADERBOARD.map((member) => (
                  <div key={member.rank} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">{member.name}</p>
                      <p className="text-xs text-foreground/50">{member.badge}</p>
                    </div>
                    <p className="font-bold text-primary">{member.points}</p>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6">
                View Full Leaderboard
              </Button>
            </Card>

            {/* Community Guidelines */}
            <Card className="p-6 bg-muted/50">
              <h3 className="font-bold text-foreground mb-3">Community Guidelines</h3>
              <ul className="text-sm text-foreground/60 space-y-2">
                <li>✓ Be respectful and professional</li>
                <li>✓ Search before posting</li>
                <li>✓ Share knowledge freely</li>
                <li>✓ Help others succeed</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
