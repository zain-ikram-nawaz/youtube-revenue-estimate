import { notFound } from "next/navigation";
import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";
import Image from "next/image";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import SEO from "../../components/SEO/SEO";
import ContentBlockRenderer from "../../components/ContentBlockRenderer/ContentBlockRenderer";
import { calculateReadTime } from "../../hooks/readTime"

export default async function GuidePage({ params }) {
  await connectDB();
  const guide = await Guide.findOne({ slug: params.slug }).lean();
  if (!guide) notFound();

  const readTime = calculateReadTime(guide);

  return (
    <>
      {/* SEO for Google/AEO */}
      <SEO title={guide.metaTitle} description={guide.metaDescription} keywords={guide.keywords} />

      <div className="min-h-screen bg-gradient-to-br from-white to-red-50/30">
        {/* Header */}
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

        {/* Main Content */}
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
