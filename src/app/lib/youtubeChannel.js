import axios from "axios";
import { main } from "../hooks/aiAnalysis";
import { NICHE_FACTORS, REGION_FACTORS, COUNTRY_RPM } from "./rpmData";

// Shared YouTube channel resolution + revenue-estimation engine.
// Extracted so the single-channel calculator and the channel-comparison
// tool can reuse identical logic instead of duplicating it.

export function extractChannelId(url) {
  const matchId = url.match(/channel\/([a-zA-Z0-9_-]+)/);
  if (matchId) return matchId[1];
  const matchHandle = url.match(/youtube\.com\/@([a-zA-Z0-9._-]+)/);
  if (matchHandle) return matchHandle[1];
  return null;
}

export function extractVideoId(url) {
  const patterns = [
    /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/,
    /youtu\.be\/([0-9A-Za-z_-]{11})/,
    /youtube\.com\/embed\/([0-9A-Za-z_-]{11})/,
    /youtube\.com\/watch\?v=([0-9A-Za-z_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export async function searchChannelByName(channelName) {
  try {
    const cleanName = channelName.replace("@", "").trim();
    const searchRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(cleanName)}&maxResults=5&key=${process.env.YOUTUBE_API_KEY}`
    );
    if (searchRes.data?.items?.length > 0) {
      return searchRes.data.items[0].snippet.channelId;
    }
    return null;
  } catch (error) {
    console.error("Channel search error:", error);
    return null;
  }
}

export function determineInputType(input) {
  if (!input) return "invalid";
  if (extractVideoId(input)) return "video";
  if (input.includes("youtube.com") || input.includes("youtu.be")) {
    if (extractChannelId(input)) return "channel_url";
    return "invalid";
  }
  return "channel_name";
}

// Resolves any supported input (channel URL, handle, channel name, or video URL)
// to a { channelId, videoInfo? } pair, or throws a { status, message } error.
export async function resolveChannelId(rawInput) {
  const input = rawInput.trim();
  const inputType = determineInputType(input);

  if (inputType === "video") {
    const videoId = extractVideoId(input);
    const videoRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const video = videoRes.data?.items?.[0];
    if (!video) {
      throw { status: 404, message: "Video not found. Please provide a channel URL or name instead." };
    }
    return {
      channelId: video.snippet.channelId,
      inputType: "video_redirected",
      videoInfo: {
        title: video.snippet.title,
        views: parseInt(video.statistics.viewCount || 0).toLocaleString(),
        likes: video.statistics.likeCount || "N/A",
        publishedAt: video.snippet.publishedAt,
      },
    };
  }

  let channelId = null;
  if (inputType === "channel_url") {
    const channelIdentifier = extractChannelId(input);
    if (input.includes("@")) {
      const handleRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${channelIdentifier}&key=${process.env.YOUTUBE_API_KEY}`
      );
      if (handleRes.data?.items?.length > 0) {
        channelId = handleRes.data.items[0].id;
      }
    } else {
      channelId = channelIdentifier;
    }
  } else if (inputType === "channel_name") {
    channelId = await searchChannelByName(input);
  }

  if (!channelId) {
    throw { status: 404, message: `Channel not found. Check the ${inputType === "channel_name" ? "name" : "URL"}.` };
  }

  return { channelId, inputType };
}

export async function fetchChannel(channelId) {
  const channelRes = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const channel = channelRes.data?.items?.[0];
  if (!channel) throw { status: 404, message: "Channel not found" };
  return channel;
}

export async function processChannelData(channel, channelId, userNiche, userLocation, { withAi = true } = {}) {
  const totalViews = parseInt(channel.statistics.viewCount || 0);
  const subscribers = parseInt(channel.statistics.subscriberCount || 0);
  const videoCount = parseInt(channel.statistics.videoCount || 0);
  const creationDate = channel.snippet.publishedAt;
  const country = channel.brandingSettings?.channel?.country || "N/A";
  const channelImage = channel.snippet.thumbnails?.high?.url || null;
  const bannerImage = channel.brandingSettings?.image?.bannerExternalUrl || null;

  let activeNiche = userNiche && userNiche !== "auto" ? userNiche : "default";
  let locationFactor = 1.0;

  if (userLocation && userLocation !== "auto") {
    locationFactor = REGION_FACTORS[userLocation];
  } else {
    locationFactor = COUNTRY_RPM[country] || COUNTRY_RPM.default;
  }

  const baseRPM = NICHE_FACTORS[activeNiche] || NICHE_FACTORS.default;
  const finalRPM = baseRPM * locationFactor;

  const monetizedViewsFactor = 0.60;
  const lifetimeRevenueNum = (totalViews / 1000) * finalRPM * monetizedViewsFactor;

  const legacyEstimatedRevenue = lifetimeRevenueNum.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const rpmBrackets = {
    "Shorts/Low Retention": 0.05 * locationFactor,
    "Standard Display Ads": 1.1 * locationFactor,
    "Mid-Range Content": 3.2 * locationFactor,
    "High-Value (Finance/SaaS)": 10.0 * locationFactor,
    "Top Market Capacity": 22.0 * locationFactor,
  };

  const revenueEstimates = {};
  for (const [label, rpm] of Object.entries(rpmBrackets)) {
    const revenue = ((totalViews / 1000) * rpm * monetizedViewsFactor).toFixed(0);
    revenueEstimates[label] = Number(revenue);
  }

  const monthsSinceCreation = (new Date() - new Date(creationDate)) / (1000 * 60 * 60 * 24 * 30);
  const avgMonthlyViews = monthsSinceCreation > 0 ? totalViews / monthsSinceCreation : 0;
  const avgMonthlyRevenue = ((avgMonthlyViews / 1000) * finalRPM * monetizedViewsFactor).toFixed(0);

  const searchRes = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${channelId}&part=id,snippet&maxResults=50&order=date&type=video`
  );
  const searchItems = searchRes.data?.items || [];
  const videoIds = searchItems.map((v) => v.id.videoId).filter(Boolean).join(",");

  let shortsRatio = null, videoAnalytics = null, estimatedWatchTime = null;

  if (videoIds) {
    const videosRes = await axios.get(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,statistics,snippet`);
    const videosDataItems = videosRes.data?.items || [];
    let shortsCount = 0, longCount = 0, engagementRatios = [], velocities = [], totalWatchSec = 0, totalViewsAll = 0;

    const videosData = videosDataItems.map((v) => {
      const views = parseInt(v.statistics.viewCount || 0);
      const likes = parseInt(v.statistics.likeCount || 0);
      const comments = parseInt(v.statistics.commentCount || 0);
      const published = new Date(v.snippet.publishedAt);
      const duration = v.contentDetails.duration;
      const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
      const minutes = parseInt(match?.[1] || 0);
      const seconds = parseInt(match?.[2] || 0);
      const totalSec = minutes * 60 + seconds;
      totalViewsAll += views;
      totalWatchSec += totalSec * views * 0.6;
      if (totalSec > 0 && totalSec < 60) shortsCount++; else longCount++;
      if (views > 0) engagementRatios.push((likes + comments) / views);
      const daysSince = (Date.now() - published) / (1000 * 60 * 60 * 24);
      if (daysSince > 0) velocities.push(views / daysSince);
      return { title: v.snippet.title, views, likes, comments };
    });

    if (totalViewsAll > 0) {
      estimatedWatchTime = {
        avgViewDuration: `${(totalWatchSec / totalViewsAll / 60).toFixed(1)} min`,
        totalWatchTimeHours: `${(totalWatchSec / 3600).toFixed(1)} hours`,
      };
    }
    const totalChecked = shortsCount + longCount;
    if (totalChecked > 0) {
      shortsRatio = {
        shortsCount, longCount,
        shortsPercent: ((shortsCount / totalChecked) * 100).toFixed(1) + "%",
        longsPercent: ((longCount / totalChecked) * 100).toFixed(1) + "%",
      };
    }
    const avgEngagement = engagementRatios.length > 0 ? (100 * engagementRatios.reduce((a, b) => a + b, 0) / engagementRatios.length).toFixed(1) + "%" : "N/A";
    const dates = searchItems.map((v) => new Date(v.snippet.publishedAt)).sort((a, b) => b - a);
    const gaps = [];
    for (let i = 1; i < dates.length; i++) gaps.push((dates[i - 1] - dates[i]) / (1000 * 60 * 60 * 24));
    const uploadFrequency = gaps.length > 0 ? `${Math.round(30 / (gaps.reduce((a, b) => a + b, 0) / gaps.length))} videos/month` : "N/A";
    const avgVelocity = velocities.length > 0 ? Math.round(velocities.reduce((a, b) => a + b, 0) / velocities.length) : 0;
    const top = videosData.sort((a, b) => (b.likes + b.comments) / b.views - (a.likes + a.comments) / a.views)[0];
    videoAnalytics = { avgEngagement, uploadFrequency, viewVelocity: `${avgVelocity.toLocaleString()} views/day`, topPerformer: top ? `${top.title}` : "N/A" };
  }

  let aiInsights = { overview: "Analysis pending...", revenue: "Analysis pending...", performance: "Analysis pending...", monetization: "Analysis pending...", advanced: "Analysis pending..." };
  if (withAi) {
    try {
      const prompt = `Act as a Senior YouTube Strategist. Analyze this channel: Name: ${channel.snippet.title}, Subs: ${subscribers}, Views: ${totalViews}, Niche: ${activeNiche}, Region: ${userLocation}. Provide strategic growth hacks.
      Use EXACT markers: OVERVIEW_START, OVERVIEW_END, REVENUE_START, REVENUE_END, PERFORMANCE_START, PERFORMANCE_END, MONETIZATION_START, MONETIZATION_END, ADVANCED_START, ADVANCED_END.`;

      const rawAiResponse = await main(prompt) || "";
      const extract = (start, end) => {
        const regex = new RegExp(`${start}([\\s\\S]*?)${end}`);
        const match = rawAiResponse.match(regex);
        return match ? match[1].trim() : "Details are being processed...";
      };
      aiInsights = {
        overview: extract("OVERVIEW_START", "OVERVIEW_END"),
        revenue: extract("REVENUE_START", "REVENUE_END"),
        performance: extract("PERFORMANCE_START", "PERFORMANCE_END"),
        monetization: extract("MONETIZATION_START", "MONETIZATION_END"),
        advanced: extract("ADVANCED_START", "ADVANCED_END"),
      };
    } catch (aiErr) {
      console.error("AI Error:", aiErr.message);
    }
  }

  return {
    aiAnalysis: aiInsights,
    channelName: channel.snippet.title,
    channelId, subscribers, totalViews, videoCount, country, channelImage, bannerImage, creationDate,
    estimatedRevenue: legacyEstimatedRevenue,
    revenueEstimates,
    avgMonthlyViews: Math.round(avgMonthlyViews),
    avgMonthlyRevenue: `$${avgMonthlyRevenue}`,
    estimatedWatchTime, shortsRatio, videoAnalytics,
    notes: [
      "Lifetime revenue calculated with a 60% monetization factor for realism.",
      "Estimates vary based on selected Niche and Audience Region.",
      "Data includes historical view performance since channel creation.",
    ],
    detectedNiche: activeNiche,
    detectedLocation: userLocation !== "auto" ? userLocation : country,
  };
}
