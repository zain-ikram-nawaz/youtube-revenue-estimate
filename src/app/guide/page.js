import React from "react";
import HomeListing from "../components/HomeListing/HomeListing";
import { getGuides } from "../hooks/getGuides";
import Link from "next/link";
import Script from "next/script";
export const revalidate = 3600;
// ✅ Metadata (SEO Optimized for CTR)
export async function generateMetadata({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const isFirstPage = page === 1;
    const canonicalUrl = page === 1
        ? 'https://channelincome.com/guide'
        : `https://channelincome.com/guide?page=${page}`;

    return {
    title: page === 1
            ? "YouTube Growth Guides 2026: Master RPM, CPM & SEO Secrets"
            : `Expert YouTube Growth Tips - Page ${page} | ChannelIncome`,

        description: isFirstPage
            ? "Master YouTube monetization with our free 2026 guides. Learn the difference between RPM and CPM, increase your earnings, and grow your channel organically."
            : `Explore more expert YouTube growth strategies on page ${page}. Learn about monetization and analytics.`,

        keywords: [
            "YouTube growth guides 2026",
            "YouTube RPM vs CPM guide",
            "How to increase YouTube revenue",
            "YouTube SEO strategy",
            "Monetization compliance tips",
        ],

       alternates: { canonical: canonicalUrl },
    };
}

export default async function GuideListingPage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const limit = 8;

    const { guides, pagination: { totalPages } } = await getGuides(page, limit);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `YouTube Growth Guides - Page ${page}`,
        "description": `Expert guides on YouTube growth, SEO, and revenue optimization.`,
        "url": `https://channelincome.com/guide${page > 1 ? `?page=${page}` : ''}`,
        "hasPart": {
            "@type": "ItemList",
            "numberOfItems": guides.length,
            "itemListOrder": "http://schema.org/ItemListOrderDescending",
            "itemListElement": guides.map((guide, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://channelincome.com/guide/${guide.slug}`,
                "name": guide.title,
            })),
        }
    };

    return (
        <div className="flex flex-col items-center py-10">
            <Script
                id="collection-page-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                    YouTube Growth Guides <span className="text-red-600">(2026)</span>
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Proven strategies to boost your RPM, understand CPM, and scale your channel revenue.
                </p>
            </div>

            <HomeListing data={guides} />

            {/* Pagination Controls */}
            <div className="flex items-center gap-6 mt-12 bg-gray-50 px-6 py-3 rounded-2xl shadow-sm">
                {page > 1 ? (
                    <Link
                        href={`/guide/?page=${page - 1}`}
                        className="px-5 py-2 rounded-xl font-bold bg-white text-red-600 border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                        ← Previous
                    </Link>
                ) : (
                    <button disabled className="px-5 py-2 rounded-xl font-bold bg-gray-200 text-gray-400 cursor-not-allowed">
                        ← Previous
                    </button>
                )}

                <span className="font-bold text-gray-700">
                    Page <span className="text-red-600">{page}</span> of {totalPages}
                </span>

                {page < totalPages ? (
                    <Link
                        href={`/guide/?page=${page + 1}`}
                        className="px-5 py-2 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition-all shadow-md"
                    >
                        Next →
                    </Link>
                ) : (
                    <button disabled className="px-5 py-2 rounded-xl font-bold bg-gray-200 text-gray-400 cursor-not-allowed">
                        Next →
                    </button>
                )}
            </div>
        </div>
    );
}