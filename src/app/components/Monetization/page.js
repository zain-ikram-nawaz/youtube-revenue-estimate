export default function Monetization({ data, aiData }) {
  const monetization = data?.monetization;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Requirements */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-red-600 rounded-full"></div> YPP Progress Tracker
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Subscribers', cur: data?.subscribers, req: 1000, met: data?.subscribers >= 1000 },
              { label: 'Watch Hours', cur: monetization?.estimatedWatchHours, req: 4000, met: monetization?.requirements?.watchHours },
              { label: 'Video Count', cur: data?.videoCount, req: 3, met: data?.videoCount >= 3 },
              { label: 'Channel Age', cur: monetization?.channelAgeDays, req: 30, met: monetization?.channelAgeDays >= 30 }
            ].map((r, i) => (
              <div key={i} className={`p-4 rounded-xl border-2 transition-all ${r.met ? 'border-green-100 bg-green-50/30' : 'border-gray-50 bg-gray-50/50'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-gray-700">{r.label}</span>
                  {r.met ? <span className="text-green-600 text-xs font-bold">✓ MET</span> : <span className="text-red-400 text-xs font-bold">IN PROGRESS</span>}
                </div>
                <div className="text-lg font-black text-gray-900">{r.cur?.toLocaleString() || 0} <span className="text-gray-400 text-sm font-normal">/ {r.req}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Strategic Advice */}
        {aiData && (
          <div className="bg-indigo-900 text-indigo-100 rounded-2xl p-6 shadow-xl relative overflow-hidden">
             <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 text-9xl font-black italic">$$$</div>
             <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-indigo-400">Monetization Engine Advice</h4>
             <p className="text-sm md:text-base leading-relaxed italic">"{aiData}"</p>
          </div>
        )}
      </div>

      {/* Compliance Circular Section */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="inline-flex relative items-center justify-center p-4">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-100" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * (monetization?.complianceScore || 0)) / 100}
                className="text-green-500 transition-all duration-1000" strokeLinecap="round" />
            </svg>
            <span className="absolute text-2xl font-black text-gray-900">{monetization?.complianceScore || 0}%</span>
          </div>
          <h4 className="mt-4 font-bold text-gray-800 uppercase text-xs tracking-widest">Safety Compliance</h4>
          <p className="text-[10px] text-gray-400 mt-2 px-4 italic leading-tight">Ad-friendly content score based on community guidelines</p>
        </div>
      </div>
    </div>
  );
}