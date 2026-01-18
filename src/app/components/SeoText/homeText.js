"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function HomeIntroduction() {
  return (
    <div className={"bg-white text-gray-800"}>
      {/* ===== Hero Section (H1 Optimized for GSC Keywords) ===== */}
      <section
        className={`relative w-full bg-gradient-to-r from-red-600 to-red-800`}
      >
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
          {/* Left Text */}
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
              ✨ Free AI-Powered Creator Growth Engine
            </div>
            {/* H1: Target main GSC queries: AI, Revenue, RPM, CPM, 2026 */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              AI YouTube Revenue Estimator: Check RPM & CPM (2026 Updated)
            </h1>
            {/* H2: Focus on 'Difference' and 'Growth' - High Impression Keywords */}
            <h2 className="text-xl md:text-2xl font-medium mb-8 opacity-90 leading-relaxed">
              Understand the <b>difference between RPM and CPM</b>, calculate estimated earnings,
              and get personalized AI tips to scale your channel revenue instantly.
            </h2>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              {/* Primary CTA */}
              <Link
                href="/tool/youtube-revenue-estimator"
                className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold bg-white text-red-600 rounded-xl shadow-xl hover:bg-gray-100 transition transform hover:scale-105"
              >
                📊 Try AI Revenue Estimator
              </Link>
              {/* Secondary CTA */}
              <Link
                href="/guide"
                className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold border border-white text-white rounded-xl shadow hover:bg-white hover:text-red-600 transition transform hover:scale-105"
              >
                📘 Get AI Growth Tips
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-red-500/20 blur-lg"></div>
              <Image
                width={800}
                height={800}
                src="/hero.png"
                alt="AI YouTube Revenue Estimator Dashboard showing RPM and CPM analytics"
                className="relative rounded-xl shadow-2xl w-full max-w-md h-auto object-cover border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Core Tools Section (Detailed Feature List) ===== */}
      <section id="tools" className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* YouTube Tool Section */}
        <div
          className={`flex flex-col md:flex-row items-center rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100`}
        >
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-4">
              📈 Comprehensive Creator Audit
            </div>
            {/* H2: Emphasizing RPM vs CPM Difference */}
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              Analyze RPM Rates, CPM Brackets & View Velocity
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed text-lg">
              Simply enter your channel link and let our AI analyze your <b>YouTube earnings</b>.
              Our tool explains the <b>RPM vs CPM difference</b> in simple terms, helping you
              track <b>Monetization Compliance</b> and your progress toward the 4000 watch hours goal.
            </p>
            {/* Feature Highlights */}
            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">✓</span>
                <span><b>AI Revenue Forecast:</b> Accurate lifetime & monthly revenue estimates.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">✓</span>
                <span><b>RPM Analysis:</b> See how much you earn per 1,000 views in 2026.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">✓</span>
                <span><b>Monetization Checker:</b> Track subscribers and watch hours needed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2 text-xl">✓</span>
                <span><b>View Velocity:</b> Real-time tracking of how fast your channel is growing.</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/tool/youtube-revenue-estimator"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-all transform hover:scale-105"
              >
                🚀 Check My Channel Performance
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-red-100 rounded-2xl group-hover:bg-red-200 transition-colors"></div>
              <Image
                width={1000}
                height={1000}
                src="/tool.png"
                alt="Detailed YouTube Channel Analytics and Revenue Dashboard"
                className="relative rounded-xl shadow-lg w-full h-auto object-cover border-2 border-white"
              />
            </div>
          </div>
        </div>

        {/* TikTok Tool - Placeholder for future SEO */}
        <div className={`flex flex-col md:flex-row items-center rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-gray-50 to-gray-100`}>
          <div className="md:w-1/2 p-8 md:p-12 order-2 md:order-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              <span className="mr-1">🆕</span> Multi-Platform Growth
            </div>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              Upcoming: TikTok Earnings & Growth Calculator
            </h2>
            <p className="mb-6 leading-relaxed text-gray-700">
              Soon, you’ll be able to compare <b>YouTube vs TikTok revenue</b>. Estimate TikTok earnings,
              track follower growth, and discover trending niche ideas for 2026.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guide"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-all transform hover:scale-105"
              >
                📚 Learn Growth Strategies
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center order-1 md:order-2">
            <div className="relative">
              <Image
                width={600}
                height={600}
                src="/tiktok.png"
                alt="TikTok Growth Tool Placeholder"
                className="relative rounded-xl shadow-lg w-full h-auto object-cover border-2 border-white opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/70 text-white px-6 py-2 rounded-lg font-bold">
                  Launching in 2026
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guides Section */}
        <div className={`flex flex-col md:flex-row items-center rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-red-50 to-orange-50`}>
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
              📖 Creator Education
            </div>
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              YouTube SEO, Content Strategy & RPM Growth Guides
            </h2>
            <p className="mb-6 leading-relaxed text-gray-700">
              Master the art of content creation with our <Link href="/guide" className={`font-semibold underline text-orange-700`}>expert creator guides</Link>.
              We reveal how to pick <b>high-CPM niches</b>, optimize for YouTube SEO, and increase your
              <b>revenue per mille (RPM)</b> using AI-driven research.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guide"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition-all transform hover:scale-105"
              >
                🔍 Explore 2026 Growth Tips
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center">
             <Image
                src="/guide.png"
                alt="YouTube SEO Guides and Content Strategy Tips for 2026"
                width={1000}
                height={1000}
                className="relative rounded-xl shadow-lg w-full h-auto object-cover border-2 border-white"
              />
          </div>
        </div>
      </section>

      {/* ===== Final Call to Action ===== */}
      <section className={`py-16 bg-gray-50 border-t border-gray-100`}>
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Stop Guessing Your Earnings. Start Growing with AI.
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Use the <b>ChannelIncome Revenue Estimator</b> to track your views,
            understand your RPM/CPM, and reach monetization faster.
          </p>
          <Link
            href="/tool/youtube-revenue-estimator"
            className="inline-flex items-center px-10 py-4 text-lg font-bold bg-red-600 text-white rounded-xl shadow-xl hover:bg-red-700 transition-all transform hover:scale-105"
          >
            ⚡ Start Your Channel Audit
          </Link>
        </div>
      </section>
    </div>
  );
}