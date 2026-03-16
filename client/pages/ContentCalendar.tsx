import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Eye, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ScheduledContent {
  id: number;
  title: string;
  date: Date;
  status: "draft" | "scheduled" | "published";
  type: "article" | "social" | "email" | "video";
  color: string;
}

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [scheduledContent] = useState<ScheduledContent[]>([
    {
      id: 1,
      title: "SEO Audit Guide",
      date: new Date(2026, 2, 15),
      status: "scheduled",
      type: "article",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Keyword Research Tips",
      date: new Date(2026, 2, 18),
      status: "draft",
      type: "article",
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Link Building Strategy",
      date: new Date(2026, 2, 22),
      status: "scheduled",
      type: "social",
      color: "bg-green-500",
    },
  ]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthDays = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= monthDays; i++) {
    days.push(i);
  }

  const getContentForDate = (day: number) => {
    if (!day) return [];
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return scheduledContent.filter(
      (content) =>
        content.date.getDate() === day &&
        content.date.getMonth() === currentDate.getMonth() &&
        content.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
                <Calendar className="w-10 h-10 text-primary" />
                Content Calendar
              </h1>
              <p className="text-foreground/60 mt-2">Plan and schedule your content</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Schedule Content
            </Button>
          </div>

          {/* View Mode Selector */}
          <div className="flex gap-2">
            {(["month", "week", "day"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground/60 hover:bg-muted/80"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <Card className="p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
                )
              }
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-foreground">
              {monthName} {year}
            </h2>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
                )
              }
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-foreground/60 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, idx) => (
              <div
                key={idx}
                className={`min-h-24 p-2 rounded-lg border border-border transition-colors ${
                  day
                    ? "bg-card hover:bg-muted cursor-pointer"
                    : "bg-muted/30"
                }`}
              >
                {day && (
                  <>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {day}
                    </p>
                    <div className="space-y-1">
                      {getContentForDate(day).map((content) => (
                        <div
                          key={content.id}
                          className={`${content.color} text-white text-xs p-1 rounded truncate hover:opacity-80 transition-opacity cursor-pointer`}
                          title={content.title}
                        >
                          {content.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Scheduled Content List */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Upcoming Content
          </h3>
          <div className="space-y-2">
            {scheduledContent
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((content) => (
                <Card
                  key={content.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${content.color} w-3 h-3 rounded-full`} />
                    <div>
                      <p className="font-semibold text-foreground">
                        {content.title}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {content.date.toLocaleDateString()} •{" "}
                        <span className="capitalize">{content.type}</span> •{" "}
                        <span
                          className={
                            content.status === "published"
                              ? "text-green-600"
                              : content.status === "scheduled"
                              ? "text-blue-600"
                              : "text-yellow-600"
                          }
                        >
                          {content.status.charAt(0).toUpperCase() +
                            content.status.slice(1)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-foreground/60" />
                    </button>
                    <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: "Total Scheduled", value: "12", color: "bg-blue-500" },
            { label: "Published", value: "8", color: "bg-green-500" },
            { label: "Drafts", value: "3", color: "bg-yellow-500" },
            { label: "This Month", value: "5", color: "bg-purple-500" },
          ].map((stat) => (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`${stat.color} w-3 h-3 rounded-full`} />
                <div>
                  <p className="text-sm text-foreground/60">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
