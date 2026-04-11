export const metadata = {
  title: "Terms of Service ",
  description:
    "Read our terms of service before using the ChannelIncome YouTube Revenue Estimator and analytics tools.",
  keywords: [
    "ChannelIncome terms of service",
    "YouTube revenue estimator terms",
    "user agreement",
    "legal information",
  ],
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
        "url": "https://channelincome.com/logo.png"
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
        <div className="bg-background rounded-md shadow-sm border border-border p-5 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-md mb-3 shadow-sm">
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
        <div className="bg-background rounded-md shadow-sm border border-border p-5">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center mb-3">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            User Agreement & Service Terms
          </h2>

          <div className="space-y-3 text-xs text-muted leading-relaxed">
            <p>
              By using <strong className="text-foreground">ChannelIncome</strong>, you agree to use the tool responsibly.
              The data shown is an <strong className="text-foreground">approximation</strong> based on public YouTube metrics and does not represent
              official YouTube or Google values.
            </p>
            <p>
              You are not allowed to misuse, clone, or scrape this platform or its data.
              All calculations, tools, and blog content are part of our independent research and for educational purposes only.
            </p>
            <p>
              The platform and all content are provided <strong className="text-foreground">as-is</strong> without warranties of any kind. ChannelIncome
              is not responsible for errors, inaccuracies, or any decisions made based on the estimated data.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted">Last updated: December 2025</p>
          </div>
        </div>

      </div>
    </div>
  );
}