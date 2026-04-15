export default function ChannelPerformance({ data, aiData }) {
  const analytics = data?.videoAnalytics;
  if (!analytics) return null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Metric Cards */}
        {[
          { label: "Engagement Rate", val: analytics.avgEngagement, desc: "Likes + Comments ratio" },
          { label: "Upload Velocity", val: analytics.uploadFrequency, desc: "Videos per month" },
          { label: "Daily Velocity", val: analytics.viewVelocity, desc: "Avg daily views" },
          { label: "Star Content", val: analytics.topPerformer, desc: "Best performing hook", full: true }
        ].map((item, idx) => (
          <div key={idx} className={`p-6 bg-white rounded-xl shadow-sm border border-gray-100 ${item.full ? 'sm:col-span-2' : ''}`}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</h3>
            <p className="text-3xl font-black text-gray-900 mt-1">{item.val}</p>
            <p className="text-xs text-gray-500 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>

      {aiData && (
        <div className="bg-red-600 rounded-xl p-6 text-white shadow-lg shadow-red-200">
          <h3 className="flex items-center gap-2 font-bold mb-2">
            <span className="bg-white text-red-600 px-2 py-0.5 rounded text-xs uppercase">Algorithm Note</span>
          </h3>
          <p className="text-sm md:text-base leading-relaxed opacity-90">{aiData}</p>
        </div>
      )}
    </div>
  );
}