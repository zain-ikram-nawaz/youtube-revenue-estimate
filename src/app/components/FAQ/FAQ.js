"use client";
import React, { useState } from "react";

export default function FAQPage({ faq = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✅ Check correctly — if faq is empty
  if (!faq || faq.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          No guides available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto my-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
        {faq?.title || "Frequently Asked Questions"}
      </h2>

      <div className="space-y-4">
        {faq.map((f, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => toggleFAQ(i)}
              className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
            >
              <span className="font-semibold text-gray-800">{f?.q}</span>
              <span
                className={`transform transition-transform duration-300 ${
                  openIndex === i ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {openIndex === i && (
              <div className="px-4 pb-3 text-gray-700 text-sm border-t border-gray-100 bg-gray-50">
                {f?.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
