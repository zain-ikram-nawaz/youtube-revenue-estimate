import React from 'react'

const IntelligenceBar = ({ text, title }) => (
  <div className="relative overflow-hidden bg-background border border-border rounded-lg p-4 mb-8 shadow-sm group">
    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-secondary to-transparent opacity-50" />

    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-lg">
          <svg className="w-5 h-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none">Channel income</p>
          <p className="text-xs font-bold text-muted uppercase">Insight Engine</p>
        </div>
      </div>

      <div className="h-px w-full md:h-8 md:w-px bg-border hidden md:block" />

      <p className="text-sm text-foreground font-medium leading-relaxed italic">
        <span className="text-primary font-bold not-italic mr-1">Analysis:</span>
        {`{"${text}"}`}
      </p>
    </div>
  </div>
);

export default function StatsCards({ data, aiData }) {
  if (!data) return null;

  const stats = [
    { label: "Subscribers", value: data?.subscribers,              icon: "👥", color: "text-primary",  bg: "bg-secondary" },
    { label: "Total Views",  value: data?.totalViews,              icon: "👁️", color: "text-accent",   bg: "bg-secondary" },
    { label: "Uploads",      value: data?.videoCount,              icon: "🎬", color: "text-primary",  bg: "bg-secondary" },
    { label: "Region",       value: data?.country || "N/A",        icon: "🌍", color: "text-accent",   bg: "bg-secondary" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">

      {/* Compact Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-background p-5 rounded-lg border border-border shadow-sm hover:shadow-md transition-all group">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div className="text-xl font-black text-foreground tracking-tight leading-none">
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </div>
            <div className="text-[10px] font-bold text-muted uppercase tracking-widest mt-2">{stat.label}</div>
          </div>
        ))}
      </div>

      {aiData && <IntelligenceBar title="Growth" text={aiData} />}

      {/* Channel Blueprint Section */}
      <div className="relative mt-8 bg-primary rounded-lg p-8 overflow-hidden shadow-2xl border-4 border-secondary">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] -mr-32 -mt-32" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-black text-background uppercase tracking-tighter">🚀 Channel Blueprint</h3>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary-hover/60 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-background/10 rounded-lg border border-background/20 hover:bg-background/20 transition-colors">
                <span className="text-background/60 text-xs font-bold uppercase tracking-widest">Monthly Views</span>
                <span className="text-lg font-black text-accent tracking-tight">{data?.avgMonthlyViews?.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-background/10 rounded-lg border border-background/20 hover:bg-background/20 transition-colors">
                <span className="text-background/60 text-xs font-bold uppercase tracking-widest">Channel ID</span>
                <span className="text-[10px] font-mono text-background/80 bg-primary-hover px-2 py-1 rounded select-all cursor-pointer">{data?.channelId}</span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
               <div className="bg-accent/10 p-6 rounded-lg border border-accent/30">
                  <p className="text-xs font-black text-accent uppercase tracking-widest mb-3">Strategic Context</p>
                  <p className="text-sm text-background/80 leading-relaxed font-medium">
                    This profile was established on <span className="text-background font-bold">{new Date(data?.creationDate).toLocaleDateString()}</span>.
                    Currently in its <span className="text-background font-bold">{Math.floor((new Date() - new Date(data.creationDate)) / (365.25 * 24 * 60 * 60 * 1000))} year</span>,
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
