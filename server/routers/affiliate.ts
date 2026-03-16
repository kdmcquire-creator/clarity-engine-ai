import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { affiliatePrograms, affiliateClicks } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const affiliateRouter = {
  // Get all affiliate programs
  getPrograms: publicProcedure.query(async () => {
    try {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      return await db.select().from(affiliatePrograms);
    } catch (error) {
      console.error("[Affiliate] Error fetching programs:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch affiliate programs",
      });
    }
  }),

  // Get single program details
  getProgram: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }: any) => {
      try {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const [program] = await db.select().from(affiliatePrograms).where(eq(affiliatePrograms.id, input.id));
        if (!program) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Affiliate program not found",
          });
        }
        return program;
      } catch (error) {
        console.error("[Affiliate] Error fetching program:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch affiliate program",
        });
      }
    }),

  // Track affiliate click
  trackClick: publicProcedure
    .input(
      z.object({
        programId: z.number(),
        userEmail: z.string().email().optional(),
        ipAddress: z.string().optional(),
        userAgent: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }: any) => {
      try {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const click = await db.insert(affiliateClicks).values({
          affiliateProgramId: input.programId,
          userId: ctx.user?.id,
          userEmail: input.userEmail,
          ipAddress: input.ipAddress,
          userAgent: input.userAgent,
        });

        return { success: true, clickId: click[0] };
      } catch (error) {
        console.error("[Affiliate] Error tracking click:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to track affiliate click",
        });
      }
    }),

  // Record affiliate conversion
  recordConversion: protectedProcedure
    .input(
      z.object({
        clickId: z.number(),
        amount: z.string(),
      })
    )
    .mutation(async ({ input, ctx }: any) => {
      try {
        // Update click record with conversion data
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db
          .update(affiliateClicks)
          .set({
            converted: true,
            conversionAmount: input.amount,
            conversionDate: new Date(),
          })
          .where(eq(affiliateClicks.id, input.clickId));

        return { success: true };
      } catch (error) {
        console.error("[Affiliate] Error recording conversion:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to record affiliate conversion",
        });
      }
    }),

  // Get affiliate stats (admin only)
  getStats: protectedProcedure.query(async ({ ctx }: any) => {
    try {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can view affiliate stats",
        });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");
      const programs = await db.select().from(affiliatePrograms);
      const clicks = await db.select().from(affiliateClicks);

      const totalClicks = clicks.length;
      const totalConversions = clicks.filter((c: any) => c.converted).length;
      const totalEarnings = clicks
        .filter((c: any) => c.converted && c.conversionAmount)
        .reduce((sum: number, c: any) => sum + parseFloat(c.conversionAmount || "0"), 0);

      return {
        programs: programs.length,
        totalClicks,
        totalConversions,
        conversionRate:
          totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : "0",
        totalEarnings: totalEarnings.toFixed(2),
      };
    } catch (error) {
      console.error("[Affiliate] Error fetching stats:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch affiliate stats",
      });
    }
  }),

  // Update affiliate program (admin only)
  updateProgram: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        commissionRate: z.string().optional(),
        trackingLink: z.string().optional(),
        status: z.enum(["active", "pending", "inactive"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }: any) => {
      try {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can update affiliate programs",
          });
        }

        const updates: any = {};
        if (input.name) updates.name = input.name;
        if (input.commissionRate) updates.commissionRate = input.commissionRate;
        if (input.trackingLink) updates.trackingLink = input.trackingLink;
        if (input.status) updates.status = input.status;

        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db
          .update(affiliatePrograms)
          .set(updates)
          .where(eq(affiliatePrograms.id, input.id));

        return { success: true };
      } catch (error) {
        console.error("[Affiliate] Error updating program:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update affiliate program",
        });
      }
    }),
};
