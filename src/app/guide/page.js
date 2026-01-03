import React from "react";
import HomeListing from "../components/HomeListing/page";
import { getGuides } from "../hooks/getGuides";
import Link from "next/link";
import Script from "next/script";

// ✅ Metadata (SEO Optimized for a Listing Page)
export async function generateMetadata({ searchParams }) {
    const resolvedSearchParams = await searchParams; // 👈 FIX
    const page = Number(resolvedSearchParams.page) || 1;
    const isFirstPage = page === 1;
    const canonicalUrl = 'https://channelincome.com/guide';

    return {
        title: isFirstPage
            ? "YouTube Growth Guides: SEO, Monetization, and Analytics | ChannelIncome"
            : `YouTube Growth Guides - Page ${page} | ChannelIncome`,

        description: isFirstPage
            ? "Access our free, in-depth guides on YouTube SEO, content strategy, monetization secrets, and advanced channel analytics. Grow your channel with expert tips."
            : `Page ${page} of our expert YouTube Growth Guides. Continue reading about SEO, CPM, RPM, and Monetization Compliance.`,

        keywords: [
            "YouTube growth guides",
            "YouTube SEO guide",
            "Monetization tips",
            "Channel analytics learning",
            `Guide page ${page}`,
        ],

        alternates: {
            canonical: canonicalUrl,
        },
    };
}


export default async function GuideListingPage({ searchParams }) {
    const resolvedSearchParams = await searchParams; // 👈 FIX
    const page = Number(resolvedSearchParams.page) || 1;
    const limit = 8;

    const { guides, pagination: { totalPages } } = await getGuides(page, limit);

    // ✅ JSON-LD for Collection Page (Listing Page Schema)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `YouTube Growth Guides - Page ${page}`,
        description: `Listing of expert guides on YouTube growth, SEO, and monetization strategy.`,
        url: "https://channelincome.com/guide",

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
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Script
                id="collection-page-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <h1 className="text-4xl font-bold text-gray-900 mb-8">YouTube Growth Guides</h1>

            <HomeListing data={guides} />

            <div className="flex gap-4 mt-6">
                {page > 1 ? (
                    <Link
                        href={`/guide/?page=${page - 1}`}
                        className="px-4 py-2 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                        Previous
                    </Link>
                ) : (
                    <button
                        disabled
                        className="px-4 py-2 rounded-xl font-semibold bg-gray-300 cursor-not-allowed"
                    >
                        Previous
                    </button>
                )}

                <span className="font-medium flex items-center">
                    Page {page} of {totalPages}
                </span>

                {page < totalPages ? (
                    <Link
                        href={`/guide/?page=${page + 1}`}
                        className="px-4 py-2 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                        Next
                    </Link>
                ) : (
                    <button
                        disabled
                        className="px-4 py-2 rounded-xl font-semibold bg-gray-300 cursor-not-allowed"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}