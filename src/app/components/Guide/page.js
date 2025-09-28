"use client";
import Link from 'next/link';
import { useState } from 'react';

const YouTubeGuidePage = () => {
  const [activeTopic, setActiveTopic] = useState('YouTube Revenue Calculator');
  const [searchTerm, setSearchTerm] = useState('');

  // Guide topics data
  const guideTopics = {
    "YouTube Revenue Calculator": {
      title: "YouTube Revenue Calculator - Complete Guide",
      description: "Learn how to accurately estimate your YouTube channel earnings and understand the factors that influence your revenue.",
      content: `
        <h3>What is YouTube Revenue Calculator?</h3>
        <p>YouTube Revenue Calculator is a tool that helps creators estimate their potential earnings based on various metrics like views, CPM rates, and audience demographics.</p>

        <h3>How It Works</h3>
        <ul>
          <li><strong>View Count Analysis:</strong> Calculates earnings based on total monthly views</li>
          <li><strong>CPM Rates:</strong> Considers niche-specific advertising rates</li>
          <li><strong>Audience Location:</strong> Factors in geographic revenue differences</li>
          <li><strong>Engagement Metrics:</strong> Includes watch time and click-through rates</li>
        </ul>

        <h3>Key Factors Affecting Revenue</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Content Niche</h4>
            <p class="text-sm">Finance and tech niches typically have higher CPM rates compared to entertainment.</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Audience Demographics</h4>
            <p class="text-sm">Viewers from US, UK, Canada generate higher revenue than other regions.</p>
          </div>
        </div>
      `,
      tips: [
        "Use multiple calculators for accurate estimates",
        "Track your actual earnings vs estimates",
        "Consider seasonal fluctuations in advertising"
      ]
    },
    "CPM Rates 2024": {
      title: "YouTube CPM Rates 2024 - Complete Breakdown",
      description: "Latest CPM rates across different niches and countries to help you maximize your earnings.",
      content: `
        <h3>What is CPM?</h3>
        <p>CPM (Cost Per Mille) represents the amount advertisers pay per 1,000 ad impressions on your videos.</p>

        <h3>2024 CPM Rates by Niche</h3>
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 p-2 text-left">Content Niche</th>
              <th class="border border-gray-300 p-2 text-left">Average CPM</th>
              <th class="border border-gray-300 p-2 text-left">Potential Range</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2">Finance & Investing</td>
              <td class="border border-gray-300 p-2">$15-25</td>
              <td class="border border-gray-300 p-2">$10-40</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Technology</td>
              <td class="border border-gray-300 p-2">$10-20</td>
              <td class="border border-gray-300 p-2">$8-30</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Education</td>
              <td class="border border-gray-300 p-2">$8-15</td>
              <td class="border border-gray-300 p-2">$6-20</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Gaming</td>
              <td class="border border-gray-300 p-2">$3-8</td>
              <td class="border border-gray-300 p-2">$2-12</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Entertainment</td>
              <td class="border border-gray-300 p-2">$2-6</td>
              <td class="border border-gray-300 p-2">$1-10</td>
            </tr>
          </tbody>
        </table>

        <h3>Country-Specific CPM Rates</h3>
        <ul>
          <li><strong>United States:</strong> $8-15 average CPM</li>
          <li><strong>United Kingdom:</strong> $6-12 average CPM</li>
          <li><strong>Canada:</strong> $5-10 average CPM</li>
          <li><strong>Australia:</strong> $4-9 average CPM</li>
          <li><strong>India:</strong> $1-3 average CPM</li>
        </ul>
      `,
      tips: [
        "Focus on high-CPM niches for better earnings",
        "Build international audience for diversified revenue",
        "Monitor CPM trends quarterly"
      ]
    },
    "YouTube Partner Program": {
      title: "YouTube Partner Program - Complete Requirements Guide",
      description: "Everything you need to know about joining YPP and starting your monetization journey.",
      content: `
        <h3>YPP Eligibility Requirements</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p class="text-yellow-700"><strong>Latest Update:</strong> As of 2024, YouTube requires 1,000 subscribers and 4,000 watch hours in the past 12 months.</p>
        </div>

        <h3>Application Process</h3>
        <ol class="list-decimal pl-5 space-y-2">
          <li>Reach eligibility threshold</li>
          <li>Submit application through YouTube Studio</li>
          <li>Wait for review (typically 1-4 weeks)</li>
          <li>Set up Google AdSense account</li>
          <li>Start earning from ads</li>
        </ol>

        <h3>Common Reasons for Rejection</h3>
        <ul class="list-disc pl-5 space-y-1">
          <li>Reused or repetitive content</li>
          <li>Copyright strikes</li>
          <li>Community Guidelines violations</li>
          <li>Invalid click activity</li>
          <li>Subscriber or view manipulation</li>
        </ul>
      `,
      tips: [
        "Maintain clean channel history before applying",
        "Read YouTube's policies thoroughly",
        "Don't buy subscribers or views"
      ]
    },
    "Channel Monetization": {
      title: "Complete Channel Monetization Strategies",
      description: "Multiple ways to monetize your YouTube channel beyond just ad revenue.",
      content: `
        <h3>Multiple Revenue Streams</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-800">Ad Revenue</h4>
            <p class="text-sm text-blue-600">Pre-roll, mid-roll, and display ads through YPP</p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold text-green-800">Channel Memberships</h4>
            <p class="text-sm text-green-600">Monthly subscriptions for exclusive content</p>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <h4 class="font-semibold text-purple-800">Super Chat & Stickers</h4>
            <p class="text-sm text-purple-600">Paid messages during live streams</p>
          </div>
        </div>

        <h3>Advanced Monetization Methods</h3>
        <ul>
          <li><strong>Brand Deals:</strong> $100-$10,000+ per integration</li>
          <li><strong>Affiliate Marketing:</strong> 5-30% commission on sales</li>
          <li><strong>Merchandise:</strong> Sell branded products</li>
          <li><strong>Crowdfunding:</strong> Patreon, YouTube Memberships</li>
          <li><strong>Digital Products:</strong> Courses, ebooks, presets</li>
        </ul>
      `,
      tips: [
        "Diversify income sources",
        "Build email list for promotions",
        "Create multiple revenue streams"
      ]
    },
    "YouTube Analytics": {
      title: "YouTube Analytics - Data-Driven Growth Guide",
      description: "Learn how to use YouTube Analytics to grow your channel strategically.",
      content: `
        <h3>Key Metrics to Track</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div class="bg-white p-4 rounded-lg shadow">
            <div class="text-2xl font-bold text-blue-600">Watch Time</div>
            <div class="text-sm text-gray-600">Most important metric</div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <div class="text-2xl font-bold text-green-600">Audience Retention</div>
            <div class="text-sm text-gray-600">Viewer engagement</div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <div class="text-2xl font-bold text-purple-600">Click-Through Rate</div>
            <div class="text-sm text-gray-600">Thumbnail effectiveness</div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <div class="text-2xl font-bold text-red-600">Impressions</div>
            <div class="text-sm text-gray-600">Discovery potential</div>
          </div>
        </div>

        <h3>Advanced Analytics Features</h3>
        <ul>
          <li><strong>Audience Demographics:</strong> Age, gender, location data</li>
          <li><strong>Traffic Sources:</strong> Where viewers find your content</li>
          <li><strong>Revenue Reports:</strong> Detailed earnings breakdown</li>
          <li><strong>Real-time Analytics:</strong> Live viewership data</li>
        </ul>
      `,
      tips: [
        "Check analytics weekly",
        "Compare performance month-over-month",
        "Use data to inform content strategy"
      ]
    }
  };

  const topics = [
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
  ];

  const filteredTopics = topics.filter(topic =>
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );


return (
  <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">

      {/* Header Section */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full mb-4 md:mb-6 shadow-lg">
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          YouTube Creator Guide
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Master YouTube growth with our comprehensive guides. From monetization to analytics,
          we&apos;ve got you covered.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Topics List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Topics</h2>

            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Topics List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTopic === topic
                      ? "bg-red-50 text-red-700 border-l-4 border-red-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Guide Stats</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-center bg-gray-50 p-2 rounded">
                  <div className="font-bold text-gray-900">{topics.length}</div>
                  <div className="text-gray-600">Topics</div>
                </div>
                <div className="text-center bg-gray-50 p-2 rounded">
                  <div className="font-bold text-gray-900">50K+</div>
                  <div className="text-gray-600">Readers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {guideTopics[activeTopic] ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {guideTopics[activeTopic].title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">
                    {guideTopics[activeTopic].description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Last updated: January 2024</span>
                    <span className="mx-2">•</span>
                    <span>10 min read</span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: guideTopics[activeTopic].content }}
                />

                {/* Pro Tips */}
                {guideTopics[activeTopic].tips && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Pro Tips
                    </h3>
                    <ul className="space-y-2">
                      {guideTopics[activeTopic].tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Guide Coming Soon</h3>
                <p>
                  We&apos;re working on the &quot;YouTube Guide&quot; and it&apos;s coming soon.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
              <button className="flex items-center text-red-600 hover:text-red-700 font-medium">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous Guide
              </button>
              <button className="flex items-center text-red-600 hover:text-red-700 font-medium">
                Next Guide
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Related Guides */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Guides</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.slice(0, 4).map((topic) => (
                <div
                  key={topic}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{topic}</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Learn everything about {topic.toLowerCase()} and how to implement it...
                  </p>
                  <button
                    onClick={() => setActiveTopic(topic)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Read Guide →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Grow Your YouTube Channel?
          </h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto text-lg">
            Start implementing these strategies today and track your progress with our free YouTube analytics tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Try Revenue Calculator
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              Get Personalized Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);


};

export default YouTubeGuidePage;