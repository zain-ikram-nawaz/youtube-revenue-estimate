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
    "Content-Security-Policy":
      "default-src 'self'; img-src *; media-src *; frame-ancestors 'none';",
  };
}
function finalHeaders() {
  return { ...corsHeaders(), ...securityHeaders() };
}

// --- Helpers ---
function extractChannelId(url) {
  const matchId = url.match(/channel\/([a-zA-Z0-9_-]+)/);
  if (matchId) return matchId[1];
  const matchHandle = url.match(/youtube\.com\/@([a-zA-Z0-9._-]+)/);
  if (matchHandle) return matchHandle[1];
  return null;
}
function extractVideoId(url) {
  const match = url.match(
    /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/
  );
  return match ? match[1] : null;
}

// --- Main API Handler ---
export async function POST(req) {
  try {
    const body = await req.json();
    const { channelUrl } = body;

    // --- Case 1: If it's a VIDEO URL ---
    const videoId = extractVideoId(channelUrl);
    if (videoId) {
      const videoRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
      );
      const video = videoRes.data?.items?.[0]; // Added optional chaining
      if (!video)
        return new Response(JSON.stringify({ error: "Video not found" }), {
          status: 404,
          headers: finalHeaders(),
        });

      // --- Duration in seconds ---
      const match = video.contentDetails.duration.match(
        /PT(?:(\d+)M)?(?:(\d+)S)?/
      );
      const minutes = parseInt(match?.[1] || 0);
      const seconds = parseInt(match?.[2] || 0);
      const durationSec = minutes * 60 + seconds;
      const durationMin = (durationSec / 60).toFixed(2);

      // --- Watch Time (approx) ---
      const views = parseInt(video.statistics.viewCount || 0);
      const avgViewDuration = durationMin * 0.6; // assume 60% average watch
      const totalWatchTimeHours = ((views * avgViewDuration) / 60).toFixed(2);

      const videoData = {
        videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        tags: video.snippet.tags || [],
        duration: `${minutes}m ${seconds}s`,
        views: views.toLocaleString(),
        likes: video.statistics.likeCount || "N/A",
        comments: video.statistics.commentCount || "N/A",
        estimatedWatchTime: {
          avgViewDuration: `${avgViewDuration.toFixed(1)} min`,
          totalWatchTimeHours: `${totalWatchTimeHours} hours`,
        },
      };

      return new Response(JSON.stringify(videoData), {
        status: 200,
        headers: finalHeaders(),
      });
    }

    // --- Case 2: CHANNEL URL ---
    const channelIdentifier = extractChannelId(channelUrl);
    if (!channelIdentifier)
      return new Response(JSON.stringify({ error: "Invalid channel URL" }), {
        status: 400,
        headers: finalHeaders(),
      });

    let channelId = null;
    if (channelUrl.includes("@")) {
      const handleRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${channelIdentifier}&key=${process.env.YOUTUBE_API_KEY}`
      );
      if (handleRes.data?.items?.length > 0) // Added optional chaining
        channelId = handleRes.data.items[0].id;
    } else {
      channelId = channelIdentifier;
    }
    if (!channelId)
      return new Response(JSON.stringify({ error: "Channel not found" }), {
        status: 404,
        headers: finalHeaders(),
      });

    const ytRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const channel = ytRes.data?.items?.[0]; // Added optional chaining
    if (!channel)
      return new Response(JSON.stringify({ error: "Channel not found" }), {
        status: 404,
        headers: finalHeaders(),
      });

    const totalViews = parseInt(channel.statistics.viewCount || 0);
    const subscribers = parseInt(channel.statistics.subscriberCount || 0);
    const videoCount = parseInt(channel.statistics.videoCount || 0);
    const creationDate = channel.snippet.publishedAt;
    const country = channel.brandingSettings?.channel?.country || "N/A";
    const categoryId = channel.snippet.categoryId || null;
    const channelImage = channel.snippet.thumbnails?.high?.url || null;
    const bannerImage =
      channel.brandingSettings?.image?.bannerExternalUrl || null;

    // --- Revenue Estimation ---
    const legacyEstimatedRevenue = ((totalViews / 1000) * 1.5).toFixed(2);
    const countryRPM = {
      US: 4.0,
      GB: 3.5,
      UK: 3.5,
      CA: 3.0,
      IN: 0.5,
      PK: 0.3,
      default: 0.8,
    };
    const countryFactor =
      (country && countryRPM[country]) ? countryRPM[country] : countryRPM.default;

    const categoryFactors = {
      1: 1.0,
      2: 0.7,
      10: 0.8,
      20: 1.0,
      22: 1.2,
      24: 1.5,
      26: 2.0,
      27: 2.5,
      28: 3.0,
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

    const monthsSinceCreation =
      (new Date() - new Date(creationDate)) / (1000 * 60 * 60 * 24 * 30);
    const avgMonthlyViews =
      monthsSinceCreation > 0 ? totalViews / monthsSinceCreation : 0;
    const avgMonthlyRevenue = (
      (avgMonthlyViews / 1000) * 2 * countryFactor * categoryFactor
    ).toFixed(2);

    // --- Fetch videos ---
    const searchRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${channelId}&part=id,snippet&maxResults=50&order=date&type=video`
    );

    // FIX: Guarded against undefined items
    const searchItems = searchRes.data?.items || [];
    const videoIds = searchItems.map((v) => v.id.videoId).filter(Boolean).join(",");

    let shortsRatio = null;
    let videoAnalytics = null;
    let estimatedWatchTime = null;

    // FIX: Guarded against empty videoIds
    if (videoIds && videoIds.length > 0) {
      const videosRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,statistics,snippet`
      );

      const videosDataItems = videosRes.data?.items || [];

      let shortsCount = 0,
        longCount = 0,
        engagementRatios = [],
        velocities = [],
        totalWatchSec = 0,
        totalViewsAll = 0;

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
        totalWatchSec += totalSec * views * 0.6; // 60% retention

        if (totalSec > 0 && totalSec < 60) shortsCount++;
        else longCount++;
        if (views > 0) engagementRatios.push((likes + comments) / views);
        const daysSince = (Date.now() - published) / (1000 * 60 * 60 * 24);
        if (daysSince > 0) velocities.push(views / daysSince);
        return { title: v.snippet.title, views, likes, comments };
      });

      // --- WatchTime ---
      if (totalViewsAll > 0) {
        const avgViewDuration = (totalWatchSec / totalViewsAll / 60).toFixed(1);
        const totalWatchTimeHours = (totalWatchSec / 3600).toFixed(1);
        estimatedWatchTime = {
          avgViewDuration: `${avgViewDuration} min`,
          totalWatchTimeHours: `${totalWatchTimeHours} hours`,
        };
      }

      const totalChecked = shortsCount + longCount;
      if (totalChecked > 0)
        shortsRatio = {
          shortsCount,
          longCount,
          shortsPercent: ((shortsCount / totalChecked) * 100).toFixed(1) + "%",
          longsPercent: ((longCount / totalChecked) * 100).toFixed(1) + "%",
        };

      const avgEngagement =
        engagementRatios?.length > 0
          ? (
              100 *
              engagementRatios.reduce((a, b) => a + b, 0) /
              engagementRatios?.length
            ).toFixed(1) + "%"
          : "N/A";

      const dates = searchItems
        .map((v) => new Date(v.snippet.publishedAt))
        .sort((a, b) => b - a);
      const gaps = [];
      for (let i = 1; i < dates?.length; i++)
        gaps.push((dates[i - 1] - dates[i]) / (1000 * 60 * 60 * 24));
      const avgGap =
        gaps.length > 0 ? gaps.reduce((a, b) => a + b, 0) / gaps.length : 0;
      const uploadFrequency =
        avgGap > 0 ? `${Math.round(30 / avgGap)} videos/month` : "N/A";

      const avgVelocity =
        velocities.length > 0
          ? Math.round(velocities.reduce((a, b) => a + b, 0) / velocities.length)
          : 0;
      const viewVelocity = `${avgVelocity.toLocaleString()} views/day`;

      const top = videosData.sort(
        (a, b) =>
          (b.likes + b.comments) / b.views - (a.likes + a.comments) / a.views
      )[0];
      const topPerformer = top
        ? `${top.title} (${top.views.toLocaleString()} views, ${(
            (100 * (top.likes + top.comments)) /
            top.views
          ).toFixed(1)}% engagement)`
        : "N/A";

      videoAnalytics = {
        avgEngagement,
        uploadFrequency,
        viewVelocity,
        topPerformer,
      };
    }


let aiInsights = {
      overview: "Analysis pending...",
      revenue: "Analysis pending...",
      performance: "Analysis pending...",
      monetization: "Analysis pending...",
      advanced: "Analysis pending..."
    };
    let aiSummary = "AI is processing..."; // Backup variable

try {
  const channelContext = `
    Channel: ${channel.snippet.title}
    Stats: ${subscribers} subs, ${totalViews} total views, ${videoCount} videos.
    Performance: ${Math.round(avgMonthlyViews)} views/month, ${videoAnalytics?.avgEngagement || "N/A"} engagement.
    Activity: ${videoAnalytics?.uploadFrequency || "N/A"}, View Velocity: ${videoAnalytics?.viewVelocity || "N/A"}.
    Content Mix: ${shortsRatio?.shortsPercent || "0"}% Shorts, ${shortsRatio?.longsPercent || "0"}% Long-form.
    Estimated RPM/Revenue: $${avgMonthlyRevenue}/mo based on ${country} region.
  `;

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

  // --- Safe Parsing Helper ---
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
  aiSummary = "AI is currently analyzing. Please refresh in a moment.";
}



    return new Response(
      JSON.stringify({
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
      }),
      { status: 200, headers: finalHeaders() }
    );
  } catch (error) {
    console.error(error.response?.data || error.message);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500, headers: finalHeaders() }
    );
  }
}

// --- Preflight OPTIONS handler ---
export async function OPTIONS() {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: finalHeaders(),
  });
}