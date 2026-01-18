// components/SeoText/page.js
import { ShieldCheck, BarChart3, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function SeoText() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-100">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
          Maximize Your YouTube Revenue Potential
        </h2>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium">
          Our estimator analyzes millions of data points to give you the most accurate RPM and CPM projections in 2026.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-200">
            <BarChart3 className="text-white w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Channel Analysis & RPM</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            We analyze your channel metrics—subscribers, monthly views, and upload frequency—to calculate realistic <strong>YouTube income</strong>.
          </p>
          <p className="text-gray-600">
            Test scenarios: What if your RPM increases by $1? Our tool shows you the real <strong>YouTube earnings</strong> potential.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Monetization Checker</h3>
          <p className="text-gray-600 leading-relaxed">
            The <strong>YouTube Monetization Checker</strong> evaluates your eligibility based on the 1,000 subs and 4,000 watch hours rule.
            We provide tips to optimize thumbnails and titles via our <Link href="/guide" className="text-red-600 font-bold underline">Growth Guides</Link>.
          </p>
        </div>
      </div>

      {/* Trust Text Section */}
      <div className="mt-16 bg-red-50 p-10 rounded-[3rem] border border-red-100">
        <h4 className="text-xl font-black text-red-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" /> Pro Creator Tip
        </h4>
        <p className="text-red-800/80 font-medium leading-relaxed">
          Actual <strong>YouTube revenue</strong> varies by audience location (CPM rates by country) and content type.
          Combine our estimator with <Link href="/guide" className="underline font-bold">Advanced SEO Strategies</Link> to target high-paying audiences.
        </p>
      </div>
    </div>
  );
}