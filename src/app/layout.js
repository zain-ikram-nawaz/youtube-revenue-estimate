import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Script from "next/script";

// 1. Viewport ko metadata se alag export karna zaroori hai (Next.js 15+ standard)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F5F0", // Optional: Browser bar color
};

export const metadata = {
  metadataBase: new URL("https://channelincome.com"),
  title: {
    default: "ChannelIncome | AI YouTube Revenue & Growth Tools",
    template: "%s | ChannelIncome",
  },
  description: "Advanced AI tools for YouTube creators. Estimate revenue, calculate RPM/CPM, and get growth insights.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: "ceGH6h4gKdjlKm13KVCK5w3B6H-4X24LNgFnyrGUl44",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>

        {/* Ahrefs Analytics - Script component use karna behtar hai */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="NIdfnJ32uBKcHx+IqKcQWg"
          strategy="afterInteractive"
        />

        {/* GTM Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-54N955N7');`,
          }}
        />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-E89R0241YL" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E89R0241YL');
          `}
        </Script>

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ChannelIncome",
              "url": "https://channelincome.com",
              "logo": "https://channelincome.com/icon.png",
              "sameAs": ["https://www.youtube.com/@channelincome"],
            }),
          }}
        />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-54N955N7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <Navbar />

        <main className="container mx-auto px-4 py-6" style={{ minHeight: '80vh' }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}