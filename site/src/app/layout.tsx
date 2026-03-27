import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://clarity-engine.ai"),
  title: {
    default: "Clarity Engine — Free SEO & Content Marketing Tools",
    template: "%s | Clarity Engine",
  },
  description:
    "17 free SEO tools to help you rank higher, write better, and grow faster. Keyword density checker, SERP simulator, schema generator, and more.",
  openGraph: {
    type: "website",
    siteName: "Clarity Engine",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", site: "@ClarityEngineAI" },
  verification: {
    other: {
      "google-adsense-account": ["ca-pub-5995172189982724"],
    },
  },
};

// Trusted, static GTM snippet — not user-controlled content
const GTM_ID = "GTM-MXHMH4NS";
const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager — static trusted snippet */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5995172189982724"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-navy-900 text-white min-h-screen">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
