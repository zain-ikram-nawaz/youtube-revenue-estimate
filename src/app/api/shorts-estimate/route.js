import axios from "axios";
import { extractVideoId } from "../../lib/youtubeChannel";
import { NICHE_FACTORS, SHORTS_NICHE_RPM, MUSIC_IMPACT, countryMultiplier, COUNTRY_RPM } from "../../lib/rpmData";
import { main } from "../../hooks/aiAnalysis";

const CORS_ORIGIN = process.env.NEXT_PUBLIC_CORS_ORIGIN || "*";

function finalHeaders() {
  return {
    "Access-Control-Allow-Origin": CORS_ORIGIN,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };
}

async function lookupShortsViews(videoUrl) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) throw { status: 400, message: "Couldn't find a video ID in that URL." };

  const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const video = res.data?.items?.[0];
  if (!video) throw { status: 404, message: "Video not found." };

  return {
    views: parseInt(video.statistics.viewCount || 0),
    title: video.snippet.title,
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { videoUrl, views: manualViews, niche = "default", country = "US", music = "none" } = body;

    let views = Number(manualViews) || 0;
    let videoTitle = null;

    if (videoUrl?.trim()) {
      const looked = await lookupShortsViews(videoUrl.trim());
      views = looked.views;
      videoTitle = looked.title;
    }

    if (!views || views <= 0) {
      return new Response(JSON.stringify({ error: "Please enter a view count or paste a Shorts video URL." }), {
        status: 400,
        headers: finalHeaders(),
      });
    }

    const activeNiche = SHORTS_NICHE_RPM[niche] ? niche : "default";
    const baseShortsRPM = SHORTS_NICHE_RPM[activeNiche];
    const regionMult = countryMultiplier(country);
    const musicMult = MUSIC_IMPACT[music] ?? MUSIC_IMPACT.none;

    const shortsRPM = baseShortsRPM * regionMult * musicMult;
    const shortsRPMNoMusic = baseShortsRPM * regionMult;
    const earnings = (views / 1000) * shortsRPM;
    const earningsPerMillion = (1_000_000 / 1000) * shortsRPM;

    // What the same views would earn as long-form content, for the "Shorts vs long-form" comparison.
    const longFormNicheFactor = NICHE_FACTORS[niche] || NICHE_FACTORS.default;
    const longFormCountryFactor = (COUNTRY_RPM[country] || COUNTRY_RPM.default);
    const longFormRPM = longFormNicheFactor * (longFormCountryFactor / COUNTRY_RPM.US) * 0.55;
    const longFormEarnings = (views / 1000) * longFormRPM * 0.6;

    let strategy = "Analysis pending...";
    try {
      const prompt = `Act as a YouTube Shorts monetization strategist. A creator has ${views.toLocaleString()} Shorts views in the "${niche}" niche, audience mostly in ${country}, ${music === "none" ? "no licensed music" : music === "one_track" ? "one licensed music track" : "multiple licensed music tracks"}. Estimated Shorts RPM is $${shortsRPM.toFixed(3)} per 1,000 views, versus an estimated $${longFormRPM.toFixed(2)} long-form RPM for the same niche/region. Give a specific, numbers-driven 3-4 sentence strategy for what this creator should do next to increase earnings. Do not use generic advice like "stay consistent". Reference the actual numbers given.`;
      strategy = await main(prompt);
    } catch (err) {
      console.error("Shorts AI strategy error:", err.message);
    }

    return new Response(JSON.stringify({
      views,
      videoTitle,
      niche: activeNiche,
      country,
      music,
      shortsRPM: Number(shortsRPM.toFixed(4)),
      shortsRPMNoMusic: Number(shortsRPMNoMusic.toFixed(4)),
      earnings: Math.round(earnings),
      earningsPerMillion: Math.round(earningsPerMillion),
      longFormRPM: Number(longFormRPM.toFixed(2)),
      longFormEarnings: Math.round(longFormEarnings),
      multiplierVsLongForm: longFormEarnings > 0 ? Math.round(longFormEarnings / Math.max(earnings, 0.01)) : null,
      strategy,
    }), { status: 200, headers: finalHeaders() });

  } catch (error) {
    const status = error.status || 500;
    if (status === 500) console.error("Shorts estimate error:", error.response?.data || error.message || error);
    return new Response(JSON.stringify({ error: error.message || "Something went wrong." }), {
      status,
      headers: finalHeaders(),
    });
  }
}

export async function OPTIONS() {
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: finalHeaders() });
}
