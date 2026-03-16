import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { chatConversations, chatMessages, chatKnowledgeBase } from "../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

export const chatRouter = router({
  // Start or get conversation
  getOrCreateConversation: publicProcedure
    .input(z.object({ visitorId: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return null;

      const userId = ctx.user?.id;
      const visitorId = input.visitorId || `visitor_${Date.now()}`;

      let conversations;
      if (userId) {
        conversations = await db.select().from(chatConversations).where(eq(chatConversations.userId, userId)).orderBy(desc(chatConversations.createdAt)).limit(1);
      } else {
        conversations = await db.select().from(chatConversations).where(eq(chatConversations.visitorId, visitorId)).orderBy(desc(chatConversations.createdAt)).limit(1);
      }

      if (conversations.length > 0) {
        return conversations[0];
      }

      // Create new conversation
      await db.insert(chatConversations).values({
        userId: userId || null,
        visitorId: userId ? null : visitorId,
        status: "open",
      });

      // Get the newly created conversation
      const newConversations = await db.select().from(chatConversations).where(eq(chatConversations.visitorId, visitorId)).orderBy(desc(chatConversations.createdAt)).limit(1);
      return newConversations[0] || { id: 0, status: "open", createdAt: new Date() };
    }),

  // Send message
  sendMessage: publicProcedure
    .input(z.object({ conversationId: z.number(), message: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      // Save user message
      await db.insert(chatMessages).values({
        conversationId: input.conversationId,
        sender: "user",
        message: input.message,
      });

      // Get AI response (simplified - would use Forge API in production)
      const botResponse = await generateBotResponse(input.message);

      // Save bot response
      await db.insert(chatMessages).values({
        conversationId: input.conversationId,
        sender: "bot",
        message: botResponse,
      });

      return { success: true, botResponse };
    }),

  // Get conversation messages
  getMessages: publicProcedure.input(z.number()).query(async ({ input }) => {
    const db = await getDb();
    if (!db) return [];
    const messages = await db.select().from(chatMessages).where(eq(chatMessages.conversationId, input)).orderBy(desc(chatMessages.createdAt));
    return messages;
  }),

  // Rate message
  rateMessage: publicProcedure
    .input(z.object({ messageId: z.number(), rating: z.number().min(1).max(5) }))
    .mutation(async ({ input }) => {
      // In production, would save rating to database
      return { success: true };
    }),

  // Get knowledge base
  getKnowledgeBase: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];
    const kb = await db.select().from(chatKnowledgeBase).where(eq(chatKnowledgeBase.isActive, true));
    return kb;
  }),

  // Add knowledge base entry (admin only)
  addKnowledgeEntry: protectedProcedure
    .input(z.object({ question: z.string(), answer: z.string(), category: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");
      await db.insert(chatKnowledgeBase).values({
        question: input.question,
        answer: input.answer,
        category: input.category,
      });
      return { success: true };
    }),

  // Close conversation
  closeConversation: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error("Database connection failed");
    await db.update(chatConversations).set({ status: "closed", closedAt: new Date() }).where(eq(chatConversations.id, input));
    return { success: true };
  }),
});

// Simplified bot response generator (would use Forge API in production)
async function generateBotResponse(userMessage: string): Promise<string> {
  const responses: Record<string, string> = {
    hello: "👋 Hello! Welcome to Clarity Engine. How can I help you today?",
    help: "I can assist you with: 1) Using our SEO tools 2) Pricing questions 3) Account issues 4) General SEO advice",
    pricing: "We offer flexible pricing plans. Visit our pricing page to learn more!",
    tools: "We have 17 powerful SEO tools including Keyword Research, Competitor Analysis, Content Optimizer, and more!",
    default: "Thanks for your message! Our team will get back to you shortly. In the meantime, check out our help center.",
  };

  const lowerMessage = userMessage.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  return responses.default;
}
