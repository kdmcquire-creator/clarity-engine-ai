import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { forumPosts, forumReplies, userBadges, leaderboardStats } from "../../drizzle/schema";
import { eq, desc, and, like } from "drizzle-orm";

export const communityRouter = router({
  // Forum Posts
  listPosts: publicProcedure
    .input(z.object({ category: z.string().optional(), search: z.string().optional(), page: z.number().default(1) }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const pageSize = 20;
      const offset = ((input?.page || 1) - 1) * pageSize;

      const posts = await db.select().from(forumPosts).orderBy(desc(forumPosts.isPinned), desc(forumPosts.createdAt)).limit(pageSize).offset(offset);
      return posts;
    }),

  getPost: publicProcedure.input(z.number()).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return null;
    const posts = await db.select().from(forumPosts).where(eq(forumPosts.id, input));
    if (posts.length === 0) return null;

    const post = posts[0];
    // Increment views
    await db.update(forumPosts).set({ views: (post.views || 0) + 1 }).where(eq(forumPosts.id, input));

    // Get replies
    const replies = await db.select().from(forumReplies).where(eq(forumReplies.postId, input)).orderBy(desc(forumReplies.upvotes));

    return { ...post, replies };
  }),

  createPost: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string(), category: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");
      const result = await db.insert(forumPosts).values({
        userId: ctx.user.id,
        title: input.title,
        content: input.content,
        category: input.category,
      });
      return result;
    }),

  // Forum Replies
  createReply: protectedProcedure
    .input(z.object({ postId: z.number(), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");
      await db.insert(forumReplies).values({
        postId: input.postId,
        userId: ctx.user.id,
        content: input.content,
      });

      // Update reply count on post
      const posts = await db.select().from(forumPosts).where(eq(forumPosts.id, input.postId));
      if (posts.length > 0) {
        await db.update(forumPosts).set({ replies: (posts[0].replies || 0) + 1 }).where(eq(forumPosts.id, input.postId));
      }
    }),

  // Leaderboard
  getLeaderboard: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const stats = await db.select().from(leaderboardStats).orderBy(desc(leaderboardStats.points)).limit(100);
    return stats;
  }),

  // User Badges
  getUserBadges: publicProcedure.input(z.number()).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    const badges = await db.select().from(userBadges).where(eq(userBadges.userId, input));
    return badges;
  }),

  awardBadge: protectedProcedure
    .input(z.object({ userId: z.number(), badgeId: z.string(), badgeName: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");
      await db.insert(userBadges).values({
        userId: input.userId,
        badgeId: input.badgeId,
        badgeName: input.badgeName,
      });
    }),
});
