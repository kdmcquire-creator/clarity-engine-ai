/**
 * Email Trigger System
 * 
 * Manages automated email triggers based on user actions
 * Sends emails at the right time to maximize engagement and conversions
 */

import sgMail from "@sendgrid/mail";
import { getEmailTemplate, replaceTemplateVariables, EmailTemplateType } from "./sendgrid-templates";
import { getDb } from "./db";

// Initialize SendGrid
const sendgridApiKey = process.env.SENDGRID_API_KEY;
if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

export interface EmailTriggerData {
  userId: string;
  email: string;
  firstName: string;
  triggerType: EmailTriggerType;
  variables?: Record<string, string>;
  delay?: number; // milliseconds to delay sending
}

export type EmailTriggerType =
  | "welcome"
  | "newsletter"
  | "certification_earned"
  | "upgrade_suggestion"
  | "abandoned_checkout"
  | "custom";

/**
 * Send email based on trigger
 */
export async function sendEmailTrigger(data: EmailTriggerData): Promise<boolean> {
  try {
    if (!sendgridApiKey) {
      console.warn("[Email] SendGrid API key not configured");
      return false;
    }

    // Map trigger type to template
    const templateMap: Record<EmailTriggerType, EmailTemplateType> = {
      welcome: "welcome",
      newsletter: "newsletter",
      certification_earned: "certificationAlert",
      upgrade_suggestion: "upgradeSuggestion",
      abandoned_checkout: "abandonedCheckout",
      custom: "welcome", // fallback
    };

    const templateType = templateMap[data.triggerType];
    const template = getEmailTemplate(templateType);

    // Replace variables in template
    const defaultVariables = {
      firstName: data.firstName,
      appUrl: process.env.VITE_FRONTEND_FORGE_API_URL || "https://clarity-engine.ai",
      unsubscribeUrl: `https://clarity-engine.ai/unsubscribe?email=${encodeURIComponent(data.email)}`,
      preferencesUrl: `https://clarity-engine.ai/email-preferences?email=${encodeURIComponent(data.email)}`,
      ...data.variables,
    };

    const htmlContent = replaceTemplateVariables(template.htmlContent, defaultVariables);
    const subject = replaceTemplateVariables(template.subject, defaultVariables);

    // Send email
    const message = {
      to: data.email,
      from: "noreply@clarity-engine.ai",
      subject,
      html: htmlContent,
      replyTo: "support@clarity-engine.ai",
    };

    await sgMail.send(message);

    // Log email send
    await logEmailSend({
      userId: data.userId,
      email: data.email,
      triggerType: data.triggerType,
      subject,
      status: "sent",
    });

    console.log(`[Email] ${data.triggerType} email sent to ${data.email}`);
    return true;
  } catch (error) {
    console.error(`[Email] Failed to send ${data.triggerType} email:`, error);

    // Log failed send
    await logEmailSend({
      userId: data.userId,
      email: data.email,
      triggerType: data.triggerType,
      subject: data.triggerType,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return false;
  }
}

/**
 * Schedule email to send after delay
 */
export function scheduleEmailTrigger(data: EmailTriggerData, delay: number = 0) {
  if (delay > 0) {
    setTimeout(() => {
      sendEmailTrigger(data);
    }, delay);
  } else {
    sendEmailTrigger(data);
  }
}

/**
 * Send welcome email on user signup
 */
export async function sendWelcomeEmail(userId: string, email: string, firstName: string) {
  return sendEmailTrigger({
    userId,
    email,
    firstName,
    triggerType: "welcome",
  });
}

/**
 * Send certification earned email
 */
export async function sendCertificationEmail(
  userId: string,
  email: string,
  firstName: string,
  certificationName: string,
  certificationTopic: string
) {
  return sendEmailTrigger({
    userId,
    email,
    firstName,
    triggerType: "certification_earned",
    variables: {
      certificationName,
      certificationTopic,
    },
  });
}

/**
 * Send upgrade suggestion email (7 days after signup)
 */
export async function sendUpgradeSuggestionEmail(userId: string, email: string, firstName: string) {
  // Schedule for 7 days later
  scheduleEmailTrigger(
    {
      userId,
      email,
      firstName,
      triggerType: "upgrade_suggestion",
    },
    7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  );
}

/**
 * Send abandoned checkout email (1 hour after checkout started)
 */
export async function sendAbandonedCheckoutEmail(
  userId: string,
  email: string,
  firstName: string,
  checkoutUrl: string
) {
  // Schedule for 1 hour later
  scheduleEmailTrigger(
    {
      userId,
      email,
      firstName,
      triggerType: "abandoned_checkout",
      variables: {
        checkoutUrl,
      },
    },
    60 * 60 * 1000 // 1 hour in milliseconds
  );
}

/**
 * Send weekly newsletter
 */
export async function sendWeeklyNewsletter(
  userId: string,
  email: string,
  firstName: string,
  tips: Array<{ title: string; content: string }>
) {
  const variables: Record<string, string> = {
    tipTitle1: tips[0]?.title || "SEO Best Practice",
    tipContent1: tips[0]?.content || "Stay tuned for weekly tips",
    tipTitle2: tips[1]?.title || "Content Strategy",
    tipContent2: tips[1]?.content || "Optimize your content for better rankings",
    tipTitle3: tips[2]?.title || "Technical SEO",
    tipContent3: tips[2]?.content || "Improve your site's technical foundation",
  };

  return sendEmailTrigger({
    userId,
    email,
    firstName,
    triggerType: "newsletter",
    variables,
  });
}

/**
 * Log email send for analytics
 */
async function logEmailSend(data: {
  userId: string;
  email: string;
  triggerType: string;
  subject: string;
  status: "sent" | "failed";
  error?: string;
}) {
  try {
    const db = getDb();
    // Insert into email_logs table
    await db.insert("email_logs").values({
      user_id: data.userId,
      email: data.email,
      trigger_type: data.triggerType,
      subject: data.subject,
      status: data.status,
      error: data.error,
      sent_at: new Date(),
    });
  } catch (error) {
    console.error("[Email] Failed to log email send:", error);
  }
}

/**
 * Get email statistics
 */
export async function getEmailStats(userId: string) {
  try {
    const db = getDb();
    const stats = await db
      .selectFrom("email_logs")
      .select(["trigger_type", db.fn.count("id").as("count"), "status"])
      .where("user_id", "=", userId)
      .groupBy(["trigger_type", "status"])
      .execute();

    return stats;
  } catch (error) {
    console.error("[Email] Failed to get email stats:", error);
    return [];
  }
}
