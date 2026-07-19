"use client";

import { useState } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";

function Stat({ label, a, b, winner, format }) {
  const fmt = (v) => (format ? format(v) : v.toLocaleString());
  return (
    <div className="grid grid-cols-3 items-center gap-2 py-3 border-b border-border last:border-b-0">
      <div className={`text-sm font-bold text-right ${winner === "a" ? "text-primary" : "text-foreground"}`}>
        {fmt(a)}
        {winner === "a" && <span className="ml-1">🏆</span>}
      </div>
      <div className="text-[11px] font-bold text-muted uppercase tracking-wider text-center">{label}</div>
      <div className={`text-sm font-bold text-left ${winner === "b" ? "text-primary" : "text-foreground"}`}>
        {winner === "b" && <span className="mr-1">🏆</span>}
        {fmt(b)}
      </div>
    </div>
  );
}

function ChannelCard({ result, side }) {
  if (!result) return null;
  return (
    <div className="flex items-center gap-3">
      {result.channelImage ? (
        <Image src={result.channelImage} alt={result.channelName} width={48} height={48} className="w-12 h-12 rounded-full object-cover border border-border" />
      ) : (
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
          {result.channelName?.charAt(0) || "?"}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{side}</p>
        <p className="text-sm font-bold text-foreground truncate max-w-[160px]">{result.channelName}</p>
      </div>
    </div>
  );
}

export default function ChannelComparison() {
  const [channelA, setChannelA] = useState("");
  const [channelB, setChannelB] = useState("");
  const [niche, setNiche] = useState("auto");
  const [location, setLocation] = useState("auto");
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelA.trim() || !channelB.trim()) {
      setError("Please enter both channels to compare.");
      return;
    }
    if (!captchaToken) {
      setError("Please verify the reCAPTCHA first!");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const verifyRes = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) throw new Error("Captcha verification failed!");

      const res = await fetch("/api/channel-comparison", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelA: channelA.trim(), channelB: channelB.trim(), niche, location }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to compare channels");

      setData(json);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Form */}
        <div className="relative overflow-hidden bg-ink border border-white/10 rounded-3xl p-5 md:p-8 shadow-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(224,32,26,0.22),transparent)]" />
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div>
              <h2 className="font-display text-lg md:text-xl font-extrabold text-white">
                Compare Two YouTube Channels
              </h2>
              <p className="text-sm text-white/50 mt-1">
                See who wins on subscribers, views, and estimated revenue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Channel A</label>
                <input
                  type="text"
                  placeholder="Paste URL or @channelname"
                  value={channelA}
                  onChange={(e) => setChannelA(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-white/5 text-white placeholder:text-white/30 border border-white/15 outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Channel B</label>
                <input
                  type="text"
                  placeholder="Paste URL or @channelname"
                  value={channelB}
                  onChange={(e) => setChannelB(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-white/5 text-white placeholder:text-white/30 border border-white/15 outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Content Niche</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-white/5 text-white border border-white/15 focus:border-primary outline-none"
                >
                  <option className="text-foreground" value="auto">Auto Detect</option>
                  <option className="text-foreground" value="finance">Finance</option>
                  <option className="text-foreground" value="tech">Technology</option>
                  <option className="text-foreground" value="education">Education</option>
                  <option className="text-foreground" value="lifestyle">Lifestyle</option>
                  <option className="text-foreground" value="entertainment">Entertainment</option>
                  <option className="text-foreground" value="kids">Kids</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase mb-2">Audience Region</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-white/5 text-white border border-white/15 focus:border-primary outline-none"
                >
                  <option className="text-foreground" value="auto">Auto Detect</option>
                  <option className="text-foreground" value="tier1">Tier 1 (US/UK/CA)</option>
                  <option className="text-foreground" value="tier2">Tier 2 (EU/Middle East)</option>
                  <option className="text-foreground" value="tier3">Tier 3 (Asia)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setCaptchaToken} />
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-hover active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? "Comparing..." : "Compare Channels"}
              </button>
            </div>
          </form>

          {error && (
            <div className="relative z-10 mt-6 p-4 rounded-2xl border border-primary/40 bg-primary/10 text-white flex items-start gap-3">
              <span className="text-primary font-black">!</span>
              <p className="text-sm text-white/80 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {data && (
          <div className="bg-background border border-border rounded-3xl p-5 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <ChannelCard result={data.channelA} side="Channel A" />
              <span className="text-xs font-black text-muted uppercase tracking-widest">vs</span>
              <ChannelCard result={data.channelB} side="Channel B" />
            </div>

            <div className="mb-6 text-center">
              {data.comparison.overallWinner === "tie" ? (
                <p className="text-sm font-bold text-foreground">It&apos;s a tie — {data.comparison.winsA} categories each.</p>
              ) : (
                <p className="text-sm font-bold text-foreground">
                  <span className="text-primary">
                    {data.comparison.overallWinner === "a" ? data.channelA.channelName : data.channelB.channelName}
                  </span>{" "}
                  wins overall — {Math.max(data.comparison.winsA, data.comparison.winsB)} of {data.comparison.rows.length} categories
                </p>
              )}
            </div>

            <div className="bg-secondary rounded-2xl px-4">
              {data.comparison.rows.map((row) => (
                <Stat
                  key={row.key}
                  label={row.label}
                  a={row.a}
                  b={row.b}
                  winner={row.winner}
                  format={row.key.toLowerCase().includes("revenue") ? (v) => `$${v.toLocaleString()}` : undefined}
                />
              ))}
            </div>

            <p className="text-[11px] text-muted mt-4 text-center">
              Revenue figures are estimates based on public stats, niche, and audience region — not guaranteed earnings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
