import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { competitors, competitorRankings } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const competitorsRouter = router({
  // Add competitor
  addCompetitor: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      website: z.string().url(),
      industry: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(competitors).values({
        userId: ctx.user.id,
        name: input.name,
        website: input.website,
        industry: input.industry,
        notes: input.notes,
      });

      return { success: true, message: "Competitor added successfully" };
    }),

  // Get user's competitors
  getCompetitors: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];

      return await db
        .select()
        .from(competitors)
        .where(eq(competitors.userId, ctx.user.id));
    }),

  // Track competitor ranking
  trackRanking: protectedProcedure
    .input(z.object({
      competitorId: z.number(),
      keyword: z.string(),
      rank: z.number().optional(),
      url: z.string().optional(),
      volume: z.number().optional(),
      difficulty: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify competitor ownership
      const competitor = await db
        .select()
        .from(competitors)
        .where(eq(competitors.id, input.competitorId))
        .limit(1);

      if (!competitor || competitor.length === 0 || competitor[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await db.insert(competitorRankings).values({
        competitorId: input.competitorId,
        keyword: input.keyword,
        rank: input.rank,
        url: input.url,
        volume: input.volume,
        difficulty: input.difficulty,
      });

      return { success: true };
    }),

  // Get competitor rankings
  getRankings: protectedProcedure
    .input(z.object({
      competitorId: z.number(),
      keyword: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      // Verify competitor ownership
      const competitor = await db
        .select()
        .from(competitors)
        .where(eq(competitors.id, input.competitorId))
        .limit(1);

      if (!competitor || competitor.length === 0 || competitor[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return await db
        .select()
        .from(competitorRankings)
        .where(eq(competitorRankings.competitorId, input.competitorId));
    }),

  // Delete competitor
  deleteCompetitor: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify ownership
      const competitor = await db
        .select()
        .from(competitors)
        .where(eq(competitors.id, input.id))
        .limit(1);

      if (!competitor || competitor.length === 0 || competitor[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await db.delete(competitors)
        .where(eq(competitors.id, input.id));

      return { success: true };
    }),

  // Get competitor analysis
  getAnalysis: protectedProcedure
    .input(z.object({ competitorId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;

      // Verify competitor ownership
      const competitor = await db
        .select()
        .from(competitors)
        .where(eq(competitors.id, input.competitorId))
        .limit(1);

      if (!competitor || competitor.length === 0 || competitor[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const rankings = await db
        .select()
        .from(competitorRankings)
        .where(eq(competitorRankings.competitorId, input.competitorId));

      // Calculate analysis metrics
      const avgRank = rankings.length > 0
        ? rankings.reduce((sum, r) => sum + (r.rank || 0), 0) / rankings.length
        : 0;

      const avgVolume = rankings.length > 0
        ? rankings.reduce((sum, r) => sum + (r.volume || 0), 0) / rankings.length
        : 0;

      const avgDifficulty = rankings.length > 0
        ? rankings.reduce((sum, r) => sum + (r.difficulty || 0), 0) / rankings.length
        : 0;

      return {
        competitor: competitor[0],
        totalKeywords: rankings.length,
        averageRank: Math.round(avgRank * 10) / 10,
        averageVolume: Math.round(avgVolume),
        averageDifficulty: Math.round(avgDifficulty),
        topKeywords: rankings.sort((a, b) => (b.volume || 0) - (a.volume || 0)).slice(0, 5),
      };
    }),
});
