import React from "react";

export const metadata = {
  title: "Disclaimer | YouTube Revenue Estimator",
  description:
    "Disclaimer: Channel Income provides estimated analytics and is not affiliated with YouTube or Google. Actual YouTube earnings may vary.",
  keywords: [
    "YouTube earnings disclaimer",
    "YouTube revenue estimator disclaimer",
    "Channel Income disclaimer",
    "YouTube analytics disclaimer",
  ],
  openGraph: {
    title:"Disclaimer | YouTube Revenue Estimator",
    description:
      "Channel Income provides estimated YouTube analytics for informational purposes only. We are not affiliated with YouTube or Google.",
    url: "https://channelincome.com/disclaimer",
    siteName: "Channel Income",
    locale: "en_US",
    type: "article",
  },
  alternates: {
    canonical: "https://channelincome.com/disclaimer",
  },
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-secondary py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-4">

        {/* Header Section */}
        <div className="bg-background rounded-md shadow-sm border border-border p-5 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-md mb-3 shadow-sm">
            <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-foreground mb-2 leading-snug">
            Disclaimer - YouTube Channel Revenue Estimator
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            Important information about our YouTube analytics estimates and data accuracy
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-background rounded-md shadow-sm border border-border p-5">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center mb-3">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            General Information & Data Accuracy
          </h2>

          <div className="space-y-3 text-xs text-muted leading-relaxed">
            <p>
              The information provided on <strong className="text-foreground">Channel Income</strong> (YouTube Channel Revenue
              Estimator) is for general informational purposes only.
            </p>
            <p>
              All data shown, including estimated revenue, CPM, RPM, or analytics, are{" "}
              <strong className="text-foreground">approximations based on internal calculations and publicly available data</strong>.
              Actual YouTube earnings may differ significantly depending on niche, region, and advertiser demand.
            </p>
            <p>
              This site is not affiliated, associated, authorized, endorsed by, or in any way officially
              connected with YouTube or Google LLC.
            </p>
            <p>
              Any blog articles or guides published on this site are based on independent research and may
              not reflect real-world results or official YouTube data.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted">Last updated: April 2026</p>
          </div>
        </div>

      </div>
    </div>
  );
}