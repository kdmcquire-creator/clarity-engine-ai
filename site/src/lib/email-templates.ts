// Email welcome sequence templates for Clarity Engine AI
// Sent via SendGrid when a new subscriber joins

export interface EmailTemplate {
  id: string;
  subject: string;
  preheader: string;
  delayDays: number; // Days after signup to send
  htmlContent: string;
  textContent: string;
}

const SITE_URL = "https://clarity-engine.ai";

function wrapHtml(body: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f172a;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#1e293b;border-radius:12px;border:1px solid #334155;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:32px 32px 16px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size:20px;font-weight:700;color:#06b6d4;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;letter-spacing:-0.5px;">
                    Clarity Engine
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:0 32px 32px;color:#cbd5e1;font-size:15px;line-height:1.6;">
              ${body}
            </td>
          </tr>
        </table>
        <!-- Footer -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
          <tr>
            <td align="center" style="padding:24px 32px;font-size:12px;color:#64748b;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 8px;color:#64748b;">Clarity Engine AI &mdash; Free SEO Tools &amp; Guides</p>
              <p style="margin:0 0 8px;">
                <a href="${SITE_URL}" style="color:#64748b;text-decoration:underline;">${SITE_URL}</a>
              </p>
              <p style="margin:0;">
                <a href="{{unsubscribe_url}}" style="color:#64748b;text-decoration:underline;">Unsubscribe</a>
                &nbsp;&middot;&nbsp;
                <a href="${SITE_URL}/privacy/" style="color:#64748b;text-decoration:underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Reusable tool card row for table-based email layout */
function toolCard(name: string, description: string, href?: string): string {
  const linkHtml = href
    ? `<br /><a href="${href}" style="color:#06b6d4;text-decoration:underline;font-size:13px;">Learn more &rarr;</a>`
    : "";
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0;">
      <tr>
        <td style="background-color:#0f172a;border-radius:8px;padding:16px;border-left:3px solid #06b6d4;">
          <p style="margin:0 0 4px;font-weight:700;color:#e2e8f0;font-size:15px;">${name}</p>
          <p style="margin:0;font-size:13px;color:#94a3b8;">${description}${linkHtml}</p>
        </td>
      </tr>
    </table>`;
}

/** Reusable CTA button */
function ctaButton(label: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:24px auto;">
      <tr>
        <td align="center" style="background-color:#06b6d4;border-radius:8px;">
          <a href="${href}" style="display:inline-block;padding:12px 28px;color:#0f172a;font-weight:700;font-size:14px;text-decoration:none;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            ${label}
          </a>
        </td>
      </tr>
    </table>`;
}

/** Horizontal rule for email */
function divider(): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
      <tr>
        <td style="border-top:1px solid #334155;"></td>
      </tr>
    </table>`;
}

export const welcomeSequence: EmailTemplate[] = [
  // Email 1: Welcome (sent immediately)
  {
    id: "welcome-1-instant",
    subject: "Welcome to Clarity Engine -- here's what to try first",
    preheader: "Three free SEO tools you can use right now.",
    delayDays: 0,
    htmlContent: wrapHtml(`
      <h1 style="margin:0 0 16px;font-size:24px;color:#f1f5f9;font-weight:700;">Welcome to Clarity Engine!</h1>
      <p style="margin:0 0 16px;color:#cbd5e1;">Thanks for joining. You now have access to a growing library of free SEO tools, technical guides, and content strategy resources built for people who want results&mdash;not fluff.</p>

      <h2 style="margin:24px 0 12px;font-size:18px;color:#e2e8f0;">Start with these three tools:</h2>
      ${toolCard(
        "Keyword Density Checker",
        "Paste any page content and instantly see keyword frequency, density percentages, and over-optimization warnings.",
        `${SITE_URL}/tools/keyword-density-checker/`
      )}
      ${toolCard(
        "Meta Tag Generator",
        "Generate SEO-optimized title tags, meta descriptions, and Open Graph tags in seconds.",
        `${SITE_URL}/tools/meta-tag-generator/`
      )}
      ${toolCard(
        "Readability Scorer",
        "Check your content's readability grade level and get actionable suggestions to improve clarity.",
        `${SITE_URL}/tools/readability-scorer/`
      )}

      ${divider()}

      <p style="margin:0 0 8px;color:#cbd5e1;">Browse the full toolkit&mdash;all free, no signup wall:</p>
      ${ctaButton("Explore All Tools", `${SITE_URL}/tools/`)}

      <p style="margin:24px 0 0;color:#94a3b8;">Happy optimizing,<br /><strong style="color:#e2e8f0;">The Clarity Engine Team</strong></p>
    `),
    textContent: `Welcome to Clarity Engine!

Thanks for joining. You now have access to free SEO tools, technical guides, and content strategy resources.

Start with these three tools:

1. Keyword Density Checker
   ${SITE_URL}/tools/keyword-density-checker/

2. Meta Tag Generator
   ${SITE_URL}/tools/meta-tag-generator/

3. Readability Scorer
   ${SITE_URL}/tools/readability-scorer/

Browse all tools: ${SITE_URL}/tools/

Happy optimizing,
The Clarity Engine Team

Unsubscribe: {{unsubscribe_url}}`,
  },

  // Email 2: SEO checklist (sent day 3)
  {
    id: "welcome-2-seo-checklist",
    subject: "The SEO checklist every site needs (free)",
    preheader: "A practical technical SEO checklist you can use today.",
    delayDays: 3,
    htmlContent: wrapHtml(`
      <h1 style="margin:0 0 16px;font-size:24px;color:#f1f5f9;font-weight:700;">The SEO checklist every site needs</h1>
      <p style="margin:0 0 16px;color:#cbd5e1;">Most SEO advice is vague. These two guides give you concrete, step-by-step actions you can take this week to improve your site's search visibility.</p>

      ${toolCard(
        "Technical SEO Checklist",
        "A no-nonsense walkthrough of every technical SEO element your site needs: crawlability, indexing, structured data, Core Web Vitals, and more.",
        `${SITE_URL}/blog/technical-seo-checklist/`
      )}
      ${toolCard(
        "SEO Fundamentals for 2025",
        "The landscape keeps shifting. This guide covers what actually matters now: E-E-A-T signals, helpful content alignment, and the basics that still drive rankings.",
        `${SITE_URL}/blog/seo-fundamentals-2025/`
      )}

      ${divider()}

      <h2 style="margin:0 0 12px;font-size:18px;color:#e2e8f0;">Quick wins you can do right now:</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:4px 0;color:#cbd5e1;font-size:14px;">&#9744; Run your homepage through the <a href="${SITE_URL}/tools/meta-tag-generator/" style="color:#06b6d4;text-decoration:underline;">Meta Tag Generator</a></td>
        </tr>
        <tr>
          <td style="padding:4px 0;color:#cbd5e1;font-size:14px;">&#9744; Check your top 3 blog posts with the <a href="${SITE_URL}/tools/readability-scorer/" style="color:#06b6d4;text-decoration:underline;">Readability Scorer</a></td>
        </tr>
        <tr>
          <td style="padding:4px 0;color:#cbd5e1;font-size:14px;">&#9744; Audit keyword usage with the <a href="${SITE_URL}/tools/keyword-density-checker/" style="color:#06b6d4;text-decoration:underline;">Keyword Density Checker</a></td>
        </tr>
      </table>

      <p style="margin:24px 0 0;color:#94a3b8;">See you in a few days,<br /><strong style="color:#e2e8f0;">The Clarity Engine Team</strong></p>
    `),
    textContent: `The SEO checklist every site needs

Most SEO advice is vague. These two guides give you concrete, step-by-step actions.

1. Technical SEO Checklist
   ${SITE_URL}/blog/technical-seo-checklist/

2. SEO Fundamentals for 2025
   ${SITE_URL}/blog/seo-fundamentals-2025/

Quick wins:
- Run your homepage through the Meta Tag Generator
- Check your top 3 blog posts with the Readability Scorer
- Audit keyword usage with the Keyword Density Checker

See you in a few days,
The Clarity Engine Team

Unsubscribe: {{unsubscribe_url}}`,
  },

  // Email 3: Content strategy (sent day 7)
  {
    id: "welcome-3-content-strategy",
    subject: "How the best SEO content is written in 2026",
    preheader: "AI-powered writing meets search strategy.",
    delayDays: 7,
    htmlContent: wrapHtml(`
      <h1 style="margin:0 0 16px;font-size:24px;color:#f1f5f9;font-weight:700;">How the best SEO content is written in 2026</h1>
      <p style="margin:0 0 16px;color:#cbd5e1;">The writers ranking on page one aren't just good at writing&mdash;they're good at combining AI tools with search intent research. These two guides show you how.</p>

      ${toolCard(
        "AI Content Writing &amp; SEO Strategy",
        "Learn how to use AI writing tools without sacrificing quality or getting flagged. Covers prompt engineering for SEO, editing workflows, and E-E-A-T compliance.",
        `${SITE_URL}/blog/ai-content-writing-seo-strategy/`
      )}
      ${toolCard(
        "ChatGPT for SEO: The Complete Guide",
        "A hands-on guide to using ChatGPT for keyword research, content outlines, meta descriptions, schema markup, and more&mdash;with real prompts you can copy.",
        `${SITE_URL}/blog/chatgpt-for-seo-complete-guide/`
      )}

      ${divider()}

      <p style="margin:0 0 16px;color:#cbd5e1;">Pair these guides with our tools for the full workflow:</p>
      ${ctaButton("Browse All Guides", `${SITE_URL}/blog/`)}

      <p style="margin:24px 0 0;color:#94a3b8;">Keep building,<br /><strong style="color:#e2e8f0;">The Clarity Engine Team</strong></p>
    `),
    textContent: `How the best SEO content is written in 2026

The writers ranking on page one combine AI tools with search intent research. These two guides show you how.

1. AI Content Writing & SEO Strategy
   ${SITE_URL}/blog/ai-content-writing-seo-strategy/

2. ChatGPT for SEO: The Complete Guide
   ${SITE_URL}/blog/chatgpt-for-seo-complete-guide/

Browse all guides: ${SITE_URL}/blog/

Keep building,
The Clarity Engine Team

Unsubscribe: {{unsubscribe_url}}`,
  },
];
