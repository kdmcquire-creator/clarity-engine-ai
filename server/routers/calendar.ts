import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { contentSchedule } from "../../drizzle/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const calendarRouter = router({
  // Schedule content
  scheduleContent: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string(),
      scheduledFor: z.date(),
      platform: z.string().optional(),
      briefId: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(contentSchedule).values({
        userId: ctx.user.id,
        title: input.title,
        content: input.content,
        scheduledFor: input.scheduledFor,
        platform: input.platform,
        briefId: input.briefId,
        status: "scheduled",
      });

      return { success: true, message: "Content scheduled successfully" };
    }),

  // Get scheduled content for user
  getScheduledContent: protectedProcedure
    .input(z.object({
      startDate: z.date(),
      endDate: z.date(),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      return await db
        .select()
        .from(contentSchedule)
        .where(
          and(
            eq(contentSchedule.userId, ctx.user.id),
            gte(contentSchedule.scheduledFor, input.startDate),
            lte(contentSchedule.scheduledFor, input.endDate)
          )
        );
    }),

  // Update scheduled content
  updateScheduledContent: protectedProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      content: z.string().optional(),
      scheduledFor: z.date().optional(),
      status: z.enum(["draft", "scheduled", "published", "archived"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify ownership
      const item = await db
        .select()
        .from(contentSchedule)
        .where(eq(contentSchedule.id, input.id))
        .limit(1);

      if (!item || item.length === 0 || item[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const updates: any = {};
      if (input.title !== undefined) updates.title = input.title;
      if (input.content !== undefined) updates.content = input.content;
      if (input.scheduledFor !== undefined) updates.scheduledFor = input.scheduledFor;
      if (input.status !== undefined) updates.status = input.status;

      await db.update(contentSchedule)
        .set(updates)
        .where(eq(contentSchedule.id, input.id));

      return { success: true };
    }),

  // Publish scheduled content
  publishContent: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify ownership
      const item = await db
        .select()
        .from(contentSchedule)
        .where(eq(contentSchedule.id, input.id))
        .limit(1);

      if (!item || item.length === 0 || item[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await db.update(contentSchedule)
        .set({ status: "published", publishedAt: new Date() })
        .where(eq(contentSchedule.id, input.id));

      return { success: true, message: "Content published" };
    }),

  // Delete scheduled content
  deleteScheduledContent: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify ownership
      const item = await db
        .select()
        .from(contentSchedule)
        .where(eq(contentSchedule.id, input.id))
        .limit(1);

      if (!item || item.length === 0 || item[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await db.delete(contentSchedule)
        .where(eq(contentSchedule.id, input.id));

      return { success: true };
    }),
});
