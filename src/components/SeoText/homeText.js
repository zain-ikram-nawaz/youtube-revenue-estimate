"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function HomeIntroduction() {
  return (
    <div className="bg-secondary text-muted text-sm">
      {/* ==== HERO SECTION ==== */}
      <section className="relative w-full bg-gradient-to-br from-primary to-primary-hover">
        <div className="max-w-5xl mx-auto px-5 py-10 flex flex-col md:flex-row items-center gap-8">
          {/* Left Text */}
          <div className="md:w-1/2 text-background mb-6 md:mb-0">
            <div className="inline-block px-3 py-1 rounded-md bg-secondary text-xs font-medium mb-3 tracking-wide text-foreground">
              ✨ Most Accurate YouTube Income Estimator,,..
            </div>
            <h1 className="text-2xl md:text-2xl font-bold mb-3 leading-snug">
              YouTube Income Estimator - Calculate Your Real Earnings (2026)
            </h1>
            <h2 className="text-base md:text-lg font-normal mb-6 opacity-90 leading-relaxed">
             Find out how much YouTubers typically earn, learn about CPM rates for different niches, and get accurate earning estimates with our unique tool. We use real data from millions of channels to give you insights you won't find anywhere else.
            </h2>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              {/* Primary CTA */}
              <Link
                href="/tool/youtube-revenue-calculator"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold bg-background text-primary rounded-md shadow-md hover:bg-accent transition-all active:scale-95"
              >
                📊 Calculate My Earnings
              </Link>
              {/* Secondary CTA */}
              <Link
                href="/guide"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold border border-background/60 text-background rounded-md hover:bg-background/10 transition-all active:scale-95"
              >
                📘 Learn About YouTube Income
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-md bg-background/10 blur-md"></div>
              <Image
                width={500}
                height={500}
                src="/hero.webp"
                alt="YouTube Income Estimator Dashboard showing earnings analytics"
                className="relative rounded-md shadow-lg w-full max-w-sm h-auto object-cover border-2 border-background/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==== CONTENT SECTION ==== */}
      <section id="income-guide" className="max-w-5xl mx-auto px-5 py-12 space-y-10">

        {/* Understanding YouTube Income Estimation */}
        <div className="bg-background p-6 rounded-md shadow-sm border border-border">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-foreground">
            Understanding YouTube Income Estimation
          </h2>
          <div className="text-sm leading-relaxed text-muted space-y-4">
            <p>
              YouTube income estimators have become essential tools for creators, but understanding how they work is crucial for setting realistic expectations. These calculators analyze massive datasets from real channels to provide educated estimates based on your specific metrics.
            </p>

            <h3 className="text-base font-bold text-foreground mt-4">The Data Behind the Estimates</h3>
            <p>
              Most reliable YouTube income estimators analyze several key data points: <b>average views per video</b>,<b> subscriber count</b>, <b>engagement rates</b>, <b>content niche</b>, and <b>audience demographics</b>. They cross-reference this information with known CPM (Cost Per Mille) rates for different categories and geographic regions.
            </p>
              <p>
            While CPM is what advertisers pay, our tool also considers RPM (Revenue Per Mille), which is the actual amount you earn after YouTube's cut and other factors.
            </p>
            <p>
              However, it's important to understand that these are estimates, not guarantees. YouTube's actual revenue sharing depends on the content type: for long-form videos, the split is 55/45 (creators keep 55%), while for YouTube Shorts, creators receive a 45% share of the allocated revenue.
            </p>

            <h3 className="text-base font-bold text-foreground mt-4">Why Estimates Often Miss the Mark</h3>
            <p>
              The biggest limitation of income estimators is that they typically focus only on AdSense revenue. In reality, successful YouTubers earn money from multiple sources: sponsorships, affiliate marketing, merchandise, and channel memberships.
            </p>
            <p className="bg-secondary p-3 rounded-md text-sm border-l-2 border-primary">
              For established creators, AdSense often represents less than 30% of total income. A tech reviewer with 500K subscribers might earn $2,000 monthly from ads but $15,000 from sponsored content and affiliate commissions.
            </p>
          </div>
        </div>

        {/* Average Income of a YouTuber */}
        <div className="bg-background p-6 rounded-md shadow-sm border border-border">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-foreground">
            Average Income of a YouTuber: The Reality Behind the Numbers
          </h2>
          <div className="text-sm leading-relaxed text-muted space-y-4">
            <p>
              The question "how much do YouTubers make?" doesn't have a simple answer because earnings vary wildly based on numerous factors. However, analyzing data from thousands of channels reveals some clear patterns.
            </p>

            <h3 className="text-base font-bold text-foreground mt-4">Income by Subscriber Count</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="bg-secondary p-3 rounded-md text-sm">
                <span className="font-semibold text-foreground">1K-10K subs:</span> $50-$500/mo
              </div>
              <div className="bg-secondary p-3 rounded-md text-sm">
                <span className="font-semibold text-foreground">10K-100K subs:</span> $200-$2,000/mo
              </div>
              <div className="bg-secondary p-3 rounded-md text-sm">
                <span className="font-semibold text-foreground">100K-1M subs:</span> $1,000-$10,000/mo
              </div>
              <div className="bg-secondary p-3 rounded-md text-sm">
                <span className="font-semibold text-foreground">1M+ subs:</span> $5,000-$50,000+/mo
              </div>
            </div>
            <p className="text-xs text-muted italic">
              *These numbers represent AdSense revenue only. Successful creators typically earn 3-5x more from other sources.
            </p>

            <h3 className="text-base font-bold text-foreground mt-4">Geographic Impact on Earnings</h3>
            <p className="text-sm">
              Where your audience lives dramatically affects your earning potential. The same 1 million views can generate vastly different revenue:
            </p>
            <ul className="space-y-2 text-sm mt-2">
              <li className="flex justify-between items-center bg-secondary p-2 rounded-md">
                <span>🇺🇸 United States</span>
                <span className="font-semibold text-green-600">$1,000-$5,000</span>
              </li>
              <li className="flex justify-between items-center bg-secondary p-2 rounded-md">
                <span>🇬🇧 United Kingdom</span>
                <span className="font-semibold text-green-600">$800-$3,000</span>
              </li>
              <li className="flex justify-between items-center bg-secondary p-2 rounded-md">
                <span>🇨🇦 Canada/Australia</span>
                <span className="font-semibold text-green-600">$600-$2,500</span>
              </li>
              <li className="flex justify-between items-center bg-secondary p-2 rounded-md">
                <span>🇮🇳 India</span>
                <span className="font-semibold text-yellow-600">$100-$500</span>
              </li>
              <li className="flex justify-between items-center bg-secondary p-2 rounded-md">
                <span>🇵🇰 Pakistan/Bangladesh</span>
                <span className="font-semibold text-primary">$50-$200</span>
              </li>
                <p>
              Note: While these figures show low CPM regions, they can still be highly profitable due to the massive volume of views and high audience engagement potential in these markets.
            </p>
            </ul>
          </div>
        </div>

        {/* YouTube CPM by Niche */}
        <div className="bg-background p-6 rounded-md shadow-sm border border-border">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-foreground">
            YouTube CPM Rates by Niche
          </h2>
          <div className="text-sm leading-relaxed text-muted space-y-4">
            <p>
              Understanding CPM (Cost Per Mille) rates by niche is crucial for creators who want to maximize their earning potential. Advertisers don't value all content equally.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="bg-green-50 p-4 rounded-md border border-green-100">
                <h4 className="text-xs font-bold text-green-800 mb-3 uppercase tracking-wider">High CPM ($3-$25)</h4>
                <ul className="space-y-2 text-xs text-green-700">
                  <li className="flex justify-between"><span>Finance</span> <span className="font-semibold">$8-$25</span></li>
                  <li className="flex justify-between"><span>Business</span> <span className="font-semibold">$6-$20</span></li>
                  <li className="flex justify-between"><span>Technology</span> <span className="font-semibold">$4-$15</span></li>
                  <li className="flex justify-between"><span>Real Estate</span> <span className="font-semibold">$5-$18</span></li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100">
                <h4 className="text-xs font-bold text-yellow-800 mb-3 uppercase tracking-wider">Medium CPM ($1-$8)</h4>
                <ul className="space-y-2 text-xs text-yellow-700">
                  <li className="flex justify-between"><span>Education</span> <span className="font-semibold">$2-$8</span></li>
                  <li className="flex justify-between"><span>Lifestyle</span> <span className="font-semibold">$1-$6</span></li>
                  <li className="flex justify-between"><span>Cooking</span> <span className="font-semibold">$1-$5</span></li>
                  <li className="flex justify-between"><span>Travel</span> <span className="font-semibold">$1-$5</span></li>
                </ul>
              </div>

              <div className="bg-accent p-4 rounded-md border border-accent-hover">
                <h4 className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">Low CPM ($0.3-$3)</h4>
                <ul className="space-y-2 text-xs text-primary">
                  <li className="flex justify-between"><span>Gaming</span> <span className="font-semibold">$0.5-$3</span></li>
                  <li className="flex justify-between"><span>Music</span> <span className="font-semibold">$0.4-$2</span></li>
                  <li className="flex justify-between"><span>Comedy</span> <span className="font-semibold">$0.5-$2</span></li>
                  <li className="flex justify-between"><span>Vlogs</span> <span className="font-semibold">$0.4-$2</span></li>
                </ul>
              </div>
            </div>

            <p className="text-sm mt-4 bg-secondary p-3 rounded-md">
              <strong>Why these differences exist:</strong> Advertisers calculate customer lifetime value (CLV) and adjust their bidding accordingly. A financial services company might pay $20 to acquire a customer worth $2,000 annually.
            </p>
          </div>
        </div>

        {/* Maximizing Earnings */}
        <div className="bg-background p-6 rounded-md shadow-sm border border-border">
          <h2 className="text-lg md:text-xl font-bold mb-4 text-foreground">
            How to Maximize Your YouTube Earnings
          </h2>
          <div className="text-sm leading-relaxed text-muted space-y-4">
            <p>
              Maximizing YouTube earnings requires a multi-faceted approach that goes beyond simply creating good content. The most successful creators treat their channels as businesses.
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-md bg-accent text-primary flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Diversify Income Streams Early</h4>
                  <p className="text-sm mt-1">Don't wait until you have millions of subscribers. Start with affiliate marketing at 1,000 subscribers.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-md bg-accent text-primary flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Optimize for High-Value Keywords</h4>
                  <p className="text-sm mt-1">Research trending topics in high-CPM niches and create content that naturally incorporates these themes.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-md bg-accent text-primary flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Master Audience Retention</h4>
                  <p className="text-sm mt-1">Focus on creating content that keeps viewers watching until the end. Higher retention = better algorithm performance.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-md bg-accent text-primary flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Build Genuine Relationships</h4>
                  <p className="text-sm mt-1">Engaged communities are worth far more than passive subscribers. Respond to comments and create community posts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ==== TOOL PROMO SECTION ==== */}
      <section className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex flex-col md:flex-row items-center rounded-md overflow-hidden shadow-md bg-background border border-border">
          <div className="md:w-1/2 p-6">
            <div className="inline-flex items-center px-2 py-1 rounded-md bg-accent text-primary text-xs font-medium mb-3">
              📈 Advanced Income Analysis
            </div>
            <h2 className="text-lg font-bold text-primary mb-2">
              Get Accurate YouTube Income Estimates
            </h2>
            <p className="mb-4 text-muted text-sm leading-relaxed">
              Our <b>YouTube income estimator</b> analyzes your channel's performance and provides detailed earnings projections.
            </p>
            <ul className="space-y-2 mb-5 text-muted text-xs">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Accurate Revenue Forecasts by niche & location</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Monetization Tracker for YPP requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Niche Analysis across content categories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Growth Projections based on current trends</span>
              </li>
            </ul>
            <Link
              href="/tool/youtube-revenue-calculator"
              className="inline-flex items-center px-4 py-2 bg-primary text-background text-sm font-medium rounded-md shadow-sm hover:bg-primary-hover transition-all active:scale-95"
            >
              🚀 Calculate My YouTube Income
            </Link>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center bg-secondary">
            <div className="relative">
              <Image
                width={400}
                height={400}
                src="/tool.webp"
                alt="YouTube Income Estimator Tool Dashboard"
                className="relative rounded-md shadow-sm w-full max-w-xs h-auto object-cover border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==== FOOTER CTA ==== */}
      <section className="py-10 bg-secondary border-t border-border">
        <div className="max-w-3xl mx-auto text-center px-5">
          <h2 className="text-lg font-bold mb-2 text-foreground">
            Ready to Understand Your YouTube Earning Potential?
          </h2>
          <p className="text-sm mb-5 text-muted max-w-xl mx-auto">
            Use our <b>YouTube income estimator</b> to get accurate revenue projections based on your niche, audience location, and channel performance.
          </p>
          <Link
            href="/tool/youtube-revenue-calculator"
            className="inline-flex items-center px-6 py-2.5 text-sm font-semibold bg-primary text-background rounded-md shadow-md hover:bg-primary-hover transition-all active:scale-95"
          >
            ⚡ Calculate My Earnings Now
          </Link>
        </div>
      </section>
    </div>
  );
}