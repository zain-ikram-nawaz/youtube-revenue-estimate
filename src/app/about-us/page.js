import React from "react";
import About from "../../components/About/About";

// ✅ Metadata (10/10 Optimized)
export const metadata = {
    title: "About Channel Income | Free YouTube Analytics & Monetization Compliance Tool",
    description:
        "Learn about Channel Income — the team behind the free YouTube Revenue Estimator. We help creators understand **Monetization Compliance**, **View Velocity**, CPM/RPM, and earning potential with real data insights.",
    keywords: [
        "About Channel Income",
        "YouTube Revenue Estimator team",
        "YouTube monetization compliance",
        "View Velocity tracker",
        "YouTube income analytics",
        "creator growth platform",
        "channelincome.com",
    ],
    openGraph: {
        title: "About Channel Income | YouTube Analytics & View Velocity Tracker",
        description:
            "Channel Income helps creators and marketers estimate YouTube revenue, track **Monetization Compliance**, and analyze channel performance accurately using data-driven insights.",
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
        title: "About Channel Income | Free Creator Analytics Tool",
        description:
            "Meet the creators behind Channel Income — building free tools that help YouTubers estimate revenue, track growth, and understand monetization.",
        // site: "@yourtwitterhandle", // 🔹 Add later when you create one
        // creator: "@yourtwitterhandle",
        images: ["https://channelincome.com/images/about-banner.jpg"],
    },
    alternates: {
        canonical: "https://channelincome.com/about-us",
    },
};

export default function page() {
    // ✅ JSON-LD (Updated URL and Description for better SEO)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Channel Income",
        // The URL should ideally point to the canonical/homepage URL
        url: "https://channelincome.com",
        logo: "https://channelincome.com/icon.png",
        description:
            "Channel Income provides free YouTube analytics tools, including a Revenue Estimator, Monetization Compliance Tracker, and View Velocity analysis for content creators.",
        foundingDate: "2024",
        founder: {
            "@type": "Person",
            name: "Channel Income Team",
        },


    };

    return (
        <>
            {/* ✅ SEO JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <About />
        </>
    );
}