import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { generateContentBrief } from "../contentBriefAI";
import { getDb } from "../db";
import { contentBriefs } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const contentBriefRouter = router({
  /**
   * Generate a new content brief
   */
  generate: protectedProcedure
    .input(
      z.object({
        keyword: z.string().min(1).max(500),
        competitorUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Generate brief using AI
        const brief = await generateContentBrief({
          keyword: input.keyword,
          competitorUrl: input.competitorUrl,
        });

        // Save to database
        const db = await getDb();
        if (db) {
          const result = await db.insert(contentBriefs).values({
            userId: ctx.user.id,
            keyword: input.keyword,
            competitorUrl: input.competitorUrl || null,
            briefContent: brief.fullBrief,
            keywordResearch: brief.keywordResearch,
            competitorAnalysis: brief.competitorAnalysis,
            contentOutline: brief.contentOutline,
            contentRecommendations: brief.contentRecommendations,
            linkingStrategy: brief.linkingStrategy,
            metaOptimization: brief.metaOptimization,
            title: `Brief: ${input.keyword}`,
          });

          return {
            success: true,
            brief,
          };
        }

        return {
          success: true,
          brief,
        };
      } catch (error) {
        console.error("Failed to generate content brief:", error);
        throw new Error("Failed to generate content brief");
      }
    }),

  /**
   * Get all briefs for the current user
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      const db = await getDb();
      if (!db) return [];

      const briefs = await db
        .select()
        .from(contentBriefs)
        .where(eq(contentBriefs.userId, ctx.user.id));

      return briefs;
    } catch (error) {
      console.error("Failed to fetch briefs:", error);
      return [];
    }
  }),

  /**
   * Get a specific brief by ID
   */
  get: protectedProcedure
    .input(z.object({ briefId: z.number() }))
    .query(async ({ input, ctx }) => {
      try {
        const db = await getDb();
        if (!db) return null;

        const results = await db
          .select()
          .from(contentBriefs)
          .where(eq(contentBriefs.id, input.briefId));

        return results.length > 0 ? results[0] : null;
      } catch (error) {
        console.error("Failed to fetch brief:", error);
        return null;
      }
    }),

  /**
   * Delete a brief
   */
  delete: protectedProcedure
    .input(z.object({ briefId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const db = await getDb();
        if (!db) return { success: false };

        await db
          .delete(contentBriefs)
          .where(eq(contentBriefs.id, input.briefId));

        return { success: true };
      } catch (error) {
        console.error("Failed to delete brief:", error);
        throw new Error("Failed to delete brief");
      }
    }),

  /**
   * Update brief title
   */
  updateTitle: protectedProcedure
    .input(
      z.object({
        briefId: z.number(),
        title: z.string().min(1).max(500),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const db = await getDb();
        if (!db) return { success: false };

        await db
          .update(contentBriefs)
          .set({ title: input.title })
          .where(eq(contentBriefs.id, input.briefId));

        return { success: true };
      } catch (error) {
        console.error("Failed to update brief title:", error);
        throw new Error("Failed to update brief title");
      }
    }),

  /**
   * Duplicate a brief
   */
  duplicate: protectedProcedure
    .input(z.object({ briefId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const db = await getDb();
        if (!db) return { success: false };

        // Get the original brief
        const results = await db
          .select()
          .from(contentBriefs)
          .where(eq(contentBriefs.id, input.briefId));

        const original = results.length > 0 ? results[0] : null;

        if (!original) {
          throw new Error("Brief not found");
        }

        // Create a copy
        await db.insert(contentBriefs).values({
          userId: ctx.user.id,
          keyword: original.keyword,
          competitorUrl: original.competitorUrl,
          briefContent: original.briefContent,
          keywordResearch: original.keywordResearch,
          competitorAnalysis: original.competitorAnalysis,
          contentOutline: original.contentOutline,
          contentRecommendations: original.contentRecommendations,
          linkingStrategy: original.linkingStrategy,
          metaOptimization: original.metaOptimization,
          title: `${original.title} (Copy)`,
        });

        return {
          success: true,
        };
      } catch (error) {
        console.error("Failed to duplicate brief:", error);
        throw new Error("Failed to duplicate brief");
      }
    }),
});
