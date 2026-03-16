import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import sgMail from "@sendgrid/mail";
import { getPublishedArticles, getArticleBySlug, getArticleComments, createComment, subscribeEmail, getTeamMembers } from "./db";
import { stripeRouter } from "./routers/stripe";
import { emailRouter } from "./routers/email";
import { affiliateRouter } from "./routers/affiliate";
import { contentBriefRouter } from "./routers/contentBrief";
import { collaborationRouter } from "./routers/collaboration";
import { calendarRouter } from "./routers/calendar";
import { analyticsRouter } from "./routers/analytics";
import { repurposingRouter } from "./routers/repurposing";
import { competitorsRouter } from "./routers/competitors";
import { communityRouter } from "./routers/community";
import { chatAIRouter } from "./routers/chatAI";
import { mobileAppRouter } from "./routers/mobileApp";
import { affiliateProgramRouter } from "./routers/affiliateProgram";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Articles router
  articles: router({
    list: publicProcedure.query(async () => {
      return await getPublishedArticles(20);
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getArticleBySlug(input.slug);
      }),
  }),

  // Comments router
  comments: router({
    getByArticleId: publicProcedure
      .input(z.object({ articleId: z.number() }))
      .query(async ({ input }) => {
        return await getArticleComments(input.articleId);
      }),
    
    create: publicProcedure
      .input(z.object({
        articleId: z.number(),
        userName: z.string().min(1).max(255),
        userEmail: z.string().email(),
        content: z.string().min(1).max(5000),
      }))
      .mutation(async ({ input, ctx }) => {
        await createComment({
          articleId: input.articleId,
          userId: ctx.user?.id,
          userName: input.userName,
          userEmail: input.userEmail,
          content: input.content,
          approved: ctx.user ? true : false,
        });
        return { 
          success: true, 
          message: ctx.user ? "Comment posted successfully!" : "Thank you for your comment. It will appear after moderation." 
        };
      }),
  }),

  // Email subscriptions router
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        source: z.string().optional(),
        articleTitle: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await subscribeEmail(input.email, ctx.user?.id);
        console.log(`[Newsletter] New subscriber: ${input.email} from ${input.source || 'direct'}`);
        return { success: true };
      }),
  }),

  // Team router
  team: router({
    list: publicProcedure.query(async () => {
      return await getTeamMembers();
    }),
  }),

  // Test Email router
  testEmail: router({
    send: protectedProcedure
      .input(z.object({
        recipientEmail: z.string().email(),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
          
          const msg = {
            to: input.recipientEmail,
            from: "noreply@em7072.clarity-engine.ai",
            subject: "Clarity Engine - Test Email",
            text: "This is a test email from Clarity Engine. If you received this, your email integration is working!",
            html: "<strong>This is a test email from Clarity Engine.</strong><br/>If you received this, your email integration is working!",
          };
          
          await sgMail.send(msg);
          console.log("[Test Email] Sent successfully to", input.recipientEmail);
          return { success: true, message: "Test email sent successfully!" };
        } catch (error) {
          console.error("[Test Email] Error:", error);
          throw new Error(`Failed to send test email: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }),
  }),

  // Chat AI router
  chat: chatAIRouter,

  // Mobile App router
  mobileApp: mobileAppRouter,

  // Affiliate Program router
  affiliateProgram: affiliateProgramRouter,

  // Stripe router
  stripe: stripeRouter,

  // Email router
  email: emailRouter,

  // Affiliate router
  affiliate: affiliateRouter,

  // Content Brief router
  contentBrief: contentBriefRouter,
  collaboration: collaborationRouter,
  calendar: calendarRouter,
  analytics: analyticsRouter,
  repurposing: repurposingRouter,
  competitors: competitorsRouter,
  community: communityRouter,
});

export type AppRouter = typeof appRouter;
