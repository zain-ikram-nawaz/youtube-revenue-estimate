import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description:
    "Read ChannelIncome's terms before using our free YouTube revenue calculator. Covers acceptable use, accuracy disclaimers, and your responsibilities as a user.",
  openGraph: {
    title: "Terms of Service | ChannelIncome",
    description:
      "ChannelIncome terms of service — covers acceptable use, data accuracy, intellectual property, and liability for our free YouTube revenue calculator.",
    url: "https://channelincome.com/terms-of-service",
    type: "website",
  },
  alternates: { canonical: "https://channelincome.com/terms-of-service" },
};

export default function TermsOfService() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TermsOfService",
    name: "ChannelIncome Terms of Service",
    url: "https://channelincome.com/terms-of-service",
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
    { rule: "Use the tool for", allowed: "Personal research, channel planning, content strategy" },
    { rule: "Do NOT", allowed: "Scrape the platform, misrepresent data as official YouTube data" },
    { rule: "Data accuracy", allowed: "Estimates only — verify important decisions in YouTube Studio" },
    { rule: "Liability", allowed: "Service provided as-is; ChannelIncome not liable for losses" },
    { rule: "Content ownership", allowed: "All guides and tools are ChannelIncome's intellectual property" },
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-foreground mb-2 leading-snug">
            Terms of Service
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            User agreement and terms for using ChannelIncome&#39;s free YouTube revenue calculator and guides.
          </p>
        </div>

        {/* At-a-Glance Table */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5">
          <h2 className="text-sm font-bold text-foreground mb-4 border-l-2 border-primary pl-3">
            Terms at a Glance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-3 py-2 border border-border font-semibold text-foreground">Topic</th>
                  <th className="text-left px-3 py-2 border border-border font-semibold text-foreground">Summary</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((row, i) => (
                  <tr key={row.rule} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                    <td className="px-3 py-2 border border-border font-semibold text-foreground">{row.rule}</td>
                    <td className="px-3 py-2 border border-border text-muted">{row.allowed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full Terms */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5">
          <h2 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            User Agreement &amp; Service Terms
          </h2>

          <div className="space-y-3 text-xs text-muted leading-relaxed">
            <p>
              By accessing and using <strong className="text-foreground">ChannelIncome</strong>, you agree to comply with these Terms of Service. If you do not agree, please do not use this site.
            </p>
            <p>
              <strong className="text-foreground">Data accuracy:</strong> All revenue estimates, CPM/RPM values, and analytics are{" "}
              <strong className="text-foreground">approximations</strong> based on public YouTube metrics and industry patterns. They do not represent official YouTube or Google values. Verify any important decisions using official YouTube Analytics in YouTube Studio.
            </p>
            <p>
              <strong className="text-foreground">Acceptable use:</strong> You agree to use ChannelIncome for personal, non-commercial research purposes. You may not:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Clone, scrape, or copy the platform or its data in bulk</li>
              <li>Use automated tools to extract information without permission</li>
              <li>Misrepresent ChannelIncome estimates as official YouTube data</li>
              <li>Attempt to bypass security measures or access restricted areas</li>
              <li>Use the site for illegal, harmful, or deceptive purposes</li>
            </ul>
            <p>
              <strong className="text-foreground">Intellectual property:</strong> All calculations, tools, guides, and educational content on ChannelIncome are original works and may not be reproduced or distributed without written permission.
            </p>
            <p>
              <strong className="text-foreground">No liability:</strong> The platform is provided <strong className="text-foreground">as-is</strong> without warranties. ChannelIncome is not responsible for errors, inaccuracies, or any decisions or losses made based on estimated data.
            </p>
            <p>
              <strong className="text-foreground">Third-party links:</strong> We may link to third-party sites. We are not responsible for their content or practices.
            </p>
            <p>
              <strong className="text-foreground">Changes to terms:</strong> ChannelIncome may modify these terms at any time. Continued use of the site means you accept any updates.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-muted">Last updated: June 2026 · Contact: support@channelincome.com</p>
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
