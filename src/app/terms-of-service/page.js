export const metadata = {
  title: "Terms of Service | ChannelIncome",
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
    <div className="max-w-4xl mx-auto px-6 py-10">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        By using <strong>ChannelIncome</strong>, you agree to use the tool responsibly.
        The data shown is an <strong>approximation</strong> based on public YouTube metrics and does not represent
        official YouTube or Google values.
      </p>
      <p className="mb-4">
        You are not allowed to misuse, clone, or scrape this platform or its data.
        All calculations, tools, and blog content are part of our independent research and for educational purposes only.
      </p>
      <p className="mb-4">
        The platform and all content are provided <strong>as-is</strong> without warranties of any kind. ChannelIncome
        is not responsible for errors, inaccuracies, or any decisions made based on the estimated data.
      </p>
      <p className="text-sm text-gray-600">Last updated: December 2025</p>
    </div>
  );
}
