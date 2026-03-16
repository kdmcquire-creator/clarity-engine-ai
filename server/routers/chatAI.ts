import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { chatConversations, chatMessages, chatKnowledgeBase } from "../../drizzle/schema";
import { eq, desc, and, ilike } from "drizzle-orm";import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createPatchedFetch } from "../_core/patchedFetch";

// Declare fetch globally
declare const fetch: typeof globalThis.fetch;

// Initialize Forge API client
const openai = createOpenAI({
  apiKey: process.env.BUILT_IN_FORGE_API_KEY || "",
  baseURL: `${process.env.BUILT_IN_FORGE_API_URL}/v1`,
  fetch: createPatchedFetch(fetch),
});

const model = openai.chat("gemini-2.5-flash");

export const chatAIRouter = router({
  // Get or create conversation
  getOrCreateConversation: publicProcedure
    .input(z.object({ visitorId: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return null;

      const userId = ctx.user?.id;
      const visitorId = input.visitorId || `visitor_${Date.now()}`;

      let conversations;
      if (userId) {
        conversations = await db
          .select()
          .from(chatConversations)
          .where(eq(chatConversations.userId, userId))
          .orderBy(desc(chatConversations.createdAt))
          .limit(1);
      } else {
        conversations = await db
          .select()
          .from(chatConversations)
          .where(eq(chatConversations.visitorId, visitorId))
          .orderBy(desc(chatConversations.createdAt))
          .limit(1);
      }

      if (conversations.length > 0) {
        return conversations[0];
      }

      // Create new conversation
      const result = await db
        .insert(chatConversations)
        .values({
          userId: userId || null,
          visitorId: userId ? null : visitorId,
          status: "open",
        });

      // Get the newly created conversation
      const newConversations = await db
        .select()
        .from(chatConversations)
        .where(eq(chatConversations.visitorId, visitorId))
        .orderBy(desc(chatConversations.createdAt))
        .limit(1);

      return newConversations[0] || { id: 0, status: "open", createdAt: new Date() };
    }),

  // Get conversation messages
  getMessages: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const messages = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.conversationId, input))
        .orderBy(chatMessages.createdAt);

      return messages;
    }),

  // Send message and get AI response
  sendMessage: publicProcedure
    .input(
      z.object({
        conversationId: z.number(),
        message: z.string().min(1).max(5000),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      // Save user message
      await db
        .insert(chatMessages)
        .values({
          conversationId: input.conversationId,
          sender: "user",
          message: input.message,
        });

      // Get the saved user message
      const userMessages = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.conversationId, input.conversationId))
        .orderBy(desc(chatMessages.createdAt))
        .limit(1);

      const userMessage = userMessages[0];

      try {
        // Get conversation history for context
        const messages = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.conversationId, input.conversationId))
          .orderBy(chatMessages.createdAt);

        // Get relevant knowledge base entries
        const knowledgeBase = await db
          .select()
          .from(chatKnowledgeBase)
          .where(eq(chatKnowledgeBase.isActive, true));

        // Build context from knowledge base
        const relevantKB = knowledgeBase
          .filter((kb) =>
            kb.question.toLowerCase().includes(input.message.toLowerCase()) ||
            kb.answer.toLowerCase().includes(input.message.toLowerCase())
          )
          .slice(0, 3);

        const systemPrompt = `You are Clarity, an intelligent AI assistant for the Clarity Engine SEO platform. 
Your role is to help users with:
- SEO tools and features (keyword research, competitor analysis, content optimization, rank tracking)
- Best practices for search engine optimization
- Content marketing strategies
- Technical SEO guidance
- Account and billing questions

Be professional, helpful, and concise. Provide actionable advice when possible.
If you don't know something, be honest and suggest checking the documentation or contacting support.

${
  relevantKB.length > 0
    ? `\nRelevant knowledge base:\n${relevantKB.map((kb) => `Q: ${kb.question}\nA: ${kb.answer}`).join("\n\n")}`
    : ""
}`;

        // Convert message history to format for AI SDK
        const conversationHistory = messages
          .filter((m) => m.id !== userMessage.id)
          .map((m) => ({
            role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
            content: m.message,
          }));

        // Add current user message
        conversationHistory.push({
          role: "user" as const,
          content: input.message,
        });

        // Generate AI response using Forge API
        const { text: botResponse } = await generateText({
          model,
          system: systemPrompt,
          messages: conversationHistory,
        });

        // Save bot response
        await db
          .insert(chatMessages)
          .values({
            conversationId: input.conversationId,
            sender: "bot",
            message: botResponse,
          });

        // Get the saved bot message
        const botMessages = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.conversationId, input.conversationId))
          .orderBy(desc(chatMessages.createdAt))
          .limit(1);

        return {
          success: true,
          message: botMessages[0],
          response: botResponse,
        };
      } catch (error) {
        console.error("[Chat AI] Error generating response:", error);

        // Fallback response if AI fails
        const fallbackResponse =
          "I'm having trouble processing your request right now. Please try again in a moment, or contact our support team for immediate assistance.";

        await db
          .insert(chatMessages)
          .values({
            conversationId: input.conversationId,
            sender: "bot",
            message: fallbackResponse,
          });

        // Get the saved fallback message
        const fallbackMessages = await db
          .select()
          .from(chatMessages)
          .where(eq(chatMessages.conversationId, input.conversationId))
          .orderBy(desc(chatMessages.createdAt))
          .limit(1);

        return {
          success: false,
          message: fallbackMessages[0],
          response: fallbackResponse,
          error: "AI response generation failed",
        };
      }
    }),

  // Rate message helpfulness
  rateMessage: publicProcedure
    .input(
      z.object({
        messageId: z.number(),
        rating: z.enum(["helpful", "unhelpful"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      // In production, would save rating to database for analytics
      console.log(`[Chat] Message ${input.messageId} rated as ${input.rating}`);

      return { success: true };
    }),

  // Get knowledge base
  getKnowledgeBase: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const kb = await db
      .select()
      .from(chatKnowledgeBase)
      .where(eq(chatKnowledgeBase.isActive, true));

    return kb;
  }),

  // Search knowledge base
  searchKnowledgeBase: publicProcedure
    .input(z.object({ query: z.string().min(1).max(500) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const results = await db
        .select()
        .from(chatKnowledgeBase)
        .where(
          and(
            eq(chatKnowledgeBase.isActive, true),
            ilike(chatKnowledgeBase.question, `%${input.query}%`)
          )
        )
        .limit(5);

      return results;
    }),

  // Add knowledge base entry (admin only)
  addKnowledgeEntry: protectedProcedure
    .input(
      z.object({
        question: z.string().min(5).max(500),
        answer: z.string().min(10).max(5000),
        category: z.string().min(1).max(100),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      await db
        .insert(chatKnowledgeBase)
        .values({
          question: input.question,
          answer: input.answer,
          category: input.category,
          isActive: true,
        });

      // Get the inserted entry
      const entries = await db
        .select()
        .from(chatKnowledgeBase)
        .orderBy(desc(chatKnowledgeBase.createdAt))
        .limit(1);

      return {
        success: true,
        entry: entries[0],
      };
    }),

  // Update knowledge base entry (admin only)
  updateKnowledgeEntry: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        question: z.string().min(5).max(500).optional(),
        answer: z.string().min(10).max(5000).optional(),
        category: z.string().min(1).max(100).optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
      }

      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      const { id, ...updates } = input;

      await db
        .update(chatKnowledgeBase)
        .set(updates)
        .where(eq(chatKnowledgeBase.id, id));

      // Get the updated entry
      const entries = await db
        .select()
        .from(chatKnowledgeBase)
        .where(eq(chatKnowledgeBase.id, id));

      return {
        success: true,
        entry: entries[0],
      };
    }),

  // Close conversation
  closeConversation: publicProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      await db
        .update(chatConversations)
        .set({ status: "closed", closedAt: new Date() })
        .where(eq(chatConversations.id, input));

      return { success: true };
    }),

  // Get conversation summary
  getConversationSummary: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const conversation = await db
        .select()
        .from(chatConversations)
        .where(eq(chatConversations.id, input))
        .limit(1);

      if (conversation.length === 0) return null;

      const messages = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.conversationId, input));

      const userMessages = messages.filter((m) => m.sender === "user").length;
      const botMessages = messages.filter((m) => m.sender === "bot").length;

      return {
        ...conversation[0],
        messageCount: messages.length,
        userMessageCount: userMessages,
        botMessageCount: botMessages,
      };
    }),
});
