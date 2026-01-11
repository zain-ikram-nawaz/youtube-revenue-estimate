export default function Analytics({ data, aiData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Notes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Deep Insight Notes</h3>
        <div className="space-y-3">
          {data?.notes.map((note, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 group hover:border-red-200 transition-all">
              <span className="w-5 h-5 bg-white shadow-sm rounded flex items-center justify-center text-[10px] font-bold text-red-600 border border-red-100 shrink-0">{i+1}</span>
              <span className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-900">{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Performance */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Efficiency Ratios</h3>
          <div className="space-y-6">
            {[
              { label: "Views per Subscriber", val: ((data?.totalViews / data?.subscribers) || 0).toFixed(1), unit: "v/s", color: "bg-red-500" },
              { label: "Channel Velocity Score", val: "94.2", unit: "%", color: "bg-indigo-500" }
            ].map((m, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-500 uppercase">{m.label}</span>
                  <span className="text-gray-900">{m.val}{m.unit}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} rounded-full`} style={{ width: '70%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Advanced Strategy */}
        {aiData && (
          <div className="bg-slate-900 rounded-2xl p-6 text-white border-b-4 border-red-600">
             <div className="text-[10px] font-black uppercase text-red-500 mb-2">Algorithm Breakthrough Advice</div>
             <p className="text-sm leading-relaxed opacity-90 italic">"{aiData}"</p>
          </div>
        )}
      </div>
    </div>
  )
}