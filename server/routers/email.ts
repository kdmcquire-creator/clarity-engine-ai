// Email service helper
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

/**
 * Send email using SendGrid API
 * Requires SENDGRID_API_KEY environment variable
 */
export async function sendEmail({
  to,
  subject,
  htmlContent,
  textContent,
}: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!SENDGRID_API_KEY) {
    console.error("SendGrid API key not configured");
    return { success: false, error: "SendGrid API key not configured" };
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to }],
            subject: subject,
          },
        ],
        from: {
          email: "noreply@clarity-engine.ai",
          name: "Clarity Engine",
        },
        content: [
          {
            type: "text/html",
            value: htmlContent,
          },
          ...(textContent
            ? [
                {
                  type: "text/plain",
                  value: textContent,
                },
              ]
            : []),
        ],
        trackingSettings: {
          clickTracking: {
            enable: true,
          },
          openTracking: {
            enable: true,
          },
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("SendGrid error:", error);
      return { success: false, error: error };
    }

    const messageId = response.headers.get("x-message-id");
    return { success: true, messageId: messageId || undefined };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send welcome email to new newsletter subscriber
 */
export async function sendWelcomeEmail(email: string, name?: string): Promise<{ success: boolean; error?: string }> {
  const displayName = name ? name.split(" ")[0] : "there";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
          .section { margin: 20px 0; }
          .section h2 { color: #1f2937; font-size: 18px; margin-top: 0; }
          .cta-button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 10px 0; }
          .benefit { margin: 15px 0; padding: 15px; background: #f3f4f6; border-left: 4px solid #2563eb; border-radius: 4px; }
          .benefit-title { font-weight: 600; color: #1f2937; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
          .social-links { text-align: center; margin: 20px 0; }
          .social-links a { display: inline-block; margin: 0 10px; color: #2563eb; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Clarity Engine! 🚀</h1>
          </div>
          <div class="content">
            <p>Hi ${displayName},</p>
            
            <p>Thank you for subscribing to our newsletter! You're now part of a community of 10,000+ marketers, SEO professionals, and content creators who are mastering the art of ranking higher and driving more traffic.</p>

            <div class="section">
              <h2>What's Inside Your Welcome Package</h2>
              
              <div class="benefit">
                <div class="benefit-title">📋 Free SEO Audit Template</div>
                <p>A professional-grade template you can use to audit any website in minutes. Identify technical issues, content gaps, and quick wins.</p>
              </div>

              <div class="benefit">
                <div class="benefit-title">📊 Weekly SEO Strategies</div>
                <p>Every week, we share actionable SEO tactics, case studies, and tool recommendations that you can implement immediately.</p>
              </div>

              <div class="benefit">
                <div class="benefit-title">🎯 Exclusive Resources</div>
                <p>Access to our growing library of checklists, guides, and frameworks that aren't available anywhere else.</p>
              </div>

              <div class="benefit">
                <div class="benefit-title">💡 Industry Insights</div>
                <p>Stay updated on the latest SEO trends, algorithm changes, and what's working right now in 2026.</p>
              </div>
            </div>

            <div class="section" style="text-align: center;">
              <p><strong>Your Free SEO Audit Template is ready to download:</strong></p>
              <a href="https://clarity-engine.ai/resources/free-seo-audit-template" class="cta-button">Download Template</a>
            </div>

            <div class="section">
              <h2>What Happens Next</h2>
              <p>Our first email with this week's top SEO strategies will arrive in your inbox tomorrow morning. In the meantime, feel free to:</p>
              <ul>
                <li>Explore our <a href="https://clarity-engine.ai/resources">Resource Library</a> with 50+ in-depth guides</li>
                <li>Check out our <a href="https://clarity-engine.ai/tools">Free SEO Tools</a> for keyword research, readability analysis, and more</li>
                <li>Read about our <a href="https://clarity-engine.ai/authors">Expert Authors</a> and their specializations</li>
              </ul>
            </div>

            <div class="section">
              <h2>Questions?</h2>
              <p>We're here to help! Reply to this email or <a href="https://clarity-engine.ai/contact">contact us</a> anytime.</p>
            </div>

            <p style="margin-top: 30px;">
              Happy optimizing!<br>
              <strong>The Clarity Engine Team</strong>
            </p>

            <div class="social-links">
              <a href="https://twitter.com/clarity_engine">Twitter</a>
              <a href="https://linkedin.com/company/clarity-engine">LinkedIn</a>
              <a href="https://clarity-engine.ai">Website</a>
            </div>

            <div class="footer">
              <p>You're receiving this email because you subscribed to the Clarity Engine newsletter.</p>
              <p><a href="https://clarity-engine.ai/unsubscribe?email=${encodeURIComponent(email)}" style="color: #6b7280;">Unsubscribe</a> | <a href="https://clarity-engine.ai/preferences?email=${encodeURIComponent(email)}" style="color: #6b7280;">Update Preferences</a></p>
              <p>&copy; 2026 Clarity Engine. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
Welcome to Clarity Engine!

Thank you for subscribing to our newsletter! You're now part of a community of 10,000+ marketers, SEO professionals, and content creators.

What's Inside Your Welcome Package:
- Free SEO Audit Template: A professional-grade template to audit any website
- Weekly SEO Strategies: Actionable tactics and case studies every week
- Exclusive Resources: Checklists, guides, and frameworks
- Industry Insights: Latest SEO trends and algorithm changes

Download Your Free Template: https://clarity-engine.ai/resources/free-seo-audit-template

What Happens Next:
Our first email with this week's top SEO strategies will arrive tomorrow morning.

Questions? Reply to this email or visit https://clarity-engine.ai/contact

Happy optimizing!
The Clarity Engine Team
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to Clarity Engine! 🚀 Here's Your Free SEO Audit Template",
    htmlContent,
    textContent,
  });
}

/**
 * Send weekly newsletter email
 */
export async function sendWeeklyNewsletter(
  email: string,
  weeklyContent: {
    title: string;
    articles: Array<{ title: string; url: string; category: string }>;
    toolTip: string;
    toolUrl: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
          .section { margin: 20px 0; }
          .section h2 { color: #1f2937; font-size: 18px; margin-top: 0; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
          .article { margin: 15px 0; padding: 15px; background: #f9fafb; border-left: 4px solid #2563eb; border-radius: 4px; }
          .article-title { font-weight: 600; color: #1f2937; margin: 0 0 5px 0; }
          .article-category { display: inline-block; background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 3px; font-size: 11px; font-weight: 600; margin-bottom: 8px; }
          .article-link { color: #2563eb; text-decoration: none; font-weight: 500; }
          .article-link:hover { text-decoration: underline; }
          .tool-tip { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 20px 0; }
          .tool-tip-title { font-weight: 600; color: #92400e; margin: 0 0 8px 0; }
          .cta-button { display: inline-block; background: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 10px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${weeklyContent.title}</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>This week we've curated the best SEO strategies, insights, and resources to help you rank higher and drive more traffic. Enjoy!</p>

            <div class="section">
              <h2>📚 This Week's Top Articles</h2>
              ${weeklyContent.articles
                .map(
                  (article) => `
                <div class="article">
                  <span class="article-category">${article.category}</span>
                  <p class="article-title">${article.title}</p>
                  <a href="${article.url}" class="article-link">Read Article →</a>
                </div>
              `
                )
                .join("")}
            </div>

            <div class="tool-tip">
              <p class="tool-tip-title">💡 Tool Tip of the Week</p>
              <p>${weeklyContent.toolTip}</p>
              <a href="${weeklyContent.toolUrl}" class="cta-button">Learn More</a>
            </div>

            <p style="margin-top: 30px;">
              Happy optimizing!<br>
              <strong>The Clarity Engine Team</strong>
            </p>

            <div class="footer">
              <p><a href="https://clarity-engine.ai/unsubscribe?email=${encodeURIComponent(email)}" style="color: #6b7280;">Unsubscribe</a> | <a href="https://clarity-engine.ai/preferences?email=${encodeURIComponent(email)}" style="color: #6b7280;">Update Preferences</a></p>
              <p>&copy; 2026 Clarity Engine. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: weeklyContent.title,
    htmlContent,
  });
}
