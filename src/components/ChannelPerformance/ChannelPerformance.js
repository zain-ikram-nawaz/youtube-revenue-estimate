export default function ChannelPerformance({ data, aiData }) {
  const analytics = data?.videoAnalytics;
  if (!analytics) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "Engagement Rate", val: analytics.avgEngagement, desc: "Likes + Comments ratio" },
          { label: "Upload Velocity", val: analytics.uploadFrequency, desc: "Videos per month" },
          { label: "Daily Velocity", val: analytics.viewVelocity, desc: "Avg daily views" },
          { label: "Star Content", val: analytics.topPerformer, desc: "Best performing hook", full: true }
        ].map((item, idx) => (
          <div key={idx} className={`p-6 bg-background rounded-lg shadow-sm border border-border ${item.full ? 'sm:col-span-2' : ''}`}>
            <h3 className="text-xs font-bold text-muted uppercase tracking-widest">{item.label}</h3>
            <p className="text-3xl font-black text-foreground mt-1">{item.val}</p>
            <p className="text-xs text-muted mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      {aiData && (
        <div className="bg-ink rounded-3xl p-6 text-white shadow-lg border border-white/10">
          <h3 className="flex items-center gap-2 font-bold mb-2">
            <span className="bg-accent text-ink px-2 py-0.5 rounded-full text-xs uppercase font-black">Algorithm Note</span>
          </h3>
          <p className="text-sm md:text-base leading-relaxed text-white/85">{aiData}</p>
        </div>
      )}
    </div>
  );
}
