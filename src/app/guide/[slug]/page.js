import { notFound } from "next/navigation";
import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";
import Image from "next/image";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ContentBlockRenderer from "../../components/ContentBlockRenderer/ContentBlockRenderer";
import { calculateReadTime } from "../../hooks/readTime";
import Script from "next/script";

// ✅ Metadata Function: Next.js Best Practice
export async function generateMetadata({ params }) {
    await connectDB();
    const guide = await Guide.findOne({ slug: params.slug }).lean();
// console.log(guide)
    if (!guide) {
        return {
            title: "Not Found",
            description: "The guide you are looking for does not exist.",
        };
    }

    // 🔗 Canonical URL for this specific guide
    const canonicalUrl = `https://channelincome.com/guide/${guide.slug}`;

    return {
        title: guide.metaTitle || guide.title,
        description: guide.metaDescription || guide.summary,
        keywords: guide.keywords,

        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: guide.metaTitle || guide.title,
            description: guide.metaDescription || guide.summary,
            url: canonicalUrl,
            type: "article", // It's an article/guide
            images: [
                {
                    url: guide.thumbnail || 'https://channelincome.com/default-guide-image.jpg',
                    alt: guide.title,
                },
            ],
        },
    };
}


export default async function GuidePage({ params }) {
    await connectDB();
    const guide = await Guide.findOne({ slug: params.slug }).lean();
    if (!guide) notFound();

    const readTime = calculateReadTime(guide);

    // ✅ JSON-LD Schemas
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.summary || guide.metaDescription,
        image: guide.thumbnail ? [guide.thumbnail] : ["https://channelincome.com/default-guide-image.jpg"],
        datePublished: guide.createdAt || new Date().toISOString(), // Assuming createdAt exists
        dateModified: guide.updatedAt || new Date().toISOString(), // Assuming updatedAt exists
        author: {
            "@type": "Organization",
            name: "ChannelIncome Team",
            url: "https://channelincome.com/about-us",
        },
        publisher: {
            "@type": "Organization",
            name: "ChannelIncome",
            logo: {
                "@type": "ImageObject",
                url: "https://channelincome.com/logo.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://channelincome.com/guide/${guide.slug}`,
        },
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: guide.faqs?.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })) || [],
    };

    return (
        <>
            {/* 🛑 Removed custom <SEO> component */}

            {/* ✅ 2. JSON-LD Scripts Added */}
            <Script
                id="article-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            {guide.faqs?.length > 0 && (
                <Script
                    id="faq-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            <div className="min-h-screen bg-gradient-to-br from-white to-red-50/30">
                {/* Header (No changes here) */}
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                        <Link href="/" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                </header>

                {/* Main Content (No changes here) */}
                <main className="max-w-3xl mx-auto px-4 py-8">
                    <article>
                        <span className="inline-block px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full mb-6 shadow-lg">
                            {guide.category}
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{guide.title}</h1>
                        {guide.summary && <p className="bg-red-50 p-6 rounded-xl mb-8">{guide.summary}</p>}
                        {guide.thumbnail && (
                            <div className="relative w-full h-64 md:h-80 lg:h-96 mb-12 rounded-2xl overflow-hidden shadow-2xl">
                                <Image src={guide.thumbnail} alt={guide.title} fill className="object-cover" />
                            </div>
                        )}

                        {/* Dynamic Blocks */}
                        {guide.blocks.map((block, i) => (
                            <ContentBlockRenderer key={i} block={block} index={i} />
                        ))}

                        {/* FAQs */}
                        {guide.faqs?.length > 0 && (
                            <section className="mt-12">
                                <h2 className="text-3xl font-bold mb-6">FAQs</h2>
                                {guide.faqs.map((faq, i) => (
                                    // 💡 Ensure ContentBlockRenderer can handle the 'faq' type correctly for rendering
                                    <ContentBlockRenderer key={i} block={{ type: "faq", ...faq }} />
                                ))}
                            </section>
                        )}
                    </article>
                </main>
            </div>
        </>
    );
}