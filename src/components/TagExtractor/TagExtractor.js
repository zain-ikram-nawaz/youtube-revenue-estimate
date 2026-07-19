"use client";

import { useState } from "react";

export default function TagExtractor() {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      setError("Please paste a YouTube video URL.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);

    try {
      const res = await fetch("/api/tag-extractor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl: videoUrl.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to extract tags");
      setResult(json);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyAll = (list) => {
    navigator.clipboard.writeText(list.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="relative overflow-hidden bg-ink border border-white/10 rounded-3xl p-5 md:p-8 shadow-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(224,32,26,0.22),transparent)]" />
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div>
              <h2 className="font-display text-lg md:text-xl font-extrabold text-white">
                YouTube Tag &amp; Keyword Extractor
              </h2>
              <p className="text-sm text-white/50 mt-1">
                See any video&apos;s tags, plus AI keyword suggestions
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Video URL</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full bg-white/5 text-white placeholder:text-white/30 border border-white/15 outline-none focus:border-primary transition-colors"
                />
                <button type="submit" disabled={loading}
                  className="px-6 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-hover active:scale-95 transition-all disabled:opacity-50">
                  {loading ? "Extracting..." : "Extract Tags"}
                </button>
              </div>
            </div>
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
            <div>
              <p className="text-xs text-muted">Video</p>
              <p className="text-sm font-bold text-foreground">{result.title}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-bold text-muted uppercase tracking-widest">
                  Existing Tags ({result.tagCount})
                </p>
                {result.tags.length > 0 && (
                  <button onClick={() => copyAll(result.tags)} className="text-xs font-semibold text-primary hover:opacity-80">
                    {copied ? "Copied!" : "Copy all"}
                  </button>
                )}
              </div>
              {result.tags.length === 0 ? (
                <p className="text-sm text-muted bg-secondary rounded-xl p-4">
                  This video has no visible tags — that&apos;s a missed SEO opportunity. Use the AI suggestions below.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-secondary border border-border text-xs font-medium text-foreground rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {result.aiSuggestions?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-bold text-muted uppercase tracking-widest">AI Suggested Keywords</p>
                  <button onClick={() => copyAll(result.aiSuggestions)} className="text-xs font-semibold text-primary hover:opacity-80">
                    Copy all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.aiSuggestions.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/20 text-xs font-medium text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[11px] text-muted text-center">
              Tags are one of many ranking factors — title, thumbnail, and watch time matter more. Use these as a supporting signal, not a silver bullet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
