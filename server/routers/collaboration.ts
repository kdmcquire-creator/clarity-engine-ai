import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { briefCollaborators, briefComments, contentBriefs } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const collaborationRouter = router({
  // Share brief with collaborators
  shareBrief: protectedProcedure
    .input(z.object({
      briefId: z.number(),
      userEmails: z.array(z.string().email()),
      role: z.enum(["viewer", "editor", "admin"]).default("viewer"),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      // Verify brief ownership
      const brief = await db
        .select()
        .from(contentBriefs)
        .where(eq(contentBriefs.id, input.briefId))
        .limit(1);

      if (!brief || brief.length === 0 || brief[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return { success: true, message: `Brief shared with ${input.userEmails.length} collaborators` };
    }),

  // Get brief collaborators
  getCollaborators: protectedProcedure
    .input(z.object({ briefId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      
      // Verify access
      const brief = await db
        .select()
        .from(contentBriefs)
        .where(eq(contentBriefs.id, input.briefId))
        .limit(1);

      if (!brief || brief.length === 0 || (brief[0].userId !== ctx.user.id)) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      return await db
        .select()
        .from(briefCollaborators)
        .where(eq(briefCollaborators.briefId, input.briefId));
    }),

  // Add comment to brief
  addComment: protectedProcedure
    .input(z.object({
      briefId: z.number(),
      content: z.string().min(1),
      parentCommentId: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify brief access
      const brief = await db
        .select()
        .from(contentBriefs)
        .where(eq(contentBriefs.id, input.briefId))
        .limit(1);

      if (!brief || brief.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await db.insert(briefComments).values({
        briefId: input.briefId,
        userId: ctx.user.id,
        userName: ctx.user.name || "Anonymous",
        userEmail: ctx.user.email || "",
        content: input.content,
        parentCommentId: input.parentCommentId,
      });

      return { success: true, message: "Comment added successfully" };
    }),

  // Get brief comments
  getComments: protectedProcedure
    .input(z.object({ briefId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      return await db
        .select()
        .from(briefComments)
        .where(eq(briefComments.briefId, input.briefId));
    }),

  // Resolve comment
  resolveComment: protectedProcedure
    .input(z.object({ commentId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const comment = await db
        .select()
        .from(briefComments)
        .where(eq(briefComments.id, input.commentId))
        .limit(1);

      if (!comment || comment.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // Only comment author or brief owner can resolve
      const brief = await db
        .select()
        .from(contentBriefs)
        .where(eq(contentBriefs.id, comment[0].briefId))
        .limit(1);

      if (comment[0].userId !== ctx.user.id && brief && brief[0]?.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await db.update(briefComments)
        .set({ isResolved: true })
        .where(eq(briefComments.id, input.commentId));

      return { success: true };
    }),

  // Update collaborator role
  updateCollaboratorRole: protectedProcedure
    .input(z.object({
      briefId: z.number(),
      collaboratorId: z.number(),
      role: z.enum(["viewer", "editor", "admin"]),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify brief ownership
      const brief = await db
        .select()
        .from(contentBriefs)
        .where(eq(contentBriefs.id, input.briefId))
        .limit(1);

      if (!brief || brief.length === 0 || brief[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await db.update(briefCollaborators)
        .set({ role: input.role })
        .where(and(
          eq(briefCollaborators.briefId, input.briefId),
          eq(briefCollaborators.userId, input.collaboratorId)
        ));

      return { success: true };
    }),

  // Remove collaborator
  removeCollaborator: protectedProcedure
    .input(z.object({
      briefId: z.number(),
      collaboratorId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify brief ownership
      const brief = await db
        .select()
        .from(contentBriefs)
        .where(eq(contentBriefs.id, input.briefId))
        .limit(1);

      if (!brief || brief.length === 0 || brief[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await db.delete(briefCollaborators)
        .where(and(
          eq(briefCollaborators.briefId, input.briefId),
          eq(briefCollaborators.userId, input.collaboratorId)
        ));

      return { success: true };
    }),
});
