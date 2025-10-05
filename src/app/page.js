import YoutubeAnalyzer from "./components/youtubeChecker/page";
import Guide from "./components/Guide/page";
import Data from "../data/data.json";
import FAQ from "./components/FAQ/page";
export const metadata = {
  title: "YouTube Channel Revenue Estimator | YouTube Analytics Tool",
  description:
    "Free YouTube Channel Revenue Estimator — analyze monetization, earnings, CPM, RPM, subscribers, and views for any channel.",
  keywords: [
    "YouTube Channel Analytics",
    "YouTube Revenue Estimator",
    "YouTube Monetization Checker",
    "YouTube Earnings Calculator",
    "YouTube Stats Tracker",
    "YouTube SEO Tool",
    "YouTube CPM RPM Calculator",
    "YouTube Monetization Eligibility Checker",
    "YouTube Channel Insights",
    "Free YouTube Analytics",
  ],
  alternates: {
    canonical: "https://your-domain.com/",
  },
  openGraph: {
    title: "YouTube Channel Revenue Estimator | Free YouTube Analytics Tool",
    description:
      "Analyze any YouTube channel’s earnings, CPM, monetization, and engagement with our free YouTube analytics estimator.",
    url: "https://your-domain.com/",
    siteName: "YouTube Channel Revenue Estimator",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "YouTube Channel Revenue Estimator Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Channel Revenue Estimator",
    description:
      "Check YouTube monetization, subscribers, and analytics with our free YouTube channel estimator tool.",
    images: ["/icon.png"],
  },
};

export default function Home() {
  // ✅ All long SEO content
  const seoSections = {
    intro: {
      heading: "Understanding YouTube Channel Revenue",
      content:
        "Our YouTube Revenue Estimator provides comprehensive insights into channel monetization potential, helping creators, marketers, and businesses understand earning possibilities on the world’s largest video platform.",
      disclaimer:
        "All revenue calculations are estimates based on industry averages and publicly available data. Actual earnings may vary significantly based on content niche, audience demographics, watch time, and advertiser demand.",
    },
    howItWorks: {
      title: "How Our YouTube Revenue Calculator Works",
      steps: [
        {
          title: "Channel Analysis",
          desc: "We analyze subscriber count, view patterns, and engagement metrics to assess channel performance.",
        },
        {
          title: "Revenue Calculation",
          desc: "Using industry-standard CPM rates and viewership data to estimate potential earnings.",
        },
        {
          title: "Monetization Insights",
          desc: "Evaluating channel eligibility for YouTube Partner Program and alternative revenue streams.",
        },
      ],
    },
    monetizationGuide: {
      title: "Understanding YouTube Monetization",
      sections: [
        {
          title: "How YouTube Revenue Works",
          list: [
            "CPM (Cost Per Mille): The amount advertisers pay per 1,000 ad impressions.",
            "RPM (Revenue Per Mille): Actual revenue earned per 1,000 views after YouTube's share.",
            "Audience Demographics: Viewers from different countries have varying advertising value.",
            "Content Category: Some niches (finance, tech) command higher CPM rates than others.",
          ],
        },
        {
          title: "YouTube Partner Program Requirements",
          list: [
            "1,000 subscribers",
            "4,000 valid public watch hours in the past 12 months",
            "Adherence to YouTube’s policies and guidelines",
            "Linking to an approved AdSense account",
          ],
        },
      ],
    },
    faq: [
      {
        q: "How accurate are these revenue estimates?",
        a: "Our estimates are based on industry averages and publicly available data. Actual earnings can vary based on niche, audience location, and other factors.",
      },
      {
        q: "Why do CPM rates vary between channels?",
        a: "CPM rates differ based on audience demographics, content category, and advertiser demand. Channels in high-value niches like finance earn higher CPMs.",
      },
      {
        q: "What’s the difference between CPM and RPM?",
        a: "CPM is what advertisers pay per 1,000 impressions, while RPM is what creators earn after YouTube’s 45% share.",
      },
      {
        q: "How long does it take to get monetized on YouTube?",
        a: "After meeting the 1,000 subscriber and 4,000-hour threshold, YouTube’s review process typically takes 1–4 weeks.",
      },
    ],
  };


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
  return (
    <>
      <JsonLd />
      <YoutubeAnalyzer seoSections={seoSections} />
      <Guide data={Data} />
      <FAQ faq={seoSections.faq} />
    </>
  );
}
