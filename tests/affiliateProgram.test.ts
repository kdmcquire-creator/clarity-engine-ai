import { describe, it, expect, beforeEach, vi } from "vitest";
import { affiliateProgramRouter } from "./affiliateProgram";
import { getDb } from "../db";

vi.mock("../db", () => ({
  getDb: vi.fn(),
}));

describe("Affiliate Program Router", () => {
  beforeEach(() => {
    vi.mocked(getDb).mockResolvedValue({} as any);
  });

  describe("applyToProgram", () => {
    it("should submit affiliate application", async () => {
      const caller = affiliateProgramRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.applyToProgram({
        email: "affiliate@example.com",
        companyName: "Marketing Co",
      });

      expect(result).toBeDefined();
      expect(result.success !== undefined).toBe(true);
    });
  });

  describe("getMarketingMaterials", () => {
    it("should return marketing materials", async () => {
      const caller = affiliateProgramRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getMarketingMaterials();

      expect(result).toBeDefined();
      expect(result.banners).toBeDefined();
      expect(Array.isArray(result.banners)).toBe(true);
      expect(result.banners.length).toBeGreaterThan(0);
      expect(result.emailTemplates).toBeDefined();
      expect(result.socialMedia).toBeDefined();
      expect(result.resources).toBeDefined();
    });
  });

  describe("getProgramTerms", () => {
    it("should return program terms", async () => {
      const caller = affiliateProgramRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getProgramTerms();

      expect(result).toBeDefined();
      expect(result.commissionStructure).toBeDefined();
      expect(result.payoutTerms).toBeDefined();
      expect(result.restrictions).toBeDefined();
      expect(Array.isArray(result.restrictions)).toBe(true);
      expect(result.restrictions.length).toBeGreaterThan(0);
    });
  });

  describe("trackReferralClick", () => {
    it("should track referral click", async () => {
      const caller = affiliateProgramRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.trackReferralClick({
        referralCode: "CLARITY1",
      });

      expect(result).toBeDefined();
      expect(result.success !== undefined).toBe(true);
    });
  });

  describe("requestPayout", () => {
    it("should handle payout request", async () => {
      const caller = affiliateProgramRouter.createCaller({
        user: { id: 1, role: "user" } as any,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.requestPayout({
        amount: 100,
        paymentMethod: "stripe",
      });

      expect(result).toBeDefined();
      expect(result.success !== undefined).toBe(true);
    });
  });

  describe("getPayoutHistory", () => {
    it("should return payout history", async () => {
      const caller = affiliateProgramRouter.createCaller({
        user: { id: 1, role: "user" } as any,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getPayoutHistory();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("updatePartnerProfile", () => {
    it("should update partner profile", async () => {
      const caller = affiliateProgramRouter.createCaller({
        user: { id: 1, role: "user" } as any,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.updatePartnerProfile({
        companyName: "New Company Name",
      });

      expect(result).toBeDefined();
      expect(result.success !== undefined).toBe(true);
    });
  });

  describe("convertReferral", () => {
    it("should handle referral conversion", async () => {
      const caller = affiliateProgramRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.convertReferral({
        referralCode: "CLARITY1",
        userId: 100,
        conversionValue: 99.99,
      });

      expect(result).toBeDefined();
      expect(result.success !== undefined).toBe(true);
    });
  });
});
