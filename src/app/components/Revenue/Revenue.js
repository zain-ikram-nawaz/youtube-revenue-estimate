export default function Revenue({ data, aiData }) {
  const estimates = data?.revenueEstimates || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-gray-900 to-slate-800 p-8 rounded-3xl text-white shadow-2xl relative">
          <div className="text-xs font-black uppercase tracking-widest text-red-500 mb-2">Lifetime Earnings</div>
          <div className="text-4xl font-black">${data?.estimatedRevenue?.toLocaleString() || 0}</div>
          <div className="absolute top-4 right-6 text-slate-700 text-4xl font-bold">01</div>
        </div>
        <div className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-sm relative">
          <div className="text-xs font-black uppercase tracking-widest text-red-600 mb-2">Monthly Average</div>
          <div className="text-4xl font-black text-gray-900">{data?.avgMonthlyRevenue?.toLocaleString() || 0}</div>
          <div className="absolute top-4 right-6 text-gray-100 text-4xl font-bold">02</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="font-bold text-gray-900">RPM Bracket Forecast</h3>
            <p className="text-xs text-gray-500 mt-1">Projected earnings across different niche CPMs</p>
          </div>
          <span className="bg-white px-3 py-1 rounded-full text-[10px] font-bold border border-gray-200">DYNAMIC DATA</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                <th className="px-6 py-4">Market Bracket</th>
                <th className="px-6 py-4 text-right">Potential Monthly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Object.entries(estimates).map(([label, value], i) => (
                <tr key={i} className="group hover:bg-red-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-700 text-sm flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-400' : i === 1 ? 'bg-yellow-400' : 'bg-red-400'}`} />
                    {label}
                  </td>
                  <td className="px-6 py-4 text-right font-black text-gray-900 text-sm">
                    ${value?.toLocaleString() || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {aiData && (
        <div className="p-5 bg-yellow-50 border-2 border-yellow-100 rounded-2xl flex gap-4 items-start">
          <div className="text-2xl mt-1">💰</div>
          <div>
            <h4 className="font-black text-yellow-800 text-xs uppercase tracking-tighter">AI Profit Strategy</h4>
            <p className="text-sm text-yellow-900 leading-relaxed mt-1">{aiData}</p>
          </div>
        </div>
      )}
    </div>
  );
}