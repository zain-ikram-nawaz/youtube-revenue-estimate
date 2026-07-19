import axios from "axios";
import { extractVideoId } from "../../lib/youtubeChannel";
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

export async function POST(req) {
  try {
    const body = await req.json();
    const videoUrl = body.videoUrl?.trim();

    if (!videoUrl) {
      return new Response(JSON.stringify({ error: "Please paste a YouTube video URL." }), {
        status: 400,
        headers: finalHeaders(),
      });
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return new Response(JSON.stringify({ error: "Couldn't find a video ID in that URL." }), {
        status: 400,
        headers: finalHeaders(),
      });
    }

    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const video = res.data?.items?.[0];
    if (!video) {
      return new Response(JSON.stringify({ error: "Video not found." }), {
        status: 404,
        headers: finalHeaders(),
      });
    }

    const tags = video.snippet.tags || [];
    const title = video.snippet.title;
    const description = video.snippet.description || "";
    const categoryId = video.snippet.categoryId;

    let aiSuggestions = [];
    try {
      const prompt = `A YouTube video titled "${title}" has these existing tags: ${tags.length ? tags.join(", ") : "none set"}. Description excerpt: "${description.slice(0, 500)}". Suggest exactly 15 additional SEO-friendly YouTube tags/keywords this video should use to improve discoverability, ranked by relevance. Return ONLY a comma-separated list, no numbering, no explanation.`;
      const raw = await main(prompt);
      aiSuggestions = raw
        .split(",")
        .map((t) => t.trim().replace(/^["'\d.\-\s]+|["'\s]+$/g, ""))
        .filter((t) => t.length > 1 && t.length < 60)
        .slice(0, 15);
    } catch (err) {
      console.error("Tag extractor AI error:", err.message);
    }

    return new Response(JSON.stringify({
      videoId,
      title,
      views: video.statistics?.viewCount ? parseInt(video.statistics.viewCount) : null,
      categoryId,
      tags,
      tagCount: tags.length,
      aiSuggestions,
    }), { status: 200, headers: finalHeaders() });

  } catch (error) {
    console.error("Tag extractor error:", error.response?.data || error.message);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
      headers: finalHeaders(),
    });
  }
}

export async function OPTIONS() {
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: finalHeaders() });
}
