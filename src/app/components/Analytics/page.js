import React from 'react'

export default function Analytics({ data }) {
  return (
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

                  {/* Notes Section */}
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      Analysis Notes
                    </h3>
                    <ul className="space-y-2">
                      {data.notes.map((note, i) => (
                        <li key={i} className="flex items-start gap-2 p-2 sm:p-3 bg-red-50 rounded-lg">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-gray-700 text-sm sm:text-base">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-600">Views per Subscriber</span>
                          <span className="text-sm font-bold text-red-600">
                            {((data.totalViews / data.subscribers) || 0).toFixed(1)} views/sub
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((data.totalViews / data.subscribers) / 50 * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-600">Content Frequency</span>
                          <span className="text-sm font-bold text-red-600">
                            {(data.videoCount / Math.max((new Date() - new Date(data.creationDate)) / (365.25 * 24 * 60 * 60 * 1000), 1)).toFixed(1)} videos/year
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((data.videoCount / Math.max((new Date() - new Date(data.creationDate)) / (365.25 * 24 * 60 * 60 * 1000), 1)) / 100 * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">+12.5%</div>
                          <div className="text-xs text-gray-600">MoM Growth</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">94%</div>
                          <div className="text-xs text-gray-600">Retention</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  )
}
