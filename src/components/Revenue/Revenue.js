export default function Revenue({ data, aiData }) {
  const estimates = data?.revenueEstimates || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-ink p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_0%,rgba(245,166,35,0.18),transparent)]" />
          <div className="relative z-10">
            <div className="text-xs font-black uppercase tracking-widest text-accent mb-2">Lifetime Earnings</div>
            <div className="font-display text-4xl font-black text-accent">${data?.estimatedRevenue?.toLocaleString() || 0}</div>
          </div>
          <div className="absolute top-4 right-6 text-white/10 text-4xl font-bold">01</div>
        </div>
        <div className="bg-background p-8 rounded-3xl border-2 border-border shadow-sm relative">
          <div className="text-xs font-black uppercase tracking-widest text-primary mb-2">Monthly Average</div>
          <div className="font-display text-4xl font-black text-foreground">{data?.avgMonthlyRevenue?.toLocaleString() || 0}</div>
          <div className="absolute top-4 right-6 text-border text-4xl font-bold">02</div>
        </div>
      </div>

      <div className="bg-background rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/50">
          <div>
            <h3 className="font-bold text-foreground">RPM Bracket Forecast</h3>
            <p className="text-xs text-muted mt-1">Projected earnings across different niche CPMs</p>
          </div>
          <span className="bg-background px-3 py-1 rounded-lg text-[10px] font-bold border border-border text-foreground">DYNAMIC DATA</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase font-bold text-muted tracking-widest">
                <th className="px-6 py-4">Market Bracket</th>
                <th className="px-6 py-4 text-right">Potential Monthly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Object.entries(estimates).map(([label, value], i) => (
                <tr key={i} className="group hover:bg-secondary transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground text-sm flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-lg ${i === 0 ? 'bg-accent' : i === 1 ? 'bg-primary-hover' : 'bg-primary'}`} />
                    {label}
                  </td>
                  <td className="px-6 py-4 text-right font-black text-foreground text-sm">
                    ${value?.toLocaleString() || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {aiData && (
        <div className="p-5 bg-secondary border-2 border-border rounded-lg flex gap-4 items-start">
          <div className="text-2xl mt-1">💰</div>
          <div>
            <h4 className="font-black text-primary text-xs uppercase tracking-tighter">AI Profit Strategy</h4>
            <p className="text-sm text-foreground leading-relaxed mt-1">{aiData}</p>
          </div>
        </div>
      )}
    </div>
  );
}
