import React from "react";

export const metadata = {
  title: "Disclaimer | ChannelIncome YouTube Revenue Estimator",
  description:
    "Disclaimer for ChannelIncome: Our YouTube revenue estimates are approximations based on industry patterns. We are not affiliated with YouTube or Google. Actual earnings may vary significantly.",
  keywords: [
    "YouTube earnings disclaimer",
    "YouTube revenue estimator disclaimer",
    "ChannelIncome disclaimer",
    "YouTube analytics accuracy",
    "estimate accuracy disclosure",
  ],
  openGraph: {
    title: "Disclaimer | ChannelIncome YouTube Revenue Estimator",
    description:
      "Important disclaimer: ChannelIncome provides estimated analytics for informational purposes. We are not affiliated with YouTube or Google. Actual earnings may differ.",
    url: "https://channelincome.com/disclaimer",
    siteName: "ChannelIncome",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://channelincome.com/disclaimer",
  },
};

export default function Disclaimer() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Disclaimer - YouTube Channel Revenue Estimator",
    "url": "https://channelincome.com/disclaimer",
    "description": "Important disclaimer about the accuracy of YouTube revenue estimates provided by ChannelIncome.",
    "datePublished": "2025-10-01",
    "dateModified": "2026-05-01",
    "publisher": {
      "@type": "Organization",
      "name": "ChannelIncome",
      "url": "https://channelincome.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://channelincome.com/icon.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Header Section */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-3 shadow-sm">
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
        <div className="bg-background rounded-lg shadow-sm border border-border p-5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mb-3">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            General Information & Data Accuracy
          </h2>

          <div className="space-y-3 text-xs text-muted leading-relaxed">
            <p>
              The information and estimates provided on <strong className="text-foreground">ChannelIncome</strong> (YouTube Channel Revenue
              Estimator) are for general informational and educational purposes only. They should not be relied upon as a definitive source for financial decisions.
            </p>
            <p>
              <strong className="text-foreground">Estimate accuracy:</strong> All revenue estimates, including CPM, RPM, monthly income, and annual projections, are{" "}
              <strong className="text-foreground">approximations based on internal algorithms, publicly available YouTube data, and industry trends</strong>.
              Actual YouTube earnings can differ significantly based on factors including audience niche, viewer geography, advertiser demand, content category, engagement rates, watch time, and YouTube's algorithm changes.
            </p>
            <p>
              <strong className="text-foreground">Not an official tool:</strong> ChannelIncome is an independent, third-party service. This site is not affiliated, authorized, endorsed by, or connected with YouTube, Google LLC, or any of their subsidiaries. YouTube and Google are trademarks of Google LLC.
            </p>
            <p>
              <strong className="text-foreground">Content & guides:</strong> Blog articles, growth guides, and educational content published on ChannelIncome are based on independent creator research and industry experience. They do not represent official YouTube policies or guaranteed results. YouTube's algorithm, revenue rules, and monetization policies change frequently.
            </p>
            <p>
              <strong className="text-foreground">No financial advice:</strong> ChannelIncome does not provide financial, investment, or legal advice. Always verify earnings claims with official YouTube Analytics or contact YouTube support directly.
            </p>
            <p>
              <strong className="text-foreground">Use at your own risk:</strong> By using ChannelIncome, you acknowledge that estimates are approximate and may not accurately reflect your actual channel earnings or growth potential. ChannelIncome is not responsible for any decisions made based on our estimates.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted">Last updated: May 2026 | Not officially affiliated with YouTube</p>
          </div>
        </div>

      </div>
    </div>
  );
}