"use client";

import { useState } from "react";

const NICHES = [
  ["default", "General / Mixed"],
  ["finance", "Finance & Business"],
  ["tech", "Technology / AI"],
  ["education", "Education / How-to"],
  ["lifestyle", "Lifestyle / Vlogs"],
  ["entertainment", "Entertainment"],
  ["gaming", "Gaming"],
  ["kids", "Kids Content"],
];

export default function TikTokCalculator() {
  const [followers, setFollowers] = useState("");
  const [avgViews, setAvgViews] = useState("");
  const [niche, setNiche] = useState("default");
  const [postsPerMonth, setPostsPerMonth] = useState("12");
  const [sponsoredPostsPerMonth, setSponsoredPostsPerMonth] = useState("2");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!followers || !avgViews) {
      setError("Please enter your followers and average views per video.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/tiktok-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          followers: Number(followers),
          avgViews: Number(avgViews),
          niche,
          postsPerMonth: Number(postsPerMonth),
          sponsoredPostsPerMonth: Number(sponsoredPostsPerMonth),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to estimate earnings");
      setResult(json);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="relative overflow-hidden bg-ink border border-white/10 rounded-3xl p-5 md:p-8 shadow-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(224,32,26,0.22),transparent)]" />
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div>
              <h2 className="font-display text-lg md:text-xl font-extrabold text-white">
                TikTok Money Calculator
              </h2>
              <p className="text-sm text-white/50 mt-1">
                Estimate Creator Rewards + sponsorship income
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Followers</label>
                <input type="number" min="0" placeholder="e.g. 50000" value={followers}
                  onChange={(e) => setFollowers(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-white/5 text-white placeholder:text-white/30 border border-white/15 outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Avg Views / Video</label>
                <input type="number" min="0" placeholder="e.g. 20000" value={avgViews}
                  onChange={(e) => setAvgViews(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-white/5 text-white placeholder:text-white/30 border border-white/15 outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Niche</label>
                <select value={niche} onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-white/5 text-white border border-white/15 focus:border-primary outline-none">
                  {NICHES.map(([v, l]) => <option key={v} className="text-foreground" value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Posts / Month</label>
                <input type="number" min="1" value={postsPerMonth} onChange={(e) => setPostsPerMonth(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-white/5 text-white border border-white/15 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Sponsored Posts / Month</label>
                <input type="number" min="0" value={sponsoredPostsPerMonth} onChange={(e) => setSponsoredPostsPerMonth(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-white/5 text-white border border-white/15 focus:border-primary outline-none" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full md:w-auto px-8 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-hover active:scale-95 transition-all disabled:opacity-50">
              {loading ? "Calculating..." : "Estimate My TikTok Earnings"}
            </button>
          </form>

          {error && (
            <div className="relative z-10 mt-6 p-4 rounded-2xl border border-primary/40 bg-primary/10 text-white flex items-start gap-3">
              <span className="text-primary font-black">!</span>
              <p className="text-sm text-white/80 font-medium">{error}</p>
            </div>
          )}
        </div>

        {result && (
          <div className="bg-background border border-border rounded-3xl p-5 md:p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-1">Creator Rewards / mo</p>
                <p className="text-xl font-black text-primary">${result.creatorFundMonthly.toLocaleString()}</p>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-1">Sponsorships / mo</p>
                <p className="text-xl font-black text-primary">${result.sponsorshipMonthly.toLocaleString()}</p>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-1">Creator Tier</p>
                <p className="text-xl font-black text-primary">{result.tier}</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-foreground text-center">
              Estimated total income: <strong className="text-primary">${result.totalMonthly.low.toLocaleString()} – ${result.totalMonthly.high.toLocaleString()}/month</strong>{" "}
              (<strong className="text-primary">${result.totalYearly.low.toLocaleString()} – ${result.totalYearly.high.toLocaleString()}/year</strong>)
            </div>

            <div>
              <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-2">
                Sponsored Post Rate ({result.tier} tier)
              </p>
              <p className="text-sm text-foreground bg-secondary rounded-xl p-4">
                ${result.sponsorshipRatePerPost.low.toLocaleString()} – ${result.sponsorshipRatePerPost.high.toLocaleString()} per sponsored post
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-2">AI Strategy for Your Numbers</p>
              <p className="text-sm text-foreground leading-relaxed bg-secondary rounded-xl p-4">{result.strategy}</p>
            </div>

            <p className="text-[11px] text-muted text-center">
              Estimates only, based on public creator-economy benchmarks — TikTok does not publish official payout data, and actual earnings vary by campaign and region.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
