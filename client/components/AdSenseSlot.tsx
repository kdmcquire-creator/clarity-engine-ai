import { useEffect } from "react";

interface AdSenseSlotProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  fullWidth?: boolean;
  className?: string;
}

export function AdSenseSlot({
  adSlot,
  adFormat = "auto",
  fullWidth = false,
  className = "",
}: AdSenseSlotProps) {
  useEffect(() => {
    // Push the ad to the page when component mounts
    if (typeof window !== "undefined" && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <div className={`flex justify-center w-full ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: fullWidth ? "block" : "inline-block",
          textAlign: "center",
          width: fullWidth ? "100%" : "728px",
          height: fullWidth ? "auto" : "90px",
          minWidth: "100px",
          minHeight: "50px",
        }}
        data-ad-client="ca-pub-5995172189982724"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? "true" : "false"}
      ></ins>
    </div>
  );
}
