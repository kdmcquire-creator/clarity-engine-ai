/**
 * Monetization Configuration
 * 
 * This file contains all affiliate links, ad placement IDs, and monetization settings.
 * Update these values with your actual IDs once you've signed up for the programs.
 */

export const MONETIZATION_CONFIG = {
  // Google AdSense Configuration
  adsense: {
    enabled: false, // Set to true once you have your Publisher ID
    publisherId: process.env.VITE_ADSENSE_PUBLISHER_ID || "ca-pub-xxxxxxxxxxxxxxxx",
    // Ad slots for different placements
    slots: {
      headerBanner: "1234567890",
      sidebarSquare: "0987654321",
      contentInline: "1122334455",
      footerBanner: "5544332211",
    },
  },

  // Affiliate Programs
  affiliates: {
    // Semrush - SEO & Content Marketing Tool
    semrush: {
      enabled: false,
      affiliateId: process.env.VITE_SEMRUSH_AFFILIATE_ID || "your-affiliate-id",
      trackingUrl: "https://www.semrush.com/?ref=your-affiliate-id",
      description: "Advanced SEO and content marketing platform",
      commission: "30%",
    },

    // Surfer SEO - Content Optimization
    surferSeo: {
      enabled: false,
      affiliateId: process.env.VITE_SURFER_AFFILIATE_ID || "your-affiliate-id",
      trackingUrl: "https://surfer.com/?via=your-affiliate-id",
      description: "AI-powered content optimization tool",
      commission: "30%",
    },

    // Jasper AI - Content Generation
    jasperAi: {
      enabled: false,
      affiliateId: process.env.VITE_JASPER_AFFILIATE_ID || "your-affiliate-id",
      trackingUrl: "https://www.jasper.ai?fpr=your-affiliate-id",
      description: "AI writing assistant for content creators",
      commission: "30%",
    },

    // Ahrefs - Backlink Analysis
    ahrefs: {
      enabled: false,
      affiliateId: process.env.VITE_AHREFS_AFFILIATE_ID || "your-affiliate-id",
      trackingUrl: "https://ahrefs.com/?ref=your-affiliate-id",
      description: "Comprehensive SEO and backlink analysis",
      commission: "20%",
    },

    // Grammarly - Writing Assistant
    grammarly: {
      enabled: false,
      affiliateId: process.env.VITE_GRAMMARLY_AFFILIATE_ID || "your-affiliate-id",
      trackingUrl: "https://www.grammarly.com/?utm_source=your-site",
      description: "AI-powered writing and grammar checker",
      commission: "20%",
    },

    // Copyscape - Plagiarism Detection
    copyscape: {
      enabled: false,
      affiliateId: process.env.VITE_COPYSCAPE_AFFILIATE_ID || "your-affiliate-id",
      trackingUrl: "https://www.copyscape.com/?ref=your-affiliate-id",
      description: "Plagiarism detection and content monitoring",
      commission: "25%",
    },
  },

  // Ad Placement Strategies
  adPlacements: {
    // Above-the-fold banner ad
    headerBanner: {
      enabled: false,
      type: "leaderboard", // 728x90
      position: "top",
      refreshRate: 30, // seconds
    },

    // Sidebar square ad
    sidebarSquare: {
      enabled: false,
      type: "square", // 300x250
      position: "sidebar",
      refreshRate: 45,
    },

    // In-content ad
    contentInline: {
      enabled: false,
      type: "rectangle", // 300x250 or 336x280
      position: "content",
      refreshRate: 60,
    },

    // Footer banner
    footerBanner: {
      enabled: false,
      type: "leaderboard", // 728x90
      position: "footer",
      refreshRate: 30,
    },
  },

  // CTA Placements (Call-to-Action for affiliate links)
  ctaPlacements: {
    // Sidebar CTA on tool pages
    toolSidebar: {
      enabled: true,
      title: "Upgrade Your SEO Game",
      description: "Get advanced insights with premium SEO tools",
      affiliateProgram: "semrush", // Which affiliate to promote
    },

    // End of article CTA
    articleEnd: {
      enabled: true,
      title: "Learn More About SEO",
      description: "Explore comprehensive SEO strategies with our partners",
      affiliateProgram: "surferSeo",
    },

    // Tool results CTA
    toolResults: {
      enabled: true,
      title: "Want More Detailed Analysis?",
      description: "Get professional-grade analysis with premium tools",
      affiliateProgram: "ahrefs",
    },
  },

  // Revenue Goals & Tracking
  tracking: {
    enabled: true,
    googleAnalyticsId: process.env.VITE_GA_ID || "G-XXXXXXXXXX",
    trackConversions: true,
    trackAffiliateClicks: true,
    trackAdImpressions: true,
  },
};

/**
 * Helper function to get affiliate link
 */
export const getAffiliateLink = (program: keyof typeof MONETIZATION_CONFIG.affiliates) => {
  const affiliate = MONETIZATION_CONFIG.affiliates[program];
  if (!affiliate.enabled) {
    console.warn(`Affiliate program ${program} is not enabled`);
    return null;
  }
  return affiliate.trackingUrl;
};

/**
 * Helper function to check if ads are enabled
 */
export const areAdsEnabled = () => {
  return MONETIZATION_CONFIG.adsense.enabled;
};

/**
 * Helper function to get ad slot ID
 */
export const getAdSlotId = (placement: keyof typeof MONETIZATION_CONFIG.adsense.slots) => {
  if (!MONETIZATION_CONFIG.adsense.enabled) {
    return null;
  }
  return MONETIZATION_CONFIG.adsense.slots[placement];
};
