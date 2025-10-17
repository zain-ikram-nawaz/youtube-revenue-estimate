import YoutubeAnalyzer from "./components/youtubeChecker/page";
import FAQ from "./components/FAQ/page";
import ListingGuide from "./components/AdminUseOnly/ListingGuide/page"

export const metadata = {
  title: "Free YouTube Channel Revenue Estimator | ChannelIncome",
  description:
    "Use our free YouTube Revenue Estimator to calculate YouTube earnings, CPM, RPM, and monetization eligibility. Track subscribers, views, and engagement in real-time.",
  keywords: [
    "YouTube Revenue Estimator",
    "YouTube Earnings Calculator",
    "YouTube Channel Analytics",
    "YouTube CPM Calculator",
    "YouTube Monetization Checker",
    "Free YouTube Analytics Tool",
    "YouTube Channel Income",
    "YouTube RPM Estimator",
  ],
  alternates: {
    canonical: "https://channelincome.com/",
  },
  openGraph: {
    title: "Free YouTube Revenue Estimator | ChannelIncome",
    description:
      "Check YouTube channel earnings, CPM, RPM, and engagement instantly. ChannelIncome offers a free analytics tool for creators and marketers.",
    url: "https://channelincome.com/",
    siteName: "ChannelIncome",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Free YouTube Channel Revenue Estimator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Channel Revenue Estimator",
    description:
      "Instantly estimate YouTube channel earnings, CPM, RPM, and engagement metrics for free.",
    images: ["/icon.png"],
  },
};



async function getGuides() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/guide`, {
    cache: "no-store",
  });
  return res.json();
}



export default async function Home() {
  const { guides } = await getGuides();
  // ✅ All long SEO content
  const seoSections = {
  "intro": {
    "heading": "Understanding YouTube Channel Revenue",
    "content": "Our YouTube Revenue Estimator provides comprehensive insights into channel monetization potential, helping creators, marketers, and businesses understand earning possibilities on the world’s largest video platform.",
    "disclaimer": "All revenue calculations are estimates based on industry averages and publicly available data. Actual earnings may vary significantly based on content niche, audience demographics, watch time, and advertiser demand."
  },
  "howItWorks": {
    "title": "How Our YouTube Revenue Calculator Works",
    "steps": [
      {
        "title": "Channel Analysis",
        "desc": "We analyze subscriber count, view patterns, video uploads, and engagement metrics to assess channel performance."
      },
      {
        "title": "Revenue Calculation",
        "desc": "Using industry-standard CPM and RPM rates, along with viewership data, to estimate potential earnings."
      },
      {
        "title": "Monetization Insights",
        "desc": "Evaluating channel eligibility for the YouTube Partner Program and alternative revenue streams."
      }
    ]
  },
  "monetizationGuide": {
    "title": "Understanding YouTube Monetization",
    "sections": [
      {
        "title": "How YouTube Revenue Works",
        "list": [
          "CPM (Cost Per Mille): The amount advertisers pay per 1,000 ad impressions.",
          "RPM (Revenue Per Mille): Actual revenue earned per 1,000 views after YouTube's share.",
          "Audience Demographics: Viewers from different countries have varying advertising value.",
          "Content Category: Some niches (finance, tech) command higher CPM rates than others.",
          "Channel Activity: Subscriber growth, video uploads, and watch hours influence earning estimates."
        ]
      },
      {
        "title": "YouTube Partner Program Requirements",
        "list": [
          "1,000 subscribers",
          "4,000 valid public watch hours in the past 12 months",
          "Adherence to YouTube’s policies and guidelines",
          "Linking to an approved AdSense account"
        ]
      },
      {
        "title": "Additional YouTube Growth Tips",
        "list": [
          "Optimize video titles, thumbnails, and descriptions for better visibility.",
          "Upload consistently to increase audience retention and engagement.",
          "Focus on watch time and content quality to satisfy YouTube algorithms.",
          "Leverage playlists, end screens, and cards to boost views and session duration.",
          "Engage with your community through comments, polls, and live streams."
        ]
      }
    ]
  },
  "faq": [
    {
      "q": "What are the requirements for YouTube monetization?",
      "a": "You need at least 1,000 subscribers and 4,000 watch hours in the past 12 months to qualify for the YouTube Partner Program (YPP)."
    },
    {
      "q": "What type of content is eligible for monetization?",
      "a": "Your content must be original and authentic. AI-generated or repetitive content may be disallowed from monetization."
    },
    {
      "q": "How long does it take to become eligible for monetization?",
      "a": "The time varies depending on your channel growth. Consistent uploads, audience engagement, and watch hours will help you reach monetization faster."
    },
    {
      "q": "What factors affect YouTube earnings?",
      "a": "Earnings depend on multiple factors, including: CPM (Cost Per Mille), RPM (Revenue Per Mille), content niche, audience demographics, and viewer engagement/retention."
    },
    {
      "q": "Are the revenue estimates exact?",
      "a": "No. Revenue calculations are estimates based on publicly available data and industry averages. Actual earnings may vary depending on real watch time, advertiser demand, and your channel specifics."
    },
    {
      "q": "How can I grow my channel to monetize faster?",
      "a": "Focus on consistent uploads, high-quality content, engaging with your audience, optimizing video titles/descriptions/thumbnails, and analyzing performance metrics to improve your content strategy."
    }
  ]
}

  // ✅ JSON-LD for Software Application
  function JsonLdApp() {
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
        url: "https://channelincome.com/",
      },
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    );
  }

  // ✅ JSON-LD for FAQ Schema
  function JsonLdFAQ() {
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seoSections.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    );
  }

  return (
    <>
      <JsonLdApp />
      <JsonLdFAQ />
      <YoutubeAnalyzer seoSections={seoSections} />
      <ListingGuide data={guides} />
      <FAQ faq={seoSections.faq} />
    </>
  );
}
