import YoutubeAnalyzer from "./components/youtubeChecker/page";
import FAQ from "./components/FAQ/page";
import ListingGuide from "./components/AdminUseOnly/ListingGuide/page"
import SeoText from "./components/SeoText/page"

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
  const seoSections = {
    "faq": [
      {
        "q": "What is YouTube CPM?",
        "a": "CPM stands for Cost Per Mille — it represents how much advertisers pay YouTube for every 1,000 ad impressions on videos. For example, if a video has a CPM of $5, it means advertisers are paying $5 for every 1,000 ad views. However, creators only receive a portion of this amount after YouTube’s revenue share is deducted."
      },
      {
        "q": "What is YouTube RPM?",
        "a": "RPM stands for Revenue Per Mille — it shows how much actual revenue a YouTube creator earns per 1,000 video views after YouTube takes its share. RPM gives a clearer idea of how much money you truly make from your content, including ads, memberships, and other monetized features."
      }
,
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
      <SeoText />
      <ListingGuide data={guides} />
      <FAQ faq={seoSections.faq} />
    </>
  );
}
