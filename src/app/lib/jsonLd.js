  function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "YouTube Channel Revenue Estimator",
    operatingSystem: "Web",
    applicationCategory: "UtilityApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free YouTube analytics tool that estimates revenue, monetization eligibility, and channel performance based on subscribers, views, and engagement.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1482",
    },
    creator: {
      "@type": "Organization",
      name: "YouTube Channel Revenue Estimator",
      url: "https://your-domain.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}