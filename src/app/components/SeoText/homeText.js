"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function HomeIntroduction() {
  return (
    <div className={"bg-white text-gray-800"}>
      {/* ===== Hero Section (H1 Optimized) ===== */}
      <section
        className={`relative w-full bg-gradient-to-r from-red-600 to-red-800`}
      >
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
          {/* Left Text */}
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
              ✨ Free Creator Growth Platform.....
            </div>
            {/* H1: Focuses on core value + analytics */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Instant YouTube Revenue Calculator & Deep Channel Analytics Tool
            </h1>
            {/* H2: Incorporates key metrics */}
            <h2 className="text-xl md:text-2xl font-medium mb-8 opacity-90">
              Calculate Estimated Revenue, Track CPM/RPM, Check
              Monetization Compliance, and Analyze View Velocity for
              rapid channel growth.
            </h2>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              {/* Primary CTA */}
              <Link
                href="/tool/youtube-revenue-estimator"
                className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold bg-white text-red-600 rounded-xl shadow-xl hover:bg-gray-100 transition transform hover:scale-105"
              >
                📊 Get Free Analytics Now
              </Link>
              {/* Secondary CTA (Internal Link) */}
              <Link
                href="/guide"
                className="inline-flex items-center justify-center px-8 py-5 text-lg font-bold border border-white text-white rounded-xl shadow hover:bg-white hover:text-red-600 transition transform hover:scale-105"
              >
                📘 Read Growth Tips
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div
                className={`absolute -inset-4 rounded-2xl "bg-red-500/20"`}
              ></div>
              <Image
                width={800}
                height={800}
                src="/hero.png"
                alt="YouTube Revenue Estimator Tool Dashboard Showing Metrics"
                className="relative rounded-xl shadow-2xl w-full max-w-md h-auto object-cover border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Core Tools Section (Detailed Feature List) ===== */}
      <section id="tools" className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* YouTube Tool */}
        <div
          className={`flex flex-col md:flex-row items-center rounded-2xl overflow-hidden shadow-xl bg-white`}
        >
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-4">
              📈 Comprehensive Creator Audit
            </div>
            {/* H2: Emphasizing the analysis depth */}
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              Deep Dive: Lifetime Revenue, Monetization, and Performance Metrics
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Simply enter a channel link and instantly access detailed
              analytics. Our tool goes beyond basic estimation, providing you
              with essential data points like View Velocity, Channel Age,
              Average Engagement Rate, and a clear breakdown of Monetization
              Compliance Score (subscribers/watch hours needed).
            </p>
            {/* Feature Highlights using your list */}
            <ul className="space-y-2 mb-6 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span> Earning Estimates: Lifetime & Avg Monthly Revenue by RPM Brackets.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span> Growth Analysis: Track Subscribers, Total Views, Creation Date, and Avg Monthly Views.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span> Content Strategy: Analyze Upload Frequency, Retention, and Top Performing Video.
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✓</span> Monetization Ready? See Overall Compliance score, Watch Hours Needed, and Subscribers Needed.
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/tool/youtube-revenue-estimator"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-all transform hover:scale-105"
              >
                <span className="mr-2">🚀</span> Calculate My Channel Income
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center">
            <div className="relative">
              <div
                className={`absolute -inset-4 rounded-2xl  bg-red-100`}
              ></div>
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

        {/* TikTok Tool - No change needed here, just ensuring continuity */}
        <div className={`flex flex-col md:flex-row items-center rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-gray-50 to-gray-100`}>
          <div className="md:w-1/2 p-8 md:p-12 order-2 md:order-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              <span className="mr-1">🆕</span> Future Development
            </div>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              Upcoming: TikTok Growth & Earnings Calculator
            </h2>
            <p className="mb-6 leading-relaxed">
              Soon, creators will be able to estimate TikTok earnings, track follower growth, and discover trending content ideas. Our upcoming tools will bring powerful analytics across multiple platforms.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guide"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-all transform hover:scale-105"
              >
                <span className="mr-2">📚</span> Learn More in Guides
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center order-1 md:order-2">
            <div className="relative">
              <div className={`absolute -inset-4 rounded-2xl bg-purple-100`}></div>
              <Image
                width={600}
                height={600}
                src="/tiktok.png"
                alt="TikTok Growth Tool Placeholder"
                className="relative rounded-xl shadow-lg w-full h-auto object-cover border-2 border-white opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/70 text-white px-4 py-2 rounded-lg font-medium">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guides Section (H2 Optimized & Internal Link Stronger) */}
        <div className={`flex flex-col md:flex-row items-center rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-red-50 to-orange-50}`}>
          <div className="md:w-1/2 p-8 md:p-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
              <span className="mr-1">📖</span> Educational Content
            </div>
            {/* H2: Focus on strategy/tips */}
            <h2 className="text-3xl font-bold text-orange-600 mb-4">
              Master YouTube Growth: SEO, Content Strategy, and Monetization Tips
            </h2>
            <p className="mb-6 leading-relaxed">
              Explore our <Link href="/guide" className={`font-semibold underline hover:no-underline text-orange-700 hover:text-orange-800`}>exclusive collection of free creator guides</Link>. We publish weekly tips, research, and strategies covering YouTube SEO, Monetization, Retention, and deep-dive analysis on turning your views into income.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/guide"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition-all transform hover:scale-105"
              >
                <span className="mr-2">🔍</span> Explore Weekly Growth Tips
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center">
            <div className="relative">
              <div className={`absolute -inset-4 rounded-2xl bg-orange-100`}></div>
              <Image
                src="/guide.png"
                alt="YouTube SEO Guides and Content Strategy Tips"
                width={1000}
                height={1000}
                className="relative rounded-xl shadow-lg w-full h-auto object-cover border-2 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Section (Refined) ===== */}
      <section className={`py-16 bg-gray-50}`}>
        <div className="max-w-4xl mx-auto text-center px-6">
          {/* H2: Direct Question/Benefit */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stop Guessing, Start Growing: Analyze Your Channel&apos;s Potential Today!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Use the free Revenue Estimator and deep analytics to track views, estimate revenue, and achieve Monetization Compliance faster than ever.
          </p>
          <Link
            href="/tool/youtube-revenue-estimator"
            className="inline-flex items-center px-8 py-4 text-lg font-bold bg-red-600 text-white rounded-lg shadow-xl hover:bg-red-700 transition-all transform hover:scale-105"
          >
            <span className="mr-2">⚡</span> Check Your Channel&apos;s Performance
          </Link>
        </div>
      </section>
    </div>
  );
}