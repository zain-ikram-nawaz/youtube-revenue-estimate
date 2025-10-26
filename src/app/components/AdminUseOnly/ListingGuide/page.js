import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page({ data, role }) {
  if (!data || data?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-gray-600 text-lg font-medium">No guides found</p>
          <p className="text-gray-400 text-sm mt-2">
            Check back later for new content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            YouTube Guides
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Expert tips and strategies to grow your YouTube channel
          </p>
        </div>

        {/* Grid */}
     <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {data?.slice(0,8).toReversed()?.map((guide) => (
    <Link href={`/guide/${guide.slug}`} key={guide._id}>
      <div className="group relative bg-white/70 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-100/50 rounded-3xl overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 via-transparent to-purple-200/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={guide?.image || "/icon.png"}
            alt={guide?.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-gray-900 transition-colors">
            {guide?.title}
          </h2>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
            {guide?.metaDescription}
          </p>

          {/* Footer Info */}
          <div className="flex items-center justify-between border-gray-100/80">
            <div className="flex items-center space-x-2"></div>
            <div className="text-gray-400 text-xs font-medium">
              {new Date(guide?.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>


        {/* ✅ Explore Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/guide"
            className="px-8 py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-red-600 to-pink-200 hover:from-red-700 hover:to-pink-700 shadow-md hover:shadow-lg transition-all duration-300"
          >
            🚀 Explore All Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
