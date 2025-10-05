"use client";
import Link from 'next/link';
import { useState } from 'react';

const YouTubeGuidePage = ({ data }) => {
return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          YouTube Growth & Monetization Guides (2025)
        </h1>

        <div className="grid gap-6">
          {data.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4">{blog.description}</p>

              <Link
                href={`/youtube-guides/${blog.slug}`}
                className="text-red-600 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
);


};

export default YouTubeGuidePage;