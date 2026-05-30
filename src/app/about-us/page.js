import React from "react";
import About from "../../components/About/About";

// ✅ Metadata (10/10 Optimized)
export const metadata = {
    title: "About ChannelIncome | YouTube Revenue Calculator & Channel Analytics Platform",
    description:
        "Learn about ChannelIncome — the team behind the free YouTube Revenue Estimator. We help creators understand monetization compliance, view velocity, CPM/RPM, and earning potential with data-driven YouTube analytics and growth insights.",
    keywords: [
        "About ChannelIncome",
        "YouTube Revenue Estimator team",
        "YouTube monetization compliance",
        "View Velocity tracker",
        "YouTube channel analytics platform",
        "YouTube creator growth tools",
        "channelincome.com",
        "YouTube revenue calculator creator"
    ],
    openGraph: {
        title: "About ChannelIncome | YouTube Analytics & Revenue Estimator Platform",
        description:
            "ChannelIncome is a free YouTube revenue calculator and channel analytics platform trusted by thousands of creators. Learn our mission to help YouTubers estimate earnings and grow faster.",
        url: "https://channelincome.com/about-us",
        siteName: "ChannelIncome",
        images: [
            {
                url: "https://channelincome.com/icon.png",
                width: 1200,
                height: 630,
                alt: "About ChannelIncome - Free YouTube Revenue Estimator & Analytics",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About ChannelIncome | Free YouTube Revenue Calculator",
        description:
            "Meet the creators behind ChannelIncome — building free YouTube analytics tools that help creators estimate revenue, track growth, and understand channel monetization.",
        images: ["https://channelincome.com/icon.png"],
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
        name: "ChannelIncome",
        url: "https://channelincome.com",
        logo: "https://channelincome.com/icon.png",
        description:
            "ChannelIncome is a free YouTube revenue calculator and analytics platform that helps creators estimate earnings, track channel performance, and understand monetization.",
        foundingDate: "2024",
        founder: {
            "@type": "Person",
            name: "ChannelIncome Team",
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