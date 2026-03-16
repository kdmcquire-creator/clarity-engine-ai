import { router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { contentRepurposing } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const repurposingRouter = router({
  // Create repurposed content
  createRepurposedContent: protectedProcedure
    .input(z.object({
      sourceContent: z.string().min(1),
      sourceFormat: z.string(),
      targetFormat: z.string(),
      repurposedContent: z.string(),
      title: z.string().optional(),
      briefId: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db.insert(contentRepurposing).values({
        userId: ctx.user.id,
        sourceContent: input.sourceContent,
        sourceFormat: input.sourceFormat,
        targetFormat: input.targetFormat,
        repurposedContent: input.repurposedContent,
        title: input.title,
        briefId: input.briefId,
      });

      return { success: true, message: "Content repurposed successfully" };
    }),

  // Get user's repurposed content
  getRepurposedContent: protectedProcedure
    .input(z.object({
      briefId: z.number().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      let query = db
        .select()
        .from(contentRepurposing)
        .where(eq(contentRepurposing.userId, ctx.user.id));

      if (input.briefId) {
        query = db
          .select()
          .from(contentRepurposing)
          .where(eq(contentRepurposing.userId, ctx.user.id));
        // Filter by briefId in post-processing since we can't use complex where clauses easily
      }

      const results = await query;
      return input.briefId ? results.filter(r => r.briefId === input.briefId) : results;
    }),

  // Delete repurposed content
  deleteRepurposedContent: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Verify ownership
      const item = await db
        .select()
        .from(contentRepurposing)
        .where(eq(contentRepurposing.id, input.id))
        .limit(1);

      if (!item || item.length === 0 || item[0].userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await db.delete(contentRepurposing)
        .where(eq(contentRepurposing.id, input.id));

      return { success: true };
    }),

  // Get repurposing templates
  getTemplates: protectedProcedure
    .query(async () => {
      return [
        {
          id: 1,
          name: "Blog to Social Posts",
          sourceFormat: "blog",
          targetFormat: "social",
          description: "Transform long-form blog content into engaging social media posts",
          examples: ["Twitter threads", "LinkedIn posts", "Instagram captions"],
        },
        {
          id: 2,
          name: "Blog to Email Newsletter",
          sourceFormat: "blog",
          targetFormat: "email",
          description: "Convert blog articles into email newsletter format",
          examples: ["Weekly digest", "Feature highlight", "Educational series"],
        },
        {
          id: 3,
          name: "Blog to Video Script",
          sourceFormat: "blog",
          targetFormat: "video",
          description: "Adapt blog content into video scripts and talking points",
          examples: ["YouTube script", "Webinar outline", "Presentation deck"],
        },
        {
          id: 4,
          name: "Blog to Infographic",
          sourceFormat: "blog",
          targetFormat: "infographic",
          description: "Extract key data and create infographic briefs",
          examples: ["Statistics visual", "Process diagram", "Comparison chart"],
        },
        {
          id: 5,
          name: "Blog to Podcast Script",
          sourceFormat: "blog",
          targetFormat: "podcast",
          description: "Transform articles into podcast episode scripts",
          examples: ["Solo episode", "Interview format", "Storytelling format"],
        },
        {
          id: 6,
          name: "Blog to Presentation",
          sourceFormat: "blog",
          targetFormat: "presentation",
          description: "Convert content into slide deck format",
          examples: ["Conference talk", "Training material", "Pitch deck"],
        },
      ];
    }),
});
