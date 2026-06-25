import { notFound } from "next/navigation";
import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";
import Image from "next/image";
import { Clock, Calendar, ArrowLeft, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import MarkdownRenderer from "../../../components/MarkdownRenderer/MarkdownRenderer";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const guide = await Guide.findOne({ slug }).lean();
  if (!guide) return { title: "Guide Not Found" };

  const canonicalUrl = `https://channelincome.com/guide/${guide.slug}`;
  const ogImage = guide.coverImage || guide.thumbnail || "https://channelincome.com/icon.png";

  return {
    title: guide.metaTitle || `${guide.title} | ChannelIncome`,
    description: guide.metaDescription || guide.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: guide.metaTitle || guide.title,
      description: guide.metaDescription || guide.excerpt,
      url: canonicalUrl,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: guide.coverImageAlt || guide.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle || guide.title,
      description: guide.metaDescription || guide.excerpt,
      images: [ogImage],
    },
  };
}

function extractHeadings(markdown = "") {
  const lines = markdown.split("\n");
  const headings = [];
  lines.forEach((line) => {
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    if (h2) headings.push({ level: 2, text: h2[1], id: h2[1].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") });
    if (h3) headings.push({ level: 3, text: h3[1], id: h3[1].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") });
  });
  return headings;
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  await connectDB();
  const guide = await Guide.findOne({ slug }).lean();
  if (!guide) notFound();

  const headings = extractHeadings(guide.content || "");
  const coverImage = guide.coverImage || guide.thumbnail;
  const readTime = guide.readTime || Math.max(1, Math.ceil((guide.content || "").split(/\s+/).length / 200));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.metaDescription || guide.excerpt,
      image: coverImage || "https://channelincome.com/icon.png",
      author: { "@type": "Person", name: guide.author || "ChannelIncome Team" },
      publisher: {
        "@type": "Organization",
        name: "ChannelIncome",
        logo: { "@type": "ImageObject", url: "https://channelincome.com/icon.png" },
      },
      datePublished: guide.publishedAt || guide.createdAt,
      dateModified: guide.updatedAt || guide.createdAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://channelincome.com/guide/${guide.slug}` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://channelincome.com" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://channelincome.com/guide" },
        { "@type": "ListItem", position: 3, name: guide.title, item: `https://channelincome.com/guide/${guide.slug}` },
      ],
    },
    ...(guide.faqs?.length > 0
      ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }]
      : []),
  ];

  return (
    <>
      <Script id="guide-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-white">
        {/* Sticky header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/guide" className="hover:text-green-600 transition font-medium flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Guides
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <span className="text-gray-900 font-semibold line-clamp-1 hidden sm:block max-w-xs">{guide.title}</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                <Clock className="w-3.5 h-3.5 text-green-500" />
                {readTime} min read
              </div>
              <Link href="/tool/youtube-revenue-calculator"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition">
                Calculator →
              </Link>
            </div>
          </div>
        </header>

        {/* Main layout: article + TOC sidebar */}
        <div className="max-w-6xl mx-auto px-4 py-10 flex gap-10">

          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Category badge */}
            {guide.category && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 uppercase tracking-wider">
                  <Tag className="w-3 h-3" /> {guide.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight mb-5">
              {guide.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(guide.publishedAt || guide.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-green-500" />
                {readTime} min read
              </div>
              {guide.author && <span className="font-medium text-gray-600">By {guide.author}</span>}
            </div>

            {/* Excerpt / Quick answer */}
            {guide.excerpt && (
              <div className="mb-8 p-5 bg-green-50 border-l-4 border-green-500 rounded-r-xl">
                <p className="text-[11px] font-bold uppercase tracking-widest text-green-600 mb-1">Quick Answer</p>
                <p className="text-sm text-gray-700 leading-relaxed">{guide.excerpt}</p>
              </div>
            )}

            {/* Cover Image */}
            {coverImage && (
              <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={coverImage}
                  alt={guide.coverImageAlt || guide.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Markdown Content */}
            {guide.content ? (
              <MarkdownRenderer content={guide.content} />
            ) : (
              guide.blocks?.length > 0 && (
                <p className="text-sm text-gray-400 italic">This is an older guide. Content may render differently.</p>
              )
            )}

            {/* Tags */}
            {guide.tags?.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {guide.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {guide.faqs?.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {guide.faqs.map((faq, i) => (
                    <details key={i} className="group border border-gray-100 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 list-none text-sm">
                        {faq.question}
                        <span className="text-green-500 ml-3 flex-shrink-0 group-open:rotate-180 transition-transform text-base">↓</span>
                      </summary>
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed bg-gray-50/50">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 p-8 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl text-center shadow-xl">
              <h3 className="text-xl font-black text-white mb-2">Calculate Your YouTube Earnings</h3>
              <p className="text-green-100 text-sm mb-5 max-w-md mx-auto">
                Use our free calculator — enter channel name, views, niche &amp; country for an instant revenue estimate.
              </p>
              <Link href="/tool/youtube-revenue-calculator"
                className="inline-block px-8 py-3 bg-white text-green-700 font-black rounded-xl hover:bg-green-50 transition shadow-lg text-sm">
                Open Free Calculator →
              </Link>
            </div>
          </article>

          {/* Table of Contents sidebar (desktop only) */}
          {headings.length >= 3 && (
            <aside className="hidden lg:block w-60 flex-shrink-0">
              <div className="sticky top-24">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contents</p>
                <nav className="space-y-1">
                  {headings.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.id}`}
                      className={`block text-xs text-gray-500 hover:text-green-600 hover:font-semibold transition py-0.5 truncate ${
                        h.level === 3 ? "pl-3 text-gray-400" : "font-medium"
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <Link href="/tool/youtube-revenue-calculator"
                    className="block w-full text-center px-4 py-2.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition">
                    Revenue Calculator →
                  </Link>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
