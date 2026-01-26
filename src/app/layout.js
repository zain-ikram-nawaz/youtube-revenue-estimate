// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Global Metadata (Sirf wo cheezein jo poori site ke liye same hain)
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
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />

  {/* Google Tag Manager - Head Snippet */}
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

        {/* Ahrefs Analytics */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="NIdfnJ32uBKcHx+IqKcQWg" async></script>

        {/* ✅ Global Organization Schema (Branding ke liye) */}



        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ChannelIncome",
              "url": "https://channelincome.com/",
              "logo": "https://channelincome.com/icon.png",
              "sameAs": [
                "https://www.youtube.com/@channelincome" // Agar social media hai toh yahan add karein
              ],
            }),
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        {/* ✅ Google Analytics */}
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
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-54N955N7"
          height="0" width="0"></iframe></noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}

        <Navbar />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}