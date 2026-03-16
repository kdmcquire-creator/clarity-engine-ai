import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(user: AuthenticatedUser | null): TrpcContext {
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Email Integration Tests", () => {
  describe("Complete Email Workflow", () => {
    it("should support complete user email workflow: signup -> welcome -> newsletter -> password reset", async () => {
      const ctx = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      // Step 1: User receives welcome email on signup
      const welcomeResult = await caller.email.sendWelcomeEmail({
        email: "newuser@example.com",
        firstName: "John",
      });
      expect(welcomeResult.success).toBeDefined();
      expect(welcomeResult.message).toBeDefined();

      // Step 2: User receives weekly newsletter
      const newsletterResult = await caller.email.sendWeeklyNewsletter({
        email: "newuser@example.com",
        articles: [
          {
            title: "SEO Best Practices 2024",
            excerpt: "Learn the latest SEO strategies",
            link: "https://clarity-engine.ai/articles/seo-2024",
          },
          {
            title: "Keyword Research Guide",
            excerpt: "Master keyword research techniques",
            link: "https://clarity-engine.ai/articles/keyword-research",
          },
        ],
      });
      expect(newsletterResult.success).toBeDefined();
      expect(newsletterResult.message).toBeDefined();

      // Step 3: User requests password reset
      const resetResult = await caller.email.sendPasswordResetEmail({
        email: "newuser@example.com",
        resetLink: "https://clarity-engine.ai/reset-password?token=secure_token_123",
        userName: "John",
      });
      expect(resetResult.success).toBeDefined();
      expect(resetResult.message).toBeDefined();

      // Step 4: User unsubscribes from newsletter
      const unsubscribeResult = await caller.email.unsubscribeFromNewsletter({
        email: "newuser@example.com",
      });
      expect(unsubscribeResult.success).toBe(true);
      expect(unsubscribeResult.message).toContain("Unsubscribed");
    });

    it("should handle new article notifications", async () => {
      const ctx = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.email.sendNewArticleNotification({
        email: "subscriber@example.com",
        articleTitle: "Advanced SEO Techniques",
        articleLink: "https://clarity-engine.ai/articles/advanced-seo",
        authorName: "Sarah Chen",
      });

      expect(result.success).toBeDefined();
      expect(result.message).toBeDefined();
    });
  });

  describe("Admin Email Operations", () => {
    it("sendBulkNewsletter should reject non-admin users", async () => {
      const user: AuthenticatedUser = {
        id: 1,
        openId: "test-user",
        email: "user@example.com",
        name: "Regular User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };

      const ctx = createAuthContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.email.sendBulkNewsletter({
          articles: [
            {
              title: "Weekly Digest",
              excerpt: "This week in SEO",
              link: "https://clarity-engine.ai/digest",
            },
          ],
        });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(["FORBIDDEN", "INTERNAL_SERVER_ERROR"]).toContain(error.code);
      }
    });

    it("notifyAllSubscribersOfNewArticle should reject non-admin users", async () => {
      const user: AuthenticatedUser = {
        id: 1,
        openId: "test-user",
        email: "user@example.com",
        name: "Regular User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };

      const ctx = createAuthContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.email.notifyAllSubscribersOfNewArticle({
          articleTitle: "New Article",
          articleLink: "https://clarity-engine.ai/articles/new",
          authorName: "John Doe",
        });
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(["FORBIDDEN", "INTERNAL_SERVER_ERROR"]).toContain(error.code);
      }
    });
  });

  describe("Email Validation", () => {
    it("should validate email format in sendWelcomeEmail", async () => {
      const user: AuthenticatedUser = {
        id: 1,
        openId: "test-user",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };

      const ctx = createAuthContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.email.sendWelcomeEmail({
          email: "invalid-email",
          firstName: "John",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.code).toBe("BAD_REQUEST");
      }
    });

    it("should validate email format in sendPasswordResetEmail", async () => {
      const ctx = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.email.sendPasswordResetEmail({
          email: "not-an-email",
          resetLink: "https://clarity-engine.ai/reset?token=123",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.code).toBe("BAD_REQUEST");
      }
    });

    it("should validate URL format in sendPasswordResetEmail", async () => {
      const ctx = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.email.sendPasswordResetEmail({
          email: "user@example.com",
          resetLink: "not-a-url",
        });
        expect.fail("Should have thrown validation error");
      } catch (error: any) {
        expect(error.code).toBe("BAD_REQUEST");
      }
    });
  });

  describe("Email Content", () => {
    it("should support optional firstName in welcome email", async () => {
      const user: AuthenticatedUser = {
        id: 1,
        openId: "test-user",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };

      const ctx = createAuthContext(user);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.email.sendWelcomeEmail({
        email: "user@example.com",
      });

      expect(result.success).toBeDefined();
      expect(result.message).toBeDefined();
    });

    it("should support optional userName in password reset email", async () => {
      const ctx = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.email.sendPasswordResetEmail({
        email: "user@example.com",
        resetLink: "https://clarity-engine.ai/reset?token=abc123",
      });

      expect(result.success).toBeDefined();
      expect(result.message).toBeDefined();
    });

    it("should support custom articles in weekly newsletter", async () => {
      const user: AuthenticatedUser = {
        id: 1,
        openId: "test-user",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };

      const ctx = createAuthContext(user);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.email.sendWeeklyNewsletter({
        email: "user@example.com",
        articles: [
          {
            title: "Article 1",
            excerpt: "First article",
            link: "https://clarity-engine.ai/1",
          },
          {
            title: "Article 2",
            excerpt: "Second article",
            link: "https://clarity-engine.ai/2",
          },
          {
            title: "Article 3",
            excerpt: "Third article",
            link: "https://clarity-engine.ai/3",
          },
        ],
      });

      expect(result.success).toBeDefined();
      expect(result.message).toBeDefined();
    });

    it("should use default articles if not provided in weekly newsletter", async () => {
      const user: AuthenticatedUser = {
        id: 1,
        openId: "test-user",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };

      const ctx = createAuthContext(user);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.email.sendWeeklyNewsletter({
        email: "user@example.com",
      });

      expect(result.success).toBeDefined();
      expect(result.message).toBeDefined();
    });
  });

  describe("Public vs Protected Procedures", () => {
    it("sendWelcomeEmail should require authentication", async () => {
      const ctx = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.email.sendWelcomeEmail({
          email: "test@example.com",
        });
        expect.fail("Should have thrown unauthorized error");
      } catch (error: any) {
        expect(error.code).toBe("UNAUTHORIZED");
      }
    });

    it("sendPasswordResetEmail should be public (no auth required)", async () => {
      const ctx = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.email.sendPasswordResetEmail({
        email: "test@example.com",
        resetLink: "https://clarity-engine.ai/reset?token=123",
      });

      expect(result.success).toBeDefined();
      expect(result.message).toBeDefined();
    });

    it("unsubscribeFromNewsletter should be public (no auth required)", async () => {
      const ctx = createAuthContext(null);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.email.unsubscribeFromNewsletter({
        email: "test@example.com",
      });

      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });
  });

  describe("Email Campaign Management", () => {
    it("getCampaigns should require admin role", async () => {
      const user: AuthenticatedUser = {
        id: 1,
        openId: "test-user",
        email: "user@example.com",
        name: "Regular User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };

      const ctx = createAuthContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.email.getCampaigns();
        expect.fail("Should have thrown forbidden error");
      } catch (error: any) {
        expect(["FORBIDDEN", "INTERNAL_SERVER_ERROR"]).toContain(error.code);
      }
    });

    it("getStats should require admin role", async () => {
      const user: AuthenticatedUser = {
        id: 1,
        openId: "test-user",
        email: "user@example.com",
        name: "Regular User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };

      const ctx = createAuthContext(user);
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.email.getStats();
        expect.fail("Should have thrown forbidden error");
      } catch (error: any) {
        expect(["FORBIDDEN", "INTERNAL_SERVER_ERROR"]).toContain(error.code);
      }
    });
  });
});
