"use client";
import React, { useState } from "react";
import Link from "next/link";
export default function FAQPage({ faq = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✅ Check correctly — if faq is empty
  if (!faq || faq.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <p className="text-gray-500 text-sm">
          No guides available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen py-10 px-4">
      <div className="bg-white rounded-[6px] shadow-sm border border-gray-100 p-5 max-w-2xl mx-auto">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-5 text-center">
          {faq?.title || "Frequently Asked Questions"}
        </h2>

        <div className="space-y-3">
          {faq.map((f, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-[6px] overflow-hidden transition-all duration-200 bg-white"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800 text-sm pr-4">{f?.q}</span>
                <span
                  className={`transform transition-transform duration-200 text-red-500 flex-shrink-0 ${
                    openIndex === i ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              {openIndex === i && (
                <div className="px-4 pb-3 pt-1 text-gray-600 text-[13px] leading-relaxed border-t border-gray-50 bg-gray-50/50">
                  {f?.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Optional: Compact footer CTA matching the theme */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500 mb-3">
            Still have questions?
          </p>
          <Link href="/contact-us" className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-[6px] shadow-sm hover:bg-red-700 transition-all active:scale-95">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}