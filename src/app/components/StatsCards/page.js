import React from 'react'

export default function StatsCards({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

                  {/* Stats Cards */}
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{data.subscribers.toLocaleString()}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Subscribers</div>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{data.totalViews.toLocaleString()}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Views</div>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{data.videoCount}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Videos</div>
                  </div>

                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-red-500">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{data.country}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">Country</div>
                  </div>

                  {/* Channel Info - Full Width */}
                  <div className="md:col-span-2 lg:col-span-4 bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Channel Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600 text-sm sm:text-base">Channel ID</span>
                          <span className="text-gray-900 font-mono text-xs sm:text-sm truncate ml-2">{data.channelId}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600 text-sm sm:text-base">Creation Date</span>
                          <span className="text-gray-900 text-sm sm:text-base">{new Date(data.creationDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600 text-sm sm:text-base">Avg Monthly Views</span>
                          <span className="text-gray-900 font-bold text-sm sm:text-base">{data.avgMonthlyViews.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-600 text-sm sm:text-base">Channel Age</span>
                          <span className="text-gray-900 text-sm sm:text-base">
                            {Math.floor((new Date() - new Date(data.creationDate)) / (365.25 * 24 * 60 * 60 * 1000))} years
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  )
}
