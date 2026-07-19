import {
  resolveChannelId,
  fetchChannel,
  processChannelData,
} from "../../lib/youtubeChannel";

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

// --- Main API Handler ---
export async function POST(req) {
  try {
    const body = await req.json();
    const { channelUrl, niche: userNiche, location: userLocation } = body;

    if (!channelUrl?.trim()) {
      return new Response(JSON.stringify({ error: "Please provide a YouTube channel URL, video URL, or channel name" }), {
        status: 400,
        headers: finalHeaders(),
      });
    }

    let resolved;
    try {
      resolved = await resolveChannelId(channelUrl);
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || "Channel not found" }), {
        status: err.status || 404,
        headers: finalHeaders(),
      });
    }

    const { channelId, inputType, videoInfo } = resolved;

    let channel;
    try {
      channel = await fetchChannel(channelId);
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || "Channel not found" }), {
        status: err.status || 404,
        headers: finalHeaders(),
      });
    }

    const result = await processChannelData(channel, channelId, userNiche, userLocation);

    if (inputType === "video_redirected") {
      return new Response(JSON.stringify({
        ...result,
        inputType,
        videoInfo,
        message: `Analyzed from video: "${videoInfo.title}"`,
      }), {
        status: 200,
        headers: finalHeaders(),
      });
    }

    return new Response(JSON.stringify({
      ...result,
      inputType,
      message: inputType === "channel_name" ? `Found "${channel.snippet.title}"` : undefined,
    }), {
      status: 200,
      headers: finalHeaders(),
    });

  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
      headers: finalHeaders(),
    });
  }
}

export async function OPTIONS() {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: finalHeaders(),
  });
}
