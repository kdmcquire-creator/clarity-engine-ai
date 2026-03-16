import { useEffect } from "react";

interface AdSenseAdProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  className?: string;
}

export function AdSenseAd({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdSenseAdProps) {
  useEffect(() => {
    // Push ads to Google AdSense queue
    try {
      const w = window as any;
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch (e) {
      console.log("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
        }}
        data-ad-client={process.env.VITE_ADSENSE_CLIENT_ID || "ca-pub-example"} // Replace with your AdSense client ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  );
}

// Ad slot constants
export const AD_SLOTS = {
  HEADER: "1234567890", // Header banner ad
  SIDEBAR: "0987654321", // Sidebar vertical ad
  TOOL_SECTION: "1111111111", // Between tool sections
  FOOTER: "2222222222", // Footer ad
  ARTICLE_TOP: "3333333333", // Top of article
  ARTICLE_BOTTOM: "4444444444", // Bottom of article
};
