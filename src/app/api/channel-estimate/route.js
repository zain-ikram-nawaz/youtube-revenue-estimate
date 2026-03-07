import axios from "axios";
import { main } from "../../hooks/aiAnalysis"

// --- Config ---
const CORS_ORIGIN = process.env.NEXT_PUBLIC_CORS_ORIGIN || "*";

// --- Headers ---
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": CORS_ORIGIN,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function securityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=()",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Content-Security-Policy": "default-src 'self'; img-src *; media-src *; frame-ancestors 'none';",
  };
}

function finalHeaders() {
  return { ...corsHeaders(), ...securityHeaders() };
}

// --- Enhanced Helper Functions ---
function extractChannelId(url) {
  const matchId = url.match(/channel\/([a-zA-Z0-9_-]+)/);
  if (matchId) return matchId[1];
  const matchHandle = url.match(/youtube\.com\/@([a-zA-Z0-9._-]+)/);
  if (matchHandle) return matchHandle[1];
  return null;
}

function extractVideoId(url) {
  const patterns = [
    /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/,
    /youtu\.be\/([0-9A-Za-z_-]{11})/,
    /youtube\.com\/embed\/([0-9A-Za-z_-]{11})/,
    /youtube\.com\/watch\?v=([0-9A-Za-z_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// New function to search channel by name
async function searchChannelByName(channelName) {
  try {
    const cleanName = channelName.replace('@', '').trim();

    const searchRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(cleanName)}&maxResults=5&key=${process.env.YOUTUBE_API_KEY}`
    );

    if (searchRes.data?.items?.length > 0) {
      return searchRes.data.items[0].snippet.channelId;
    }

    return null;
  } catch (error) {
    console.error('Channel search error:', error);
    return null;
  }
}

// Function to determine input type
function determineInputType(input) {
  if (!input) return 'invalid';

  // Check if it's a video URL
  if (extractVideoId(input)) return 'video';

  // Check if it's a channel URL
  if (input.includes('youtube.com') || input.includes('youtu.be')) {
    if (extractChannelId(input)) return 'channel_url';
    return 'invalid';
  }

  // If it's just text, assume it's a channel name
  return 'channel_name';
}

// --- Main API Handler ---
export async function POST(req) {
  try {
    const body = await req.json();
    const { channelUrl } = body;

    if (!channelUrl?.trim()) {
      return new Response(JSON.stringify({ error: "Please provide a YouTube channel URL, video URL, or channel name" }), {
        status: 400,
        headers: finalHeaders(),
      });
    }

    const inputType = determineInputType(channelUrl.trim());

    // --- Case 1: VIDEO URL ---
    if (inputType === 'video') {
      const videoId = extractVideoId(channelUrl);

      const videoRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
      );

      const video = videoRes.data?.items?.[0];
      if (!video) {
        return new Response(JSON.stringify({
          error: "Video not found. This tool is designed for channel analysis. Please provide a channel URL or name instead."
        }), {
          status: 404,
          headers: finalHeaders(),
        });
      }

      // Get channel data from video
      const channelId = video.snippet.channelId;

      // Redirect to channel analysis with a note about the video
      const channelRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
      );

      const channel = channelRes.data?.items?.[0];
      if (!channel) {
        return new Response(JSON.stringify({ error: "Channel not found" }), {
          status: 404,
          headers: finalHeaders(),
        });
      }

      // Continue with channel analysis but include video info
      const videoInfo = {
        title: video.snippet.title,
        views: parseInt(video.statistics.viewCount || 0).toLocaleString(),
        likes: video.statistics.likeCount || "N/A",
        publishedAt: video.snippet.publishedAt,
      };

      // Process channel data (same as channel analysis)
      const result = await processChannelData(channel, channelId);

      return new Response(JSON.stringify({
        ...result,
        inputType: 'video_redirected',
        videoInfo,
        message: `Analyzed the channel "${channel.snippet.title}" from the video "${video.snippet.title}"`
      }), {
        status: 200,
        headers: finalHeaders(),
      });
    }

    // --- Case 2: CHANNEL URL or CHANNEL NAME ---
    let channelId = null;

    if (inputType === 'channel_url') {
      const channelIdentifier = extractChannelId(channelUrl);

      if (channelUrl.includes("@")) {
        const handleRes = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${channelIdentifier}&key=${process.env.YOUTUBE_API_KEY}`
        );
        if (handleRes.data?.items?.length > 0) {
          channelId = handleRes.data.items[0].id;
        }
      } else {
        channelId = channelIdentifier;
      }
    } else if (inputType === 'channel_name') {
      channelId = await searchChannelByName(channelUrl);
    }

    if (!channelId) {
      return new Response(JSON.stringify({
        error: `Channel not found. Please check the ${inputType === 'channel_name' ? 'channel name' : 'URL'} and try again.`,
        suggestions: [
          "Try searching with the exact channel name",
          "Use the channel's @handle (e.g., @channelname)",
          "Copy the full YouTube channel URL"
        ]
      }), {
        status: 404,
        headers: finalHeaders(),
      });
    }

    const channelRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const channel = channelRes.data?.items?.[0];
    if (!channel) {
      return new Response(JSON.stringify({ error: "Channel not found" }), {
        status: 404,
        headers: finalHeaders(),
      });
    }

    const result = await processChannelData(channel, channelId);

    return new Response(JSON.stringify({
      ...result,
      inputType,
      message: inputType === 'channel_name' ? `Found and analyzed "${channel.snippet.title}"` : undefined
    }), {
      status: 200,
      headers: finalHeaders(),
    });

  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);

    // Better error messages
    if (error.response?.status === 403) {
      return new Response(JSON.stringify({
        error: "API quota exceeded. Please try again later."
      }), {
        status: 503,
        headers: finalHeaders(),
      });
    }

    return new Response(JSON.stringify({
      error: "Something went wrong. Please try again."
    }), {
      status: 500,
      headers: finalHeaders(),
    });
  }
}

// --- Channel Data Processing Function ---
async function processChannelData(channel, channelId) {
  const totalViews = parseInt(channel.statistics.viewCount || 0);
  const subscribers = parseInt(channel.statistics.subscriberCount || 0);
  const videoCount = parseInt(channel.statistics.videoCount || 0);
  const creationDate = channel.snippet.publishedAt;
  const country = channel.brandingSettings?.channel?.country || "N/A";
  const categoryId = channel.snippet.categoryId || null;
  const channelImage = channel.snippet.thumbnails?.high?.url || null;
  const bannerImage = channel.brandingSettings?.image?.bannerExternalUrl || null;

  // Revenue calculations (same as before)
  const legacyEstimatedRevenue = ((totalViews / 1000) * 1.5).toFixed(2);
  const countryRPM = {
    US: 4.0, GB: 3.5, UK: 3.5, CA: 3.0, IN: 0.5, PK: 0.3, default: 0.8,
  };
  const countryFactor = (country && countryRPM[country]) ? countryRPM[country] : countryRPM.default;

  const categoryFactors = {
    1: 1.0, 2: 0.7, 10: 0.8, 20: 1.0, 22: 1.2, 24: 1.5, 26: 2.0, 27: 2.5, 28: 3.0,
  };
  const catNum = categoryId ? Number(categoryId) : null;
  const categoryFactor = catNum ? (categoryFactors[catNum] || 1.0) : 1.0;

  const rpmBrackets = {
    "$0.01 (low short RPM)": 0.01,
    "$0.05 (typical short RPM)": 0.05,
    "$0.08 (high short RPM)": 0.08,
    "$0.10 (very low)": 0.10,
    "$0.75 (music)": 0.75,
    "$1.00 (entertainment/pets)": 1.00,
    "$2.50 (gaming)": 2.50,
    "$3.50 (blogs/how-to)": 3.50,
    "$5.00 (education)": 5.00,
    "$8.00 (finance lower)": 8.00,
    "$20.00 (finance upper)": 20.00,
  };

  const revenueEstimates = {};
  for (const [label, rpm] of Object.entries(rpmBrackets)) {
    const adjustedRpm = rpm * countryFactor * categoryFactor;
    const revenue = ((totalViews / 1000) * adjustedRpm).toFixed(2);
    revenueEstimates[label] = `$${revenue}`;
  }

  const monthsSinceCreation = (new Date() - new Date(creationDate)) / (1000 * 60 * 60 * 24 * 30);
  const avgMonthlyViews = monthsSinceCreation > 0 ? totalViews / monthsSinceCreation : 0;
  const avgMonthlyRevenue = ((avgMonthlyViews / 1000) * 2 * countryFactor * categoryFactor).toFixed(2);

  // Fetch and analyze videos (same as before)
  const searchRes = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${channelId}&part=id,snippet&maxResults=50&order=date&type=video`
  );

  const searchItems = searchRes.data?.items || [];
  const videoIds = searchItems.map((v) => v.id.videoId).filter(Boolean).join(",");

  let shortsRatio = null;
  let videoAnalytics = null;
  let estimatedWatchTime = null;

  if (videoIds && videoIds.length > 0) {
    const videosRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,statistics,snippet`
    );

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

      if (totalSec > 0 && totalSec < 60) shortsCount++;
      else longCount++;
      if (views > 0) engagementRatios.push((likes + comments) / views);
      const daysSince = (Date.now() - published) / (1000 * 60 * 60 * 24);
      if (daysSince > 0) velocities.push(views / daysSince);
      return { title: v.snippet.title, views, likes, comments };
    });

    if (totalViewsAll > 0) {
      const avgViewDuration = (totalWatchSec / totalViewsAll / 60).toFixed(1);
      const totalWatchTimeHours = (totalWatchSec / 3600).toFixed(1);
      estimatedWatchTime = {
        avgViewDuration: `${avgViewDuration} min`,
        totalWatchTimeHours: `${totalWatchTimeHours} hours`,
      };
    }

    const totalChecked = shortsCount + longCount;
    if (totalChecked > 0) {
      shortsRatio = {
        shortsCount,
        longCount,
        shortsPercent: ((shortsCount / totalChecked) * 100).toFixed(1) + "%",
        longsPercent: ((longCount / totalChecked) * 100).toFixed(1) + "%",
      };
    }

    const avgEngagement = engagementRatios?.length > 0
      ? (100 * engagementRatios.reduce((a, b) => a + b, 0) / engagementRatios?.length).toFixed(1) + "%"
      : "N/A";

    const dates = searchItems.map((v) => new Date(v.snippet.publishedAt)).sort((a, b) => b - a);
    const gaps = [];
    for (let i = 1; i < dates?.length; i++) {
      gaps.push((dates[i - 1] - dates[i]) / (1000 * 60 * 60 * 24));
    }
    const avgGap = gaps.length > 0 ? gaps.reduce((a, b) => a + b, 0) / gaps.length : 0;
    const uploadFrequency = avgGap > 0 ? `${Math.round(30 / avgGap)} videos/month` : "N/A";

    const avgVelocity = velocities.length > 0
      ? Math.round(velocities.reduce((a, b) => a + b, 0) / velocities.length)
      : 0;
    const viewVelocity = `${avgVelocity.toLocaleString()} views/day`;

    const top = videosData.sort((a, b) => (b.likes + b.comments) / b.views - (a.likes + a.comments) / a.views)[0];
    const topPerformer = top
      ? `${top.title} (${top.views.toLocaleString()} views, ${((100 * (top.likes + top.comments)) / top.views).toFixed(1)}% engagement)`
      : "N/A";

    videoAnalytics = { avgEngagement, uploadFrequency, viewVelocity, topPerformer };
  }

  // AI Analysis (same as before)
  let aiInsights = {
    overview: "Analysis pending...",
    revenue: "Analysis pending...",
    performance: "Analysis pending...",
    monetization: "Analysis pending...",
    advanced: "Analysis pending..."
  };

  try {
    const prompt = `
      Act as a Senior YouTube Strategist at a top MCN.
      CRITICAL: Do NOT give generic advice like "be consistent" or "engage with audience."
      Use the SPECIFIC numbers provided below to identify 1 hidden failure and 1 growth hack.

      [CHANNEL DATA]:
      - Name: ${channel.snippet.title}
      - Scale: ${subscribers} subs / ${totalViews} total views
      - Velocity: ${Math.round(avgMonthlyViews)} views per month
      - Engagement: ${videoAnalytics?.avgEngagement || "N/A"}
      - Format Mix: ${shortsRatio?.shortsPercent}% Shorts vs ${shortsRatio?.longsPercent}% Long
      - Market: ${country} region (RPM focus)

      Provide analysis in this STRICT format:

      OVERVIEW_START
      DATA_OBSERVATION: [Mention a specific number from the data]
      THE_PROBLEM: [Why this number is bad for a channel of ${subscribers} subs]
      THE_FIX: [1 specific technical change to the channel]
      OVERVIEW_END

      REVENUE_START
      [Analyze how ${country} audience impacts their $${avgMonthlyRevenue}/mo revenue and suggest 1 specific sponsorship niche for ${channel.snippet.title}]
      REVENUE_END

      PERFORMANCE_START
      [Analyze the ${videoAnalytics?.viewVelocity} velocity. Is it lagging? If yes, give a thumbnail or title hook strategy]
      PERFORMANCE_END

      MONETIZATION_START
      [Based on ${subscribers} subs, give 1 revenue source that is NOT Adsense or Merch]
      MONETIZATION_END

      ADVANCED_START
      [Verdict: Should they stick to ${shortsRatio?.shortsPercent}% Shorts or pivot? Why?]
      ADVANCED_END
    `;

    const rawAiResponse = await main(prompt) || "";

    const extract = (start, end) => {
      const regex = new RegExp(`${start}\\s*([\\s\\S]*?)\\s*${end}`);
      const match = rawAiResponse.match(regex);
      return match ? match[1].trim() : "Analysis pending for this section.";
    };

    aiInsights = {
      overview: extract("OVERVIEW_START", "OVERVIEW_END"),
      revenue: extract("REVENUE_START", "REVENUE_END"),
      performance: extract("PERFORMANCE_START", "PERFORMANCE_END"),
      monetization: extract("MONETIZATION_START", "MONETIZATION_END"),
      advanced: extract("ADVANCED_START", "ADVANCED_END"),
    };

  } catch (aiErr) {
    console.error("AI Analysis Error:", aiErr.message);
  }

  return {
    aiAnalysis: aiInsights,
    channelName: channel.snippet.title,
    channelId,
    subscribers,
    totalViews,
    videoCount,
    country,
    channelImage,
    bannerImage,
    creationDate,
    estimatedRevenue: `$${legacyEstimatedRevenue} (lifetime approx)`,
    revenueEstimates,
    avgMonthlyViews: Math.round(avgMonthlyViews),
    avgMonthlyRevenue: `$${avgMonthlyRevenue} (approx)`,
    estimatedWatchTime,
    shortsRatio,
    videoAnalytics,
    notes: [
      "estimatedRevenue is a simple legacy lifetime estimate (fixed RPM = $1.5).",
      "revenueEstimates show RPM brackets adjusted by country & category.",
      "estimatedWatchTime is based on recent 50 videos (approx 60% retention).",
      "videoAnalytics includes avgEngagement, uploadFrequency, and topPerformer.",
    ],
  };
}

export async function OPTIONS() {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: finalHeaders(),
  });
}