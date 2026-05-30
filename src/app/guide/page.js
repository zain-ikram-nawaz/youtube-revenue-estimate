import React from "react";
import HomeListing from "../../components/HomeListing/HomeListing";
import { getGuides } from "../hooks/getGuides";
import Link from "next/link";
import Script from "next/script";
export const revalidate = 3600;

export async function generateMetadata({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const isFirstPage = page === 1;
    const canonicalUrl = page === 1
        ? "https://channelincome.com/guide"
        : `https://channelincome.com/guide?page=${page}`;

    return {
        title: isFirstPage
            ? "YouTube Monetization Guides 2026"
            : `YouTube Creator Guides – Page ${page}`,
        description: isFirstPage
            ? "Free guides on YouTube monetization, RPM vs CPM, growing your channel, and understanding ad revenue in 2026. Practical, data-backed advice for creators."
            : `More YouTube creator guides on page ${page}. Learn about monetization, RPM, CPM, and channel growth strategies.`,
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: isFirstPage ? "YouTube Monetization Guides 2026 | ChannelIncome" : `YouTube Creator Guides – Page ${page} | ChannelIncome`,
            description: "Free guides on YouTube monetization, RPM, CPM, and channel growth. Data-backed advice for creators worldwide.",
            url: canonicalUrl,
            type: "website",
        },
    };
}

const categories = [
    {
        title: "Monetization Basics",
        desc: "Understand how YouTube pays creators — CPM, RPM, AdSense, and the YouTube Partner Program explained simply.",
        icon: "💰",
    },
    {
        title: "Revenue Optimization",
        desc: "Learn which niches pay the most, how audience geography affects earnings, and strategies to increase your RPM.",
        icon: "📈",
    },
    {
        title: "Channel Growth",
        desc: "Proven tactics for growing subscribers, improving watch time, and building an audience that generates consistent income.",
        icon: "🚀",
    },
    {
        title: "YouTube Analytics",
        desc: "Make sense of your YouTube Studio data — which metrics matter, which ones to ignore, and how to act on what you see.",
        icon: "📊",
    },
];

export default async function GuideListingPage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const limit = 8;

    const { guides, pagination: { totalPages } } = await getGuides(page, limit);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `YouTube Creator Guides – Page ${page}`,
        description: "Expert guides on YouTube monetization, RPM, CPM, channel growth, and ad revenue optimization.",
        url: `https://channelincome.com/guide${page > 1 ? `?page=${page}` : ""}`,
        hasPart: {
            "@type": "ItemList",
            numberOfItems: guides.length,
            itemListOrder: "http://schema.org/ItemListOrderDescending",
            itemListElement: guides.map((guide, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://channelincome.com/guide/${guide.slug}`,
                name: guide.title,
            })),
        },
    };

    return (
        <div className="flex flex-col items-center py-10 px-4">
            <Script
                id="collection-page-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Page Header */}
            <div className="text-center mb-8 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    YouTube Creator Guides <span className="text-red-600">(2026)</span>
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Practical guides on YouTube monetization, RPM, CPM, and channel growth. Free, data-backed, no fluff.
                </p>
            </div>

            {/* Intro — what this library covers (GEO/AEO content) */}
            {page === 1 && (
                <div className="w-full max-w-5xl mb-10 space-y-6">

                    {/* Quick Answer */}
                    <div className="bg-white border-l-4 border-red-500 rounded-lg p-5 shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1">Quick Answer</p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            These guides explain how YouTube ad revenue works, why RPM differs by niche and country, and what creators can do to increase their earnings. Everything here is free — no subscription, no paywall.
                        </p>
                    </div>

                    {/* Category grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {categories.map((cat) => (
                            <div key={cat.title} className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                                <p className="text-2xl mb-2">{cat.icon}</p>
                                <h2 className="text-sm font-bold text-gray-900 mb-1">{cat.title}</h2>
                                <p className="text-xs text-gray-500 leading-relaxed">{cat.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Start Here */}
                    <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm">
                        <h2 className="text-sm font-bold text-gray-900 mb-2">New to YouTube Monetization? Start Here</h2>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">
                            If you&#39;re just getting started, the most important thing to understand is the difference between <strong>CPM</strong> (what advertisers pay) and <strong>RPM</strong> (what you actually earn). Most creators think they&#39;re the same — they&#39;re not. YouTube keeps 45% of every ad dollar. Our guides explain this clearly, along with practical steps to improve your earnings regardless of your channel size.
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">
                            Creators in finance and technology niches consistently earn 3–8× more per view than gaming or entertainment channels — not because they have more subscribers, but because advertisers pay more for those audiences. Understanding this dynamic is the foundation of every monetization decision you&#39;ll make.
                        </p>
                        <Link
                            href="/tool/youtube-revenue-calculator"
                            className="inline-flex items-center text-xs font-bold text-red-600 hover:text-red-700 transition"
                        >
                            Estimate your channel earnings with our free calculator →
                        </Link>
                    </div>

                </div>
            )}

            <HomeListing data={guides} />

            {/* Pagination */}
            <div className="flex items-center gap-6 mt-12 bg-gray-50 px-6 py-3 rounded-lg shadow-sm">
                {page > 1 ? (
                    <Link
                        href={`/guide/?page=${page - 1}`}
                        className="px-5 py-2 rounded-lg font-bold bg-white text-red-600 border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                        ← Previous
                    </Link>
                ) : (
                    <button disabled className="px-5 py-2 rounded-lg font-bold bg-gray-200 text-gray-400 cursor-not-allowed">
                        ← Previous
                    </button>
                )}

                <span className="font-bold text-gray-700">
                    Page <span className="text-red-600">{page}</span> of {totalPages}
                </span>

                {page < totalPages ? (
                    <Link
                        href={`/guide/?page=${page + 1}`}
                        className="px-5 py-2 rounded-lg font-bold bg-red-600 text-white hover:bg-red-700 transition-all shadow-md"
                    >
                        Next →
                    </Link>
                ) : (
                    <button disabled className="px-5 py-2 rounded-lg font-bold bg-gray-200 text-gray-400 cursor-not-allowed">
                        Next →
                    </button>
                )}
            </div>
        </div>
    );
}
