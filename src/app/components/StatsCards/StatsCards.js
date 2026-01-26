import React from 'react'

const IntelligenceBar = ({ text, title }) => (
  <div className="relative overflow-hidden bg-white border border-red-100 rounded-2xl p-4 mb-8 shadow-sm group">
    {/* Decorative Background Element */}
    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-red-50 to-transparent opacity-50" />

    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-200">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] leading-none">Channel income</p>
          <p className="text-xs font-bold text-slate-400 uppercase">Insight Engine</p>
        </div>
      </div>

      <div className="h-px w-full md:h-8 md:w-px bg-slate-100 hidden md:block" />

      <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
        <span className="text-red-600 font-bold not-italic mr-1">Analysis:</span>
        {`{"${text}"}`}
      </p>
    </div>
  </div>
);

export default function StatsCards({ data, aiData }) {
  if (!data) return null;

  const stats = [
    { label: "Subscribers", value: data?.subscribers, icon: "👥", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Views", value: data?.totalViews, icon: "👁️", color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Uploads", value: data?.videoCount, icon: "🎬", color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Region", value: data?.country || "N/A", icon: "🌍", color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">

      {/* 1. AI Insight Row (Ab stats se alag aur top par hai) */}


      {/* 2. Compact Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div className="text-xl font-black text-slate-900 tracking-tight leading-none">
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
 {aiData && <IntelligenceBar title="Growth" text={aiData} />}
      {/* 3. Channel Blueprint Section */}
      <div className="relative mt-8 bg-slate-900 rounded-[2.5rem] p-8 overflow-hidden shadow-2xl border-4 border-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] -mr-32 -mt-32" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">🚀 Channel Blueprint</h3>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Monthly Views</span>
                <span className="text-lg font-black text-red-400 tracking-tight">{data?.avgMonthlyViews?.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Channel ID</span>
                <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded select-all cursor-pointer">{data?.channelId}</span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
               <div className="bg-red-600/10 p-6 rounded-3xl border border-red-500/20">
                  <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-3">Strategic Context</p>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    This profile was established on <span className="text-white font-bold">{new Date(data?.creationDate).toLocaleDateString()}</span>.
                    Currently in its <span className="text-white font-bold">{Math.floor((new Date() - new Date(data.creationDate)) / (365.25 * 24 * 60 * 60 * 1000))} year</span>,
                    showing high performance markers relative to its niche.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}