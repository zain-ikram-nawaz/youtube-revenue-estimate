export const metadata = {
  title: "Privacy Policy",
  description:
    "We value your privacy. Learn how ChannelIncome handles your data and ensures your information is safe and anonymous.",
  keywords: [
    "ChannelIncome privacy policy",
    "YouTube analytics privacy",
    "data protection",
    "user data security",
  ],
  alternates: { canonical: "https://channelincome.com/privacy-policy" },
};

export default function PrivacyPolicy() {

   const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    "name": "YouTube Channel Revenue Estimator Privacy Policy",
    "url": "https://channelincome.com/privacy-policy",
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-foreground mb-2 leading-snug">
            Privacy Policy - YouTube Channel Revenue Estimator
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            How we protect your data and ensure your privacy while using our analytics tools
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-background rounded-md shadow-sm border border-border p-5">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center mb-3">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            Data Protection & Privacy Commitment
          </h2>

          <div className="space-y-3 text-xs text-muted leading-relaxed">
            <p>
              At <strong className="text-foreground">ChannelIncome</strong>, your privacy is our top priority.
              We do not collect, store, or share any personal data from our users.
            </p>
            <p>
              This website uses Google APIs (such as YouTube Data API and reCAPTCHA)
              only to fetch public YouTube channel information and to protect against spam.
              We do not keep any of the data you enter on our servers.
            </p>
            <p>
              By using our website, you agree to this Privacy Policy.
              We may update it from time to time without prior notice.
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