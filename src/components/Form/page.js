'use client'
import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

export default function Form({
  channelUrl,
  setChannelUrl,
  loading,
  error,
  handleSubmit,
  setCaptchaToken
}) {

  const [niche, setNiche] = useState("auto");
  const [location, setLocation] = useState("auto");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e, { niche, location });
  };

  return (
    <div className="lg:col-span-8 lg:col-start-1 xl:col-span-10 xl:col-start-2">

      {/* Card */}
      <div className="bg-primary bg-[radial-gradient(ellipse_70%_60%_at_80%_50%,rgba(230,0,0,0.12),transparent)] border border-white/10 rounded-lg p-5 md:p-8 shadow-xl">

        <form onSubmit={handleFormSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <h2 className="text-lg md:text-xl font-black text-white">
              YouTube Revenue Estimator
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Enter channel details to estimate earnings for 2026
            </p>
          </div>

          {/* Input */}
          <div>
            <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
              Channel URL or Name
            </label>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                id="channelUrl"
                type="text"
                placeholder="Paste URL or @channelname"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-primary text-white border border-white/20 outline-none focus:border-primary-hover transition"
              />

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-lg bg-primary-hover text-white font-bold uppercase tracking-wide hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Estimate"}
              </button>

            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-bold text-white/70 uppercase mb-2">
                Content Niche
              </label>

              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-3 py-3 rounded-lg bg-primary text-white border border-white/20 focus:border-primary-hover outline-none"
              >
                <option value="auto">Auto Detect</option>
                <option value="finance">Finance</option>
                <option value="tech">Technology</option>
                <option value="education">Education</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="entertainment">Entertainment</option>
                <option value="kids">Kids</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 uppercase mb-2">
                Audience Region
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-3 rounded-lg bg-primary text-white border border-white/20 focus:border-primary-hover outline-none"
              >
                <option value="auto">Auto Detect</option>
                <option value="tier1">Tier 1 (US/UK/CA)</option>
                <option value="tier2">Tier 2 (EU/Middle East)</option>
                <option value="tier3">Tier 3 (Asia)</option>
              </select>
            </div>

          </div>

          {/* Captcha + Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={setCaptchaToken}
            />

            <p className="text-xs text-white/60 text-center md:text-right max-w-xs">
              AI estimates based on 2026 CPM trends & niche analysis
            </p>

          </div>

        </form>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 rounded-lg border border-primary-hover bg-primary text-white flex items-start gap-3">

            <span className="text-primary-hover font-black">!</span>

            <p className="text-sm text-white/80 font-medium">
              {error}
            </p>

          </div>
        )}

      </div>
    </div>
  )
}