import { describe, it, expect, beforeEach, vi } from "vitest";
import { mobileAppRouter } from "./mobileApp";
import { getDb } from "../db";

vi.mock("../db", () => ({
  getDb: vi.fn(),
}));

describe("Mobile App Router", () => {
  beforeEach(() => {
    vi.mocked(getDb).mockResolvedValue({} as any);
  });

  describe("registerDevice", () => {
    it("should register a new device", async () => {
      const caller = mobileAppRouter.createCaller({
        user: { id: 1, role: "user" } as any,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.registerDevice({
        deviceId: "device_123",
        platform: "ios",
        appVersion: "1.0.0",
        pushToken: "token_123",
      });

      expect(result.success).toBe(true);
      expect(result.isNew).toBeDefined();
    });
  });

  describe("getDevice", () => {
    it("should return device info", async () => {
      const caller = mobileAppRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getDevice({ deviceId: "device_123" });

      // Result can be null or device object
      expect(result === null || typeof result === "object").toBe(true);
    });
  });

  describe("saveOfflineData", () => {
    it("should save offline data", async () => {
      const caller = mobileAppRouter.createCaller({
        user: { id: 1, role: "user" } as any,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.saveOfflineData({
        deviceId: "device_123",
        dataType: "search_result",
        dataContent: JSON.stringify({ query: "SEO tips" }),
      });

      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
    });
  });

  describe("getAppConfig", () => {
    it("should return app configuration", async () => {
      const caller = mobileAppRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.getAppConfig();

      expect(result).toBeDefined();
      expect(result.apiVersion).toBe("1.0.0");
      expect(result.features).toBeDefined();
      expect(result.features.offlineMode).toBe(true);
      expect(result.settings).toBeDefined();
    });
  });

  describe("reportAppError", () => {
    it("should report app error", async () => {
      const caller = mobileAppRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.reportAppError({
        deviceId: "device_123",
        errorMessage: "App crashed",
        appVersion: "1.0.0",
        timestamp: new Date(),
      });

      expect(result.success).toBe(true);
    });
  });

  describe("deactivateDevice", () => {
    it("should deactivate a device", async () => {
      const caller = mobileAppRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.deactivateDevice({
        deviceId: "device_123",
      });

      expect(result.success).toBe(true);
    });
  });

  describe("clearOfflineData", () => {
    it("should clear offline data", async () => {
      const caller = mobileAppRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.clearOfflineData({
        deviceId: "device_123",
      });

      expect(result.success).toBe(true);
    });
  });

  describe("requestPushPermission", () => {
    it("should request push permission", async () => {
      const caller = mobileAppRouter.createCaller({
        user: null,
        req: {} as any,
        res: {} as any,
      });

      const result = await caller.requestPushPermission({
        deviceId: "device_123",
        pushToken: "token_456",
      });

      expect(result.success).toBe(true);
    });
  });
});
