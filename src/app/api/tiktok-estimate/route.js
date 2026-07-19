import { NICHE_FACTORS } from "../../lib/rpmData";
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

// Sponsorship rate per post by follower tier — TikTok has no official ad-revenue
// share program like YouTube, so brand deals are the primary income source.
function sponsorshipRateForFollowers(followers) {
  if (followers < 10_000) return { low: 10, high: 100, tier: "Nano" };
  if (followers < 100_000) return { low: 100, high: 500, tier: "Micro" };
  if (followers < 500_000) return { low: 500, high: 1_500, tier: "Mid-tier" };
  if (followers < 1_000_000) return { low: 1_500, high: 4_000, tier: "Macro" };
  // Mega tier scales roughly linearly with followers beyond 1M.
  const scale = followers / 1_000_000;
  return { low: Math.round(4_000 * scale), high: Math.round(10_000 * scale), tier: "Mega" };
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

export async function POST(req) {
  try {
    const body = await req.json();
    const followers = Number(body.followers) || 0;
    const avgViews = Number(body.avgViews) || 0;
    const niche = body.niche || "default";
    const postsPerMonth = Number(body.postsPerMonth) || 12;
    const sponsoredPostsPerMonth = clamp(Number(body.sponsoredPostsPerMonth) || 2, 0, postsPerMonth);

    if (followers <= 0 || avgViews <= 0) {
      return new Response(JSON.stringify({ error: "Please enter your follower count and average views per video." }), {
        status: 400,
        headers: finalHeaders(),
      });
    }

    const nicheMultiplier = clamp((NICHE_FACTORS[niche] || NICHE_FACTORS.default) / NICHE_FACTORS.default, 0.5, 2.5);
    const creatorFundRPM = 0.03 * nicheMultiplier; // USD per 1,000 views, TikTok Creator Rewards baseline

    const monthlyViews = avgViews * postsPerMonth;
    const creatorFundMonthly = (monthlyViews / 1000) * creatorFundRPM;

    const sponsorship = sponsorshipRateForFollowers(followers);
    const sponsorshipAvgRate = (sponsorship.low + sponsorship.high) / 2;
    const sponsorshipMonthly = sponsorshipAvgRate * sponsoredPostsPerMonth;

    const totalMonthlyLow = creatorFundMonthly * 0.7 + sponsorship.low * sponsoredPostsPerMonth;
    const totalMonthlyHigh = creatorFundMonthly * 1.3 + sponsorship.high * sponsoredPostsPerMonth;

    let strategy = "Analysis pending...";
    try {
      const prompt = `Act as a TikTok creator monetization strategist. A creator has ${followers.toLocaleString()} followers, averages ${avgViews.toLocaleString()} views per video in the "${niche}" niche, posts ${postsPerMonth} times/month, and does ${sponsoredPostsPerMonth} sponsored posts/month. Estimated Creator Rewards income is $${Math.round(creatorFundMonthly)}/month, and estimated sponsorship income is $${Math.round(sponsorshipMonthly)}/month at their "${sponsorship.tier}" tier ($${sponsorship.low}-$${sponsorship.high} per sponsored post). Give a specific, numbers-driven 3-4 sentence strategy for what this creator should do next to grow their income. Do not use generic advice. Reference the actual numbers given.`;
      strategy = await main(prompt);
    } catch (err) {
      console.error("TikTok AI strategy error:", err.message);
    }

    return new Response(JSON.stringify({
      followers,
      avgViews,
      niche,
      postsPerMonth,
      sponsoredPostsPerMonth,
      tier: sponsorship.tier,
      sponsorshipRatePerPost: { low: sponsorship.low, high: sponsorship.high },
      creatorFundMonthly: Math.round(creatorFundMonthly),
      sponsorshipMonthly: Math.round(sponsorshipMonthly),
      totalMonthly: { low: Math.round(totalMonthlyLow), high: Math.round(totalMonthlyHigh) },
      totalYearly: { low: Math.round(totalMonthlyLow * 12), high: Math.round(totalMonthlyHigh * 12) },
      strategy,
    }), { status: 200, headers: finalHeaders() });

  } catch (error) {
    console.error("TikTok estimate error:", error.message);
    return new Response(JSON.stringify({ error: "Something went wrong." }), {
      status: 500,
      headers: finalHeaders(),
    });
  }
}

export async function OPTIONS() {
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: finalHeaders() });
}
