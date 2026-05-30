import { notFound } from "next/navigation";
import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";
import Image from "next/image";
import { Clock, ArrowLeft, TrendingUp, Calendar, Tag, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import ContentBlockRenderer from "../../../components/ContentBlockRenderer/ContentBlockRenderer";
import { calculateReadTime } from "../../hooks/readTime";
import Script from "next/script";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    await connectDB();
    const guide = await Guide.findOne({ slug }).lean();

    if (!guide) return { title: "Guide Not Found" };

    const canonicalUrl = `https://channelincome.com/guide/${guide.slug}`;

    const ogImage = guide.thumbnail && guide.thumbnail !== ''
        ? guide.thumbnail
        : 'https://channelincome.com/icon.png';

    return {
        title: guide.metaTitle || `${guide.title} | ChannelIncome`,
        description: guide.metaDescription || guide.summary,
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: guide.metaTitle || guide.title,
            description: guide.metaDescription || guide.summary,
            url: canonicalUrl,
            type: "article",
            images: [{ url: ogImage, width: 1200, height: 630, alt: guide.metaTitle || guide.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: guide.metaTitle || guide.title,
            description: guide.metaDescription || guide.summary,
            images: [ogImage],
        },
    };
}

export default async function GuidePage({ params }) {
    const { slug } = await params;
    await connectDB();
    const guide = await Guide.findOne({ slug }).lean();
// console.log(guide)
    if (!guide) notFound();

    const readTime = calculateReadTime(guide);

    // ✅ Multi-Schema for SEO (Article + Breadcrumb + FAQ)
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": guide.title,
            "description": guide.summary,
            "image": guide.thumbnail,
            "author": { "@type": "Organization", "name": "ChannelIncome Team" },
            "datePublished": guide.createdAt,
            "dateModified": guide.updatedAt || guide.createdAt,
            "publisher": {
                "@type": "Organization",
                "name": "ChannelIncome",
                "logo": { "@type": "ImageObject", "url": "https://channelincome.com/icon.png" }
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://channelincome.com" },
                { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://channelincome.com/guide" },
                { "@type": "ListItem", "position": 3, "name": guide.title, "item": `https://channelincome.com/guide/${guide.slug}` }
            ]
        }
    ];

    return (
        <>
            <Script id="guide-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="min-h-screen bg-white">
                {/* Modern Header with Navigation Context */}
                <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                        <nav className="flex items-center gap-2 text-sm font-medium text-gray-500">
                            <Link href="/guide" className="hover:text-red-600 transition-colors">Library</Link>
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                            <span className="text-gray-900 line-clamp-1 hidden sm:block">{guide.title}</span>
                        </nav>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <Clock className="w-3.5 h-3.5 text-red-500" />
                                <span>{readTime} MIN READ</span>
                            </div>
                            <Link href="/tool/youtube-revenue-calculator" className="bg-black text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-red-600 transition-all shadow-md">
                                REVENUE TOOL
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-4 pt-10 pb-20">
                    <article>
                        {/* Heading & Badge */}
                        <div className="text-center mb-10">
                            <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-[10px] font-black rounded-lg uppercase tracking-[0.2em] mb-6 border border-red-100">
                                {guide.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6">
                                {guide.title}
                            </h1>
                            <div className="flex items-center justify-center gap-6 text-gray-400 text-sm font-bold uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(guide.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    <span>Verified Strategy</span>
                                </div>
                            </div>
                        </div>

                        {/* Summary Block */}
                        <div className="max-w-3xl mx-auto mb-16">
                            <div className="p-8 bg-gray-50 rounded-lg border border-gray-100 relative">
                                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                                    {guide.summary}
                                </p>
                            </div>
                        </div>

                        {/* Hero Image */}
                        {guide.thumbnail && (
                            <div className="relative w-full aspect-video mb-16 rounded-lg overflow-hidden shadow-2xl group">
                                <Image
                                    src={guide.thumbnail}
                                    alt={guide.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        )}

                        {/* Article Content - Styled for Readability */}
                        <div className="max-w-3xl mx-auto prose prose-lg prose-red
                            prose-headings:text-gray-900 prose-headings:font-black
                            prose-p:text-gray-700 prose-p:leading-relaxed
                            prose-strong:text-red-600 prose-strong:font-bold
                            prose-img:rounded-lg prose-img:shadow-2xl">

                            {guide.blocks.map((block, i) => (
                                <ContentBlockRenderer key={i} block={block} index={i} />
                            ))}
                        </div>
                        {/* ✅ Keywords Visual Rendering (Top Section) */}
                    {guide.keywords && (
                        <div className="flex flex-wrap gap-2 my-10">
                            {guide.keywords.map((kw, i) => (
                                <span key={i} className="flex items-center gap-1 text-sm font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                                    <Search className="w-3 h-3 text-red-400" /> {kw}
                                </span>
                            ))}
                        </div>
                    )}

                        {/* Tags Section */}
                        {guide.tags && (
                            <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-gray-100">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Focus Keywords</h3>
                                <div className="flex flex-wrap gap-2">
                                    {guide.tags.map((tag, idx) => (
                                        <span key={idx} className="px-4 py-2 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg border border-gray-100 hover:border-red-200 transition-colors">
                                            #{tag.replace(/\s+/g, '')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Final CTA Box - The Revenue Push */}
                        <div className="max-w-3xl mx-auto mt-24 relative p-1 bg-gradient-to-br from-red-500 to-black rounded-lg shadow-2xl">
                            <div className="bg-white rounded-[2.9rem] p-10 text-center">
                                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                                    Turn Your Watch Time Into <span className="text-red-600">Passive Income</span>
                                </h3>
                                <p className="text-gray-500 font-medium text-lg mb-8">
                                    Don't just get views. Use our revenue estimator to see how much your 4000 hours are worth in different countries.
                                </p>
                                <Link href="/tool/youtube-revenue-calculator" className="inline-block px-10 py-5 bg-red-600 text-white font-black rounded-lg hover:bg-black transition-all shadow-xl hover:-translate-y-1">
                                    OPEN ANALYTICS TOOL
                                </Link>
                            </div>
                        </div>

                        {/* FAQs - Rich Snippet Ready */}
                        {guide.faqs?.length > 0 && (
                            <div className="max-w-3xl mx-auto mt-24">
                                <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
                                    <span className="text-red-600">FAQ</span> Section
                                </h2>
                                <div className="space-y-4">
                                    {guide.faqs.map((faq, i) => (
                                        <details key={i} className="group border border-gray-100 rounded-lg overflow-hidden">
                                            <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-gray-900 hover:bg-gray-50 list-none">
                                                {faq.question}
                                                <span className="text-red-500 group-open:rotate-180 transition-transform">↓</span>
                                            </summary>
                                            <div className="p-6 pt-0 text-gray-600 leading-relaxed bg-gray-50/50 font-medium">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>
                </main>
            </div>
        </>
    );
}