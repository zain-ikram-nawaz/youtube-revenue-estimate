'use client'
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";

export default function Form({ channelUrl, setChannelUrl, loading, error, handleSubmit,setCaptchaToken }) {
  return (
    <div className="lg:col-span-8 lg:col-start-1 xl:col-span-10 xl:col-start-2">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 sm:p-6 md:p-8 border border-red-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="channelUrl"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              YouTube Channel URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="channelUrl"
                type="text"
                placeholder="https://www.youtube.com/@channelname"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                className="flex-1 border-2 border-gray-200 rounded-lg md:rounded-xl p-3 md:p-4 text-base focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg md:rounded-xl font-semibold shadow-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none whitespace-nowrap"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <svg
                      className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span className="text-sm md:text-base">Analyzing...</span>
                  </span>
                ) : (
                  <span className="text-sm md:text-base">Estimate Revenue</span>
                )}
              </button>
            </div>
          </div>
           <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={setCaptchaToken}
      />
        </form>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-700 font-medium text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}
