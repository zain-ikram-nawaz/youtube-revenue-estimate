'use client'
import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";

export default function Form({ channelUrl, setChannelUrl, loading, error, handleSubmit, setCaptchaToken }) {
  // Local state for optional filters
  const [niche, setNiche] = useState("auto");
  const [location, setLocation] = useState("auto");

  // Enhanced submit handler to include new fields
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // We pass an object with all values to the original handleSubmit
    handleSubmit(e, { niche, location });
  };

  return (
    <div className="lg:col-span-8 lg:col-start-1 xl:col-span-10 xl:col-start-2">
      <div className="bg-background rounded-lg md:rounded-lg shadow-lg md:shadow-xl p-4 sm:p-6 md:p-8 border border-accent">
        <form onSubmit={handleFormSubmit} className="space-y-6">

          {/* Main Input Field */}
          <div>
            <label
              htmlFor="channelUrl"
              className="block text-sm font-bold text-foreground mb-2 uppercase tracking-wide"
            >
              YouTube Channel URL or Name
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="channelUrl"
                type="text"
                placeholder="Paste URL or type @channelname"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                className="flex-1 border-2 border-border rounded-md md:rounded-md p-3 md:p-4 text-base focus:border-primary focus:ring-2 focus:ring-accent transition-all duration-200 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-primary to-primary-hover text-background rounded-md md:rounded-md font-black shadow-lg hover:from-primary-hover hover:to-primary transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none whitespace-nowrap uppercase tracking-tighter"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <svg className="animate-spin h-5 w-5 text-background" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Analyzing...</span>
                  </span>
                ) : (
                  "Estimate Revenue"
                )}
              </button>
            </div>
          </div>

          {/* Accuracy Boosters (New Section) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-black text-muted uppercase mb-2 ml-1">
                Content Niche (Optional)
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full p-3 bg-secondary border-2 border-border rounded-md text-sm font-bold text-muted outline-none focus:border-accent transition-colors"
              >
                <option value="auto">✨ Auto-Detect Niche</option>
                <option value="finance">💰 Finance & Business</option>
                <option value="tech">💻 Technology / AI</option>
                <option value="education">📚 Education / How-to</option>
                <option value="lifestyle">🏠 Lifestyle / Vlogs</option>
                <option value="entertainment">🎬 Entertainment</option>
                <option value="kids">👶 Kids Content</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-muted uppercase mb-2 ml-1">
                Main Audience (Optional)
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 bg-secondary border-2 border-border rounded-md text-sm font-bold text-muted outline-none focus:border-accent transition-colors"
              >
                <option value="auto">🌍 Auto-Detect Region</option>
                <option value="tier1">🇺🇸 Tier 1 (USA, UK, CA)</option>
                <option value="tier2">🇦🇪 Tier 2 (Europe, Middle East)</option>
                <option value="tier3">🇵🇰 Tier 3 (Asia, India, PK)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={setCaptchaToken}
            />
            <p className="text-xs text-muted font-medium text-center md:text-right max-w-[200px]">
              Our AI engine analyzes real-time CPM rates for 2026 based on niche selection.
            </p>
          </div>
        </form>

        {error && (
          <div className="mt-6 bg-accent border-l-4 border-primary rounded-r-md p-4 flex items-center gap-3 animate-pulse">
            <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-primary font-bold text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}