import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";

const sgMail = require("@sendgrid/mail");

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      try {
        const apiKey = process.env.SENDGRID_API_KEY;
        if (!apiKey) {
          throw new Error("SendGrid API key not configured");
        }

        sgMail.setApiKey(apiKey);

        const msg = {
          to: input.email,
          from: "hello@clarityengine.io",
          subject: "Welcome to Clarity Engine Newsletter",
          html: `
            <h1>Welcome to Clarity Engine!</h1>
            <p>Thank you for subscribing to our newsletter.</p>
            <p>We'll send you weekly SEO tips, tool updates, and exclusive resources to help you master search engine optimization.</p>
            <p>Best regards,<br/>The Clarity Engine Team</p>
          `,
        };

        await sgMail.send(msg);

        return { success: true, message: "Successfully subscribed to newsletter" };
      } catch (error) {
        console.error("Newsletter subscription error:", error);
        throw new Error("Failed to subscribe to newsletter");
      }
    }),
});
