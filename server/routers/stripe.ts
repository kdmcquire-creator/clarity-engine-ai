import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
//   apiVersion: "2026-02-25.clover",
// });

export const stripeRouter = router({
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        tier: z.enum(["pro", "enterprise"]),
        origin: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { tier, origin } = input;

      const priceMap: Record<string, string> = {
        pro: process.env.STRIPE_PRO_PRICE_ID || "price_pro",
        enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID || "price_enterprise",
      };

      const session = await (stripe.checkout.sessions.create as any)({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceMap[tier],
            quantity: 1,
          },
        ],
        customer_email: ctx.user.email || undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          tier: tier,
          email: ctx.user.email || "unknown",
        },
        success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
        allow_promotion_codes: true,
      });

      return {
        sessionId: session.id,
        url: session.url,
      };
    }),

  getSubscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    return {
      status: "active",
      tier: "pro",
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
  }),
});
