import React from "react";

export default function MonetizationStatusBar({ data, getMonetizationConfig }) {
  if (!data || !data.status) {
    return (
      <div className="rounded-2xl shadow-sm border p-4 sm:p-6 bg-secondary border-border">
        <p className="text-muted text-sm">Monetization data not available yet.</p>
      </div>
    );
  }

  const config = getMonetizationConfig(data?.status);

  return (
    <div
      className={`rounded-2xl shadow-sm border-l-4 p-4 sm:p-6 ${config?.bgColor} ${config?.borderColor}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{config?.icon}</span>
          <div>
            <h3 className={`font-display text-lg sm:text-xl font-bold ${config?.textColor}`}>
              {config?.label}
            </h3>
            <p className="text-muted text-sm sm:text-base">
              {config?.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className={`text-2xl font-black ${config?.textColor}`}>
              {data?.complianceScore || 0}%
            </div>
            <div className="text-muted text-sm">Compliance Score</div>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={
                  config.color === "green"
                    ? "#10B981"
                    : config.color === "blue"
                    ? "#3B82F6"
                    : config.color === "yellow"
                    ? "#F59E0B"
                    : "#EF4444"
                }
                strokeWidth="3"
                strokeDasharray={`${data?.complianceScore || 0}, 100`}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
