"use client";

import { useState, useRef, useEffect } from "react";
import MonetizationStatusBar from "../MonitizationStatusBar/page";
import StatsCards from "../StatsCards/StatsCards";
import Revenue from "../Revenue/Revenue";
import Monetization from "../Monetization/Monetiztion";
import Analytics from "../Analytics/Analytics";
import Image from "next/image";
import Form from "../Form/page";
import Loader from "../Loader/Loader";
import ChannelPerformance from "../ChannelPerformance/ChannelPerformance"

export default function ChannelEstimator({ seoSections }) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [channelUrl, setChannelUrl] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resultsRef = useRef(null);
  if (!seoSections) return null; // safety check

  // Monetization calculation function (same as before)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please verify the reCAPTCHA first!");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const verifyRes = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        setLoading(false);
        alert("❌ Captcha verification failed!");
        return;
      }

      const res = await fetch(`/api/channel-estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelUrl }),
      });

      if (!res.ok) throw new Error("Failed to fetch estimates");

      const json = await res.json();
      const monetizationData = calculateMonetizationStatus(json);

      setData({
        ...json,
        monetization: monetizationData,
      });

      setIsModalOpen(true); // show modal after response

    } catch (err) {
      setError(err.message || "Something went wrong");
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

  if (loading) {
    return <Loader />;
  }
      console.log(data, "data")


  return (
 <div className="min-h-screen bg-[#f8fafc] py-4 md:py-8 px-3 sm:px-4 lg:px-6">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">

    {/* Header Section */}
    <div className="lg:col-span-12 text-center mb-8">
      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        YouTube <span className="text-red-600">Revenue</span> Estimator
      </h1>
      <p className="text-slate-500 mt-3 max-w-xl mx-auto font-medium">
        Professional analytics and AI-powered growth insights for creators.
      </p>
    </div>

    {/* Form Component */}
    <Form
      channelUrl={channelUrl}
      setChannelUrl={setChannelUrl}
      loading={loading}
      error={error}
      handleSubmit={handleSubmit}
      setCaptchaToken={setCaptchaToken}
    />

    {/* Side Drawer Overlay */}
    {isModalOpen && (
      <div
        className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsModalOpen(false)}
      />
    )}

    {/* Right Side Drawer */}
    <div className={`fixed top-0 right-0 h-full z-[70] w-full max-w-4xl bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${isModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>

      {data && (
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-4 border-b flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">Ci</div>
               <h2 className="font-bold text-slate-800 truncate max-w-[200px]">{data?.channelName}</h2>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 hover:bg-red-100 text-red-600 rounded-full transition-colors font-bold"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {data?.bannerImage && (
              <div className="relative h-32 mb-6 rounded-xl overflow-hidden shadow-inner">
                <img
                  src={data.bannerImage}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                   <p className="text-white text-sm font-semibold">{data?.subscribers?.toLocaleString()} Subscribers</p>
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

            {/* Navigation Tabs (Vertical/Compact style for Drawer) */}
            <div className="flex flex-wrap gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
              {["overview", "revenue", "performance", "monetization", "analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-2 text-[10px] uppercase tracking-wider font-black rounded-lg transition-all ${
                    activeTab === tab ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Rendering */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === "performance" && <ChannelPerformance data={data} aiData={data.aiAnalysis.performance}/>}
              {activeTab === "overview" && <StatsCards data={data} aiData={data.aiAnalysis.overview}/>}
              {activeTab === "revenue" && <Revenue data={data} aiData={data.aiAnalysis.revenue}/>}
              {activeTab === "monetization" && data.monetization && <Monetization data={data} aiData={data.aiAnalysis.monetization}/>}
              {activeTab === "analytics" && <Analytics data={data} aiData={data.aiAnalysis.advanced}/>}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t bg-slate-50 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            AI Analysis Powered by Channel income 2026
          </div>
        </div>
      )}
    </div>
  </div>
</div>
  );
}
