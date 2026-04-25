// app/page.js (Home Page)
import HomeIntroduction from "../components/SeoText/homeText";
import HomeFAQ from "../components/FAQ/FAQ";

export const revalidate = 3600; // 1 hour cache refresh

const homeFaqData = [
  {
    q: "Can I earn money by watching YouTube videos?",
    a: "YouTube does not pay users for watching videos. Our tool is made for creators who want to estimate their YouTube earnings from content creation and ad revenue."
  },
  {
    q: "When do you start earning money from YouTube?",
    a: "You can start earning after joining the YouTube Partner Program. This usually requires 1,000 subscribers and either 4,000 watch hours or 10 million Shorts views."
  },
  {
    q: "What is the average income for 1 million subscribers on YouTube?",
    a: "A channel with 1 million subscribers can earn between $5,000 and $50,000 per month from ads. Many creators also earn extra from sponsorships and affiliate marketing."
  },
  {
    q: "What is YouTube income per 1,000 views?",
    a: "Income per 1,000 views (RPM) usually ranges from $0.50 to $7.00 depending on niche and audience location."
  },
  {
    q: "What is the difference between CPM and RPM on YouTube?",
    a: "CPM is what advertisers pay per 1,000 impressions, while RPM is what creators actually earn after YouTube’s share and adjustments."
  },
  {
    q: "How can I increase my YouTube earnings?",
    a: "You can increase earnings by targeting high-CPM countries, improving watch time, and choosing profitable niches like finance or tech."
  },
  {
    q: "How does the YouTube Revenue Calculator work?",
    a: "The tool estimates earnings based on views, CPM, RPM, niche, and audience location to give a realistic income range."
  },
  {
    q: "Is ChannelIncome free to use?",
    a: "Yes, it is completely free to use for checking YouTube revenue estimates and channel insights."
  }
];

export const metadata = {
  title: "YouTube Money Calculator 2026 | Check Channel Earnings Instantly",
  description:
    "Free YouTube money calculator to estimate earnings from views, CPM, RPM, niche, and country. Learn how YouTube channels make money and compare income insights in 2026.",
  keywords: [
    "YouTube money calculator",
    "YouTube view money calculator",
    "YouTube channel money calculator",
    "YouTube monetization guide",
    "RPM vs CPM explained"
  ],
  alternates: {
    canonical: "https://channelincome.com"
  },
  openGraph: {
    title: "YouTube Money Calculator – Estimate Earnings & Growth",
    description:
      "Check YouTube earnings based on views, CPM, RPM, niche, and country. Learn how creators make money and grow faster in 2026.",
    url: "https://channelincome.com",
    images: [
      {
        url: "https://channelincome.com/icon.png",
        width: 1200,
        height: 630
      }
    ]
  }
};

// ✅ SoftwareApplication Schema
function JsonLdApp() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "YouTube Revenue Calculator",
    operatingSystem: "Web",
    applicationCategory: "BusinessApplication",
    brand: {
      "@type": "Brand",
      name: "ChannelIncome"
    },
    description:
      "Free YouTube revenue calculator to estimate channel earnings using views, CPM, RPM, niche, and country.",
    url: "https://channelincome.com",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ✅ FAQ Schema
function JsonLdFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export default async function Home() {
  return (
    <>
      <JsonLdApp />
      <JsonLdFAQ />

      <HomeIntroduction />
      <HomeFAQ faq={homeFaqData} />
    </>
  );
}