import React from 'react'

export default function Monetization({data}) {
  return (
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Requirements Status */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">YouTube Partner Program Requirements</h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: 'subscribers',
                          label: '1,000 Subscribers',
                          current: data.subscribers,
                          required: data.monetization.youtubeRequirements.MIN_SUBSCRIBERS,
                          met: data.monetization.requirements.subscribers
                        },
                        {
                          key: 'watchHours',
                          label: '4,000 Watch Hours (yearly)',
                          current: data.monetization.estimatedWatchHours,
                          required: data.monetization.youtubeRequirements.MIN_WATCH_HOURS,
                          met: data.monetization.requirements.watchHours
                        },
                        {
                          key: 'videos',
                          label: '3 Public Videos',
                          current: data.videoCount,
                          required: data.monetization.youtubeRequirements.MIN_VIDEOS,
                          met: data.monetization.requirements.videos
                        },
                        {
                          key: 'channelAge',
                          label: '30 Days Channel Age',
                          current: data.monetization.channelAgeDays,
                          required: data.monetization.youtubeRequirements.MIN_CHANNEL_AGE,
                          met: data.monetization.requirements.channelAge
                        }
                      ].map((req, index) => (
                        <div key={req.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              req.met ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className="font-medium">{req.label}</span>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${req.met ? 'text-green-600' : 'text-red-600'}`}>
                              {req.current.toLocaleString()} / {req.required.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              {req.met ? '✓ Met' : '✗ Not Met'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Analysis */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Progress Analysis</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Overall Compliance</span>
                          <span className="font-bold text-green-600">{data.monetization.complianceScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${data.monetization.complianceScore}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.max(0, data.monetization.youtubeRequirements.MIN_SUBSCRIBERS - data.subscribers).toLocaleString()}
                          </div>
                          <div className="text-sm text-blue-600">Subscribers Needed</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {Math.max(0, data.monetization.youtubeRequirements.MIN_WATCH_HOURS - data.monetization.estimatedWatchHours).toLocaleString()}h
                          </div>
                          <div className="text-sm text-purple-600">Watch Hours Needed</div>
                        </div>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Recommendations</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          {!data.monetization.requirements.subscribers && (
                            <li>• Focus on subscriber growth through consistent content</li>
                          )}
                          {!data.monetization.requirements.watchHours && (
                            <li>• Increase video length and watch time retention</li>
                          )}
                          {data.monetization.status === 'monetized' && (
                            <li>• Maintain consistency to keep monetization status</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
  )
}
