import React from "react";
import data from "../../../data/data.json";

export default function Page({ params }) {
  const { slug } = params;

  // ✅ Find the blog by slug
  const blog = data.find((item) => item.slug === slug);

  // ✅ If no blog found
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>No guide found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {blog.title}
        </h1>

        <p className="text-gray-500 text-sm mb-4">
          📅 Published on {blog.date || "2025"}
        </p>

        <p className="text-gray-700 mb-6">{blog.description}</p>

        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </div>
    </div>
  );
}
