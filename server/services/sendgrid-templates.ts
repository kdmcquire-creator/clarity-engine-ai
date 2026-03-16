/**
 * SendGrid Email Templates Configuration
 * 
 * Defines all email templates for Clarity Engine with branded content
 * These templates are used for welcome emails, newsletters, alerts, and more
 */

export const emailTemplates = {
  welcome: {
    name: "Welcome to Clarity Engine",
    subject: "Welcome to Clarity Engine - Your SEO Toolkit Awaits",
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
            .content { padding: 20px; background: #f9f9f9; margin: 20px 0; border-radius: 8px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Clarity Engine! 🚀</h1>
            </div>
            
            <div class="content">
              <p>Hi {{firstName}},</p>
              
              <p>We're thrilled to have you join Clarity Engine, your all-in-one SEO and content marketing toolkit!</p>
              
              <p><strong>Here's what you can do right now:</strong></p>
              <ul>
                <li>Explore 17 professional SEO tools</li>
                <li>Analyze your content with our advanced metrics</li>
                <li>Research keywords and track rankings</li>
                <li>Learn from our in-depth resources</li>
                <li>Earn certifications and badges</li>
              </ul>
              
              <p>Start with our interactive tour to get familiar with the platform:</p>
              <a href="{{appUrl}}/tools" class="button">Explore Tools</a>
              
              <p>Questions? Check out our <a href="{{appUrl}}/resources">Resources</a> or reach out to our support team.</p>
              
              <p>Happy optimizing!<br><strong>The Clarity Engine Team</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2026 Clarity Engine. All rights reserved.</p>
              <p><a href="{{unsubscribeUrl}}">Unsubscribe</a> | <a href="{{preferencesUrl}}">Email Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  },

  newsletter: {
    name: "Weekly SEO Tips",
    subject: "Your Weekly SEO Tips from Clarity Engine",
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
            .tip { background: #f0f4ff; padding: 15px; margin: 15px 0; border-left: 4px solid #667eea; border-radius: 4px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📊 Weekly SEO Tips</h2>
            </div>
            
            <div class="content">
              <p>Hi {{firstName}},</p>
              
              <p>Here are this week's top SEO insights to boost your rankings:</p>
              
              <div class="tip">
                <h3>{{tipTitle1}}</h3>
                <p>{{tipContent1}}</p>
              </div>
              
              <div class="tip">
                <h3>{{tipTitle2}}</h3>
                <p>{{tipContent2}}</p>
              </div>
              
              <div class="tip">
                <h3>{{tipTitle3}}</h3>
                <p>{{tipContent3}}</p>
              </div>
              
              <p>Want to dive deeper? Check out our latest resources:</p>
              <a href="{{appUrl}}/resources" class="button">Read More</a>
              
              <p>Keep optimizing!<br><strong>The Clarity Engine Team</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2026 Clarity Engine. All rights reserved.</p>
              <p><a href="{{unsubscribeUrl}}">Unsubscribe</a> | <a href="{{preferencesUrl}}">Email Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  },

  certificationAlert: {
    name: "Certification Achievement",
    subject: "🎉 Congratulations! You've Earned a Certification",
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
            .badge { text-align: center; margin: 20px 0; }
            .badge-img { width: 150px; height: 150px; border-radius: 50%; }
            .button { display: inline-block; background: #f5576c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Certification Earned!</h1>
            </div>
            
            <div class="badge">
              <p><strong>{{certificationName}}</strong></p>
              <p style="font-size: 18px; color: #f5576c;">Congratulations, {{firstName}}!</p>
            </div>
            
            <div class="content">
              <p>You've successfully completed the <strong>{{certificationName}}</strong> certification and earned your badge!</p>
              
              <p>Your achievement shows your expertise in {{certificationTopic}}. You can now:</p>
              <ul>
                <li>Display your badge on your profile</li>
                <li>Share it on LinkedIn and social media</li>
                <li>Add it to your professional portfolio</li>
              </ul>
              
              <p>View your badge and share your achievement:</p>
              <a href="{{appUrl}}/dashboard/certifications" class="button">View Badge</a>
              
              <p>Ready for the next challenge? Explore more certifications:</p>
              <a href="{{appUrl}}/certifications" class="button">Browse Certifications</a>
              
              <p>Keep learning!<br><strong>The Clarity Engine Team</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2026 Clarity Engine. All rights reserved.</p>
              <p><a href="{{unsubscribeUrl}}">Unsubscribe</a> | <a href="{{preferencesUrl}}">Email Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  },

  upgradeSuggestion: {
    name: "Upgrade to Pro",
    subject: "Unlock More Power with Clarity Engine Pro",
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
            .feature { background: #f0f4ff; padding: 15px; margin: 10px 0; border-radius: 4px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Unlock More with Pro 🚀</h2>
            </div>
            
            <div class="content">
              <p>Hi {{firstName}},</p>
              
              <p>You're doing great with Clarity Engine! We noticed you're getting a lot of value from our tools. Ready to take it to the next level?</p>
              
              <p><strong>Clarity Engine Pro includes:</strong></p>
              <div class="feature">✨ Advanced analytics and reporting</div>
              <div class="feature">🔗 Unlimited API access</div>
              <div class="feature">👥 Team collaboration (up to 3 members)</div>
              <div class="feature">📊 Priority support</div>
              <div class="feature">🎯 Custom integrations</div>
              
              <p><strong>Only $29/month</strong> - Cancel anytime</p>
              
              <a href="{{appUrl}}/pricing" class="button">Upgrade Now</a>
              
              <p>Questions? <a href="{{appUrl}}/contact">Contact us</a> - we're here to help!</p>
              
              <p>Best regards,<br><strong>The Clarity Engine Team</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2026 Clarity Engine. All rights reserved.</p>
              <p><a href="{{unsubscribeUrl}}">Unsubscribe</a> | <a href="{{preferencesUrl}}">Email Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  },

  abandonedCheckout: {
    name: "Complete Your Purchase",
    subject: "Your Clarity Engine Pro Subscription is Waiting",
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
            .offer { background: #fff3cd; padding: 15px; margin: 15px 0; border-radius: 4px; text-align: center; }
            .button { display: inline-block; background: #f5576c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Don't Miss Out! 🎁</h2>
            </div>
            
            <div class="content">
              <p>Hi {{firstName}},</p>
              
              <p>We noticed you didn't complete your upgrade to <strong>Clarity Engine Pro</strong>. We'd love to help you get started!</p>
              
              <div class="offer">
                <p><strong>Special Offer:</strong> Use code CLARITY15 for 15% off your first month</p>
              </div>
              
              <p>Complete your subscription to unlock:</p>
              <ul>
                <li>Advanced analytics and reporting</li>
                <li>Unlimited API access</li>
                <li>Team collaboration</li>
                <li>Priority support</li>
              </ul>
              
              <a href="{{checkoutUrl}}" class="button">Complete Purchase</a>
              
              <p>Questions? <a href="{{appUrl}}/contact">Contact our support team</a></p>
              
              <p>Best regards,<br><strong>The Clarity Engine Team</strong></p>
            </div>
            
            <div class="footer">
              <p>© 2026 Clarity Engine. All rights reserved.</p>
              <p><a href="{{unsubscribeUrl}}">Unsubscribe</a> | <a href="{{preferencesUrl}}">Email Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
  },
};

export type EmailTemplateType = keyof typeof emailTemplates;

/**
 * Get email template by type
 */
export function getEmailTemplate(type: EmailTemplateType) {
  return emailTemplates[type];
}

/**
 * Replace template variables in email content
 */
export function replaceTemplateVariables(
  content: string,
  variables: Record<string, string>
): string {
  let result = content;
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
  });
  return result;
}
