export const metadata = {
  title: "Terms of Service | ChannelIncome YouTube Revenue Calculator",
  description:
    "Read ChannelIncome's Terms of Service before using our free YouTube revenue estimator and channel analytics tools. Understand user rights, restrictions, and liability disclaimers.",
  keywords: [
    "ChannelIncome terms of service",
    "YouTube revenue calculator terms",
    "user agreement",
    "service terms",
    "YouTube analytics terms",
    "legal disclaimer",
  ],
  openGraph: {
    title: "Terms of Service | ChannelIncome YouTube Revenue Calculator",
    description:
      "Read ChannelIncome's Terms of Service before using our free YouTube revenue estimator and channel analytics tools.",
    url: "https://channelincome.com/terms-of-service",
    type: "website",
  },
  alternates: { canonical: "https://channelincome.com/terms-of-service" },
};

export default function TermsOfService() {

   const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TermsOfService",
    "name": "YouTube Channel Revenue Estimator Terms of Service",
    "url": "https://channelincome.com/terms-of-service",
    "datePublished": "2025-10-01",
    "dateModified": "2025-12-14",
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-foreground mb-2 leading-snug">
            Terms of Service - YouTube Channel Revenue Estimator
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            User agreement and terms for using our YouTube analytics and revenue estimation tools
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mb-3">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            User Agreement & Service Terms
          </h2>

          <div className="space-y-3 text-xs text-muted leading-relaxed">
            <p>
              By accessing and using <strong className="text-foreground">ChannelIncome</strong>, you agree to comply with these Terms of Service. If you do not agree, please do not use this site.
            </p>
            <p>
              <strong className="text-foreground">Data accuracy:</strong> The data shown, including estimated revenue, CPM, RPM, and analytics, is an <strong className="text-foreground">approximation</strong> based on public YouTube metrics and industry patterns. ChannelIncome does not represent official YouTube or Google values, and we strongly recommend verifying any important decisions with official YouTube Analytics.
            </p>
            <p>
              <strong className="text-foreground">Responsible use:</strong> You agree to use ChannelIncome responsibly and legally. You are not allowed to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Clone, scrape, or copy the platform or its data in bulk</li>
              <li>Use automated tools to extract information without permission</li>
              <li>Misrepresent ChannelIncome data as official YouTube information</li>
              <li>Attempt to bypass security measures or access restricted areas</li>
              <li>Use the site for illegal, harmful, or deceptive purposes</li>
            </ul>
            <p>
              <strong className="text-foreground">Intellectual property:</strong> All calculations, tools, blog content, guides, and educational materials on ChannelIncome are our independent research and property. They may not be reproduced or distributed without permission.
            </p>
            <p>
              <strong className="text-foreground">No liability:</strong> The platform and all content are provided <strong className="text-foreground">as-is</strong> without warranties of any kind. ChannelIncome is not responsible for errors, inaccuracies, omissions, or any decisions or losses made based on estimated data.
            </p>
            <p>
              <strong className="text-foreground">Third-party links:</strong> ChannelIncome may link to third-party sites. We are not responsible for their content, accuracy, or practices.
            </p>
            <p>
              <strong className="text-foreground">Changes to terms:</strong> ChannelIncome reserves the right to modify these terms at any time. Changes are effective immediately upon posting.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted">Last updated: May 2026 | For inquiries: support@channelincome.com</p>
          </div>
        </div>

      </div>
    </div>
  );
}