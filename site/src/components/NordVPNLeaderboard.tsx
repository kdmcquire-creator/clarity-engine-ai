"use client";

import Script from "next/script";

export function NordVPNLeaderboard() {
  return (
    <div className="flex justify-center my-4">
      <div id="nordvpn41LcsluG" />
      <Script
        src="https://go.nordvpn.com/aff_ad?campaign_id=41&aff_id=142338&format=js&divid=nordvpn41LcsluG"
        strategy="afterInteractive"
      />
      <noscript>
        <iframe
          src="https://go.nordvpn.com/aff_ad?campaign_id=41&aff_id=142338&format=iframe"
          scrolling="no"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          width={728}
          height={90}
          title="NordVPN"
        />
      </noscript>
    </div>
  );
}
