import React from 'react'

export default function Revenue({ data }) {
  const revenueEstimates = data?.revenueEstimates || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

      {/* Revenue Highlights */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-xl">
          <div className="text-2xl sm:text-3xl font-bold mb-2">
            {data?.estimatedRevenue?.toLocaleString?.() || 0}
          </div>
          <div className="text-red-100 text-sm sm:text-base">Lifetime Estimated Revenue</div>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-xl">
          <div className="text-2xl sm:text-3xl font-bold mb-2">
            {data?.avgMonthlyRevenue?.toLocaleString?.() || 0}
          </div>
          <div className="text-red-100 text-sm sm:text-base">Avg Monthly Revenue</div>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h4 className="font-semibold text-gray-900 mb-3">Monthly Performance</h4>
        <div className="space-y-3">
          <div>
            <div className="text-2xl font-bold text-red-600">
              {data?.avgMonthlyViews?.toLocaleString?.() || 0}
            </div>
            <div className="text-sm text-gray-600">Average Monthly Views</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">
              {data?.avgMonthlyRevenue?.toLocaleString?.() || 0}
            </div>
            <div className="text-sm text-gray-600">Estimated Monthly Revenue</div>
          </div>
        </div>
      </div>

      {/* RPM Table - Full Width */}
      <div className="lg:col-span-3 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            Revenue Estimates by RPM Brackets
          </h3>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Estimated monthly revenue based on different RPM ranges
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 text-sm">
                  RPM Bracket
                </th>
                <th className="px-4 sm:px-6 py-3 text-right font-semibold text-gray-700 text-sm">
                  Estimated Monthly Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(revenueEstimates).map(([label, value], index) => (
                <tr key={label} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                          index === 0
                            ? 'bg-green-500'
                            : index === 1
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      ></div>
                      <span className="font-medium text-sm sm:text-base">{label}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-right font-semibold text-gray-900 text-sm sm:text-base">
                    {value?.toLocaleString?.() || 0}
                  </td>
                </tr>
              ))}
              {Object.keys(revenueEstimates).length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="px-4 sm:px-6 py-3 text-center text-gray-500 text-sm"
                  >
                    No revenue estimates available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
