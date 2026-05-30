import React from "react";
import About from "../../components/About/About";

export const metadata = {
    title: {
        absolute: "About ChannelIncome – Free YouTube Revenue Calculator",
    },
    description:
        "ChannelIncome is a free YouTube revenue calculator built by Zain Ikram. Estimate channel earnings using real CPM & RPM data across all niches and countries.",
    openGraph: {
        title: "About ChannelIncome – Free YouTube Revenue Calculator",
        description:
            "Free YouTube earnings estimator built on real CPM & RPM data. Learn about ChannelIncome's methodology and the creator behind the tool.",
        url: "https://channelincome.com/about-us",
        siteName: "ChannelIncome",
        images: [
            {
                url: "https://channelincome.com/og-image.png",
                width: 1200,
                height: 630,
                alt: "About ChannelIncome – Free YouTube Revenue Calculator",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About ChannelIncome – Free YouTube Revenue Calculator",
        description:
            "Free YouTube revenue estimator built by Zain Ikram. Real CPM & RPM data for all niches and countries.",
        images: ["https://channelincome.com/og-image.png"],
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
            name: "Zain Ikram Nawaz",
            url: "https://pk.linkedin.com/in/zain-ikram-nawaz-65b5312a9",
            sameAs: [
                "https://github.com/zain-ikram-nawaz",
                "https://pk.linkedin.com/in/zain-ikram-nawaz-65b5312a9"
            ]
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