import React from "react";
import About from "../components/About/page";

export const metadata = {
  title: "About Channel Income | YouTube Revenue Estimator Team",
  description:
    "Learn about Channel Income — the team behind the free YouTube Revenue Estimator. We help creators understand YouTube monetization, CPM, RPM, and earning potential with real data insights.",
  keywords: [
    "About Channel Income",
    "YouTube Revenue Estimator team",
    "YouTube monetization experts",
    "YouTube income analytics",
    "channelincome.com",
  ],
  openGraph: {
    title: "About Channel Income | YouTube Revenue Estimator",
    description:
      "Channel Income helps creators and marketers estimate YouTube revenue accurately using data-driven insights and advanced tools.",
    url: "https://channelincome.com/about-us",
    siteName: "Channel Income",
    images: [
      {
        url: "https://channelincome.com/images/about-banner.jpg",
        width: 1200,
        height: 630,
        alt: "About Channel Income - YouTube Revenue Estimator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Channel Income | YouTube Revenue Estimator Team",
    description:
      "Meet the creators behind Channel Income — building tools that help YouTubers estimate and understand revenue potential.",
    // site: "@yourtwitterhandle", // 🔹 Add later when you create one
    // creator: "@yourtwitterhandle",
    images: ["https://channelincome.com/images/about-banner.jpg"],
  },
  alternates: {
    canonical: "https://channelincome.com/about-us",
  },
};

export default function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Channel Income",
    url: "https://channelincome.com/about-us",
    logo: "https://channelincome.com/images/logo.png",
    description:
      "Channel Income provides free YouTube analytics and revenue estimation tools for content creators and marketers.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Channel Income Team",
    },
    // contactPoint: {
    //   "@type": "ContactPoint",
    //   contactType: "Customer Support",
    //   email: "support@channelincome.com",
    // },
    sameAs: [
      // Add later when you have social links
      // "https://www.facebook.com/channelincome",
      // "https://www.linkedin.com/company/channelincome",
      // "https://www.instagram.com/channelincome",
    ],
  };

  return (
    <>
      {/* ✅ SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ✅ About Section */}
      <About />
    </>
  );
}
