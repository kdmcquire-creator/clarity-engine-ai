import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { analyticsEvents } from "../../drizzle/schema";
import { eq, and, gte } from "drizzle-orm";

export const analyticsRouter = router({
  // Track event
  trackEvent: protectedProcedure
    .input(z.object({
      eventType: z.string(),
      eventData: z.record(z.string(), z.any()).optional(),
      briefId: z.number().optional(),
      toolName: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(analyticsEvents).values({
        userId: ctx.user.id,
        eventType: input.eventType,
        eventData: input.eventData ? JSON.stringify(input.eventData) : null,
        briefId: input.briefId,
        toolName: input.toolName,
      });

      return { success: true };
    }),

  // Get user analytics summary
  getAnalyticsSummary: protectedProcedure
    .input(z.object({
      days: z.number().default(30),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - input.days);

      const events = await db
        .select()
        .from(analyticsEvents)
        .where(
          and(
            eq(analyticsEvents.userId, ctx.user.id),
            gte(analyticsEvents.createdAt, startDate)
          )
        );

      // Aggregate data
      const eventCounts: Record<string, number> = {};
      const toolUsage: Record<string, number> = {};
      
      events.forEach(event => {
        eventCounts[event.eventType] = (eventCounts[event.eventType] || 0) + 1;
        if (event.toolName) {
          toolUsage[event.toolName] = (toolUsage[event.toolName] || 0) + 1;
        }
      });

      return {
        totalEvents: events.length,
        eventCounts,
        toolUsage,
        topTool: Object.entries(toolUsage).sort(([, a], [, b]) => b - a)[0]?.[0],
        topEvent: Object.entries(eventCounts).sort(([, a], [, b]) => b - a)[0]?.[0],
      };
    }),

  // Get tool usage analytics
  getToolAnalytics: protectedProcedure
    .input(z.object({
      toolName: z.string(),
      days: z.number().default(30),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - input.days);

      return await db
        .select()
        .from(analyticsEvents)
        .where(
          and(
            eq(analyticsEvents.userId, ctx.user.id),
            eq(analyticsEvents.toolName, input.toolName),
            gte(analyticsEvents.createdAt, startDate)
          )
        );
    }),

  // Get brief performance
  getBriefPerformance: protectedProcedure
    .input(z.object({
      briefId: z.number(),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;

      const events = await db
        .select()
        .from(analyticsEvents)
        .where(
          and(
            eq(analyticsEvents.userId, ctx.user.id),
            eq(analyticsEvents.briefId, input.briefId)
          )
        );

      const eventCounts: Record<string, number> = {};
      events.forEach(event => {
        eventCounts[event.eventType] = (eventCounts[event.eventType] || 0) + 1;
      });

      return {
        totalEvents: events.length,
        eventCounts,
        lastUpdated: events[events.length - 1]?.createdAt,
      };
    }),
});
