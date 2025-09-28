
"use client";

import { useState } from "react";
import MonetizationStatusBar from "../MonitizationStatusBar/page";
import StatsCards from "../StatsCards/page";
import Revenue from "../Revenue/page";
import Monetization from "../Monetization/page";
import Analytics from "../Analytics/page";
import Image from "next/image";
import Form from "../Form/page";

export default function ChannelEstimator() {
  const [channelUrl, setChannelUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Monetization calculation function
  const calculateMonetizationStatus = (channelData) => {
    const {
      subscribers,
      totalViews,
      videoCount,
      avgMonthlyViews,
      creationDate,
      estimatedRevenue, // lifetime estimate
    } = channelData;

    // YouTube monetization requirements
    const YOUTUBE_REQUIREMENTS = {
      MIN_SUBSCRIBERS: 1000,
      MIN_WATCH_HOURS: 4000, // hours in past 12 months
      MIN_VIDEOS: 3,
      MIN_CHANNEL_AGE: 30, // days
    };

    // Channel age
    const channelAgeDays = Math.floor(
      (new Date() - new Date(creationDate)) / (1000 * 60 * 60 * 24)
    );

    // Estimate watch hours per year (5 min avg view time assumption)
    const estimatedWatchHours = ((avgMonthlyViews * 5) / 60) * 12;

    // Check requirements
    const requirements = {
      subscribers: subscribers >= YOUTUBE_REQUIREMENTS.MIN_SUBSCRIBERS,
      watchHours: estimatedWatchHours >= YOUTUBE_REQUIREMENTS.MIN_WATCH_HOURS,
      videos: videoCount >= YOUTUBE_REQUIREMENTS.MIN_VIDEOS,
      channelAge: channelAgeDays >= YOUTUBE_REQUIREMENTS.MIN_CHANNEL_AGE,
    };

    // Compliance score
    const complianceScore = Math.min(
      (subscribers / YOUTUBE_REQUIREMENTS.MIN_SUBSCRIBERS) * 25 +
        (estimatedWatchHours / YOUTUBE_REQUIREMENTS.MIN_WATCH_HOURS) * 25 +
        Math.min(videoCount / YOUTUBE_REQUIREMENTS.MIN_VIDEOS, 1) * 25 +
        Math.min(channelAgeDays / YOUTUBE_REQUIREMENTS.MIN_CHANNEL_AGE, 1) * 25,
      100
    );

    // Status
    const allRequirementsMet = Object.values(requirements).every((req) => req);
    const status = allRequirementsMet
      ? "monetized"
      : complianceScore >= 70
      ? "eligible"
      : complianceScore >= 40
      ? "growing"
      : "not_eligible";

    // -------- NEW: Monetization Date Estimation --------
    const avgDailySubs = subscribers / channelAgeDays || 0;
    const daysTo1000 = YOUTUBE_REQUIREMENTS.MIN_SUBSCRIBERS / (avgDailySubs || 1);

    const avgDailyViews = avgMonthlyViews / 30 || 0;
    const avgDailyWatchHours = (avgDailyViews * 5) / 60;
    const daysTo4000 =
      YOUTUBE_REQUIREMENTS.MIN_WATCH_HOURS / (avgDailyWatchHours || 1);

    const monetizationSubsDate = new Date(
      new Date(creationDate).getTime() +
        daysTo1000 * 24 * 60 * 60 * 1000
    );
    const monetizationWatchDate = new Date(
      new Date(creationDate).getTime() +
        daysTo4000 * 24 * 60 * 60 * 1000
    );

    const estimatedMonetizationDate = new Date(
      Math.max(monetizationSubsDate.getTime(), monetizationWatchDate.getTime())
    );

    // -------- NEW: Earnings Since Monetization --------
    const monthsSinceMonetization = Math.max(
      0,
      (new Date() - estimatedMonetizationDate) /
        (1000 * 60 * 60 * 24 * 30)
    );

    // Average monthly earning (based on lifetime estimate)
    let avgMonthlyRevenue = 0;
    if (estimatedRevenue && channelAgeDays > 0) {
      const lifetimeRevenueNum = parseFloat(
        estimatedRevenue.replace(/[^0-9.]/g, "")
      );
      const totalMonths = channelAgeDays / 30;
      avgMonthlyRevenue = lifetimeRevenueNum / totalMonths;
    }

    const earningsSinceMonetization = Math.round(
      avgMonthlyRevenue * monthsSinceMonetization
    );
    console.log(earningsSinceMonetization,"since")

    return {
      status,
      complianceScore: Math.round(complianceScore),
      requirements,
      estimatedWatchHours: Math.round(estimatedWatchHours),
      channelAgeDays,
      youtubeRequirements: YOUTUBE_REQUIREMENTS,
      estimatedMonetizationDate,
      earningsSinceMonetization,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/channel-estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl }),
      });

      if (!res.ok) throw new Error("Failed to fetch estimates");

      const json = await res.json();

      // Calculate monetization status
      const monetizationData = calculateMonetizationStatus(json);

      setData({
        ...json,
        monetization: monetizationData,
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Config for monetization status bar
  const getMonetizationConfig = (status) => {
    const config = {
      monetized: {
        color: "green",
        bgColor: "bg-green-50",
        borderColor: "border-green-500",
        textColor: "text-green-700",
        icon: "✅",
        label: "Monetized",
        description: "Channel meets all YouTube Partner Program requirements",
      },
      eligible: {
        color: "blue",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-500",
        textColor: "text-blue-700",
        icon: "📊",
        label: "Eligible Soon",
        description: "Channel is close to meeting monetization requirements",
      },
      growing: {
        color: "yellow",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-500",
        textColor: "text-yellow-700",
        icon: "🌱",
        label: "Growing",
        description: "Channel needs significant growth to meet requirements",
      },
      not_eligible: {
        color: "red",
        bgColor: "bg-red-50",
        borderColor: "border-red-500",
        textColor: "text-red-700",
        icon: "⏳",
        label: "Not Eligible",
        description: "Channel does not meet basic requirements",
      },
    };
    return config[status] || config.not_eligible;
  };
return (
  <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-4 md:py-8 px-3 sm:px-4 lg:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="lg:col-span-12 text-center mb-8 md:mb-12">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full mb-3 md:mb-4 shadow-lg">
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          YouTube Channel Revenue Estimator
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
          Get accurate revenue estimates and monetization status for any YouTube channel
        </p>

        {/* SEO Content - Introduction */}
        <div className="mt-8 text-left max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding YouTube Channel Revenue</h2>
          <p className="text-gray-700 mb-4">
            Our YouTube Revenue Estimator provides comprehensive insights into channel monetization potential,
            helping creators, marketers, and businesses understand earning possibilities on the world&apos;s largest video platform.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-sm text-yellow-700">
              <strong>Important Notice:</strong> All revenue calculations are estimates based on industry averages
              and publicly available data. Actual earnings may vary significantly based on content niche, audience
              demographics, watch time, and advertiser demand.
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <Form
        channelUrl={channelUrl}
        setChannelUrl={setChannelUrl}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
      />

      {/* How It Works Section */}
      <div className="lg:col-span-12 bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Our YouTube Revenue Calculator Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-red-600 font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Channel Analysis</h3>
            <p className="text-gray-600 text-sm">
              We analyze subscriber count, view patterns, and engagement metrics to assess channel performance
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-red-600 font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Revenue Calculation</h3>
            <p className="text-gray-600 text-sm">
              Using industry-standard CPM rates and viewership data to estimate potential earnings
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-red-600 font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Monetization Insights</h3>
            <p className="text-gray-600 text-sm">
              Evaluating channel eligibility for YouTube Partner Program and alternative revenue streams
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      {data && (
        <div className="lg:col-span-12 space-y-6">
          {/* Banner */}
          {data.bannerImage && (
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={data.bannerImage}
                width={1280}
                height={720}
                alt="Channel Banner"
                className="w-full h-32 sm:h-40 md:h-78 object-cover"
              />
              <div className="absolute bottom-4 left-4 flex items-end gap-3">
                {data.channelImage && (
                  <Image
                    src={data.channelImage}
                    width={96}
                    height={96}
                    alt="Channel"
                    className="w-22 h-22 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white shadow-xl"
                  />
                )}
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg leading-tight">
                    {data.channelName}
                  </h2>
                  <p className="text-red-100 drop-shadow text-xs sm:text-sm md:text-base">
                    {data.subscribers.toLocaleString()} subscribers
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Monetization Status */}
          {data.monetization && (
            <MonetizationStatusBar
              data={data.monetization}
              getMonetizationConfig={getMonetizationConfig}
            />
          )}

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row border-b border-gray-200">
              {["overview", "revenue", "monetization", "analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 font-semibold text-sm sm:text-base transition-all ${
                    activeTab === tab
                      ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                      : "text-gray-600 hover:text-red-500 hover:bg-gray-50"
                  }`}
                >
                  {tab === "overview" && "Channel Overview"}
                  {tab === "revenue" && "Revenue Analysis"}
                  {tab === "monetization" && "Monetization Status"}
                  {tab === "analytics" && "Advanced Analytics"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === "overview" && <StatsCards data={data} />}
            {activeTab === "revenue" && <Revenue data={data} />}
            {activeTab === "monetization" && data.monetization && <Monetization data={data} />}
            {activeTab === "analytics" && <Analytics data={data} />}
          </div>

          {/* SEO Content - YouTube Monetization Guide */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding YouTube Monetization</h2>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How YouTube Revenue Works</h3>
              <p className="text-gray-700 mb-4">
                YouTube creators earn money primarily through the YouTube Partner Program (YPP), which allows
                ads to be displayed on their videos. Revenue is generated based on several factors:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2">
                <li><strong>CPM (Cost Per Mille):</strong> The amount advertisers pay per 1,000 ad impressions</li>
                <li><strong>RPM (Revenue Per Mille):</strong> Actual revenue earned per 1,000 views after YouTube&apos;s share</li>
                <li><strong>Audience Demographics:</strong> Viewers from different countries have varying advertising value</li>
                <li><strong>Content Category:</strong> Some niches (finance, tech) command higher CPM rates than others</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">YouTube Partner Program Requirements</h3>
              <p className="text-gray-700 mb-4">
                To qualify for the YouTube Partner Program and start earning from ads, channels must meet these thresholds:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2">
                <li>1,000 subscribers</li>
                <li>4,000 valid public watch hours in the past 12 months</li>
                <li>Adherence to YouTube&apos;s policies and guidelines</li>
                <li>Linking to an approved AdSense account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Factors That Impact YouTube Earnings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Content Quality Factors</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>Video production quality</li>
                    <li>Content originality and value</li>
                    <li>Consistent upload schedule</li>
                    <li>Engaging storytelling</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Audience Factors</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>Viewer retention rates</li>
                    <li>Audience demographics</li>
                    <li>Engagement (likes, comments, shares)</li>
                    <li>Subscriber growth rate</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Alternative Revenue Streams for YouTubers</h3>
              <p className="text-gray-700 mb-4">
                Beyond ad revenue, successful creators diversify their income through:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2">
                <li><strong>Channel Memberships:</strong> Monthly subscriptions for exclusive content</li>
                <li><strong>Super Chat &amp; Super Stickers:</strong> Viewer payments during live streams</li>
                <li><strong>Merchandise Shelf:</strong> Selling branded products directly on YouTube</li>
                <li><strong>Brand Deals &amp; Sponsorships:</strong> Partnering with companies for promoted content</li>
                <li><strong>Affiliate Marketing:</strong> Earning commissions by promoting products</li>
                <li><strong>Crowdfunding:</strong> Platforms like Patreon for direct fan support</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                <p className="text-blue-700 text-sm">
                  <strong>Pro Tip:</strong> The most successful YouTube channels combine multiple revenue streams
                  rather than relying solely on ad revenue. This approach provides stability and maximizes earning potential.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How accurate are these revenue estimates?</h3>
                <p className="text-gray-700 text-sm">
                  Our estimates are based on industry averages and publicly available data. While we strive for accuracy,
                  actual earnings can vary based on many factors including content niche, audience location, seasonality,
                  and specific channel performance metrics.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Why do CPM rates vary between channels?</h3>
                <p className="text-gray-700 text-sm">
                  CPM (Cost Per Mille) rates differ based on audience demographics, content category, video length,
                  and advertiser demand. Channels with audiences in high-income countries or in lucrative niches
                  like finance typically earn higher CPMs.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What&apos;s the difference between CPM and RPM?</h3>
                <p className="text-gray-700 text-sm">
                  CPM represents what advertisers pay per 1,000 impressions, while RPM is what creators actually
                  earn per 1,000 views after YouTube takes its 45% share. RPM is typically the more relevant metric
                  for understanding actual channel earnings.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How long does it take to get monetized on YouTube?</h3>
                <p className="text-gray-700 text-sm">
                  After reaching the 1,000 subscriber and 4,000 watch hour thresholds, the YouTube Partner Program
                  application process typically takes 1-4 weeks. However, some channels may experience longer review
                  periods depending on content type and compliance history.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);



}

