// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/page";
import Footer from "./components/Footer/page";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Complete SEO + Social + Brand Metadata (10/10 Optimized)
export const metadata = {
  metadataBase: new URL("https://channelincome.com"),
  title: {
    // Shorter, Brand-Focused Default Title
    default:
      "ChannelIncome | Free YouTube Revenue Estimator, Analytics & Growth Tool",
    // Clean Template
    template: "%s | ChannelIncome",
  },
  // Brand name included, strong value proposition
  description:
    "ChannelIncome: AI-Powered YouTube Revenue Estimator. Analyze monetization, real-time earnings, CPM, RPM, and subscriber growth with our advanced growth engine.",
  keywords: [
    "AI YouTube analytics", // Naya
    "CPM RPM calculator 2026",
    "YouTube Growth Tracker AI", // Naya
    "channel audit tool", // Naya
    "youtube revenue estimator",
    "youtube income calculator",
    "youtube earnings check",
    "YouTube Channel Analytics",
    "YouTube Monetization Checker",
    "YouTube SEO Tool",
    "CPM RPM calculator",
    "youtube money calculator",
  ],
  authors: [
    {
      name: "ChannelIncome Team",
      url: "https://channelincome.com",
    },
  ],
  creator: "ChannelIncome",
  publisher: "ChannelIncome",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://channelincome.com/",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    // Brand name used consistently
    title:
      "ChannelIncome | Free YouTube Analytics Tool: Revenue, CPM, & Growth",
    description:
      "Analyze YouTube monetization, earnings, CPM, RPM, and subscriber growth. Get instant channel analytics and performance insights with ChannelIncome.",
    url: "https://channelincome.com",
    siteName: "ChannelIncome",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "ChannelIncome - YouTube Analytics Tool Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // twitter: { ... (Uncomment and update with your handle when ready) },
  category: "technology",
  applicationName: "ChannelIncome",
  generator: "Next.js",
  verification: {
    google: "ceGH6h4gKdjlKm13KVCK5w3B6H-4X24LNgFnyrGUl44", // 🔹 Keep your Google Search Console code
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Mobile Responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon */}
        <link rel="icon" href="/icon.png" />

        {/* Theme Color */}
        <meta name="theme-color" content="#ffffff" />
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="NIdfnJ32uBKcHx+IqKcQWg" async></script>
        {/* 1. ✅ WebSite Schema - Separate for clarity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ChannelIncome",
              url: "https://channelincome.com/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://channelincome.com/search?q={search_term_string}", // Use /search for cleaner URLs
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* 2. ✅ Organization Schema - Added for Brand Authority */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ChannelIncome",
              url: "https://channelincome.com/",
              logo: "https://channelincome.com/icon.png",
              description: "Free YouTube Revenue Estimator and Channel Analytics Tool.",
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {/* ✅ Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E89R0241YL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E89R0241YL');
          `}
        </Script>
        <Navbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}