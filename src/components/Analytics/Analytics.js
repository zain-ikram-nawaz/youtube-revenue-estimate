export default function Analytics({ data, aiData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Notes */}
      <div className="bg-background rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-sm font-black text-muted uppercase tracking-widest mb-4">Deep Insight Notes</h3>
        <div className="space-y-3">
          {data?.notes.map((note, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-lg bg-secondary border border-border group hover:border-primary transition-all">
              <span className="w-5 h-5 bg-background shadow-sm rounded flex items-center justify-center text-[10px] font-bold text-primary border border-border shrink-0">{i+1}</span>
              <span className="text-sm text-foreground leading-relaxed">{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Performance */}
      <div className="space-y-6">
        <div className="bg-background rounded-lg shadow-sm border border-border p-6">
          <h3 className="text-sm font-black text-muted uppercase tracking-widest mb-6">Efficiency Ratios</h3>
          <div className="space-y-6">
            {[
              { label: "Views per Subscriber", val: ((data?.totalViews / data?.subscribers) || 0).toFixed(1), unit: "v/s", color: "bg-primary" },
              { label: "Channel Velocity Score", val: "94.2", unit: "%", color: "bg-accent" }
            ].map((m, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-muted uppercase">{m.label}</span>
                  <span className="text-foreground">{m.val}{m.unit}</span>
                </div>
                <div className="h-2 bg-secondary rounded-lg overflow-hidden">
                  <div className={`h-full ${m.color} rounded-lg`} style={{ width: '70%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Advanced Strategy */}
        {aiData && (
          <div className="bg-primary rounded-lg p-6 text-background border-b-4 border-accent">
             <div className="text-[10px] font-black uppercase text-accent mb-2">Algorithm Breakthrough Advice</div>
             <p className="text-sm leading-relaxed opacity-90 italic">"{aiData}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
