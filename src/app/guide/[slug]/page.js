import { notFound } from "next/navigation";
import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";
import Image from "next/image";
import { Calendar, User, ArrowLeft, Share2, Clock, Bookmark } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// ✅ Metadata for SEO
export async function generateMetadata(props) {
  const params = await props.params;
  await connectDB();
  const guide = await Guide.findOne({ slug: params.slug }).lean();

  if (!guide) {
    return {
      title: "Guide Not Found | MySite",
      description: "This guide could not be found.",
    };
  }

  return {
    title: guide.metaTitle || `${guide.title} | MySite`,
    description: guide.metaDescription || guide.summary,
    openGraph: {
      title: guide.metaTitle || guide.title,
      description: guide.metaDescription || guide.summary,
      images: [
        {
          url: guide.image || "/default.jpg",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
      type: "article",
      publishedTime: guide.publishedAt,
      authors: [guide.author],
      tags: guide.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle || guide.title,
      description: guide.metaDescription || guide.summary,
      images: [guide.image || "/default.jpg"],
    },
  };
}



// ✅ Page component
export default async function GuidePage(props) {
  const params = await props.params;
  await connectDB();
  const guide = await Guide.findOne({ slug: params.slug }).lean();

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50/30">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-all duration-200 font-semibold group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            {/* <GuideActions /> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Article Header */}
        <article className="mb-12">
          {/* Category Badge */}
          {guide.category && (
            <span className="inline-block px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full mb-6 shadow-lg shadow-red-500/25">
              {guide.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {guide.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <User className="w-4 h-4 text-red-500" />
              <span className="font-semibold text-gray-700">{guide.author}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <Calendar className="w-4 h-4 text-red-500" />
              <time dateTime={guide.publishedAt} className="font-medium">
                {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>
            {guide.readTime && (
              <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg shadow-red-500/25">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">{guide.readTime} min read</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {guide.summary && (
            <div className="bg-gradient-to-r from-red-50 to-white border border-red-100 p-6 rounded-2xl mb-10 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                {guide.summary}
              </p>
            </div>
          )}
        </article>

        {/* Featured Image */}
        {guide.image && (
          <div className="relative w-full h-80 md:h-96 lg:h-[500px] mb-12 rounded-md overflow-hidden shadow-2xl">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 700px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <section className="prose prose-lg max-w-none mb-16 text-gray-700 leading-relaxed text-lg">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
      p: ({ node, ...props }) => <p className="mb-4" {...props} />,
      h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />,
      h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-6 mb-3" {...props} />,
      ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4" {...props} />,
      ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4" {...props} />,
      li: ({ node, ...props }) => <li className="mb-1" {...props} />,
      strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
      em: ({ node, ...props }) => <em className="italic text-gray-600" {...props} />,
    }}
  >
    {guide.content}
  </ReactMarkdown>
</section>

        {/* Tags Section */}
        {guide.tags?.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Explore More Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {guide.tags.map((tag, i) => (

                <button
                  key={i}
                  // href={`/guides?tag=${tag}`}
                  className="px-5 py-3 text-sm bg-red-50 text-red-700 rounded-xl font-semibold hover:bg-red-100 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Author Footer */}
        <footer className="bg-gradient-to-r from-white to-red-50 rounded-2xl p-8 border border-red-100">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{guide.author}</h4>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Thank you for reading this guide. If you found it helpful, consider sharing it with others who might benefit from it.
              </p>
              <div className="text-sm text-gray-500">
                Published on{" "}
                <time className="font-semibold text-red-600">
                  {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}