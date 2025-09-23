"use client";

import { useState } from "react";

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
      creationDate
    } = channelData;

    // YouTube monetization requirements
    const YOUTUBE_REQUIREMENTS = {
      MIN_SUBSCRIBERS: 1000,
      MIN_WATCH_HOURS: 4000, // hours in past 12 months
      MIN_VIDEOS: 3, // public videos
      MIN_CHANNEL_AGE: 30 // days
    };

    // Calculate channel age in days
    const channelAgeDays = Math.floor((new Date() - new Date(creationDate)) / (1000 * 60 * 60 * 24));

    // Estimate watch hours (assuming 5 minutes average watch time per view)
    const estimatedWatchHours = (avgMonthlyViews * 5 / 60) * 12; // Convert to hours per year

    // Check each requirement
    const requirements = {
      subscribers: subscribers >= YOUTUBE_REQUIREMENTS.MIN_SUBSCRIBERS,
      watchHours: estimatedWatchHours >= YOUTUBE_REQUIREMENTS.MIN_WATCH_HOURS,
      videos: videoCount >= YOUTUBE_REQUIREMENTS.MIN_VIDEOS,
      channelAge: channelAgeDays >= YOUTUBE_REQUIREMENTS.MIN_CHANNEL_AGE
    };

    // Calculate compliance score (0-100)
    const complianceScore = Math.min(
      (subscribers / YOUTUBE_REQUIREMENTS.MIN_SUBSCRIBERS * 25) +
      (estimatedWatchHours / YOUTUBE_REQUIREMENTS.MIN_WATCH_HOURS * 25) +
      (Math.min(videoCount / YOUTUBE_REQUIREMENTS.MIN_VIDEOS, 1) * 25) +
      (Math.min(channelAgeDays / YOUTUBE_REQUIREMENTS.MIN_CHANNEL_AGE, 1) * 25),
      100
    );

    // Determine status
    const allRequirementsMet = Object.values(requirements).every(req => req);
    const status = allRequirementsMet ? "monetized" :
                  complianceScore >= 70 ? "eligible" :
                  complianceScore >= 40 ? "growing" : "not_eligible";

    return {
      status,
      complianceScore: Math.round(complianceScore),
      requirements,
      estimatedWatchHours: Math.round(estimatedWatchHours),
      channelAgeDays,
      youtubeRequirements: YOUTUBE_REQUIREMENTS
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`https://3d-campervan-configurator-production.up.railway.app/api/channel-estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl }),
      });

      if (!res.ok) throw new Error("Failed to fetch estimates");

      const json = await res.json();

      // Calculate monetization status
      const monetizationData = calculateMonetizationStatus(json);

      // Merge with original data
      setData({
        ...json,
        monetization: monetizationData
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Get status display configuration
  const getMonetizationConfig = (status) => {
    const config = {
      monetized: {
        color: "green",
        bgColor: "bg-green-50",
        borderColor: "border-green-500",
        textColor: "text-green-700",
        icon: "✅",
        label: "Monetized",
        description: "Channel meets all YouTube Partner Program requirements"
      },
      eligible: {
        color: "blue",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-500",
        textColor: "text-blue-700",
        icon: "📊",
        label: "Eligible Soon",
        description: "Channel is close to meeting monetization requirements"
      },
      growing: {
        color: "yellow",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-500",
        textColor: "text-yellow-700",
        icon: "🌱",
        label: "Growing",
        description: "Channel needs significant growth to meet requirements"
      },
      not_eligible: {
        color: "red",
        bgColor: "bg-red-50",
        borderColor: "border-red-500",
        textColor: "text-red-700",
        icon: "⏳",
        label: "Not Eligible",
        description: "Channel does not meet basic requirements"
      }
    };
    return config[status] || config.not_eligible;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-4 md:py-8 px-3 sm:px-4 lg:px-6">
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">

        {/* Header Section - Full Width */}
        <div className="lg:col-span-12">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full mb-3 md:mb-4 shadow-lg">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              YouTube Channel Revenue Estimator
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Get accurate revenue estimates and monetization status for any YouTube channel
            </p>
          </div>
        </div>

        {/* Input Section - Centered */}
        <div className="lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 sm:p-6 md:p-8 border border-red-100">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="channelUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                  YouTube Channel URL
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="channelUrl"
                    type="text"
                    placeholder="https://www.youtube.com/@channelname"
                    value={channelUrl}
                    onChange={(e) => setChannelUrl(e.target.value)}
                    className="flex-1 border-2 border-gray-200 rounded-lg md:rounded-xl p-3 md:p-4 text-base focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg md:rounded-xl font-semibold shadow-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none whitespace-nowrap"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 justify-center">
                        <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        <span className="text-sm md:text-base">Analyzing...</span>
                      </span>
                    ) : (
                      <span className="text-sm md:text-base">Estimate Revenue</span>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-red-700 font-medium text-sm">{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Results Section - Full Width */}
        {data && (
          <div className="lg:col-span-12 space-y-6">

            {/* Banner with Profile */}
            {data.bannerImage && (
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={data.bannerImage}
                  alt="Channel Banner"
                  className="w-full h-32 sm:h-40 md:h-48 object-cover"
                />
                <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-4 sm:left-6 md:left-8 flex items-end gap-2 sm:gap-3 md:gap-4">
                  {data.channelImage && (
                    <img
                      src={data.channelImage}
                      alt="Channel"
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 sm:border-3 md:border-4 border-white shadow-xl"
                    />
                  )}
                  <div className="mb-1 sm:mb-2 ml-1 sm:ml-2 md:ml-4">
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

            {/* Monetization Status Banner */}
            {data.monetization && (
              <div className={`rounded-xl md:rounded-2xl shadow-lg border-l-4 p-4 sm:p-6 ${
                getMonetizationConfig(data.monetization.status).bgColor
              } ${getMonetizationConfig(data.monetization.status).borderColor}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getMonetizationConfig(data.monetization.status).icon}</span>
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold ${getMonetizationConfig(data.monetization.status).textColor}`}>
                        {getMonetizationConfig(data.monetization.status).label}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {getMonetizationConfig(data.monetization.status).description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getMonetizationConfig(data.monetization.status).textColor}`}>
                        {data.monetization.complianceScore}%
                      </div>
                      <div className="text-gray-600 text-sm">Compliance Score</div>
                    </div>
                    <div className="w-16 h-16 relative">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={getMonetizationConfig(data.monetization.status).color === 'green' ? '#10B981' :
                                 getMonetizationConfig(data.monetization.status).color === 'blue' ? '#3B82F6' :
                                 getMonetizationConfig(data.monetization.status).color === 'yellow' ? '#F59E0B' : '#EF4444'}
                          strokeWidth="3"
                          strokeDasharray={`${data.monetization.complianceScore}, 100`}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
              <div className="flex flex-col sm:flex-row border-b border-gray-200">
                {['overview', 'revenue', 'monetization', 'analytics'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 sm:py-4 px-4 font-semibold transition-all duration-200 text-sm sm:text-base ${
                      activeTab === tab
                        ? 'text-red-600 border-b-2 sm:border-b-0 border-red-600 bg-red-50'
                        : 'text-gray-600 hover:text-red-500 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'overview' && 'Channel Overview'}
                    {tab === 'revenue' && 'Revenue Analysis'}
                    {tab === 'monetization' && 'Monetization Status'}
                    {tab === 'analytics' && 'Advanced Analytics'}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content Grid */}
            <div className="space-y-6">

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                  {/* Stats Cards */}
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{data.subscribers.toLocaleString()}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Subscribers</div>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{data.totalViews.toLocaleString()}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Views</div>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{data.videoCount}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Videos</div>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{data.country}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Country</div>
                  </div>

                  {/* Channel Info - Full Width */}
                  <div className="md:col-span-2 lg:col-span-4 bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Channel Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600 text-sm sm:text-base">Channel ID</span>
                          <span className="text-gray-900 font-mono text-xs sm:text-sm truncate ml-2">{data.channelId}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600 text-sm sm:text-base">Creation Date</span>
                          <span className="text-gray-900 text-sm sm:text-base">{new Date(data.creationDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600 text-sm sm:text-base">Avg Monthly Views</span>
                          <span className="text-gray-900 font-bold text-sm sm:text-base">{data.avgMonthlyViews.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600 text-sm sm:text-base">Channel Age</span>
                          <span className="text-gray-900 text-sm sm:text-base">
                            {Math.floor((new Date() - new Date(data.creationDate)) / (365.25 * 24 * 60 * 60 * 1000))} years
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Revenue Tab */}
              {activeTab === 'revenue' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

                  {/* Revenue Highlights */}
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-xl">
                      <div className="text-2xl sm:text-3xl font-bold mb-2">{data.estimatedRevenue}</div>
                      <div className="text-red-100 text-sm sm:text-base">Lifetime Estimated Revenue</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-xl">
                      <div className="text-2xl sm:text-3xl font-bold mb-2">{data.avgMonthlyRevenue}</div>
                      <div className="text-red-100 text-sm sm:text-base">Avg Monthly Revenue</div>
                    </div>
                  </div>

                  {/* Monthly Stats */}
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Monthly Performance</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-red-600">{data.avgMonthlyViews.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Average Monthly Views</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-900">{data.avgMonthlyRevenue}</div>
                        <div className="text-sm text-gray-600">Estimated Monthly Revenue</div>
                      </div>
                    </div>
                  </div>

                  {/* RPM Table - Full Width */}
                  <div className="lg:col-span-3 bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">Revenue Estimates by RPM Brackets</h3>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">Estimated monthly revenue based on different RPM ranges</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px]">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 text-sm">RPM Bracket</th>
                            <th className="px-4 sm:px-6 py-3 text-right font-semibold text-gray-700 text-sm">Estimated Monthly Revenue</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {Object.entries(data.revenueEstimates).map(([label, value], index) => (
                            <tr key={label} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 sm:px-6 py-3">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                                    index === 0 ? 'bg-green-500' :
                                    index === 1 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}></div>
                                  <span className="font-medium text-sm sm:text-base">{label}</span>
                                </div>
                              </td>
                              <td className="px-4 sm:px-6 py-3 text-right font-semibold text-gray-900 text-sm sm:text-base">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Monetization Tab */}
              {activeTab === 'monetization' && data.monetization && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Requirements Status */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">YouTube Partner Program Requirements</h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: 'subscribers',
                          label: '1,000 Subscribers',
                          current: data.subscribers,
                          required: data.monetization.youtubeRequirements.MIN_SUBSCRIBERS,
                          met: data.monetization.requirements.subscribers
                        },
                        {
                          key: 'watchHours',
                          label: '4,000 Watch Hours (yearly)',
                          current: data.monetization.estimatedWatchHours,
                          required: data.monetization.youtubeRequirements.MIN_WATCH_HOURS,
                          met: data.monetization.requirements.watchHours
                        },
                        {
                          key: 'videos',
                          label: '3 Public Videos',
                          current: data.videoCount,
                          required: data.monetization.youtubeRequirements.MIN_VIDEOS,
                          met: data.monetization.requirements.videos
                        },
                        {
                          key: 'channelAge',
                          label: '30 Days Channel Age',
                          current: data.monetization.channelAgeDays,
                          required: data.monetization.youtubeRequirements.MIN_CHANNEL_AGE,
                          met: data.monetization.requirements.channelAge
                        }
                      ].map((req, index) => (
                        <div key={req.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              req.met ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className="font-medium">{req.label}</span>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${req.met ? 'text-green-600' : 'text-red-600'}`}>
                              {req.current.toLocaleString()} / {req.required.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              {req.met ? '✓ Met' : '✗ Not Met'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Analysis */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Progress Analysis</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Overall Compliance</span>
                          <span className="font-bold text-green-600">{data.monetization.complianceScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${data.monetization.complianceScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.max(0, data.monetization.youtubeRequirements.MIN_SUBSCRIBERS - data.subscribers).toLocaleString()}
                          </div>
                          <div className="text-sm text-blue-600">Subscribers Needed</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {Math.max(0, data.monetization.youtubeRequirements.MIN_WATCH_HOURS - data.monetization.estimatedWatchHours).toLocaleString()}h
                          </div>
                          <div className="text-sm text-purple-600">Watch Hours Needed</div>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Recommendations</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          {!data.monetization.requirements.subscribers && (
                            <li>• Focus on subscriber growth through consistent content</li>
                          )}
                          {!data.monetization.requirements.watchHours && (
                            <li>• Increase video length and watch time retention</li>
                          )}
                          {data.monetization.status === 'monetized' && (
                            <li>• Maintain consistency to keep monetization status</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

                  {/* Notes Section */}
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      Analysis Notes
                    </h3>
                    <ul className="space-y-2">
                      {data.notes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2 p-2 sm:p-3 bg-red-50 rounded-lg">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-gray-700 text-sm sm:text-base">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-600">Views per Subscriber</span>
                          <span className="text-sm font-bold text-red-600">
                            {((data.totalViews / data.subscribers) || 0).toFixed(1)} views/sub
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((data.totalViews / data.subscribers) / 50 * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-600">Content Frequency</span>
                          <span className="text-sm font-bold text-red-600">
                            {(data.videoCount / Math.max((new Date() - new Date(data.creationDate)) / (365.25 * 24 * 60 * 60 * 1000), 1)).toFixed(1)} videos/year
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((data.videoCount / Math.max((new Date() - new Date(data.creationDate)) / (365.25 * 24 * 60 * 60 * 1000), 1)) / 100 * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">+12.5%</div>
                          <div className="text-xs text-gray-600">MoM Growth</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">94%</div>
                          <div className="text-xs text-gray-600">Retention</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}