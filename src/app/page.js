// app/page.js (Home Page)
import HomeIntroduction from "../components/SeoText/homeText";
import HomeFAQ from "../components/FAQ/FAQ";

export const revalidate = 3600;

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
    a: "CPM is what advertisers pay per 1,000 impressions, while RPM is what creators actually earn after YouTube's share and adjustments."
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
  title: "YouTube Revenue Calculator 2026 | Free Earnings Estimator – ChannelIncome",
  description:
    "Calculate your YouTube earnings instantly. Enter your views, niche, and country to get a free RPM & CPM-based revenue estimate. Trusted by creators in 2026.",
  alternates: {
    canonical: "https://channelincome.com",
  },
  openGraph: {
    title: "YouTube Revenue Calculator 2026 – Free Earnings Estimator",
    description:
      "Find out how much your YouTube channel can earn. Free calculator based on real RPM & CPM data by niche and country. Used by thousands of creators.",
    url: "https://channelincome.com",
    type: "website",
    images: [
      {
        url: "https://channelincome.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChannelIncome YouTube Revenue Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Revenue Calculator 2026 – Free Earnings Estimator",
    description:
      "Calculate how much your YouTube channel earns. Free RPM & CPM based tool by ChannelIncome.",
    images: ["https://channelincome.com/og-image.png"],
  },
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
      name: "ChannelIncome",
    },
    description:
      "Free YouTube revenue calculator to estimate channel earnings using views, CPM, RPM, niche, and country.",
    url: "https://channelincome.com",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
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
        text: item.a,
      },
    })),
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
