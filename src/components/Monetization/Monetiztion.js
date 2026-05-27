export default function Monetization({ data, aiData }) {
  const monetization = data?.monetization;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Requirements */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-background rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <div className="w-2 h-6 bg-primary rounded-lg"></div> YPP Progress Tracker
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Subscribers', cur: data?.subscribers, req: 1000, met: data?.subscribers >= 1000 },
              { label: 'Watch Hours', cur: monetization?.estimatedWatchHours, req: 4000, met: monetization?.requirements?.watchHours },
              { label: 'Video Count', cur: data?.videoCount, req: 3, met: data?.videoCount >= 3 },
              { label: 'Channel Age', cur: monetization?.channelAgeDays, req: 30, met: monetization?.channelAgeDays >= 30 }
            ].map((r, i) => (
              <div key={i} className={`p-4 rounded-lg border-2 transition-all ${r.met ? 'border-accent/40 bg-secondary' : 'border-border bg-secondary/50'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-foreground">{r.label}</span>
                  {r.met
                    ? <span className="text-accent text-xs font-bold">✓ MET</span>
                    : <span className="text-primary text-xs font-bold">IN PROGRESS</span>
                  }
                </div>
                <div className="text-lg font-black text-foreground">{r.cur?.toLocaleString() || 0} <span className="text-muted text-sm font-normal">/ {r.req}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Strategic Advice */}
        {aiData && (
          <div className="bg-primary text-background rounded-lg p-6 shadow-xl relative overflow-hidden">
             <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 text-9xl font-black italic">$$$</div>
             <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-background/60">Monetization Engine Advice</h4>
             <p className="text-sm md:text-base leading-relaxed italic opacity-90">"{aiData}"</p>
          </div>
        )}
      </div>

      {/* Compliance Circular Section */}
      <div className="space-y-6">
        <div className="bg-background rounded-lg shadow-sm border border-border p-8 text-center">
          <div className="inline-flex relative items-center justify-center p-4">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-border" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * (monetization?.complianceScore || 0)) / 100}
                className="text-accent transition-all duration-1000" strokeLinecap="round" />
            </svg>
            <span className="absolute text-2xl font-black text-foreground">{monetization?.complianceScore || 0}%</span>
          </div>
          <h4 className="mt-4 font-bold text-foreground uppercase text-xs tracking-widest">Safety Compliance</h4>
          <p className="text-[10px] text-muted mt-2 px-4 italic leading-tight">Ad-friendly content score based on community guidelines</p>
        </div>
      </div>
    </div>
  );
}
