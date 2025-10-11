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

// ✅ Complete SEO + Social + Brand Metadata
export const metadata = {
  metadataBase: new URL("https://channelincome.com"),
  title: {
    default:
      "YouTube Channel Revenue Estimator | YouTube Analytics & Monetization Tool",
    template: "%s | YouTube Channel Revenue Estimator",
  },
  description:
    "Free YouTube Channel Revenue Estimator — analyze monetization, earnings, CPM, RPM, subscribers, and engagement in one advanced YouTube analytics tool.",
  keywords: [
    "youtube earnings check",
    "YouTube Money Calculator",
    "YouTube Channel Analytics",
    "YouTube Revenue Estimator",
    "YouTube Monetization Checker",
    "YouTube Earnings Calculator",
    "YouTube CPM RPM Calculator",
    "YouTube Subscribers Tracker",
    "YouTube Views Estimator",
    "YouTube SEO Tool",
    "YouTube Analytics Dashboard",
    "YouTube Growth Tracker",
    "YouTube Channel Insights",
    "YouTube Performance Report",
  ],
  authors: [
    {
      name: "YouTube Channel Revenue Estimator Team",
      url: "https://channelincome.com",
    },
  ],
  creator: "YouTube Channel Revenue Estimator",
  publisher: "YouTube Channel Revenue Estimator",
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
    title:
      "YouTube Channel Revenue Estimator | Free YouTube Analytics Dashboard",
    description:
      "Analyze YouTube monetization, earnings, CPM, RPM, and subscriber growth. Get instant channel analytics and performance insights.",
    url: "https://channelincome.com",
    siteName: "YouTube Channel Revenue Estimator",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "YouTube Channel Revenue Estimator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "YouTube Channel Revenue Estimator",
  //   description:
  //     "Estimate YouTube revenue, CPM, and monetization status — all in one free analytics tool for creators.",
  //   creator: "@YourTwitterHandle",
  //   images: ["/icon.png"],
  // },
  category: "technology",
  applicationName: "YouTube Channel Revenue Estimator",
  generator: "Next.js",
  verification: {
    google: "ceGH6h4gKdjlKm13KVCK5w3B6H-4X24LNgFnyrGUl44", // 🔹 Add your Google Search Console code
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

        {/* Additional meta for structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "YouTube Channel Revenue Estimator",
              url: "https://channelincome.com/",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://channelincome.com/?query={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              description:
                "Analyze YouTube channel analytics, monetization, and CPM instantly with our free revenue estimator tool.",
              publisher: {
                "@type": "Organization",
                name: "YouTube Channel Revenue Estimator",
                logo: {
                  "@type": "ImageObject",
                  url: "https://channelincome.com/icon.png",
                },
              },
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
