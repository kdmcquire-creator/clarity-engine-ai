import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import {
  affiliatePartners,
  affiliateReferrals,
  affiliatePayouts,
} from "../../drizzle/schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";

export const affiliateProgramRouter = router({
  // Apply to affiliate program
  applyToProgram: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        companyName: z.string().min(1).max(255),
        website: z.string().url().optional(),
        trafficPerMonth: z.number().optional(),
        marketingChannels: z.array(z.string()).optional(),
        referralSource: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      // Check if already applied
      const existing = await db
        .select()
        .from(affiliatePartners)
        .where(eq(affiliatePartners.email, input.email));

      if (existing.length > 0) {
        return {
          success: false,
          message: "You have already applied to the affiliate program",
        };
      }

      // Create new affiliate partner application
      await db.insert(affiliatePartners).values({
        userId: ctx.user?.id || null,
        email: input.email,
        companyName: input.companyName,
        status: "pending",
        commissionRate: "10.00", // Default 10% commission
      });

      return {
        success: true,
        message:
          "Application submitted successfully! We will review and get back to you within 48 hours.",
      };
    }),

  // Get affiliate partner details
  getPartnerDetails: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const partners = await db
      .select()
      .from(affiliatePartners)
      .where(eq(affiliatePartners.userId, ctx.user?.id || 0));

    if (partners.length === 0) return null;

    const partner = partners[0];

    // Get referrals
    const referrals = await db
      .select()
      .from(affiliateReferrals)
      .where(eq(affiliateReferrals.partnerId, partner.id));

    // Get payouts
    const payouts = await db
      .select()
      .from(affiliatePayouts)
      .where(eq(affiliatePayouts.partnerId, partner.id));

    const totalEarnings = referrals.reduce((sum, ref) => {
      const commission = ref.commissionEarned ? parseFloat(ref.commissionEarned.toString()) : 0;
      return sum + commission;
    }, 0);

    const pendingPayouts = payouts
      .filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + parseFloat(p.amount.toString()), 0);

    return {
      ...partner,
      referralCount: referrals.length,
      convertedCount: referrals.filter((r) => r.status === "converted").length,
      totalEarnings,
      pendingPayouts,
      recentReferrals: referrals.slice(-5),
    };
  }),

  // Get referral code
  getReferralCode: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const partners = await db
      .select()
      .from(affiliatePartners)
      .where(eq(affiliatePartners.userId, ctx.user?.id || 0));

    if (partners.length === 0) return null;

    const partner = partners[0];

    // Check if referral code exists
    const codes = await db
      .select()
      .from(affiliateReferrals)
      .where(eq(affiliateReferrals.partnerId, partner.id));

    if (codes.length === 0) {
      // Generate new referral code
      const code = `CLARITY${partner.id}${Date.now().toString(36).toUpperCase()}`;

      await db.insert(affiliateReferrals).values({
        partnerId: partner.id,
        referralCode: code,
        status: "pending",
      });

      return {
        code,
        url: `https://clarity-engine.ai?ref=${code}`,
      };
    }

    const firstCode = codes[0];
    return {
      code: firstCode.referralCode,
      url: `https://clarity-engine.ai?ref=${firstCode.referralCode}`,
    };
  }),

  // Track referral click
  trackReferralClick: publicProcedure
    .input(z.object({ referralCode: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      const referrals = await db
        .select()
        .from(affiliateReferrals)
        .where(eq(affiliateReferrals.referralCode, input.referralCode));

      if (referrals.length === 0) {
        return { success: false, message: "Invalid referral code" };
      }

      // Log the click (in production, would track in analytics)
      console.log(`[Affiliate] Referral click: ${input.referralCode}`);

      return { success: true };
    }),

  // Convert referral
  convertReferral: publicProcedure
    .input(
      z.object({
        referralCode: z.string(),
        userId: z.number(),
        conversionValue: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      const referrals = await db
        .select()
        .from(affiliateReferrals)
        .where(eq(affiliateReferrals.referralCode, input.referralCode));

      if (referrals.length === 0) {
        return { success: false, message: "Invalid referral code" };
      }

      const referral = referrals[0];
      const partner = await db
        .select()
        .from(affiliatePartners)
        .where(eq(affiliatePartners.id, referral.partnerId));

      if (partner.length === 0) {
        return { success: false, message: "Partner not found" };
      }

      const commissionRate = parseFloat((partner[0].commissionRate || "10").toString()) / 100;
      const commissionEarned = input.conversionValue * commissionRate;

      // Update referral
      await db
        .update(affiliateReferrals)
        .set({
          referredUserId: input.userId,
          status: "converted",
          conversionValue: input.conversionValue.toString(),
          commissionEarned: commissionEarned.toString(),
          convertedAt: new Date(),
        })
        .where(eq(affiliateReferrals.id, referral.id));

      // Update partner earnings
      const currentEarnings = parseFloat(
        partner[0].totalEarnings?.toString() || "0"
      );
      await db
        .update(affiliatePartners)
        .set({ totalEarnings: (currentEarnings + commissionEarned).toString() })
        .where(eq(affiliatePartners.id, partner[0].id));

      return {
        success: true,
        message: "Referral converted successfully",
        commissionEarned,
      };
    }),

  // Get marketing materials
  getMarketingMaterials: publicProcedure.query(async () => {
    return {
      banners: [
        {
          id: "banner_1",
          title: "Master Your SEO",
          description: "Free, powerful SEO tools for everyone",
          size: "728x90",
          url: "https://clarity-engine.ai/banner-728x90.png",
        },
        {
          id: "banner_2",
          title: "Clarity Engine - SEO Tools",
          description: "Get ahead with AI-powered SEO analysis",
          size: "300x250",
          url: "https://clarity-engine.ai/banner-300x250.png",
        },
        {
          id: "banner_3",
          title: "Free SEO Tools",
          description: "Keyword research, competitor analysis, and more",
          size: "160x600",
          url: "https://clarity-engine.ai/banner-160x600.png",
        },
      ],
      emailTemplates: [
        {
          id: "email_1",
          title: "Product Launch Email",
          subject: "Introducing Clarity Engine - Your Free SEO Toolkit",
          preview:
            "Master SEO with our free, powerful tools. No credit card required.",
        },
        {
          id: "email_2",
          title: "Feature Highlight Email",
          subject: "New: AI-Powered Content Optimizer",
          preview:
            "Analyze and improve your content with AI in seconds. Try it free.",
        },
        {
          id: "email_3",
          title: "Case Study Email",
          subject: "How [Company] Increased Rankings 45% in 3 Months",
          preview:
            "See real results from Clarity Engine users. Read the full case study.",
        },
      ],
      socialMedia: [
        {
          platform: "Twitter",
          content:
            "Just discovered @ClarityEngine - the free SEO toolkit that actually works. Keyword research, competitor analysis, content optimization... all free. {{referral_link}}",
        },
        {
          platform: "LinkedIn",
          content:
            "If you're serious about SEO, you need to check out Clarity Engine. Their free tools rival paid platforms. Here's my referral link: {{referral_link}}",
        },
        {
          platform: "Facebook",
          content:
            "Stop paying for expensive SEO tools. Clarity Engine gives you everything you need for free. {{referral_link}}",
        },
      ],
      resources: [
        {
          id: "guide_1",
          title: "Affiliate Program Guide",
          description: "Complete guide to earning with Clarity Engine",
          url: "https://clarity-engine.ai/affiliate-guide.pdf",
        },
        {
          id: "guide_2",
          title: "Commission Structure",
          description: "Detailed breakdown of commission rates and payouts",
          url: "https://clarity-engine.ai/commission-structure.pdf",
        },
        {
          id: "guide_3",
          title: "Best Practices",
          description: "Top strategies for maximizing referral conversions",
          url: "https://clarity-engine.ai/affiliate-best-practices.pdf",
        },
      ],
    };
  }),

  // Request payout
  requestPayout: protectedProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        paymentMethod: z.enum(["stripe", "bank_transfer", "paypal"]),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      const partners = await db
        .select()
        .from(affiliatePartners)
        .where(eq(affiliatePartners.userId, ctx.user?.id || 0));

      if (partners.length === 0) {
        return { success: false, message: "Partner not found" };
      }

      const partner = partners[0];
      const totalEarnings = parseFloat(partner.totalEarnings?.toString() || "0");

      if (input.amount > totalEarnings) {
        return {
          success: false,
          message: "Payout amount exceeds available earnings",
        };
      }

      // Create payout request
      await db.insert(affiliatePayouts).values({
        partnerId: partner.id,
        amount: input.amount.toString(),
        paymentMethod: input.paymentMethod,
        status: "pending",
        notes: input.notes || null,
      });

      return {
        success: true,
        message: "Payout request submitted. We will process it within 5-7 business days.",
      };
    }),

  // Get payout history
  getPayoutHistory: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const partners = await db
      .select()
      .from(affiliatePartners)
      .where(eq(affiliatePartners.userId, ctx.user?.id || 0));

    if (partners.length === 0) return [];

    const payouts = await db
      .select()
      .from(affiliatePayouts)
      .where(eq(affiliatePayouts.partnerId, partners[0].id))
      .orderBy(desc(affiliatePayouts.createdAt));

    return payouts;
  }),

  // Get referral analytics
  getReferralAnalytics: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const partners = await db
      .select()
      .from(affiliatePartners)
      .where(eq(affiliatePartners.userId, ctx.user?.id || 0));

    if (partners.length === 0) return null;

    const partner = partners[0];
    const referrals = await db
      .select()
      .from(affiliateReferrals)
      .where(eq(affiliateReferrals.partnerId, partner.id));

    const totalClicks = referrals.length;
    const totalConversions = referrals.filter((r) => r.status === "converted")
      .length;
    const conversionRate =
      totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : "0";

    const totalEarnings = referrals.reduce((sum, ref) => {
      const commission = ref.commissionEarned ? parseFloat(ref.commissionEarned.toString()) : 0;
      return sum + commission;
    }, 0);

    // Group by month
    const byMonth: Record<string, number> = {};
    referrals.forEach((ref) => {
      const month = ref.createdAt.toISOString().slice(0, 7);
      byMonth[month] = (byMonth[month] || 0) + 1;
    });

    return {
      totalReferrals: totalClicks,
      totalConversions,
      conversionRate: `${conversionRate}%`,
      totalEarnings,
      averageOrderValue:
        totalConversions > 0
          ? (
              referrals
                .filter((r) => r.status === "converted")
                .reduce((sum, r) => sum + parseFloat(r.conversionValue?.toString() || "0"), 0) /
              totalConversions
            ).toFixed(2)
          : "0",
      referralsByMonth: byMonth,
      topReferrals: referrals
        .filter((r) => r.status === "converted")
        .sort(
          (a, b) =>
            parseFloat(b.conversionValue?.toString() || "0") -
            parseFloat(a.conversionValue?.toString() || "0")
        )
        .slice(0, 5),
    };
  }),

  // Update partner profile
  updatePartnerProfile: protectedProcedure
    .input(
      z.object({
        companyName: z.string().optional(),
        website: z.string().url().optional(),
        bankDetails: z.string().optional(),
        taxId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database connection failed");

      const partners = await db
        .select()
        .from(affiliatePartners)
        .where(eq(affiliatePartners.userId, ctx.user?.id || 0));

      if (partners.length === 0) {
        return { success: false, message: "Partner not found" };
      }

      const updates: any = {};
      if (input.companyName) updates.companyName = input.companyName;
      if (input.bankDetails) updates.bankDetails = input.bankDetails;
      if (input.taxId) updates.taxId = input.taxId;

      await db
        .update(affiliatePartners)
        .set(updates)
        .where(eq(affiliatePartners.id, partners[0].id));

      return {
        success: true,
        message: "Profile updated successfully",
      };
    }),

  // Get program terms
  getProgramTerms: publicProcedure.query(async () => {
    return {
      commissionStructure: {
        tier1: {
          name: "Standard",
          rate: "10%",
          requirements: "No minimum",
          description: "Perfect for getting started",
        },
        tier2: {
          name: "Professional",
          rate: "15%",
          requirements: "50+ conversions per month",
          description: "For active promoters",
        },
        tier3: {
          name: "Elite",
          rate: "20%",
          requirements: "200+ conversions per month",
          description: "For top performers",
        },
      },
      payoutTerms: {
        minimumPayout: "$50",
        frequency: "Monthly (5th of each month)",
        methods: ["Stripe", "Bank Transfer", "PayPal"],
        processingTime: "5-7 business days",
      },
      cookiePolicy: {
        duration: "30 days",
        description:
          "Referral credits are valid for 30 days from click. Conversion must occur within this window.",
      },
      restrictions: [
        "No paid search bidding on brand terms",
        "No misleading claims about Clarity Engine",
        "No spam or unsolicited marketing",
        "No trademark usage without permission",
      ],
      support: {
        email: "affiliates@clarity-engine.ai",
        slack: "https://clarity-engine-affiliates.slack.com",
        hours: "Monday-Friday, 9am-5pm EST",
      },
    };
  }),
});
