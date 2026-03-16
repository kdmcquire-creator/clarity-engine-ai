#!/usr/bin/env node

// Use built-in Node.js fetch (available in Node 18+)

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  console.error('❌ Error: SENDGRID_API_KEY environment variable not set');
  console.error('Please set your SendGrid API key: export SENDGRID_API_KEY="SG....."');
  process.exit(1);
}

const SENDGRID_BASE_URL = 'https://api.sendgrid.com/v3';

async function sendgridRequest(method, path, data) {
  const response = await fetch(`${SENDGRID_BASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`SendGrid API error: ${response.status} - ${JSON.stringify(error)}`);
  }

  return response.json();
}

// Template 1: Welcome Email
const welcomeTemplate = {
  name: 'Welcome to Clarity Engine',
  generation: 'dynamic',
  subject: 'Welcome to Clarity Engine - Your Free SEO Toolkit',
  html_content: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
      .header h1 { margin: 0; font-size: 28px; }
      .content { background: #f9f9f9; padding: 30px; margin-top: 20px; border-radius: 8px; }
      .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
      .feature-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #667eea; border-radius: 4px; }
      .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🎉 Welcome to Clarity Engine!</h1>
        <p>Your Free SEO Toolkit Awaits</p>
      </div>
      
      <div class="content">
        <p>Hi {{firstName}},</p>
        <p>Welcome to Clarity Engine! We're thrilled to have you join our community of SEO professionals and content creators.</p>
        
        <div class="feature-box">
          <h3 style="margin-top: 0;">✨ Get Started with These Tools:</h3>
          <ul>
            <li><strong>SEO Audit</strong> - Analyze your website's SEO health</li>
            <li><strong>Keyword Research</strong> - Find high-impact keywords</li>
            <li><strong>Competitor Analysis</strong> - Stay ahead of the competition</li>
            <li><strong>Backlink Checker</strong> - Monitor your link profile</li>
          </ul>
        </div>
        
        <p style="text-align: center;">
          <a href="https://clarity-engine.ai/tools" class="cta-button">Explore All Tools</a>
        </p>
        
        <div class="feature-box">
          <h3 style="margin-top: 0;">💡 Pro Tips:</h3>
          <p>Start with our <strong>Free SEO Audit</strong> to get a comprehensive analysis of your website. Then use our other tools to identify opportunities and track your progress.</p>
        </div>
        
        <p>Questions? Check out our <a href="https://clarity-engine.ai/help" style="color: #667eea; text-decoration: none;">Help Center</a> or <a href="https://clarity-engine.ai/contact" style="color: #667eea; text-decoration: none;">contact our support team</a>.</p>
        
        <p>Happy optimizing!<br><strong>The Clarity Engine Team</strong></p>
      </div>
      
      <div class="footer">
        <p><a href="https://clarity-engine.ai/unsubscribe" style="color: #999; text-decoration: none;">Unsubscribe</a> | <a href="https://clarity-engine.ai/preferences" style="color: #999; text-decoration: none;">Manage Preferences</a></p>
        <p>&copy; 2026 Clarity Engine. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`,
  plain_content: `Welcome to Clarity Engine!

Hi {{firstName}},

Welcome to Clarity Engine! We're thrilled to have you join our community of SEO professionals and content creators.

Get Started with These Tools:
- SEO Audit: Analyze your website's SEO health
- Keyword Research: Find high-impact keywords
- Competitor Analysis: Stay ahead of the competition
- Backlink Checker: Monitor your link profile

Explore all tools: https://clarity-engine.ai/tools

Pro Tips:
Start with our Free SEO Audit to get a comprehensive analysis of your website. Then use our other tools to identify opportunities and track your progress.

Questions? Check out our Help Center or contact our support team.

Happy optimizing!
The Clarity Engine Team`,
};

// Template 2: Password Reset Email
const passwordResetTemplate = {
  name: 'Password Reset - Clarity Engine',
  generation: 'dynamic',
  subject: 'Reset Your Clarity Engine Password',
  html_content: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
      .header h1 { margin: 0; font-size: 24px; }
      .content { background: #f9f9f9; padding: 30px; margin-top: 20px; border-radius: 8px; }
      .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; text-align: center; }
      .warning-box { background: #fff3cd; padding: 20px; margin: 20px 0; border-left: 4px solid #ffc107; border-radius: 4px; }
      .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🔐 Password Reset Request</h1>
      </div>
      
      <div class="content">
        <p>Hi {{firstName}},</p>
        <p>We received a request to reset your Clarity Engine password. Click the button below to create a new password:</p>
        
        <div style="text-align: center;">
          <a href="{{resetLink}}" class="cta-button">Reset Password</a>
        </div>
        
        <p style="text-align: center; color: #666; font-size: 14px;">Or copy and paste this link in your browser:<br><code>{{resetLink}}</code></p>
        
        <div class="warning-box">
          <p style="margin: 0;"><strong>⚠️ Security Notice:</strong></p>
          <p style="margin: 10px 0 0 0; font-size: 14px;">This link will expire in 24 hours. If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
        
        <p style="color: #666; font-size: 14px;">Questions? <a href="https://clarity-engine.ai/help" style="color: #667eea; text-decoration: none;">Visit our Help Center</a> or <a href="https://clarity-engine.ai/contact" style="color: #667eea; text-decoration: none;">contact support</a>.</p>
      </div>
      
      <div class="footer">
        <p>&copy; 2026 Clarity Engine. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`,
  plain_content: `Password Reset Request

Hi {{firstName}},

We received a request to reset your Clarity Engine password. Click the link below to create a new password:

{{resetLink}}

This link will expire in 24 hours. If you didn't request this password reset, please ignore this email or contact support if you have concerns.

Questions? Visit our Help Center or contact support.

© 2026 Clarity Engine. All rights reserved.`,
};

// Template 3: Weekly Newsletter
const newsletterTemplate = {
  name: 'Weekly SEO Insights - Clarity Engine',
  generation: 'dynamic',
  subject: 'Your Weekly SEO Insights - Latest Strategies & Tools',
  html_content: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
      .header h1 { margin: 0; font-size: 24px; }
      .content { background: #f9f9f9; padding: 30px; margin-top: 20px; border-radius: 8px; }
      .article-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #667eea; border-radius: 4px; }
      .article-box h3 { margin: 0 0 10px 0; color: #333; }
      .article-box a { color: #667eea; text-decoration: none; font-weight: bold; }
      .cta-button { display: inline-block; background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 10px; font-weight: bold; }
      .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>📰 This Week's SEO Insights</h1>
        <p>Your Weekly Dose of SEO Knowledge</p>
      </div>
      
      <div class="content">
        <p>Hi {{firstName}},</p>
        <p>Here are this week's top SEO articles and insights from Clarity Engine:</p>
        
        {{#each articles}}
        <div class="article-box">
          <h3>{{this.title}}</h3>
          <p style="margin: 10px 0; color: #666; font-size: 14px;">{{this.excerpt}}</p>
          <a href="{{this.link}}">Read More →</a>
        </div>
        {{/each}}
        
        <div style="margin-top: 30px; padding: 20px; background: #e8eaf6; border-radius: 8px; text-align: center;">
          <p style="margin: 0;"><strong>Explore All Our Tools</strong></p>
          <p style="margin: 10px 0 0 0; font-size: 14px;">Access 17 free SEO tools to optimize your website</p>
          <a href="https://clarity-engine.ai/tools" class="cta-button">Visit Tools</a>
        </div>
        
        <p style="margin-top: 30px; color: #666; font-size: 14px;">Have questions? <a href="https://clarity-engine.ai/contact" style="color: #667eea; text-decoration: none;">Contact us</a></p>
      </div>
      
      <div class="footer">
        <p><a href="https://clarity-engine.ai/unsubscribe" style="color: #999; text-decoration: none;">Unsubscribe</a> | <a href="https://clarity-engine.ai/preferences" style="color: #999; text-decoration: none;">Manage Preferences</a></p>
        <p>&copy; 2026 Clarity Engine. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`,
  plain_content: `This Week's SEO Insights

Hi {{firstName}},

Here are this week's top SEO articles and insights from Clarity Engine:

{{#each articles}}
{{this.title}}
{{this.excerpt}}
Read: {{this.link}}

{{/each}}

Explore all our tools: https://clarity-engine.ai/tools

Have questions? Contact us: https://clarity-engine.ai/contact

© 2026 Clarity Engine. All rights reserved.`,
};

async function createTemplates() {
  try {
    console.log('🚀 Creating SendGrid email templates...\n');

    // Create Welcome Template
    console.log('📧 Creating Welcome Email template...');
    const welcomeResponse = await sendgridRequest('POST', '/templates', welcomeTemplate);
    const welcomeTemplateId = welcomeResponse.id;
    console.log(`✅ Welcome template created: ${welcomeTemplateId}\n`);

    // Create Password Reset Template
    console.log('📧 Creating Password Reset Email template...');
    const resetResponse = await sendgridRequest('POST', '/templates', passwordResetTemplate);
    const resetTemplateId = resetResponse.id;
    console.log(`✅ Password Reset template created: ${resetTemplateId}\n`);

    // Create Newsletter Template
    console.log('📧 Creating Weekly Newsletter template...');
    const newsletterResponse = await sendgridRequest('POST', '/templates', newsletterTemplate);
    const newsletterTemplateId = newsletterResponse.id;
    console.log(`✅ Newsletter template created: ${newsletterTemplateId}\n`);

    // Save template IDs to a config file
    const templateIds = {
      welcome: welcomeTemplateId,
      passwordReset: resetTemplateId,
      newsletter: newsletterTemplateId,
    };

    console.log('📋 Template IDs:');
    console.log(JSON.stringify(templateIds, null, 2));
    console.log('\n✨ All templates created successfully!');
    console.log('\nNext steps:');
    console.log('1. Add these template IDs to your environment or config');
    console.log('2. Update your email service to use these templates');
    console.log('3. Test sending emails with the templates');

    return templateIds;
  } catch (error) {
    console.error('❌ Error creating templates:', error);
    if (error.response) {
      console.error('Response:', error.response.body);
    }
    process.exit(1);
  }
}

createTemplates();
