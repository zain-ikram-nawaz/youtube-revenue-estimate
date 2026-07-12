"use client";

import { useState, useRef } from "react";
import MonetizationStatusBar from "../MonitizationStatusBar/page";
import StatsCards from "../StatsCards/StatsCards";
import Revenue from "../Revenue/Revenue";
import Monetization from "../Monetization/Monetiztion";
import Analytics from "../Analytics/Analytics";
import Image from "next/image";
import Form from "../Form/page";
import StepLoader from "../StepLoader/StepLoader";
import ChannelPerformance from "../ChannelPerformance/ChannelPerformance"

export default function ChannelEstimator({ seoSections }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [channelUrl, setChannelUrl] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputType, setInputType] = useState(null);
  const resultsRef = useRef(null);

  if (!seoSections) return null;

  // Enhanced input validation
  const validateInput = (input) => {
    if (!input?.trim()) return { valid: false, message: "Please enter something" };

    const trimmed = input.trim();

    // Check for video URLs
    if (trimmed.includes('watch?v=') || trimmed.includes('youtu.be/') || trimmed.includes('/shorts/')) {
      return { valid: true, type: 'video', message: "Video detected - will analyze the channel" };
    }

    // Check for channel URLs
    if (trimmed.includes('youtube.com/') && (trimmed.includes('/channel/') || trimmed.includes('/@'))) {
      return { valid: true, type: 'channel_url', message: "Channel URL detected" };
    }

    // Assume it's a channel name
    return { valid: true, type: 'channel_name', message: "Channel name detected" };
  };

  // Monetization calculation
  const calculateMonetizationStatus = (channelData) => {
    const {
      subscribers,
      totalViews,
      videoCount,
      avgMonthlyViews,
      creationDate,
      estimatedRevenue,
    } = channelData;

    const YOUTUBE_REQUIREMENTS = {
      MIN_SUBSCRIBERS: 1000,
      MIN_WATCH_HOURS: 4000,
      MIN_VIDEOS: 3,
      MIN_CHANNEL_AGE: 30,
    };

    const channelAgeDays = Math.floor(
      (new Date() - new Date(creationDate)) / (1000 * 60 * 60 * 24)
    );
    const estimatedWatchHours = ((avgMonthlyViews * 5) / 60) * 12;

    const requirements = {
      subscribers: subscribers >= YOUTUBE_REQUIREMENTS.MIN_SUBSCRIBERS,
      watchHours: estimatedWatchHours >= YOUTUBE_REQUIREMENTS.MIN_WATCH_HOURS,
      videos: videoCount >= YOUTUBE_REQUIREMENTS.MIN_VIDEOS,
      channelAge: channelAgeDays >= YOUTUBE_REQUIREMENTS.MIN_CHANNEL_AGE,
    };

    const complianceScore = Math.min(
      (subscribers / YOUTUBE_REQUIREMENTS.MIN_SUBSCRIBERS) * 25 +
      (estimatedWatchHours / YOUTUBE_REQUIREMENTS.MIN_WATCH_HOURS) * 25 +
      Math.min(videoCount / YOUTUBE_REQUIREMENTS.MIN_VIDEOS, 1) * 25 +
      Math.min(channelAgeDays / YOUTUBE_REQUIREMENTS.MIN_CHANNEL_AGE, 1) * 25,
      100
    );

    const allRequirementsMet = Object.values(requirements).every((req) => req);
    const status = allRequirementsMet
      ? "monetized"
      : complianceScore >= 70
        ? "eligible"
        : complianceScore >= 40
          ? "growing"
          : "not_eligible";

    const avgDailySubs = subscribers / channelAgeDays || 0;
    const daysTo1000 = YOUTUBE_REQUIREMENTS.MIN_SUBSCRIBERS / (avgDailySubs || 1);

    const avgDailyViews = avgMonthlyViews / 30 || 0;
    const avgDailyWatchHours = (avgDailyViews * 5) / 60;
    const daysTo4000 = YOUTUBE_REQUIREMENTS.MIN_WATCH_HOURS / (avgDailyWatchHours || 1);

    const monetizationSubsDate = new Date(
      new Date(creationDate).getTime() + daysTo1000 * 24 * 60 * 60 * 1000
    );
    const monetizationWatchDate = new Date(
      new Date(creationDate).getTime() + daysTo4000 * 24 * 60 * 60 * 1000
    );

    const estimatedMonetizationDate = new Date(
      Math.max(monetizationSubsDate.getTime(), monetizationWatchDate.getTime())
    );

    const monthsSinceMonetization = Math.max(
      0,
      (new Date() - estimatedMonetizationDate) / (1000 * 60 * 60 * 24 * 30)
    );

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

  const handleSubmit = async (e, filters = { niche: 'auto', location: 'auto' }) => {
    if (e) e.preventDefault();

    const validation = validateInput(channelUrl);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    if (!captchaToken) {
      setError("Please verify the reCAPTCHA first!");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);
    setInputType(validation.type);

    try {
      // Verify captcha
      const verifyRes = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        throw new Error("Captcha verification failed!");
      }

      // 2. Forward niche and location to your API
      const res = await fetch(`/api/channel-estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelUrl: channelUrl.trim(),
          niche: filters.niche,       // Added this
          location: filters.location  // Added this
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to fetch data");
      }

      const monetizationData = calculateMonetizationStatus(json);

      setData({
        ...json,
        monetization: monetizationData,
      });

      setIsModalOpen(true);

    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  // Handle input change with real-time validation
  const handleInputChange = (value) => {
    setChannelUrl(value);
    if (error) setError(""); // Clear error when user starts typing
  };

  if (loading) {
    return <StepLoader />;
  }

  return (
   <div className="min-h-screen bg-background py-4 md:py-8 px-3 sm:px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="lg:col-span-12 text-center mb-8">

          {/* Enhanced Input Type Indicator */}
          {channelUrl && (
            <div className="mt-4">
              {(() => {
                const validation = validateInput(channelUrl);
                if (validation.valid) {
                  return (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-foreground rounded-lg text-sm font-medium">
                      <span className="w-2 h-2 bg-accent rounded-lg"></span>
                      {validation.message}
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}
        </div>

        {/* Enhanced Form Component */}
        <Form
          channelUrl={channelUrl}
          setChannelUrl={handleInputChange}
          loading={loading}
          error={error}
          handleSubmit={handleSubmit} // Now accepts the object from Form.js
          setCaptchaToken={setCaptchaToken}
        />

        {/* Side Drawer Overlay */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
        )}

        {/* Right Side Drawer */}
        <div className={`fixed top-0 right-0 h-full z-[70] w-full max-w-4xl bg-background shadow-2xl transform transition-transform duration-500 ease-in-out ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>

          {data && (
            <div className="flex flex-col h-full">
              {/* Enhanced Drawer Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-background">
                <div className="flex items-center gap-3">
                  {data?.bannerImage ? (
                    <Image
                      width={1000}
                      height={1000}
                      src={data.bannerImage}
                      alt="Channel"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {data?.channelName?.charAt(0) || 'C'}
                    </div>
                  )}
                  <div>
                    <h2 className="font-bold text-foreground truncate max-w-[200px]">
                      {data?.channelName}
                    </h2>
                    {/* Show input type and message */}
                    {data.message && (
                      <p className="text-xs text-muted truncate max-w-[250px]">
                        {data.message}
                      </p>
                    )}
                    {data.videoInfo && (
                      <p className="text-xs text-accent truncate max-w-[250px]">
                        From video: {data.videoInfo.title}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-secondary text-primary rounded-full transition-colors font-bold"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                {/* Enhanced Banner Section */}
                {data?.bannerImage && (
                  <div className="relative h-32 mb-6 rounded-lg overflow-hidden shadow-inner">
                    <Image
                      width={10000}
                      height={200000}
                      src={data.bannerImage}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <div className="text-background">
                        <p className="text-sm font-semibold">
                          {data?.subscribers?.toLocaleString()} Subscribers
                        </p>
                        {data.inputType === 'video_redirected' && (
                          <p className="text-xs opacity-90">
                            Analyzed from video link
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Info Card (if redirected from video) */}
                {data?.videoInfo && (
                  <div className="mb-6 p-4 bg-secondary border border-border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                        📹
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          Video Analysis Redirected
                        </h3>
                        <p className="text-muted text-xs mb-2 line-clamp-2">
                          {data.videoInfo.title}
                        </p>
                        <div className="flex gap-4 text-xs text-accent">
                          <span>{data.videoInfo.views} views</span>
                          <span>{data.videoInfo.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Monetization Quick Status */}
                {data?.monetization && (
                  <div className="mb-6">
                    <MonetizationStatusBar
                      data={data?.monetization}
                      getMonetizationConfig={getMonetizationConfig}
                    />
                  </div>
                )}

                {/* Enhanced Navigation Tabs */}
                <div className="flex flex-wrap gap-1 mb-6 p-1 bg-secondary rounded-full">
                  {[
                    { key: "overview", label: "Overview", icon: "📊" },
                    { key: "revenue", label: "Revenue", icon: "💰" },
                    { key: "performance", label: "Performance", icon: "📈" },
                    { key: "monetization", label: "Monetization", icon: "🎯" },
                    { key: "analytics", label: "Analytics", icon: "🔍" }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 py-2 px-2 text-xs uppercase tracking-wider font-black rounded-full transition-all flex items-center justify-center gap-1 ${activeTab === tab.key
                          ? "bg-primary text-white shadow-sm"
                          : "text-muted hover:text-foreground"
                        }`}
                    >
                      <span className="text-xs">{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content Rendering */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {activeTab === "performance" && (
                    <ChannelPerformance
                      data={data}
                      aiData={data.aiAnalysis?.performance}
                    />
                  )}
                  {activeTab === "overview" && (
                    <StatsCards
                      data={data}
                      aiData={data.aiAnalysis?.overview}
                    />
                  )}
                  {activeTab === "revenue" && (
                    <Revenue
                      data={data}
                      aiData={data.aiAnalysis?.revenue}
                    />
                  )}
                  {activeTab === "monetization" && data.monetization && (
                    <Monetization
                      data={data}
                      aiData={data.aiAnalysis?.monetization}
                    />
                  )}
                  {activeTab === "analytics" && (
                    <Analytics
                      data={data}
                      aiData={data.aiAnalysis?.advanced}
                    />
                  )}
                </div>
              </div>

              {/* Enhanced Drawer Footer */}
              <div className="p-4 border-t border-border bg-background">
                <div className="text-center text-xs text-muted font-bold uppercase tracking-[0.2em] mb-2">
                  AI Analysis Powered by Channel Income 2026
                </div>
                {data.inputType && (
                  <div className="text-center text-xs text-muted">
                    Input type: {data.inputType.replace('_', ' ')}
                    {data.inputType === 'channel_name' && ' (searched by name)'}
                    {data.inputType === 'video_redirected' && ' (redirected from video)'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Error Display */}
        {error && !loading && (
          <div className="lg:col-span-12 mt-4">
            <div className="max-w-2xl mx-auto p-4 bg-primary/5 border border-primary/30 rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">
                  !
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">Error</h3>
                  <p className="text-foreground text-sm mb-3">{error}</p>

                  {/* Helpful suggestions */}
                  <div className="text-xs text-muted">
                    <p className="font-medium mb-1 text-foreground">Try these formats:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Channel URL: https://youtube.com/@channelname</li>
                      <li>Channel name: channelname or @channelname</li>
                      <li>Video URL: https://youtube.com/watch?v=...</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}