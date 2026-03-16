import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(isAuthenticated = false): { ctx: TrpcContext } {
  const user: AuthenticatedUser | null = isAuthenticated ? {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  } : null;

  const ctx: TrpcContext = {
    user: user as any,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("comments", () => {
  it("creates a comment from unauthenticated user with approved=false", async () => {
    const { ctx } = createAuthContext(false);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.comments.create({
      articleId: 1,
      userName: "John Doe",
      userEmail: "john@example.com",
      content: "Great article!",
    });

    expect(result).toEqual({
      success: true,
      message: "Thank you for your comment. It will appear after moderation.",
    });
  });

  it("creates a comment from authenticated user with approved=true", async () => {
    const { ctx } = createAuthContext(true);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.comments.create({
      articleId: 1,
      userName: "Test User",
      userEmail: "test@example.com",
      content: "This is a great SEO tip!",
    });

    expect(result).toEqual({
      success: true,
      message: "Comment posted successfully!",
    });
  });

  it("validates comment content length", async () => {
    const { ctx } = createAuthContext(false);
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.comments.create({
        articleId: 1,
        userName: "John Doe",
        userEmail: "john@example.com",
        content: "",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Too small");
    }
  });

  it("validates email format", async () => {
    const { ctx } = createAuthContext(false);
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.comments.create({
        articleId: 1,
        userName: "John Doe",
        userEmail: "invalid-email",
        content: "Great article!",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Invalid");
    }
  });
});
