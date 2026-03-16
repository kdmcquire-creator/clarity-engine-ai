import sgMail from "@sendgrid/mail";
import { getDb } from "./db";
import { emailSubscriptions } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = "noreply@em7072.clarity-engine.ai";
const FROM_NAME = "Clarity Engine Team";

// SendGrid Dynamic Template IDs
const TEMPLATE_IDS = {
  welcome: "d-3650aed48e8547668fe798a4fed1bbc5",
  passwordReset: "d-629dfbab946c462bbbf1b6ffc63f6113",
  newsletter: "d-8174c8327e9b40a4a2dbc0193d1402b4",
};

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Send welcome email using SendGrid dynamic template
export async function sendWelcomeEmail(email: string, subscriberName?: string): Promise<boolean> {
  try {
    if (!SENDGRID_API_KEY) {
      console.warn("[Email] SendGrid API key not configured, skipping email");
      return false;
    }

    const firstName = subscriberName?.split(" ")[0] || "there";

    await sgMail.send({
      to: email,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      templateId: TEMPLATE_IDS.welcome,
      dynamicTemplateData: {
        firstName: firstName,
      },
      replyTo: "support@clarity-engine.ai",
    });

    console.log(`[Email] Welcome email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send welcome email:", error);
    return false;
  }
}

// Send password reset email using SendGrid dynamic template
export async function sendPasswordResetEmail(email: string, resetLink: string, userName?: string): Promise<boolean> {
  try {
    if (!SENDGRID_API_KEY) {
      console.warn("[Email] SendGrid API key not configured, skipping email");
      return false;
    }

    const firstName = userName?.split(" ")[0] || "there";

    await sgMail.send({
      to: email,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      templateId: TEMPLATE_IDS.passwordReset,
      dynamicTemplateData: {
        firstName: firstName,
        resetLink: resetLink,
      },
      replyTo: "support@clarity-engine.ai",
    });

    console.log(`[Email] Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send password reset email:", error);
    return false;
  }
}

// Send weekly newsletter using SendGrid dynamic template
export async function sendWeeklyNewsletter(
  email: string,
  articles: Array<{ title: string; excerpt: string; link: string }>
): Promise<boolean> {
  try {
    if (!SENDGRID_API_KEY) {
      console.warn("[Email] SendGrid API key not configured, skipping email");
      return false;
    }

    const firstName = email.split("@")[0];

    await sgMail.send({
      to: email,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      templateId: TEMPLATE_IDS.newsletter,
      dynamicTemplateData: {
        firstName: firstName,
        articles: articles,
      },
      replyTo: "support@clarity-engine.ai",
    });

    console.log(`[Email] Weekly newsletter sent to ${email}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send weekly newsletter:", error);
    return false;
  }
}

// Send new article notification
export async function sendNewArticleNotification(
  email: string,
  articleTitle: string,
  articleLink: string,
  authorName: string
): Promise<boolean> {
  try {
    if (!SENDGRID_API_KEY) {
      console.warn("[Email] SendGrid API key not configured, skipping email");
      return false;
    }

    const firstName = email.split("@")[0];

    await sgMail.send({
      to: email,
      from: {
        email: FROM_EMAIL,
        name: FROM_NAME,
      },
      subject: `New Article: ${articleTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { background: #f9f9f9; padding: 30px; margin-top: 20px; border-radius: 8px; }
              .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
              .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✨ New Article Published</h1>
              </div>
              
              <div class="content">
                <p>Hi ${firstName},</p>
                <p>We just published a new article you might find interesting:</p>
                
                <div style="margin: 30px 0; padding: 20px; background: white; border-left: 4px solid #667eea; border-radius: 4px;">
                  <h2 style="margin: 0 0 10px 0; color: #333;">${articleTitle}</h2>
                  <p style="margin: 0; color: #666; font-size: 14px;">By <strong>${authorName}</strong></p>
                </div>
                
                <a href="${articleLink}" class="cta-button">Read the Full Article</a>
                
                <p style="color: #666; font-size: 14px;">Explore more articles and tools on <a href="https://clarity-engine.ai" style="color: #667eea; text-decoration: none;">Clarity Engine</a></p>
              </div>
              
              <div class="footer">
                <p><a href="https://clarity-engine.ai/unsubscribe" style="color: #999; text-decoration: none;">Unsubscribe</a> | <a href="https://clarity-engine.ai/preferences" style="color: #999; text-decoration: none;">Manage Preferences</a></p>
                <p>&copy; 2026 Clarity Engine. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `New Article: ${articleTitle}\n\nBy ${authorName}\n\nRead it here: ${articleLink}`,
      replyTo: "support@clarity-engine.ai",
    });

    console.log(`[Email] New article notification sent to ${email}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send new article notification:", error);
    return false;
  }
}

// Subscribe to emails
export async function subscribeToEmails(email: string): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    await db.insert(emailSubscriptions).values({
      email,
      subscribed: true,
    });

    console.log(`[Email] Subscribed: ${email}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to subscribe:", error);
    return false;
  }
}

// Unsubscribe from emails
export async function unsubscribeFromEmails(email: string): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    await db.update(emailSubscriptions).set({ subscribed: false }).where(eq(emailSubscriptions.email, email));

    console.log(`[Email] Unsubscribed: ${email}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to unsubscribe:", error);
    return false;
  }
}

// Get active subscribers
export async function getActiveSubscribers(): Promise<Array<{ email: string }>> {
  try {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const subscribers = await db
      .select({ email: emailSubscriptions.email })
      .from(emailSubscriptions)
      .where(eq(emailSubscriptions.subscribed, true));

    return subscribers;
  } catch (error) {
    console.error("[Email] Failed to get subscribers:", error);
    return [];
  }
}

// Send bulk newsletter to all subscribers
export async function sendBulkNewsletter(articles: Array<{ title: string; excerpt: string; link: string }>): Promise<number> {
  try {
    const subscribers = await getActiveSubscribers();
    let successCount = 0;

    for (const subscriber of subscribers) {
      const success = await sendWeeklyNewsletter(subscriber.email, articles);
      if (success) successCount++;
    }

    console.log(`[Email] Bulk newsletter sent to ${successCount}/${subscribers.length} subscribers`);
    return successCount;
  } catch (error) {
    console.error("[Email] Failed to send bulk newsletter:", error);
    return 0;
  }
}

// Notify all subscribers of new article
export async function notifyAllSubscribersOfNewArticle(
  articleTitle: string,
  articleLink: string,
  authorName: string
): Promise<number> {
  try {
    const subscribers = await getActiveSubscribers();
    let successCount = 0;

    for (const subscriber of subscribers) {
      const success = await sendNewArticleNotification(subscriber.email, articleTitle, articleLink, authorName);
      if (success) successCount++;
    }

    console.log(`[Email] Article notification sent to ${successCount}/${subscribers.length} subscribers`);
    return successCount;
  } catch (error) {
    console.error("[Email] Failed to notify subscribers:", error);
    return 0;
  }
}
