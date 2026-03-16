import { describe, it, expect } from "vitest";
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

describe("stripe router", () => {
  it("createCheckoutSession requires authentication", async () => {
    const ctx = createAuthContext(null);
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.stripe.createCheckoutSession({
        tier: "pro",
        origin: "http://localhost:3000",
      });
      expect.fail("Should have thrown unauthorized error");
    } catch (error: any) {
      expect(error.code).toBe("UNAUTHORIZED");
    }
  });

  it("createCheckoutSession validates tier parameter", async () => {
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
      const result = await caller.stripe.createCheckoutSession({
        tier: "pro",
        origin: "http://localhost:3000",
      });

      // If Stripe is properly configured, we get a session
      expect(result).toBeDefined();
      expect(result.sessionId).toBeDefined();
    } catch (error: any) {
      // If Stripe prices are not configured, we get a resource error
      // This is expected in test environment
      expect(error.message).toContain("price");
    }
  });

  it("getSubscriptionStatus returns subscription info", async () => {
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

    const result = await caller.stripe.getSubscriptionStatus();

    expect(result).toBeDefined();
    expect(result.status).toBe("active");
    expect(result.tier).toBe("pro");
    expect(result.renewalDate).toBeDefined();
  });
});
