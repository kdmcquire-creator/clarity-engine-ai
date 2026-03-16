import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { mobileDevices, offlineData } from "../../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

export const mobileAppRouter = router({
  // Register device for push notifications
  registerDevice: publicProcedure
    .input(
      z.object({
        deviceId: z.string().min(1).max(500),
        platform: z.enum(["ios", "android"]),
        appVersion: z.string().min(1).max(50),
        pushToken: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      // Check if device already exists
      const existing = await db
        .select()
        .from(mobileDevices)
        .where(eq(mobileDevices.deviceId, input.deviceId));

      if (existing.length > 0) {
        // Update existing device
        await db
          .update(mobileDevices)
          .set({
            pushToken: input.pushToken || null,
            appVersion: input.appVersion,
            lastActiveAt: new Date(),
          })
          .where(eq(mobileDevices.deviceId, input.deviceId));

        return {
          success: true,
          message: "Device updated successfully",
          isNew: false,
        };
      }

      // Create new device
      await db.insert(mobileDevices).values({
        userId: ctx.user?.id || 0,
        deviceId: input.deviceId,
        platform: input.platform,
        appVersion: input.appVersion,
        pushToken: input.pushToken || null,
        isActive: true,
      });

      return {
        success: true,
        message: "Device registered successfully",
        isNew: true,
      };
    }),

  // Get device info
  getDevice: publicProcedure
    .input(z.object({ deviceId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const devices = await db
        .select()
        .from(mobileDevices)
        .where(eq(mobileDevices.deviceId, input.deviceId));

      return devices[0] || null;
    }),

  // Get user's devices
  getUserDevices: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const devices = await db
      .select()
      .from(mobileDevices)
      .where(eq(mobileDevices.userId, ctx.user?.id || 0))
      .orderBy(desc(mobileDevices.lastActiveAt));

    return devices;
  }),

  // Deactivate device
  deactivateDevice: publicProcedure
    .input(z.object({ deviceId: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      await db
        .update(mobileDevices)
        .set({ isActive: false })
        .where(eq(mobileDevices.deviceId, input.deviceId));

      return { success: true };
    }),

  // Save offline data
  saveOfflineData: publicProcedure
    .input(
      z.object({
        deviceId: z.string(),
        dataType: z.string().max(100),
        dataContent: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      await db.insert(offlineData).values({
        userId: ctx.user?.id || 0,
        deviceId: input.deviceId,
        dataType: input.dataType,
        dataContent: input.dataContent,
        isSynced: false,
      });

      return {
        success: true,
        message: "Offline data saved successfully",
      };
    }),

  // Get pending offline data for sync
  getPendingOfflineData: publicProcedure
    .input(z.object({ deviceId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const pendingData = await db
        .select()
        .from(offlineData)
        .where(
          and(
            eq(offlineData.deviceId, input.deviceId),
            eq(offlineData.isSynced, false)
          )
        )
        .orderBy(offlineData.createdAt);

      return pendingData;
    }),

  // Mark offline data as synced
  markOfflineDataSynced: publicProcedure
    .input(z.object({ offlineDataIds: z.array(z.number()) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      for (const id of input.offlineDataIds) {
        await db
          .update(offlineData)
          .set({ isSynced: true, syncedAt: new Date() })
          .where(eq(offlineData.id, id));
      }

      return {
        success: true,
        message: `${input.offlineDataIds.length} items marked as synced`,
      };
    }),

  // Get app configuration for mobile
  getAppConfig: publicProcedure.query(async () => {
    return {
      apiVersion: "1.0.0",
      minAppVersion: "1.0.0",
      features: {
        offlineMode: true,
        pushNotifications: true,
        biometricAuth: true,
        darkMode: true,
      },
      endpoints: {
        api: process.env.BUILT_IN_FORGE_API_URL,
        websocket: process.env.WEBSOCKET_URL || null,
      },
      settings: {
        syncInterval: 300000, // 5 minutes
        cacheExpiry: 86400000, // 24 hours
        maxOfflineDataSize: 52428800, // 50MB
      },
    };
  }),

  // Request push notification permission
  requestPushPermission: publicProcedure
    .input(
      z.object({
        deviceId: z.string(),
        pushToken: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      await db
        .update(mobileDevices)
        .set({ pushToken: input.pushToken })
        .where(eq(mobileDevices.deviceId, input.deviceId));

      return {
        success: true,
        message: "Push notification enabled",
      };
    }),

  // Get device sync status
  getSyncStatus: publicProcedure
    .input(z.object({ deviceId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const device = await db
        .select()
        .from(mobileDevices)
        .where(eq(mobileDevices.deviceId, input.deviceId));

      if (device.length === 0) return null;

      const pendingData = await db
        .select()
        .from(offlineData)
        .where(
          and(
            eq(offlineData.deviceId, input.deviceId),
            eq(offlineData.isSynced, false)
          )
        );

      const syncedData = await db
        .select()
        .from(offlineData)
        .where(
          and(
            eq(offlineData.deviceId, input.deviceId),
            eq(offlineData.isSynced, true)
          )
        );

      return {
        device: device[0],
        pendingItemsCount: pendingData.length,
        syncedItemsCount: syncedData.length,
        lastActiveAt: device[0].lastActiveAt,
        isSyncing: false,
      };
    }),

  // Clear offline data
  clearOfflineData: publicProcedure
    .input(
      z.object({
        deviceId: z.string(),
        dataType: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      if (input.dataType) {
        await db
          .update(offlineData)
          .set({ isSynced: true })
          .where(
            and(
              eq(offlineData.deviceId, input.deviceId),
              eq(offlineData.dataType, input.dataType)
            )
          );
      } else {
        await db
          .update(offlineData)
          .set({ isSynced: true })
          .where(eq(offlineData.deviceId, input.deviceId));
      }

      return {
        success: true,
        message: "Offline data cleared",
      };
    }),

  // Report app crash/error
  reportAppError: publicProcedure
    .input(
      z.object({
        deviceId: z.string(),
        errorMessage: z.string().max(5000),
        stackTrace: z.string().max(10000).optional(),
        appVersion: z.string(),
        timestamp: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      // In production, would save to error tracking service
      console.error("[Mobile App Error]", {
        deviceId: input.deviceId,
        message: input.errorMessage,
        appVersion: input.appVersion,
        timestamp: input.timestamp,
      });

      return {
        success: true,
        message: "Error reported successfully",
      };
    }),

  // Get app analytics
  getAppAnalytics: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const devices = await db
      .select()
      .from(mobileDevices)
      .where(eq(mobileDevices.userId, ctx.user?.id || 0));

    const totalOfflineData = await db
      .select()
      .from(offlineData)
      .where(eq(offlineData.userId, ctx.user?.id || 0));

    return {
      totalDevices: devices.length,
      activeDevices: devices.filter((d) => d.isActive).length,
      totalOfflineDataItems: totalOfflineData.length,
      pendingSync: totalOfflineData.filter((d) => !d.isSynced).length,
      lastSync: devices.length > 0 ? devices[0].lastActiveAt : null,
    };
  }),
});
