import { useEffect } from "react";

/**
 * AdSenseVerification Component
 * 
 * Adds the Google AdSense verification script to the page head.
 * This component should be included on every major page to ensure
 * Google can verify the AdSense code across all pages of the site.
 * 
 * Usage: Add <AdSenseVerification /> to the top of each page component
 */
export function AdSenseVerification() {
  useEffect(() => {
    // Create and append the AdSense script to the document head
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5995172189982724";
    script.crossOrigin = "anonymous";
    
    // Only add if not already present
    const existingScript = document.head.querySelector(
      'script[src*="pagead2.googlesyndication.com"]'
    );
    
    if (!existingScript) {
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup is handled by React, script remains for ad functionality
    };
  }, []);

  return null; // This component doesn't render anything
}
