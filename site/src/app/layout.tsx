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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Clarity Engine",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", site: "@ClarityEngineAI" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    other: {
      "google-adsense-account": ["ca-pub-5995172189982724"],
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://clarity-engine.ai/#organization",
      name: "Clarity Engine AI",
      url: "https://clarity-engine.ai",
      description:
        "Free SEO and content marketing tools to help you rank higher, write better, and grow faster",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "contact@clarity-engine.ai",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://clarity-engine.ai/#website",
      url: "https://clarity-engine.ai",
      name: "Clarity Engine AI",
      description:
        "17 free SEO tools to help you rank higher, write better, and grow faster",
      publisher: {
        "@id": "https://clarity-engine.ai/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://clarity-engine.ai/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// GTM: prefer env var, fall back to known ID
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MXHMH4NS";
const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD structured data — safe: serializes our own static data object */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        {/* Cloudflare Web Analytics */}
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
            strategy="afterInteractive"
          />
        )}
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
