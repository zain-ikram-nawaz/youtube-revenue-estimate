"use client";
import React from "react";

export default function page({ data }) {
  const analytics = data?.videoAnalytics;
  if (!analytics) return null;
  // console.log(data)

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {/* Average Engagement */}
      <div className="p-5 bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Engagement</h3>
        <p className="text-3xl font-bold text-red-600">{analytics.avgEngagement}</p>
        <p className="text-gray-600 text-sm mt-2">
          Based on last 20 videos (likes + comments ÷ views × 100)
        </p>
      </div>

      {/* Upload Frequency */}
      <div className="p-5 bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Frequency</h3>
        <p className="text-3xl font-bold text-red-600">{analytics.uploadFrequency}</p>
        <p className="text-gray-600 text-sm mt-2">
          Average number of uploads per month
        </p>
      </div>

      {/* View Velocity */}
      <div className="p-5 bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">View Velocity</h3>
        <p className="text-3xl font-bold text-red-600">{analytics.viewVelocity}</p>
        <p className="text-gray-600 text-sm mt-2">
          Average daily views across recent uploads
        </p>
      </div>

      {/* Top Performer */}
      <div className="p-5 bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition-all">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Top Performing Video</h3>
        <p className="text-base font-medium text-gray-900 leading-snug">
          {analytics.topPerformer}
        </p>
        <p className="text-gray-600 text-sm mt-2">
          Highest engagement ratio among recent uploads
        </p>
      </div>
    </div>
  );
}
