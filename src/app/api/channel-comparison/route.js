import { resolveChannelId, fetchChannel, processChannelData } from "../../lib/youtubeChannel";

const CORS_ORIGIN = process.env.NEXT_PUBLIC_CORS_ORIGIN || "*";

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

async function resolveAndAnalyze(rawInput, niche, location) {
  const { channelId } = await resolveChannelId(rawInput);
  const channel = await fetchChannel(channelId);
  // Skip the Groq call here — a head-to-head comparison doesn't need two
  // full AI strategy essays, just the numbers. Keeps the response fast and cheap.
  return processChannelData(channel, channelId, niche, location, { withAi: false });
}

function parseMoney(str) {
  return Number(String(str).replace(/[^0-9.-]/g, "")) || 0;
}

function buildComparison(a, b) {
  const metrics = [
    { key: "subscribers", label: "Subscribers", a: a.subscribers, b: b.subscribers },
    { key: "totalViews", label: "Total Views", a: a.totalViews, b: b.totalViews },
    { key: "videoCount", label: "Video Count", a: a.videoCount, b: b.videoCount },
    { key: "estimatedRevenue", label: "Lifetime Revenue (est.)", a: parseMoney(a.estimatedRevenue), b: parseMoney(b.estimatedRevenue) },
    { key: "avgMonthlyRevenue", label: "Monthly Revenue (est.)", a: parseMoney(a.avgMonthlyRevenue), b: parseMoney(b.avgMonthlyRevenue) },
    { key: "avgMonthlyViews", label: "Avg Monthly Views", a: a.avgMonthlyViews, b: b.avgMonthlyViews },
  ];

  let winsA = 0, winsB = 0;
  const rows = metrics.map((m) => {
    const winner = m.a === m.b ? "tie" : m.a > m.b ? "a" : "b";
    if (winner === "a") winsA++;
    if (winner === "b") winsB++;
    return { ...m, winner };
  });

  return {
    rows,
    overallWinner: winsA === winsB ? "tie" : winsA > winsB ? "a" : "b",
    winsA,
    winsB,
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { channelA, channelB, niche, location } = body;

    if (!channelA?.trim() || !channelB?.trim()) {
      return new Response(JSON.stringify({ error: "Please provide two YouTube channels to compare." }), {
        status: 400,
        headers: finalHeaders(),
      });
    }

    const [resultA, resultB] = await Promise.all([
      resolveAndAnalyze(channelA, niche, location),
      resolveAndAnalyze(channelB, niche, location),
    ]);

    return new Response(JSON.stringify({
      channelA: resultA,
      channelB: resultB,
      comparison: buildComparison(resultA, resultB),
    }), {
      status: 200,
      headers: finalHeaders(),
    });
  } catch (error) {
    const status = error.status || 500;
    const message = status === 500 ? "Something went wrong." : error.message;
    if (status === 500) console.error("Channel comparison error:", error.response?.data || error.message || error);
    return new Response(JSON.stringify({ error: message }), {
      status,
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
