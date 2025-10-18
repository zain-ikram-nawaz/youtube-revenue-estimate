import React from 'react'
import Link from 'next/link';

export default function Footer() {
  return (
    <div>

{/* Footer Section */}
<footer className="bg-gray-900 text-white mt-12 md:mt-16">
  <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
    {/* Main Footer Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
      {/* Company Info */}
      <div className="lg:col-span-2">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </div>
          <span className="text-xl font-bold">YouTube Channel Revenue Estimator
          </span>
        </div>
        <p className="text-gray-300 text-sm mb-4">
          The most accurate YouTube channel revenue estimator tool. Get detailed insights into monetization potential, channel analytics, and growth strategies.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">GitHub</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="lg:col-span-1">
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
              Home
            </Link>
          </li>
          <li>
            <Link href="/guide" className="text-gray-300 hover:text-white transition-colors text-sm">
              Monetization Guide
            </Link>
          </li>
          <li>
            <Link href="/about-us" className="text-gray-300 hover:text-white transition-colors text-sm">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="text-gray-300 hover:text-white transition-colors text-sm">
              Contact Us
            </Link>
          </li>

        </ul>
      </div>

      {/* Resources */}
      {/* <div className="lg:col-span-1">
        <h3 className="text-lg font-semibold mb-4">Resources</h3>
        <ul className="space-y-2">
          <li>
            <a href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">
              Blog & Articles
            </a>
          </li>
          <li>
            <a href="/youtube-case-studies" className="text-gray-300 hover:text-white transition-colors text-sm">
              Case Studies
            </a>
          </li>
          <li>
            <a href="/youtube-tools" className="text-gray-300 hover:text-white transition-colors text-sm">
              Creator Tools
            </a>
          </li>
          <li>
            <a href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
              FAQ
            </a>
          </li>
          <li>
            <a href="/youtube-glossary" className="text-gray-300 hover:text-white transition-colors text-sm">
              YouTube Glossary
            </a>
          </li>
        </ul>
      </div> */}

      {/* Newsletter */}
      <div className="lg:col-span-1">
        <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
        <p className="text-gray-300 text-sm mb-4">
          Get the latest YouTube monetization tips and industry insights delivered to your inbox.
        </p>
        <form className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    {/* YouTube SEO Keywords Section */}
    {/* <div className="border-t border-gray-700 pt-8 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-center">YouTube Monetization & Analytics Topics</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {[
          "YouTube Revenue Calculator",
          "CPM Rates 2024",
          "YouTube Partner Program",
          "Channel Monetization",
          "YouTube Analytics",
          "Subscriber Growth",
          "Watch Time Optimization",
          "Ad Revenue Calculator",
          "YouTube SEO",
          "Video Marketing",
          "Content Strategy",
          "Audience Engagement",
          "YouTube Algorithm",
          "Creator Economy",
          "Digital Marketing",
          "Social Media Analytics",
          "Video SEO",
          "YouTube Statistics",
          "Earnings Calculator",
          "Monetization Tips"
        ].map((keyword) => (
          <span
            key={keyword}
            className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs hover:bg-gray-700 transition-colors cursor-pointer"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div> */}

    {/* Legal & Bottom Section */}
    <div className="border-t border-gray-700 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-sm mb-4 md:mb-0">
          <p>&copy; 2025 YouTube Channel Revenue Estimator. All rights reserved.</p>
          <p className="mt-1">
            This tool provides estimates only. Actual YouTube earnings may vary.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">
            Disclaimer
          </Link>
          <Link href="/contact-us" className="text-gray-400 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>

      {/* Additional SEO Content */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        <p>
          YouTube Channel Revenue Estimator is an independent tool not affiliated with YouTube or Google.
          YouTube is a trademark of Google LLC. Our estimates are based on industry data
          and should be used for informational purposes only.
        </p>
        <p className="mt-2">
          Popular searches: YouTube money calculator, channel earnings estimator,
          how much do YouTubers make, YouTube CPM rates by country, monetization requirements 2025
        </p>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}
