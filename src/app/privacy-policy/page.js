export const metadata = {
  title: "Privacy Policy | ChannelIncome YouTube Revenue Calculator",
  description:
    "Privacy Policy for ChannelIncome — the free YouTube Revenue Estimator. Learn how we protect your data, handle user information, and maintain privacy while using our YouTube analytics tools.",
  keywords: [
    "ChannelIncome privacy policy",
    "YouTube calculator privacy",
    "data protection YouTube tools",
    "user data security",
    "YouTube analytics privacy",
    "GDPR compliance",
  ],
  openGraph: {
    title: "Privacy Policy | ChannelIncome YouTube Revenue Calculator",
    description:
      "Learn about ChannelIncome's privacy practices and how we protect your information when using our free YouTube revenue estimator and channel analytics tools.",
    url: "https://channelincome.com/privacy-policy",
    type: "website",
  },
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
            Privacy & Data Protection Policy
          </h2>

          <div className="space-y-3 text-xs text-muted leading-relaxed">
            <p>
              At <strong className="text-foreground">ChannelIncome</strong>, your privacy is our top priority.
              We are committed to protecting your personal information and ensuring transparency in how we handle data.
            </p>
            <p>
              <strong className="text-foreground">What data we don't collect:</strong> We do not collect, store, or share personal data from users. When you use our YouTube revenue calculator, we do not save your name, email, or YouTube channel information on our servers after your session ends.
            </p>
            <p>
              <strong className="text-foreground">Third-party services:</strong> ChannelIncome uses Google APIs (YouTube Data API and reCAPTCHA) only to fetch publicly available YouTube channel data and to protect against bot abuse. These requests comply with Google's terms of service.
            </p>
            <p>
              <strong className="text-foreground">Analytics:</strong> We use Google Analytics and other analytics services to track site performance and user behavior. This helps us improve the tool but does not personally identify you.
            </p>
            <p>
              <strong className="text-foreground">Cookies:</strong> ChannelIncome uses standard cookies to maintain your session. You can control cookie settings in your browser at any time.
            </p>
            <p>
              <strong className="text-foreground">Data deletion:</strong> By design, your YouTube channel data is not retained after each calculator session. We keep no database of your searches or estimates.
            </p>
            <p>
              By using ChannelIncome, you agree to this Privacy Policy. We may update it to reflect changes in our practices or legal requirements. Continued use of the site means you accept any updates.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted">Last updated: May 2026 | <strong>GDPR Compliant</strong></p>
          </div>
        </div>

      </div>
    </div>
  );
}