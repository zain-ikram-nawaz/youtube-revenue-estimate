"use client";
import React from "react";
import Link from "next/link";

export default function YoutubeGuide({ guidData }) {
  const formatContent = (text) => {
    if (!text) return null;
    return text.split("\n\n").map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph}
      </p>
    ));
  };
if(!guidData){
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>No guide found.</p>
      </div>
    );
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* ✅ Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              YouTube Guide
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              📅 {guidData.publishedDate || "Unknown date"}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {guidData.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            {guidData.metaDescription ||
              "Learn helpful tips and strategies to grow your YouTube channel effectively."}
          </p>

          <div className="flex items-center mt-6 pt-6 border-t border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              Y
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {guidData.author || "Channel Income Team"}
              </p>
              <p className="text-xs text-gray-500">YouTube Expert</p>
            </div>
          </div>
        </div>

        {/* ✅ Content Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <article className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed">
              {formatContent(guidData.content)}
            </div>
          </article>

          {/* ✅ Keywords Section */}
          {guidData.keywords && guidData.keywords.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {guidData.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ✅ CTA Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ready to Grow Your Channel?
            </h3>
            <p className="text-gray-600 mb-4">
              Use our YouTube Channel Revenue Estimator to plan your monetization strategy.
            </p>
            <Link
                href="/"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Try Estimator Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
