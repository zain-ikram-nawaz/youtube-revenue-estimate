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

const COUNTRIES = [
  ["US", "United States"],
  ["GB", "United Kingdom"],
  ["CA", "Canada / Australia"],
  ["IN", "India"],
  ["PK", "Pakistan"],
  ["default", "Other / Global Mix"],
];

const MUSIC_OPTIONS = [
  ["none", "No licensed music"],
  ["one_track", "One licensed track"],
  ["multiple_tracks", "Two or more tracks"],
];

export default function ShortsCalculator() {
  const [mode, setMode] = useState("manual"); // manual | url
  const [videoUrl, setVideoUrl] = useState("");
  const [views, setViews] = useState("");
  const [niche, setNiche] = useState("default");
  const [country, setCountry] = useState("US");
  const [music, setMusic] = useState("none");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (mode === "manual" && (!views || Number(views) <= 0)) {
      setError("Please enter your monthly Shorts views.");
      return;
    }
    if (mode === "url" && !videoUrl.trim()) {
      setError("Please paste a Shorts video URL.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/shorts-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoUrl: mode === "url" ? videoUrl.trim() : undefined,
          views: mode === "manual" ? Number(views) : undefined,
          niche,
          country,
          music,
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
                YouTube Shorts Earnings Calculator
              </h2>
              <p className="text-sm text-white/50 mt-1">
                Estimate Shorts revenue by niche, country, and music usage
              </p>
            </div>

            <div className="flex gap-2 p-1 bg-white/5 rounded-full w-fit">
              <button type="button" onClick={() => setMode("manual")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${mode === "manual" ? "bg-primary text-white" : "text-white/60"}`}>
                Enter Views
              </button>
              <button type="button" onClick={() => setMode("url")}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${mode === "url" ? "bg-primary text-white" : "text-white/60"}`}>
                Paste Shorts URL
              </button>
            </div>

            {mode === "manual" ? (
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Monthly Shorts Views</label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 2000000"
                  value={views}
                  onChange={(e) => setViews(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-white/5 text-white placeholder:text-white/30 border border-white/15 outline-none focus:border-primary transition-colors"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Shorts Video URL</label>
                <input
                  type="text"
                  placeholder="https://youtube.com/shorts/..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-white/5 text-white placeholder:text-white/30 border border-white/15 outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Niche</label>
                <select value={niche} onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-white/5 text-white border border-white/15 focus:border-primary outline-none">
                  {NICHES.map(([v, l]) => <option key={v} className="text-foreground" value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Audience Country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-white/5 text-white border border-white/15 focus:border-primary outline-none">
                  {COUNTRIES.map(([v, l]) => <option key={v} className="text-foreground" value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Music</label>
                <select value={music} onChange={(e) => setMusic(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-white/5 text-white border border-white/15 focus:border-primary outline-none">
                  {MUSIC_OPTIONS.map(([v, l]) => <option key={v} className="text-foreground" value={v}>{l}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full md:w-auto px-8 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-hover active:scale-95 transition-all disabled:opacity-50">
              {loading ? "Calculating..." : "Estimate Shorts Earnings"}
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
            {result.videoTitle && (
              <p className="text-xs text-muted">Analyzed: <span className="text-foreground font-semibold">{result.videoTitle}</span> — {result.views.toLocaleString()} views</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-1">Shorts RPM</p>
                <p className="text-xl font-black text-primary">${result.shortsRPM.toFixed(3)}</p>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-1">Estimated Earnings</p>
                <p className="text-xl font-black text-primary">${result.earnings.toLocaleString()}</p>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-1">Per 1M Views</p>
                <p className="text-xl font-black text-primary">${result.earningsPerMillion.toLocaleString()}</p>
              </div>
            </div>

            {result.multiplierVsLongForm && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-foreground">
                The same {result.views.toLocaleString()} views as <strong>long-form</strong> content would earn roughly{" "}
                <strong className="text-primary">${result.longFormEarnings.toLocaleString()}</strong> — about{" "}
                <strong className="text-primary">{result.multiplierVsLongForm}×</strong> more than Shorts ad revenue alone.
              </div>
            )}

            <div>
              <p className="text-[11px] font-bold text-muted uppercase tracking-widest mb-2">AI Strategy for Your Numbers</p>
              <p className="text-sm text-foreground leading-relaxed bg-secondary rounded-xl p-4">{result.strategy}</p>
            </div>

            <p className="text-[11px] text-muted text-center">
              Estimates only. YouTube Shorts revenue comes from a shared ad pool — actual payouts vary month to month.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
