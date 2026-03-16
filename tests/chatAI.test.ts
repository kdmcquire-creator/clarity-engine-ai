import { describe, it, expect, beforeEach, vi } from "vitest";
import { chatAIRouter } from "./chatAI";
import { getDb } from "../db";

vi.mock("../db", () => ({
  getDb: vi.fn(),
}));

vi.mock("../._core/patchedFetch", () => ({
  createPatchedFetch: vi.fn(() => fetch),
}));

describe("Chat AI Router", () => {
  beforeEach(() => {
    vi.mocked(getDb).mockResolvedValue({} as any);
  });

  describe("getOrCreateConversation", () => {
    it("should create a new conversation for new visitors", async () => {
      const caller = chatAIRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getOrCreateConversation({
        visitorId: "visitor_123",
      });

      expect(result).toBeDefined();
    });
  });

  describe("getMessages", () => {
    it("should return conversation messages", async () => {
      const caller = chatAIRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getMessages(1);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("rateMessage", () => {
    it("should accept message rating", async () => {
      const caller = chatAIRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.rateMessage({
        messageId: 1,
        rating: "helpful",
      });

      expect(result.success).toBe(true);
    });
  });

  describe("getKnowledgeBase", () => {
    it("should return knowledge base entries", async () => {
      const caller = chatAIRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getKnowledgeBase();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("searchKnowledgeBase", () => {
    it("should search knowledge base by query", async () => {
      const caller = chatAIRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.searchKnowledgeBase({
        query: "keyword",
      });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("closeConversation", () => {
    it("should close a conversation", async () => {
      const caller = chatAIRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.closeConversation(1);

      expect(result.success).toBe(true);
    });
  });

  describe("getConversationSummary", () => {
    it("should return conversation summary", async () => {
      const caller = chatAIRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getConversationSummary(1);

      // Result can be null or summary object
      expect(result === null || typeof result === "object").toBe(true);
    });
  });

  describe("sendMessage", () => {
    it("should send a message", async () => {
      const caller = chatAIRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.sendMessage({
        conversationId: 1,
        message: "Hello",
      });

      expect(result).toBeDefined();
      expect(result.success !== undefined).toBe(true);
    });
  });
});
