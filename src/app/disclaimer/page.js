import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Disclaimer",
  description:
    "YouTube revenue estimates on ChannelIncome are approximations based on industry data. We are not affiliated with YouTube or Google. Actual earnings may vary.",
  openGraph: {
    title: "Disclaimer | ChannelIncome",
    description:
      "ChannelIncome provides estimated YouTube revenue data for informational purposes only. Not affiliated with YouTube or Google. Actual earnings may differ.",
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
    name: "Disclaimer – ChannelIncome YouTube Revenue Estimator",
    url: "https://channelincome.com/disclaimer",
    description:
      "Important disclaimer about the accuracy of YouTube revenue estimates provided by ChannelIncome.",
    datePublished: "2025-10-01",
    dateModified: "2026-06-01",
    publisher: {
      "@type": "Organization",
      name: "ChannelIncome",
      url: "https://channelincome.com",
      logo: {
        "@type": "ImageObject",
        url: "https://channelincome.com/icon.png",
      },
    },
  };

  const summary = [
    { topic: "Revenue estimates", detail: "Approximations — not official YouTube data" },
    { topic: "Affiliation", detail: "Not affiliated with YouTube, Google LLC, or any subsidiary" },
    { topic: "Financial advice", detail: "We do not provide financial or investment advice" },
    { topic: "Accuracy", detail: "Actual earnings vary by niche, geography, engagement, and algorithm" },
    { topic: "Guide content", detail: "Based on independent research; YouTube policies change frequently" },
  ];

  return (
    <div className="min-h-screen bg-secondary py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Header */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-3 shadow-sm">
            <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-foreground mb-2 leading-snug">
            Disclaimer
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            Important information about the accuracy of our YouTube revenue estimates and our relationship with YouTube.
          </p>
        </div>

        {/* At-a-Glance Table */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5">
          <h2 className="text-sm font-bold text-foreground mb-4 border-l-2 border-primary pl-3">
            Disclaimer at a Glance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-3 py-2 border border-border font-semibold text-foreground">Topic</th>
                  <th className="text-left px-3 py-2 border border-border font-semibold text-foreground">What You Should Know</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((row, i) => (
                  <tr key={row.topic} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                    <td className="px-3 py-2 border border-border font-semibold text-foreground">{row.topic}</td>
                    <td className="px-3 py-2 border border-border text-muted">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full Disclaimer */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5">
          <h2 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            General Information &amp; Data Accuracy
          </h2>

          <div className="space-y-3 text-xs text-muted leading-relaxed">
            <p>
              The information and estimates on <strong className="text-foreground">ChannelIncome</strong> are for general informational and educational purposes only. They should not be relied upon as a definitive source for financial decisions.
            </p>
            <p>
              <strong className="text-foreground">Estimate accuracy:</strong> All revenue estimates — CPM, RPM, monthly income, annual projections — are{" "}
              <strong className="text-foreground">approximations based on publicly available YouTube data and industry trends</strong>.
              Actual YouTube earnings can differ significantly based on audience niche, viewer geography, advertiser demand, content category, engagement rates, watch time, and YouTube&#39;s algorithm.
            </p>
            <p>
              <strong className="text-foreground">Not an official tool:</strong> ChannelIncome is an independent, third-party service. This site is not affiliated, authorized, endorsed by, or connected with YouTube, Google LLC, or any of their subsidiaries. YouTube and Google are trademarks of Google LLC.
            </p>
            <p>
              <strong className="text-foreground">Content &amp; guides:</strong> Blog articles, growth guides, and educational content are based on independent creator research. They do not represent official YouTube policies or guaranteed results. YouTube&#39;s monetization policies change frequently.
            </p>
            <p>
              <strong className="text-foreground">No financial advice:</strong> ChannelIncome does not provide financial, investment, or legal advice. Always verify earnings with official YouTube Analytics or contact YouTube support directly.
            </p>
            <p>
              <strong className="text-foreground">Use at your own risk:</strong> By using ChannelIncome, you acknowledge that estimates are approximate. ChannelIncome is not responsible for any decisions made based on our estimates.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-muted">Last updated: June 2026 · Not officially affiliated with YouTube</p>
            <Link
              href="/tool/youtube-revenue-calculator"
              className="text-xs font-semibold text-primary hover:opacity-80 transition"
            >
              Back to the Revenue Calculator →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
