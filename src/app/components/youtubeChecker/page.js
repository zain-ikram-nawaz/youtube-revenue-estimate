"use client";

import { useState, useRef, useEffect } from "react";
import MonetizationStatusBar from "../MonitizationStatusBar/page";
import StatsCards from "../StatsCards/page";
import Revenue from "../Revenue/page";
import Monetization from "../Monetization/page";
import Analytics from "../Analytics/page";
import Image from "next/image";
import Form from "../Form/page";
import Loader from "../Loader/page";

export default function ChannelEstimator({seoSections}) {

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-4 md:py-8 px-3 sm:px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        {/* Header and SEO content */}
        <div className="lg:col-span-12 text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            YouTube Channel Revenue Estimator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto px-2">
            Get accurate revenue estimates and monetization status for any YouTube channel
          </p>
        </div>

        {/* Input Form */}
        <Form
          channelUrl={channelUrl}
          setChannelUrl={setChannelUrl}
          loading={loading}
          error={error}
          handleSubmit={handleSubmit}
          setCaptchaToken={setCaptchaToken}
        />

    {/* SEO Content (Static, outside modal for indexing) */}
    <div className="lg:col-span-12 bg-white rounded-xl shadow-lg p-6 mt-6">
      {/* Intro Section */}
      {seoSections?.intro && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {seoSections?.intro?.heading}
          </h2>
          <p className="text-gray-700 mb-4">{seoSections?.intro?.content}</p>

          {seoSections?.intro?.disclaimer && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm text-yellow-700">
                <strong>Disclaimer:</strong> {seoSections?.intro?.disclaimer}
              </p>
            </div>
          )}
        </>
      )}

      {/* How It Works Section */}
      {seoSections?.howItWorks && (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
            {seoSections?.howItWorks?.title}
          </h3>
          {seoSections?.howItWorks?.steps && (
            <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2">
              {seoSections?.howItWorks?.steps?.map((step, idx) => (
                <li key={idx}>
                  <strong>{step?.title}:</strong> {step?.desc}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Monetization Guide Section */}
      {seoSections?.monetizationGuide && (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
            {seoSections?.monetizationGuide?.title}
          </h3>
          {seoSections?.monetizationGuide?.sections &&
            seoSections?.monetizationGuide?.sections?.map((section, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mt-2 mb-2">
                  {section?.title}
                </h4>
                {section?.list && (
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    {section?.list?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </>
      )}
    </div>
        {/* Modal */}
      {isModalOpen && data && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-70">
    <div className="bg-white rounded-xl p-6 max-w-5xl w-full relative max-h-[95vh] overflow-hidden flex flex-col">
      <button
        className="absolute right-2 text-white bg-red-500 px-3 py-1 hover:text-red-500 hover:bg-white rounded-full font-bold text-lg z-10"
        onClick={() => setIsModalOpen(false)}
      >
        X
      </button>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 modal-scroll">
        {data?.bannerImage && (
          <Image
            src={data?.bannerImage}
            width={1280}
            height={720}
            alt="Channel Banner"
            className="w-full h-32 sm:h-40 md:h-78 object-cover rounded-lg mb-4"
          />
        )}

        <h2 className="text-xl font-bold mb-2">{data?.channelName}</h2>
        <p className="text-gray-600 mb-4">{data?.subscribers?.toLocaleString()} subscribers</p>

        {data?.monetization && (
          <MonetizationStatusBar
            data={data?.monetization}
            getMonetizationConfig={getMonetizationConfig}
          />
        )}

        {/* Tabs */}
        <div className="bg-gray-100 rounded-lg overflow-hidden mt-4">
          <div className="flex border-b border-gray-300">
            {["overview", "revenue", "monetization", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-3 text-sm font-semibold transition-all ${
                  activeTab === tab ? "bg-red-600 text-white" : "text-gray-700 hover:bg-red-100"
                }`}
              >
                {tab === "overview" && "Channel Overview"}
                {tab === "revenue" && "Revenue Analysis"}
                {tab === "monetization" && "Monetization Status"}
                {tab === "analytics" && "Advanced Analytics"}
              </button>
            ))}
          </div>
          <div className="p-4">
            {activeTab === "overview" && <StatsCards data={data} />}
            {activeTab === "revenue" && <Revenue data={data} />}
            {activeTab === "monetization" && data.monetization && <Monetization data={data} />}
            {activeTab === "analytics" && <Analytics data={data} />}
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
